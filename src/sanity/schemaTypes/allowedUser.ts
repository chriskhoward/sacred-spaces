import { defineField, defineType } from 'sanity'

export const allowedUserType = defineType({
    name: 'allowedUser',
    title: 'Allowed User',
    type: 'document',
    fields: [
        defineField({
            name: 'email',
            title: 'Email',
            type: 'string',
            validation: (rule) => rule.required().email(),
        }),
        defineField({
            name: 'plan',
            title: 'Plan / Product',
            type: 'string',
        }),
        defineField({
            name: 'orderId',
            title: 'Order ID',
            type: 'string',
        }),
        defineField({
            name: 'redeemed',
            title: 'Redeemed',
            type: 'boolean',
            description: 'Has this user already signed up and claimed their access?',
            initialValue: false,
        }),
    ],
    preview: {
        select: {
            title: 'email',
            subtitle: 'plan',
            redeemed: 'redeemed',
        },
        prepare({ title, subtitle, redeemed }) {
            return {
                title,
                subtitle: `${subtitle || 'Unknown Plan'} - ${redeemed ? 'Redeemed' : 'Pending'}`,
            }
        },
    },
})
