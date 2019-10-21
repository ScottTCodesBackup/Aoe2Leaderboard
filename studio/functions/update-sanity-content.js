const sanityClient = require('@sanity/client')

const client = sanityClient({
  projectId: 'v7sgze3m',
  dataset: 'production',
  token: process.env.SANITY_TOKEN,
  useCdn: false
})

const getExpected = (a, b) => {
  return 1 / (1 + Math.pow(10, (b - a) / 400))
}

const onevone = players => {
  const matchData = {}
  const player1 = players[0]
  const player2 = players[1]

  const updateRating = (expected, actual, current) => {
    const newRating = Math.round(current + 32 * (actual - expected))
    return newRating
  }

  matchData[player1.ref._ref] = {rank: player1.rank, difference: 0, name: player1.name}
  matchData[player2.ref._ref] = {rank: player2.rank, difference: 0, name: player2.name}

  const player1Expected = getExpected(player1.rank, player2.rank)
  const player2Expected = getExpected(player2.rank, player1.rank)

  let player1NewRank
  let player2NewRank

  if (player1.score > player2) {
    player1NewRank = updateRating(player1Expected, 1, player1.rank)
    player2NewRank = updateRating(player2Expected, 0, player2.rank)
  } else {
    player1NewRank = updateRating(player1Expected, 0, player1.rank)
    player2NewRank = updateRating(player2Expected, 1, player2.rank)
  }

  matchData[player1.ref._ref].newRank = player1NewRank
  matchData[player2.ref._ref].newRank = player2NewRank

  matchData[player1.ref._ref].difference = player1NewRank - player1.rank
  matchData[player2.ref._ref].difference = player2NewRank - player2.rank

  return matchData
}

exports.handler = async (event, context) => {
  const {body} = event
  if (body) {
    const bodyParsed = JSON.parse(body)

    if (!bodyParsed.ids || bodyParsed.ids.created.length === 0) {
      return {statusCode: 200}
    }

    try {
      const res = await bodyParsed.ids.created.map(_id => {
        client.getDocument(`${_id}`).then(matchO => {
          console.log(matchO)
          const {match, season} = matchO

          if (match.twoPlayer && !match.twoPlayer.matchData) {
            const matchID = _id
            const playerRefs = match.twoPlayer.players
            const playerIDs = []

            playerRefs.map(item => {
              playerIDs.push(item.player._ref)
            })

            const seasonInfo = client.getDocument(`${season._ref}`)

            seasonInfo.then(season => {
              const playerData = []

              playerRefs.map(item => {
                playerData.push({
                  score: item.score,
                  ...season.players.find(itemInner => itemInner.ref._ref === item.player._ref)
                })
              })

              const matchData = onevone(playerData)
              console.log('matchData: ' + matchData)
              client
                .patch(matchID)
                .set({
                  matchData
                })
                .commit()
                .catch(console.error)
            })
          }
        })
      })

      return {
        statusCode: 200
      }
    } catch (err) {
      return {
        statusCode: 500,
        body: err.toString()
      }
    }
  }
}
