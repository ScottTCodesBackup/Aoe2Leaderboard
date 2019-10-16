export default {
  name: 'teamGame',
  type: 'object',
  title: 'Team Game',
  fields: [
    {
      title: 'Teams that played',
      name: 'teams',
      type: 'array',
      of: [
        {
          title: 'Team',
          name: 'team',
          type: 'object',
          fields: [
            {
              title: 'Team placed',
              name: 'score',
              type: 'number'
            },
            {
              title: 'Players',
              name: 'players',
              type: 'array',
              of: [
                {
                  title: 'Player',
                  type: 'reference',
                  name: 'player',
                  to: [{
                    type: 'player'
                  }]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
