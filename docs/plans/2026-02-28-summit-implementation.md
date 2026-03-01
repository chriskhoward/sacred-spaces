# Flow in Faith Virtual Summit — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a Sanity-managed virtual summit section to Sacred Spaces with drip-gated free access and Clerk-gated All Access Pass.

**Architecture:** Summit lives at `/summit/*` with its own layout and editable nav. Four new Sanity schemas (`summit`, `summitSpeaker`, `summitPresentation`, `summitYogaClass`) drive all content. Route groups `(current)/` and `[year]/` handle live vs archived summits. Server-side auth via `await auth()` + `has({ plan })` gates All Access content.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Sanity v5 (`next-sanity`), Clerk (`@clerk/nextjs`), `@portabletext/react`

**Design Doc:** `docs/plans/2026-02-28-summit-feature-design.md`

---

## Task 1: Sanity Schema — `summitSpeaker`

**Files:**
- Create: `src/sanity/schemaTypes/summitSpeaker.ts`

**Step 1: Create the schema file**

```typescript
// src/sanity/schemaTypes/summitSpeaker.ts
import { defineField, defineType } from 'sanity'

export const summitSpeakerType = defineType({
  name: 'summitSpeaker',
  title: 'Summit Speaker',
  type: 'document',
  icon: () => '🎤',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headshot',
      title: 'Headshot',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'websiteUrl',
      title: 'Website URL',
      type: 'url',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'YouTube', value: 'youtube' },
                  { title: 'TikTok', value: 'tiktok' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'Twitter/X', value: 'twitter' },
                  { title: 'Website', value: 'website' },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: 'platform', subtitle: 'url' },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'name', media: 'headshot' },
  },
})
```

**Step 2: Verify no syntax errors**

Run: `npx tsc --noEmit src/sanity/schemaTypes/summitSpeaker.ts 2>&1 || true`

(May show import errors since it's not registered yet — that's fine. Check for syntax errors only.)

---

## Task 2: Sanity Schema — `summit`

**Files:**
- Create: `src/sanity/schemaTypes/summit.ts`

**Step 1: Create the schema file**

```typescript
// src/sanity/schemaTypes/summit.ts
import { defineField, defineType } from 'sanity'

export const summitType = defineType({
  name: 'summit',
  title: 'Summit',
  type: 'document',
  icon: () => '🏔️',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (Rule) => Rule.required().integer().min(2024),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) => `${doc.title}-${doc.year}`,
        maxLength: 96,
      },
    }),
    defineField({
      name: 'isCurrent',
      title: 'Is Current Summit',
      type: 'boolean',
      description: 'Only one summit should be marked as current. This one shows at /summit/*.',
      initialValue: false,
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Short summary for SEO/meta',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'datetime',
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'datetime',
    }),
    defineField({
      name: 'communityLink',
      title: 'Community Link',
      type: 'url',
      description: 'WhatsApp group link',
    }),
    defineField({
      name: 'registrationUrl',
      title: 'Registration URL',
      type: 'url',
      description: 'External registration page',
    }),
    defineField({
      name: 'allAccessSalesUrl',
      title: 'All Access Sales URL',
      type: 'url',
      description: 'External sales page for All Access Pass',
    }),
    defineField({
      name: 'clerkPlanId',
      title: 'Clerk Plan ID',
      type: 'string',
      description: 'e.g. summit_all_access — used for gating content',
    }),
    defineField({
      name: 'welcomeContentFree',
      title: 'Welcome Content (Free)',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            }),
          ],
        },
      ],
      description: 'Start Here page content for free users',
    }),
    defineField({
      name: 'welcomeContentAllAccess',
      title: 'Welcome Content (All Access)',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            }),
          ],
        },
      ],
      description: 'Start Here page content for All Access users',
    }),
    defineField({
      name: 'allAccessPerks',
      title: 'All Access Perks',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Describes what All Access includes — shown on /summit/all-access',
    }),
    defineField({
      name: 'navLinks',
      title: 'Navigation Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'path',
              title: 'Path',
              type: 'string',
              description: 'Relative path, e.g. /start-here, /schedule',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'path' },
          },
        },
      ],
    }),
    defineField({
      name: 'faqItems',
      title: 'FAQ Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'answer',
              title: 'Answer',
              type: 'text',
              rows: 4,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: 'question' },
          },
        },
      ],
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      year: 'year',
      isCurrent: 'isCurrent',
    },
    prepare({ title, year, isCurrent }) {
      return {
        title: `${title} ${year}`,
        subtitle: isCurrent ? '✅ Current' : 'Archived',
      }
    },
  },
})
```

---

## Task 3: Sanity Schema — `summitPresentation`

**Files:**
- Create: `src/sanity/schemaTypes/summitPresentation.ts`

**Step 1: Create the schema file**

```typescript
// src/sanity/schemaTypes/summitPresentation.ts
import { defineField, defineType } from 'sanity'

export const summitPresentationType = defineType({
  name: 'summitPresentation',
  title: 'Summit Presentation',
  type: 'document',
  icon: () => '🎬',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summit',
      title: 'Summit',
      type: 'reference',
      to: [{ type: 'summit' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'speaker',
      title: 'Speaker',
      type: 'reference',
      to: [{ type: 'summitSpeaker' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'Embed URL (e.g. YouTube, Vimeo)',
    }),
    defineField({
      name: 'availableDate',
      title: 'Available Date',
      type: 'datetime',
      description: 'When free users can start watching',
    }),
    defineField({
      name: 'expiresDate',
      title: 'Expires Date',
      type: 'datetime',
      description: 'When free access ends',
    }),
    defineField({
      name: 'dayNumber',
      title: 'Day Number',
      type: 'number',
      description: 'Day 1, Day 2, etc.',
      validation: (Rule) => Rule.integer().min(1),
    }),
    defineField({
      name: 'timeSlot',
      title: 'Time Slot',
      type: 'string',
      description: 'e.g. "10:00 AM EST"',
    }),
    defineField({
      name: 'resources',
      title: 'Resources',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
            }),
            defineField({
              name: 'file',
              title: 'File',
              type: 'file',
            }),
          ],
          preview: {
            select: { title: 'title' },
          },
        },
      ],
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Ordering within a day',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Day & Order',
      name: 'dayOrder',
      by: [
        { field: 'dayNumber', direction: 'asc' },
        { field: 'displayOrder', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      speaker: 'speaker.name',
      day: 'dayNumber',
    },
    prepare({ title, speaker, day }) {
      return {
        title,
        subtitle: `Day ${day || '?'} — ${speaker || 'No speaker'}`,
      }
    },
  },
})
```

---

## Task 4: Sanity Schema — `summitYogaClass`

**Files:**
- Create: `src/sanity/schemaTypes/summitYogaClass.ts`

**Step 1: Create the schema file**

```typescript
// src/sanity/schemaTypes/summitYogaClass.ts
import { defineField, defineType } from 'sanity'

export const summitYogaClassType = defineType({
  name: 'summitYogaClass',
  title: 'Summit Yoga Class',
  type: 'document',
  icon: () => '🧘',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summit',
      title: 'Summit',
      type: 'reference',
      to: [{ type: 'summit' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'instructor',
      title: 'Instructor',
      type: 'string',
      description: 'Instructor name',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'order',
      by: [{ field: 'displayOrder', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'instructor' },
  },
})
```

---

## Task 5: Register Schemas & Build Check

**Files:**
- Modify: `src/sanity/schemaTypes/index.ts`

**Step 1: Add imports and register types**

Add these imports at the top of the file (after the existing imports):

```typescript
import { summitSpeakerType } from './summitSpeaker'
import { summitType } from './summit'
import { summitPresentationType } from './summitPresentation'
import { summitYogaClassType } from './summitYogaClass'
```

Add these entries to the `types` array (before the closing `]`):

```typescript
    summitType,
    summitSpeakerType,
    summitPresentationType,
    summitYogaClassType,
```

**Step 2: Run build to verify schemas compile**

Run: `npm run build`
Expected: Build succeeds with no errors related to summit schemas.

**Step 3: Commit**

```bash
git add src/sanity/schemaTypes/summitSpeaker.ts src/sanity/schemaTypes/summit.ts src/sanity/schemaTypes/summitPresentation.ts src/sanity/schemaTypes/summitYogaClass.ts src/sanity/schemaTypes/index.ts
git commit -m "feat(summit): add Sanity schemas for summit, speaker, presentation, yoga class"
```

---

## Task 6: Types & GROQ Queries

**Files:**
- Create: `src/sanity/lib/summit.ts`

**Step 1: Create types and queries file**

```typescript
// src/sanity/lib/summit.ts

// ---------- Types ----------

export interface SummitNavLink {
  label: string
  path: string
}

export interface SummitFaqItem {
  question: string
  answer: string
}

export interface SummitSpeaker {
  _id: string
  name: string
  headshot?: any // Sanity image reference
  bio?: string
  websiteUrl?: string
  socialLinks?: Array<{
    platform: string
    url: string
  }>
}

export interface SummitPresentationResource {
  title: string
  url?: string
  file?: {
    asset: {
      url: string
    }
  }
}

export interface SummitPresentation {
  _id: string
  title: string
  slug: { current: string }
  speaker: SummitSpeaker
  description?: string
  videoUrl?: string
  availableDate?: string
  expiresDate?: string
  dayNumber?: number
  timeSlot?: string
  resources?: SummitPresentationResource[]
  displayOrder?: number
}

export interface SummitYogaClass {
  _id: string
  title: string
  instructor?: string
  videoUrl?: string
  description?: string
  displayOrder?: number
}

export interface Summit {
  _id: string
  title: string
  year: number
  slug?: { current: string }
  isCurrent?: boolean
  description?: string
  heroImage?: any
  startDate?: string
  endDate?: string
  communityLink?: string
  registrationUrl?: string
  allAccessSalesUrl?: string
  clerkPlanId?: string
  welcomeContentFree?: any[]
  welcomeContentAllAccess?: any[]
  allAccessPerks?: any[]
  navLinks?: SummitNavLink[]
  faqItems?: SummitFaqItem[]
  contactEmail?: string
}

// ---------- GROQ Projections ----------

const speakerProjection = `{
  _id,
  name,
  headshot,
  bio,
  websiteUrl,
  socialLinks
}`

const presentationProjection = `{
  _id,
  title,
  slug,
  speaker->${speakerProjection},
  description,
  videoUrl,
  availableDate,
  expiresDate,
  dayNumber,
  timeSlot,
  resources[] {
    title,
    url,
    file { asset-> { url } }
  },
  displayOrder
}`

// ---------- GROQ Queries ----------

export const CURRENT_SUMMIT_QUERY = `*[_type == "summit" && isCurrent == true][0]`

export const SUMMIT_BY_YEAR_QUERY = `*[_type == "summit" && year == $year][0]`

export const SUMMIT_PRESENTATIONS_QUERY = `*[_type == "summitPresentation" && summit._ref == $summitId] | order(dayNumber asc, displayOrder asc) ${presentationProjection}`

export const SUMMIT_PRESENTATION_BY_SLUG_QUERY = `*[_type == "summitPresentation" && summit._ref == $summitId && slug.current == $slug][0] ${presentationProjection}`

export const SUMMIT_YOGA_CLASSES_QUERY = `*[_type == "summitYogaClass" && summit._ref == $summitId] | order(displayOrder asc) {
  _id,
  title,
  instructor,
  videoUrl,
  description,
  displayOrder
}`

// ---------- Helpers ----------

/**
 * Check if a presentation is currently available for free users.
 * Returns true if now is between availableDate and expiresDate.
 */
export function isPresentationAvailableFree(presentation: SummitPresentation): boolean {
  if (!presentation.availableDate || !presentation.expiresDate) return false
  const now = new Date()
  return now >= new Date(presentation.availableDate) && now <= new Date(presentation.expiresDate)
}

/**
 * Group presentations by dayNumber for schedule display.
 */
export function groupPresentationsByDay(presentations: SummitPresentation[]): Map<number, SummitPresentation[]> {
  const grouped = new Map<number, SummitPresentation[]>()
  for (const p of presentations) {
    const day = p.dayNumber ?? 0
    if (!grouped.has(day)) grouped.set(day, [])
    grouped.get(day)!.push(p)
  }
  return grouped
}

/**
 * Deduplicate speakers from presentations array.
 */
export function getUniqueSpeakers(presentations: SummitPresentation[]): SummitSpeaker[] {
  const seen = new Set<string>()
  const speakers: SummitSpeaker[] = []
  for (const p of presentations) {
    if (p.speaker && !seen.has(p.speaker._id)) {
      seen.add(p.speaker._id)
      speakers.push(p.speaker)
    }
  }
  return speakers
}
```

**Step 2: Verify types compile**

Run: `npm run build`
Expected: Build succeeds.

**Step 3: Commit**

```bash
git add src/sanity/lib/summit.ts
git commit -m "feat(summit): add TypeScript types, GROQ queries, and helper functions"
```

---

## Task 7: Summit Nav Component

**Files:**
- Create: `src/components/summit/SummitNav.tsx`

**Step 1: Create the SummitNav client component**

This is a client component with mobile hamburger menu and scroll-to-hide, modeled after `NavbarClient.tsx`.

```typescript
// src/components/summit/SummitNav.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { useState, useEffect, useRef } from 'react'
import type { SummitNavLink } from '@/sanity/lib/summit'

interface SummitNavProps {
  navLinks: SummitNavLink[]
  basePath: string // '/summit' or '/summit/2025'
  summitTitle: string
  communityLink?: string
  logoUrl?: string
}

export default function SummitNav({
  navLinks,
  basePath,
  summitTitle,
  communityLink,
  logoUrl,
}: SummitNavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const lastScrollY = useRef(0)

  const closeMenu = () => setIsMenuOpen(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY < 10) {
        setIsVisible(true)
        lastScrollY.current = currentScrollY
        return
      }
      if (isMenuOpen) {
        lastScrollY.current = currentScrollY
        return
      }
      const delta = currentScrollY - lastScrollY.current
      if (delta > 10) setIsVisible(false)
      else if (delta < -10) setIsVisible(true)
      lastScrollY.current = currentScrollY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMenuOpen])

  return (
    <div
      className={`fixed top-0 left-0 w-full z-40 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <nav className="bg-(--color-primary) py-4">
        <div className="container mx-auto px-4 flex justify-between items-center h-16">
          {/* Logo / Summit Title */}
          <Link
            href={`${basePath}/start-here`}
            className="shrink-0 flex items-center gap-3"
            onClick={closeMenu}
          >
            {logoUrl && (
              <Image
                src={logoUrl}
                alt={summitTitle}
                width={200}
                height={200}
                className="h-10 w-10 object-contain"
                unoptimized={logoUrl.startsWith('http')}
              />
            )}
            <span className="text-white font-bold text-lg hidden sm:inline">
              {summitTitle}
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={`${basePath}${link.path}`}
                className="text-white hover:text-(--color-roti) transition-colors font-medium text-sm"
              >
                {link.label}
              </Link>
            ))}
            {communityLink && (
              <a
                href={communityLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-(--color-roti) transition-colors font-medium text-sm"
              >
                Community
              </a>
            )}
            <SignedOut>
              <Link
                href="/sign-in"
                className="px-5 py-2 bg-(--color-roti) text-white rounded-full font-bold uppercase tracking-wide hover:opacity-90 transition-opacity text-sm shadow-md"
              >
                Sign In
              </Link>
            </SignedOut>
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox:
                      'w-9 h-9 border-2 border-white/20 hover:border-(--color-roti) transition-all',
                  },
                }}
              />
            </SignedIn>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <span
              className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'
              }`}
            />
            <span
              className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
                isMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-(--color-primary) shadow-lg max-h-[calc(100vh-6rem)] overflow-y-auto">
          <div className="flex flex-col pt-6 px-6 pb-6">
            <ul className="flex flex-col gap-4 list-none m-0 p-0">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    href={`${basePath}${link.path}`}
                    className="font-bold text-white hover:text-(--color-roti) transition-colors text-lg py-2 block"
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {communityLink && (
                <li>
                  <a
                    href={communityLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-white hover:text-(--color-roti) transition-colors text-lg py-2 block"
                    onClick={closeMenu}
                  >
                    Community
                  </a>
                </li>
              )}
            </ul>
            <div className="mt-6 pt-6 border-t border-white/20">
              <SignedOut>
                <Link
                  href="/sign-in"
                  className="block w-full px-6 py-3 bg-(--color-roti) text-white rounded-full font-bold text-sm uppercase tracking-wide hover:opacity-90 transition-opacity text-center shadow-md"
                  onClick={closeMenu}
                >
                  Sign In
                </Link>
              </SignedOut>
              <SignedIn>
                <div className="flex justify-center">
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox:
                          'w-11 h-11 border-2 border-white/20 hover:border-(--color-roti) transition-all',
                      },
                    }}
                  />
                </div>
              </SignedIn>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
```

---

## Task 8: UpgradeCTA Component

**Files:**
- Create: `src/components/summit/UpgradeCTA.tsx`

**Step 1: Create the CTA component**

```typescript
// src/components/summit/UpgradeCTA.tsx
import Link from 'next/link'

interface UpgradeCTAProps {
  allAccessSalesUrl?: string
  basePath?: string
  message?: string
}

export default function UpgradeCTA({
  allAccessSalesUrl,
  basePath = '/summit',
  message = 'This presentation is no longer available for free viewing.',
}: UpgradeCTAProps) {
  const upgradeHref = allAccessSalesUrl || `${basePath}/all-access`

  return (
    <div className="bg-(--color-sidecar) rounded-2xl p-8 text-center max-w-xl mx-auto">
      <h3 className="text-2xl font-bold text-(--color-primary) mb-4">
        Get All Access
      </h3>
      <p className="text-(--color-primary)/80 mb-6">{message}</p>
      <p className="text-(--color-primary)/70 text-sm mb-6">
        Upgrade to the All Access Pass for permanent, unlimited access to all
        summit presentations, resources, and bonus content.
      </p>
      {allAccessSalesUrl ? (
        <a
          href={upgradeHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-3 bg-(--color-roti) text-white rounded-full font-bold uppercase tracking-wide hover:opacity-90 transition-opacity shadow-md"
        >
          Get All Access Pass
        </a>
      ) : (
        <Link
          href={upgradeHref}
          className="inline-block px-8 py-3 bg-(--color-roti) text-white rounded-full font-bold uppercase tracking-wide hover:opacity-90 transition-opacity shadow-md"
        >
          Get All Access Pass
        </Link>
      )}
    </div>
  )
}
```

**Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds.

**Step 3: Commit**

```bash
git add src/components/summit/SummitNav.tsx src/components/summit/UpgradeCTA.tsx
git commit -m "feat(summit): add SummitNav and UpgradeCTA components"
```

---

## Task 9: Current Summit Layout & Root Redirect

**Files:**
- Create: `src/app/summit/page.tsx`
- Create: `src/app/summit/(current)/layout.tsx`

**Step 1: Create root redirect**

```typescript
// src/app/summit/page.tsx
import { redirect } from 'next/navigation'

export default function SummitRootPage() {
  redirect('/summit/start-here')
}
```

**Step 2: Create current summit layout**

This layout fetches the current summit from Sanity and renders the SummitNav.

```typescript
// src/app/summit/(current)/layout.tsx
import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { urlForImage } from '@/sanity/lib/image'
import { CURRENT_SUMMIT_QUERY, type Summit } from '@/sanity/lib/summit'
import SummitNav from '@/components/summit/SummitNav'

export const dynamic = 'force-dynamic'

export default async function CurrentSummitLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const summit = await client.fetch<Summit | null>(CURRENT_SUMMIT_QUERY)

  if (!summit) {
    notFound()
  }

  const logoUrl = summit.heroImage
    ? urlForImage(summit.heroImage).width(80).height(80).url()
    : undefined

  return (
    <>
      <SummitNav
        navLinks={summit.navLinks ?? []}
        basePath="/summit"
        summitTitle={summit.title}
        communityLink={summit.communityLink}
        logoUrl={logoUrl}
      />
      {/* Spacer for fixed nav */}
      <div className="pt-24" />
      <main className="min-h-screen">{children}</main>
    </>
  )
}
```

**Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds (pages may warn about missing data at build time — that's fine with `force-dynamic`).

**Step 4: Commit**

```bash
git add src/app/summit/page.tsx src/app/summit/\(current\)/layout.tsx
git commit -m "feat(summit): add current summit layout and root redirect"
```

---

## Task 10: Start Here Page

**Files:**
- Create: `src/app/summit/(current)/start-here/page.tsx`

**Step 1: Create the Start Here page**

```typescript
// src/app/summit/(current)/start-here/page.tsx
import { client } from '@/sanity/lib/client'
import { auth } from '@clerk/nextjs/server'
import { PortableText } from '@portabletext/react'
import { CURRENT_SUMMIT_QUERY, type Summit } from '@/sanity/lib/summit'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const summit = await client.fetch<Summit | null>(CURRENT_SUMMIT_QUERY)
  return {
    title: summit ? `Start Here — ${summit.title}` : 'Summit',
    description: summit?.description,
  }
}

export default async function StartHerePage() {
  const summit = await client.fetch<Summit | null>(CURRENT_SUMMIT_QUERY)
  if (!summit) notFound()

  const { has } = await auth()
  const hasAllAccess = summit.clerkPlanId
    ? await has({ plan: summit.clerkPlanId })
    : false

  const content = hasAllAccess
    ? summit.welcomeContentAllAccess
    : summit.welcomeContentFree

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-4xl font-bold text-(--color-primary) mb-8">
        Welcome to {summit.title}
      </h1>

      {content && content.length > 0 ? (
        <div className="prose prose-lg max-w-none text-(--color-primary)">
          <PortableText value={content} />
        </div>
      ) : (
        <p className="text-(--color-primary)/70">
          Welcome content coming soon.
        </p>
      )}

      {summit.registrationUrl && !hasAllAccess && (
        <div className="mt-8">
          <a
            href={summit.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-(--color-roti) text-white rounded-full font-bold uppercase tracking-wide hover:opacity-90 transition-opacity shadow-md"
          >
            Register Now
          </a>
        </div>
      )}
    </div>
  )
}
```

**Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds.

**Step 3: Commit**

```bash
git add src/app/summit/\(current\)/start-here/page.tsx
git commit -m "feat(summit): add Start Here page with tier-based content"
```

---

## Task 11: Schedule Page

**Files:**
- Create: `src/app/summit/(current)/schedule/page.tsx`

**Step 1: Create the Schedule page**

```typescript
// src/app/summit/(current)/schedule/page.tsx
import { client } from '@/sanity/lib/client'
import { urlForImage } from '@/sanity/lib/image'
import Image from 'next/image'
import Link from 'next/link'
import {
  CURRENT_SUMMIT_QUERY,
  SUMMIT_PRESENTATIONS_QUERY,
  groupPresentationsByDay,
  type Summit,
  type SummitPresentation,
} from '@/sanity/lib/summit'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const summit = await client.fetch<Summit | null>(CURRENT_SUMMIT_QUERY)
  return {
    title: summit ? `Schedule — ${summit.title}` : 'Schedule',
    description: summit?.description,
  }
}

export default async function SchedulePage() {
  const summit = await client.fetch<Summit | null>(CURRENT_SUMMIT_QUERY)
  if (!summit) notFound()

  const presentations = await client.fetch<SummitPresentation[]>(
    SUMMIT_PRESENTATIONS_QUERY,
    { summitId: summit._id }
  )

  const grouped = groupPresentationsByDay(presentations)
  const sortedDays = Array.from(grouped.keys()).sort((a, b) => a - b)

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold text-(--color-primary) mb-8">
        Schedule
      </h1>

      {sortedDays.length === 0 ? (
        <p className="text-(--color-primary)/70">
          Schedule coming soon.
        </p>
      ) : (
        <div className="space-y-12">
          {sortedDays.map((day) => (
            <section key={day}>
              <h2 className="text-2xl font-bold text-(--color-primary) mb-6 pb-2 border-b-2 border-(--color-roti)">
                Day {day}
              </h2>
              <div className="space-y-4">
                {grouped.get(day)!.map((p) => (
                  <Link
                    key={p._id}
                    href={`/summit/presentations/${p.slug.current}`}
                    className="block bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-(--color-gallery)"
                  >
                    <div className="flex items-start gap-4">
                      {p.speaker?.headshot && (
                        <Image
                          src={urlForImage(p.speaker.headshot)
                            .width(80)
                            .height(80)
                            .url()}
                          alt={p.speaker.name}
                          width={80}
                          height={80}
                          className="rounded-full object-cover shrink-0"
                          unoptimized
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-(--color-primary)">
                          {p.title}
                        </h3>
                        <p className="text-sm text-(--color-primary)/70 mt-1">
                          {p.speaker?.name}
                        </p>
                        {p.timeSlot && (
                          <p className="text-sm text-(--color-roti) font-medium mt-1">
                            {p.timeSlot}
                          </p>
                        )}
                        {p.description && (
                          <p className="text-sm text-(--color-primary)/60 mt-2 line-clamp-2">
                            {p.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
```

**Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds.

**Step 3: Commit**

```bash
git add src/app/summit/\(current\)/schedule/page.tsx
git commit -m "feat(summit): add auto-generated schedule page grouped by day"
```

---

## Task 12: Speakers Page

**Files:**
- Create: `src/app/summit/(current)/speakers/page.tsx`

**Step 1: Create the Speakers page**

```typescript
// src/app/summit/(current)/speakers/page.tsx
import { client } from '@/sanity/lib/client'
import { urlForImage } from '@/sanity/lib/image'
import Image from 'next/image'
import {
  CURRENT_SUMMIT_QUERY,
  SUMMIT_PRESENTATIONS_QUERY,
  getUniqueSpeakers,
  type Summit,
  type SummitPresentation,
} from '@/sanity/lib/summit'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const summit = await client.fetch<Summit | null>(CURRENT_SUMMIT_QUERY)
  return {
    title: summit ? `Speakers — ${summit.title}` : 'Speakers',
    description: summit?.description,
  }
}

export default async function SpeakersPage() {
  const summit = await client.fetch<Summit | null>(CURRENT_SUMMIT_QUERY)
  if (!summit) notFound()

  const presentations = await client.fetch<SummitPresentation[]>(
    SUMMIT_PRESENTATIONS_QUERY,
    { summitId: summit._id }
  )

  const speakers = getUniqueSpeakers(presentations)

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <h1 className="text-4xl font-bold text-(--color-primary) mb-8">
        Speakers
      </h1>

      {speakers.length === 0 ? (
        <p className="text-(--color-primary)/70">
          Speaker lineup coming soon.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {speakers.map((speaker) => (
            <div
              key={speaker._id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-(--color-gallery) text-center"
            >
              {speaker.headshot ? (
                <Image
                  src={urlForImage(speaker.headshot)
                    .width(200)
                    .height(200)
                    .url()}
                  alt={speaker.name}
                  width={200}
                  height={200}
                  className="rounded-full mx-auto mb-4 object-cover w-32 h-32"
                  unoptimized
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-(--color-gallery) mx-auto mb-4 flex items-center justify-center text-3xl text-(--color-primary)/30">
                  🎤
                </div>
              )}
              <h3 className="text-lg font-bold text-(--color-primary)">
                {speaker.name}
              </h3>
              {speaker.bio && (
                <p className="text-sm text-(--color-primary)/70 mt-2 line-clamp-3">
                  {speaker.bio}
                </p>
              )}
              <div className="flex justify-center gap-3 mt-4">
                {speaker.websiteUrl && (
                  <a
                    href={speaker.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-(--color-roti) hover:opacity-80 text-sm font-medium"
                  >
                    Website
                  </a>
                )}
                {speaker.socialLinks?.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-(--color-roti) hover:opacity-80 text-sm font-medium capitalize"
                  >
                    {link.platform}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
```

**Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds.

**Step 3: Commit**

```bash
git add src/app/summit/\(current\)/speakers/page.tsx
git commit -m "feat(summit): add speakers page with grid layout"
```

---

## Task 13: Presentation Detail Page (Gated)

**Files:**
- Create: `src/app/summit/(current)/presentations/[slug]/page.tsx`

This is the most complex page — it implements drip gating for free users and permanent access for All Access.

**Step 1: Create the presentation detail page**

```typescript
// src/app/summit/(current)/presentations/[slug]/page.tsx
import { client } from '@/sanity/lib/client'
import { auth } from '@clerk/nextjs/server'
import {
  CURRENT_SUMMIT_QUERY,
  SUMMIT_PRESENTATION_BY_SLUG_QUERY,
  isPresentationAvailableFree,
  type Summit,
  type SummitPresentation,
} from '@/sanity/lib/summit'
import { urlForImage } from '@/sanity/lib/image'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import UpgradeCTA from '@/components/summit/UpgradeCTA'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const summit = await client.fetch<Summit | null>(CURRENT_SUMMIT_QUERY)
  if (!summit) return { title: 'Presentation' }
  const presentation = await client.fetch<SummitPresentation | null>(
    SUMMIT_PRESENTATION_BY_SLUG_QUERY,
    { summitId: summit._id, slug }
  )
  return {
    title: presentation
      ? `${presentation.title} — ${summit.title}`
      : 'Presentation',
    description: presentation?.description,
  }
}

export default async function PresentationPage({ params }: PageProps) {
  const { slug } = await params
  const summit = await client.fetch<Summit | null>(CURRENT_SUMMIT_QUERY)
  if (!summit) notFound()

  const presentation = await client.fetch<SummitPresentation | null>(
    SUMMIT_PRESENTATION_BY_SLUG_QUERY,
    { summitId: summit._id, slug }
  )
  if (!presentation) notFound()

  // Access check
  const { has, userId } = await auth()
  const hasAllAccess = summit.clerkPlanId
    ? await has({ plan: summit.clerkPlanId })
    : false
  const isFreeAvailable = isPresentationAvailableFree(presentation)
  const canWatch = hasAllAccess || isFreeAvailable

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Back link */}
      <Link
        href="/summit/schedule"
        className="text-(--color-roti) hover:opacity-80 text-sm font-medium mb-6 inline-block"
      >
        ← Back to Schedule
      </Link>

      {/* Header */}
      <div className="flex items-start gap-6 mb-8">
        {presentation.speaker?.headshot && (
          <Image
            src={urlForImage(presentation.speaker.headshot)
              .width(120)
              .height(120)
              .url()}
            alt={presentation.speaker.name}
            width={120}
            height={120}
            className="rounded-full object-cover shrink-0 hidden sm:block"
            unoptimized
          />
        )}
        <div>
          <h1 className="text-3xl font-bold text-(--color-primary)">
            {presentation.title}
          </h1>
          <p className="text-lg text-(--color-primary)/70 mt-2">
            {presentation.speaker?.name}
          </p>
          {presentation.dayNumber && (
            <p className="text-sm text-(--color-roti) font-medium mt-1">
              Day {presentation.dayNumber}
              {presentation.timeSlot ? ` — ${presentation.timeSlot}` : ''}
            </p>
          )}
        </div>
      </div>

      {/* Video or CTA */}
      {canWatch && presentation.videoUrl ? (
        <div className="aspect-video mb-8 rounded-xl overflow-hidden bg-black">
          <iframe
            src={presentation.videoUrl}
            title={presentation.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      ) : !canWatch ? (
        <div className="mb-8">
          <UpgradeCTA
            allAccessSalesUrl={summit.allAccessSalesUrl}
            basePath="/summit"
            message={
              !userId
                ? 'Sign in to check if this presentation is available for free viewing, or get All Access for permanent access.'
                : 'This presentation is no longer available for free viewing.'
            }
          />
        </div>
      ) : null}

      {/* Description */}
      {presentation.description && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-(--color-primary) mb-3">
            About This Presentation
          </h2>
          <p className="text-(--color-primary)/80 whitespace-pre-line">
            {presentation.description}
          </p>
        </div>
      )}

      {/* Resources (only for All Access or while free-available) */}
      {canWatch &&
        presentation.resources &&
        presentation.resources.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-(--color-primary) mb-3">
              Resources
            </h2>
            <ul className="space-y-2">
              {presentation.resources.map((r, i) => {
                const href = r.url || r.file?.asset?.url
                return (
                  <li key={i}>
                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-(--color-roti) hover:opacity-80 font-medium"
                      >
                        {r.title}
                      </a>
                    ) : (
                      <span className="text-(--color-primary)/70">
                        {r.title}
                      </span>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        )}

      {/* All Access badge */}
      {hasAllAccess && (
        <div className="inline-block px-4 py-2 bg-(--color-roti)/10 text-(--color-roti) rounded-full text-sm font-medium">
          ✓ All Access
        </div>
      )}
    </div>
  )
}
```

**Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds.

**Step 3: Commit**

```bash
git add src/app/summit/\(current\)/presentations/\[slug\]/page.tsx
git commit -m "feat(summit): add gated presentation detail page with drip + All Access logic"
```

---

## Task 14: Yoga Classes Page

**Files:**
- Create: `src/app/summit/(current)/yoga-classes/page.tsx`

**Step 1: Create the yoga classes page**

```typescript
// src/app/summit/(current)/yoga-classes/page.tsx
import { client } from '@/sanity/lib/client'
import {
  CURRENT_SUMMIT_QUERY,
  SUMMIT_YOGA_CLASSES_QUERY,
  type Summit,
  type SummitYogaClass,
} from '@/sanity/lib/summit'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const summit = await client.fetch<Summit | null>(CURRENT_SUMMIT_QUERY)
  return {
    title: summit ? `Yoga Classes — ${summit.title}` : 'Yoga Classes',
    description: summit?.description,
  }
}

export default async function YogaClassesPage() {
  const summit = await client.fetch<Summit | null>(CURRENT_SUMMIT_QUERY)
  if (!summit) notFound()

  const yogaClasses = await client.fetch<SummitYogaClass[]>(
    SUMMIT_YOGA_CLASSES_QUERY,
    { summitId: summit._id }
  )

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold text-(--color-primary) mb-8">
        Yoga Classes
      </h1>

      {yogaClasses.length === 0 ? (
        <p className="text-(--color-primary)/70">
          Yoga classes coming soon.
        </p>
      ) : (
        <div className="space-y-8">
          {yogaClasses.map((yc) => (
            <div
              key={yc._id}
              className="bg-white rounded-xl p-6 shadow-sm border border-(--color-gallery)"
            >
              <h3 className="text-xl font-bold text-(--color-primary)">
                {yc.title}
              </h3>
              {yc.instructor && (
                <p className="text-sm text-(--color-primary)/70 mt-1">
                  with {yc.instructor}
                </p>
              )}
              {yc.description && (
                <p className="text-(--color-primary)/80 mt-3">
                  {yc.description}
                </p>
              )}
              {yc.videoUrl && (
                <div className="aspect-video mt-4 rounded-lg overflow-hidden bg-black">
                  <iframe
                    src={yc.videoUrl}
                    title={yc.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
```

**Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds.

**Step 3: Commit**

```bash
git add src/app/summit/\(current\)/yoga-classes/page.tsx
git commit -m "feat(summit): add yoga classes page"
```

---

## Task 15: All Access Page

**Files:**
- Create: `src/app/summit/(current)/all-access/page.tsx`

**Step 1: Create the All Access page**

Uses Clerk `<PricingTable />` for the summit plan. Falls back to an external link if `allAccessSalesUrl` is set.

```typescript
// src/app/summit/(current)/all-access/page.tsx
import { client } from '@/sanity/lib/client'
import { auth } from '@clerk/nextjs/server'
import { PricingTable } from '@clerk/nextjs'
import { PortableText } from '@portabletext/react'
import { CURRENT_SUMMIT_QUERY, type Summit } from '@/sanity/lib/summit'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const summit = await client.fetch<Summit | null>(CURRENT_SUMMIT_QUERY)
  return {
    title: summit ? `All Access Pass — ${summit.title}` : 'All Access Pass',
    description: summit?.description,
  }
}

export default async function AllAccessPage() {
  const summit = await client.fetch<Summit | null>(CURRENT_SUMMIT_QUERY)
  if (!summit) notFound()

  const { has } = await auth()
  const hasAllAccess = summit.clerkPlanId
    ? await has({ plan: summit.clerkPlanId })
    : false

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-4xl font-bold text-(--color-primary) mb-8">
        All Access Pass
      </h1>

      {/* Already purchased */}
      {hasAllAccess ? (
        <div className="bg-(--color-sidecar) rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-(--color-primary) mb-4">
            You Have All Access! ✓
          </h2>
          <p className="text-(--color-primary)/80">
            You have permanent, unlimited access to all summit content,
            presentations, resources, and bonus material.
          </p>
        </div>
      ) : (
        <>
          {/* Perks description */}
          {summit.allAccessPerks && summit.allAccessPerks.length > 0 && (
            <div className="prose prose-lg max-w-none text-(--color-primary) mb-12">
              <PortableText value={summit.allAccessPerks} />
            </div>
          )}

          {/* Purchase option */}
          {summit.allAccessSalesUrl ? (
            <div className="text-center">
              <a
                href={summit.allAccessSalesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-10 py-4 bg-(--color-roti) text-white rounded-full font-bold text-lg uppercase tracking-wide hover:opacity-90 transition-opacity shadow-lg"
              >
                Get All Access Pass
              </a>
            </div>
          ) : (
            <PricingTable />
          )}
        </>
      )}
    </div>
  )
}
```

**Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds. Note: `<PricingTable />` requires Clerk Billing to be configured. The external URL fallback handles the case where it's not.

**Step 3: Commit**

```bash
git add src/app/summit/\(current\)/all-access/page.tsx
git commit -m "feat(summit): add All Access page with perks and purchase option"
```

---

## Task 16: Contact Page

**Files:**
- Create: `src/app/summit/(current)/contact/page.tsx`

**Step 1: Create the contact page with FAQ**

```typescript
// src/app/summit/(current)/contact/page.tsx
import { client } from '@/sanity/lib/client'
import { CURRENT_SUMMIT_QUERY, type Summit } from '@/sanity/lib/summit'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const summit = await client.fetch<Summit | null>(CURRENT_SUMMIT_QUERY)
  return {
    title: summit ? `Contact — ${summit.title}` : 'Contact',
    description: summit?.description,
  }
}

export default async function ContactPage() {
  const summit = await client.fetch<Summit | null>(CURRENT_SUMMIT_QUERY)
  if (!summit) notFound()

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-4xl font-bold text-(--color-primary) mb-8">
        Contact
      </h1>

      {/* Contact info */}
      {summit.contactEmail && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-(--color-gallery) mb-12">
          <h2 className="text-xl font-bold text-(--color-primary) mb-3">
            Get in Touch
          </h2>
          <p className="text-(--color-primary)/80">
            Have questions? Reach out to us at{' '}
            <a
              href={`mailto:${summit.contactEmail}`}
              className="text-(--color-roti) hover:opacity-80 font-medium"
            >
              {summit.contactEmail}
            </a>
          </p>
        </div>
      )}

      {/* FAQ */}
      {summit.faqItems && summit.faqItems.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-(--color-primary) mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {summit.faqItems.map((faq, i) => (
              <details
                key={i}
                className="bg-white rounded-xl p-6 shadow-sm border border-(--color-gallery) group"
              >
                <summary className="font-bold text-(--color-primary) cursor-pointer list-none flex items-center justify-between">
                  {faq.question}
                  <span className="text-(--color-roti) group-open:rotate-180 transition-transform ml-4">
                    ▼
                  </span>
                </summary>
                <p className="text-(--color-primary)/80 mt-4 whitespace-pre-line">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
```

**Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds.

**Step 3: Commit**

```bash
git add src/app/summit/\(current\)/contact/page.tsx
git commit -m "feat(summit): add contact page with FAQ accordion"
```

---

## Task 17: Archive Routes

**Files (8 new):**
- Create: `src/app/summit/[year]/layout.tsx`
- Create: `src/app/summit/[year]/page.tsx`
- Create: `src/app/summit/[year]/start-here/page.tsx`
- Create: `src/app/summit/[year]/schedule/page.tsx`
- Create: `src/app/summit/[year]/speakers/page.tsx`
- Create: `src/app/summit/[year]/presentations/[slug]/page.tsx`
- Create: `src/app/summit/[year]/yoga-classes/page.tsx`
- Create: `src/app/summit/[year]/contact/page.tsx`

**Important:** Archive pages are nearly identical to current pages but use `SUMMIT_BY_YEAR_QUERY` with `$year` param and `basePath="/summit/${year}"`. Archive presentations do NOT have gating — all content is viewable (the summit is over).

**Step 1: Create archive layout**

```typescript
// src/app/summit/[year]/layout.tsx
import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { urlForImage } from '@/sanity/lib/image'
import { SUMMIT_BY_YEAR_QUERY, type Summit } from '@/sanity/lib/summit'
import SummitNav from '@/components/summit/SummitNav'

export const dynamic = 'force-dynamic'

type LayoutProps = {
  children: React.ReactNode
  params: Promise<{ year: string }>
}

export default async function ArchiveSummitLayout({
  children,
  params,
}: LayoutProps) {
  const { year } = await params
  const yearNum = parseInt(year, 10)
  if (isNaN(yearNum)) notFound()

  const summit = await client.fetch<Summit | null>(SUMMIT_BY_YEAR_QUERY, {
    year: yearNum,
  })
  if (!summit) notFound()

  // If this is the current summit, the (current) routes handle it
  if (summit.isCurrent) notFound()

  const logoUrl = summit.heroImage
    ? urlForImage(summit.heroImage).width(80).height(80).url()
    : undefined

  return (
    <>
      <SummitNav
        navLinks={summit.navLinks ?? []}
        basePath={`/summit/${year}`}
        summitTitle={`${summit.title} ${summit.year}`}
        communityLink={summit.communityLink}
        logoUrl={logoUrl}
      />
      <div className="pt-24" />
      <main className="min-h-screen">
        <div className="container mx-auto px-4 py-2">
          <div className="inline-block px-3 py-1 bg-(--color-primary)/10 text-(--color-primary) rounded-full text-xs font-medium mb-4">
            Archive — {summit.year}
          </div>
        </div>
        {children}
      </main>
    </>
  )
}
```

**Step 2: Create archive redirect**

```typescript
// src/app/summit/[year]/page.tsx
import { redirect } from 'next/navigation'

type PageProps = {
  params: Promise<{ year: string }>
}

export default async function ArchiveSummitRootPage({ params }: PageProps) {
  const { year } = await params
  redirect(`/summit/${year}/start-here`)
}
```

**Step 3: Create archive start-here**

```typescript
// src/app/summit/[year]/start-here/page.tsx
import { client } from '@/sanity/lib/client'
import { PortableText } from '@portabletext/react'
import { SUMMIT_BY_YEAR_QUERY, type Summit } from '@/sanity/lib/summit'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

type PageProps = { params: Promise<{ year: string }> }

export default async function ArchiveStartHerePage({ params }: PageProps) {
  const { year } = await params
  const summit = await client.fetch<Summit | null>(SUMMIT_BY_YEAR_QUERY, {
    year: parseInt(year, 10),
  })
  if (!summit) notFound()

  // Archives show free content (summit is over)
  const content = summit.welcomeContentFree

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-4xl font-bold text-(--color-primary) mb-8">
        {summit.title} {summit.year}
      </h1>
      {content && content.length > 0 ? (
        <div className="prose prose-lg max-w-none text-(--color-primary)">
          <PortableText value={content} />
        </div>
      ) : (
        <p className="text-(--color-primary)/70">Welcome content not available.</p>
      )}
    </div>
  )
}
```

**Step 4: Create archive schedule**

```typescript
// src/app/summit/[year]/schedule/page.tsx
import { client } from '@/sanity/lib/client'
import { urlForImage } from '@/sanity/lib/image'
import Image from 'next/image'
import Link from 'next/link'
import {
  SUMMIT_BY_YEAR_QUERY,
  SUMMIT_PRESENTATIONS_QUERY,
  groupPresentationsByDay,
  type Summit,
  type SummitPresentation,
} from '@/sanity/lib/summit'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

type PageProps = { params: Promise<{ year: string }> }

export default async function ArchiveSchedulePage({ params }: PageProps) {
  const { year } = await params
  const summit = await client.fetch<Summit | null>(SUMMIT_BY_YEAR_QUERY, {
    year: parseInt(year, 10),
  })
  if (!summit) notFound()

  const presentations = await client.fetch<SummitPresentation[]>(
    SUMMIT_PRESENTATIONS_QUERY,
    { summitId: summit._id }
  )
  const grouped = groupPresentationsByDay(presentations)
  const sortedDays = Array.from(grouped.keys()).sort((a, b) => a - b)

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold text-(--color-primary) mb-8">Schedule</h1>
      {sortedDays.length === 0 ? (
        <p className="text-(--color-primary)/70">No presentations found.</p>
      ) : (
        <div className="space-y-12">
          {sortedDays.map((day) => (
            <section key={day}>
              <h2 className="text-2xl font-bold text-(--color-primary) mb-6 pb-2 border-b-2 border-(--color-roti)">
                Day {day}
              </h2>
              <div className="space-y-4">
                {grouped.get(day)!.map((p) => (
                  <Link
                    key={p._id}
                    href={`/summit/${year}/presentations/${p.slug.current}`}
                    className="block bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-(--color-gallery)"
                  >
                    <div className="flex items-start gap-4">
                      {p.speaker?.headshot && (
                        <Image
                          src={urlForImage(p.speaker.headshot).width(80).height(80).url()}
                          alt={p.speaker.name}
                          width={80}
                          height={80}
                          className="rounded-full object-cover shrink-0"
                          unoptimized
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-(--color-primary)">{p.title}</h3>
                        <p className="text-sm text-(--color-primary)/70 mt-1">{p.speaker?.name}</p>
                        {p.timeSlot && (
                          <p className="text-sm text-(--color-roti) font-medium mt-1">{p.timeSlot}</p>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
```

**Step 5: Create archive speakers**

```typescript
// src/app/summit/[year]/speakers/page.tsx
import { client } from '@/sanity/lib/client'
import { urlForImage } from '@/sanity/lib/image'
import Image from 'next/image'
import {
  SUMMIT_BY_YEAR_QUERY,
  SUMMIT_PRESENTATIONS_QUERY,
  getUniqueSpeakers,
  type Summit,
  type SummitPresentation,
} from '@/sanity/lib/summit'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

type PageProps = { params: Promise<{ year: string }> }

export default async function ArchiveSpeakersPage({ params }: PageProps) {
  const { year } = await params
  const summit = await client.fetch<Summit | null>(SUMMIT_BY_YEAR_QUERY, {
    year: parseInt(year, 10),
  })
  if (!summit) notFound()

  const presentations = await client.fetch<SummitPresentation[]>(
    SUMMIT_PRESENTATIONS_QUERY,
    { summitId: summit._id }
  )
  const speakers = getUniqueSpeakers(presentations)

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <h1 className="text-4xl font-bold text-(--color-primary) mb-8">Speakers</h1>
      {speakers.length === 0 ? (
        <p className="text-(--color-primary)/70">No speakers found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {speakers.map((speaker) => (
            <div key={speaker._id} className="bg-white rounded-2xl p-6 shadow-sm border border-(--color-gallery) text-center">
              {speaker.headshot ? (
                <Image
                  src={urlForImage(speaker.headshot).width(200).height(200).url()}
                  alt={speaker.name}
                  width={200}
                  height={200}
                  className="rounded-full mx-auto mb-4 object-cover w-32 h-32"
                  unoptimized
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-(--color-gallery) mx-auto mb-4 flex items-center justify-center text-3xl text-(--color-primary)/30">🎤</div>
              )}
              <h3 className="text-lg font-bold text-(--color-primary)">{speaker.name}</h3>
              {speaker.bio && <p className="text-sm text-(--color-primary)/70 mt-2 line-clamp-3">{speaker.bio}</p>}
              <div className="flex justify-center gap-3 mt-4">
                {speaker.websiteUrl && (
                  <a href={speaker.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-(--color-roti) hover:opacity-80 text-sm font-medium">Website</a>
                )}
                {speaker.socialLinks?.map((link) => (
                  <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="text-(--color-roti) hover:opacity-80 text-sm font-medium capitalize">{link.platform}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
```

**Step 6: Create archive presentation (no gating)**

```typescript
// src/app/summit/[year]/presentations/[slug]/page.tsx
import { client } from '@/sanity/lib/client'
import {
  SUMMIT_BY_YEAR_QUERY,
  SUMMIT_PRESENTATION_BY_SLUG_QUERY,
  type Summit,
  type SummitPresentation,
} from '@/sanity/lib/summit'
import { urlForImage } from '@/sanity/lib/image'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

type PageProps = { params: Promise<{ year: string; slug: string }> }

export default async function ArchivePresentationPage({ params }: PageProps) {
  const { year, slug } = await params
  const summit = await client.fetch<Summit | null>(SUMMIT_BY_YEAR_QUERY, {
    year: parseInt(year, 10),
  })
  if (!summit) notFound()

  const presentation = await client.fetch<SummitPresentation | null>(
    SUMMIT_PRESENTATION_BY_SLUG_QUERY,
    { summitId: summit._id, slug }
  )
  if (!presentation) notFound()

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Link href={`/summit/${year}/schedule`} className="text-(--color-roti) hover:opacity-80 text-sm font-medium mb-6 inline-block">
        ← Back to Schedule
      </Link>

      <div className="flex items-start gap-6 mb-8">
        {presentation.speaker?.headshot && (
          <Image
            src={urlForImage(presentation.speaker.headshot).width(120).height(120).url()}
            alt={presentation.speaker.name}
            width={120}
            height={120}
            className="rounded-full object-cover shrink-0 hidden sm:block"
            unoptimized
          />
        )}
        <div>
          <h1 className="text-3xl font-bold text-(--color-primary)">{presentation.title}</h1>
          <p className="text-lg text-(--color-primary)/70 mt-2">{presentation.speaker?.name}</p>
          {presentation.dayNumber && (
            <p className="text-sm text-(--color-roti) font-medium mt-1">
              Day {presentation.dayNumber}{presentation.timeSlot ? ` — ${presentation.timeSlot}` : ''}
            </p>
          )}
        </div>
      </div>

      {/* No gating for archives — show video if available */}
      {presentation.videoUrl && (
        <div className="aspect-video mb-8 rounded-xl overflow-hidden bg-black">
          <iframe
            src={presentation.videoUrl}
            title={presentation.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      )}

      {presentation.description && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-(--color-primary) mb-3">About This Presentation</h2>
          <p className="text-(--color-primary)/80 whitespace-pre-line">{presentation.description}</p>
        </div>
      )}

      {presentation.resources && presentation.resources.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-(--color-primary) mb-3">Resources</h2>
          <ul className="space-y-2">
            {presentation.resources.map((r, i) => {
              const href = r.url || r.file?.asset?.url
              return (
                <li key={i}>
                  {href ? (
                    <a href={href} target="_blank" rel="noopener noreferrer" className="text-(--color-roti) hover:opacity-80 font-medium">{r.title}</a>
                  ) : (
                    <span className="text-(--color-primary)/70">{r.title}</span>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}
```

**Step 7: Create archive yoga classes**

```typescript
// src/app/summit/[year]/yoga-classes/page.tsx
import { client } from '@/sanity/lib/client'
import {
  SUMMIT_BY_YEAR_QUERY,
  SUMMIT_YOGA_CLASSES_QUERY,
  type Summit,
  type SummitYogaClass,
} from '@/sanity/lib/summit'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

type PageProps = { params: Promise<{ year: string }> }

export default async function ArchiveYogaClassesPage({ params }: PageProps) {
  const { year } = await params
  const summit = await client.fetch<Summit | null>(SUMMIT_BY_YEAR_QUERY, {
    year: parseInt(year, 10),
  })
  if (!summit) notFound()

  const yogaClasses = await client.fetch<SummitYogaClass[]>(
    SUMMIT_YOGA_CLASSES_QUERY,
    { summitId: summit._id }
  )

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold text-(--color-primary) mb-8">Yoga Classes</h1>
      {yogaClasses.length === 0 ? (
        <p className="text-(--color-primary)/70">No yoga classes found.</p>
      ) : (
        <div className="space-y-8">
          {yogaClasses.map((yc) => (
            <div key={yc._id} className="bg-white rounded-xl p-6 shadow-sm border border-(--color-gallery)">
              <h3 className="text-xl font-bold text-(--color-primary)">{yc.title}</h3>
              {yc.instructor && <p className="text-sm text-(--color-primary)/70 mt-1">with {yc.instructor}</p>}
              {yc.description && <p className="text-(--color-primary)/80 mt-3">{yc.description}</p>}
              {yc.videoUrl && (
                <div className="aspect-video mt-4 rounded-lg overflow-hidden bg-black">
                  <iframe src={yc.videoUrl} title={yc.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
```

**Step 8: Create archive contact**

```typescript
// src/app/summit/[year]/contact/page.tsx
import { client } from '@/sanity/lib/client'
import { SUMMIT_BY_YEAR_QUERY, type Summit } from '@/sanity/lib/summit'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

type PageProps = { params: Promise<{ year: string }> }

export default async function ArchiveContactPage({ params }: PageProps) {
  const { year } = await params
  const summit = await client.fetch<Summit | null>(SUMMIT_BY_YEAR_QUERY, {
    year: parseInt(year, 10),
  })
  if (!summit) notFound()

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-4xl font-bold text-(--color-primary) mb-8">Contact</h1>
      {summit.contactEmail && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-(--color-gallery) mb-12">
          <h2 className="text-xl font-bold text-(--color-primary) mb-3">Get in Touch</h2>
          <p className="text-(--color-primary)/80">
            Have questions? Reach out at{' '}
            <a href={`mailto:${summit.contactEmail}`} className="text-(--color-roti) hover:opacity-80 font-medium">
              {summit.contactEmail}
            </a>
          </p>
        </div>
      )}
      {summit.faqItems && summit.faqItems.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-(--color-primary) mb-6">FAQ</h2>
          <div className="space-y-4">
            {summit.faqItems.map((faq, i) => (
              <details key={i} className="bg-white rounded-xl p-6 shadow-sm border border-(--color-gallery) group">
                <summary className="font-bold text-(--color-primary) cursor-pointer list-none flex items-center justify-between">
                  {faq.question}
                  <span className="text-(--color-roti) group-open:rotate-180 transition-transform ml-4">▼</span>
                </summary>
                <p className="text-(--color-primary)/80 mt-4 whitespace-pre-line">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
```

**Step 9: Verify build**

Run: `npm run build`
Expected: Build succeeds with all archive routes.

**Step 10: Commit**

```bash
git add src/app/summit/\[year\]/
git commit -m "feat(summit): add archive routes for past summit years"
```

---

## Task 18: Final Build Verification & Summary Commit

**Step 1: Full build**

Run: `npm run build`
Expected: Build succeeds with zero errors.

**Step 2: Verify all routes exist**

Expected routes in build output:
```
/summit                              (redirect)
/summit/start-here                   (dynamic)
/summit/schedule                     (dynamic)
/summit/speakers                     (dynamic)
/summit/presentations/[slug]         (dynamic)
/summit/yoga-classes                 (dynamic)
/summit/all-access                   (dynamic)
/summit/contact                      (dynamic)
/summit/[year]                       (redirect)
/summit/[year]/start-here            (dynamic)
/summit/[year]/schedule              (dynamic)
/summit/[year]/speakers              (dynamic)
/summit/[year]/presentations/[slug]  (dynamic)
/summit/[year]/yoga-classes          (dynamic)
/summit/[year]/contact               (dynamic)
```

**Step 3: Review file list**

Run: `git diff --stat main`

Expected ~25 new files, 1 modified file (`src/sanity/schemaTypes/index.ts`).

---

## File Summary

| # | Action | Path |
|---|--------|------|
| 1 | Create | `src/sanity/schemaTypes/summitSpeaker.ts` |
| 2 | Create | `src/sanity/schemaTypes/summit.ts` |
| 3 | Create | `src/sanity/schemaTypes/summitPresentation.ts` |
| 4 | Create | `src/sanity/schemaTypes/summitYogaClass.ts` |
| 5 | Modify | `src/sanity/schemaTypes/index.ts` |
| 6 | Create | `src/sanity/lib/summit.ts` |
| 7 | Create | `src/components/summit/SummitNav.tsx` |
| 8 | Create | `src/components/summit/UpgradeCTA.tsx` |
| 9 | Create | `src/app/summit/page.tsx` |
| 10 | Create | `src/app/summit/(current)/layout.tsx` |
| 11 | Create | `src/app/summit/(current)/start-here/page.tsx` |
| 12 | Create | `src/app/summit/(current)/schedule/page.tsx` |
| 13 | Create | `src/app/summit/(current)/speakers/page.tsx` |
| 14 | Create | `src/app/summit/(current)/presentations/[slug]/page.tsx` |
| 15 | Create | `src/app/summit/(current)/yoga-classes/page.tsx` |
| 16 | Create | `src/app/summit/(current)/all-access/page.tsx` |
| 17 | Create | `src/app/summit/(current)/contact/page.tsx` |
| 18 | Create | `src/app/summit/[year]/layout.tsx` |
| 19 | Create | `src/app/summit/[year]/page.tsx` |
| 20 | Create | `src/app/summit/[year]/start-here/page.tsx` |
| 21 | Create | `src/app/summit/[year]/schedule/page.tsx` |
| 22 | Create | `src/app/summit/[year]/speakers/page.tsx` |
| 23 | Create | `src/app/summit/[year]/presentations/[slug]/page.tsx` |
| 24 | Create | `src/app/summit/[year]/yoga-classes/page.tsx` |
| 25 | Create | `src/app/summit/[year]/contact/page.tsx` |
