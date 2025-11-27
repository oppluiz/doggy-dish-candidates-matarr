import type { TextFieldSingleValidation } from 'payload'
import {
  BoldFeature,
  ItalicFeature,
  LinkFeature,
  ParagraphFeature,
  lexicalEditor,
  UnderlineFeature,
  type LinkFields,
  UnorderedListFeature,
  OrderedListFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
  BlocksFeature,
} from '@payloadcms/richtext-lexical'

export const defaultLexical = lexicalEditor({
  features: ({ rootFeatures }) => [
    ParagraphFeature(),
    UnderlineFeature(),
    BoldFeature(),
    ItalicFeature(),
    LinkFeature({
      enabledCollections: ['pages', 'posts'],
      fields: ({ defaultFields }) => {
        const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
          if ('name' in field && field.name === 'url') return false
          return true
        })

        return [
          ...defaultFieldsWithoutUrl,
          {
            name: 'url',
            type: 'text',
            admin: {
              condition: (_data, siblingData) => siblingData?.linkType !== 'internal',
            },
            label: ({ t }) => t('fields:enterURL'),
            required: true,
            validate: ((value, options) => {
              if ((options?.siblingData as LinkFields)?.linkType === 'internal') {
                return true // no validation needed, as no url should exist for internal links
              }
              return value ? true : 'URL is required'
            }) as TextFieldSingleValidation,
          },
        ]
      },
    }),
    // Enable lists globally so toolbar/slash menu appear everywhere
    UnorderedListFeature(),
    OrderedListFeature(),
    // Ensure toolbars are available to show list controls
    FixedToolbarFeature(),
    InlineToolbarFeature(),
    BlocksFeature({
      blocks: [
        {
          slug: 'accordion',
          labels: { singular: 'Accordion', plural: 'Accordions' },
          fields: [
            {
              name: 'items',
              type: 'array',
              labels: { singular: 'Item', plural: 'Items' },
              fields: [
                { name: 'heading', type: 'text', required: true, label: 'Heading' },
                {
                  name: 'content',
                  type: 'richText',
                  label: 'Content',
                  editor: lexicalEditor({
                    features: ({ rootFeatures }) => [
                      ...rootFeatures,
                      UnorderedListFeature(),
                      OrderedListFeature(),
                      FixedToolbarFeature(),
                      InlineToolbarFeature(),
                    ],
                  }),
                },
              ],
            },
          ],
        },
      ],
    }),
  ],
})
