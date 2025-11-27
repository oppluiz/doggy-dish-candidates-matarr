import type { Block } from 'payload'

export const ToggledCollections: Block = {
  slug: 'toggledCollections',
  interfaceName: 'ToggledCollectionsBlock',
  labels: {
    singular: 'Toggled Collections',
    plural: 'Toggled Collections',
  },
  fields: [
    {
      name: 'collections',
      type: 'array',
      labels: { singular: 'Collection', plural: 'Collections' },
      minRows: 1,
      maxRows: 5,
      fields: [
        {
          name: 'collection',
          type: 'select',
          label: 'Collection',
          required: true,
          options: [
            { label: 'Food', value: 'food' },
            { label: 'Health', value: 'health' },
            { label: 'How To', value: 'howTo' },
          ],
        },
        {
          name: 'itemCount',
          type: 'number',
          label: 'Number of Items',
          required: true,
          min: 6,
          max: 12,
          defaultValue: 8,
        },
        {
          name: 'fillContent',
          type: 'checkbox',
          label: 'Fill Content',
          defaultValue: false,
          admin: {
            description: 'Duplicate items to fill the specified count if there are not enough items',
          },
        },
      ],
    },
  ],
}