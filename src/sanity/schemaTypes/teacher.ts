import { defineField, defineType } from 'sanity'

export const teacherType = defineType({
    name: 'teacher',
    title: 'Teacher',
    icon: () => '👩‍🏫',
    type: 'document',
    fields: [
        defineField({
            name: 'clerkId',
            title: 'Clerk User ID',
            type: 'string',
            options: { canvasApp: { exclude: true } },
            validation: Rule => Rule.required(),
            readOnly: true,
        }),
        defineField({
            name: 'membershipId',
            title: 'Membership ID',
            type: 'string',
            options: { canvasApp: { exclude: true } },
            description: 'The internal membership ID (e.g., from Thrivecart or Airtable)',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
                canvasApp: { exclude: true },
            },
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'status',
            title: 'Status',
            type: 'string',
            initialValue: 'active',
            options: {
                canvasApp: { exclude: true },
                list: [
                    { title: 'Active', value: 'active' },
                    { title: 'Inactive', value: 'inactive' },
                    { title: 'Pending', value: 'pending' },
                ],
            },
        }),
        defineField({
            name: 'name',
            title: 'Display Name',
            type: 'string',
            options: { canvasApp: { purpose: "Teacher's display name" } },
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'location',
            title: 'Location',
            type: 'string',
        }),
        defineField({
            name: 'bio',
            title: 'Biography',
            type: 'array',
            options: { canvasApp: { purpose: 'Teacher biography' } },
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'image',
            title: 'Profile Image URL',
            type: 'url',
            description: 'The profile image URL from Clerk',
        }),
        defineField({
            name: 'email',
            title: 'Email Address',
            type: 'string',
            options: { canvasApp: { exclude: true } },
        }),
        defineField({
            name: 'website',
            title: 'Website URL',
            type: 'url',
        }),
        defineField({
            name: 'specialties',
            title: 'Specialties',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'certifications',
            title: 'Certifications',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'lastSync',
            title: 'Last Sync',
            type: 'datetime',
            options: { canvasApp: { exclude: true } },
            initialValue: () => new Date().toISOString(),
        }),
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'location',
        },
    },
})
