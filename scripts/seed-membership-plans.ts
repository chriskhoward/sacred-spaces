/**
 * Seed 4 standalone Membership Plans into Sanity.
 *
 * Run with: npx tsx scripts/seed-membership-plans.ts
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

async function seedPlans() {
    console.log('Seeding 4 Membership Plans to Sanity...');

    const PLANS = [
        {
            name: 'Collective Core (Founders)',
            slug: 'core-founders',
            isActive: true, // Active now (February)
            featured: false,
            displayOrder: 0,
            benefits: [
                'Teacher Directory Placement',
                'Monthly Community Check-Ins',
                'Daily Community Space',
                'Quarterly Masterclasses'
            ],
            pricing: {
                monthlyPrice: 37,
                yearlyPrice: 370,
                clerkPlanIdMonth: 'cplan_39XYMfLviwQ9cVZwIW5FuAKZRGH',
                clerkPlanIdYear: 'cplan_39XYMfLviwQ9cVZwIW5FuAKZRGH',
            }
        },
        {
            name: 'Collective Pro (Founders)',
            slug: 'pro-founders',
            isActive: true, // Active now (February)
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
                monthlyPrice: 57,
                yearlyPrice: 570,
                clerkPlanIdMonth: 'cplan_39XZ6jdRLNC78T7xYK7PP4J8RLO',
                clerkPlanIdYear: 'cplan_39XZ6jdRLNC78T7xYK7PP4J8RLO',
            }
        },
        {
            name: 'Collective Core',
            slug: 'core',
            isActive: false, // Inactive for now
            featured: false,
            displayOrder: 2,
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
            }
        },
        {
            name: 'Collective Pro',
            slug: 'pro',
            isActive: false, // Inactive for now
            featured: true,
            displayOrder: 3,
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
            }
        }
    ];

    for (const plan of PLANS) {
        const existing = await client.fetch<{ _id: string } | null>(
            `*[_type == "membershipPlan" && slug.current == $slug][0]{ _id }`,
            { slug: plan.slug }
        );

        const doc = {
            _type: 'membershipPlan',
            name: plan.name,
            slug: { _type: 'slug', current: plan.slug },
            isActive: plan.isActive,
            featured: plan.featured,
            displayOrder: plan.displayOrder,
            benefits: plan.benefits,
            pricing: plan.pricing
        };

        if (existing) {
            await client.patch(existing._id).set(doc).commit();
            console.log(`  Updated plan: ${plan.slug}`);
        } else {
            await client.create(doc);
            console.log(`  Created plan: ${plan.slug}`);
        }
    }

    console.log('\nDone!');
}

seedPlans().catch(console.error);
