import { defineField } from 'sanity'
import { BRAND_COLORS } from './brandColorField'

const PADDING_PRESETS = [
  { title: 'None', value: 'none' },
  { title: 'Tight', value: 'tight' },
  { title: 'Normal', value: 'normal' },
  { title: 'Loose', value: 'loose' },
  { title: 'Extra Loose', value: 'extra-loose' },
]

export function sectionStyleFields() {
  return [
    defineField({
      name: 'sectionBgColor',
      title: 'Section Background Color',
      type: 'string',
      options: { list: BRAND_COLORS },
    }),
    defineField({
      name: 'sectionPadding',
      title: 'Section Padding',
      type: 'string',
      options: { list: PADDING_PRESETS },
    }),
    defineField({
      name: 'sectionPaddingCustom',
      title: 'Custom Padding (overrides preset)',
      type: 'string',
      description: 'CSS value, e.g. "80px", "5rem". Applied as top and bottom padding.',
    }),
  ]
}
