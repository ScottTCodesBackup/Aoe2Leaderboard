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
      name: 'dci',
      type: 'string',
      title: 'DCI'
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'dci'
    }
  }
}
