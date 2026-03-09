# Summit Rich Text & Visual Styling Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Give the client full visual control over summit pages: rich text editing, customizable buttons (color, size, text color), section backgrounds from brand palette, section padding (presets + custom), font consistency, and fix the broken page builder section style selector.

**Architecture:** Add a `styles` object to the Summit schema with button presets and section defaults. Convert 5 content fields to Portable Text. Create shared helpers for brand colors, button sizing, and section styling. Update all summit frontend pages to resolve styles through a 3-level fallback chain. Deliver a client handoff guide for self-service changes.

**Tech Stack:** Sanity v5, Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, `@portabletext/react`

---

### Task 1: Create Shared Schema Helpers

**Files:**
- Create: `src/sanity/schemaTypes/shared/brandColorField.ts`
- Create: `src/sanity/schemaTypes/shared/buttonFields.ts`
- Create: `src/sanity/schemaTypes/shared/sectionStyleFields.ts`

**Step 1: Create brand color dropdown helper**

```ts
// src/sanity/schemaTypes/shared/brandColorField.ts
import { defineField } from 'sanity'

export const BRAND_COLORS = [
  { title: 'Purple', value: '#413356' },
  { title: 'Gold', value: '#C7A254' },
  { title: 'Cream', value: '#F6EDC8' },
  { title: 'Gray', value: '#ECECEC' },
  { title: 'Bronze', value: '#553F0F' },
  { title: 'White', value: '#FFFFFF' },
  { title: 'Black', value: '#000000' },
]

export function brandColorField(name: string, title: string) {
  return defineField({
    name,
    title,
    type: 'string',
    options: {
      list: BRAND_COLORS,
    },
  })
}
```

**Step 2: Create button override fields helper**

```ts
// src/sanity/schemaTypes/shared/buttonFields.ts
import { defineField } from 'sanity'
import { BRAND_COLORS } from './brandColorField'

const BUTTON_SIZES = [
  { title: 'Extra Small', value: 'xs' },
  { title: 'Small', value: 'sm' },
  { title: 'Base', value: 'base' },
  { title: 'Large', value: 'lg' },
  { title: 'Extra Large', value: 'xl' },
  { title: '2X Large', value: '2xl' },
]

/** Fields for a button preset (used at summit level) */
export function buttonPresetFields(prefix: string, title: string) {
  return defineField({
    name: prefix,
    title,
    type: 'object',
    fields: [
      defineField({
        name: 'bgColor',
        title: 'Background Color',
        type: 'string',
        options: { list: BRAND_COLORS },
      }),
      defineField({
        name: 'textColor',
        title: 'Text Color',
        type: 'string',
        options: { list: BRAND_COLORS },
      }),
      defineField({
        name: 'size',
        title: 'Size',
        type: 'string',
        options: { list: BUTTON_SIZES },
      }),
    ],
  })
}

/** Fields for per-button overrides (used on individual components) */
export function buttonOverrideFields() {
  return [
    defineField({
      name: 'buttonBgColor',
      title: 'Button Background Color (Override)',
      type: 'string',
      options: { list: BRAND_COLORS },
      description: 'Overrides the summit-level button preset.',
    }),
    defineField({
      name: 'buttonTextColor',
      title: 'Button Text Color (Override)',
      type: 'string',
      options: { list: BRAND_COLORS },
      description: 'Overrides the summit-level button preset.',
    }),
    defineField({
      name: 'buttonSize',
      title: 'Button Size (Override)',
      type: 'string',
      options: { list: BUTTON_SIZES },
      description: 'Overrides the summit-level button preset.',
    }),
  ]
}
```

**Step 3: Create section style fields helper**

```ts
// src/sanity/schemaTypes/shared/sectionStyleFields.ts
import { defineField } from 'sanity'
import { BRAND_COLORS } from './brandColorField'

const PADDING_PRESETS = [
  { title: 'None', value: 'none' },
  { title: 'Tight', value: 'tight' },
  { title: 'Normal', value: 'normal' },
  { title: 'Loose', value: 'loose' },
  { title: 'Extra Loose', value: 'extra-loose' },
]

export function sectionStyleFields() {
  return [
    defineField({
      name: 'sectionBgColor',
      title: 'Section Background Color',
      type: 'string',
      options: { list: BRAND_COLORS },
    }),
    defineField({
      name: 'sectionPadding',
      title: 'Section Padding',
      type: 'string',
      options: { list: PADDING_PRESETS },
    }),
    defineField({
      name: 'sectionPaddingCustom',
      title: 'Custom Padding (overrides preset)',
      type: 'string',
      description: 'CSS value, e.g. "80px", "5rem". Applied as top and bottom padding.',
    }),
  ]
}
```

**Step 4: Commit**

```bash
git add src/sanity/schemaTypes/shared/
git commit -m "feat: add shared schema helpers for brand colors, buttons, and section styles"
```

---

### Task 2: Add Styles Object and Rich Text to Summit Schema

**Files:**
- Modify: `src/sanity/schemaTypes/summit.ts`

**Step 1: Add styles field group and styles object**

Add a new group `{ name: 'styles', title: 'Styles' }` to the groups array.

Add these fields to the summit schema:

```ts
// At the top, import helpers
import { brandColorField } from './shared/brandColorField'
import { buttonPresetFields } from './shared/buttonFields'
import { sectionStyleFields } from './shared/sectionStyleFields'

// Add to groups array:
{ name: 'styles', title: 'Styles' },

// Add styles object field:
defineField({
  name: 'styles',
  title: 'Visual Styles',
  type: 'object',
  group: 'styles',
  fields: [
    // Button Presets
    buttonPresetFields('buttonPrimary', 'Primary Button Style'),
    buttonPresetFields('buttonSecondary', 'Secondary Button Style'),

    // Section Defaults
    brandColorField('defaultSectionBg', 'Default Section Background'),
    defineField({
      name: 'defaultSectionPadding',
      title: 'Default Section Padding',
      type: 'string',
      options: {
        list: [
          { title: 'None', value: 'none' },
          { title: 'Tight', value: 'tight' },
          { title: 'Normal', value: 'normal' },
          { title: 'Loose', value: 'loose' },
          { title: 'Extra Loose', value: 'extra-loose' },
        ],
      },
    }),
    defineField({
      name: 'defaultSectionPaddingCustom',
      title: 'Default Custom Padding',
      type: 'string',
      description: 'CSS value, e.g. "80px". Overrides the preset above.',
    }),

    // Per-Page Background Overrides
    brandColorField('scheduleBg', 'Schedule Page Background'),
    brandColorField('contactBg', 'Contact Page Background'),
    brandColorField('startHereBg', 'Start Here Page Background'),
    brandColorField('allAccessBg', 'All Access Page Background'),
    brandColorField('communityBg', 'Community Page Background'),
    brandColorField('yogaClassesBg', 'Yoga Classes Page Background'),
    brandColorField('speakersBg', 'Speakers Page Background'),
  ],
}),
```

**Step 2: Convert `faqItems[].answer` to rich text**

Change the `answer` field inside `faqItems` from:
```ts
defineField({
  name: 'answer',
  title: 'Answer',
  type: 'text',
  rows: 4,
  validation: (Rule) => Rule.required(),
}),
```

To:
```ts
defineField({
  name: 'answer',
  title: 'Answer',
  type: 'array',
  of: [
    { type: 'block' },
    {
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
      ],
    },
    { type: 'blockquote' },
  ],
  validation: (Rule) => Rule.required(),
}),
```

**Step 3: Convert `description` to rich text**

Change summit `description` from `type: 'text'` to rich text array (same pattern as answer above, but without required validation).

**Step 4: Commit**

```bash
git add src/sanity/schemaTypes/summit.ts
git commit -m "feat: add styles object and convert text fields to rich text on summit schema"
```

---

### Task 3: Convert Content Fields on Speaker, Presentation, and Yoga Class Schemas

**Files:**
- Modify: `src/sanity/schemaTypes/summitSpeaker.ts`
- Modify: `src/sanity/schemaTypes/summitPresentation.ts`
- Modify: `src/sanity/schemaTypes/summitYogaClass.ts`

**Step 1: Convert `summitSpeaker.bio` from `text` to rich text array**

Replace `type: 'text', rows: 5` with:
```ts
type: 'array',
of: [
  { type: 'block' },
  {
    type: 'image',
    options: { hotspot: true },
    fields: [
      defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
    ],
  },
  { type: 'blockquote' },
],
```

**Step 2: Convert `summitPresentation.description` from `text` to same rich text array**

Same pattern as Step 1.

**Step 3: Add button override fields to `summitPresentation`**

Import and spread `buttonOverrideFields()` into the fields array. These let the client override button styling on individual presentation pages.

**Step 4: Convert `summitYogaClass.description` from `text` to same rich text array**

Same pattern as Step 1.

**Step 5: Commit**

```bash
git add src/sanity/schemaTypes/summitSpeaker.ts src/sanity/schemaTypes/summitPresentation.ts src/sanity/schemaTypes/summitYogaClass.ts
git commit -m "feat: convert speaker, presentation, yoga class descriptions to rich text"
```

---

### Task 4: Update Summit TypeScript Types and GROQ Queries

**Files:**
- Modify: `src/sanity/lib/summit.ts`

**Step 1: Add style types**

```ts
export interface SummitButtonPreset {
  bgColor?: string
  textColor?: string
  size?: string
}

export interface SummitStyles {
  buttonPrimary?: SummitButtonPreset
  buttonSecondary?: SummitButtonPreset
  defaultSectionBg?: string
  defaultSectionPadding?: string
  defaultSectionPaddingCustom?: string
  scheduleBg?: string
  contactBg?: string
  startHereBg?: string
  allAccessBg?: string
  communityBg?: string
  yogaClassesBg?: string
  speakersBg?: string
}
```

**Step 2: Add `styles?: SummitStyles` to the `Summit` interface**

**Step 3: Change `bio` type on `SummitSpeaker` from `string` to `any[]` (Portable Text)**

**Step 4: Change `description` type on `SummitPresentation` from `string` to `any[]`**

Add `buttonBgColor?: string`, `buttonTextColor?: string`, `buttonSize?: string` to `SummitPresentation`.

**Step 5: Change `description` type on `SummitYogaClass` from `string` to `any[]`**

**Step 6: Change `answer` type on `SummitFaqItem` from `string` to `any[]`**

**Step 7: Commit**

```bash
git add src/sanity/lib/summit.ts
git commit -m "feat: update summit types and queries for rich text and styles"
```

---

### Task 5: Create Frontend Style Helpers

**Files:**
- Create: `src/lib/summit-styles.ts`

**Step 1: Create the helpers file**

```ts
// src/lib/summit-styles.ts
import type { SummitButtonPreset, SummitStyles } from '@/sanity/lib/summit'

// ---------- Button Sizing ----------

const BUTTON_SIZE_CLASSES: Record<string, string> = {
  xs: 'px-3 py-1.5 text-xs',
  sm: 'px-4 py-2 text-sm',
  base: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
  xl: 'px-10 py-5 text-xl',
  '2xl': 'px-12 py-6 text-2xl',
}

interface ButtonStyleOptions {
  overrideBgColor?: string
  overrideTextColor?: string
  overrideSize?: string
  preset?: SummitButtonPreset
}

const FALLBACK_BUTTON = {
  bgColor: '#C7A254',
  textColor: '#FFFFFF',
  size: 'base',
}

export function getButtonStyles(options: ButtonStyleOptions = {}): {
  className: string
  style: React.CSSProperties
} {
  const bgColor =
    options.overrideBgColor ||
    options.preset?.bgColor ||
    FALLBACK_BUTTON.bgColor
  const textColor =
    options.overrideTextColor ||
    options.preset?.textColor ||
    FALLBACK_BUTTON.textColor
  const size =
    options.overrideSize ||
    options.preset?.size ||
    FALLBACK_BUTTON.size

  const sizeClass = BUTTON_SIZE_CLASSES[size] || BUTTON_SIZE_CLASSES.base

  return {
    className: `inline-flex items-center justify-center rounded-full font-bold uppercase tracking-wide hover:opacity-90 transition-opacity shadow-md ${sizeClass}`,
    style: {
      backgroundColor: bgColor,
      color: textColor,
    },
  }
}

// ---------- Section Styling ----------

const PADDING_PRESET_CLASSES: Record<string, string> = {
  none: 'py-0',
  tight: 'py-6 md:py-8',
  normal: 'py-12 md:py-16',
  loose: 'py-20 md:py-28',
  'extra-loose': 'py-28 md:py-36',
}

interface SectionStyleOptions {
  /** Per-section override bg color */
  overrideBgColor?: string
  /** Per-section override padding preset */
  overridePadding?: string
  /** Per-section override custom padding */
  overridePaddingCustom?: string
  /** Summit-level styles */
  summitStyles?: SummitStyles
  /** Page key for per-page bg lookup (e.g. 'scheduleBg') */
  pageKey?: keyof SummitStyles
  /** Hardcoded fallback bg color */
  fallbackBgColor?: string
  /** Hardcoded fallback padding preset */
  fallbackPadding?: string
}

export function getSectionStyles(options: SectionStyleOptions = {}): {
  className: string
  style: React.CSSProperties
} {
  const {
    overrideBgColor,
    overridePadding,
    overridePaddingCustom,
    summitStyles,
    pageKey,
    fallbackBgColor,
    fallbackPadding = 'normal',
  } = options

  // Background: per-section -> per-page -> summit default -> fallback
  const bgColor =
    overrideBgColor ||
    (pageKey && summitStyles?.[pageKey] as string | undefined) ||
    summitStyles?.defaultSectionBg ||
    fallbackBgColor ||
    undefined

  // Padding: per-section custom -> per-section preset -> summit custom -> summit preset -> fallback
  const paddingCustom =
    overridePaddingCustom ||
    summitStyles?.defaultSectionPaddingCustom ||
    undefined

  const paddingPreset =
    overridePadding ||
    summitStyles?.defaultSectionPadding ||
    fallbackPadding

  const paddingClass = paddingCustom
    ? ''
    : PADDING_PRESET_CLASSES[paddingPreset] || PADDING_PRESET_CLASSES.normal

  const style: React.CSSProperties = {}
  if (bgColor) style.backgroundColor = bgColor
  if (paddingCustom) {
    style.paddingTop = paddingCustom
    style.paddingBottom = paddingCustom
  }

  return {
    className: paddingClass,
    style,
  }
}
```

**Step 2: Commit**

```bash
git add src/lib/summit-styles.ts
git commit -m "feat: add frontend style helpers for summit buttons and sections"
```

---

### Task 6: Create SummitButton Component

**Files:**
- Create: `src/components/summit/SummitButton.tsx`

**Step 1: Create the component**

```tsx
// src/components/summit/SummitButton.tsx
import Link from 'next/link'
import { getButtonStyles } from '@/lib/summit-styles'
import type { SummitButtonPreset } from '@/sanity/lib/summit'

interface SummitButtonProps {
  label: string
  href?: string
  external?: boolean
  preset?: SummitButtonPreset
  overrideBgColor?: string
  overrideTextColor?: string
  overrideSize?: string
}

export default function SummitButton({
  label,
  href,
  external,
  preset,
  overrideBgColor,
  overrideTextColor,
  overrideSize,
}: SummitButtonProps) {
  // Hide if no link
  if (!href) return null

  const { className, style } = getButtonStyles({
    overrideBgColor,
    overrideTextColor,
    overrideSize,
    preset,
  })

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        style={style}
      >
        {label}
      </a>
    )
  }

  return (
    <Link href={href} className={className} style={style}>
      {label}
    </Link>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/summit/SummitButton.tsx
git commit -m "feat: add SummitButton component with 3-level style fallback"
```

---

### Task 7: Create PortableTextOrString Helper

**Files:**
- Create: `src/components/summit/PortableTextOrString.tsx`

**Step 1: Create the component**

This handles backwards compatibility when a field may contain either a plain string (old data) or a Portable Text array (new data).

```tsx
// src/components/summit/PortableTextOrString.tsx
import { PortableText } from '@portabletext/react'

interface PortableTextOrStringProps {
  value: any
  className?: string
}

export default function PortableTextOrString({
  value,
  className = 'prose prose-lg max-w-none',
}: PortableTextOrStringProps) {
  if (!value) return null

  // Plain string fallback (old data)
  if (typeof value === 'string') {
    return <p className={className}>{value}</p>
  }

  // Portable Text array
  if (Array.isArray(value) && value.length > 0) {
    return (
      <div className={className}>
        <PortableText value={value} />
      </div>
    )
  }

  return null
}
```

**Step 2: Commit**

```bash
git add src/components/summit/PortableTextOrString.tsx
git commit -m "feat: add PortableTextOrString helper for backwards-compatible rich text"
```

---

### Task 8: Update Summit Layout to Pass Styles

**Files:**
- Modify: `src/app/summit/(current)/layout.tsx`
- Modify: `src/app/summit/[year]/layout.tsx`

**Step 1: Pass summit styles to children via React context or props**

Since summit pages fetch the summit independently, the simplest approach is to ensure the GROQ query already fetches `styles`. The `CURRENT_SUMMIT_QUERY` is `*[_type == "summit" && isCurrent == true][0]` which returns the full document including the new `styles` field. No query change needed.

Each page already fetches the summit and has access to `summit.styles`. No layout changes required for data flow.

**Step 2: Verify archive layout follows same pattern**

Check `src/app/summit/[year]/layout.tsx` uses `SUMMIT_BY_YEAR_QUERY` which also returns the full document. Same approach works.

**Step 3: Commit (if any changes needed)**

```bash
git commit -m "feat: verify summit layouts pass styles data"
```

---

### Task 9: Update All Current Summit Pages

**Files:**
- Modify: `src/app/summit/(current)/schedule/page.tsx`
- Modify: `src/app/summit/(current)/contact/page.tsx`
- Modify: `src/app/summit/(current)/start-here/page.tsx`
- Modify: `src/app/summit/(current)/all-access/page.tsx`
- Modify: `src/app/summit/(current)/community/page.tsx`
- Modify: `src/app/summit/(current)/yoga-classes/page.tsx`
- Modify: `src/app/summit/(current)/speakers/page.tsx`
- Modify: `src/app/summit/(current)/presentations/[slug]/page.tsx`

For each page, apply these changes:

**A. Wrap the main `<section>` with section styles:**

```tsx
import { getSectionStyles } from '@/lib/summit-styles'

// In the component:
const sectionStyles = getSectionStyles({
  summitStyles: summit.styles,
  pageKey: 'scheduleBg', // varies per page
  fallbackPadding: 'normal',
})

// Replace:
<section className="py-16 md:py-20">
// With:
<section className={sectionStyles.className} style={sectionStyles.style}>
```

Page key mapping:
- schedule -> `scheduleBg`
- contact -> `contactBg`
- start-here -> `startHereBg`
- all-access -> `allAccessBg`
- community -> `communityBg`
- yoga-classes -> `yogaClassesBg`
- speakers -> `speakersBg`
- presentations/[slug] -> no page key (uses summit default)

**B. Replace hardcoded buttons with SummitButton:**

```tsx
import SummitButton from '@/components/summit/SummitButton'

// Replace inline button/link elements:
<SummitButton
  label={summit.labels?.joinCommunityButton || 'Join the Community'}
  href={summit.communityLink}
  external
  preset={summit.styles?.buttonPrimary}
/>
```

Apply to all buttons: Join Community, Get All Access, View Schedule, All Access Button, etc.

**C. Replace plain text descriptions with PortableTextOrString:**

```tsx
import PortableTextOrString from '@/components/summit/PortableTextOrString'

// For presentation.description, speaker.bio, yoga.description, faq.answer:
<PortableTextOrString
  value={presentation.description}
  className="text-(--color-primary)/80"
/>
```

**D. For contact page FAQ answers specifically:**

```tsx
// Replace:
<p className="text-(--color-primary)/80 mt-4 whitespace-pre-line">
  {faq.answer}
</p>
// With:
<div className="mt-4">
  <PortableTextOrString
    value={faq.answer}
    className="prose prose-lg max-w-none text-(--color-primary)/80"
  />
</div>
```

**Step: Commit after all pages updated**

```bash
git add src/app/summit/\(current\)/
git commit -m "feat: apply section styles, SummitButton, and rich text to all current summit pages"
```

---

### Task 10: Update Archive Summit Pages

**Files:**
- Modify: `src/app/summit/[year]/schedule/page.tsx`
- Modify: `src/app/summit/[year]/contact/page.tsx` (if exists)
- Modify: `src/app/summit/[year]/start-here/page.tsx`
- Modify: `src/app/summit/[year]/yoga-classes/page.tsx`
- Modify: `src/app/summit/[year]/speakers/page.tsx`
- Modify: `src/app/summit/[year]/presentations/[slug]/page.tsx`

Apply the same changes as Task 9 (section styles, SummitButton, PortableTextOrString) to all archive pages.

**Commit:**

```bash
git add src/app/summit/\[year\]/
git commit -m "feat: apply section styles, SummitButton, and rich text to archive summit pages"
```

---

### Task 11: Update UpgradeCTA Component

**Files:**
- Modify: `src/components/summit/UpgradeCTA.tsx`

**Step 1: Add section style and button style props**

```tsx
import { getSectionStyles, getButtonStyles } from '@/lib/summit-styles'
import type { SummitButtonPreset } from '@/sanity/lib/summit'

interface UpgradeCTAProps {
  allAccessSalesUrl?: string
  basePath?: string
  message?: string
  heading?: string
  description?: string
  buttonLabel?: string
  // Style overrides
  sectionBgColor?: string
  sectionPadding?: string
  sectionPaddingCustom?: string
  buttonPreset?: SummitButtonPreset
  buttonBgColor?: string
  buttonTextColor?: string
  buttonSize?: string
}
```

**Step 2: Apply styles**

Replace hardcoded `bg-(--color-sidecar)` and button classes with resolved styles from helpers.

Hide button if no `allAccessSalesUrl` and no `basePath`.

**Step 3: Commit**

```bash
git add src/components/summit/UpgradeCTA.tsx
git commit -m "feat: add style overrides to UpgradeCTA component"
```

---

### Task 12: Fix Page Builder Section Style Selector

**Files:**
- Modify: `src/components/Blocks/BlockRenderer.tsx`

**Step 1: Import section style helper**

```tsx
import { getSectionStyles } from '@/lib/summit-styles'
```

**Step 2: Update `wrapWithSanity` to apply section styles from block data**

Each page builder block has optional `sectionSpacing` (maps to padding preset) and `sectionBackground` (has `type` and `color`/`image` fields). Wire these into `getSectionStyles`:

```tsx
const wrapWithSanity = (component: React.ReactNode) => {
  const sectionStyles = getSectionStyles({
    overrideBgColor: block.sectionBackground?.type === 'color' ? block.sectionBackground.color : undefined,
    overridePadding: block.sectionSpacing || undefined,
  })

  return (
    <div
      key={_key}
      {...sanityAttrs}
      className={sectionStyles.className}
      style={sectionStyles.style}
    >
      {component}
    </div>
  )
}
```

**Step 3: Commit**

```bash
git add src/components/Blocks/BlockRenderer.tsx
git commit -m "fix: wire page builder section style fields to actual CSS output"
```

---

### Task 13: Font Consistency Audit

**Files:**
- Modify: `src/components/summit/SummitNav.tsx` (if needed)
- Modify: `src/components/summit/SummitFooter.tsx` (if needed)
- Modify: `src/components/summit/UpgradeCTA.tsx` (if needed)
- Modify: `src/app/globals.css` (if needed)

**Step 1: Grep for inline font overrides in summit components**

```bash
grep -r "font-family\|fontFamily\|font-sans\|font-serif\|font-mono" src/components/summit/ src/app/summit/
```

**Step 2: Remove any inline font overrides, ensuring all text inherits from `var(--font-body)` set in globals.css**

The root layout already sets `className={dmSans.variable}` and globals.css sets `font-family: var(--font-body)`. Any component-level font overrides should be removed.

**Step 3: Commit**

```bash
git commit -m "fix: normalize fonts across all summit components"
```

---

### Task 14: Fix Sanity Studio CSS Interference

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/components/FooterWrapper.tsx`

**Step 1: Scope global base styles to exclude Sanity Studio**

Replace `body:not(:has(#sanity))` scoping approach (already partially done). Verify all base styles (`* { margin: 0; padding: 0; }`, heading styles, paragraph styles, link styles) are properly scoped.

**Step 2: Hide footer on Studio routes**

Add `if (pathname.startsWith('/studio')) return null;` to FooterWrapper (already done in this session). Verify it works.

**Step 3: Commit**

```bash
git add src/app/globals.css src/components/FooterWrapper.tsx
git commit -m "fix: scope global CSS to avoid breaking Sanity Studio"
```

---

### Task 15: Write Client Handoff Guide

**Files:**
- Create: `docs/client-handoff-guide.md`

**Step 1: Write the guide covering:**

1. **Content Changes (No Code Needed)**
   - Sanity Studio URL and login
   - Editing text, images, rich text fields
   - Using button presets and section color/padding controls
   - Publishing changes

2. **Code Changes with Google Antigravity IDE**
   - Download and install from antigravity.google
   - Clone the repository
   - Open the project in Antigravity
   - How to describe changes to the AI agent
   - Reviewing diffs before committing

3. **Local Development**
   - `npm install` to install dependencies
   - `npm run dev` to preview locally
   - Sanity Studio at `localhost:3000/studio`

4. **Deploying to Production**
   - Create a branch: `git checkout -b my-change`
   - Commit: `git add . && git commit -m "description"`
   - Push: `git push origin my-change`
   - Vercel auto-creates a preview deploy
   - Create a Pull Request on GitHub
   - Merge to `main` for production deploy

5. **Troubleshooting**
   - Build failures: check terminal output
   - Missing content: verify Sanity Studio publish status
   - Rolling back: Vercel dashboard -> Deployments -> Redeploy previous

**Step 2: Commit**

```bash
git add docs/client-handoff-guide.md
git commit -m "docs: add client handoff guide for self-service site management"
```

---

### Task 16: Build Verification and Final Commit

**Step 1: Run TypeScript check**

```bash
npx tsc --noEmit
```

Expected: no errors.

**Step 2: Run production build**

```bash
npm run build
```

Expected: successful build, all pages compile.

**Step 3: Manual verification**

Start local server (`npx next start --port 3005`) and verify:
- Homepage still matches production
- Summit pages render with section styles
- Buttons respect presets
- Rich text fields render with PortableText
- Studio at `/studio` works without CSS interference
- Page builder section styles work

**Step 4: Push and create PR**

```bash
git push origin main
```

Or if working on a feature branch:

```bash
git push origin feature/summit-styling
gh pr create --title "feat: summit rich text, visual styling controls, and client handoff" --body "..."
```
