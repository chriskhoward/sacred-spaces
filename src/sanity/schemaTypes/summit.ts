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
