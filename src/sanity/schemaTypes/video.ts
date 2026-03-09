import { defineField, defineType } from 'sanity'
import { PlayIcon } from '@sanity/icons'

export const videoType = defineType({
    name: 'video',
    title: 'Video Library',
    icon: PlayIcon,
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Video Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'instructor',
            title: 'Instructor Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'array',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'reference',
            to: [{ type: 'videoCategory' }],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'level',
            title: 'Difficulty Level',
            type: 'string',
            options: {
                list: [
                    { title: 'Beginner', value: 'Beginner' },
                    { title: 'Intermediate', value: 'Intermediate' },
                    { title: 'Advanced', value: 'Advanced' },
                    { title: 'All Levels', value: 'All Levels' },
                ]
            }
        }),
        defineField({
            name: 'duration',
            title: 'Duration (e.g. "45 min")',
            type: 'string',
        }),
        defineField({
            name: 'thumbnail',
            title: 'Thumbnail Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'videoUrl',
            title: 'Video URL (Vimeo/YouTube/S3)',
            type: 'url',
        }),
        defineField({
            name: 'isFeatured',
            title: 'Feature as “New Release”',
            type: 'boolean',
            description: 'When checked, this video appears in the hero “New Release” section at the top of the Video Library. Only one video should be featured at a time.',
            initialValue: false,
        }),
        defineField({
            name: 'isLocked',
            title: 'Premium Member Only?',
            type: 'boolean',
            description: 'If enabled, this video will be locked for non-Pro members.',
            initialValue: false,
        }),
        defineField({
            name: 'targetAudience',
            title: 'Target Audience',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                list: [
                    { title: 'Everyone', value: 'all' },
                    { title: 'Teacher Collective - Core', value: 'teacher_core' },
                    { title: 'Teacher Collective - Pro', value: 'teacher_pro' },
                    { title: 'Sanctuary Collective - Core', value: 'practitioner_core' },
                    { title: 'Sanctuary Collective - Pro', value: 'practitioner_pro' },
                ],
            },
            initialValue: ['all'],
            validation: (Rule) => Rule.required().min(1),
        }),
    ],
})
