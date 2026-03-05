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
      name: 'allAccessImage',
      title: 'All Access Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Optional image displayed on the All Access page',
    }),
    defineField({
      name: 'welcomeBannerImage',
      title: 'Welcome Banner Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Optional banner displayed at the top of the Welcome page',
    }),
    defineField({
      name: 'welcomeVideoUrl',
      title: 'Welcome Video URL',
      type: 'url',
      description: 'Optional video embed URL for the Welcome page',
    }),
    defineField({
      name: 'communityDescription',
      title: 'Community Description',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Content for the Community page — shown on /summit/community',
    }),
    defineField({
      name: 'scheduleBannerImage',
      title: 'Schedule Banner Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Optional banner displayed at the top of the Schedule page',
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
    defineField({
      name: 'labels',
      title: 'Page Labels & Text',
      type: 'object',
      description: 'Editable labels for all text on summit pages. Leave blank to use defaults.',
      fields: [
        // Welcome page
        { name: 'welcomeTitle', title: 'Welcome Page Title', type: 'string', description: 'Default: "Welcome to {summit title}"' },
        { name: 'welcomeEmptyMessage', title: 'Welcome Empty State', type: 'string', description: 'Default: "Welcome content coming soon."' },
        { name: 'joinCommunityButton', title: 'Join Community Button', type: 'string', description: 'Default: "Join the Community"' },
        { name: 'upgradeMessage', title: 'Upgrade CTA Message', type: 'string', description: 'Default: "Get lifetime access to all presentations, resources, and bonus yoga classes."' },
        // Schedule page
        { name: 'scheduleTitle', title: 'Schedule Page Title', type: 'string', description: 'Default: "Presentation & Workshop Schedule"' },
        { name: 'scheduleEmptyMessage', title: 'Schedule Empty State', type: 'string', description: 'Default: "Schedule coming soon."' },
        { name: 'recordedSessionsLabel', title: 'Recorded Sessions Label', type: 'string', description: 'Default: "Recorded Sessions"' },
        { name: 'dayPrefix', title: 'Day Prefix', type: 'string', description: 'Default: "Day"' },
        // Navigation labels
        { name: 'backToWelcome', title: 'Back to Welcome Label', type: 'string', description: 'Default: "Back to Welcome"' },
        { name: 'backToSchedule', title: 'Back to Schedule Label', type: 'string', description: 'Default: "Back to Schedule"' },
        // All Access page
        { name: 'allAccessTitle', title: 'All Access Page Title', type: 'string', description: 'Default: "All Access Pass"' },
        { name: 'allAccessSuccessHeading', title: 'All Access Success Heading', type: 'string', description: 'Default: "You Have All Access!"' },
        { name: 'allAccessSuccessMessage', title: 'All Access Success Message', type: 'string', description: 'Default: "You have permanent, unlimited access to all summit content..."' },
        { name: 'getAllAccessButton', title: 'Get All Access Button', type: 'string', description: 'Default: "Get All Access Pass"' },
        // Community page
        { name: 'communityTitle', title: 'Community Page Title', type: 'string', description: 'Default: "Community"' },
        { name: 'communityFallback', title: 'Community Fallback Text', type: 'string', description: 'Shown when no communityDescription exists.' },
        // Yoga classes
        { name: 'yogaTitle', title: 'Yoga Classes Title', type: 'string', description: 'Default: "Yoga Classes"' },
        { name: 'yogaEmptyMessage', title: 'Yoga Empty State', type: 'string', description: 'Default: "Yoga classes coming soon."' },
        { name: 'viewScheduleButton', title: 'View Schedule Button', type: 'string', description: 'Default: "View Schedule"' },
        // Presentation detail
        { name: 'aboutPresentationHeading', title: 'About Presentation Heading', type: 'string', description: 'Default: "About This Presentation"' },
        { name: 'includedInAllAccess', title: 'Included in All Access Text', type: 'string', description: 'Default: "Included in the All Access Pass"' },
        { name: 'resourcesHeading', title: 'Resources Heading', type: 'string', description: 'Default: "Resources"' },
        { name: 'signInPrompt', title: 'Sign In Prompt', type: 'string', description: 'Default: "Sign in to check if this presentation is available..."' },
        { name: 'noLongerFreeMessage', title: 'No Longer Free Message', type: 'string', description: 'Default: "This presentation is no longer available for free viewing."' },
        { name: 'permanentAccessPrompt', title: 'Permanent Access Prompt', type: 'string', description: 'Default: "Want permanent access to all presentations and bonus content?"' },
        // SummitNav labels
        { name: 'communityNavLabel', title: 'Community Nav Label', type: 'string', description: 'Default: "Community"' },
        { name: 'signInButton', title: 'Sign In Button', type: 'string', description: 'Default: "Sign In"' },
        // Upgrade CTA
        defineField({ name: 'upgradeCtaHeading', title: 'Upgrade CTA Heading', type: 'string', description: 'Default: "Get All Access"' }),
        defineField({ name: 'upgradeCtaDescription', title: 'Upgrade CTA Description', type: 'text', rows: 2, description: 'Default: "Upgrade to the All Access Pass for permanent, unlimited access to all summit presentations, resources, and bonus content."' }),
        defineField({ name: 'upgradeCtaButton', title: 'Upgrade CTA Button', type: 'string', description: 'Default: "Get All Access Pass"' }),
        // Footer
        defineField({ name: 'footerTermsLabel', title: 'Footer Terms Label', type: 'string', description: 'Default: "Terms"' }),
        defineField({ name: 'footerPrivacyLabel', title: 'Footer Privacy Label', type: 'string', description: 'Default: "Privacy Policy"' }),
        defineField({ name: 'footerContactLabel', title: 'Footer Contact Label', type: 'string', description: 'Default: "Contact"' }),
        defineField({ name: 'footerCopyrightText', title: 'Footer Copyright Brand', type: 'string', description: 'Default: "Flow in Faith"' }),
      ],
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
