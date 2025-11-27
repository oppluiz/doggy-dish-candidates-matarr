import type { Block } from 'payload'

export const AboutBanner: Block = {
  slug: 'aboutBanner',
  interfaceName: 'AboutBannerBlock',
  labels: {
    singular: 'About - Banner',
    plural: 'About - Banner',
  },
  fields: [
    {
      name: 'heading',
      label: 'Heading',
      type: 'text',
      required: true,
    },
    {
      name: 'subheading',
      label: 'Subheading',
      type: 'text',
      required: true,
    },
  ],
}