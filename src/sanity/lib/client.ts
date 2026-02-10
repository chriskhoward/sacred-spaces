import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, useCdn } from '../env'

/** Default client: published content only, stega only in dev/preview env. */
export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
  stega: {
    enabled: process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview' || process.env.NODE_ENV === 'development',
    studioUrl: '/studio',
  },
})

/** Preview client: token + previewDrafts + stega for Presentation. Only created when SANITY_API_READ_TOKEN is set. */
const token = process.env.SANITY_API_READ_TOKEN
const previewClient =
  token &&
  createClient({
    apiVersion,
    dataset,
    projectId,
    useCdn: false,
    token,
    perspective: 'previewDrafts',
    stega: {
      enabled: true,
      studioUrl: '/studio',
    },
  })

/**
 * Returns the appropriate Sanity client for the request.
 * When draft is true, returns a client that fetches drafts and embeds stega for Presentation overlays.
 * Use in server components: const { isEnabled } = await draftMode(); const c = getClient(isEnabled);
 */
export function getClient(draft: boolean) {
  if (draft && previewClient) return previewClient
  return client
}
