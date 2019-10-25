const sanityClient = require('@sanity/client')

exports.handler = (event, context) => {
  const getExpected = (a, b) => {
    return 1 / (1 + Math.pow(10, (b - a) / 400))
  }

  const findIndex = (find, array) => {
    let index = null

    array.map((item, i) => {
      if (item._key === find) {
        index = i
      }
    })

    return index
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

  const freeForAll = players => {
    const length = players.length
    const gamesPlayed = length - 1
    const matchData = []
    let kFactorAdjuster = (1 - gamesPlayed / 10) / 2
    if (kFactorAdjuster < 0.4) {
      kFactorAdjuster = 0.4
    }

    const kFactor = 32 * kFactorAdjuster

    const updateRating = (expected, actual, current) => {
      const newRating = Math.round(current + kFactor * (actual - expected))
      return newRating
    }

    for (let i = 0; length > i; i += 1) {
      matchData.push({
        rank: players[i].rank,
        difference: 0,
        name: players[i].name,
        _key: players[i]._key
      })
    }

    for (let i = 0; length > i; i += 1) {
      const player1 = players[i]
      const player1Index = findIndex(player1._key, matchData)

      for (let j = 0; length > j; j += 1) {
        setTimeout(() => {
          if (j > i) {
            const player2 = players[j]
            const player2Index = findIndex(player2._key, matchData)
            const player1Expected = getExpected(player1.rank, player2.rank)
            const player2Expected = getExpected(player2.rank, player1.rank)
            let player1newRating
            let player2newRating

            if (player1.score < player2.score) {
              player1newRating =
                updateRating(player1Expected, 1, player1.rank) -
                matchData[player1Index].rank
              player2newRating =
                updateRating(player2Expected, 0, player2.rank) -
                matchData[player2Index].rank
            } else {
              player1newRating =
                updateRating(player1Expected, 0, player1.rank) -
                matchData[player1Index].rank
              player2newRating =
                updateRating(player2Expected, 1, player2.rank) -
                matchData[player2Index].rank
            }

            matchData[player1Index].difference += player1newRating
            matchData[player2Index].difference += player2newRating
          }

          if (j === gamesPlayed) {
            if (matchData[player1Index].difference > 40) {
              matchData[player1Index].difference = 40
            }

            matchData[player1Index].newRank =
              matchData[player1Index].rank + matchData[player1Index].difference
          }
        }, 0)
      }
    }

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
          const seasonInfo = client.getDocument(`${season._ref}`)

          seasonInfo.then(season => {
            const playerData = []

            playerRefs.map(item => {
              playerData.push({
                score: item.score,
                ...season.players.find(itemInner => itemInner.ref._ref === item.player._ref)
              })
            })

            const matchDataObj = onevone(playerData)

            matchID
              .reduce(
                (trx, id) =>
                  trx.patch(id, patch => patch.setIfMissing({matchData: matchDataObj})),
                client.transaction()
              )
              .commit()
              .catch(console.error)
          })
        } else if (match.freeForAll && !match.freeForAll.matchData) {
          const matchID = docID
          const playerRefs = match.freeForAll.players
          const seasonInfo = client.getDocument(`${season._ref}`)

          seasonInfo.then(season => {
            const playerData = []

            playerRefs.map(item => {
              playerData.push({
                score: item.score,
                ...season.players.find(itemInner => itemInner.ref._ref === item.player._ref)
              })
            })

            const matchDataObj = freeForAll(playerData)

            matchID
              .reduce(
                (trx, id) =>
                  trx.patch(id, patch => patch.setIfMissing({matchData: matchDataObj})),
                client.transaction()
              )
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
