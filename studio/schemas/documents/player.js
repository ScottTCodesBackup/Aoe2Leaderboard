export default {
  name: 'player',
  type: 'document',
  title: 'Player',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name'
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
    }
  ],
  preview: {
    select: {
      title: 'name'
    }
  }
}
