import { defineField, defineType } from 'sanity'

export const liveClassType = defineType({
  name: 'liveClass',
  title: 'Live Class Schedule',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Class Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: 'instructor',
        title: 'Instructor',
        type: 'string',
        validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: 'dateTime',
        title: 'Date & Time',
        type: 'datetime',
        validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: 'duration',
        title: 'Duration (e.g. 60 min)',
        type: 'string',
    }),
    defineField({
        name: 'type',
        title: 'Class Type',
        type: 'string',
        options: {
            list: [
                { title: 'Vinyasa', value: 'Vinyasa' },
                { title: 'Meditation', value: 'Meditation' },
                { title: 'Hatha', value: 'Hatha' },
                { title: 'Workshop', value: 'Workshop' },
            ]
        }
    }),
    defineField({
        name: 'description',
        title: 'Description',
        type: 'text',
    }),
    defineField({
        name: 'zoomLink',
        title: 'Zoom/Meeting Link',
        type: 'url',
    }),
    defineField({
        name: 'targetAudience',
        title: 'Target Audience',
        type: 'string',
        options: {
            list: [
                { title: 'Practitioner Only', value: 'practitioner' },
                { title: 'Teacher Only', value: 'teacher' },
                { title: 'Everyone', value: 'all' },
            ],
        },
        initialValue: 'all',
        validation: (Rule) => Rule.required(),
    }),
  ],
})
