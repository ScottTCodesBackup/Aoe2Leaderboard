export default {
  name: 'match',
  type: 'document',
  title: 'Match',
  fields: [
    {
      title: 'Season Played',
      type: 'reference',
      name: 'season',
      to: [{
        type: 'season'
      }]
    },
    {
      type: 'matchType',
      title: 'Match',
      name: 'match'
    },
    {
      type: 'array',
      name: 'matchData',
      hidden: true,
      of: [
        {
          type: 'normalGameObj'
        },
        {
          type: 'teamGameObj'
        }
      ]
    }
  ],
  preview: {
    select: {
      title: '_id'
    }
  }
}
