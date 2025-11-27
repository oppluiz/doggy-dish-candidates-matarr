import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  HeadingFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const HealthSections: Block = {
  slug: 'healthSections',
  interfaceName: 'HealthSectionsBlock',
  labels: { singular: 'Health Sections', plural: 'Health Sections' },
  fields: [
    {
      name: 'sections',
      dbName: 'sects',
      type: 'array',
      labels: { singular: 'Section', plural: 'Sections' },
      minRows: 1,
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'type',
          type: 'select',
          label: 'Section Type',
          defaultValue: 'richText',
          required: true,
          options: [
            { label: 'Rich Text', value: 'richText' },
            { label: 'Accordion', value: 'accordion' },
            { label: 'Table', value: 'table' },
            { label: 'Content (important + rows)', value: 'content' },
          ],
        },
        { name: 'heading', type: 'text', required: true },
        {
          name: 'anchor',
          type: 'text',
          admin: {
            description:
              'Used as the section ID (e.g. description). Tabs can link to #description.',
          },
        },

        // Table intro rich text (shown above the table)
        {
          name: 'tableOverflow',
          label: 'Table Overflow',
          dbName: 'tbl_overflow',
          type: 'select',
          options: [
            {
              label: 'Default',
              value: 'default',
            },
            {
              label: 'Overflow',
              value: 'overflow',
            },
          ],
          defaultValue: 'default',
          required: true,
        },
        {
          name: 'tableIntro',
          dbName: 'tbl_intro',
          type: 'richText',
          admin: { condition: (_, sib) => sib?.type === 'table' },
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [
              ...rootFeatures,
              HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
              FixedToolbarFeature(),
              InlineToolbarFeature(),
            ],
          }),
          label: 'Intro Content',
        },

        // Table definition
        {
          name: 'columns',
          dbName: 'cols',
          type: 'array',
          admin: { condition: (_, sib) => sib?.type === 'table' },
          labels: { singular: 'Column', plural: 'Columns' },
          minRows: 1,
          fields: [
            { name: 'title', type: 'text', label: 'Heading Text', required: true },
            {
              name: 'columnType',
              dbName: 'col_type',
              type: 'select',
              label: 'Column Type',
              defaultValue: 'text',
              options: [
                { label: 'Text', value: 'text' },
                { label: 'Input', value: 'input' },
              ],
              required: true,
            },
            {
              name: 'inputType',
              dbName: 'in_type',
              type: 'select',
              label: 'Input Type',
              admin: { condition: (_, s) => s?.columnType === 'input' },
              defaultValue: 'checkbox',
              options: [
                { label: 'Checkbox', value: 'checkbox' },
                { label: 'Text', value: 'text' },
                { label: 'Number', value: 'number' },
                { label: 'Textarea', value: 'textarea' },
              ],
            },
          ],
        },
        {
          name: 'tableRows',
          dbName: 'trows',
          type: 'array',
          admin: { condition: (_, sib) => sib?.type === 'table' },
          labels: { singular: 'Row', plural: 'Rows' },
          minRows: 1,
          fields: [
            {
              name: 'cells',
              dbName: 'cls',
              type: 'array',
              labels: { singular: 'Cell', plural: 'Cells' },
              admin: {
                description:
                  'Enter texts for text-type columns in order. Input columns do not need values.',
              },
              fields: [{ name: 'text', type: 'text' }],
            },
          ],
        },

        // Content section parts
        {
          name: 'topContent',
          dbName: 'top_ct',
          type: 'richText',
          admin: { condition: (_, sib) => sib?.type === 'content' },
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [
              ...rootFeatures,
              HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
              FixedToolbarFeature(),
              InlineToolbarFeature(),
            ],
          }),
          label: 'Top Content',
        },
        {
          name: 'enableImportant',
          type: 'checkbox',
          admin: { condition: (_, sib) => sib?.type === 'content' },
          label: 'Show Important Callout',
          defaultValue: false,
        },
        {
          name: 'importantTitle',
          dbName: 'imp_title',
          type: 'text',
          admin: {
            condition: (_, sib) => sib?.type === 'content' && !!sib?.enableImportant,
          },
          label: 'Important Title',
          defaultValue: 'IMPORTANT',
        },
        {
          name: 'importantText',
          dbName: 'imp_text',
          type: 'richText',
          admin: {
            condition: (_, sib) => sib?.type === 'content' && !!sib?.enableImportant,
          },
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [
              ...rootFeatures,
              FixedToolbarFeature(),
              InlineToolbarFeature(),
            ],
          }),
          label: 'Important Content',
        },
        {
          name: 'contentRows',
          dbName: 'crows',
          type: 'array',
          admin: { condition: (_, sib) => sib?.type === 'content' },
          labels: { singular: 'Row', plural: 'Rows' },
          minRows: 1,
          fields: [
            { name: 'leftHeading', type: 'text', label: 'Left Heading', required: true },
            {
              name: 'rightText',
              type: 'richText',
              label: 'Right Content',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => [
                  ...rootFeatures,
                  FixedToolbarFeature(),
                  InlineToolbarFeature(),
                ],
              }),
              required: true,
            },
          ],
        },
        {
          name: 'bottomContent',
          dbName: 'bot_ct',
          type: 'richText',
          admin: { condition: (_, sib) => sib?.type === 'content' },
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [
              ...rootFeatures,
              FixedToolbarFeature(),
              InlineToolbarFeature(),
            ],
          }),
          label: 'Bottom Content',
        },

        // Rich Text content
        {
          name: 'content',
          type: 'richText',
          admin: { condition: (_, sib) => sib?.type === 'richText' },
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [
              ...rootFeatures,
              HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
              FixedToolbarFeature(),
              InlineToolbarFeature(),
            ],
          }),
          label: 'Content',
        },

        // Accordion intro content (optional, shown under heading)
        {
          name: 'accordionIntro',
          dbName: 'acc_intro',
          type: 'richText',
          admin: { condition: (_, sib) => sib?.type === 'accordion' },
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [
              ...rootFeatures,
              FixedToolbarFeature(),
              InlineToolbarFeature(),
            ],
          }),
          label: 'Intro Content',
        },

        // Accordion items
        {
          name: 'items',
          dbName: 'acc_items',
          type: 'array',
          admin: { condition: (_, sib) => sib?.type === 'accordion' },
          labels: { singular: 'Item', plural: 'Items' },
          minRows: 1,
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'subtitle', type: 'text' },
            {
              name: 'icon',
              type: 'select',
              label: 'Icon',
              options: [
                { label: 'Paw', value: 'paw' },
                { label: 'Leaf', value: 'leaf' },
                { label: 'Sparkles', value: 'sparkles' },
                { label: 'Medkit', value: 'medkit' },
                { label: 'Activity', value: 'activity' },
              ],
            },
            {
              name: 'content',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => [
                  ...rootFeatures,
                  FixedToolbarFeature(),
                  InlineToolbarFeature(),
                ],
              }),
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
