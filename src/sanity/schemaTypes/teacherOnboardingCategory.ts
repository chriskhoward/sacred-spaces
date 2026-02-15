import { defineField, defineType } from 'sanity'

export const teacherOnboardingCategoryType = defineType({
  name: 'teacherOnboardingCategory',
  title: 'Onboarding category',
  icon: () => '📋',
  type: 'document',
  description: 'Categories for grouping items on the Start here page (e.g. Welcome, Getting Started, Resources).',
  fields: [
    defineField({
      name: 'title',
      title: 'Category name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      description: 'Lower numbers appear first.',
      initialValue: 0,
      validation: (Rule) => Rule.required().min(0),
    }),
  ],
  orderings: [
    {
      title: 'Display order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'title', order: 'order' },
    prepare({ title, order }) {
      return {
        title: title || 'Untitled',
        subtitle: `Order ${order ?? 0}`,
      }
    },
  },
})
