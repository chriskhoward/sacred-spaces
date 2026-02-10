// Thrivecart Webhook Handler
// 1. Validates webhook secret
// 2. Checks if user exists in Clerk -> if so, upgrades them to Teacher (tier = core/pro from product)
// 3. Creates/Updates 'allowedUser' document in Sanity for future signups

import { NextRequest, NextResponse } from 'next/server';
import { writeClient } from '@/sanity/lib/write';
import { clerkClient } from '@clerk/nextjs/server';
import { tierFromThriveCartProduct } from '@/lib/tier';

export const dynamic = 'force-dynamic';

// GET handler for browser verification
export async function GET() {
  return NextResponse.json({
    status: 'active',
    message: 'Thrivecart webhook endpoint is ready',
    timestamp: new Date().toISOString()
  });
}

export async function POST(req: NextRequest) {
  try {
    const url = new URL(req.url);
    if (url.searchParams.get('debug_env') === 'true') {
      return NextResponse.json({
        hasSecret: !!process.env.THRIVECART_SECRET,
        secretLength: process.env.THRIVECART_SECRET?.length || 0
      });
    }

    // Clone the request to read body twice if needed
    const clonedReq = req.clone();

    let eventSecret = '';
    let customerEmail = '';
    let orderId = '';
    let productName = '';
    let productId: string | number | undefined;
    let isEmptyOrTestPing = false;

    const contentType = req.headers.get('content-type') || '';

    try {
      if (contentType.includes('application/json')) {
        const text = await clonedReq.text();
        // Handle empty body (Thrivecart verification ping)
        if (!text || text.trim() === '' || text.trim() === '{}') {
          isEmptyOrTestPing = true;
        } else {
          const json = JSON.parse(text);
          // Check if this is a test/ping with no real data
          if (!json.customer && !json.thrivecart_secret && !json.order_id) {
            isEmptyOrTestPing = true;
          } else {
            eventSecret = json.thrivecart_secret || '';
            customerEmail = json.customer?.email || '';
            orderId = json.order_id || '';
            productName = json.product_name || 'Unknown Product';
            productId = json.product_id;
          }
        }
      } else {
        const formData = await req.formData();
        eventSecret = formData.get('thrivecart_secret') as string || '';
        customerEmail = formData.get('customer[email]') as string || '';
        orderId = formData.get('order_id') as string || '';
        productName = (formData.get('product_name') as string) || 'Unknown Product';
        const pid = formData.get('product_id');
        if (pid != null && typeof pid === 'string') {
          productId = /^\d+$/.test(pid) ? parseInt(pid, 10) : pid;
        } else {
          productId = undefined;
        }

        // Check if this is a verification ping (no meaningful data)
        if (!customerEmail && !eventSecret && !orderId) {
          isEmptyOrTestPing = true;
        }
      }
    } catch (parseError) {
      // If we can't parse the body, treat it as a verification ping
      console.log('[Thrivecart] Could not parse body, treating as verification ping');
      isEmptyOrTestPing = true;
    }

    // Handle Thrivecart verification ping - return 200 OK
    if (isEmptyOrTestPing) {
      console.log('[Thrivecart] Verification ping received - returning 200 OK');
      return NextResponse.json({ success: true, message: 'Webhook endpoint active' });
    }

    // 1. Verify Secret (only for real webhook calls with data)
    const isValid = eventSecret === process.env.THRIVECART_SECRET;
    if (!isValid) {
      console.error('[Thrivecart] Invalid secret received');
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
        const tier = tierFromThriveCartProduct(productName, productId);
        await client.users.updateUserMetadata(user.id, {
          publicMetadata: {
            membershipType: 'teacher',
            tier,
          },
        });
        console.log(`[Thrivecart] Upgraded existing user ${user.id} (${customerEmail}) to teacher, tier=${tier}`);
        userUpgraded = true;
      }
    } catch (clerkError) {
      console.error('[Thrivecart] Error checking/upgrading Clerk user:', clerkError);
      // Continue to Sanity backup even if Clerk fails
    }

    // 3. Create/Update 'allowedUser' in Sanity
    // This serves as the "whitelist" for users who sign up LATER.
    // Link to alignment form submission if they submitted the Apply form first.

    const existingAllowed = await writeClient.fetch<{ _id: string; redeemed?: boolean } | null>(
      `*[_type == "allowedUser" && email == $email][0]`,
      { email: customerEmail }
    );

    const alignmentSubmission = await writeClient.fetch<{ _id: string } | null>(
      `*[_type == "alignmentSubmission" && email == $email][0]{ _id }`,
      { email: customerEmail }
    );

    const allowedUserPatch: Record<string, unknown> = {
      plan: productName,
      orderId: orderId,
      redeemed: existingAllowed?.redeemed || userUpgraded,
      ...(alignmentSubmission && { alignmentSubmissionId: alignmentSubmission._id }),
    };

    if (existingAllowed) {
      await writeClient.patch(existingAllowed._id).set(allowedUserPatch).commit();
      console.log(`[Thrivecart] Updated allowedUser for ${customerEmail}`);
    } else {
      await writeClient.create({
        _type: 'allowedUser',
        email: customerEmail,
        plan: productName,
        orderId: orderId,
        redeemed: userUpgraded,
        ...(alignmentSubmission && { alignmentSubmissionId: alignmentSubmission._id }),
      });
      console.log(`[Thrivecart] Created allowedUser for ${customerEmail}`);
    }

    return NextResponse.json({ success: true, userUpgraded });

  } catch (error) {
    console.error('Thrivecart Webhook Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
