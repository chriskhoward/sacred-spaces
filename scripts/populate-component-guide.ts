/**
 * Script to populate the component guide page in Sanity with all block types
 *
 * Run with: npx tsx scripts/populate-component-guide.ts
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

const componentGuideContent = [
  // 1. Hero Block
  {
    _type: 'heroBlock',
    _key: 'hero-demo',
    badge: 'COMPONENT DEMO',
    title: 'Hero Block Example',
    subtitle: 'The hero block is the primary entry point for any page. It supports a badge, title, subtitle, and two CTA buttons with optional background images.',
    primaryButtonText: 'Primary Action',
    primaryButtonLink: '/apply',
    secondaryButtonText: 'Secondary Action',
    secondaryButtonLink: '/about',
  },

  // 2. Brand Block
  {
    _type: 'brandBlock',
    _key: 'brand-demo',
    quote: '"This is where a featured brand quote or mission statement goes. It spans the full width and creates a powerful visual pause."',
    body: 'Supporting text can provide additional context beneath the main quote. This block is perfect for brand messaging moments.',
  },

  // 3. Intro Text Block
  {
    _type: 'introTextBlock',
    _key: 'intro-demo',
    lines: [
      'This is the Intro Text Block.',
      'Each line appears on its own row.',
      'Perfect for taglines or poetic statements.',
    ],
    style: 'light',
  },

  // 4. Prose Section Block
  {
    _type: 'proseSectionBlock',
    _key: 'prose-demo',
    heading: 'Prose Section Block',
    paragraphs: [
      'The Prose Section is designed for longer descriptive content with a centered layout. It works well for "About" style sections or explaining concepts.',
      'Multiple paragraphs are supported, each rendered with proper spacing. The cream background variant provides visual separation from other sections.',
      'This block is ideal when you need to communicate detailed information in an easy-to-read format.',
    ],
    style: 'cream',
  },

  // 5. Pillars Block
  {
    _type: 'pillarsBlock',
    _key: 'pillars-demo',
    heading: 'Pillars Block',
    subheading: 'Four Column Grid',
    description: 'This block displays up to four items in a responsive grid. Each item has a title, description, and emoji icon.',
    items: [
      { _key: 'p1', title: 'First Pillar', description: 'Description for the first pillar item goes here.', icon: '🌿' },
      { _key: 'p2', title: 'Second Pillar', description: 'Description for the second pillar item goes here.', icon: '✨' },
      { _key: 'p3', title: 'Third Pillar', description: 'Description for the third pillar item goes here.', icon: '🙏' },
      { _key: 'p4', title: 'Fourth Pillar', description: 'Description for the fourth pillar item goes here.', icon: '💫' },
    ],
  },

  // 6. Benefits Block
  {
    _type: 'benefitsBlock',
    _key: 'benefits-demo',
    badge: 'MEMBERSHIP',
    title: 'Benefits Block',
    description: 'This layout combines a left sidebar with title and description, plus a right-side grid of benefit cards.',
    buttonText: 'Learn More',
    items: [
      { _key: 'b1', title: 'Benefit One', description: 'A short description of this membership benefit.' },
      { _key: 'b2', title: 'Benefit Two', description: 'Another benefit that members receive.' },
      { _key: 'b3', title: 'Benefit Three', description: 'Yet another valuable membership perk.' },
      { _key: 'b4', title: 'Benefit Four', description: 'The fourth benefit in this grid layout.' },
    ],
  },

  // 7. Media Text Block (Left)
  {
    _type: 'mediaTextBlock',
    _key: 'media-left-demo',
    badge: 'IMAGE LEFT',
    title: 'Media + Text Block',
    imagePosition: 'left',
    body: [
      {
        _type: 'block',
        _key: 'mt1',
        children: [{ _type: 'span', _key: 'mt1s', text: 'This block displays an image alongside text content. When set to "left", the image appears on the left side. The text supports rich formatting through Portable Text.' }],
      },
      {
        _type: 'block',
        _key: 'mt2',
        children: [{ _type: 'span', _key: 'mt2s', text: 'Use this for storytelling, feature highlights, or any content that benefits from visual pairing.' }],
      },
    ],
  },

  // 8. Media Text Block (Right)
  {
    _type: 'mediaTextBlock',
    _key: 'media-right-demo',
    badge: 'IMAGE RIGHT',
    title: 'Media + Text (Flipped)',
    imagePosition: 'right',
    body: [
      {
        _type: 'block',
        _key: 'mtr1',
        children: [{ _type: 'span', _key: 'mtr1s', text: 'The same component with imagePosition set to "right". Alternating between left and right creates visual rhythm as users scroll.' }],
      },
    ],
  },

  // 9. Two Column Compare Block
  {
    _type: 'twoColumnCompareBlock',
    _key: 'compare-demo',
    heading: 'Two Column Compare Block',
    leftIntro: 'Problems or pain points:',
    leftItems: [
      'First problem statement',
      'Second challenge users face',
      'Third issue to address',
      'Fourth pain point',
    ],
    rightHeading: 'Our Solution',
    rightIntro: 'What we offer instead:',
    rightItems: [
      'First solution benefit',
      'Second advantage',
      'Third positive outcome',
      'Fourth value proposition',
    ],
    closingText: 'This closing text summarizes the transformation.\nIt can span multiple lines.',
  },

  // 10. Space Cards Block
  {
    _type: 'spaceCardsBlock',
    _key: 'spaces-demo',
    heading: 'Space Cards Block',
    subheading: 'A two-column card layout for comparing offerings or paths.',
    description: 'Each card can have a title, badge, description, bullet points, closing text, and a CTA button.',
    cards: [
      {
        _key: 'sc1',
        title: 'First Option',
        badge: 'For Group A',
        description: 'Description of the first option or path. This card layout is great for membership tiers or community spaces.',
        bulletPoints: ['Feature one', 'Feature two', 'Feature three'],
        closingText: 'A compelling closing statement.',
        buttonText: 'Choose This Path',
        buttonLink: '/option-1',
        buttonStyle: 'primary',
      },
      {
        _key: 'sc2',
        title: 'Second Option',
        badge: 'For Group B',
        description: 'Description of the second option. Use different button styles to create visual hierarchy.',
        closingText: 'Another compelling statement.',
        buttonText: 'Explore This Option',
        buttonLink: '/option-2',
        buttonStyle: 'secondary',
      },
    ],
  },

  // 11. Feature Grid Block
  {
    _type: 'featureGridBlock',
    _key: 'feature-demo',
    heading: 'Feature Grid Block',
    subheading: 'A flexible grid for showcasing features or offerings',
    items: [
      { _key: 'f1', title: 'Feature One', description: 'Description of this feature and its benefits to users.', icon: '📚' },
      { _key: 'f2', title: 'Feature Two', description: 'Another feature with its own description text.', icon: '🎯' },
      { _key: 'f3', title: 'Feature Three', description: 'Third feature in the responsive grid layout.', icon: '💡' },
      { _key: 'f4', title: 'Feature Four', description: 'Fourth feature completing the grid pattern.', icon: '🌟' },
    ],
    style: 'light',
  },

  // 12. Premium Features Block
  {
    _type: 'premiumFeaturesBlock',
    _key: 'premium-demo',
    heading: 'Premium Features Block',
    items: [
      { _key: 'pf1', title: 'Premium Feature One', description: 'Detailed description of this premium offering and what it includes for members.' },
      { _key: 'pf2', title: 'Premium Feature Two', description: 'Another premium benefit with leaf icon styling.' },
      { _key: 'pf3', title: 'Premium Feature Three', description: 'Third premium feature in the list format.' },
    ],
    buttonText: 'Unlock Premium',
    buttonLink: '/apply',
  },

  // 13. Empathy Section Block
  {
    _type: 'empathySectionBlock',
    _key: 'empathy-demo',
    heading: 'Empathy Section Block',
    items: [
      'First empathetic statement that resonates with the reader.',
      'Second point that shows understanding of their situation.',
      'Third item that builds connection and trust.',
    ],
    style: 'light',
    buttonText: 'I Relate to This',
    buttonLink: '/apply',
  },

  // 14. Highlight Text Block
  {
    _type: 'highlightTextBlock',
    _key: 'highlight-demo',
    statements: [
      'This is the first bold statement that demands attention.',
      'Second statement that reinforces the message.',
      'Third powerful declaration that drives the point home.',
    ],
    style: 'cream',
  },

  // 15. Checklist Block
  {
    _type: 'checklistBlock',
    _key: 'checklist-demo',
    heading: 'Checklist Block',
    items: [
      'First item on the checklist with a checkmark',
      'Second qualifying statement or criteria',
      'Third point that resonates with target audience',
    ],
    closingText: 'Does this sound like you?',
    buttonText: 'Yes, This Is Me',
    buttonLink: '/apply',
  },

  // 16. Path Chooser Block
  {
    _type: 'pathChooserBlock',
    _key: 'path-demo',
    heading: 'Path Chooser Block',
    intro: 'Whether you are:',
    options: [
      'Someone in situation A',
      'Someone in situation B',
      'Someone still deciding',
    ],
    closingText: 'There is a path for you here.',
    buttons: [
      { _key: 'pb1', text: 'Path A', link: '/path-a', style: 'primary' },
      { _key: 'pb2', text: 'Path B', link: '/path-b', style: 'secondary' },
    ],
  },

  // 17. Testimonial Block
  {
    _type: 'testimonialBlock',
    _key: 'testimonial-demo',
    heading: 'Testimonial Block',
    items: [
      { _key: 't1', quote: 'This is a testimonial quote from a satisfied member. It should be authentic and specific.', author: 'Jane Doe', role: 'Community Member' },
      { _key: 't2', quote: 'Another powerful testimonial that speaks to the transformation experienced.', author: 'John Smith', role: 'Teacher' },
    ],
  },

  // 18. Team Block
  {
    _type: 'teamBlock',
    _key: 'team-demo',
    heading: 'Team Block',
    description: 'This block displays team members with a sticky sidebar layout. The heading stays fixed while content scrolls.',
    members: [
      { _key: 'tm1', name: 'Team Member One', role: 'Founder & Director' },
      { _key: 'tm2', name: 'Team Member Two', role: 'Community Lead' },
    ],
  },

  // 19. Founder Bio Block
  {
    _type: 'founderBioBlock',
    _key: 'founder-demo',
    badge: 'MEET THE FOUNDER',
    name: 'Founder Name',
    title: 'Founder & Vision Holder',
    bio: [
      {
        _type: 'block',
        _key: 'fb1',
        children: [{ _type: 'span', _key: 'fb1s', text: 'This is the founder bio section. It includes a large image, name, title, and rich text biography.' }],
      },
      {
        _type: 'block',
        _key: 'fb2',
        children: [{ _type: 'span', _key: 'fb2s', text: 'The layout is designed for a personal introduction with a prominent visual element.' }],
      },
    ],
    closingText: 'Are you ready to join the journey?',
    buttonText: 'Connect With Us',
    buttonLink: '/apply',
  },

  // 20. Video Block
  {
    _type: 'videoBlock',
    _key: 'video-demo',
    title: 'Video Block',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },

  // 21. Image Block
  {
    _type: 'imageBlock',
    _key: 'image-demo',
    caption: 'Showcase Image Block - Full width photography or brand imagery',
    fullWidth: true,
  },

  // 22. Rich Text Block
  {
    _type: 'richTextBlock',
    _key: 'richtext-demo',
    heading: 'Rich Text Block',
    body: [
      {
        _type: 'block',
        _key: 'rt1',
        children: [{ _type: 'span', _key: 'rt1s', text: 'The Rich Text Block is designed for long-form content. It uses a narrow container for optimal reading width and supports full Portable Text formatting.' }],
      },
      {
        _type: 'block',
        _key: 'rt2',
        children: [{ _type: 'span', _key: 'rt2s', text: 'Use this for articles, detailed explanations, policies, or any content that requires extended prose.' }],
      },
    ],
  },

  // 23. Text CTA Block
  {
    _type: 'textCtaBlock',
    _key: 'textcta-demo',
    heading: 'Text + CTA Block',
    body: 'A simple centered section with a heading, optional body text, and a call-to-action button. Available in light, dark, and cream styles.',
    buttonText: 'Take Action',
    buttonLink: '/apply',
    style: 'light',
    size: 'normal',
  },

  // 24. FAQ Block
  {
    _type: 'faqBlock',
    _key: 'faq-demo',
    heading: 'FAQ Block',
    items: [
      { _key: 'fq1', question: 'What is this FAQ block?', answer: 'This is a collapsible FAQ section. Each question expands to reveal its answer when clicked.' },
      { _key: 'fq2', question: 'How many questions can it hold?', answer: 'The FAQ block can hold any number of question/answer pairs. They are managed in Sanity.' },
      { _key: 'fq3', question: 'Is it accessible?', answer: 'Yes, the expand/collapse functionality is built with accessibility in mind.' },
    ],
  },

  // 25. Closing Statement Block
  {
    _type: 'closingStatementBlock',
    _key: 'closing-demo',
    lines: [
      { _key: 'cl1', text: 'This is the Closing Statement Block.', style: 'normal' },
      { _key: 'cl2', text: 'Each line can have different styles.', style: 'normal' },
      { _key: 'cl3', text: 'This line is bold.', style: 'bold' },
      { _key: 'cl4', text: 'This line is highlighted.', style: 'highlight' },
      { _key: 'cl5', text: 'This is a large highlight.', style: 'largeHighlight' },
    ],
  },

  // 26. CTA Block (Full Width)
  {
    _type: 'ctaBlock',
    _key: 'cta-demo',
    title: 'Full Width CTA Block',
    description: 'This block spans the full width with a colored background. It is designed to be the final call-to-action at the end of a page.',
    buttonText: 'Get Started Today',
    buttonLink: '/apply',
  },
]

async function populateComponentGuide() {
  console.log('Checking for existing component guide page...')

  // Check if page exists
  const existing = await client.fetch('*[_type == "page" && slug.current == "component-guide"][0]')

  if (existing) {
    console.log('Found existing component guide:', existing._id)
    console.log('Updating content...')

    await client
      .patch(existing._id)
      .set({
        content: componentGuideContent,
        showInNav: false,
      })
      .commit()

    console.log('Component guide updated successfully!')
  } else {
    console.log('No component guide found. Creating new one...')

    await client.create({
      _type: 'page',
      title: 'Component Guide',
      slug: { _type: 'slug', current: 'component-guide' },
      showInNav: false,
      content: componentGuideContent,
    })

    console.log('Component guide created successfully!')
  }
}

populateComponentGuide().catch(console.error)
