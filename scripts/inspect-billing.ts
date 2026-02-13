import { createClerkClient } from '@clerk/nextjs/server';

async function inspectBilling() {
    const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });
    console.log('CLERK_BILLING_KEYS_START');
    console.log('clerk.billing keys:', Object.keys(clerk.billing || {}));
    console.log('CLERK_BILLING_KEYS_END');
}

inspectBilling();
