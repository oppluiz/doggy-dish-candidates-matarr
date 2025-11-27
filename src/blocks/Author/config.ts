import type { Block } from 'payload'

export const Author: Block = {
  slug: 'author',
  interfaceName: 'AuthorBlock',
  labels: {
    singular: 'Author',
    plural: 'Authors',
  },
  fields: [
    {
      name: 'containerSize',
      label: 'Container Size',
      type: 'select',
      options: [
        {
          label: 'Default',
          value: 'container',
        },
        {
          label: 'Small',
          value: 'container-small',
        },
      ],
      defaultValue: 'container',
      required: true,
    },
    {
      name: 'displayMode',
      label: 'Display Mode',
      type: 'select',
      options: [
        {
          label: 'Default',
          value: 'default',
        },
        {
          label: 'Recipe',
          value: 'recipe',
        },
      ],
      defaultValue: 'default',
      required: true,
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'authors',
      required: true,
      label: 'Select Author',
    },
  ],
}
