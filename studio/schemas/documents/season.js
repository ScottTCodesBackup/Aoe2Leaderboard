export default {
  name: 'season',
  type: 'document',
  title: 'Season',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name'
    },
    {
      name: 'players',
      title: 'Players Participating',
      type: 'array',
      of: [
        {
          name: 'player',
          type: 'object',
          fields: [
            {
              name: 'name',
              type: 'string',
              title: 'Player Name'
            },
            {
              name: 'rank',
              type: 'number',
              title: 'Rank'
            },
            {
              name: 'wins',
              type: 'number',
              title: 'Wins'
            },
            {
              name: 'losses',
              type: 'number',
              title: 'Losses'
            },
            {
              name: 'ref',
              type: 'reference',
              to: [
                {
                  type: 'player'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: 'leaderboard',
      title: 'Leaderboard',
      type: 'array',
      hidden: true,
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'player'
            }
          ]
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'name'
    }
  }
}
