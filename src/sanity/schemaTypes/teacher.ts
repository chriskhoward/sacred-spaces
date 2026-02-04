import { defineField, defineType } from 'sanity'

export const teacherType = defineType({
    name: 'teacher',
    title: 'Teacher',
    type: 'document',
    fields: [
        defineField({
            name: 'clerkId',
            title: 'Clerk User ID',
            type: 'string',
            validation: Rule => Rule.required(),
            readOnly: true,
        }),
        defineField({
            name: 'name',
            title: 'Display Name',
            type: 'string',
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
            type: 'text',
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
