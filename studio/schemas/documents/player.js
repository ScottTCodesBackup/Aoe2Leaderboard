export default {
  name: 'player',
  type: 'document',
  title: 'Player',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
    },
  ],
  preview: {
    select: {
      title: 'name',
    },
  },
};
