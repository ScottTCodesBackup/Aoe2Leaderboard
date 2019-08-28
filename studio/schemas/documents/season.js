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
          type: 'reference',
          to: [
            {
              type: 'player'
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
