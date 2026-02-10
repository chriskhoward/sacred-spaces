/**
 * Seed placeholder onboarding categories and items for the Start here page.
 *
 * Run with: npx tsx scripts/seed-onboarding.ts
 *
 * Requires .env.local with NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN.
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
  console.error('Error: SANITY_API_TOKEN is not set');
  process.exit(1);
}

const PLACEHOLDER_CATEGORIES = [
  { title: 'Welcome', slug: 'welcome', order: 0 },
  { title: 'Getting started', slug: 'getting-started', order: 1 },
  { title: 'Resources', slug: 'resources', order: 2 },
];

const PLACEHOLDER_ITEMS: {
  title: string;
  description: string;
  categorySlug: string;
  itemType: 'video' | 'pdf' | 'link';
  url?: string;
  order: number;
}[] = [
  {
    title: 'Welcome to the Collective',
    description: 'A short overview of what the Teachers Collective is and how it supports you.',
    categorySlug: 'welcome',
    itemType: 'link',
    url: 'https://flowinfaith.com',
    order: 0,
  },
  {
    title: 'Community guidelines',
    description: 'How we show up for each other and create a safe, affirming space.',
    categorySlug: 'welcome',
    itemType: 'link',
    url: 'https://flowinfaith.com/community',
    order: 1,
  },
  {
    title: 'Complete your directory profile',
    description: 'Get visible in the Teacher Directory so practitioners can find you.',
    categorySlug: 'getting-started',
    itemType: 'link',
    url: 'https://flowinfaith.com/dashboard/directory-profile',
    order: 0,
  },
  {
    title: 'Join the Community',
    description: 'Connect with fellow teachers in our WhatsApp community space.',
    categorySlug: 'getting-started',
    itemType: 'link',
    url: 'https://flowinfaith.com/community',
    order: 1,
  },
  {
    title: 'Teaching resources',
    description: 'Curated guides, masterclasses, and materials for Christ-centered yoga teachers.',
    categorySlug: 'resources',
    itemType: 'link',
    url: 'https://flowinfaith.com/teacher-collective/resources',
    order: 0,
  },
  {
    title: 'Live classes & workshops',
    description: 'View the schedule and join upcoming sessions.',
    categorySlug: 'resources',
    itemType: 'link',
    url: 'https://flowinfaith.com/teacher-collective/calls',
    order: 1,
  },
];

async function seedOnboarding() {
  const categoryIds = new Map<string, string>();

  console.log('Creating onboarding categories...');
  for (const cat of PLACEHOLDER_CATEGORIES) {
    const existing = await client.fetch<{ _id: string } | null>(
      `*[_type == "teacherOnboardingCategory" && slug.current == $slug][0]{ _id }`,
      { slug: cat.slug }
    );
    if (existing) {
      categoryIds.set(cat.slug, existing._id);
      console.log(`  Category "${cat.title}" already exists, skipping`);
    } else {
      const doc = await client.create({
        _type: 'teacherOnboardingCategory',
        title: cat.title,
        slug: { _type: 'slug', current: cat.slug },
        order: cat.order,
      });
      categoryIds.set(cat.slug, doc._id);
      console.log(`  Created category: ${cat.title}`);
    }
  }

  console.log('\nCreating placeholder onboarding items...');
  const existingItems = await client.fetch<{ _id: string }[]>(
    `*[_type == "teacherOnboardingItem"]{ _id }`
  );
  if (existingItems.length > 0) {
    console.log(`  ${existingItems.length} item(s) already exist. Skipping item creation to avoid duplicates.`);
    console.log('  Delete existing items in Studio if you want to re-seed.');
  } else {
    for (const item of PLACEHOLDER_ITEMS) {
      const categoryId = categoryIds.get(item.categorySlug);
      await client.create({
        _type: 'teacherOnboardingItem',
        title: item.title,
        description: item.description,
        category: categoryId ? { _type: 'reference', _ref: categoryId } : undefined,
        itemType: item.itemType,
        url: item.url ?? undefined,
        order: item.order,
      });
      console.log(`  Created item: ${item.title}`);
    }
  }

  console.log('\nDone! Visit /dashboard/teacher-collective/start (as a teacher) to see the Start here page.');
}

seedOnboarding().catch(console.error);
