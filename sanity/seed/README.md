# Sanity Seed Scripts

Seed scripts for populating Sanity with initial content.

## Home Document Seed

The `home.ts` script seeds the homepage with block content that matches the original hardcoded layout.

### Prerequisites

- `.env.local` with:
  - `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - `NEXT_PUBLIC_SANITY_DATASET` (optional, defaults to `production`)
  - `SANITY_API_TOKEN` or `SANITY_AUTH_TOKEN` (write permissions)

### Running the Seed

Run from the **project root** (the directory that contains `.env.local`):

```bash
npm run seed:home
```

Loads `.env.local` from the current working directory. If you use a git worktree without its own `.env.local`, run from the main repo or copy `.env.local` into the worktree.

### What It Does

Creates or updates a `home` document with 10 block sections:

1. **Hero** (`homeHeroBlock`) – Welcome message with CTA
2. **Sacred Banner** (`brandBlock`) – "Rest is sacred..." quote
3. **Inherited Stories** (`richTextBlock`) – Opening narrative
4. **Different Story** (`highlightTextBlock`) – Section heading
5. **Feature Grid** (`featureGridBlock`) – 3 feature cards
6. **Mission Section** (`mediaTextBlock`) – Text with list and image
7. **Belonging Banner** (`brandBlock`) – Belonging quote
8. **Community Card** (`spaceCardsBlock`) – Teachers Collective intro
9. **Held by God** (`highlightTextBlock`) – Centered banner quote
10. **Whether You Are** (`mediaTextBlock`) – Call-to-action section

### Idempotency

- If no `home` document exists, one is created.
- If it exists, content is updated (id and type preserved).
