import type { Block } from 'payload'

export const AboutTextImage: Block = {
  slug: 'aboutTextImage',
  interfaceName: 'AboutTextImageBlock',
  labels: { singular: 'About - Text and Image', plural: 'About - Text and Image' },
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
      name: 'content',
      label: 'Content',
      type: 'richText',
      required: true,
    },
    {
      name: 'imageTop',
      label: 'Top Image',
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
      name: 'imageBottom',
      label: 'Bottom Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'showSparkle',
      label: 'Show Sparkle Icon',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}