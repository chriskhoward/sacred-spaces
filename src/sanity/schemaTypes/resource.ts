import { defineField, defineType } from 'sanity'

export const resourceType = defineType({
  name: 'resource',
  title: 'Teacher Resources',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Resource Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: 'category',
        title: 'Category',
        type: 'string',
        options: {
            list: [
                { title: 'Masterclass', value: 'Masterclass' },
                { title: 'Business & Growth', value: 'Business & Growth' },
                { title: 'Class Sequencing', value: 'Class Sequencing' },
                { title: 'Theology', value: 'Theology' },
            ],
        },
    }),
    defineField({
        name: 'description',
        title: 'Description',
        type: 'text',
        rows: 3,
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
    }),
    defineField({
        name: 'isLocked',
        title: 'Premium Member Only?',
        type: 'boolean',
        initialValue: true,
    })
  ],
})
