/**
 * Populate the Sanity homepage document with content matching the current site design.
 * Run with: npx tsx scripts/populate-homepage.ts
 *
 * Requires SANITY_API_TOKEN (with write access) in .env.local.
 */

import { createClient } from '@sanity/client';
import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(process.cwd(), '.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-12-21',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  console.error('Error: NEXT_PUBLIC_SANITY_PROJECT_ID is not set');
  process.exit(1);
}

if (!process.env.SANITY_API_TOKEN) {
  console.error('Error: SANITY_API_TOKEN is not set (needs write access to create/patch the home document)');
  process.exit(1);
}

const homepageContent = [
  {
    _type: 'homeHeroBlock',
    _key: 'home-hero-1',
    title: 'A Christ-centered wellness ecosystem rooted in embodiment, rest, and community.',
    subtitle:
      "Here, faith is embodied. Here, rest is sacred. Here, you don't have to choose between your calling, your culture, and your wholeness.",
    primaryButtonText: 'Join the Teachers Collective',
  },
  {
    _type: 'highlightTextBlock',
    _key: 'sacred-banner',
    statements: ['Rest is sacred. The body is holy. Healing belongs in faith.'],
    style: 'dark',
    variant: 'bannerCentered',
  },
  {
    _type: 'proseSectionBlock',
    _key: 'inherited-stories',
    paragraphs: [
      'Too many of us have inherited stories that frame wellness as selfish, the body as suspicious, and spiritual devotion as something that requires disconnection from culture, emotion, or lived experience.',
      'For many—especially People of Color—this has meant navigating faith spaces that ignore the body, and wellness spaces that ask us to leave parts of ourselves behind.',
    ],
    style: 'boxed',
    alignment: 'left',
  },
  {
    _type: 'highlightTextBlock',
    _key: 'different-story',
    statements: [
      'Flow in Faith is here to tell a different story',
      'We exist to offer...',
    ],
    style: 'dark',
    variant: 'bannerTwoLineGold',
  },
  {
    _type: 'featureGridBlock',
    _key: 'feature-grid-3',
    items: [
      {
        _key: 'f1',
        title: 'Liberating, Christ-centered embodiment',
        description:
          'Faith-aligned practices that support rest, healing, and nervous system regulation—without fear, shame, or spiritual conflict.',
      },
      {
        _key: 'f2',
        title: 'Faith that honors the whole person',
        description:
          'A faith that welcomes questions, emotions, and embodiment—grounded in Christ and rooted in wholeness.',
      },
      {
        _key: 'f3',
        title: 'Community that reflects lived experience',
        description:
          'A culturally grounded community where identity, faith, and lived experience are honored without explanation or erasure.',
      },
    ],
    style: 'dark',
  },
  {
    _type: 'mediaTextBlock',
    _key: 'mission-section',
    title: 'Through the Teachers Collective, we create room to:',
    body: [
      {
        _type: 'block',
        _key: 'b1',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 's1',
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
    imagePosition: 'left',
    variant: 'mission',
    ctaText: 'Teachers Collective',
    useFillout: true,
  },
  {
    _type: 'highlightTextBlock',
    _key: 'belonging-banner',
    statements: ['This is a place to belong & become. This is Flow in Faith.'],
    style: 'dark',
    variant: 'bannerWhite',
  },
  {
    _type: 'imageBlock',
    _key: 'community-card-logo',
    caption: 'Flow in Faith Logo',
    fullWidth: false,
    variant: 'logo',
  },
  {
    _type: 'proseSectionBlock',
    _key: 'community-card-text',
    heading: 'The Flow in Faith Teachers Collective is a community-centered home created exclusively for Yoga Teachers of Color who love Jesus.',
    paragraphs: [
      'This is a space created so teachers could grow, collaborate, and be affirmed in the fullness of their identity, their faith, and their culture — without shrinking or separating pieces of themselves to belong.',
    ],
    style: 'card',
    buttonText: 'Learn more about the Teachers Collective',
    buttonLink: '/teacher-collective',
  },
  {
    _type: 'highlightTextBlock',
    _key: 'held-by-god',
    statements: [
      'This is a space to be held by God,',
      'by community, and by breath.',
    ],
    style: 'dark',
    variant: 'bannerGoldLarge',
  },
  {
    _type: 'mediaTextBlock',
    _key: 'whether-you-are',
    title: 'Whether you are:',
    listItems: [
      'A teacher seeking community, visibility, and spiritual grounding',
      'A seeker longing for rest, healing, and embodied faith',
      'Or someone still discerning where you belong',
    ],
    imagePosition: 'left',
    variant: 'whether',
    ctaText: 'Join the Teachers Collective',
    ctaLink: '/teacher-collective',
  },
];

async function populateHomepage() {
  console.log('Checking for existing homepage document...');

  const existing = await client.fetch<{ _id: string } | null>('*[_type == "home"][0]{ _id }');

  if (existing?._id) {
    console.log('Found existing homepage document:', existing._id);
    console.log('Updating content...');
    await client.patch(existing._id).set({ content: homepageContent }).commit();
    console.log('Homepage content updated successfully!');
  } else {
    console.log('No homepage document found. Creating new one...');
    await client.create({
      _type: 'home',
      _id: 'home',
      title: 'Homepage',
      content: homepageContent,
    });
    console.log('Homepage created successfully!');
  }
}

populateHomepage().catch(console.error);
