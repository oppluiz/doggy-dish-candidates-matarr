import type { Block } from 'payload'

export const Tabs: Block = {
  slug: 'tabs',
  interfaceName: 'TabsBlock',
  labels: {
    singular: 'Tabs',
    plural: 'Tabs',
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
      name: 'tabsGap',
      label: 'Tabs Gap',
      type: 'select',
      options: [
        {
          label: 'Default',
          value: 'default',
        },
        {
          label: 'Small',
          value: 'small',
        },
      ],
      defaultValue: 'default',
      required: true,
    },
    {
      name: 'tabsPadding',
      label: 'Tabs Padding',
      type: 'select',
      options: [
        {
          label: 'Default',
          value: 'default',
        },
        {
          label: 'Small',
          value: 'small',
        },
      ],
      defaultValue: 'default',
      required: true,
    },
    {
      name: 'tabs',
      type: 'array',
      labels: { singular: 'Tab', plural: 'Tabs' },
      minRows: 1,
      fields: [
        { name: 'title', type: 'text', required: true },
        {
          name: 'anchor',
          type: 'text',
          label: 'Anchor To',
          required: true,
        },
      ],
    },
  ],
}
