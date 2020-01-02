export default {
  widgets: [
    { name: 'structure-menu' },
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '5cf7a6fd15f204f48068c03a',
                  title: 'Leaderboard Studio',
                  name: 'aoe2leaderboard-studio',
                  apiId: 'e959ed83-e9f1-4802-9243-1bdbc0a2f2cd',
                },
                {
                  buildHookId: '5d66b10148920a61b47907f7',
                  title: 'Leaderboard Frontend',
                  name: 'aoe2leaderboard',
                  apiId: '054e97e3-1592-444e-b294-606dfca9aaae',
                },
              ],
            },
          },
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/ScottTCodes/sanity-sapper-blog',
            category: 'Code',
          },
          { title: 'Frontend', value: 'https://aoe2leaderboard.netlify.com/', category: 'apps' },
        ],
      },
    },
    { name: 'project-users', layout: { height: 'auto' } },
    // {
    //   name: 'document-list',
    //   options: {title: 'Recent recorded games', order: '_createdAt desc', types: ['post']},
    //   layout: {width: 'medium'}
    // }
    // Change this to pull in latest matches
  ],
};
