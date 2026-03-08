# Flow in Faith Virtual Summit — Guide

This guide covers how the summit section works, what each page does, and how to manage all summit content through Sanity Studio.

---

## Page Overview

The summit has **8 pages** organized under `/summit/`:

| Page | URL | Purpose |
|------|-----|---------|
| **Start Here** | `/summit/start-here` | Hub/dashboard — welcome message, community link, quick-nav cards, upgrade CTA |
| **Schedule** | `/summit/schedule` | All presentations grouped by day with Google Calendar links |
| **Speakers** | `/summit/speakers` | Speaker grid with bios, presentation titles, and social links |
| **Presentations** | `/summit/presentations/[slug]` | Individual presentation — video, resources, calendar link, upgrade CTA |
| **Yoga Classes** | `/summit/yoga-classes` | Bonus yoga class videos (All Access only) |
| **All Access** | `/summit/all-access` | Sales/upgrade page for the All Access Pass |
| **Contact** | `/summit/contact` | Contact form/info |
| **Archive** | `/summit/[year]/...` | Past summits (same pages, no access gating) |

### How Access Works

- **Free registrants** can watch each presentation for 24 hours after it goes live (between `availableDate` and `expiresDate`)
- **All Access Pass holders** can watch everything permanently
- **Yoga Classes** are only visible to All Access members
- **Archive pages** (`/summit/2025/...`) show everything with no gating since the summit is over

### Navigation

The summit has its own navigation bar separate from the main site. Nav links are configured in Sanity on the Summit document itself.

---

## Managing Content in Sanity Studio

### Summit Document

The main Summit document controls the entire summit. There is one document per summit year.

| Field | What It Does |
|-------|-------------|
| **Title** | Summit name shown in headers and nav |
| **Year** | Used for archive URLs (`/summit/2025/`) |
| **Is Current** | Toggle this ON for the active summit. Only one should be current at a time |
| **Start Date / End Date** | Summit dates (informational) |
| **Community Link** | URL to WhatsApp group or community chat. Shows as "Join the Community" button on Start Here page |
| **Registration URL** | Link for free registration (shows on Start Here for non-registered users) |
| **All Access Sales URL** | External sales page URL. If set, the "Get All Access Pass" buttons link here. If empty, they link to `/summit/all-access` |
| **Clerk Plan ID** | The Clerk plan identifier for All Access. Used to check if a user has purchased. Set to `summit_all_access` |
| **Welcome Content (Free)** | Rich text shown on Start Here page for free registrants |
| **Welcome Content (All Access)** | Rich text shown on Start Here page for All Access members |
| **All Access Perks** | Rich text shown on the All Access sales page |
| **Nav Links** | Array of {label, path} pairs for the summit navigation bar |
| **FAQ Items** | Array of {question, answer} pairs shown on the All Access page |
| **Contact Email** | Displayed on the Contact page |

### Speakers

Each speaker is a separate `Summit Speaker` document.

| Field | What It Does |
|-------|-------------|
| **Name** | Speaker's full name |
| **Headshot** | Profile photo (displays as a circle). If missing, a microphone icon shows as placeholder |
| **Bio** | Short biography (shows on Speakers page, truncated to 3 lines) |
| **Website URL** | Link to their website |
| **Social Links** | Array of {platform, url} — platform name shows as a link label |

### Presentations

Each presentation is a `Summit Presentation` document linked to both a Summit and a Speaker.

| Field | What It Does |
|-------|-------------|
| **Title** | Presentation title |
| **Slug** | URL slug (auto-generated from title). Used in `/summit/presentations/[slug]` |
| **Summit** | Reference to which Summit this belongs to |
| **Speaker** | Reference to the Speaker giving this presentation |
| **Description** | Longer description shown on the detail page |
| **Video URL** | Embed URL (YouTube, Vimeo, etc.). Must be an embed URL, not a regular URL |
| **Available Date** | When free users can START watching |
| **Expires Date** | When free access ENDS (typically 24 hours after available date) |
| **Start Time** | Exact datetime for Google Calendar links. If empty, no calendar button shows |
| **Day Number** | Day 1, 2, 3, etc. — used to group presentations on the Schedule page |
| **Time Slot** | Display text like "10:00 AM EST" (shown on schedule and detail pages) |
| **Resources** | Array of downloadable files/links (PDFs, worksheets, etc.) |
| **Display Order** | Ordering within a day (lower numbers appear first) |

#### Important: Video URLs

Video URLs must be **embed URLs**, not regular watch URLs:
- YouTube: `https://www.youtube.com/embed/VIDEO_ID` (not `youtube.com/watch?v=...`)
- Vimeo: `https://player.vimeo.com/video/VIDEO_ID` (not `vimeo.com/...`)

#### Important: Start Time for Calendar Links

The `Start Time` field controls the Google Calendar "Add to Calendar" button. Set it to the exact date and time the presentation goes live. If left empty, the calendar button won't appear for that presentation.

### Yoga Classes

Each yoga class is a `Summit Yoga Class` document.

| Field | What It Does |
|-------|-------------|
| **Title** | Class name |
| **Instructor** | Instructor name (text, not a reference) |
| **Description** | Class description |
| **Video URL** | Embed URL (same format as presentations) |
| **Display Order** | Ordering on the page |

---

## Common Tasks

### Adding a New Presentation

1. Go to Sanity Studio
2. Create a new `Summit Presentation` document
3. Fill in title, select the Summit and Speaker references
4. Set the `Day Number` and `Time Slot` for schedule placement
5. Set `Start Time` to enable the Google Calendar button
6. Set `Available Date` and `Expires Date` for the 24-hour free window
7. Add the video embed URL when ready
8. Add any downloadable resources
9. Publish the document

### Adding a New Speaker

1. Create a new `Summit Speaker` document
2. Upload their headshot photo
3. Fill in bio and social links
4. Publish
5. Now you can reference this speaker when creating presentations

### Changing the All Access Sales Page

The All Access page content comes from three places:
- **All Access Perks** rich text on the Summit document (bullet list of benefits)
- **FAQ Items** on the Summit document
- The Clerk Pricing Table (configured in Clerk dashboard, not Sanity)

### Archiving a Summit

When a summit ends:
1. Uncheck `Is Current` on the Summit document
2. The summit will still be accessible at `/summit/[year]/...` (e.g., `/summit/2025/schedule`)
3. Archive pages show all content without access gating
4. Create a new Summit document for next year's summit and check `Is Current`

### Updating the Navigation

Edit the `Nav Links` array on the Summit document. Each item has:
- **Label**: What shows in the nav bar
- **Path**: The URL path (e.g., `/start-here`, `/schedule`)

The nav is automatically shown on all summit pages.

---

## Page Details

### Start Here (Hub Page)

Shows:
1. Welcome message (different text for free vs All Access users)
2. "Join the Community" button (links to WhatsApp or wherever `communityLink` points)
3. Quick-nav cards: Schedule, Speakers, Yoga Classes, Contact
4. Upgrade CTA at the bottom (hidden for All Access users)

### Schedule

Shows:
1. "Get All Access Pass" button at the top
2. Presentations grouped by day, ordered by `displayOrder`
3. Each card shows: speaker photo, title, speaker name, time slot, description preview
4. "Add to Calendar" button on each card (if `startTime` is set)
5. Clicking a card goes to the full presentation page

### Speakers

Shows:
1. Grid of speaker cards with photo, name, presentation titles, bio, and social links
2. "View Schedule" and "Get All Access Pass" buttons at the bottom

### Presentation Detail

Shows:
1. Back to Schedule link
2. Speaker photo, title, speaker name, day/time
3. Add to Calendar button (if `startTime` is set)
4. Video player (if user has access) or upgrade CTA (if locked)
5. Description
6. Downloadable resources (if user has access)
7. All Access badge (for All Access users)
8. Persistent "Get All Access Pass" CTA at bottom (for non-All Access users)

### Yoga Classes

Shows:
1. List of yoga class videos with title, instructor, description
2. "View Schedule" and "Get All Access Pass" buttons at the bottom
