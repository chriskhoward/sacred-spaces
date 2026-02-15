/**
 * Seed Membership Plans into Sanity.
 *
 * Run with: npx tsx scripts/seed-membership-plans.ts
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

const PLANS = [
    {
        name: 'Teachers Collective Core',
        slug: 'core',
        featured: false,
        displayOrder: 0,
        benefits: [
            'Teacher Directory Placement',
            'Monthly Community Check-Ins',
            'Daily Community Space',
            'Quarterly Masterclasses'
        ],
        pricing: {
            monthlyPrice: 47,
            yearlyPrice: 470.04,
            clerkPlanIdMonth: 'cplan_39RVE1cg83vWrMv6WezIPHDjaF4',
            clerkPlanIdYear: 'cplan_39RVE1cg83vWrMv6WezIPHDjaF4',
        },
        foundersPricing: {
            isActive: true,
            monthlyPrice: 37,
            yearlyPrice: 370,
            clerkPlanIdMonth: 'cplan_39XYMfLviwQ9cVZwIW5FuAKZRGH',
            clerkPlanIdYear: 'cplan_39XYMfLviwQ9cVZwIW5FuAKZRGH',
        }
    },
    {
        name: 'Teachers Collective Pro',
        slug: 'pro',
        featured: true,
        displayOrder: 1,
        benefits: [
            'Teacher Directory Placement',
            'Monthly Community Check-Ins',
            'Daily Community Space',
            'Quarterly Masterclasses',
            'Promotion of Offerings',
            'Paid Teaching Opportunities',
            'Contribution to On-Demand Library'
        ],
        pricing: {
            monthlyPrice: 67,
            yearlyPrice: 670.08,
            clerkPlanIdMonth: 'cplan_39RVTnsvjEGQc6psl785lwUyjho',
            clerkPlanIdYear: 'cplan_39RVTnsvjEGQc6psl785lwUyjho',
        },
        foundersPricing: {
            isActive: true,
            monthlyPrice: 57,
            yearlyPrice: 570,
            clerkPlanIdMonth: 'cplan_39XZ6jdRLNC78T7xYK7PP4J8RLO',
            clerkPlanIdYear: 'cplan_39XZ6jdRLNC78T7xYK7PP4J8RLO',
        }
    }
];

async function seedPlans() {
    console.log('Seeding Membership Plans to Sanity...');

    for (const plan of PLANS) {
        console.log(`  Processing ${plan.name}...`);

        // Check if it exists
        const existing = await client.fetch<{ _id: string } | null>(
            `*[_type == "membershipPlan" && slug.current == $slug][0]{ _id }`,
            { slug: plan.slug }
        );

        const doc = {
            _type: 'membershipPlan',
            name: plan.name,
            slug: { _type: 'slug', current: plan.slug },
            featured: plan.featured,
            displayOrder: plan.displayOrder,
            benefits: plan.benefits,
            pricing: plan.pricing,
            foundersPricing: plan.foundersPricing,
        };

        if (existing) {
            await client.patch(existing._id).set(doc).commit();
            console.log(`    Updated existing plan: ${plan.slug}`);
        } else {
            await client.create(doc);
            console.log(`    Created new plan: ${plan.slug}`);
        }
    }

    console.log('\nDone! Membership plans are now in Sanity.');
}

seedPlans().catch(console.error);
