/**
 * Remove orphaned `foundersPricing` fields from Membership Plan documents.
 *
 * These fields were part of an earlier schema version where founders pricing
 * was embedded inside each plan. The current approach uses separate plan
 * documents instead, so these fields are no longer needed.
 *
 * Run with: npx tsx scripts/clean-orphaned-founders-fields.ts
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

async function cleanOrphanedFields() {
    // Fetch all membership plans that still have the foundersPricing field
    const plans = await client.fetch<Array<{ _id: string; name: string; foundersPricing?: any }>>(
        `*[_type == "membershipPlan" && defined(foundersPricing)]{ _id, name, foundersPricing }`
    );

    if (plans.length === 0) {
        console.log('✅ No orphaned foundersPricing fields found. Nothing to clean.');
        return;
    }

    console.log(`Found ${plans.length} plan(s) with orphaned foundersPricing data:\n`);

    for (const plan of plans) {
        console.log(`  📋 ${plan.name} (${plan._id})`);
        console.log(`     foundersPricing:`, JSON.stringify(plan.foundersPricing, null, 2));
    }

    console.log('\nRemoving foundersPricing from all affected documents...\n');

    for (const plan of plans) {
        await client.patch(plan._id).unset(['foundersPricing']).commit();
        console.log(`  ✅ Cleaned: ${plan.name}`);
    }

    console.log('\n🎉 Done! All orphaned foundersPricing fields have been removed.');
}

cleanOrphanedFields().catch(console.error);
