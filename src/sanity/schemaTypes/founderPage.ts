import { defineField, defineType } from 'sanity'

export const founderPageType = defineType({
  name: 'founderPage',
  title: 'Founder Page',
  icon: () => '👤',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role / Badge',
      type: 'string',
      description: 'e.g. "Founder/Visionary"',
    }),
    defineField({
      name: 'organization',
      title: 'Organization Name',
      type: 'string',
      description: 'e.g. "Flow in Faith Teachers Collective"',
    }),
    defineField({
      name: 'tagline',
      title: 'Short Tagline',
      type: 'text',
      rows: 2,
      description: 'One-liner shown in the hero section.',
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'bannerImage',
      title: 'Banner Background Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'aboutHeading',
      title: 'About Section Heading',
      type: 'string',
      description: 'e.g. "About Queen"',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'credentialsHeading',
      title: 'Credentials Section Heading',
      type: 'string',
      description: 'e.g. "Credentials & Training"',
    }),
    defineField({
      name: 'credentials',
      title: 'Credentials',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'credential',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'string' },
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              description: 'Lucide icon name: Heart, Star, Wind, Leaf, Sparkles, HeartPulse, Dumbbell',
              options: {
                list: [
                  { title: 'Heart', value: 'Heart' },
                  { title: 'Star', value: 'Star' },
                  { title: 'Wind', value: 'Wind' },
                  { title: 'Leaf', value: 'Leaf' },
                  { title: 'Sparkles', value: 'Sparkles' },
                  { title: 'HeartPulse', value: 'HeartPulse' },
                  { title: 'Dumbbell', value: 'Dumbbell' },
                ],
              },
            },
          ],
          preview: { select: { title: 'title', subtitle: 'description' } },
        },
      ],
    }),
    defineField({
      name: 'philosophyHeading',
      title: 'Philosophy Section Heading',
      type: 'string',
      description: 'e.g. "Teaching Philosophy" or "Teaching Approach"',
    }),
    defineField({
      name: 'philosophyQuote',
      title: 'Philosophy / Approach Quote',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'ctaHeading',
      title: 'CTA Section Heading',
      type: 'string',
      description: 'e.g. "Ready to practice with Queen?"',
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Body Text',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'ctaButtonText',
      title: 'CTA Primary Button Text',
      type: 'string',
    }),
    defineField({
      name: 'ctaSecondaryText',
      title: 'CTA Secondary Button Text',
      type: 'string',
      description: 'e.g. "Back to Home"',
    }),
    defineField({
      name: 'ctaSecondaryLink',
      title: 'CTA Secondary Button Link',
      type: 'string',
      description: 'e.g. "/"',
    }),
    defineField({
      name: 'metaTitle',
      title: 'SEO Title',
      type: 'string',
    }),
    defineField({
      name: 'metaDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'role' },
  },
})
