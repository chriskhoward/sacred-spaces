# Sanity Seed Scripts

This directory contains seed scripts for populating Sanity with initial content.

## Home Document Seed

The `home.ts` script seeds the homepage with block content that matches the original hardcoded layout.

### Prerequisites

- Sanity API token with write permissions
- `.env.local` configured with `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET`

### Running the Seed

```bash
SANITY_AUTH_TOKEN=<your-token> npm run seed:home
```

Or with explicit environment variables:

```bash
SANITY_AUTH_TOKEN=<your-token> \
NEXT_PUBLIC_SANITY_PROJECT_ID=<project-id> \
NEXT_PUBLIC_SANITY_DATASET=production \
npx tsx sanity/seed/home.ts
```

### What It Does

The script creates or updates a `home` document in Sanity with 10 block sections:

1. **Hero** (`homeHeroBlock`) - Welcome message with logo and CTA
2. **Sacred Banner** (`brandBlock`) - "Rest is sacred..." quote
3. **Inherited Stories** (`richTextBlock`) - Opening narrative
4. **Different Story** (`bannerTextBlock`) - Section heading with subheading
5. **Feature Grid** (`featureGridBlock`) - 3 feature cards
6. **Mission Section** (`mediaTextBlock`) - Text with list and image
7. **Belonging Banner** (`brandBlock`) - Belonging quote
8. **Community Card** (`spaceCardsBlock`) - Teachers Collective introduction
9. **Held by God** (`bannerTextBlock`) - Centered banner quote
10. **Whether You Are** (`mediaTextBlock`) - Call-to-action section

### Getting a Sanity API Token

1. Go to [sanity.io](https://sanity.io)
2. Navigate to your project settings
3. Go to **API > Tokens**
4. Create a new token with **Editor** or **Admin** permissions
5. Copy the token and use it in the command above

### Idempotency

The script is idempotent:
- If no `home` document exists, it creates one
- If a `home` document already exists, it updates the content (preserving `_id` and `_type`)

### Reverting

To clear the homepage content and start fresh:

```bash
SANITY_AUTH_TOKEN=<your-token> \
npx tsx -e "
import { createClient } from '@sanity/client';
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_AUTH_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});
client.fetch('*[_type == \"home\"][0]._id').then(id => {
  if (id) client.delete(id).then(() => console.log('Deleted'));
});
"
```

Or simply delete the `home` document from Sanity Studio.
