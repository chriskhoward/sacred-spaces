/**
 * Seed script for homepage content
 * Run with: SANITY_AUTH_TOKEN=... npx ts-node sanity/seed/home.ts
 *
 * This creates the home document with blocks matching the original hardcoded layout
 */

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_AUTH_TOKEN || '',
  useCdn: false,
});

const homeContent = [
  // 1. Hero Section
  {
    _type: 'homeHeroBlock',
    _key: 'hero-1',
    title: 'A Christ-centered wellness ecosystem rooted in embodiment, rest, and community.',
    subtitle: "Here, faith is embodied. Here, rest is sacred. Here, you don't have to choose between your calling, your culture, and your wholeness.",
    primaryButtonText: 'Join the Teachers Collective',
    primaryButtonLink: '/teacher-collective',
  },

  // 2. Sacred Banner
  {
    _type: 'brandBlock',
    _key: 'brand-1',
    quote: 'Rest is sacred. The body is holy. Healing belongs in faith.',
    body: '',
  },

  // 3. Inherited Stories
  {
    _type: 'richTextBlock',
    _key: 'rich-1',
    heading: '',
    body: [
      {
        _type: 'block',
        _key: 'block-1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span-1',
            text: 'Too many of us have inherited stories that frame wellness as selfish, the body as suspicious, and spiritual devotion as something that requires disconnection from culture, emotion, or lived experience.',
            marks: [],
          },
        ],
      },
      {
        _type: 'block',
        _key: 'block-2',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span-2',
            text: 'For many—especially ',
            marks: [],
          },
          {
            _type: 'span',
            _key: 'span-3',
            text: 'People of Color',
            marks: ['strong'],
          },
          {
            _type: 'span',
            _key: 'span-4',
            text: '—this has meant navigating faith spaces that ignore the body, and wellness spaces that ask us to leave parts of ourselves behind.',
            marks: [],
          },
        ],
      },
    ],
  },

  // 4. Different Story (heading + subheading)
  {
    _type: 'bannerTextBlock',
    _key: 'banner-1',
    heading: 'Flow in Faith is here to tell a different story',
    subheading: 'We exist to offer...',
    backgroundColor: 'primary',
  },

  // 5. Feature Grid (3 features)
  {
    _type: 'featureGridBlock',
    _key: 'features-1',
    heading: '',
    subheading: '',
    style: 'dark',
    items: [
      {
        _type: 'object',
        _key: 'feature-1',
        title: 'Liberating, Christ-centered embodiment',
        description: 'Faith-aligned practices that support rest, healing, and nervous system regulation—without fear, shame, or spiritual conflict.',
        imageUrl: '/images/homepage/feature-1.webp',
      },
      {
        _type: 'object',
        _key: 'feature-2',
        title: 'Faith that honors the whole person',
        description: 'A faith that welcomes questions, emotions, and embodiment—grounded in Christ and rooted in wholeness.',
        imageUrl: '/images/homepage/feature-2.webp',
      },
      {
        _type: 'object',
        _key: 'feature-3',
        title: 'Community that reflects lived experience',
        description: 'A culturally grounded community where identity, faith, and lived experience are honored without explanation or erasure.',
        imageUrl: '/images/homepage/feature-3.webp',
      },
    ],
  },

  // 6. Mission Section (Media + Text)
  {
    _type: 'mediaTextBlock',
    _key: 'media-1',
    title: '',
    badge: '',
    body: [
      {
        _type: 'block',
        _key: 'mission-block-1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'mission-span-1',
            text: 'Rooted in embodied Christian practice and centered on the lived experiences of People of Color, Flow in Faith offers a spiritual home where the body is honored as sacred, rest is reclaimed as devotion, and community becomes a pathway to healing, leadership, and renewal.',
            marks: [],
          },
        ],
      },
    ],
    listItems: [
      'Slow down without guilt',
      'Practice faith in embodied, liberating ways',
      'Be seen and supported in your fullness',
      'Grow in community instead of isolation',
    ],
    ctaText: 'Teachers Collective',
    ctaLink: '/teacher-collective',
    variant: 'mission',
    imagePosition: 'left',
  },

  // 7. Belonging Banner
  {
    _type: 'brandBlock',
    _key: 'brand-2',
    quote: 'This is a place to belong & become. This is Flow in Faith.',
    body: '',
  },

  // 8. Community Card (using spaceCardsBlock with single item)
  {
    _type: 'spaceCardsBlock',
    _key: 'space-1',
    heading: '',
    subheading: '',
    description: '',
    cards: [
      {
        _type: 'object',
        _key: 'card-1',
        title: 'The Flow in Faith Teachers Collective is a community-centered home created exclusively for Yoga Teachers of Color who love Jesus.',
        description: 'This is a space created so teachers could grow, collaborate, and be affirmed in the fullness of their identity, their faith, and their culture — without shrinking or separating pieces of themselves to belong.',
        buttonText: 'Learn more about the Teachers Collective',
        buttonLink: '/teacher-collective',
        buttonStyle: 'primary',
      },
    ],
  },

  // 9. Held by God Banner
  {
    _type: 'bannerTextBlock',
    _key: 'banner-2',
    heading: 'This is a space to be held by God,\nby community, and by breath.',
    subheading: '',
    backgroundColor: 'primary',
  },

  // 10. Whether You Are (Media + Text variant)
  {
    _type: 'mediaTextBlock',
    _key: 'media-2',
    title: 'Whether you are:',
    badge: '',
    body: [],
    listItems: [
      'A teacher seeking community, visibility, and spiritual grounding',
      'A seeker longing for rest, healing, and embodied faith',
      'Or someone still discerning where you belong',
    ],
    ctaText: 'Join the Teachers Collective',
    ctaLink: '/teacher-collective',
    variant: 'whether',
    imagePosition: 'left',
  },
];

async function seedHome() {
  try {
    console.log('🌱 Seeding homepage content...');

    // Check if home document already exists
    const existing = await client.fetch('*[_type == "home"][0]._id');

    if (existing) {
      // Update existing document
      console.log(`📝 Updating existing home document (${existing})...`);
      await client
        .patch(existing)
        .set({ content: homeContent })
        .commit();
      console.log('✅ Home document updated successfully');
    } else {
      // Create new document
      console.log('🆕 Creating new home document...');
      await client.create({
        _type: 'home',
        title: 'Homepage',
        content: homeContent,
      });
      console.log('✅ Home document created successfully');
    }

    console.log('\n🎉 Homepage seed complete!');
    console.log('Visit Sanity Studio to view and edit the homepage content.');
  } catch (error) {
    console.error('❌ Error seeding home:', error);
    process.exit(1);
  }
}

seedHome();
