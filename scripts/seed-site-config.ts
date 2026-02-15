/**
 * Seed Site Settings and Navigation from hardcoded values.
 * 
 * Run with: npx tsx scripts/seed-site-config.ts
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

async function seedSiteConfig() {
    console.log('Seeding Site Settings and Navigation...');

    // 1. Seed Site Settings
    const settingsId = 'siteSettings';
    const siteSettings = {
        _id: settingsId,
        _type: 'siteSettings',
        title: 'Flow in Faith - Christ-Centered Yoga',
        description: 'A membership community for Christ-Centered Yoga Teachers of Color and practitioners.',
        contactEmail: 'info@flowinfaith.com',
        socialLinks: {
            facebook: 'https://www.facebook.com/itsFlowinFaith/',
            instagram: 'https://www.instagram.com/itsflowinfaith/',
            youtube: 'https://www.youtube.com/@ItsFlowinFaith',
            tiktok: 'https://www.tiktok.com/@itsflowinfaith/',
        },
    };

    await client.createOrReplace(siteSettings);
    console.log('  ✅ Seeded Site Settings');

    // 2. Seed Navigation (Main Menu)
    const navId = 'mainNavigation';
    const navigation = {
        _id: navId,
        _type: 'navigation',
        title: 'Main Navigation',
        items: [
            { _key: '1', label: 'Home', linkType: 'external', externalUrl: '/' },
            { _key: '2', label: 'Teacher Collective', linkType: 'external', externalUrl: '/teacher-collective' },
            { _key: '3', label: 'Community', linkType: 'external', externalUrl: '/community' },
            { _key: '4', label: 'Directory', linkType: 'external', externalUrl: '/directory' },
            { _key: '5', label: 'Video Library', linkType: 'external', externalUrl: '/video-library' },
        ],
    };

    await client.createOrReplace(navigation);
    console.log('  ✅ Seeded Main Navigation');

    // 3. Seed Announcement Bar (Draft/Inactive)
    const announcementId = 'announcementBar';
    const announcement = {
        _id: announcementId,
        _type: 'announcementBar',
        title: 'Founders Launch Promo',
        text: 'Save 10% with code FOUNDER until Feb 28!',
        isActive: false,
        backgroundColor: 'bg-roti',
    };

    await client.createOrReplace(announcement);
    console.log('  ✅ Seeded Announcement Bar (Inactive)');

    console.log('\nMigration complete! You can now manage these in Sanity Studio.');
}

seedSiteConfig().catch(console.error);
