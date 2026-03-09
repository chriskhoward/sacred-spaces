import { defineField, defineType } from 'sanity'
import { HeartIcon } from '@sanity/icons'

export const summitYogaClassType = defineType({
  name: 'summitYogaClass',
  title: 'Summit Yoga Class',
  type: 'document',
  icon: HeartIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      options: { canvasApp: { purpose: 'Yoga class title' } },
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
      name: 'instructor',
      title: 'Instructor',
      type: 'string',
      description: 'Instructor name',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Thumbnail for the yoga class card',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Upcoming', value: 'upcoming' },
          { title: 'Live Now', value: 'live' },
          { title: 'Replay Available', value: 'replay' },
        ],
        layout: 'radio',
      },
      initialValue: 'upcoming',
      description: 'Controls what is shown: upcoming shows calendar link, live shows live stream link, replay shows video',
    }),
    defineField({
      name: 'liveUrl',
      title: 'Live Stream URL',
      type: 'url',
      description: 'Link to the live stream (Zoom, YouTube Live, etc.)',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Replay Video URL',
      type: 'url',
      description: 'Embed URL for the replay (YouTube, Vimeo)',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      options: { canvasApp: { purpose: 'Description of the yoga class' } },
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
      name: 'startTime',
      title: 'Start Time',
      type: 'datetime',
      description: 'Exact start time (used for Google Calendar links)',
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'order',
      by: [{ field: 'displayOrder', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'instructor' },
  },
})
