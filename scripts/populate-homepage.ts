/**
 * Script to populate the homepage in Sanity with the hardcoded content
 *
 * Run with: npx tsx scripts/populate-homepage.ts
 *
 * Make sure SANITY_API_TOKEN is set in your environment
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

const homepageContent = [
  // 1. Hero Block
  {
    _type: 'heroBlock',
    _key: 'hero-1',
    badge: 'FLOW IN FAITH',
    title: 'Where Faith meets Freedom',
    subtitle: 'A Christ-centered wellness ecosystem rooted in embodiment, rest, and community.',
    primaryButtonText: 'Explore Flow in Faith',
    primaryButtonLink: '#what-is-flow-in-faith',
    secondaryButtonText: 'Find Your Space',
    secondaryButtonLink: '#our-sacred-spaces',
  },

  // 2. Intro Text Block
  {
    _type: 'introTextBlock',
    _key: 'intro-1',
    lines: [
      'Here, faith is embodied.',
      'Here, rest is sacred.',
      "Here, you don't have to choose between your calling, your culture, and your wholeness.",
    ],
    style: 'light',
  },

  // 3. Prose Section - What Is Flow in Faith?
  {
    _type: 'proseSectionBlock',
    _key: 'prose-1',
    heading: 'What Is Flow in Faith?',
    paragraphs: [
      'Flow in Faith is a Christ-centered wellness ecosystem offering culturally grounded spaces where healing, rest, and spiritual practice can coexist — without compromise.',
      "We were created for those who have been navigating their spiritual, emotional, and physical well-being in spaces that weren't built with them in mind — spaces that misunderstood their bodies, overlooked their culture, or asked them to separate faith from healing.",
      'Rooted in embodied Christian practice and centered on the lived experiences of People of Color, Flow in Faith offers a spiritual home where the body is honored as sacred, rest is reclaimed as devotion, and community becomes a pathway to healing, leadership, and renewal.',
    ],
    style: 'cream',
  },

  // 4. Two Column Compare - Why Flow in Faith Exists
  {
    _type: 'twoColumnCompareBlock',
    _key: 'compare-1',
    heading: 'Why Flow in Faith Exists',
    leftIntro: 'Too many people have been taught that:',
    leftItems: [
      'Rest must be earned',
      'The body is suspicious',
      'Faith and healing must be separate',
      'Wellness requires cultural erasure',
    ],
    rightHeading: 'We are here to tell a different story.',
    rightIntro: 'Flow in Faith exists to offer:',
    rightItems: [
      'Spiritually safe wellness practices',
      'Liberating, Christ-centered embodiment',
      'Community that reflects lived experience',
      'Rhythms that restore',
      'Faith that honors the whole person',
    ],
    closingText: 'This is not about striving.\nThis is about returning — to God, to the body, and to yourself.',
  },

  // 5. Space Cards - Our Two Sacred Spaces
  {
    _type: 'spaceCardsBlock',
    _key: 'spaces-1',
    heading: 'Our Two Sacred Spaces',
    subheading: 'Flow in Faith is home to two distinct yet connected communities — connected by shared values, care, and community.',
    description: 'Through our two core communities, we create room to slow down without guilt, practice faith in embodied, liberating ways, be seen and supported in your fullness, and grow in community instead of isolation.',
    cards: [
      {
        _key: 'card-teachers',
        title: 'Flow in Faith Teachers Collective',
        badge: 'Where Calling Meets Community',
        description: 'The Flow in Faith Teachers Collective is a community-centered home created exclusively for Yoga Teachers of Color who identify as Christian.\n\nThis is a space created so teachers could grow, collaborate, and be affirmed in the fullness of their identity, their faith, and their culture — without shrinking or separating pieces of themselves to belong.',
        bulletPoints: [
          'Daily community connection and support',
          'Spiritually aligned professional development',
          'Visibility for your work and gifts',
          'Opportunities to collaborate, teach, and lead',
          'A culturally safe space',
        ],
        closingText: 'You were never meant to carry this calling in isolation.',
        buttonText: 'Learn about the Teachers Collective',
        buttonLink: '/teacher-collective',
        buttonStyle: 'primary',
      },
      {
        _key: 'card-sanctuary',
        title: 'Flow in Faith Sanctuary',
        badge: 'Where Wellness Meets Worship',
        description: 'The Flow in Faith Sanctuary is a sacred space at the intersection of Christian spirituality, emotional wellness, and embodied practice — created with the lived experiences of People of Color at the center.\n\nThis is a place to rest without explanation, reconnect with God through breath, movement, and stillness, tend to emotional and spiritual well-being, experience faith that heals, and be held in gentle, affirming community.',
        closingText: 'Here, the body is not a barrier to God — it is a meeting place.',
        buttonText: 'Learn about the Sanctuary',
        buttonLink: '/sanctuary',
        buttonStyle: 'secondary',
      },
    ],
  },

  // 6. Path Chooser - Choose Your Path
  {
    _type: 'pathChooserBlock',
    _key: 'path-1',
    heading: 'Choose Your Path',
    intro: 'Whether you are:',
    options: [
      'A teacher seeking community, visibility, and spiritual grounding',
      'A seeker longing for rest, healing, and embodied faith',
      'Or someone still discerning where you belong',
    ],
    closingText: 'There is space for you here.',
    buttons: [
      {
        _key: 'btn-teacher',
        text: "I'm a Teacher → Teachers Collective",
        link: '/teacher-collective',
        style: 'primary',
      },
      {
        _key: 'btn-seeker',
        text: "I'm Seeking Rest → Sanctuary",
        link: '/sanctuary',
        style: 'secondary',
      },
    ],
  },

  // 7. Closing Statement
  {
    _type: 'closingStatementBlock',
    _key: 'closing-1',
    lines: [
      { _key: 'line-1', text: 'Flow in Faith is an invitation to move differently.', style: 'normal' },
      { _key: 'line-2', text: 'To breathe deeper.', style: 'normal' },
      { _key: 'line-3', text: 'To rest more honestly.', style: 'normal' },
      { _key: 'line-4', text: 'To trust that God meets you right where you are.', style: 'normal' },
      { _key: 'line-5', text: 'This is a place to belong.', style: 'bold' },
      { _key: 'line-6', text: 'This is a place to become.', style: 'bold' },
      { _key: 'line-7', text: 'This is Flow in Faith.', style: 'largeHighlight' },
    ],
  },
]

async function populateHomepage() {
  console.log('Checking for existing homepage document...')

  // Check if homepage exists
  const existing = await client.fetch('*[_type == "home"][0]')

  if (existing) {
    console.log('Found existing homepage document:', existing._id)
    console.log('Updating content...')

    await client
      .patch(existing._id)
      .set({ content: homepageContent })
      .commit()

    console.log('Homepage content updated successfully!')
  } else {
    console.log('No homepage document found. Creating new one...')

    await client.create({
      _type: 'home',
      title: 'Homepage',
      content: homepageContent,
    })

    console.log('Homepage created successfully!')
  }
}

populateHomepage().catch(console.error)
