import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
  UnorderedListFeature,
  OrderedListFeature,
  BlocksFeature,
  LinkFeature,
  ParagraphFeature,
  BoldFeature,
  ItalicFeature,
} from '@payloadcms/richtext-lexical'

export const TabbedContent: Block = {
  slug: 'tabbedContent',
  interfaceName: 'TabbedContentBlock',
  labels: {
    singular: 'Tabbed Content',
    plural: 'Tabbed Content',
  },
  dbName: 'tabbed_content',
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
      name: 'backgroundColor',
      type: 'text',
      label: 'Background Color',
      defaultValue: '#f8f9fa',
      admin: {
        description:
          'Background color for the tabbed content container (e.g., #f8f9fa, rgba(248, 249, 250, 1))',
      },
    },
    {
      name: 'inactiveTabColor',
      type: 'text',
      label: 'Inactive Tab Color',
      defaultValue: '#6c757d',
      admin: {
        description: 'Color for inactive tabs (e.g., #6c757d, rgba(108, 117, 125, 1))',
      },
    },
    {
      name: 'borderColor',
      type: 'text',
      label: 'Border Color',
      defaultValue: '#dee2e6',
      admin: {
        description:
          'Border color for tabs and content area (e.g., #dee2e6, rgba(222, 226, 230, 1))',
      },
    },
    {
      name: 'tabs',
      type: 'array',
      labels: { singular: 'Tab', plural: 'Tabs' },
      minRows: 1,
      dbName: 'tabs',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Tab Title',
        },
        {
          name: 'enableScale',
          type: 'checkbox',
          label: 'Enable Scale Control',
          defaultValue: false,
        },
        {
          name: 'content',
          type: 'richText',
          label: 'Tab Content',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [
              ...rootFeatures,
              HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
              UnorderedListFeature(),
              OrderedListFeature(),
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
                        required: true,
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
                  {
                    slug: 'table',
                    labels: { singular: 'Table', plural: 'Tables' },
                    fields: [
                      { name: 'heading', type: 'text', label: 'Heading' },
                      { name: 'subheading', type: 'text', label: 'Subheading (italic)' },
                      {
                        name: 'backgroundColor',
                        type: 'text',
                        label: 'Background Color',
                        admin: { description: 'Any CSS color or hex (e.g. #FFF4E5)' },
                      },
                      {
                        name: 'intro',
                        type: 'richText',
                        label: 'Intro Content',
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
                      {
                        type: 'row',
                        fields: [
                          { name: 'tableTitle', type: 'text', label: 'Table Title' },
                          {
                            name: 'tableColor',
                            type: 'text',
                            label: 'Table Color',
                            admin: { description: 'Header/cell background (e.g. #F6A944)' },
                          },
                          {
                            name: 'columnHeadingColor',
                            type: 'text',
                            label: 'Column Heading Color',
                            admin: { description: 'Color for column header cells' },
                          },
                        ],
                      },
                      {
                        name: 'columns',
                        type: 'array',
                        labels: { singular: 'Column', plural: 'Columns' },
                        fields: [
                          { name: 'heading', type: 'text', label: 'Column Heading' },
                          {
                            name: 'type',
                            type: 'select',
                            label: 'Type',
                            options: [
                              { label: 'Text', value: 'text' },
                              { label: 'Input', value: 'input' },
                            ],
                            defaultValue: 'text',
                            required: true,
                          },
                        ],
                      },
                      {
                        name: 'rows',
                        type: 'array',
                        labels: { singular: 'Row', plural: 'Rows' },
                        admin: {
                          description:
                            'Add one cell per column. For input columns, leave the cell empty to render a checkbox.',
                        },
                        fields: [
                          {
                            name: 'cells',
                            type: 'array',
                            labels: { singular: 'Cell', plural: 'Cells' },
                            fields: [{ name: 'value', type: 'text', label: 'Text' }],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    slug: 'alert',
                    labels: { singular: 'Alert Block', plural: 'Alert Blocks' },
                    fields: [
                      {
                        name: 'heading',
                        type: 'text',
                        label: 'Heading',
                        defaultValue: 'IMPORTANT',
                      },
                      {
                        name: 'leftAligned',
                        type: 'checkbox',
                        label: 'Left aligned (double icons)',
                        defaultValue: false,
                      },
                      {
                        name: 'content',
                        type: 'richText',
                        label: 'Paragraph',
                        editor: lexicalEditor({
                          features: ({ rootFeatures }) => [
                            ...rootFeatures,
                            FixedToolbarFeature(),
                            InlineToolbarFeature(),
                          ],
                        }),
                      },
                      {
                        name: 'widthConstraint',
                        type: 'checkbox',
                        label: 'Width constraint',
                        defaultValue: false,
                        admin: {
                          description: 'Constrains the alert to max-width of 1219px and centers it',
                        },
                      },
                      {
                        name: 'fullWidthContent',
                        type: 'checkbox',
                        label: 'Full width content',
                        defaultValue: false,
                        admin: {
                          description: 'Expands content max-width from 594px to 950px',
                        },
                      },
                    ],
                  },
                  {
                    slug: 'collectionItemSlider',
                    labels: {
                      singular: 'Collection Item Slider',
                      plural: 'Collection Item Slider',
                    },
                    fields: [
                      { name: 'heading', type: 'text', label: 'Heading', required: true },
                      {
                        name: 'displayTitleInsideBox',
                        type: 'checkbox',
                        label: 'Display title inside the box',
                        defaultValue: true,
                        admin: {
                          description: 'Displays the title inside the box instead of above it',
                        },
                      },
                      {
                        name: 'widthConstraint',
                        type: 'checkbox',
                        label: 'Width constraint',
                        defaultValue: false,
                        admin: {
                          description:
                            'Constrains the slider to max-width of 1219px and centers it',
                        },
                      },
                      {
                        name: 'usePlaceholders',
                        type: 'checkbox',
                        label: 'Use placeholders',
                        defaultValue: true,
                      },
                      {
                        name: 'placeholderCount',
                        type: 'number',
                        label: 'Placeholder items count',
                        defaultValue: 5,
                        min: 1,
                        admin: { condition: (_, s) => Boolean(s?.usePlaceholders) },
                      },
                      {
                        name: 'placeholderImage',
                        type: 'upload',
                        relationTo: 'media',
                        label: 'Placeholder image',
                        admin: { condition: (_, s) => Boolean(s?.usePlaceholders) },
                      },
                      {
                        name: 'placeholderTitle',
                        type: 'text',
                        label: 'Placeholder title',
                        defaultValue: 'Osteoarthritis',
                        admin: { condition: (_, s) => Boolean(s?.usePlaceholders) },
                      },
                      {
                        name: 'items',
                        type: 'array',
                        labels: { singular: 'Item', plural: 'Items' },
                        admin: { description: 'Add individual collection items.' },
                        fields: [
                          {
                            name: 'reference',
                            type: 'relationship',
                            relationTo: ['pages', 'posts', 'workshops'],
                            required: true,
                          },
                        ],
                      },
                    ],
                  },
                  {
                    slug: 'instagram',
                    labels: { singular: 'Instagram Block', plural: 'Instagram Blocks' },
                    fields: [
                      {
                        name: 'heading',
                        type: 'text',
                        label: 'Heading',
                        defaultValue: 'DID YOU MAKE THIS RECIPE?',
                        required: true,
                      },
                      {
                        name: 'paragraph',
                        type: 'text',
                        label: 'Paragraph',
                        defaultValue: 'Share a pic and tag @thedoggydish on Instagram',
                        required: true,
                      },
                      {
                        name: 'backgroundColor',
                        type: 'text',
                        label: 'Background Color',
                        defaultValue: '#F6A944',
                        admin: {
                          description: 'Background color for the Instagram block (e.g., #F6A944)',
                        },
                      },
                      {
                        name: 'textColor',
                        type: 'text',
                        label: 'Text Color',
                        defaultValue: '#FFFFFF',
                        admin: {
                          description: 'Text color for the Instagram block (e.g., #FFFFFF)',
                        },
                      },
                      {
                        name: 'showIcon',
                        type: 'checkbox',
                        label: 'Show Instagram Icon',
                        defaultValue: true,
                      },
                    ],
                  },
                  {
                    slug: 'checkboxList',
                    labels: { singular: 'Checkbox List', plural: 'Checkbox Lists' },
                    fields: [
                      {
                        name: 'heading',
                        type: 'text',
                        label: 'Heading',
                        defaultValue: 'INGREDIENTS',
                      },
                      {
                        name: 'items',
                        type: 'array',
                        labels: { singular: 'Item', plural: 'Items' },
                        fields: [
                          {
                            name: 'content',
                            type: 'richText',
                            label: 'Text',
                            editor: lexicalEditor({
                              features: () => [
                                ParagraphFeature(),
                                LinkFeature({ enabledCollections: ['pages', 'posts'] }),
                                BoldFeature(),
                                ItalicFeature(),
                                FixedToolbarFeature(),
                                InlineToolbarFeature(),
                              ],
                            }),
                          },
                        ],
                      },
                    ],
                  },
                  {
                    slug: 'instructions',
                    labels: { singular: 'Instructions', plural: 'Instructions' },
                    admin: {
                      description:
                        'Use only one Instructions block per tab. Each block can contain multiple internal tabs.',
                    },
                    fields: [
                      {
                        name: 'tabs',
                        type: 'array',
                        labels: { singular: 'Instruction Tab', plural: 'Instruction Tabs' },
                        minRows: 1,
                        fields: [
                          {
                            name: 'tabLabel',
                            type: 'text',
                            label: 'Tab Label',
                            defaultValue: 'RAW',
                            required: true,
                          },
                          {
                            name: 'title',
                            type: 'text',
                            label: 'Title',
                            defaultValue: 'FOR RAW MEALS:',
                            required: true,
                          },
                          {
                            name: 'sections',
                            type: 'array',
                            labels: { singular: 'Section', plural: 'Sections' },
                            fields: [
                              { name: 'heading', type: 'text', label: 'Heading', required: true },
                              {
                                name: 'rows',
                                type: 'array',
                                labels: { singular: 'Row', plural: 'Rows' },
                                fields: [
                                  {
                                    name: 'content',
                                    type: 'richText',
                                    label: 'Content',
                                    editor: lexicalEditor({
                                      features: () => [
                                        ParagraphFeature(),
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
                      },
                    ],
                  },
                  {
                    slug: 'starList',
                    labels: { singular: 'Star List', plural: 'Star Lists' },
                    fields: [
                      {
                        name: 'items',
                        type: 'array',
                        labels: { singular: 'Row', plural: 'Rows' },
                        fields: [
                          {
                            name: 'content',
                            type: 'richText',
                            label: 'Text',
                            editor: lexicalEditor({
                              features: () => [
                                ParagraphFeature(),
                                FixedToolbarFeature(),
                                InlineToolbarFeature(),
                              ],
                            }),
                          },
                        ],
                      },
                      {
                        name: 'starColor',
                        type: 'text',
                        label: 'Star Color',
                        defaultValue: '#FFA12F',
                      },
                    ],
                  },
                  {
                    slug: 'boxedInformation',
                    labels: { singular: 'Boxed Information', plural: 'Boxed Information' },
                    fields: [
                      {
                        name: 'content',
                        type: 'richText',
                        label: 'Text',
                        editor: lexicalEditor({
                          features: () => [
                            ParagraphFeature(),
                            FixedToolbarFeature(),
                            InlineToolbarFeature(),
                          ],
                        }),
                      },
                    ],
                  },
                  {
                    slug: 'divider',
                    labels: { singular: 'Divider', plural: 'Divider' },
                    fields: [
                      {
                        name: 'color',
                        type: 'text',
                        label: 'Color',
                        defaultValue: '#6B7280',
                        admin: { description: 'Any CSS color or hex (e.g., #6B7280)' },
                      },
                    ],
                  },
                  {
                    slug: 'tag',
                    labels: { singular: 'Tag', plural: 'Tag' },
                    fields: [
                      {
                        name: 'text',
                        type: 'text',
                        label: 'Text',
                        required: true,
                        defaultValue: 'ACTIVE DOG',
                      },
                      {
                        name: 'color',
                        type: 'text',
                        label: 'Color',
                        defaultValue: '#FFA12F',
                        admin: {
                          description: 'Any CSS color or hex (e.g., #FFA12F)',
                        },
                      },
                    ],
                  },
                ],
              }),
            ],
          }),
        },
      ],
    },
  ],
}
