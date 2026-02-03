import { defineEnableDraftMode } from 'next-sanity/draft-mode'
import { client } from '@/sanity/lib/client'

const token = process.env.SANITY_API_READ_TOKEN

if (!token) {
  console.warn('Warning: SANITY_API_READ_TOKEN is not set. Draft mode will not work.')
}

export const { GET } = defineEnableDraftMode({
  client: client.withConfig({
    token,
    // Ensure we can read draft content
    perspective: 'previewDrafts',
  }),
})
