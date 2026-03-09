import { defineField } from 'sanity'
import { BRAND_COLORS } from './brandColorField'

const BUTTON_SIZES = [
  { title: 'Extra Small', value: 'xs' },
  { title: 'Small', value: 'sm' },
  { title: 'Base', value: 'base' },
  { title: 'Large', value: 'lg' },
  { title: 'Extra Large', value: 'xl' },
  { title: '2X Large', value: '2xl' },
]

/** Fields for a button preset (used at summit level) */
export function buttonPresetFields(prefix: string, title: string) {
  return defineField({
    name: prefix,
    title,
    type: 'object',
    fields: [
      defineField({
        name: 'bgColor',
        title: 'Background Color',
        type: 'string',
        options: { list: BRAND_COLORS },
      }),
      defineField({
        name: 'textColor',
        title: 'Text Color',
        type: 'string',
        options: { list: BRAND_COLORS },
      }),
      defineField({
        name: 'size',
        title: 'Size',
        type: 'string',
        options: { list: BUTTON_SIZES },
      }),
    ],
  })
}

/** Fields for per-button overrides (used on individual components) */
export function buttonOverrideFields() {
  return [
    defineField({
      name: 'buttonBgColor',
      title: 'Button Background Color (Override)',
      type: 'string',
      options: { list: BRAND_COLORS },
      description: 'Overrides the summit-level button preset.',
    }),
    defineField({
      name: 'buttonTextColor',
      title: 'Button Text Color (Override)',
      type: 'string',
      options: { list: BRAND_COLORS },
      description: 'Overrides the summit-level button preset.',
    }),
    defineField({
      name: 'buttonSize',
      title: 'Button Size (Override)',
      type: 'string',
      options: { list: BUTTON_SIZES },
      description: 'Overrides the summit-level button preset.',
    }),
  ]
}
