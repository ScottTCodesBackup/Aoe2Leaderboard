export default {
  name: 'match',
  type: 'document',
  title: 'Match',
  fields: [
    {
      name: 'player1',
      type: 'reference',
      to: [{
        type: 'player'
      }]
    },
    {
      name: 'decknamep1',
      title: 'Player 1 Deck Name',
      type: 'string'
    },
    {
      name: 'decklinkp1',
      title: 'Player 1 Deck Link',
      type: 'string'
    },
    {
      name: 'player2',
      type: 'reference',
      to: [{
        type: 'player'
      }]
    },
    {
      name: 'decknamep2',
      title: 'Player 2 Deck Name',
      type: 'string'
    },
    {
      name: 'decklinkp2',
      title: 'Player 2 Deck Link',
      type: 'string'
    },
    {
      name: 'seasonplayed',
      title: 'Season Match Was Played',
      type: 'reference',
      to: [{
        type: 'season'
      }]
    },
    {
      name: 'matchResult',
      type: 'object',
      title: 'Match Result',
      fields: [{
        title: 'Player 1 Wins',
        name: 'p1wins',
        type: 'number'
      },
      {
        title: 'Player 2 Wins',
        name: 'p2wins',
        type: 'number'
      },
      {
        title: 'Draws',
        name: 'draws',
        type: 'number',
        default: '0'
      },
      {
        title: 'Winner',
        name: 'winner',
        type: 'reference',
        to: [{
          type: 'player'
        }]
      }
      ],
      options: {
        collapsible: true,
        collapsed: true
      }
    }
  ],
  preview: {
    select: {
      title: '_id'
    }
  }
}

/**
 * to build the leaderboard, I need to get all the match data for the season,
 * Get all the player data for people who are entered and create an object of each player id
 * Each player object will have wins, draws, losses
 *
 *  Loop through all the matches and add scores to the relevent player objects
 *  and build leaderboard
 */
