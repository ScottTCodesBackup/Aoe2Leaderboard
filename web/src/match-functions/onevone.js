import getExpected from './getExpected';

const onevone = (players) => {
  const matchData = {};
  const player1 = players[0];
  const player2 = players[1];

  const updateRating = (expected, actual, current) => {
    const newRating = Math.round(current + 32 * (actual - expected));
    return newRating;
  };

  matchData[player1.ref._ref] = { rank: player1.rank, difference: 0, name: player1.name };
  matchData[player2.ref._ref] = { rank: player2.rank, difference: 0, name: player2.name };

  const player1Expected = getExpected(player1.rank, player2.rank);
  const player2Expected = getExpected(player2.rank, player1.rank);

  let player1NewRank;
  let player2NewRank;

  if (player1.score > player2) {
    player1NewRank = updateRating(player1Expected, 1, player1.rank);
    player2NewRank = updateRating(player2Expected, 0, player2.rank);
  } else {
    player1NewRank = updateRating(player1Expected, 0, player1.rank);
    player2NewRank = updateRating(player2Expected, 1, player2.rank);
  }

  matchData[player1.ref._ref].newRank = player1NewRank; 
  matchData[player2.ref._ref].newRank = player2NewRank;

  matchData[player1.ref._ref].difference = player1NewRank - player1.rank; 
  matchData[player2.ref._ref].difference = player2NewRank - player2.rank; 

  return matchData;
};

export default onevone;