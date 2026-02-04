import { defineEnableDraftMode } from 'next-sanity/draft-mode'
import { client } from '@/sanity/lib/client'
import { NextRequest, NextResponse } from 'next/server'

const token = process.env.SANITY_API_READ_TOKEN
const previewSecret = process.env.SANITY_PREVIEW_SECRET

if (!token) {
  console.warn('Warning: SANITY_API_READ_TOKEN is not set. Draft mode will not work.')
}

if (!previewSecret) {
  console.warn('Warning: SANITY_PREVIEW_SECRET is not set. Draft mode will not be secure.')
}

export const { GET } = defineEnableDraftMode({
  client: client.withConfig({
    token,
    // Ensure we can read draft content
    perspective: 'previewDrafts',
  }),
})
