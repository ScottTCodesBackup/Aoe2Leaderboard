const sanityClient = require('@sanity/client')

const client = sanityClient({
  projectId: 'cnummxbj',
  dataset: 'production',
  // Remember to add a token with write access to your Netlify app’s environment variables.
  // Call it SANITY_TOKEN
  // https://docs.netlify.com/configure-builds/environment-variables/#declare-variables
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

  matchData[player1.ref._ref] = { rank: player1.rank, difference: 0, name: player1.name }
  matchData[player2.ref._ref] = { rank: player2.rank, difference: 0, name: player2.name }

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

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
// $ sanity hook create add-missing-value production https://yourdomain.netlify.com/.netlify/functions/update-sanity-content
// Webhooks can also be added in the API settings on https://manage.sanity.io

exports.handler = async (event, context) => {
  const {body} = event

  if (body && body.ids) {
    const {created} = body.ids // get the ids of new documents
    console.log(created)
    try {
      const res = await created.ids.reduce((trans, _id) => {
        const matchObj = client.getDocument(_id)

        matchObj.then(matchO => {
          const {match, season} = matchO

          if (match.twoPlayer && !match.twoPlayer.matchData) {
            const matchID = _id
            const playerRefs = match.twoPlayer.players
            const playerIDs = []

            playerRefs.map(item => {
              playerIDs.push(item.player._ref)
            })

            const seasonInfo = client.getDocument(season._ref)

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

  return {
    statusCode: 500,
    body: `Error: ${body}`
  }
}
