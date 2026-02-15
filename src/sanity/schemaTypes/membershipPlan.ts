import { defineField, defineType } from 'sanity'

export const membershipPlanType = defineType({
    name: 'membershipPlan',
    title: 'Membership Plan',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Plan Name',
            type: 'string',
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
                { name: 'monthlyPrice', title: 'Monthly Price (Regular)', type: 'number' },
                { name: 'yearlyPrice', title: 'Yearly Price (Regular)', type: 'number' },
                { name: 'clerkPlanIdMonth', title: 'Clerk Plan ID (Monthly)', type: 'string' },
                { name: 'clerkPlanIdYear', title: 'Clerk Plan ID (Yearly)', type: 'string' },
            ]
        },
        {
            name: 'foundersPricing',
            title: 'Founders Pricing (Promotional)',
            type: 'object',
            fields: [
                { name: 'isActive', title: 'Is Founders Active?', type: 'boolean', initialValue: false },
                { name: 'monthlyPrice', title: 'Monthly Price (Founders)', type: 'number' },
                { name: 'yearlyPrice', title: 'Yearly Price (Founders)', type: 'number' },
                { name: 'clerkPlanIdMonth', title: 'Clerk Plan ID (Founders Monthly)', type: 'string' },
                { name: 'clerkPlanIdYear', title: 'Clerk Plan ID (Founders Yearly)', type: 'string' },
            ]
        }
    ],
    preview: {
        select: {
            title: 'name',
            monthly: 'pricing.monthlyPrice',
            founders: 'foundersPricing.monthlyPrice',
            isActive: 'foundersPricing.isActive'
        },
        prepare({ title, monthly, founders, isActive }) {
            return {
                title,
                subtitle: isActive ? `Founders Active ($${founders})` : `$${monthly}/mo`
            }
        }
    }
})
