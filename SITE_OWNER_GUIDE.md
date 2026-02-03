# Flow in Faith - Site Owner's Guide

## Complete Operations Manual for Managing Your Membership Website

---

## Table of Contents

1. [Quick Reference](#quick-reference)
2. [Understanding Your Platform](#understanding-your-platform)
3. [Managing Teachers](#managing-teachers)
4. [Managing Videos](#managing-videos)
5. [Managing Live Classes](#managing-live-classes)
6. [Managing Resources](#managing-resources)
7. [Managing Website Pages](#managing-website-pages)
8. [Understanding User Flows](#understanding-user-flows)
9. [Troubleshooting](#troubleshooting)
10. [Technical Reference](#technical-reference)

---

## Quick Reference

### Important URLs

| What | URL |
|------|-----|
| **Live Website** | https://www.flowinfaith.com |
| **Sanity Studio (CMS)** | https://www.flowinfaith.com/studio |
| **Clerk Dashboard (Users)** | https://dashboard.clerk.com |
| **Thrivecart (Payments)** | https://thrivecart.com/dashboard |
| **Vercel (Hosting)** | https://vercel.com/dashboard |

### Admin Access Summary

| Task | Where to Do It |
|------|----------------|
| Add/edit videos | Sanity Studio → Video Library |
| Add/edit live classes | Sanity Studio → Live Class Schedule |
| Add/edit resources | Sanity Studio → Teacher Resources |
| Add teacher manually | Sanity Studio → Allowed User |
| View/manage users | Clerk Dashboard |
| View payments | Thrivecart Dashboard |
| Edit website pages | Sanity Studio → Pages |

---

## Understanding Your Platform

### The Tech Stack

Your website uses several services working together:

```
┌─────────────────────────────────────────────────────────────┐
│                    YOUR WEBSITE                              │
│               (www.flowinfaith.com)                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  SANITY (Content)     CLERK (Users)     THRIVECART (Payments)│
│  ├─ Videos           ├─ Teachers        ├─ Checkout         │
│  ├─ Live Classes     ├─ Practitioners   └─ Webhooks         │
│  ├─ Resources        └─ User Data                           │
│  ├─ Pages                                                   │
│  └─ Allowed Users                                           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### User Types

| Type | How They Join | What They Access |
|------|---------------|------------------|
| **Teacher** | Purchases via Thrivecart | Resources, Community Calls, Directory listing, Videos |
| **Practitioner** | Free signup + onboarding | Video Library, Live Classes, Find a Teacher |

---

## Managing Teachers

### How Teachers Are Added (Automatic - Purchase Flow)

1. Visitor goes to `/apply` → Fills out Alignment Form
2. Redirected to `/join` → Completes Thrivecart payment
3. System automatically:
   - Creates entry in Sanity "Allowed User" list
   - If they have account → upgrades immediately to teacher
   - If no account → they'll be upgraded when they sign up
4. User creates account with same email → Automatically becomes teacher

### How to Manually Add a Teacher (Offline Payment, Gift, etc.)

1. **Go to Sanity Studio**: https://www.flowinfaith.com/studio
2. **Click "Allowed User"** in the left sidebar
3. **Click the + button** to create new
4. **Fill in the fields**:

| Field | What to Enter | Required |
|-------|---------------|----------|
| **Email** | The EXACT email they'll use to sign up | ✅ Yes |
| **Plan / Product** | e.g., "Gift Membership" or "Offline Payment" | No |
| **Order ID** | Your reference number | No |
| **Redeemed** | Leave as `false` | Auto |

5. **Click "Publish"**

When that person signs up with that email, they'll automatically become a teacher.

### Checking if Someone is a Teacher

1. Go to **Clerk Dashboard**: https://dashboard.clerk.com
2. Search for the user by email
3. Check their **Public Metadata** for:
   ```json
   {
     "membershipType": "teacher",
     "tier": "professional"
   }
   ```

### Emergency: Manually Upgrade Someone to Teacher

If the automatic system didn't work:

1. Go to **Clerk Dashboard**
2. Find the user
3. Click on them → **Metadata** tab → **Public Metadata**
4. Add or edit:
   ```json
   {
     "membershipType": "teacher",
     "tier": "professional"
   }
   ```
5. Save

---

## Managing Videos

### Adding a New Video

1. **Go to Sanity Studio**: https://www.flowinfaith.com/studio
2. **Click "Video Library"** in the left sidebar
3. **Click the + button** to create new
4. **Fill in the fields**:

| Field | Description | Required |
|-------|-------------|----------|
| **Video Title** | Name of the video | ✅ Yes |
| **Instructor Name** | Who teaches it | ✅ Yes |
| **Description** | Brief description (2-3 sentences) | No |
| **Category** | Vinyasa, Restorative, Meditation, Workshop, or Hatha | ✅ Yes |
| **Difficulty Level** | Beginner, Intermediate, Advanced, or All Levels | No |
| **Duration** | e.g., "45 min" | No |
| **Thumbnail Image** | Upload a preview image (click to upload) | No |
| **Video URL** | Full URL to the video | No |
| **Target Audience** | Who can see this video (see below) | ✅ Yes |

5. **Click "Publish"**

### Video URL Options

You can use videos hosted on:
- **Vimeo**: `https://vimeo.com/123456789`
- **YouTube**: `https://youtube.com/watch?v=abc123`
- **Direct URL**: Any direct link to a video file

### Target Audience Options

| Option | Who Sees It |
|--------|-------------|
| **Everyone** | All logged-in members (teachers & practitioners) |
| **Teacher Only** | Only users with teacher membership |
| **Practitioner Only** | Only users with practitioner membership |

### Editing an Existing Video

1. Go to Sanity Studio → Video Library
2. Click on the video you want to edit
3. Make your changes
4. Click "Publish"

### Deleting a Video

1. Go to Sanity Studio → Video Library
2. Click on the video
3. Click the **⋮** menu (three dots) → **Delete**
4. Confirm deletion

---

## Managing Live Classes

### Adding a New Live Class

1. **Go to Sanity Studio**: https://www.flowinfaith.com/studio
2. **Click "Live Class Schedule"** in the left sidebar
3. **Click the + button** to create new
4. **Fill in the fields**:

| Field | Description | Required |
|-------|-------------|----------|
| **Class Title** | Name of the class | ✅ Yes |
| **Instructor** | Who's teaching | ✅ Yes |
| **Date & Time** | When it happens (click to pick) | ✅ Yes |
| **Duration** | e.g., "60 min" | No |
| **Class Type** | Vinyasa, Meditation, Hatha, Workshop, or Restorative | No |
| **Description** | What to expect | No |
| **Zoom/Meeting Link** | The link members click to join | No |
| **Recurring Class** | Toggle ON if it repeats | No |
| **Target Audience** | Who can see/join | ✅ Yes |

5. **Click "Publish"**

### Setting Up Recurring Classes

For classes that repeat weekly, bi-weekly, or monthly:

1. Toggle **"Recurring Class"** to ON
2. Select **Recurrence Pattern**:
   - **Weekly**: Same day/time every week
   - **Bi-weekly**: Every two weeks
   - **Monthly**: Same day each month
3. Optionally set **Recurrence End Date** (leave empty for indefinite)
4. Publish

The system will automatically show all future instances up to 90 days out.

### About Past Classes

**Past classes are automatically hidden!** You don't need to delete them. The system only shows classes with dates in the future.

### Calendar View vs List View

Members can toggle between:
- **List View**: Traditional list showing upcoming classes
- **Calendar View**: Monthly calendar showing classes on each day

---

## Managing Resources

Resources are teaching materials for the Teacher Collective (PDFs, guides, masterclasses, etc.)

### Adding a New Resource

1. **Go to Sanity Studio**: https://www.flowinfaith.com/studio
2. **Click "Teacher Resources"** in the left sidebar
3. **Click the + button** to create new
4. **Fill in the fields**:

| Field | Description | Required |
|-------|-------------|----------|
| **Resource Title** | Name of the resource | ✅ Yes |
| **Category** | Masterclass, Business & Growth, Class Sequencing, or Theology | No |
| **Description** | What this resource covers | No |
| **Author/Host** | Who created it | No |
| **Cover Image** | Upload a thumbnail | No |
| **Link to Resource** | URL to the PDF, video, or page | No |
| **Premium Member Only?** | Toggle for premium content (future use) | No |
| **Target Audience** | Usually "Teacher Only" | ✅ Yes |

5. **Click "Publish"**

---

## Managing Website Pages

You can create and edit pages directly in Sanity without touching code.

### Creating a New Page

1. **Go to Sanity Studio**: https://www.flowinfaith.com/studio
2. **Click "Pages"** in the left sidebar
3. **Click the + button** to create new
4. **Fill in**:
   - **Title**: Page name (appears in navigation)
   - **Slug**: URL path (e.g., "about" = flowinfaith.com/about)
5. **Add content blocks** using the Page Builder
6. **Click "Publish"**

The page will automatically appear in the navigation!

### Available Content Blocks

| Block | What It Does |
|-------|--------------|
| **Hero Block** | Large header with background image |
| **Brand Block** | Brand/mission statement section |
| **Pillars Block** | Feature columns |
| **Benefits Block** | Benefits/features list |
| **Media + Text Block** | Image/video with text side-by-side |
| **Image Block** | Full-width image |
| **Video Block** | Embedded video |
| **Testimonial Block** | Customer quotes |
| **Team Block** | Team member profiles |
| **Rich Text Block** | Free-form text content |
| **CTA Block** | Call-to-action button section |

---

## Understanding User Flows

### New Teacher Purchase Flow

```
1. Visitor clicks "Join Now"
          ↓
2. Fills out Alignment Form (/apply)
          ↓
3. Redirected to payment (/join)
          ↓
4. Completes Thrivecart checkout
          ↓
5. AUTOMATIC: Webhook creates allowedUser entry
          ↓
6. User signs up / logs in with same email
          ↓
7. AUTOMATIC: Upgraded to teacher membership
          ↓
8. Redirected to Dashboard with teacher access
```

### Free Practitioner Signup Flow

```
1. Visitor signs up (no purchase)
          ↓
2. Email NOT in allowedUser list
          ↓
3. Redirected to Onboarding (/onboarding)
          ↓
4. Chooses "I am a Practitioner"
          ↓
5. Access to practitioner features
```

### What Each User Type Sees in Navigation

**Signed Out:**
- Dynamic pages from Sanity
- "Join Now" button

**Signed In - Teacher:**
- Resources
- Community Calls
- Directory
- Dashboard
- User avatar

**Signed In - Practitioner:**
- Video Library
- Live Classes
- Find a Teacher
- Dashboard
- User avatar

---

## Troubleshooting

### "User purchased but wasn't upgraded to teacher"

**Check 1: Thrivecart Webhook**
1. Log into Thrivecart
2. Go to webhooks/notifications
3. Check if webhook delivery succeeded

**Check 2: Allowed User Entry**
1. Go to Sanity Studio → Allowed User
2. Search for their email
3. Is there an entry? If not, create one manually

**Check 3: Email Match**
- The email in Sanity "Allowed User" MUST exactly match the email they used to sign up in Clerk

**Fix: Manual Upgrade**
1. Go to Clerk Dashboard
2. Find user → Metadata → Public Metadata
3. Set:
   ```json
   {
     "membershipType": "teacher",
     "tier": "professional"
   }
   ```

### "User keeps being sent to onboarding"

The `onboardingComplete` flag isn't set.

**Fix:**
1. Go to Clerk Dashboard → Find user
2. Public Metadata → Add:
   ```json
   {
     "membershipType": "teacher",
     "onboardingComplete": true
   }
   ```

### "Teacher not appearing in directory"

Teachers appear in the directory automatically, but:
1. They must have `membershipType: 'teacher'` in Clerk
2. Profile details come from their `teacherProfile` in Clerk metadata
3. They can edit their profile at `/dashboard/directory-profile`

### "Video/class not showing for users"

Check the **Target Audience** setting:
- "Teacher Only" = Only teachers see it
- "Practitioner Only" = Only practitioners see it
- "Everyone" = All logged-in users see it

### "Live class still showing after it ended"

This shouldn't happen (past classes auto-hide), but if it does:
1. Check the date/time is correct
2. Make sure it's in the past
3. The filter uses current server time

---

## Technical Reference

### Environment Variables

These are configured in Vercel (Settings → Environment Variables):

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk public key |
| `CLERK_SECRET_KEY` | Clerk private key |
| `CLERK_WEBHOOK_SECRET` | Validates Clerk webhooks |
| `THRIVECART_SECRET` | Validates Thrivecart webhooks |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset (production) |
| `SANITY_API_READ_TOKEN` | Sanity read access |
| `SANITY_API_WRITE_TOKEN` | Sanity write access (webhooks) |

### Webhook URLs

| Service | Webhook URL |
|---------|-------------|
| **Thrivecart** | `https://www.flowinfaith.com/api/webhooks/thrivecart` |
| **Clerk** | `https://www.flowinfaith.com/api/webhooks/clerk` |

### Sanity Content Types

| Type | Purpose | Location in Studio |
|------|---------|-------------------|
| `video` | On-demand videos | Video Library |
| `liveClass` | Scheduled classes | Live Class Schedule |
| `resource` | Teaching materials | Teacher Resources |
| `page` | Website pages | Pages |
| `allowedUser` | Teacher whitelist | Allowed User |

### User Metadata Structure (Clerk)

```json
{
  "publicMetadata": {
    "membershipType": "teacher" | "practitioner",
    "tier": "free" | "professional",
    "onboardingComplete": true,
    "teacherProfile": {
      "name": "Display Name",
      "location": "City, State",
      "bio": "About text...",
      "website": "https://...",
      "specialties": ["Vinyasa", "Meditation"],
      "certifications": ["RYT-200", "RYT-500"]
    }
  }
}
```

---

## Weekly Maintenance Checklist

### Content Review
- [ ] Check for new allowedUser entries (Sanity)
- [ ] Review unredeemed purchases (allowedUser with redeemed: false)
- [ ] Add new videos as needed
- [ ] Schedule upcoming live classes
- [ ] Update resources for teachers

### User Management
- [ ] Check Clerk for any stuck users
- [ ] Verify new teacher upgrades worked
- [ ] Review any support requests

### Payments
- [ ] Check Thrivecart for successful payments
- [ ] Verify webhook delivery logs
- [ ] Handle any failed payments

---

## Getting Help

### Technical Issues
- **Vercel (Hosting)**: Check deployment logs at vercel.com
- **Clerk (Auth)**: Support at clerk.com/support
- **Sanity (CMS)**: Support at sanity.io/help

### Common Admin Tasks Quick Links
- Add a teacher: Sanity → Allowed User → New
- Add a video: Sanity → Video Library → New
- Add a class: Sanity → Live Class Schedule → New
- Check a user: Clerk Dashboard → Search
- View payments: Thrivecart Dashboard

---

*Last updated: February 2025*
*Document version: 1.0*
