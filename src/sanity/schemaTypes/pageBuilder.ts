import { defineField, defineType } from 'sanity'

// Hero Block
export const heroBlock = defineType({
  name: 'heroBlock',
  title: 'Hero',
  type: 'object',
  fields: [
    defineField({ name: 'badge', title: 'Badge Text', type: 'string' }),
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'subtitle', title: 'Subtitle', type: 'text' }),
    defineField({ name: 'image', title: 'Hero Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'primaryButtonText', title: 'Primary Button Text', type: 'string' }),
    defineField({
      name: 'primaryButtonLink',
      title: 'Primary Button Link',
      type: 'string',
      description: 'Internal path (e.g., /sign-up) or external URL (e.g., https://example.com)'
    }),
    defineField({ name: 'secondaryButtonText', title: 'Secondary Button Text', type: 'string' }),
    defineField({
      name: 'secondaryButtonLink',
      title: 'Secondary Button Link',
      type: 'string',
      description: 'Internal path (e.g., /about) or external URL'
    }),
    defineField({
      name: 'secondaryImage',
      title: 'Secondary/Overlay Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Used for decorative overlays or background textures'
    }),
  ]
})

// Brand/Quote Block
export const brandBlock = defineType({
  name: 'brandBlock',
  title: 'Brand Message / Quote',
  type: 'object',
  fields: [
    defineField({ name: 'quote', title: 'Quote', type: 'text' }),
    defineField({ name: 'body', title: 'Body Text', type: 'text' }),
  ]
})

// Pillars Block
export const pillarsBlock = defineType({
  name: 'pillarsBlock',
  title: 'Pillars of Transformation',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Section Heading', type: 'string' }),
    defineField({ name: 'subheading', title: 'Section Subheading', type: 'string' }),
    defineField({ name: 'description', title: 'Section Description', type: 'text' }),
    defineField({
      name: 'items',
      title: 'Pillar Items',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Title', type: 'string' }),
          defineField({ name: 'description', title: 'Description', type: 'text' }),
          defineField({ name: 'icon', title: 'Icon (Emoji)', type: 'string' }),
        ]
      }]
    })
  ]
})

// Benefits Block
export const benefitsBlock = defineType({
  name: 'benefitsBlock',
  title: 'Benefits Section',
  type: 'object',
  fields: [
    defineField({ name: 'badge', title: 'Badge Text', type: 'string' }),
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ name: 'buttonText', title: 'Button Text', type: 'string' }),
    defineField({
      name: 'items',
      title: 'Benefit Items',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Title', type: 'string' }),
          defineField({ name: 'description', title: 'Description', type: 'text' }),
        ]
      }]
    })
  ]
})

// Media + Text Block
export const mediaTextBlock = defineType({
  name: 'mediaTextBlock',
  title: 'Media + Text',
  type: 'object',
  fields: [
    defineField({ name: 'badge', title: 'Badge Text', type: 'string' }),
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ 
      name: 'body', 
      title: 'Body Content', 
      type: 'array', 
      of: [{ type: 'block' }] 
    }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
    defineField({ 
      name: 'imagePosition', 
      title: 'Image Position', 
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' },
        ],
        layout: 'radio'
      },
      initialValue: 'left'
    }),
  ]
})

// Showcase Image Block
export const imageBlock = defineType({
  name: 'imageBlock',
  title: 'Showcase Image/Gallery',
  type: 'object',
  fields: [
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'caption', title: 'Caption', type: 'string' }),
    defineField({ 
      name: 'fullWidth', 
      title: 'Full Width', 
      type: 'boolean',
      initialValue: true 
    }),
  ]
})

// Video Block
export const videoBlock = defineType({
  name: 'videoBlock',
  title: 'Video Embed',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'url', title: 'Video URL (YouTube/Vimeo)', type: 'url' }),
  ]
})

// Testimonials Block
export const testimonialBlock = defineType({
  name: 'testimonialBlock',
  title: 'Testimonials',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({
      name: 'items',
      title: 'Testimonials',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'quote', title: 'Quote', type: 'text' }),
          defineField({ name: 'author', title: 'Author Name', type: 'string' }),
          defineField({ name: 'role', title: 'Role/Title', type: 'string' }),
          defineField({ name: 'image', title: 'Author Image', type: 'image', options: { hotspot: true } }),
        ]
      }]
    })
  ]
})

// Team Block
export const teamBlock = defineType({
  name: 'teamBlock',
  title: 'Leadership Team',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({
      name: 'members',
      title: 'Team Members',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'name', title: 'Name', type: 'string' }),
          defineField({ name: 'role', title: 'Role', type: 'string' }),
          defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
        ]
      }]
    })
  ]
})

// Rich Text Block
export const richTextBlock = defineType({
  name: 'richTextBlock',
  title: 'Rich Text Section',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading (Optional)', type: 'string' }),
    defineField({
      name: 'body',
      title: 'Body Text',
      type: 'array',
      of: [{ type: 'block' }]
    }),
  ]
})

// CTA Block
export const ctaBlock = defineType({
  name: 'ctaBlock',
  title: 'Call to Action',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ name: 'buttonText', title: 'Button Text', type: 'string' }),
    defineField({ name: 'buttonLink', title: 'Button Link', type: 'string', description: 'Internal (e.g. /sign-up) or External URL' }),
  ]
})

// FAQ Block
export const faqBlock = defineType({
  name: 'faqBlock',
  title: 'FAQ Section',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({
      name: 'items',
      title: 'FAQ Items',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'question', title: 'Question', type: 'string' }),
          defineField({ name: 'answer', title: 'Answer', type: 'text' }),
        ]
      }]
    })
  ]
})
