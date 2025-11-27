import type { CollectionConfig } from 'payload'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'

export const Authors: CollectionConfig = {
  slug: 'authors',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'updatedAt'],
    group: 'Auxiliary Collections',
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'author_title',
      type: 'text',
      label: 'Author Title',
    },
    {
      name: 'certifications',
      label: 'Certifications',
      type: 'array',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'type',
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
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'url',
          },
        },
        {
          name: 'file',
          type: 'upload',
          relationTo: 'media',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'file',
          },
        },
      ],
    },
    {
      name: 'description',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
      label: 'Description',
    },
  ],
  timestamps: true,
}
