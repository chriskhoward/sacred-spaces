// Thrivecart Webhook Handler
// 1. Validates webhook secret
// 2. Checks if user exists in Clerk -> if so, upgrades them to Teacher
// 3. Creates/Updates 'allowedUser' document in Sanity for future signups

import { NextRequest, NextResponse } from 'next/server';
import { writeClient } from '@/sanity/lib/write';
import { clerkClient } from '@clerk/nextjs/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const payload = await req.formData();

    // Thrivecart data
    const eventSecret = payload.get('thrivecart_secret');
    const customerEmail = payload.get('customer[email]') as string;
    // const customerFirstName = payload.get('customer[first_name]') as string;
    const orderId = payload.get('order_id') as string;
    const productName = payload.get('product_name') as string || 'Unknown Product';

    // 1. Verify Secret
    const isValid = eventSecret === process.env.THRIVECART_SECRET;
    if (!isValid) {
      // Return 200 to prevent Thrivecart retries if just unauthorized, 
      // but strictly speaking 401 is correct for unauthorized. 
      // Thrivecart retries on non-200.
      console.error('Invalid Thrivecart Secret');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!customerEmail) {
      return NextResponse.json({ error: 'Missing email' }, { status: 400 });
    }

    // 2. Check if user already exists in Clerk
    let userUpgraded = false;
    try {
      const client = await clerkClient();
      const userList = await client.users.getUserList({
        emailAddress: [customerEmail],
        limit: 1,
      });

      if (userList.data.length > 0) {
        const user = userList.data[0];
        // Upgrade user to teacher immediately
        await client.users.updateUserMetadata(user.id, {
          publicMetadata: {
            membershipType: 'teacher',
            tier: 'professional', // or whatever the plan maps to
          },
        });
        console.log(`[Thrivecart] Upgraded existing user ${user.id} (${customerEmail}) to teacher`);
        userUpgraded = true;
      }
    } catch (clerkError) {
      console.error('[Thrivecart] Error checking/upgrading Clerk user:', clerkError);
      // Continue to Sanity backup even if Clerk fails
    }

    // 3. Create/Update 'allowedUser' in Sanity
    // This serves as the "whitelist" for users who sign up LATER.

    // Check for existing allowedUser
    const existingAllowed = await writeClient.fetch(
      `*[_type == "allowedUser" && email == $email][0]`,
      { email: customerEmail }
    );

    if (existingAllowed) {
      await writeClient.patch(existingAllowed._id).set({
        plan: productName,
        orderId: orderId,
        redeemed: existingAllowed.redeemed || userUpgraded, // Mark redeemed if we just upgraded them
      }).commit();
      console.log(`[Thrivecart] Updated allowedUser for ${customerEmail}`);
    } else {
      await writeClient.create({
        _type: 'allowedUser',
        email: customerEmail,
        plan: productName,
        orderId: orderId,
        redeemed: userUpgraded, // Mark true if we already handled it via Clerk
      });
      console.log(`[Thrivecart] Created allowedUser for ${customerEmail}`);
    }

    return NextResponse.json({ success: true, userUpgraded });

  } catch (error) {
    console.error('Thrivecart Webhook Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
