import type { Block } from 'payload'

export const SearchLayout: Block = {
  slug: 'searchLayout',
  labels: {
    singular: 'Search',
    plural: 'Search',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      required: true,
      defaultValue: 'SEARCH FOR FOOD, HEALTH CONCERN, AND MORE',
    },
    {
      name: 'placeholder',
      type: 'text',
      label: 'Input Placeholder',
      defaultValue: 'Search...',
    },
  ],
}