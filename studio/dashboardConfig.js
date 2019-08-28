export default {
  widgets: [
    {
      name: 'sanity-tutorials',
      options: {
        templateRepoId: 'sanity-io/sanity-template-gatsby-blog'
      }
    },
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
                  buildHookId: '5d66b10189d7dbfae236fb4f',
                  title: 'Sanity Studio',
                  name: 'Aoe2Leaderboard-studio',
                  apiId: 'e959ed83-e9f1-4802-9243-1bdbc0a2f2cd'
                },
                {
                  buildHookId: '5d66b10148920a61b47907f7',
                  title: 'Blog Website',
                  name: 'Aoe2Leaderboard',
                  apiId: '054e97e3-1592-444e-b294-606dfca9aaae'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/ScottTCodes/Aoe2Leaderboard',
            category: 'Code'
          },
          {title: 'Frontend', value: 'https://Aoe2Leaderboard.netlify.com', category: 'apps'}
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recent blog posts', order: '_createdAt desc', types: ['post']},
      layout: {width: 'medium'}
    }
  ]
}
