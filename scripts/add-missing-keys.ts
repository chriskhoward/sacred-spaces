/**
 * Add missing _key to array items in Sanity documents.
 * Run with: npx tsx scripts/add-missing-keys.ts
 *
 * Sanity Studio requires _key on array items for list editing. Content created via API
 * (e.g. migration_data.json, createOrReplace, patch) may lack _key. This script patches
 * the home and about documents so every array item has a unique _key.
 *
 * Requires SANITY_API_TOKEN (write access) in .env.local.
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

function generateKey(prefix: string, index: number): string {
  return `${prefix}-${index}-${Math.random().toString(36).slice(2, 11)}`;
}

/**
 * Recursively ensure every object in an array has _key; then recurse into each object.
 */
function addMissingKeysToValue(value: unknown, keyPrefix: string = 'k'): unknown {
  if (Array.isArray(value)) {
    return value.map((item, index) => {
      if (item !== null && typeof item === 'object' && !Array.isArray(item)) {
        const obj = { ...item } as Record<string, unknown>;
        if (typeof obj._key !== 'string' || !obj._key) {
          obj._key = generateKey(keyPrefix, index);
        }
        // Recurse into object values (e.g. nested arrays like body[].children)
        for (const k of Object.keys(obj)) {
          if (k === '_key' || k === '_type' || k === '_ref') continue;
          obj[k] = addMissingKeysToValue(obj[k], `${keyPrefix}-${index}`);
        }
        return obj;
      }
      return item;
    });
  }

  if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
    const obj = value as Record<string, unknown>;
    const out: Record<string, unknown> = {};
    for (const k of Object.keys(obj)) {
      out[k] = addMissingKeysToValue(obj[k], keyPrefix);
    }
    return out;
  }

  return value;
}

async function fixDocument(doc: { _id: string; _type: string; content?: unknown[] }) {
  if (!Array.isArray(doc.content) || doc.content.length === 0) return;
  const updated = addMissingKeysToValue(doc.content, 'block') as unknown[];
  await client.patch(doc._id).set({ content: updated }).commit();
  console.log(`  Patched ${doc._id}: added missing _key on array items.`);
}

async function main() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_API_TOKEN) {
    console.error('Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN in .env.local');
    process.exit(1);
  }

  console.log('Fetching home and about documents...');
  const [home, about] = await Promise.all([
    client.fetch<{ _id: string; _type: string; content?: unknown[] } | null>(
      '*[_type == "home"][0]{ _id, _type, content }'
    ),
    client.fetch<{ _id: string; _type: string; content?: unknown[] } | null>(
      '*[_type == "about"][0]{ _id, _type, content }'
    ),
  ]);

  if (home?.content?.length) {
    console.log('Fixing home document...');
    await fixDocument(home);
  } else if (home) {
    console.log('Home document has no content array, skipping.');
  } else {
    console.log('No home document found.');
  }

  if (about?.content?.length) {
    console.log('Fixing about document...');
    await fixDocument(about);
  } else if (about) {
    console.log('About document has no content array, skipping.');
  } else {
    console.log('No about document found.');
  }

  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
