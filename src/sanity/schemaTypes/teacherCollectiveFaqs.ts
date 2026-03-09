import { defineField, defineType } from 'sanity'

export const teacherCollectiveFaqsType = defineType({
  name: 'teacherCollectiveFaqs',
  title: 'Teacher Collective FAQs',
  icon: () => '❓',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Document Title',
      type: 'string',
      options: { canvasApp: { exclude: true } },
      initialValue: 'Teacher Collective FAQs',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'intro',
      title: 'Intro Text',
      type: 'string',
      options: { canvasApp: { purpose: 'Introductory text above the FAQ section' } },
      description: 'Short line above the FAQs heading (e.g. "Still have questions? I understand. Let\'s chat!")',
      initialValue: "Still have questions? I understand. Let's chat!",
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      options: { canvasApp: { purpose: 'FAQ section heading' } },
      initialValue: 'FAQs',
    }),
    defineField({
      name: 'items',
      title: 'FAQ Items',
      type: 'array',
      options: { canvasApp: { purpose: 'FAQ questions and answers for the Teacher Collective' } },
      of: [
        {
          type: 'object',
          name: 'faqItem',
          fields: [
            defineField({ name: 'question', title: 'Question', type: 'string' }),
            defineField({ name: 'answer', title: 'Answer', type: 'array', of: [{ type: 'block' }] }),
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
