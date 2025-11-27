import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const IngredientTabs: Block = {
  slug: 'ingredientTabs',
  interfaceName: 'IngredientTabsBlock',
  labels: { singular: 'Ingredient Tabs', plural: 'Ingredient Tabs' },
  fields: [
    {
      name: 'benefits',
      type: 'richText',
      label: 'Benefits',
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
    {
      name: 'servingSizeHeading',
      type: 'text',
      label: 'Serving Size Heading',
      defaultValue: 'SERVING SIZE',
    },
    {
      name: 'servingSizeItems',
      type: 'array',
      label: 'Serving Size Items',
      minRows: 1,
      maxRows: 5,
      labels: { singular: 'Item', plural: 'Items' },
      fields: [
        { name: 'heading', type: 'text', label: 'Heading', required: true },
        { name: 'portion', type: 'text', label: 'Portion Text', required: true },
      ],
    },
    {
      name: 'frequency',
      type: 'richText',
      label: 'Frequency',
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
    {
      name: 'howToServe',
      type: 'richText',
      label: 'How To Serve',
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
    {
      name: 'enableWarning',
      type: 'checkbox',
      label: 'Enable Warning Box',
      defaultValue: false,
    },
    {
      name: 'warningHeading',
      type: 'text',
      label: 'Warning Heading',
      admin: { condition: (_, { enableWarning }) => Boolean(enableWarning) },
      defaultValue: 'IMPORTANT',
    },
    {
      name: 'warningText',
      type: 'text',
      label: 'Warning Text',
      admin: { condition: (_, { enableWarning }) => Boolean(enableWarning) },
      required: false,
    },
  ],
}