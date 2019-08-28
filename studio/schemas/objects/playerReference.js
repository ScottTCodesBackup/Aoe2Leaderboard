export default {
  name: 'playerReference',
  type: 'object',
  title: 'Player reference',
  fields: [
    {
      name: 'player',
      type: 'reference',
      to: [
        {
          type: 'player'
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'player.name'
    }
  }
}
