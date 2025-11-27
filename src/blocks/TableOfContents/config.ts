import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const TableOfContents: Block = {
  slug: 'tableOfContents',
  labels: {
    singular: 'Table of Contents',
    plural: 'Table of Contents',
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
      name: 'heading',
      type: 'text',
      label: 'Heading',
      required: true,
    },
    {
      name: 'rows',
      type: 'array',
      label: 'Rows',
      minRows: 1,
      labels: {
        singular: 'Row',
        plural: 'Rows',
      },
      fields: [
        {
          name: 'heading',
          type: 'text',
          label: 'Row Heading',
          required: true,
        },
        {
          name: 'time',
          type: 'text',
          label: 'Time',
          required: true,
          admin: { placeholder: 'e.g. 07:00' },
          validate: (value?: string | string[] | null) => {
            const val = Array.isArray(value) ? value[0] : value
            if (!val) return 'Time is required'
            const ok = typeof val === 'string' && /^([01]\d|2[0-3]):[0-5]\d$/.test(val)
            return ok || 'Use HH:MM (00–23:00–59)'
          },
          defaultValue: '07:00',
        },
      ],
      admin: {
        initCollapsed: true,
      },
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Description',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
      admin: {
        description: 'Optional description shown below the table of contents.',
      },
    },
    {
      name: 'resources',
      type: 'array',
      label: 'Resources',
      labels: { singular: 'Resource', plural: 'Resources' },
      maxRows: 4,
      admin: {
        description: 'Select up to four items from any collection.',
      },
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
}
