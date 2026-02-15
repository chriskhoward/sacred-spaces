import { defineField, defineType } from 'sanity'

export const announcementBarType = defineType({
    name: 'announcementBar',
    title: 'Announcement Bar',
    icon: () => '📣',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Internal Title',
            type: 'string',
            description: 'e.g. Founder Discount Promo',
            initialValue: 'Announcement Bar',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'isActive',
            title: 'Is Active?',
            type: 'boolean',
            initialValue: false,
        }),
        defineField({
            name: 'text',
            title: 'Banner Text',
            type: 'string',
            description: 'The message shown in the bar.',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'link',
            title: 'Link (Optional)',
            type: 'url',
            description: 'Where to go when the banner is clicked.',
        }),
        defineField({
            name: 'backgroundColor',
            title: 'Background Color',
            type: 'string',
            description: 'Tailwind color class or hex (e.g. bg-roti or #D4AF37)',
            initialValue: 'bg-roti',
        }),
    ],
})
