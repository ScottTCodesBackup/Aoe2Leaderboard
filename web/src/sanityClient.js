import sanityClient from '@sanity/client'
// import onevone from './match-functions/onevone'
import { api } from '../../studio/sanity.json'
const { projectId, dataset } = api

const client = sanityClient({
  projectId,
  dataset,
  useCdn: true
})

export default client
