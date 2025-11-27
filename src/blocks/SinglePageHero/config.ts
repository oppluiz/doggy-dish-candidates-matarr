import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const SinglePageHero: Block = {
  slug: 'singlePageHero',
  interfaceName: 'SinglePageHeroBlock',
  labels: {
    singular: 'Single Page Hero',
    plural: 'Single Page Heroes',
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
      name: 'orientation',
      type: 'select',
      label: 'Orientation',
      defaultValue: 'horizontal',
      options: [
        { label: 'Horizontal', value: 'horizontal' },
        { label: 'Vertical', value: 'vertical' },
      ],
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Hero Image',
    },
    // Horizontal layout fields (Collection Hero)
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      admin: {
        condition: (_, siblingData) => siblingData?.orientation === 'horizontal',
      },
    },
    {
      name: 'enableAuthor',
      type: 'checkbox',
      label: 'Show Author',
      defaultValue: true,
      admin: {
        condition: (_, siblingData) => siblingData?.orientation === 'horizontal',
      },
    },
    {
      name: 'authors',
      type: 'relationship',
      relationTo: 'authors',
      label: 'Authors',
      hasMany: true,
      admin: {
        condition: (_, siblingData) =>
          siblingData?.orientation === 'horizontal' && Boolean(siblingData?.enableAuthor),
      },
    },
    // Vertical layout fields (How To Hero)
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      admin: {
        condition: (_, siblingData) => siblingData?.orientation === 'vertical',
      },
    },
    {
      name: 'paragraph',
      type: 'richText',
      label: 'Paragraph',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
      admin: {
        condition: (_, siblingData) => siblingData?.orientation === 'vertical',
      },
    },
  ],
}
