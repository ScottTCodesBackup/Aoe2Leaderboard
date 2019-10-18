import sanityClient from '@sanity/client'
// import onevone from './match-functions/onevone'
import { api } from '../../studio/sanity.json'
const { projectId, dataset } = api

const client = sanityClient({
  projectId,
  dataset,
  useCdn: true
})

// const matchCreatedQuery = '*[_type == "match"]'
// const seasonPlayerAdded = '*[_type == "season"]'

// const fetchElos = seasonID => {
//   return client.getDocument(seasonID);
// };

// client.listen(matchCreatedQuery)
//   .subscribe(match => {
//     const {result} = match;

//     if (result && result.match) {
//       const {match, season} = result;

//       if (match.twoPlayer && !match.twoPlayer.matchData) {
//         const matchID = result._id;
//         const playerRefs = match.twoPlayer.players;
//         const playerIDs = [];

//         playerRefs.map(item => {
//           playerIDs.push(item.player._ref);
//         });

//         const seasonInfo = fetchElos(season._ref);

//         seasonInfo.then(season => {
//           const playerData = [];

//           playerRefs.map(item => {
//             playerData.push({
//               score: item.score, 
//               ...(season.players.find(itemInner => itemInner.ref._ref === item.player._ref))
//             });
//           });

//           const matchData = onevone(playerData);

//           client
//             .patch(matchID)
//             .set({
//               matchData
//             })
//             .commit()
//         });
//       } else if (match.teamGame && !match.teamGame.matchData) {
//         const matchID = match._id;
//         const playerRefs = match.teamGame.players;

//       } else if (match.freeForAll && !match.freeForAll.matchData) {
//         const matchID = match._id;
//         const playerRefs = match.freeForAll.players;

//       }
//     }
//   });

export default client
