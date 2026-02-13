import { createClerkClient } from '@clerk/nextjs/server';
import dotenv from 'dotenv';
import path from 'path';

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function listPlans() {
    const secretKey = process.env.CLERK_SECRET_KEY;
    if (!secretKey) {
        console.error('CLERK_SECRET_KEY is not defined in .env.local');
        return;
    }

    const clerk = createClerkClient({ secretKey });
    try {
        // @ts-ignore - checking v6 method
        const plans = await clerk.billing.getPlanList();
        console.log('CLERK_PLANS_START');
        console.log(JSON.stringify(plans, null, 2));
        console.log('CLERK_PLANS_END');
    } catch (e) {
        console.error('Failed to fetch plans:', e);
    }
}

listPlans();
