import { defineField, defineType } from 'sanity'

export const teacherOnboardingItemType = defineType({
  name: 'teacherOnboardingItem',
  title: 'Teacher onboarding item',
  type: 'document',
  description: 'Videos, PDFs, and links shown on the Start here page for teachers.',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'teacherOnboardingCategory' }],
      description: 'Optional. Group this item under a category on the Start here page.',
    }),
    defineField({
      name: 'itemType',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Video', value: 'video' },
          { title: 'PDF', value: 'pdf' },
          { title: 'Link', value: 'link' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
      initialValue: 'link',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      description: 'For video: YouTube or Vimeo page URL. For PDF/link: external URL. Leave empty if using an uploaded file below.',
      hidden: ({ parent }) => parent?.itemType !== 'video' && parent?.itemType !== 'link',
    }),
    defineField({
      name: 'pdfFile',
      title: 'PDF file',
      type: 'file',
      description: 'Upload a PDF. Use this or URL, not both.',
      options: {
        accept: 'application/pdf',
      },
      hidden: ({ parent }) => parent?.itemType !== 'pdf',
    }),
    defineField({
      name: 'pdfUrl',
      title: 'PDF URL',
      type: 'url',
      description: 'Or link to a PDF hosted elsewhere.',
      hidden: ({ parent }) => parent?.itemType !== 'pdf',
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      description: 'Lower numbers appear first.',
      initialValue: 0,
      validation: (Rule) => Rule.required().min(0),
    }),
  ],
  orderings: [
    {
      title: 'Display order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'title', itemType: 'itemType', order: 'order', categoryTitle: 'category.title' },
    prepare({ title, itemType, order, categoryTitle }) {
      const typeLabels: Record<string, string> = { video: 'Video', pdf: 'PDF', link: 'Link' }
      const typeLabel = (itemType && typeLabels[itemType]) || itemType || 'Link'
      const categoryPart = categoryTitle ? ` · ${categoryTitle}` : ''
      return {
        title: title || 'Untitled',
        subtitle: `${typeLabel}${categoryPart} · order ${order ?? 0}`,
      }
    },
  },
})
