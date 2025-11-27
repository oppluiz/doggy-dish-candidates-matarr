import type { Block } from 'payload'

export const FeaturedWorkshop: Block = {
  slug: 'featuredWorkshop',
  interfaceName: 'FeaturedWorkshopBlock',
  labels: {
    singular: 'Featured Workshop',
    plural: 'Featured Workshops',
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      label: 'Label',
      defaultValue: 'Featured Collection',
    },
    {
      name: 'containerSize',
      label: 'Container Size',
      type: 'select',
      options: [
        { label: 'Default', value: 'container' },
        { label: 'Small', value: 'container-small' },
      ],
      defaultValue: 'container',
      required: true,
    },
    {
      name: 'workshop',
      type: 'relationship',
      relationTo: 'workshops',
      required: true,
      label: 'Workshop Item',
    },
  ],
}
