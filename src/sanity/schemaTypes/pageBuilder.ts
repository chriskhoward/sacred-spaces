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

// Empathy Section Block - For "What if you could..." and "I see you" sections
export const empathySectionBlock = defineType({
  name: 'empathySectionBlock',
  title: 'Empathy Section',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({
      name: 'items',
      title: 'Bullet Points',
      type: 'array',
      of: [{ type: 'text' }],
      description: 'Each item becomes a styled bullet point'
    }),
    defineField({
      name: 'style',
      title: 'Section Style',
      type: 'string',
      options: {
        list: [
          { title: 'Light (White background)', value: 'light' },
          { title: 'Dark (Primary background)', value: 'dark' },
        ],
        layout: 'radio'
      },
      initialValue: 'light'
    }),
    defineField({ name: 'buttonText', title: 'Button Text (Optional)', type: 'string' }),
    defineField({ name: 'buttonLink', title: 'Button Link', type: 'string' }),
  ]
})

// Highlight Text Block - For large emphasized statements
export const highlightTextBlock = defineType({
  name: 'highlightTextBlock',
  title: 'Highlight Text Section',
  type: 'object',
  fields: [
    defineField({
      name: 'statements',
      title: 'Statements',
      type: 'array',
      of: [{ type: 'text' }],
      description: 'Each statement is displayed prominently'
    }),
    defineField({
      name: 'style',
      title: 'Section Style',
      type: 'string',
      options: {
        list: [
          { title: 'Light (White background)', value: 'light' },
          { title: 'Dark (Primary background)', value: 'dark' },
          { title: 'Cream (Gallery background)', value: 'cream' },
        ],
        layout: 'radio'
      },
      initialValue: 'light'
    }),
  ]
})

// Feature Grid Block - For 4-column membership features
export const featureGridBlock = defineType({
  name: 'featureGridBlock',
  title: 'Feature Grid',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading (Optional)', type: 'string' }),
    defineField({ name: 'subheading', title: 'Subheading (Optional)', type: 'string' }),
    defineField({
      name: 'items',
      title: 'Feature Items',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Title', type: 'string' }),
          defineField({ name: 'description', title: 'Description', type: 'text' }),
          defineField({ name: 'icon', title: 'Icon (Emoji)', type: 'string' }),
        ]
      }]
    }),
    defineField({
      name: 'style',
      title: 'Section Style',
      type: 'string',
      options: {
        list: [
          { title: 'Light (White background)', value: 'light' },
          { title: 'Cream (Gallery background)', value: 'cream' },
        ],
        layout: 'radio'
      },
      initialValue: 'light'
    }),
  ]
})

// Premium Features Block - For premium member benefits with icons
export const premiumFeaturesBlock = defineType({
  name: 'premiumFeaturesBlock',
  title: 'Premium Features List',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({
      name: 'items',
      title: 'Feature Items',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Title', type: 'string' }),
          defineField({ name: 'description', title: 'Description', type: 'text' }),
        ]
      }]
    }),
    defineField({ name: 'buttonText', title: 'Button Text (Optional)', type: 'string' }),
    defineField({ name: 'buttonLink', title: 'Button Link', type: 'string' }),
  ]
})

// Founder Bio Block - For founder/about section with image
export const founderBioBlock = defineType({
  name: 'founderBioBlock',
  title: 'Founder Bio Section',
  type: 'object',
  fields: [
    defineField({ name: 'badge', title: 'Badge Text', type: 'string' }),
    defineField({ name: 'name', title: 'Name', type: 'string' }),
    defineField({ name: 'title', title: 'Title/Role', type: 'string' }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [{ type: 'block' }]
    }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'closingText', title: 'Closing Text', type: 'text' }),
    defineField({ name: 'buttonText', title: 'Button Text', type: 'string' }),
    defineField({ name: 'buttonLink', title: 'Button Link', type: 'string' }),
  ]
})

// Text CTA Block - Simple centered text with CTA button
export const textCtaBlock = defineType({
  name: 'textCtaBlock',
  title: 'Text + CTA Section',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'body', title: 'Body Text', type: 'text' }),
    defineField({ name: 'buttonText', title: 'Button Text', type: 'string' }),
    defineField({ name: 'buttonLink', title: 'Button Link', type: 'string' }),
    defineField({
      name: 'style',
      title: 'Section Style',
      type: 'string',
      options: {
        list: [
          { title: 'Light (White background)', value: 'light' },
          { title: 'Dark (Primary background)', value: 'dark' },
          { title: 'Cream (Gallery background)', value: 'cream' },
        ],
        layout: 'radio'
      },
      initialValue: 'light'
    }),
    defineField({
      name: 'size',
      title: 'Text Size',
      type: 'string',
      options: {
        list: [
          { title: 'Normal', value: 'normal' },
          { title: 'Large', value: 'large' },
        ],
        layout: 'radio'
      },
      initialValue: 'normal'
    }),
  ]
})

// Checklist Block - For "This Sanctuary is for you if..." sections
export const checklistBlock = defineType({
  name: 'checklistBlock',
  title: 'Checklist Section',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({
      name: 'items',
      title: 'Checklist Items',
      type: 'array',
      of: [{ type: 'text' }]
    }),
    defineField({ name: 'closingText', title: 'Closing Text', type: 'string' }),
    defineField({ name: 'buttonText', title: 'Button Text', type: 'string' }),
    defineField({ name: 'buttonLink', title: 'Button Link', type: 'string' }),
  ]
})

// Intro Text Block - Simple centered intro/tagline section
export const introTextBlock = defineType({
  name: 'introTextBlock',
  title: 'Intro Text Section',
  type: 'object',
  fields: [
    defineField({
      name: 'lines',
      title: 'Text Lines',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Each line will be displayed with a line break'
    }),
    defineField({
      name: 'style',
      title: 'Style',
      type: 'string',
      options: {
        list: [
          { title: 'Light (White background)', value: 'light' },
          { title: 'Cream (Gallery background)', value: 'cream' },
        ],
        layout: 'radio'
      },
      initialValue: 'light'
    }),
  ]
})

// Prose Section Block - For longer descriptive text sections
export const proseSectionBlock = defineType({
  name: 'proseSectionBlock',
  title: 'Prose Section',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({
      name: 'paragraphs',
      title: 'Paragraphs',
      type: 'array',
      of: [{ type: 'text' }]
    }),
    defineField({
      name: 'style',
      title: 'Style',
      type: 'string',
      options: {
        list: [
          { title: 'Light (White background)', value: 'light' },
          { title: 'Cream (Gallery background)', value: 'cream' },
        ],
        layout: 'radio'
      },
      initialValue: 'cream'
    }),
  ]
})

// Two Column Compare Block - For "Why Flow in Faith Exists" style sections
export const twoColumnCompareBlock = defineType({
  name: 'twoColumnCompareBlock',
  title: 'Two Column Compare',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'leftIntro', title: 'Left Column Intro', type: 'string' }),
    defineField({
      name: 'leftItems',
      title: 'Left Column Items (Problems)',
      type: 'array',
      of: [{ type: 'string' }]
    }),
    defineField({ name: 'rightHeading', title: 'Right Column Heading', type: 'string' }),
    defineField({ name: 'rightIntro', title: 'Right Column Intro', type: 'string' }),
    defineField({
      name: 'rightItems',
      title: 'Right Column Items (Solutions)',
      type: 'array',
      of: [{ type: 'string' }]
    }),
    defineField({ name: 'closingText', title: 'Closing Text', type: 'text' }),
  ]
})

// Space Cards Block - For "Our Two Sacred Spaces" style sections
export const spaceCardsBlock = defineType({
  name: 'spaceCardsBlock',
  title: 'Space Cards Section',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'subheading', title: 'Subheading', type: 'text' }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Title', type: 'string' }),
          defineField({ name: 'badge', title: 'Badge/Tagline', type: 'string' }),
          defineField({ name: 'description', title: 'Description', type: 'text' }),
          defineField({
            name: 'bulletPoints',
            title: 'Bullet Points (Optional)',
            type: 'array',
            of: [{ type: 'string' }]
          }),
          defineField({ name: 'closingText', title: 'Closing Text (Italic)', type: 'string' }),
          defineField({ name: 'buttonText', title: 'Button Text', type: 'string' }),
          defineField({ name: 'buttonLink', title: 'Button Link', type: 'string' }),
          defineField({
            name: 'buttonStyle',
            title: 'Button Style',
            type: 'string',
            options: {
              list: [
                { title: 'Primary', value: 'primary' },
                { title: 'Secondary', value: 'secondary' },
              ],
              layout: 'radio'
            },
            initialValue: 'primary'
          }),
        ]
      }]
    }),
  ]
})

// Path Chooser Block - For "Choose Your Path" style sections
export const pathChooserBlock = defineType({
  name: 'pathChooserBlock',
  title: 'Path Chooser Section',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'intro', title: 'Intro Text', type: 'string' }),
    defineField({
      name: 'options',
      title: 'Path Options',
      type: 'array',
      of: [{ type: 'string' }]
    }),
    defineField({ name: 'closingText', title: 'Closing Text', type: 'string' }),
    defineField({
      name: 'buttons',
      title: 'CTA Buttons',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'text', title: 'Button Text', type: 'string' }),
          defineField({ name: 'link', title: 'Button Link', type: 'string' }),
          defineField({
            name: 'style',
            title: 'Button Style',
            type: 'string',
            options: {
              list: [
                { title: 'Primary', value: 'primary' },
                { title: 'Secondary', value: 'secondary' },
              ],
              layout: 'radio'
            },
            initialValue: 'primary'
          }),
        ]
      }]
    }),
  ]
})

// Closing Statement Block - For branded closing statements
export const closingStatementBlock = defineType({
  name: 'closingStatementBlock',
  title: 'Closing Statement Section',
  type: 'object',
  fields: [
    defineField({
      name: 'lines',
      title: 'Statement Lines',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'text', title: 'Text', type: 'string' }),
          defineField({
            name: 'style',
            title: 'Style',
            type: 'string',
            options: {
              list: [
                { title: 'Normal', value: 'normal' },
                { title: 'Bold', value: 'bold' },
                { title: 'Highlight (Gold)', value: 'highlight' },
                { title: 'Large Highlight', value: 'largeHighlight' },
              ],
              layout: 'radio'
            },
            initialValue: 'normal'
          }),
        ]
      }]
    }),
  ]
})
