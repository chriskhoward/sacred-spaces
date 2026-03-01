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
