import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, useCdn } from '../env'

export const writeClient = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn: false, // Never use CDN for write operations
  token: process.env.SANITY_API_TOKEN, // Protected token required for writes
})
