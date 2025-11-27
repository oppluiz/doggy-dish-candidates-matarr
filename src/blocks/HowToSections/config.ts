import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const HowToSections: Block = {
  slug: 'howToSections',
  labels: {
    singular: 'How To Sections',
    plural: 'How To Sections',
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
    // Section 1: Resources (max 4)
    {
      name: 'resources',
      type: 'array',
      labels: {
        singular: 'Resource',
        plural: 'Resources',
      },
      admin: { initCollapsed: true },
      maxRows: 4,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        { name: 'title', type: 'text', required: true },
        {
          name: 'linkType',
          type: 'select',
          defaultValue: 'url',
          options: [
            { label: 'URL', value: 'url' },
            { label: 'File', value: 'file' },
          ],
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          admin: { condition: (_, s) => s?.linkType === 'url' },
        },
        {
          name: 'file',
          type: 'upload',
          relationTo: 'media',
          admin: { condition: (_, s) => s?.linkType === 'file' },
        },
      ],
    },

    // Section 2: Steps repeater
    {
      name: 'steps',
      type: 'array',
      labels: { singular: 'Step', plural: 'Steps' },
      admin: { initCollapsed: true },
      fields: [
        { name: 'heading', type: 'text', required: true },
        {
          name: 'swapColumns',
          type: 'checkbox',
          label: 'Image on left',
          defaultValue: false,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'mobile_image',
          type: 'upload',
          label: 'Mobile image',
          relationTo: 'media',
        },
        // Layout controls
        {
          name: 'columnsProportion',
          label: 'Columns proportion (12 grid)',
          type: 'select',
          options: [
            {
              label: '6 / 6',
              value: '6-6',
            },
            {
              label: '7 / 5',
              value: '7-5',
            },
          ],
          defaultValue: '7-5',
          required: true,
        },
        {
          name: 'tipMaxWidthPx',
          type: 'number',
          label: 'Tip max width (px)',
          admin: { description: 'Maximum width for the Pro tip / Important box.' },
        },
        {
          name: 'useContentRepeater',
          type: 'checkbox',
          label: 'Use repeater instead of RichText',
          defaultValue: false,
        },
        {
          name: 'richText',
          type: 'richText',
          admin: { condition: (_, s) => !s?.useContentRepeater },
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [
              ...rootFeatures,
              FixedToolbarFeature(),
              InlineToolbarFeature(),
            ],
          }),
        },
        {
          name: 'contentRows',
          type: 'array',
          admin: { condition: (_, s) => !!s?.useContentRepeater },
          labels: { singular: 'Row', plural: 'Rows' },
          fields: [
            { name: 'title', type: 'text', required: true },
            {
              name: 'paragraph',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => [
                  ...rootFeatures,
                  FixedToolbarFeature(),
                  InlineToolbarFeature(),
                ],
              }),
            },
          ],
        },
        {
          name: 'tooltipEnabled',
          type: 'checkbox',
          label: 'Enable tooltip',
          defaultValue: false,
        },
        {
          name: 'tooltipVariant',
          type: 'select',
          defaultValue: 'proTip',
          options: [
            { label: 'Pro tip', value: 'proTip' },
            { label: 'Important', value: 'important' },
          ],
          admin: { condition: (_, s) => !!s?.tooltipEnabled },
        },
        {
          name: 'tooltipText',
          type: 'richText',
          admin: { condition: (_, s) => !!s?.tooltipEnabled },
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [
              ...rootFeatures,
              FixedToolbarFeature(),
              InlineToolbarFeature(),
            ],
          }),
        },
        {
          name: 'useListIndentation',
          type: 'checkbox',
          label: 'Use list indentation',
          defaultValue: false,
          admin: {
            description: 'Adds 3.5rem padding-left to bullet lists on desktop',
          },
        },
      ],
    },
  ],
}
