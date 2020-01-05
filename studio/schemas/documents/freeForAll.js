import civilizationsList from '../objects/civilizationsList';

export default {
  name: 'freeForAll',
  type: 'object',
  title: 'Free for All Game',
  fields: [
    {
      title: 'Players that played',
      name: 'players',
      type: 'array',
      of: [
        {
          title: 'Player',
          name: 'player',
          type: 'object',
          fields: [
            {
              title: 'Player placed',
              name: 'score',
              type: 'number',
            },
            {
              title: 'Player',
              type: 'reference',
              name: 'player',
              to: [{
                type: 'player',
              }],
            },
            civilizationsList,
          ],
        },
      ],
    },
  ],
};
