# Summit Rich Text & Visual Styling - Design Document

**Date:** 2026-03-09
**Status:** Approved
**Branch:** `main` (or new feature branch TBD)

## Goal

Give the client full visual control over summit pages: rich text editing for content fields, customizable button styles, section background colors, section padding, and consistent fonts. Fix the broken page builder section style selector. Deliver a handoff guide for self-service code changes using Google Antigravity IDE.

## Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Section bg colors | Brand color dropdown (7 colors) | Keeps brand consistency, simple UX |
| Button styling | Summit-level presets + per-button overrides | Set-and-forget defaults with targeted flexibility |
| Button sizes | XS through 2XL (6 options) | Granular control as requested |
| Rich text editor | Full (bold, italic, links, lists, headings, images, blockquotes) | Client wants maximum flexibility |
| Section padding | Presets + custom override | 5 presets cover common cases, custom for edge cases |
| Section scope | Content sections + CTA components; nav/footer stay brand-locked | Prevents accidental nav/footer breakage |
| Labels | Stay as strings | Rich text is overkill for 2-3 word labels |
| Handoff tool | Google Antigravity IDE | Free, VS Code-based, built-in AI agents |

## Brand Color Palette (Dropdown Options)

| Name | Hex |
|------|-----|
| Purple | `#413356` |
| Gold | `#C7A254` |
| Cream | `#F6EDC8` |
| Gray | `#ECECEC` |
| Bronze | `#553F0F` |
| White | `#FFFFFF` |
| Black | `#000000` |

## Schema Changes

### 1. Summit Document - `styles` Object

New field group "Styles" on the summit schema:

```
styles: {
  // Button Presets
  buttonPrimary: { bgColor, textColor, size }
  buttonSecondary: { bgColor, textColor, size }

  // Section Defaults
  defaultSectionBg: brand color dropdown
  defaultSectionPadding: preset (none/tight/normal/loose/extra-loose)
  defaultSectionPaddingCustom: string (e.g. "80px", "5rem")

  // Per-Page Background Overrides
  scheduleBg: brand color dropdown
  contactBg: brand color dropdown
  startHereBg: brand color dropdown
  allAccessBg: brand color dropdown
  communityBg: brand color dropdown
  yogaClassesBg: brand color dropdown
  speakersBg: brand color dropdown
}
```

All fields optional. Frontend falls back through: per-page -> default -> hardcoded.

### 2. Content Fields to Rich Text (Portable Text)

Convert from `text` to `array` of `[block, image, blockquote]`:

- `summit.description`
- `summit.faqItems[].answer`
- `summitSpeaker.bio`
- `summitPresentation.description`
- `summitYogaClass.description`

Rich text blocks include: bold, italic, links, bullet/numbered lists, headings (h2-h4), images with alt text, blockquotes.

### 3. Per-Button Override Fields

Added to any schema location that renders a button (CTA labels, nav cards, etc.):

- `buttonBgColor`: brand color dropdown (optional)
- `buttonTextColor`: brand color dropdown (optional)
- `buttonSize`: xs/sm/base/lg/xl/2xl (optional)

### 4. Per-Section Override Fields

Added to CTA components (UpgradeCTA, navigation cards):

- `sectionBgColor`: brand color dropdown (optional)
- `sectionPadding`: preset dropdown (optional)
- `sectionPaddingCustom`: string (optional)

## Frontend Changes

### Button Component

New `SummitButton` component with 3-level fallback:

```
per-button override -> summit preset -> hardcoded fallback
```

Size mapping:

| Value | Tailwind Classes |
|-------|-----------------|
| xs | `px-3 py-1.5 text-xs` |
| sm | `px-4 py-2 text-sm` |
| base | `px-6 py-3 text-base` |
| lg | `px-8 py-4 text-lg` |
| xl | `px-10 py-5 text-xl` |
| 2xl | `px-12 py-6 text-2xl` |

**Hide rule:** If a button has no link/URL, don't render it.

### Section Styling

Padding presets:

| Value | CSS |
|-------|-----|
| none | `py-0` |
| tight | `py-6 md:py-8` |
| normal | `py-12 md:py-16` |
| loose | `py-20 md:py-28` |
| extra-loose | `py-28 md:py-36` |
| custom | Use string value directly |

Resolution order: `per-section override -> per-page override -> summit default -> hardcoded fallback`

### Rich Text Rendering

Wrap converted fields in `<PortableText value={field} />` inside a `prose` container. Backwards-compatible: if field is still a plain string, render as `<p>`.

### Font Consistency

Audit all summit components. Normalize to `var(--font-body)` for body text, `var(--font-heading)` for headings. Remove inline font overrides.

### Fix Page Builder Section Styles

The existing `sectionSpacing` / `sectionBackground` fields on page builder blocks don't apply visually. Rewire `BlockRenderer` to use the same section styling system.

## Deliverables

1. Schema changes (summit, summitSpeaker, summitPresentation, summitYogaClass)
2. Frontend: SummitButton component, section styling helpers, PortableText integration
3. Fix broken page builder section style selector
4. Font audit and normalization
5. Client handoff guide (`docs/client-handoff-guide.md`)
