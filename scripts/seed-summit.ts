/**
 * Seed a demo Summit with speakers, presentations, yoga classes, and nav links.
 *
 * Run with: npx tsx scripts/seed-summit.ts
 *
 * Idempotent — re-running updates existing documents by matching on _type + name/title.
 */

import { createClient } from '@sanity/client'
import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(process.cwd(), '.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-12-21',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

// ---------- Helpers ----------

async function upsert(type: string, matchField: string, matchValue: string, doc: Record<string, any>) {
  const existing = await client.fetch<{ _id: string } | null>(
    `*[_type == $type && ${matchField} == $matchValue][0]{ _id }`,
    { type, matchValue }
  )
  if (existing) {
    await client.patch(existing._id).set(doc).commit()
    console.log(`  Updated ${type}: ${matchValue}`)
    return existing._id
  } else {
    const created = await client.create({ _type: type, ...doc })
    console.log(`  Created ${type}: ${matchValue}`)
    return created._id
  }
}

// ---------- Seed Data ----------

async function seed() {
  console.log('Seeding Flow in Faith Virtual Summit demo data...\n')

  // --- Summit ---
  const summitDoc = {
    title: 'Flow in Faith Virtual Summit',
    year: 2025,
    slug: { _type: 'slug', current: 'flow-in-faith-virtual-summit-2025' },
    isCurrent: true,
    description:
      'A 3-day virtual gathering for faith-based yoga teachers featuring inspiring presentations, community connection, and on-demand yoga classes.',
    startDate: '2025-04-14T09:00:00Z',
    endDate: '2025-04-16T21:00:00Z',
    communityLink: 'https://chat.whatsapp.com/example',
    registrationUrl: 'https://example.com/register',
    allAccessSalesUrl: 'https://example.com/all-access',
    clerkPlanId: 'summit_all_access',
    contactEmail: 'hello@flowinfaith.com',
    welcomeContentFree: [
      {
        _type: 'block',
        _key: 'welcome-free-1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'wf1',
            text: "Welcome to the Flow in Faith Virtual Summit! You're registered for free access, which means you can watch each presentation for 24 hours after it goes live. Want permanent access to all content? Upgrade to the All Access Pass anytime.",
          },
        ],
        markDefs: [],
      },
    ],
    welcomeContentAllAccess: [
      {
        _type: 'block',
        _key: 'welcome-aa-1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'wa1',
            text: "Welcome back, All Access member! You have permanent, unlimited access to every presentation, resource, and bonus yoga class. Enjoy the summit at your own pace — this content is yours forever.",
          },
        ],
        markDefs: [],
      },
    ],
    allAccessPerks: [
      {
        _type: 'block',
        _key: 'perks-1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'p1',
            text: 'The All Access Pass gives you:',
          },
        ],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'perks-2',
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: [
          { _type: 'span', _key: 'p2a', text: 'Permanent access to all presentations — watch anytime, forever' },
        ],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'perks-3',
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: [
          { _type: 'span', _key: 'p3a', text: 'Downloadable speaker resources and worksheets' },
        ],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'perks-4',
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: [
          { _type: 'span', _key: 'p4a', text: 'Exclusive bonus yoga classes' },
        ],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'perks-5',
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: [
          { _type: 'span', _key: 'p5a', text: 'Access to the private WhatsApp community' },
        ],
        markDefs: [],
      },
    ],
    navLinks: [
      { _key: 'nav-1', label: 'Start Here', path: '/start-here' },
      { _key: 'nav-2', label: 'Schedule', path: '/schedule' },
      { _key: 'nav-3', label: 'Speakers', path: '/speakers' },
      { _key: 'nav-4', label: 'Yoga Classes', path: '/yoga-classes' },
      { _key: 'nav-5', label: 'All Access', path: '/all-access' },
      { _key: 'nav-6', label: 'Contact', path: '/contact' },
    ],
    faqItems: [
      {
        _key: 'faq-1',
        question: 'How do I watch the presentations?',
        answer:
          'Each presentation will go live on its scheduled day. Free registrants have 24 hours to watch each one. All Access Pass holders can watch anytime, forever.',
      },
      {
        _key: 'faq-2',
        question: 'What if I miss a presentation?',
        answer:
          "If you're a free registrant and miss the 24-hour window, you won't be able to watch that presentation unless you upgrade to the All Access Pass. All Access holders never have to worry about missing anything.",
      },
      {
        _key: 'faq-3',
        question: 'How do I get the All Access Pass?',
        answer:
          'Visit the All Access page from the summit navigation to learn about what\'s included and purchase your pass.',
      },
      {
        _key: 'faq-4',
        question: 'Can I download the resources?',
        answer:
          'Speaker resources and worksheets are available on each presentation page. Some resources may be exclusive to All Access Pass holders.',
      },
    ],
  }

  const summitId = await upsert('summit', 'title', 'Flow in Faith Virtual Summit', summitDoc)

  // --- Speakers ---
  const speakers = [
    {
      name: 'Sarah Thompson',
      bio: 'Sarah is a certified yoga therapist and pastor who has been integrating faith and movement for over 15 years. She leads retreats across the US and is passionate about making yoga accessible to faith communities.',
      websiteUrl: 'https://example.com/sarah',
      socialLinks: [
        { _key: 'st-ig', platform: 'instagram', url: 'https://instagram.com/example' },
      ],
    },
    {
      name: 'Marcus Williams',
      bio: 'A former college athlete turned yoga instructor, Marcus brings an energetic and faith-centered approach to his teaching. He specializes in yoga for men and athletes.',
      websiteUrl: 'https://example.com/marcus',
      socialLinks: [
        { _key: 'mw-yt', platform: 'youtube', url: 'https://youtube.com/example' },
      ],
    },
    {
      name: 'Priya Patel',
      bio: 'Priya is a meditation teacher and spiritual director who bridges Eastern contemplative practices with Christian spirituality. She has trained over 500 teachers worldwide.',
      websiteUrl: 'https://example.com/priya',
      socialLinks: [
        { _key: 'pp-fb', platform: 'facebook', url: 'https://facebook.com/example' },
        { _key: 'pp-ig', platform: 'instagram', url: 'https://instagram.com/example' },
      ],
    },
    {
      name: 'David Chen',
      bio: 'David is a licensed counselor and yoga teacher who specializes in trauma-informed practices. He leads workshops on integrating body-based healing with faith-based counseling.',
      socialLinks: [
        { _key: 'dc-li', platform: 'linkedin', url: 'https://linkedin.com/in/example' },
      ],
    },
    {
      name: 'Amara Johnson',
      bio: 'Amara is an author, podcast host, and yoga instructor known for her joyful teaching style. Her book "Move in Grace" has inspired thousands of faith-based practitioners.',
      websiteUrl: 'https://example.com/amara',
      socialLinks: [
        { _key: 'aj-ig', platform: 'instagram', url: 'https://instagram.com/example' },
        { _key: 'aj-tt', platform: 'tiktok', url: 'https://tiktok.com/@example' },
      ],
    },
  ]

  const speakerIds: Record<string, string> = {}
  for (const s of speakers) {
    speakerIds[s.name] = await upsert('summitSpeaker', 'name', s.name, s)
  }

  // --- Presentations ---
  const now = new Date()
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000)
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000)
  const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)

  const presentations = [
    // Day 1
    {
      title: 'Opening Keynote: Faith on the Mat',
      slug: 'opening-keynote-faith-on-the-mat',
      speakerName: 'Sarah Thompson',
      description:
        'Join Sarah for a powerful opening keynote exploring how yoga and faith intersect. She shares her personal journey and offers practical insights for teachers looking to deepen their faith-based practice.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      availableDate: yesterday.toISOString(),
      expiresDate: tomorrow.toISOString(),
      dayNumber: 1,
      timeSlot: '10:00 AM EST',
      displayOrder: 1,
      resources: [
        { _key: 'r1', title: 'Keynote Slides (PDF)', url: 'https://example.com/slides.pdf' },
        { _key: 'r2', title: 'Reflection Worksheet', url: 'https://example.com/worksheet.pdf' },
      ],
    },
    {
      title: 'Building a Faith-Based Yoga Business',
      slug: 'building-a-faith-based-yoga-business',
      speakerName: 'Marcus Williams',
      description:
        'Marcus shares practical strategies for turning your faith-based yoga teaching into a sustainable business — from pricing and marketing to building community partnerships.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      availableDate: yesterday.toISOString(),
      expiresDate: tomorrow.toISOString(),
      dayNumber: 1,
      timeSlot: '2:00 PM EST',
      displayOrder: 2,
      resources: [
        { _key: 'r3', title: 'Business Planning Template', url: 'https://example.com/template.pdf' },
      ],
    },
    // Day 2
    {
      title: 'Contemplative Prayer & Movement',
      slug: 'contemplative-prayer-and-movement',
      speakerName: 'Priya Patel',
      description:
        'Explore the rich tradition of contemplative prayer and learn how to weave movement into your prayer practice. Priya guides you through practical techniques you can use in your classes.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      availableDate: tomorrow.toISOString(),
      expiresDate: nextWeek.toISOString(),
      dayNumber: 2,
      timeSlot: '10:00 AM EST',
      displayOrder: 1,
      resources: [],
    },
    {
      title: 'Trauma-Informed Teaching in Faith Spaces',
      slug: 'trauma-informed-teaching-in-faith-spaces',
      speakerName: 'David Chen',
      description:
        'David discusses how to create safe, trauma-informed yoga classes within faith communities. Learn the signs, the language, and the practices that make your classes a place of genuine healing.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      availableDate: tomorrow.toISOString(),
      expiresDate: nextWeek.toISOString(),
      dayNumber: 2,
      timeSlot: '2:00 PM EST',
      displayOrder: 2,
      resources: [
        { _key: 'r4', title: 'Trauma-Informed Checklist', url: 'https://example.com/checklist.pdf' },
      ],
    },
    // Day 3
    {
      title: 'Moving in Grace: Joy-Filled Teaching',
      slug: 'moving-in-grace-joy-filled-teaching',
      speakerName: 'Amara Johnson',
      description:
        "Amara's infectious energy fills this session on bringing more joy, play, and grace into your yoga classes. She demonstrates creative sequences and shares her philosophy of joyful movement.",
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      availableDate: nextWeek.toISOString(),
      expiresDate: new Date(nextWeek.getTime() + 24 * 60 * 60 * 1000).toISOString(),
      dayNumber: 3,
      timeSlot: '10:00 AM EST',
      displayOrder: 1,
      resources: [],
    },
    {
      title: 'Panel: The Future of Faith-Based Yoga',
      slug: 'panel-the-future-of-faith-based-yoga',
      speakerName: 'Sarah Thompson',
      description:
        'All five speakers join for a closing panel discussion on where faith-based yoga is headed, challenges in the space, and how teachers can support each other going forward.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      availableDate: nextWeek.toISOString(),
      expiresDate: new Date(nextWeek.getTime() + 24 * 60 * 60 * 1000).toISOString(),
      dayNumber: 3,
      timeSlot: '2:00 PM EST',
      displayOrder: 2,
      resources: [
        { _key: 'r5', title: 'Summit Recap Guide', url: 'https://example.com/recap.pdf' },
      ],
    },
  ]

  for (const p of presentations) {
    const { speakerName, ...rest } = p
    await upsert('summitPresentation', 'title', p.title, {
      ...rest,
      slug: { _type: 'slug', current: p.slug },
      summit: { _type: 'reference', _ref: summitId },
      speaker: { _type: 'reference', _ref: speakerIds[speakerName] },
    })
  }

  // --- Yoga Classes ---
  const yogaClasses = [
    {
      title: 'Gentle Morning Flow with Scripture',
      instructor: 'Sarah Thompson',
      description:
        'Start your day with this gentle 30-minute flow paired with scripture readings. Perfect for all levels.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      displayOrder: 1,
    },
    {
      title: 'Strength & Surrender',
      instructor: 'Marcus Williams',
      description:
        'A dynamic 45-minute power flow that challenges your body while inviting you to surrender and trust. Intermediate level.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      displayOrder: 2,
    },
    {
      title: 'Restorative Prayer Practice',
      instructor: 'Priya Patel',
      description:
        'A deeply restorative 40-minute practice combining supported postures with guided prayer and meditation.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      displayOrder: 3,
    },
  ]

  for (const yc of yogaClasses) {
    await upsert('summitYogaClass', 'title', yc.title, {
      ...yc,
      summit: { _type: 'reference', _ref: summitId },
    })
  }

  console.log('\nDone! Summit demo data seeded successfully.')
  console.log('Visit /summit to see the live pages.')
}

seed().catch(console.error)
