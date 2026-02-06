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
      type: 'text',
      description: 'Raw form answers from Fillout (JSON)',
      rows: 8,
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
