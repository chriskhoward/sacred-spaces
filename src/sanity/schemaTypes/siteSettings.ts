import { defineField, defineType } from 'sanity'

export const siteSettingsType = defineType({
    name: 'siteSettings',
    title: 'Site Settings',
    icon: () => '⚙️',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Site Title',
            type: 'string',
            description: 'The name of your website (e.g. Flow in Faith).',
            initialValue: 'Flow in Faith',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Site Description',
            type: 'text',
            description: 'Global description for SEO (Search Engine Optimization).',
            rows: 3,
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'logo',
            title: 'Site Logo',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'favicon',
            title: 'Favicon',
            type: 'image',
            description: 'The small icon shown in browser tabs.',
        }),
        defineField({
            name: 'socialLinks',
            title: 'Social Media Links',
            type: 'object',
            fields: [
                { name: 'instagram', title: 'Instagram URL', type: 'url' },
                { name: 'facebook', title: 'Facebook URL', type: 'url' },
                { name: 'youtube', title: 'YouTube URL', type: 'url' },
                { name: 'tiktok', title: 'TikTok URL', type: 'url' },
            ],
        }),
        defineField({
            name: 'contactEmail',
            title: 'Contact Email',
            type: 'string',
            validation: (Rule) => Rule.email(),
        }),
    ],
})
