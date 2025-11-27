import type { Block } from 'payload'

export const VideoHero: Block = {
  slug: 'VideoHero',
  interfaceName: 'VideoHeroBlock',
  labels: {
    singular: 'Video Hero',
    plural: 'Video Heroes',
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
      name: 'videoUrl',
      type: 'text',
      label: 'Video URL',
      required: true,
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      label: 'Thumbnail Image',
      required: true,
    },
    {
      name: 'tag',
      type: 'text',
      label: 'Tag',
      defaultValue: 'MASTERCLASS',
    },
  ],
}
