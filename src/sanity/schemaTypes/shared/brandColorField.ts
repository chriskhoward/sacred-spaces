import { defineField } from 'sanity'

export const BRAND_COLORS = [
  { title: 'Purple', value: '#413356' },
  { title: 'Gold', value: '#C7A254' },
  { title: 'Cream', value: '#F6EDC8' },
  { title: 'Gray', value: '#ECECEC' },
  { title: 'Bronze', value: '#553F0F' },
  { title: 'White', value: '#FFFFFF' },
  { title: 'Black', value: '#000000' },
]

export function brandColorField(name: string, title: string) {
  return defineField({
    name,
    title,
    type: 'string',
    options: {
      list: BRAND_COLORS,
    },
  })
}
