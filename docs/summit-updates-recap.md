# Summit Feature Updates - Recap

Everything below has been built and deployed. All new fields are editable in Sanity Studio at `yoursite.com/studio`.

---

## Rich Text Everywhere

All text fields across the site now support rich text formatting. You can use bold, italic, links, lists, headings, and inline images in any content field. Previously plain-text fields have been converted automatically.

---

## Summit Pages - What Changed

### Breadcrumb Navigation
Every summit sub-page now has breadcrumbs at the top showing the summit name (linking back to Start Here) and the current page name. This helps visitors navigate between pages.

### Start Here (Welcome) Page
- **Welcome Video** now appears after the content paragraph, before the "Join the Community" button
- The video URL is set in the **Welcome Video URL** field on the summit document

### Schedule Page
- **Banner Image** displays above the schedule content. Set it in the **Schedule Banner Image** field
- **Get All Access button** moved to the bottom of the page
- **Presentation Cards** (live sessions) now show a banner image at the top of each card. Uses the presentation's custom image if set, otherwise the speaker's headshot
- **Recorded Sessions** display after each day in a 3-column grid with thumbnail, presentation title, and speaker name

### Yoga Classes Page
Yoga classes now have a lifecycle with three states, controlled by the **Status** field on each yoga class:

| Status | What Shows |
|--------|------------|
| **Upcoming** | Calendar link + thumbnail image |
| **Live Now** | Red "Live" badge + "Join Live Class" button (links to live stream URL) |
| **Replay** | Embedded video player |

New fields on each yoga class:
- **Image** - thumbnail for the card
- **Status** - Upcoming / Live Now / Replay Available
- **Live Stream URL** - link to Zoom, YouTube Live, etc.
- **Replay Video URL** - embed URL for the recorded replay

**Workflow:** Create a yoga class as "Upcoming" before the event. When the class goes live, change the status to "Live Now" and add the live stream URL. After the class, change to "Replay Available" and add the replay video URL.

### All Access Page
- **All Access Page Content** - new rich text field where you can add any content (text, images) below the purchase button. This content shows for all visitors regardless of whether they have purchased All Access.
- The existing **All Access Perks** and **All Access Image** fields still work as before

### Presentation Detail Pages
- **Speaker Card** - redesigned with a larger image, full bio, website link, and social media buttons
- **Speaker Promo Button** - add a custom CTA button per presentation (e.g. "Visit Sarah's Website"). Set the label and URL in the presentation document. If no custom URL is provided, it links to the speaker's website.
  - Fields: **Speaker Promo Button Label** + **Speaker Promo Button URL**
- **Custom Content Section** - rich text field where you can add any extra content per presentation (below the description and speaker card)
  - Field: **Custom Content Section**
- **Image** field on presentations - optional image for the schedule card (falls back to speaker headshot if not set)

---

## Content Security Policy Updates

Updated security headers to allow connections to:
- `clerk.flowinfaith.com` (authentication)
- `sanity-cdn.com` (Sanity CDN)
- Various analytics and form services

---

## Sanity Studio Features

### Presentation Mode
You can now preview summit pages directly in Sanity Studio. When editing a summit document, click the "Presentation" tab to see how the page looks with your changes. All summit document types (Summit, Speakers, Presentations, Yoga Classes) are supported.

### Canvas Content Mapping
All content fields have been configured for Sanity Canvas AI. The AI understands what each field is for and can help generate content. Technical fields (slugs, IDs, dates) are excluded from AI suggestions.

---

## URL Redirect

`/flow-in-faith-virtual-summit-2025` now permanently redirects to `/summit/start-here`.

---

## How to Use Google Antigravity IDE

For code changes beyond what Sanity Studio can handle:

1. Download Antigravity from [antigravity.google](https://antigravity.google)
2. Clone the GitHub repository in the app
3. Describe the change you want to make to the AI agent
4. Review the proposed changes (diffs) before accepting
5. Commit and push to deploy

For content-only changes, use Sanity Studio at `yoursite.com/studio` - no code or deployment needed. Changes publish instantly.

See `docs/client-handoff-guide.md` for the full guide including local development, deploying, and troubleshooting.
