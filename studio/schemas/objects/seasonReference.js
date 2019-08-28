export default {
  name: 'seasonReference',
  type: 'object',
  title: 'Season reference',
  fields: [
    {
      name: 'season',
      type: 'reference',
      to: [
        {
          type: 'season'
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'season.name'
    }
  }
}
