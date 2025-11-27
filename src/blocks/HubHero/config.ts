import type { Block } from 'payload'

export const HubHero: Block = {
  slug: 'hubHero',
  interfaceName: 'HubHeroBlock',
  labels: {
    singular: 'Hub Hero',
    plural: 'Hub Heroes',
  },
  fields: [
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
      name: 'backgroundColor',
      type: 'text',
      label: 'Background Color (CSS color or HEX)',
      defaultValue: '#41A690',
      required: true,
      admin: {
        description: 'Examples: #41A690, rgb(65,166,144), teal',
      },
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      required: true,
      defaultValue: 'Food Hub',
    },
    {
      name: 'subheading',
      type: 'text',
      label: 'Subheading',
      required: false,
      defaultValue: "Science-backed nutrition for your dog's best life",
    },
    {
      name: 'searchPlaceholder',
      type: 'text',
      label: 'Search Placeholder',
      required: false,
      defaultValue: 'Search ingredients, diets, recipes, and more',
    },
  ],
}
