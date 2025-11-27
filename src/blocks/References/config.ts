import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const References: Block = {
  slug: 'References',
  interfaceName: 'ReferencesBlock',
  labels: {
    singular: 'References',
    plural: 'References',
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
      name: 'title',
      type: 'text',
      label: 'Title',
      defaultValue: 'REFERENCES',
      required: true,
    },
    {
      name: 'widthConstraint',
      type: 'checkbox',
      label: 'Width constraint',
      defaultValue: false,
      admin: {
        description:
          'Constrains the content to max-width of 1219px and centers it while keeping border full width',
      },
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Content',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
      required: true,
    },
  ],
}
