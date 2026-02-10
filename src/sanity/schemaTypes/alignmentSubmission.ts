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
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'City / State / Country from the alignment form',
    }),
    defineField({
      name: 'yogaFormats',
      title: 'Yoga Formats',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Yoga formats they teach (multi-select from alignment form)',
    }),
    defineField({
      name: 'teachingExperience',
      title: 'Teaching Experience',
      type: 'string',
      description: 'How long they have been teaching yoga',
    }),
    defineField({
      name: 'whyJoin',
      title: 'Why Join',
      type: 'text',
      rows: 4,
      description: 'What drew them to join the Teachers Collective',
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'responses',
      title: 'Form Responses (raw)',
      type: 'text',
      description: 'Full raw form answers from Fillout (JSON). Structured fields above are extracted automatically.',
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
