import { createClerkClient } from '@clerk/nextjs/server';

async function test() {
  const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });
  // Check if billing/pricing is exposed
  console.log('Clerk keys:', Object.keys(clerk));
}
test();
