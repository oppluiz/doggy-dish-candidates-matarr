import type { CollectionConfig } from 'payload'
import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from '@/fields/slug'
import { SinglePageHero } from '@/blocks/SinglePageHero/config'
import { Tabs } from '@/blocks/Tabs/config'
import { References } from '@/blocks/References/config'
import { ContentBlock } from '@/blocks/ContentBlock/config'
import { Banner } from '@/blocks/Banner/config'
import { Code } from '@/blocks/Code/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { TabbedContent } from '@/blocks/TabbedContent/config'
import { RecipeHero } from '@/blocks/RecipeHero/config'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import { Author } from '@/blocks/Author/config'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { revalidateRecipe, revalidateDelete } from './Recipes/hooks/revalidateRecipe'

export const Recipes: CollectionConfig = {
  slug: 'recipes',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  defaultPopulate: {
    name: true,
    slug: true,
    categories: true,
    image: true,
  },
  admin: {
    defaultColumns: ['name', 'slug', 'updatedAt'],
    useAsTitle: 'name',
    group: 'Content Collections',
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'recipes',
          req,
        })
        return path
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'recipes',
        req,
      }),
  },
  fields: [
    {
      name: 'locked',
      label: 'Locked content',
      type: 'checkbox',
    },
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
      name: 'subHubs',
      type: 'relationship',
      relationTo: 'subHubs',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'description',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            BlocksFeature({
              blocks: [Banner, Code, MediaBlock, ContentBlock],
            }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            HorizontalRuleFeature(),
          ]
        },
      }),
      label: 'Recipe Description',
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'categories',
              type: 'relationship',
              relationTo: 'categories',
              hasMany: true,
            },
            {
              name: 'layout',
              label: 'Layout',
              type: 'blocks',
              blocks: [
                RecipeHero,
                SinglePageHero,
                Tabs,
                References,
                ContentBlock,
                TabbedContent,
                Author,
              ],
            },
          ],
          label: 'Content',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    ...slugField('name'),
  ],
  timestamps: true,
  hooks: {
    afterChange: [revalidateRecipe],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
