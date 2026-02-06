// Fillout Webhook: receives Alignment Form submissions and stores them in Sanity.
// In Fillout: Integrate → Webhook → set URL to https://yoursite.com/api/webhooks/fillout
// Map form fields into the request body (include at least "email").
// Optional: set "Redirect after submit" to /join so users go straight to checkout.

import { NextRequest, NextResponse } from 'next/server';
import { writeClient } from '@/sanity/lib/write';

export const dynamic = 'force-dynamic';

function getEmail(payload: Record<string, unknown>): string | null {
  const keys = ['email', 'Email', 'customer_email', 'Email Address', 'email_address'];
  for (const key of keys) {
    const v = payload[key];
    if (typeof v === 'string' && v.includes('@')) return v;
  }
  // Check nested or any string that looks like email
  for (const v of Object.values(payload)) {
    if (typeof v === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return v;
  }
  return null;
}

function getName(payload: Record<string, unknown>): string | undefined {
  const keys = ['name', 'Name', 'full_name', 'fullName', 'First Name', 'first_name'];
  for (const key of keys) {
    const v = payload[key];
    if (typeof v === 'string' && v.trim()) return v.trim();
  }
  return undefined;
}

export async function POST(req: NextRequest) {
  try {
    let payload: Record<string, unknown> = {};
    const contentType = req.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      const body = await req.json();
      payload = typeof body === 'object' && body !== null ? body : {};
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
      const text = await req.text();
      const params = new URLSearchParams(text);
      params.forEach((value, key) => {
        payload[key] = value;
      });
    }

    const email = getEmail(payload);
    if (!email) {
      return NextResponse.json(
        { error: 'Missing email in submission. Map an email field in Fillout webhook body.' },
        { status: 400 }
      );
    }

    const name = getName(payload);

    const existing = await writeClient.fetch<{ _id: string } | null>(
      `*[_type == "alignmentSubmission" && email == $email][0]{ _id }`,
      { email }
    );

    const responsesJson = JSON.stringify(payload, null, 2);
    const doc = {
      _type: 'alignmentSubmission' as const,
      email,
      ...(name && { name }),
      submittedAt: new Date().toISOString(),
      responses: responsesJson,
    };

    if (existing) {
      await writeClient
        .patch(existing._id)
        .set({
          name: name ?? undefined,
          submittedAt: doc.submittedAt,
          responses: responsesJson,
        })
        .commit();
    } else {
      await writeClient.create(doc);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Fillout] Webhook error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
