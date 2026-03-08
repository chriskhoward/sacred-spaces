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
    { name: 'ctas', title: 'CTA Buttons' },
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

    // ── CTA Buttons ──
    defineField({ name: 'itsTimeCtaText', title: '"It\'s Time" CTA Text', type: 'string', group: 'ctas' }),
    defineField({ name: 'itsTimeCtaUseFillout', title: '"It\'s Time" CTA: Use Fillout Form?', type: 'boolean', initialValue: true, group: 'ctas', description: 'When on, opens the Fillout form slider. When off, uses the link below.' }),
    defineField({ name: 'itsTimeCtaLink', title: '"It\'s Time" CTA Link', type: 'string', group: 'ctas', description: 'Only used when Fillout is off. Internal path or external URL.' }),

    defineField({ name: 'callingCtaText', title: '"Your Calling" CTA Text', type: 'string', group: 'ctas' }),
    defineField({ name: 'callingCtaUseFillout', title: '"Your Calling" CTA: Use Fillout Form?', type: 'boolean', initialValue: true, group: 'ctas', description: 'When on, opens the Fillout form slider. When off, uses the link below.' }),
    defineField({ name: 'callingCtaLink', title: '"Your Calling" CTA Link', type: 'string', group: 'ctas', description: 'Only used when Fillout is off. Internal path or external URL.' }),

    defineField({ name: 'premiumCtaText', title: 'Premium CTA Text', type: 'string', group: 'ctas' }),
    defineField({ name: 'premiumCtaUseFillout', title: 'Premium CTA: Use Fillout Form?', type: 'boolean', initialValue: true, group: 'ctas', description: 'When on, opens the Fillout form slider. When off, uses the link below.' }),
    defineField({ name: 'premiumCtaLink', title: 'Premium CTA Link', type: 'string', group: 'ctas', description: 'Only used when Fillout is off. Internal path or external URL.' }),

    defineField({ name: 'coreCtaText', title: 'Join Core CTA Text', type: 'string', group: 'ctas' }),
    defineField({ name: 'coreCtaUseFillout', title: 'Join Core CTA: Use Fillout Form?', type: 'boolean', initialValue: true, group: 'ctas', description: 'When on, opens the Fillout form slider. When off, uses the link below.' }),
    defineField({ name: 'coreCtaLink', title: 'Join Core CTA Link', type: 'string', group: 'ctas', description: 'Only used when Fillout is off. Internal path or external URL.' }),

    defineField({ name: 'proCtaText', title: 'Join Pro CTA Text', type: 'string', group: 'ctas' }),
    defineField({ name: 'proCtaUseFillout', title: 'Join Pro CTA: Use Fillout Form?', type: 'boolean', initialValue: true, group: 'ctas', description: 'When on, opens the Fillout form slider. When off, uses the link below.' }),
    defineField({ name: 'proCtaLink', title: 'Join Pro CTA Link', type: 'string', group: 'ctas', description: 'Only used when Fillout is off. Internal path or external URL.' }),

    defineField({ name: 'itsTimeToCtaText', title: '"It\'s Time To" CTA Text', type: 'string', group: 'ctas' }),
    defineField({ name: 'itsTimeToCtaUseFillout', title: '"It\'s Time To" CTA: Use Fillout Form?', type: 'boolean', initialValue: true, group: 'ctas', description: 'When on, opens the Fillout form slider. When off, uses the link below.' }),
    defineField({ name: 'itsTimeToCtaLink', title: '"It\'s Time To" CTA Link', type: 'string', group: 'ctas', description: 'Only used when Fillout is off. Internal path or external URL.' }),

    defineField({ name: 'finalCtaCtaText', title: 'Final CTA Text', type: 'string', group: 'ctas' }),
    defineField({ name: 'finalCtaCtaUseFillout', title: 'Final CTA: Use Fillout Form?', type: 'boolean', initialValue: true, group: 'ctas', description: 'When on, opens the Fillout form slider. When off, uses the link below.' }),
    defineField({ name: 'finalCtaCtaLink', title: 'Final CTA Link', type: 'string', group: 'ctas', description: 'Only used when Fillout is off. Internal path or external URL.' }),

    defineField({ name: 'bottomLineCtaText', title: 'Bottom Line CTA Text', type: 'string', group: 'ctas' }),
    defineField({ name: 'bottomLineCtaUseFillout', title: 'Bottom Line CTA: Use Fillout Form?', type: 'boolean', initialValue: true, group: 'ctas', description: 'When on, opens the Fillout form slider. When off, uses the link below.' }),
    defineField({ name: 'bottomLineCtaLink', title: 'Bottom Line CTA Link', type: 'string', group: 'ctas', description: 'Only used when Fillout is off. Internal path or external URL.' }),
  ],
  preview: {
    prepare: () => ({ title: 'Teacher Collective Page' }),
  },
})
