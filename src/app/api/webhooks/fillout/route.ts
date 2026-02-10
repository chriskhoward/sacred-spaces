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
  const keys = ['name', 'Name', 'full_name', 'fullName', 'Full Name', 'First Name', 'first_name'];
  for (const key of keys) {
    const v = payload[key];
    if (typeof v === 'string' && v.trim()) return v.trim();
  }
  return undefined;
}

/** Extract a single string value by trying multiple key patterns */
function getStringField(payload: Record<string, unknown>, patterns: string[]): string | undefined {
  // Try exact key matches first
  for (const key of patterns) {
    const v = payload[key];
    if (typeof v === 'string' && v.trim()) return v.trim();
  }
  // Try case-insensitive partial key matches
  const lowerPatterns = patterns.map(p => p.toLowerCase());
  for (const [key, v] of Object.entries(payload)) {
    const lk = key.toLowerCase();
    if (typeof v === 'string' && v.trim() && lowerPatterns.some(p => lk.includes(p))) {
      return v.trim();
    }
  }
  return undefined;
}

/** Extract an array value (handles comma-separated strings, arrays, and Fillout's nested objects) */
function getArrayField(payload: Record<string, unknown>, patterns: string[]): string[] | undefined {
  // Try exact key matches first
  for (const key of patterns) {
    const v = payload[key];
    if (v !== undefined) return normalizeToArray(v);
  }
  // Try case-insensitive partial key matches
  const lowerPatterns = patterns.map(p => p.toLowerCase());
  for (const [key, v] of Object.entries(payload)) {
    const lk = key.toLowerCase();
    if (v !== undefined && lowerPatterns.some(p => lk.includes(p))) {
      return normalizeToArray(v);
    }
  }
  return undefined;
}

/** Convert various value types into a string array */
function normalizeToArray(val: unknown): string[] {
  if (Array.isArray(val)) {
    return val
      .map(item => (typeof item === 'string' ? item.trim() : typeof item === 'object' && item !== null ? JSON.stringify(item) : String(item).trim()))
      .filter(Boolean);
  }
  if (typeof val === 'string') {
    return val.split(',').map(s => s.trim()).filter(Boolean);
  }
  return [];
}

function getLocation(payload: Record<string, unknown>): string | undefined {
  return getStringField(payload, [
    'location', 'Location', 'Location (City, State, Country)',
    'city', 'City', 'city_state', 'address',
  ]);
}

function getYogaFormats(payload: Record<string, unknown>): string[] | undefined {
  return getArrayField(payload, [
    'yoga_formats', 'yogaFormats', 'What Yoga formats do you teach?',
    'What Yoga formats do you teach', 'yoga formats', 'formats',
  ]);
}

function getTeachingExperience(payload: Record<string, unknown>): string | undefined {
  return getStringField(payload, [
    'teaching_experience', 'teachingExperience', 'How long have you been teaching yoga?',
    'How long have you been teaching yoga', 'experience', 'teaching experience',
  ]);
}

function getWhyJoin(payload: Record<string, unknown>): string | undefined {
  return getStringField(payload, [
    'why_join', 'whyJoin', 'What drew you to join the Flow in Faith Teachers Collective?',
    'What drew you to join', 'what drew you', 'why join', 'motivation',
  ]);
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
    const location = getLocation(payload);
    const yogaFormats = getYogaFormats(payload);
    const teachingExperience = getTeachingExperience(payload);
    const whyJoin = getWhyJoin(payload);

    const existing = await writeClient.fetch<{ _id: string } | null>(
      `*[_type == "alignmentSubmission" && email == $email][0]{ _id }`,
      { email }
    );

    const responsesJson = JSON.stringify(payload, null, 2);
    const now = new Date().toISOString();

    // Build the fields object (shared between create and patch)
    const fields: Record<string, unknown> = {
      submittedAt: now,
      responses: responsesJson,
    };
    if (name) fields.name = name;
    if (location) fields.location = location;
    if (yogaFormats && yogaFormats.length > 0) fields.yogaFormats = yogaFormats;
    if (teachingExperience) fields.teachingExperience = teachingExperience;
    if (whyJoin) fields.whyJoin = whyJoin;

    if (existing) {
      await writeClient
        .patch(existing._id)
        .set(fields)
        .commit();
    } else {
      await writeClient.create({
        _type: 'alignmentSubmission' as const,
        email,
        ...fields,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Fillout] Webhook error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
