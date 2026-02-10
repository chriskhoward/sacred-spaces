# Sanity Presentation Setup — What You Need to Do

This outline gets Presentation working so you can open preview iframes from Studio and get click-to-edit overlays on About and dynamic `[slug]` pages.

---

## 1. Set environment variables

Where your Next.js app runs (e.g. Vercel + local `.env.local`):

| Variable | Required | Purpose |
|----------|----------|---------|
| `SANITY_API_READ_TOKEN` | Yes (for draft preview) | Viewer/read token so the app can fetch **draft** content. Create in Sanity: Project → API → Tokens. |
| `SANITY_PREVIEW_SECRET` | Yes (for security) | Any long random string. Same value is used when Studio calls your enable-draft URL. |

Confirm they’re set in:
- Vercel: Project → Settings → Environment Variables (Production + Preview if you use preview deploys).
- Local: `.env.local` (and that it’s not committed).

---

## 2. Add a draft-aware Sanity client/fetch helper ✅ Done

Right now `client` in `src/sanity/lib/client.ts` has no token and stega only in dev/preview env. When **draft mode is on**, the app must:

- Use the read token.
- Use `perspective: 'previewDrafts'` and `useCdn: false`.
- Use `stega: true` so overlays work.

**What to do:**

- **Option A (recommended):** Add a small helper that returns a client (or fetch options) that uses the token + `perspective: 'previewDrafts'` + `useCdn: false` + `stega: true` **only when** `(await draftMode()).isEnabled`. Use this helper (or a wrapper around `client.fetch`) in any page that should show drafts and overlays.
- **Option B:** Create a separate “preview” client (e.g. `previewClient`) that always has token + `previewDrafts` + stega, and use it only in code paths that run when draft mode is enabled (so you never use the token for normal visitors).

**Implemented:** `src/sanity/lib/client.ts` now exports `getClient(draft: boolean)`. When `draft` is true and `SANITY_API_READ_TOKEN` is set, it returns a preview client with token, `perspective: 'previewDrafts'`, `useCdn: false`, and `stega: true`. Otherwise it returns the default `client`.

---

## 3. Enable stega when draft mode is on (not only in dev) ✅ Done

In `src/sanity/lib/client.ts`, stega is currently:

```ts
enabled: process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview' || process.env.NODE_ENV === 'development'
```

So in **production** (e.g. flowinfaith.com), overlays never appear even if draft mode is enabled.

**What to do:**

- When you use a **draft-aware client** (Step 2), that client should have `stega: { enabled: true, studioUrl: '/studio' }` when used in draft mode. Then you don’t need to change the default client’s stega condition; just use the draft-aware client for preview fetches.
- Alternatively, enable stega on the **default** client when the **request** is in draft mode. That requires passing “draft mode on” into the client (e.g. via a request-scoped config or env that’s set per request). The simpler approach is: one client for normal traffic (stega off), one for draft-mode requests (stega on, token, previewDrafts).

**Implemented:** The draft-aware client returned by `getClient(true)` has `stega: { enabled: true, studioUrl: '/studio' }`, so overlays work in production when draft mode is on.

---

## 4. Use the draft-aware fetch on About and `[slug]` pages ✅ Done

**What to do:**

- In **`src/app/about/page.tsx`**: When fetching the about content, if draft mode is enabled use the draft-aware client (or fetch with token + `perspective: 'previewDrafts'` + `stega: true`). Otherwise use the normal client.
- In **`src/app/[slug]/page.tsx`**: Same for the page query and metadata query: when draft mode is on, use the draft-aware client so the preview iframe shows drafts and overlays.

**Implemented:** `src/app/about/page.tsx` and `src/app/[slug]/page.tsx` (including `generateMetadata`) now use `const { isEnabled } = await draftMode(); const client = getClient(isEnabled);` and fetch with that client.

---

## 5. (Optional) Preview URL and CORS

**Preview URL:**

- In `sanity.config.ts`, `previewUrl.origin` uses `window.location.origin` (so when Studio is at `yoursite.com/studio`, preview is `yoursite.com`). For local dev it falls back to `http://localhost:3000`. That’s usually enough.
- If you want a fixed production URL (e.g. for a separate Studio deploy), set `previewUrl.initial` or `origin` from `process.env.NEXT_PUBLIC_SITE_URL` or similar (note: sanity.config can be client-side, so use `NEXT_PUBLIC_*` if you read it there).

**CORS / allowOrigins:**

- If Studio and the site are on the **same origin** (e.g. both at flowinfaith.com), you typically don’t need `allowOrigins`.
- If Studio is on a different domain than the site, add `allowOrigins: [process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000']` (or the right origin) in `presentationTool` so the iframe can communicate. See [Sanity: Configuring the Presentation tool](https://www.sanity.io/docs/presentation-tool).

---

## 6. (Optional) Homepage in Presentation

The homepage at `/` currently uses hardcoded `HomePageContent`, not Sanity blocks. So:

- Presentation can open “Homepage” and show `/`, but there are no Sanity fields to overlay.
- To get **visual editing on the homepage**, you’d need to render the Sanity `home` document (e.g. `BlockRenderer` with `homeData.content`) on `/` when draft mode is on (or always), and use the same draft-aware fetch for that query.

---

## 6b. Planning for future pages and shared components

**Rule:** Any page or **shared component** that fetches Sanity content you want to preview in Presentation should use the draft-aware client: `const { isEnabled } = await draftMode(); const client = getClient(isEnabled);` and then `client.fetch(...)`.

**What’s already connected:** Home, About, dynamic `[slug]` pages, **Navbar**.

**Navbar behavior (and how to plan similar cases):**
- **From Sanity:** Only “which pages show in nav” (pages with `showInNav == true`). The Navbar server component fetches that list with `getClient(isEnabled)`, so in Presentation you see draft nav items (e.g. a new page not yet published).
- **Visibility that’s not from Sanity:** Which links appear per page, “member only” links (Live Classes, On-Demand Library, Teacher Directory), and Member Login vs Dashboard are driven by **app/auth and route logic** in `NavbarClient` (e.g. `isMember` from Clerk). So:
  - **Draft-aware fetch** = correct Sanity data (including drafts) in the preview.
  - **What actually shows** (all users vs logged-in, which links on which pages) stays in your components and can be extended later (e.g. a “members only” or “hide on mobile” flag in Sanity if you add it).

**For other pages:** Apply the same pattern: in the **server** component or layout that does the Sanity fetch, use `getClient((await draftMode()).isEnabled)`. Keep visibility and auth rules in your UI (client components or server logic) as you do today. Pages that still use the default `client` and could be switched next: Teacher Collective (FAQs), Video Library, Live Classes, Teacher Collective Resources, Teacher Collective Calls.

---

## 7. Verify

1. Set the env vars and restart the Next app.
2. Open Studio (e.g. `/studio`), go to the **Presentation** tab.
3. Open a location (e.g. “About Page” or a dynamic page). The iframe should load your site and Studio should call `/api/draft?secret=...&slug=...` to enable draft mode.
4. You should see **draft** content in the iframe (if the document has unpublished changes).
5. You should see **click-to-edit overlays** on blocks that come from Sanity (About, `[slug]` pages).

If the iframe shows 404 or doesn’t enable draft mode, check that `SANITY_PREVIEW_SECRET` matches what Studio sends and that the enable URL is exactly `/api/draft`. If overlays don’t appear, confirm the draft-aware client uses `stega: true` and that About / `[slug]` use that client when draft mode is on.

---

## Summary checklist

- [ ] Set `SANITY_API_READ_TOKEN` and `SANITY_PREVIEW_SECRET` in Vercel and `.env.local`.
- [x] Add a draft-aware client or fetch helper (token + `previewDrafts` + `useCdn: false` + `stega: true` when draft mode is on).
- [x] Use that helper in `src/app/about/page.tsx`, `src/app/[slug]/page.tsx`, and `src/components/Navbar.tsx` for Sanity queries.
- [ ] (Optional) Set `previewUrl.initial` / `allowOrigins` if you use a different origin for Studio or preview.
- [ ] (Optional) Render Sanity `home` content on `/` and use the draft-aware fetch there to get homepage overlays.
- [ ] Test in Presentation: open a location, confirm draft content and overlays.
