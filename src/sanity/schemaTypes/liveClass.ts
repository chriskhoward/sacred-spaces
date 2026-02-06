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
                { title: 'Restorative', value: 'Restorative' },
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
        name: 'isRecurring',
        title: 'Recurring Class',
        type: 'boolean',
        description: 'Enable if this class repeats on a schedule',
        initialValue: false,
    }),
    defineField({
        name: 'recurrencePattern',
        title: 'Recurrence Pattern',
        type: 'string',
        options: {
            list: [
                { title: 'Weekly', value: 'weekly' },
                { title: 'Bi-weekly', value: 'biweekly' },
                { title: 'Monthly', value: 'monthly' },
            ],
        },
        hidden: ({ parent }) => !parent?.isRecurring,
    }),
    defineField({
        name: 'recurrenceEndDate',
        title: 'Recurrence End Date',
        type: 'date',
        description: 'When should this recurring class stop? Leave empty for indefinite.',
        hidden: ({ parent }) => !parent?.isRecurring,
    }),
    defineField({
        name: 'isLocked',
        title: 'Premium Member Only?',
        type: 'boolean',
        description: 'If enabled, only Core and Pro tier members can access the Zoom link',
        initialValue: false,
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
  preview: {
    select: {
      title: 'title',
      instructor: 'instructor',
      dateTime: 'dateTime',
      isRecurring: 'isRecurring',
    },
    prepare({ title, instructor, dateTime, isRecurring }) {
      const date = dateTime ? new Date(dateTime).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
      }) : 'No date';
      return {
        title: `${title}${isRecurring ? ' 🔄' : ''}`,
        subtitle: `${date} • ${instructor}`,
      };
    },
  },
})
