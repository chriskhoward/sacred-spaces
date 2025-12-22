import { defineField, defineType } from 'sanity'

export const videoType = defineType({
  name: 'video',
  title: 'Video Library',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Video Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: 'instructor',
        title: 'Instructor Name',
        type: 'string',
        validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: 'description',
        title: 'Description',
        type: 'text',
        rows: 3,
    }),
    defineField({
        name: 'category',
        title: 'Category',
        type: 'string',
        options: {
            list: [
                { title: 'Vinyasa', value: 'Vinyasa' },
                { title: 'Restorative', value: 'Restorative' },
                { title: 'Meditation', value: 'Meditation' },
                { title: 'Workshop', value: 'Workshop' },
                { title: 'Hatha', value: 'Hatha' },
            ],
        },
        validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: 'level',
        title: 'Difficulty Level',
        type: 'string',
        options: {
            list: [
                { title: 'Beginner', value: 'Beginner' },
                { title: 'Intermediate', value: 'Intermediate' },
                { title: 'Advanced', value: 'Advanced' },
                { title: 'All Levels', value: 'All Levels' },
            ]
        }
    }),
    defineField({
        name: 'duration',
        title: 'Duration (e.g. "45 min")',
        type: 'string',
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
        name: 'videoUrl',
        title: 'Video URL (Vimeo/YouTube/S3)',
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
