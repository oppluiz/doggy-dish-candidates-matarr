import type { Block } from 'payload'

export const AboutHero: Block = {
  slug: 'aboutHero',
  interfaceName: 'AboutHeroBlock',
  labels: {
    singular: 'About Hero',
    plural: 'About Heroes',
  },
  fields: [
    {
      name: 'heading',
      label: 'Heading',
      type: 'text',
      required: true,
    },
    {
      name: 'accentWord',
      label: 'Accent Word',
      type: 'text',
      admin: {
        description: 'Exact word in the heading to accent (case-insensitive).',
      },
    },
    {
      name: 'imageLeft',
      label: 'Left Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'imageCenter',
      label: 'Center Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'imageRight',
      label: 'Right Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'showArrow',
      label: 'Show Down Arrow',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}