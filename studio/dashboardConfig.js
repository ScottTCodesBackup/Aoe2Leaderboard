export default {
  widgets: [
    {name: 'structure-menu'},
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
                  title: 'Sanity Studio',
                  name: 'sanity-sapper-blog-studio-tuqbktp5',
                  apiId: 'a5fb70ec-b6a4-48f6-85a7-96064c38640b'
                },
                {
                  buildHookId: '5cf7a6fd8ae5eadca402cc7a',
                  title: 'Leaderboard Frontend',
                  name: 'sanity-sapper-blog-web-iqehtvd5',
                  apiId: '8c9e5a83-a8bf-4bad-a813-2838dbbdc9ba'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/ScottTCodes/sanity-sapper-blog',
            category: 'Code'
          },
          {title: 'Frontend', value: 'https://aoe2leaderboard.netlify.com/', category: 'apps'}
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}}
    // {
    //   name: 'document-list',
    //   options: {title: 'Recent recorded games', order: '_createdAt desc', types: ['post']},
    //   layout: {width: 'medium'}
    // }
    // Change this to pull in latest matches
  ]
}
