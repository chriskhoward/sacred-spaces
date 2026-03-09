import { defineArrayMember, defineField, defineType } from 'sanity'
import { DashboardIcon } from '@sanity/icons'
import { DashboardCardsInput } from '../components/DashboardCardsInput'

export const teacherCollectiveDashboardType = defineType({
  name: 'teacherCollectiveDashboard',
  title: 'Teacher Collective Dashboard',
  type: 'document',
  icon: DashboardIcon,
  description: 'Cards shown on /dashboard/teacher-collective. Drag to reorder; add or remove items.',
  fields: [
    defineField({
      name: 'title',
      title: 'Dashboard title (for Studio only)',
      type: 'string',
      options: { canvasApp: { exclude: true } },
      initialValue: 'Teacher Collective Dashboard',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'cards',
      title: 'Dashboard cards',
      type: 'array',
      description: 'Order and content of cards on the Teacher Collective dashboard. Drag to reorder.',
      options: { layout: 'grid', canvasApp: { purpose: 'Dashboard cards with titles, descriptions, and links' } },
      components: { input: DashboardCardsInput },
      of: [
        defineArrayMember({
          type: 'object',
          name: 'dashboardCard',
          title: 'Dashboard card',
          fields: [
            defineField({
              name: 'title',
              title: 'Card title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'array',
              of: [{ type: 'block' }],
            }),
            defineField({
              name: 'href',
              title: 'Link (URL or path)',
              type: 'string',
              description: 'Internal path (e.g. /dashboard/teacher-collective/start) or full URL.',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'linkLabel',
              title: 'Link label (optional)',
              type: 'string',
              description: 'e.g. "Go to Community →". Shown below description when set.',
            }),
          ],
          preview: {
            select: { title: 'title' },
            prepare({ title }) {
              return { title: title || 'Untitled card' }
            },
          },
        }),
      ],
    }),
  ],
})
