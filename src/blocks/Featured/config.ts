import type { Block } from 'payload'

export const Featured: Block = {
  slug: 'featured',
  interfaceName: 'FeaturedBlock',
  labels: {
    singular: 'Featured Block',
    plural: 'Featured Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Featured This Week',
    },
    {
      name: 'items',
      type: 'array',
      minRows: 4,
      maxRows: 4,
      fields: [
        {
          name: 'item',
          type: 'relationship',
          relationTo: ['posts', 'workshops', 'food', 'howTo', 'health'],
          required: true,
        },
      ],
    },
  ],
}