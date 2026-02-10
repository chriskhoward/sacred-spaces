import { defineField, defineType } from 'sanity'

export const teacherCollectiveFaqsType = defineType({
  name: 'teacherCollectiveFaqs',
  title: 'Teacher Collective FAQs',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Document Title',
      type: 'string',
      initialValue: 'Teacher Collective FAQs',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'intro',
      title: 'Intro Text',
      type: 'string',
      description: 'Short line above the FAQs heading (e.g. "Still have questions? I understand. Let\'s chat!")',
      initialValue: "Still have questions? I understand. Let's chat!",
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'FAQs',
    }),
    defineField({
      name: 'items',
      title: 'FAQ Items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'faqItem',
          fields: [
            defineField({ name: 'question', title: 'Question', type: 'string' }),
            defineField({ name: 'answer', title: 'Answer', type: 'text' }),
          ],
          preview: {
            select: { question: 'question' },
            prepare({ question }) {
              return { title: question || 'Untitled question' }
            },
          },
        },
      ],
    }),
  ],
})
