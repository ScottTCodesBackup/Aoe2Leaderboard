import sanityClient from '@sanity/client';
import { api } from '../../studio/sanity.json';

const { projectId, dataset } = api;

const client = sanityClient({
  projectId,
  dataset,
  token: process.env.SAPPER_APP_FRONTEND_TOKEN,
  useCdn: false
});

export default client;
