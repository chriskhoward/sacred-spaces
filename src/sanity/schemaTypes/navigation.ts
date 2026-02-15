import { defineField, defineType } from 'sanity'

export const navigationType = defineType({
    name: 'navigation',
    title: 'Navigation Menu',
    icon: () => '🗺️',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Menu Title',
            type: 'string',
            description: 'e.g. Main Navigation, Footer Links',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'items',
            title: 'Menu Items',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'navItem',
                    fields: [
                        { name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() },
                        {
                            name: 'linkType',
                            title: 'Link Type',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Internal Page', value: 'internal' },
                                    { title: 'External URL', value: 'external' },
                                ],
                                layout: 'radio',
                            },
                            initialValue: 'internal',
                        },
                        {
                            name: 'internalLink',
                            title: 'Internal Page',
                            type: 'reference',
                            to: [{ type: 'page' }, { type: 'home' }, { type: 'about' }],
                            hidden: ({ parent }) => parent?.linkType !== 'internal',
                        },
                        {
                            name: 'externalUrl',
                            title: 'External URL',
                            type: 'url',
                            hidden: ({ parent }) => parent?.linkType !== 'external',
                        },
                    ],
                    preview: {
                        select: {
                            title: 'label',
                            subtitle: 'externalUrl',
                        },
                    },
                },
            ],
        }),
    ],
})
