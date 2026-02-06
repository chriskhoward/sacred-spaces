// Fillout Webhook: receives Alignment Form submissions and stores them in Sanity.
// In Fillout: Integrate → Webhook → set URL to https://yoursite.com/api/webhooks/fillout
// Map form fields into the request body (include at least "email").
// Optional: set "Redirect after submit" to /join so users go straight to checkout.

import { NextRequest, NextResponse } from 'next/server';
import { writeClient } from '@/sanity/lib/write';

export const dynamic = 'force-dynamic';

const EMAIL_REGEX = /[^\s@]+@[^\s@]+\.[^\s@]+/;

/** True if string looks like an email (allows relaxed patterns Fillout might send) */
function looksLikeEmail(s: string): boolean {
  const t = s.trim();
  return t.length > 0 && t.includes('@') && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t);
}

/** Extract email from string (full match or first email-like substring) */
function extractEmailFromString(s: string): string | null {
  const t = s.trim();
  if (!t || !t.includes('@')) return null;
  if (looksLikeEmail(t)) return t;
  const match = t.match(EMAIL_REGEX);
  return match ? match[0].trim() : null;
}

/** Recursively find a string that looks like an email in objects/arrays */
function findEmailInValue(val: unknown): string | null {
  if (typeof val === 'string') {
    return extractEmailFromString(val);
  }
  if (Array.isArray(val)) {
    for (const item of val) {
      const found = findEmailInValue(item);
      if (found) return found;
    }
  }
  if (val && typeof val === 'object' && !Array.isArray(val)) {
    for (const v of Object.values(val)) {
      const found = findEmailInValue(v);
      if (found) return found;
    }
  }
  return null;
}

function getEmail(payload: Record<string, unknown>): string | null {
  // Common keys – use recursive extraction so Fillout's nested/object values work
  const keys = [
    'email', 'Email', 'customer_email', 'Email Address', 'email_address',
    'emailAddress', 'EmailAddress', 'your email', 'Your Email', 'Your email',
    'E-mail', 'e-mail', 'work email', 'Work Email', 'contact email'
  ];
  for (const key of keys) {
    const v = payload[key];
    if (v === undefined) continue;
    const found = findEmailInValue(v);
    if (found) return found;
  }
  // Any key containing "email" (e.g. Fillout question IDs)
  for (const [key, v] of Object.entries(payload)) {
    if (key.toLowerCase().includes('email') && v !== undefined) {
      const found = findEmailInValue(v);
      if (found) return found;
    }
  }
  // Check every top-level value (in case key is question ID or custom label)
  for (const v of Object.values(payload)) {
    const found = findEmailInValue(v);
    if (found) return found;
  }
  return findEmailInValue(payload);
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
      const receivedKeys = Object.keys(payload).slice(0, 20);
      return NextResponse.json(
        {
          error: 'Missing email in submission. Map an email field in Fillout webhook body.',
          hint: 'In Fillout: Integrate → Webhook → Body, add a key "email" and map it to your form\'s email question. Received top-level keys: ' + (receivedKeys.length ? receivedKeys.join(', ') : '(none)'),
        },
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
