/**
 * Script to populate video and resource categories in Sanity
 *
 * Run with: npx tsx scripts/populate-categories.ts
 */

import { createClient } from '@sanity/client'
import { config } from 'dotenv'
import { resolve } from 'path'

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-12-21',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  console.error('Error: NEXT_PUBLIC_SANITY_PROJECT_ID is not set')
  process.exit(1)
}

if (!process.env.SANITY_API_TOKEN) {
  console.error('Error: SANITY_API_TOKEN is not set')
  process.exit(1)
}

const videoCategories = [
  { title: 'Vinyasa', slug: 'vinyasa', order: 1 },
  { title: 'Restorative', slug: 'restorative', order: 2 },
  { title: 'Meditation', slug: 'meditation', order: 3 },
  { title: 'Hatha', slug: 'hatha', order: 4 },
  { title: 'Workshop', slug: 'workshop', order: 5 },
]

const resourceCategories = [
  { title: 'Masterclass', slug: 'masterclass', order: 1 },
  { title: 'Business & Growth', slug: 'business-growth', order: 2 },
  { title: 'Class Sequencing', slug: 'class-sequencing', order: 3 },
  { title: 'Theology', slug: 'theology', order: 4 },
]

async function populateCategories() {
  console.log('Creating video categories...')

  for (const cat of videoCategories) {
    // Check if already exists
    const existing = await client.fetch(
      `*[_type == "videoCategory" && slug.current == $slug][0]`,
      { slug: cat.slug }
    )

    if (existing) {
      console.log(`  Video category "${cat.title}" already exists, skipping`)
    } else {
      await client.create({
        _type: 'videoCategory',
        title: cat.title,
        slug: { _type: 'slug', current: cat.slug },
        order: cat.order,
      })
      console.log(`  Created video category: ${cat.title}`)
    }
  }

  console.log('\nCreating resource categories...')

  for (const cat of resourceCategories) {
    // Check if already exists
    const existing = await client.fetch(
      `*[_type == "resourceCategory" && slug.current == $slug][0]`,
      { slug: cat.slug }
    )

    if (existing) {
      console.log(`  Resource category "${cat.title}" already exists, skipping`)
    } else {
      await client.create({
        _type: 'resourceCategory',
        title: cat.title,
        slug: { _type: 'slug', current: cat.slug },
        order: cat.order,
      })
      console.log(`  Created resource category: ${cat.title}`)
    }
  }

  console.log('\nDone!')
  console.log('\nIMPORTANT: You will need to update existing videos and resources')
  console.log('to use the new category references instead of the old string values.')
}

populateCategories().catch(console.error)
