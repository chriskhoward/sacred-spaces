# Flow in Faith Virtual Summit — Feature Design

## Overview

Add a summit section to Sacred Spaces that Queen can manage entirely from Sanity. The summit is an annual virtual event with two access tiers: Free (drip-released, time-limited) and All Access Pass (permanent, behind Clerk auth). Registration and sales pages are handled externally; we build the content/dashboard experience.

## Architecture

**Approach:** Summit as a standalone section with its own Sanity schemas, URL namespace (`/summit/*`), and layout (custom nav, shared footer). Each year's summit is a separate Sanity document.

## Sanity Schemas

### `summit` (top-level document)

| Field | Type | Notes |
|-------|------|-------|
| `title` | string, required | e.g., "Flow in Faith Virtual Summit" |
| `year` | number, required | e.g., 2025 |
| `slug` | slug | Auto-generated from title + year |
| `isCurrent` | boolean | Marks which summit shows at `/summit/*` |
| `description` | text | Short summary for SEO/meta |
| `heroImage` | image | |
| `startDate` | datetime | |
| `endDate` | datetime | |
| `communityLink` | url | WhatsApp link |
| `registrationUrl` | url | External registration page |
| `allAccessSalesUrl` | url | External sales page |
| `clerkPlanId` | string | e.g., `summit_all_access` — used for gating |
| `welcomeContentFree` | rich text + media | Start Here page for free users |
| `welcomeContentAllAccess` | rich text + media | Start Here page for All Access |
| `allAccessPerks` | rich text | Describes what All Access includes |
| `navLinks` | array of `{ label, path }` | Editable summit nav |
| `faqItems` | array of `{ question, answer }` | For contact page |
| `contactEmail` | string | |

### `summitSpeaker` (document)

| Field | Type | Notes |
|-------|------|-------|
| `name` | string, required | |
| `headshot` | image | |
| `bio` | text | |
| `websiteUrl` | url | |
| `socialLinks` | array of `{ platform, url }` | |

### `summitPresentation` (document)

| Field | Type | Notes |
|-------|------|-------|
| `title` | string, required | |
| `summit` | reference to `summit`, required | |
| `speaker` | reference to `summitSpeaker`, required | |
| `description` | text | |
| `videoUrl` | url | Embed URL |
| `availableDate` | datetime | When free users can see it |
| `expiresDate` | datetime | When free access ends |
| `dayNumber` | number | Day 1, Day 2, etc. |
| `timeSlot` | string | e.g., "10:00 AM EST" |
| `resources` | array of `{ title, url, file }` | Speaker resources/downloads |
| `displayOrder` | number | Ordering within a day |

### `summitYogaClass` (document)

| Field | Type | Notes |
|-------|------|-------|
| `title` | string, required | |
| `summit` | reference to `summit`, required | |
| `instructor` | string | Or reference to `summitSpeaker` if applicable |
| `videoUrl` | url | |
| `description` | text | |
| `displayOrder` | number | |

## URL Structure & Pages

| URL | Page | Access |
|-----|------|--------|
| `/summit` | Redirect to `/summit/start-here` | Public |
| `/summit/start-here` | Welcome — content varies by auth | Public (content varies) |
| `/summit/schedule` | Auto-generated schedule grouped by day | Public |
| `/summit/speakers` | Speaker grid with headshots, bios, links | Public |
| `/summit/presentations/[slug]` | Individual presentation with video | Drip-gated / All Access |
| `/summit/yoga-classes` | On-demand yoga class library | Public |
| `/summit/all-access` | Perks + Clerk PricingTable | Public |
| `/summit/contact` | Contact form/email + FAQ | Public |
| `/summit/[year]/...` | Archived summits (same sub-pages) | Public |

## Access Logic

### Start Here page
- Default: Shows `welcomeContentFree`
- Logged in with All Access plan: Shows `welcomeContentAllAccess`

### Presentation pages
- **Not logged in / free**: Check `availableDate <= now <= expiresDate`. Show video if within window, otherwise show upgrade CTA.
- **All Access**: Always show video, no expiration.

### All Access page
- Shows perks description + Clerk `<PricingTable />` for the summit plan
- If already purchased, shows confirmation instead

### Gating implementation (server-side)
```typescript
const { has } = await auth()
const hasAllAccess = has({ plan: 'summit_all_access' })
```

## Data Flow

```
Summit (isCurrent: true)
  ├── navLinks[] → Summit layout nav
  ├── welcomeContentFree → /summit/start-here (default)
  ├── welcomeContentAllAccess → /summit/start-here (All Access)
  ├── communityLink → Nav / Start Here
  ├── registrationUrl → CTAs
  ├── allAccessSalesUrl → Upsell CTAs
  ├── faqItems[] → /summit/contact
  ├── summitPresentations[] → /summit/schedule + /summit/presentations/[slug]
  ├── summitSpeakers[] → /summit/speakers (derived from presentations)
  └── summitYogaClasses[] → /summit/yoga-classes
```

### Key queries
- Current summit: `*[_type == "summit" && isCurrent == true][0]`
- Presentations: `*[_type == "summitPresentation" && summit._ref == $summitId] | order(dayNumber asc, displayOrder asc)`
- Speakers: Derived from presentations to avoid orphans
- Archive: `*[_type == "summit" && year == $year][0]`

### Year archiving
1. Queen sets `isCurrent: true` on new summit
2. Sets `isCurrent: false` on old summit
3. Old content remains at `/summit/2025/...`
4. No data migration — just a boolean flip

## Summit Layout

`/summit/*` routes use their own layout with:
- **Summit nav**: Rendered from `navLinks` array in Sanity (Queen controls links)
- **Site footer**: Reused from Sacred Spaces
- Main Sacred Spaces navbar is NOT shown on summit pages

## Scope

### In Scope
- Sanity schemas: `summit`, `summitSpeaker`, `summitPresentation`, `summitYogaClass`
- Summit layout with editable nav
- 8 page routes (start-here, schedule, speakers, presentations/[slug], yoga-classes, all-access, contact, [year] archive)
- Drip gating (date-based for free users)
- All Access gating (Clerk plan check)
- All Access purchase via Clerk PricingTable
- Contact page with FAQ
- Responsive design using existing Sacred Spaces styling

### Out of Scope
- Registration page (external, built by Queen)
- Sales pages (external, Deadline Funnel + ecommerce)
- Checkout (Clerk Billing)
- Email marketing (Mailerlite)
- Google Calendar integration
- Private podcast feed
- Workbook a-la-carte sales

### Future / Nice-to-Have
- Google Calendar "Add to Calendar" links
- Search/filter on presentations
- Speaker detail pages
- Email notifications for content drip
