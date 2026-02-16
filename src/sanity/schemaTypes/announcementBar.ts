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
            title: 'Background Color (preset)',
            type: 'string',
            description: 'Select a brand color, or use a custom color below.',
            initialValue: 'bg-roti',
            options: {
                list: [
                    { title: 'Martinique (Purple)', value: 'bg-martinique' },
                    { title: 'Roti (Gold)', value: 'bg-roti' },
                    { title: 'Bronzetone (Brown)', value: 'bg-bronzetone' },
                ],
                layout: 'dropdown'
            },
        }),
        defineField({
            name: 'customBackgroundColor',
            title: 'Custom Background Color',
            type: 'string',
            description: 'Override with any hex color (e.g. #413356). Leave blank to use the preset above.',
        }),
        defineField({
            name: 'textColor',
            title: 'Text Color (preset)',
            type: 'string',
            description: 'Select a preset text color, or use a custom color below.',
            initialValue: 'text-white',
            options: {
                list: [
                    { title: 'White', value: 'text-white' },
                    { title: 'Martinique (Purple)', value: 'text-martinique' },
                    { title: 'Roti (Gold)', value: 'text-roti' },
                    { title: 'Bronzetone (Brown)', value: 'text-bronzetone' },
                ],
                layout: 'dropdown'
            },
        }),
        defineField({
            name: 'customTextColor',
            title: 'Custom Text Color',
            type: 'string',
            description: 'Override with any hex color (e.g. #ffffff). Leave blank to use the preset above.',
        }),
    ],
})
