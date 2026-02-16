/**
 * Migrate the Teacher Collective Dashboard cards into Sanity (singleton).
 * Creates the document with the current default cards in order so the client can edit in Studio.
 *
 * Run with: npx tsx scripts/seed-teacher-collective-dashboard.ts
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

const DASHBOARD_DOC = {
  _id: 'teacherCollectiveDashboard',
  _type: 'teacherCollectiveDashboard',
  title: 'Teacher Collective Dashboard',
  cards: [
    { _key: 'start', title: 'Start here', description: 'Videos, guides, and resources to get started with the Collective.', href: '/dashboard/teacher-collective/start' },
    { _key: 'community', title: 'Community', description: 'Creating community guidelines.', href: '/community', linkLabel: 'Go to Community →' },
    { _key: 'calls', title: 'Live Classes & Workshops', description: 'View upcoming live sessions and workshops with fellow teachers.', href: '/teacher-collective/calls' },
    { _key: 'video-library', title: 'On-Demand Library', description: 'Browse the on-demand video library with classes, workshops, and teachings.', href: '/video-library' },
    { _key: 'directory-profile', title: 'Edit Teacher Profile', description: 'Update your directory profile, bio, specialties, and contact information.', href: '/dashboard/directory-profile' },
    { _key: 'directory', title: 'Teacher Directory', description: 'View all teachers in the collective and manage your directory profile.', href: '/directory' },
    { _key: 'resources', title: 'Teaching Resources', description: 'Access curated resources, guides, and materials for Christ-Centered Yoga Teachers.', href: '/teacher-collective/resources' },
  ],
};

async function main() {
  await client.createOrReplace(DASHBOARD_DOC);
  console.log('Teacher Collective Dashboard document created/updated with _id: teacherCollectiveDashboard');
  console.log('Cards migrated in current order. Open Studio → Content → Teacher Collective Dashboard to edit.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
