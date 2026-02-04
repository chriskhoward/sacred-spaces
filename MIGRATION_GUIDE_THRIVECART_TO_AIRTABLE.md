# Migration Guide: Thrivecart → Clerk + Airtable

This guide walks you through removing Thrivecart and using **Clerk** for authentication/membership management with **Airtable** as your membership database.

## Current Architecture (Thrivecart)

```
User Flow:
1. User fills alignment form at /apply
2. Redirected to /join with Thrivecart checkout
3. Thrivecart processes payment
4. Webhook hits /api/webhooks/thrivecart
5. Clerk user metadata updated OR allowedUser created in Sanity
6. On signup, Clerk webhook checks Sanity allowedUser and upgrades
```

## New Architecture (Clerk + Airtable)

```
User Flow:
1. User fills alignment form at /apply (saved to Airtable)
2. Admin reviews in Airtable, approves membership
3. Airtable automation triggers webhook to your API
4. API upgrades user in Clerk OR adds to Airtable "approved" list
5. On signup, Clerk webhook checks Airtable and upgrades
```

---

## Step 1: Set Up Airtable

### Create Your Airtable Base

Create a base called "Flow in Faith Members" with these tables:

#### Table 1: Members
| Field Name | Field Type | Description |
|------------|-----------|-------------|
| Email | Email (Primary) | User's email address |
| Name | Single line text | Full name |
| Membership Type | Single select | `teacher`, `practitioner` |
| Tier | Single select | `free`, `professional`, `plus` |
| Status | Single select | `pending`, `approved`, `active`, `cancelled` |
| Clerk User ID | Single line text | Synced from Clerk after signup |
| Payment Method | Single select | `manual`, `stripe`, `paypal`, etc. |
| Payment Amount | Currency | Monthly/yearly amount |
| Payment Frequency | Single select | `monthly`, `yearly`, `lifetime` |
| Start Date | Date | Membership start |
| Expiry Date | Date | For non-recurring |
| Notes | Long text | Admin notes |
| Created | Created time | Auto |
| Last Modified | Last modified time | Auto |

#### Table 2: Applications (Optional - for alignment form)
| Field Name | Field Type | Description |
|------------|-----------|-------------|
| Email | Email | Applicant email |
| Name | Single line text | Full name |
| Responses | Long text | JSON of form responses |
| Status | Single select | `new`, `reviewed`, `approved`, `rejected` |
| Created | Created time | Auto |

### Get Your Airtable Credentials

1. Go to https://airtable.com/create/tokens
2. Create a Personal Access Token with scopes:
   - `data.records:read`
   - `data.records:write`
3. Note your:
   - **Personal Access Token**: `pat_xxxx`
   - **Base ID**: Found in the URL when viewing your base (starts with `app`)
   - **Table IDs**: Found in API docs (starts with `tbl`)

---

## Step 2: Install Airtable Package

```bash
npm install airtable
```

---

## Step 3: Update Environment Variables

Add to `.env.local`:

```env
# Airtable
AIRTABLE_API_KEY=pat_your_personal_access_token
AIRTABLE_BASE_ID=appYourBaseId
AIRTABLE_MEMBERS_TABLE_ID=tblMembersTableId

# Remove these (Thrivecart)
# THRIVECART_SECRET=xxx
```

---

## Step 4: Create Airtable Client

Create `src/lib/airtable.ts`:

```typescript
import Airtable from 'airtable';

// Configure Airtable
Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY,
});

const base = Airtable.base(process.env.AIRTABLE_BASE_ID!);

export const membersTable = base(process.env.AIRTABLE_MEMBERS_TABLE_ID || 'Members');

// Types
export interface MemberRecord {
  id: string;
  email: string;
  name: string;
  membershipType: 'teacher' | 'practitioner';
  tier: 'free' | 'professional' | 'plus';
  status: 'pending' | 'approved' | 'active' | 'cancelled';
  clerkUserId?: string;
  paymentMethod?: string;
  startDate?: string;
  expiryDate?: string;
}

// Find member by email
export async function findMemberByEmail(email: string): Promise<MemberRecord | null> {
  try {
    const records = await membersTable
      .select({
        filterByFormula: `{Email} = '${email}'`,
        maxRecords: 1,
      })
      .firstPage();

    if (records.length === 0) return null;

    const record = records[0];
    return {
      id: record.id,
      email: record.get('Email') as string,
      name: record.get('Name') as string,
      membershipType: record.get('Membership Type') as 'teacher' | 'practitioner',
      tier: record.get('Tier') as 'free' | 'professional' | 'plus',
      status: record.get('Status') as 'pending' | 'approved' | 'active' | 'cancelled',
      clerkUserId: record.get('Clerk User ID') as string | undefined,
      startDate: record.get('Start Date') as string | undefined,
      expiryDate: record.get('Expiry Date') as string | undefined,
    };
  } catch (error) {
    console.error('[Airtable] Error finding member:', error);
    return null;
  }
}

// Update member record
export async function updateMember(
  recordId: string,
  fields: Partial<{
    status: string;
    clerkUserId: string;
    tier: string;
    membershipType: string;
  }>
): Promise<boolean> {
  try {
    const updateFields: Record<string, unknown> = {};
    if (fields.status) updateFields['Status'] = fields.status;
    if (fields.clerkUserId) updateFields['Clerk User ID'] = fields.clerkUserId;
    if (fields.tier) updateFields['Tier'] = fields.tier;
    if (fields.membershipType) updateFields['Membership Type'] = fields.membershipType;

    await membersTable.update(recordId, updateFields);
    return true;
  } catch (error) {
    console.error('[Airtable] Error updating member:', error);
    return false;
  }
}

// Create member record
export async function createMember(data: {
  email: string;
  name: string;
  membershipType: 'teacher' | 'practitioner';
  tier: 'free' | 'professional' | 'plus';
  status?: 'pending' | 'approved' | 'active';
  clerkUserId?: string;
}): Promise<string | null> {
  try {
    const record = await membersTable.create({
      'Email': data.email,
      'Name': data.name,
      'Membership Type': data.membershipType,
      'Tier': data.tier,
      'Status': data.status || 'pending',
      'Clerk User ID': data.clerkUserId || '',
      'Start Date': new Date().toISOString().split('T')[0],
    });
    return record.id;
  } catch (error) {
    console.error('[Airtable] Error creating member:', error);
    return null;
  }
}

// Check if user has active membership
export async function hasActiveMembership(email: string): Promise<boolean> {
  const member = await findMemberByEmail(email);
  if (!member) return false;

  // Check status
  if (member.status !== 'active' && member.status !== 'approved') {
    return false;
  }

  // Check expiry if set
  if (member.expiryDate) {
    const expiry = new Date(member.expiryDate);
    if (expiry < new Date()) {
      return false;
    }
  }

  return true;
}
```

---

## Step 5: Create Airtable Webhook Handler

Replace `/api/webhooks/thrivecart/route.ts` with `/api/webhooks/airtable/route.ts`:

```typescript
// Airtable Webhook Handler
// Triggered when admin approves a member in Airtable
// 1. Validates webhook secret
// 2. Checks if user exists in Clerk -> if so, upgrades them
// 3. Syncs membership data

import { NextRequest, NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';
import { findMemberByEmail, updateMember } from '@/lib/airtable';

export const dynamic = 'force-dynamic';

// GET handler for verification
export async function GET() {
  return NextResponse.json({
    status: 'active',
    message: 'Airtable webhook endpoint is ready',
    timestamp: new Date().toISOString(),
  });
}

export async function POST(req: NextRequest) {
  try {
    // Verify webhook secret (set this in Airtable automation)
    const authHeader = req.headers.get('authorization');
    const expectedSecret = `Bearer ${process.env.AIRTABLE_WEBHOOK_SECRET}`;

    if (authHeader !== expectedSecret) {
      console.error('[Airtable Webhook] Invalid secret');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();

    // Airtable sends record data
    const { email, membershipType, tier, recordId } = body;

    if (!email) {
      return NextResponse.json({ error: 'Missing email' }, { status: 400 });
    }

    console.log(`[Airtable Webhook] Processing approval for ${email}`);

    // Check if user already exists in Clerk
    let userUpgraded = false;
    try {
      const client = await clerkClient();
      const userList = await client.users.getUserList({
        emailAddress: [email],
        limit: 1,
      });

      if (userList.data.length > 0) {
        const user = userList.data[0];

        // Upgrade user metadata
        await client.users.updateUserMetadata(user.id, {
          publicMetadata: {
            membershipType: membershipType || 'teacher',
            tier: tier || 'professional',
          },
        });

        console.log(`[Airtable Webhook] Upgraded existing user ${user.id} (${email})`);
        userUpgraded = true;

        // Update Airtable with Clerk User ID and status
        if (recordId) {
          await updateMember(recordId, {
            clerkUserId: user.id,
            status: 'active',
          });
        }
      }
    } catch (clerkError) {
      console.error('[Airtable Webhook] Error with Clerk:', clerkError);
    }

    // If user doesn't exist yet, they'll be upgraded on signup via Clerk webhook

    return NextResponse.json({
      success: true,
      userUpgraded,
      message: userUpgraded
        ? 'User upgraded successfully'
        : 'User will be upgraded on signup',
    });
  } catch (error) {
    console.error('[Airtable Webhook] Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
```

---

## Step 6: Update Clerk Webhook

Update `/api/webhooks/clerk/route.ts` to check Airtable instead of Sanity:

```typescript
import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/nextjs/server';
import { findMemberByEmail, updateMember } from '@/lib/airtable';

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error('Please add CLERK_WEBHOOK_SECRET to .env');
  }

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Missing Svix headers', { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  try {
    const wh = new Webhook(SIGNING_SECRET);
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Webhook verification failed:', err);
    return new Response('Verification error', { status: 400 });
  }

  const eventType = evt.type;
  console.log(`[Clerk Webhook] Received: ${eventType}`);

  if (eventType === 'user.created') {
    const { id, email_addresses } = evt.data;
    const email = email_addresses[0]?.email_address;

    if (email) {
      console.log(`[Clerk Webhook] Checking Airtable for ${email}...`);

      // Check Airtable for approved member
      const member = await findMemberByEmail(email);

      if (member && (member.status === 'approved' || member.status === 'active')) {
        console.log(`[Clerk Webhook] User ${email} is approved. Upgrading...`);

        try {
          const client = await clerkClient();

          await client.users.updateUserMetadata(id, {
            publicMetadata: {
              membershipType: member.membershipType,
              tier: member.tier,
            },
          });

          // Update Airtable with Clerk User ID and mark active
          await updateMember(member.id, {
            clerkUserId: id,
            status: 'active',
          });

          console.log(`[Clerk Webhook] Successfully upgraded ${email}`);
        } catch (error) {
          console.error(`[Clerk Webhook] Failed to upgrade:`, error);
        }
      } else {
        console.log(`[Clerk Webhook] User ${email} not found or not approved`);
      }
    }
  }

  return new Response('Webhook received', { status: 200 });
}
```

---

## Step 7: Create Manual Checkout Page (Replace Thrivecart)

Since you're not using a payment processor, create a simple checkout/application page.

Replace `src/app/join/page.tsx`:

```tsx
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { Metadata } from 'next';
import MembershipForm from '@/components/MembershipForm';

export const metadata: Metadata = {
  title: 'Join the Collective | Membership',
  description: 'Join the Flow in Faith Teachers Collective.',
};

export default function JoinPage() {
  return (
    <main className="bg-white min-h-screen">
      <Navbar />

      <section className="pt-[160px] pb-24">
        <div className="container mx-auto px-4">
          {/* Header Image */}
          <div className="max-w-6xl mx-auto mb-12">
            <div className="relative w-full h-64 bg-gray-100 rounded-[30px] overflow-hidden">
              <Image
                src="/assets/images/alignment_header.jpg"
                fill
                className="object-cover"
                alt="Join Header"
              />
            </div>
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Benefits */}
            <div className="flex flex-col gap-8">
              <div className="bg-(--color-gallery) p-8 rounded-[30px] relative overflow-hidden min-h-[300px]">
                <Image
                  src="/assets/images/core_benefits.png"
                  fill
                  className="object-contain p-4"
                  alt="Core Benefits"
                />
              </div>
              <div className="bg-(--color-martinique) p-8 rounded-[30px] relative overflow-hidden min-h-[300px]">
                <Image
                  src="/assets/images/pro_benefits.png"
                  fill
                  className="object-contain p-4"
                  alt="Pro Benefits"
                />
              </div>
            </div>

            {/* Membership Selection Form */}
            <div className="bg-white rounded-[20px] shadow-2xl p-8 border border-gray-100 sticky top-24">
              <h2 className="text-2xl font-bold text-(--color-primary) mb-6 text-center">
                Select Your Membership
              </h2>
              <MembershipForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
```

Create `src/components/MembershipForm.tsx`:

```tsx
'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';

const MEMBERSHIP_TIERS = [
  {
    id: 'professional',
    name: 'EPM LITE',
    price: '$35/month or $350/year',
    features: [
      'Access to Video Library',
      'Teacher Directory Listing',
      'Monthly Live Classes',
      'Community Access',
    ],
  },
  {
    id: 'plus',
    name: 'EPM PLUS',
    price: '$80/month or $800/year',
    features: [
      'Everything in EPM LITE',
      'Weekly Live Classes',
      'Private Mentorship Sessions',
      'Business Development Resources',
      'Featured Directory Placement',
    ],
  },
];

export default function MembershipForm() {
  const { user, isSignedIn } = useUser();
  const [selectedTier, setSelectedTier] = useState<string>('professional');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/membership/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tier: selectedTier,
          email: user?.primaryEmailAddress?.emailAddress,
          name: user?.fullName,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit request');
      }

      setSubmitted(true);
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isSignedIn) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 mb-4">Please sign in to request membership.</p>
        <a
          href="/sign-in?redirect_url=/join"
          className="btn btn-primary px-8 py-3"
        >
          Sign In
        </a>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="text-5xl mb-4">🙏</div>
        <h3 className="text-xl font-bold text-(--color-primary) mb-2">
          Request Received!
        </h3>
        <p className="text-gray-600">
          We&apos;ll review your application and reach out with payment details soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Tier Selection */}
      <div className="space-y-4">
        {MEMBERSHIP_TIERS.map((tier) => (
          <label
            key={tier.id}
            className={`block p-4 border-2 rounded-xl cursor-pointer transition-all ${
              selectedTier === tier.id
                ? 'border-(--color-primary) bg-(--color-primary)/5'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <input
              type="radio"
              name="tier"
              value={tier.id}
              checked={selectedTier === tier.id}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="sr-only"
            />
            <div className="flex justify-between items-start mb-2">
              <span className="font-bold text-(--color-primary)">{tier.name}</span>
              <span className="text-sm text-(--color-roti) font-semibold">
                {tier.price}
              </span>
            </div>
            <ul className="text-sm text-gray-600 space-y-1">
              {tier.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-(--color-roti)">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </label>
        ))}
      </div>

      {error && (
        <p className="text-red-500 text-sm text-center">{error}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn btn-primary py-4 text-lg disabled:opacity-50"
      >
        {isSubmitting ? 'Submitting...' : 'Request Membership'}
      </button>

      <p className="text-xs text-gray-500 text-center">
        After submitting, we&apos;ll send you payment instructions via email.
      </p>
    </form>
  );
}
```

---

## Step 8: Create Membership Request API

Create `src/app/api/membership/request/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { createMember, findMemberByEmail } from '@/lib/airtable';

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { tier, email, name } = await req.json();

    if (!email || !tier) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if already a member
    const existing = await findMemberByEmail(email);
    if (existing) {
      return NextResponse.json({
        error: 'You already have a membership request',
        status: existing.status,
      }, { status: 400 });
    }

    // Create member record in Airtable (pending status)
    const recordId = await createMember({
      email,
      name: name || email,
      membershipType: 'teacher',
      tier: tier as 'professional' | 'plus',
      status: 'pending',
      clerkUserId: user.id,
    });

    if (!recordId) {
      throw new Error('Failed to create member record');
    }

    console.log(`[Membership] Created request for ${email}, record: ${recordId}`);

    return NextResponse.json({
      success: true,
      message: 'Membership request submitted',
    });
  } catch (error) {
    console.error('[Membership Request] Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
```

---

## Step 9: Set Up Airtable Automation

In Airtable, create an automation to call your webhook when a member is approved:

1. Go to your Airtable base → Automations
2. Create new automation
3. **Trigger**: "When a record matches conditions"
   - Table: Members
   - Condition: When `Status` changes to `approved`
4. **Action**: "Run a script" or "Send webhook"

### Option A: Webhook Action (Simpler)
- URL: `https://yourdomain.com/api/webhooks/airtable`
- Method: POST
- Headers: `Authorization: Bearer YOUR_WEBHOOK_SECRET`
- Body:
```json
{
  "email": "{Email}",
  "membershipType": "{Membership Type}",
  "tier": "{Tier}",
  "recordId": "{Record ID}"
}
```

### Option B: Script Action (More Control)
```javascript
let config = input.config();
let record = config.record;

let response = await fetch('https://yourdomain.com/api/webhooks/airtable', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_WEBHOOK_SECRET'
  },
  body: JSON.stringify({
    email: record.getCellValue('Email'),
    membershipType: record.getCellValue('Membership Type')?.name,
    tier: record.getCellValue('Tier')?.name,
    recordId: record.id
  })
});

console.log(await response.json());
```

---

## Step 10: Files to Delete

Remove these Thrivecart-related files:

```bash
rm src/components/ThrivecartEmbed.tsx
rm src/app/api/webhooks/thrivecart/route.ts
```

---

## Step 11: Remove Sanity allowedUser Schema (Optional)

If you want to fully migrate away from Sanity for membership:

1. Delete `src/sanity/schemaTypes/allowedUser.ts` (if it exists)
2. Remove from schema index
3. Delete existing allowedUser documents in Sanity Studio

---

## Step 12: Update Environment Variables

Final `.env.local`:

```env
# Next.js / Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=fyiqx87d
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-12-21
SANITY_API_READ_TOKEN=xxx
SANITY_API_TOKEN=xxx

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_xxx
CLERK_SECRET_KEY=sk_xxx
CLERK_WEBHOOK_SECRET=whsec_xxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

# Airtable
AIRTABLE_API_KEY=pat_xxx
AIRTABLE_BASE_ID=appXxx
AIRTABLE_MEMBERS_TABLE_ID=tblXxx
AIRTABLE_WEBHOOK_SECRET=your_secure_random_string
```

---

## Workflow Summary

### For New Users:
1. User visits `/join`
2. User selects tier and submits request
3. Request saved to Airtable (status: `pending`)
4. Admin reviews in Airtable, collects payment manually
5. Admin changes status to `approved`
6. Airtable automation triggers webhook
7. Webhook upgrades Clerk user (if exists) or waits for signup

### For Admin:
1. View pending requests in Airtable
2. Contact user for payment (Venmo, PayPal, Stripe link, etc.)
3. Once paid, change status to `approved`
4. User automatically gets access

### Benefits of This Approach:
- **No payment processor fees** on memberships
- **Full control** over membership data
- **Flexible payment options** (manual, multiple processors)
- **Easy to add integrations** (Zapier, Make, etc.)
- **Airtable as admin dashboard** for viewing members

---

## Optional: Add Stripe for Automated Payments

If you want automated payments later, you can add Stripe:

1. Create Stripe Checkout sessions
2. Use Stripe webhooks to update Airtable
3. Airtable automation still handles the Clerk upgrade

This keeps Airtable as your "source of truth" while adding payment automation.
