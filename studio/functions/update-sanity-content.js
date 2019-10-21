// const sanityClient = require('@sanity/client')

// const client = sanityClient({
//   'projectId': 'cnummxbj',
//   'dataset': 'production',
//   // Remember to add a token with write access to your Netlify app’s environment variables.
//   // Call it SANITY_TOKEN
//   // https://docs.netlify.com/configure-builds/environment-variables/#declare-variables
//   token: process.env.SANITY_TOKEN,
//   useCdn: false
// })

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
// $ sanity hook create add-missing-value production https://yourdomain.netlify.com/.netlify/functions/update-sanity-content
// Webhooks can also be added in the API settings on https://manage.sanity.io
// exports.handler = async (event, context) => {
//   const {body} = event
//   if (body && body.ids) {
//     const {created} = body.ids // get the ids of new documents

//     try {
//       const res = await created
//         .reduce((trans, _id) => trans.patch(_id)
//           .setIfMissing({
//             test: `${_id}`
//           }),
//         client
//           .transaction())
//         .commit()
//         .catch(console.error)
//       console.log(`Updated ${res.length} documents.`)
//       console.log(created)
//       return {
//         statusCode: 200
//       }
//     } catch (err) {
//       return {statusCode: 500, body: err.toString()}
//     }
//   }

//   return {
//     statusCode: 500,
//     body: `${body}`
//   }
// }

exports.handler = (event, context, callback) => {
  callback(null, {
    statusCode: 200,
    body: 'No worries, all is working fine!'
  })
}
