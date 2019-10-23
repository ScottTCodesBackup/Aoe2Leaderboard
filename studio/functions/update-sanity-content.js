const sanityClient = require('@sanity/client')

exports.handler = (event, context) => {
  const getExpected = (a, b) => {
    return 1 / (1 + Math.pow(10, (b - a) / 400))
  }

  const onevone = players => {
    const matchData = []
    const player1 = players[0]
    const player2 = players[1]

    const updateRating = (expected, actual, current) => {
      const newRating = Math.round(current + 32 * (actual - expected))
      return newRating
    }

    matchData.push({rank: player1.rank, difference: 0, name: player1.name})
    matchData.push({rank: player2.rank, difference: 0, name: player2.name})

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

    matchData[0].newRank = player1NewRank
    matchData[1].newRank = player2NewRank

    matchData[0].difference = player1NewRank - player1.rank
    matchData[1].difference = player2NewRank - player2.rank

    return matchData
  }

  const {body} = event
  if (body) {
    const bodyParsed = JSON.parse(body)

    if (!bodyParsed.ids || bodyParsed.ids.created.length === 0) {
      return {statusCode: 200}
    }

    const client = sanityClient({
      projectId: 'v7sgze3m',
      dataset: 'production',
      token: process.env.SANITY_TOKEN,
      useCdn: false
    })

    try {
      const docID = bodyParsed.ids.created.map(_id => _id)
      const matchFetch = client.getDocument(`${docID}`)

      matchFetch.then(matchFetch => {
        const {match, season} = matchFetch

        if (match.twoPlayer && !match.twoPlayer.matchData) {
          const matchID = docID
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

            client
              .patch(matchID)
              .setIfMissing({'matchData': matchData})
              .commit()
              .catch(console.error)
          })
        }
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
