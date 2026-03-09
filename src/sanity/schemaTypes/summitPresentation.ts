import { defineField, defineType } from 'sanity'
import { PresentationIcon } from '@sanity/icons'
import { buttonOverrideFields } from './shared/buttonFields'

export const summitPresentationType = defineType({
  name: 'summitPresentation',
  title: 'Summit Presentation',
  type: 'document',
  icon: PresentationIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      options: { canvasApp: { purpose: 'Presentation title' } },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96, canvasApp: { exclude: true } },
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
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Optional image displayed on the schedule card',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      options: { canvasApp: { purpose: 'Description of the presentation content' } },
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
          ],
        },
      ],
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
      options: { canvasApp: { exclude: true } },
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
      name: 'startTime',
      title: 'Start Time',
      type: 'datetime',
      description: 'Exact start time (used for Google Calendar links)',
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
      name: 'speakerPromoLabel',
      title: 'Speaker Promo Button Label',
      type: 'string',
      description: 'e.g. "Visit Sarah\'s Website". Leave blank to hide.',
    }),
    defineField({
      name: 'speakerPromoUrl',
      title: 'Speaker Promo Button URL',
      type: 'url',
      description: 'Link for the speaker promo button. Falls back to speaker website if blank.',
    }),
    defineField({
      name: 'customContent',
      title: 'Custom Content Section',
      type: 'array',
      options: { canvasApp: { purpose: 'Optional custom content section added by the client below the main presentation details' } },
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
          ],
        },
      ],
      description: 'Optional extra content section displayed on the presentation page',
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      options: { canvasApp: { exclude: true } },
      description: 'Ordering within a day',
      initialValue: 0,
    }),
    defineField({
      name: 'sessionType',
      title: 'Session Type',
      type: 'string',
      options: {
        list: [
          { title: 'Live', value: 'live' },
          { title: 'Recorded', value: 'recorded' },
        ],
        layout: 'radio',
      },
      initialValue: 'live',
      description: 'Live sessions show full details; recorded sessions show compact view on the schedule',
    }),
    ...buttonOverrideFields(),
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
