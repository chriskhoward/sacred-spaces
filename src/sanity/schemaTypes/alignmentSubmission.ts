import { defineField, defineType } from 'sanity'

export const alignmentSubmissionType = defineType({
  name: 'alignmentSubmission',
  title: 'Alignment Form Submission',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'responses',
      title: 'Form Responses',
      type: 'object',
      description: 'Raw form answers from Fillout (field id or name → value)',
      options: {
        collapsed: false,
      },
    }),
  ],
  preview: {
    select: {
      email: 'email',
      name: 'name',
      submittedAt: 'submittedAt',
    },
    prepare({ email, name, submittedAt }) {
      return {
        title: name || email,
        subtitle: [email, submittedAt ? new Date(submittedAt).toLocaleDateString() : null].filter(Boolean).join(' · '),
      }
    },
  },
})
