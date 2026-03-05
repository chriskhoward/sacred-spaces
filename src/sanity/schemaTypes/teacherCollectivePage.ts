import { defineField, defineType } from 'sanity'

export const teacherCollectivePageType = defineType({
  name: 'teacherCollectivePage',
  title: 'Teacher Collective Page',
  icon: () => '🧘',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'sections', title: 'Section Content' },
    { name: 'benefits', title: 'Benefits & Pricing' },
    { name: 'founders', title: 'Meet the Visionaries' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({ name: 'title', title: 'Internal Title', type: 'string', hidden: true, initialValue: 'Teacher Collective Page' }),

    // ── Hero ──
    defineField({ name: 'heroBadge', title: 'Hero Badge Text', type: 'string', group: 'hero' }),
    defineField({ name: 'heroHeading', title: 'Hero Heading', type: 'text', rows: 2, group: 'hero' }),
    defineField({ name: 'heroSubtext', title: 'Hero Sub-text', type: 'text', rows: 3, group: 'hero' }),
    defineField({ name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true }, group: 'hero' }),
    defineField({ name: 'heroCtaText', title: 'Hero CTA Button Text', type: 'string', group: 'hero' }),

    // ── Section Content ──
    defineField({ name: 'imagineHeading', title: '"Imagine" Section Heading', type: 'string', group: 'sections' }),
    defineField({
      name: 'imagineCards',
      title: '"Imagine" Cards',
      type: 'array',
      group: 'sections',
      of: [{
        type: 'object',
        name: 'imagineCard',
        fields: [
          { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
          { name: 'text', title: 'Text', type: 'text', rows: 2 },
        ],
        preview: { select: { title: 'text', media: 'image' } },
      }],
    }),
    defineField({ name: 'listenHeading', title: '"Listen, I see you" Heading', type: 'string', group: 'sections' }),
    defineField({ name: 'listenBody', title: '"Listen" Body Text', type: 'array', of: [{ type: 'block' }], group: 'sections' }),
    defineField({ name: 'itsTimeHeading', title: '"It\'s Time" CTA Heading', type: 'string', group: 'sections' }),
    defineField({ name: 'youDontHaveToHeading', title: '"You Don\'t Have To" Heading', type: 'string', group: 'sections' }),
    defineField({ name: 'youDontHaveToImage', title: '"You Don\'t Have To" Image', type: 'image', options: { hotspot: true }, group: 'sections' }),
    defineField({
      name: 'youDontHaveToItems',
      title: '"You Don\'t Have To" Points',
      type: 'array',
      group: 'sections',
      of: [{ type: 'text', rows: 2 }],
    }),
    defineField({ name: 'callingHeading', title: '"Your Calling" CTA Heading', type: 'string', group: 'sections' }),
    defineField({ name: 'callingSubtext', title: '"Your Calling" CTA Subtext', type: 'string', group: 'sections' }),

    // ── Benefits & Pricing ──
    defineField({ name: 'memberBannerImage', title: 'Member Banner Image', type: 'image', options: { hotspot: true }, group: 'benefits' }),
    defineField({ name: 'memberHeading', title: '"As a member" Heading', type: 'string', group: 'benefits' }),
    defineField({ name: 'memberSubtext', title: '"As a member" Subtext', type: 'string', group: 'benefits' }),
    defineField({
      name: 'benefitCards',
      title: 'Benefit Cards',
      type: 'array',
      group: 'benefits',
      of: [{
        type: 'object',
        name: 'benefitCard',
        fields: [
          { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
          { name: 'heading', title: 'Heading', type: 'string' },
          { name: 'description', title: 'Description', type: 'text', rows: 3 },
        ],
        preview: { select: { title: 'heading', media: 'image' } },
      }],
    }),
    defineField({ name: 'premiumHeading', title: 'Premium Opportunities Heading', type: 'string', group: 'benefits' }),
    defineField({
      name: 'premiumItems',
      title: 'Premium Items',
      type: 'array',
      group: 'benefits',
      of: [{
        type: 'object',
        name: 'premiumItem',
        fields: [
          { name: 'heading', title: 'Heading', type: 'string' },
          { name: 'description', title: 'Description', type: 'text', rows: 3 },
          { name: 'value', title: 'Value Text', type: 'string' },
        ],
        preview: { select: { title: 'heading' } },
      }],
    }),
    defineField({ name: 'membershipHeading', title: 'Membership Options Heading', type: 'string', group: 'benefits' }),
    defineField({ name: 'membershipSubtext', title: 'Membership Options Subtext', type: 'string', group: 'benefits' }),
    defineField({ name: 'corePriceMonthly', title: 'Core Price Monthly', type: 'string', group: 'benefits' }),
    defineField({ name: 'corePriceAnnual', title: 'Core Price Annual', type: 'string', group: 'benefits' }),
    defineField({ name: 'proPriceMonthly', title: 'Pro Price Monthly', type: 'string', group: 'benefits' }),
    defineField({ name: 'proPriceAnnual', title: 'Pro Price Annual', type: 'string', group: 'benefits' }),

    // ── "It's Time To" Section ──
    defineField({ name: 'itsTimeToHeading', title: '"It\'s Time To" Section Heading', type: 'string', group: 'sections' }),
    defineField({ name: 'itsTimeToImage', title: '"It\'s Time To" Image', type: 'image', options: { hotspot: true }, group: 'sections' }),
    defineField({
      name: 'itsTimeToPoints',
      title: '"It\'s Time To" Points',
      type: 'array',
      group: 'sections',
      of: [{ type: 'text', rows: 2 }],
    }),

    // ── Meet the Visionaries ──
    defineField({ name: 'visionariesHeading', title: 'Section Heading', type: 'string', group: 'founders' }),
    defineField({ name: 'visionariesSubtext', title: 'Section Subtext', type: 'text', rows: 3, group: 'founders' }),
    defineField({
      name: 'visionaries',
      title: 'Founder Profiles',
      type: 'array',
      group: 'founders',
      of: [{
        type: 'object',
        name: 'visionaryProfile',
        fields: [
          { name: 'name', title: 'Name', type: 'string' },
          { name: 'role', title: 'Role', type: 'string' },
          { name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } },
          { name: 'bio', title: 'Bio Paragraphs', type: 'array', of: [{ type: 'block' }] },
          { name: 'link', title: 'Profile Link', type: 'string' },
        ],
        preview: { select: { title: 'name', subtitle: 'role', media: 'photo' } },
      }],
    }),

    // ── Final CTA ──
    defineField({ name: 'finalCtaHeading', title: 'Final CTA Heading', type: 'string', group: 'sections' }),
    defineField({ name: 'finalCtaSubtext', title: 'Final CTA Subtext', type: 'string', group: 'sections' }),

    // ── Bottom Line ──
    defineField({ name: 'bottomLineImage', title: 'Bottom Line Image', type: 'image', options: { hotspot: true }, group: 'sections' }),
    defineField({ name: 'bottomLineHeading', title: 'Bottom Line Heading', type: 'string', group: 'sections' }),
    defineField({ name: 'bottomLineSubtext', title: 'Bottom Line Subtext', type: 'string', group: 'sections' }),

    // ── SEO ──
    defineField({ name: 'metaTitle', title: 'SEO Title', type: 'string', group: 'seo' }),
    defineField({ name: 'metaDescription', title: 'SEO Description', type: 'text', rows: 2, group: 'seo' }),

    // ── Fillout Config ──
    defineField({ name: 'filloutId', title: 'Fillout Form ID', type: 'string', description: 'The Fillout form ID used for CTA buttons on this page.', group: 'hero' }),
  ],
  preview: {
    prepare: () => ({ title: 'Teacher Collective Page' }),
  },
})
