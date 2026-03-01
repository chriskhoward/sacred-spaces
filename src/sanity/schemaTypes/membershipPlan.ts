import { defineField, defineType } from 'sanity'
import { DiamondIcon } from '@sanity/icons'

export const membershipPlanType = defineType({
    name: 'membershipPlan',
    title: 'Membership Plan',
    icon: DiamondIcon,
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Plan Name',
            type: 'string',
            description: 'e.g. Collective Core (Founders)',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'isActive',
            title: 'Is Active?',
            type: 'boolean',
            description: 'Only active plans will show up on the /join page.',
            initialValue: true,
        }),
        defineField({
            name: 'featured',
            title: 'Featured (Highlight)',
            type: 'boolean',
            initialValue: false,
        }),
        defineField({
            name: 'displayOrder',
            title: 'Display Order',
            type: 'number',
            initialValue: 0,
        }),
        defineField({
            name: 'benefits',
            title: 'Benefits / Features',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        {
            name: 'pricing',
            title: 'Pricing Configuration',
            type: 'object',
            fields: [
                { name: 'monthlyPrice', title: 'Monthly Price', type: 'number' },
                { name: 'yearlyPrice', title: 'Yearly Price', type: 'number' },
                { name: 'clerkPlanIdMonth', title: 'Clerk Plan ID (Monthly)', type: 'string' },
                { name: 'clerkPlanIdYear', title: 'Clerk Plan ID (Yearly)', type: 'string' },
            ],
            validation: (Rule) => Rule.required(),
        }
    ],
    preview: {
        select: {
            title: 'name',
            monthly: 'pricing.monthlyPrice',
            active: 'isActive'
        },
        prepare({ title, monthly, active }) {
            return {
                title: `${title}${active ? '' : ' [INACTIVE]'}`,
                subtitle: `$${monthly}/mo`
            }
        }
    }
})
