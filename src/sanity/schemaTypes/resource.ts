import { defineField, defineType } from 'sanity'

export const resourceType = defineType({
  name: 'resource',
  title: 'Teacher Resources',
  icon: () => '📚',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Resource Title',
      type: 'string',
      options: { canvasApp: { purpose: 'Resource title' } },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'resourceCategory' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      options: { canvasApp: { purpose: 'Description of the resource' } },
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'author',
      title: 'Author/Host',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'linkUrl',
      title: 'Link to Resource (PDF/Video/Page)',
      type: 'url',
      options: { canvasApp: { exclude: true } },
    }),
    defineField({
      name: 'isLocked',
      title: 'Premium Member Only?',
      type: 'boolean',
      options: { canvasApp: { exclude: true } },
      initialValue: true,
    }),
    defineField({
      name: 'targetAudience',
      title: 'Target Audience',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        canvasApp: { exclude: true },
        list: [
          { title: 'Everyone', value: 'all' },
          { title: 'Teacher Collective - Core', value: 'teacher_core' },
          { title: 'Teacher Collective - Pro', value: 'teacher_pro' },
          { title: 'Sanctuary Collective - Core', value: 'practitioner_core' },
          { title: 'Sanctuary Collective - Pro', value: 'practitioner_pro' },
        ],
      },
      initialValue: ['all'],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      options: { canvasApp: { exclude: true } },
      description: 'Lower numbers appear first within each category',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
