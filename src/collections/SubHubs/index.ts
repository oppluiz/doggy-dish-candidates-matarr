import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
import { anyone } from '@/access/anyone'
import { SinglePageHero } from '@/blocks/SinglePageHero/config'
import { Tabs } from '@/blocks/Tabs/config'
import { HealthSections } from '@/blocks/HealthSections/config'
import { ContentBlock } from '@/blocks/ContentBlock/config'
import { CallToAction } from '@/blocks/CallToAction/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { slugField } from '@/fields/slug'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const SubHubs: CollectionConfig<'subHubs'> = {
  slug: 'subHubs',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    category: true,
    collection: true,
    meta: {
      image: true,
      description: true,
    },
    hub: true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'collection', 'hub', 'updatedAt'],
    group: 'Content Collections',
    livePreview: {
      url: ({ data, req }) => {
        const collection = typeof data?.collection === 'string' ? data.collection : 'health'
        const slug = typeof data?.slug === 'string' ? data.slug : 'sub-hub'
        return generatePreviewPath({
          slug: `${collection}/sub-hubs/${slug}`,
          collection: 'pages',
          req,
        })
      },
    },
    preview: (data, { req }) => {
      const collection = typeof data?.collection === 'string' ? data.collection : 'health'
      const slug = typeof data?.slug === 'string' ? data.slug : 'sub-hub'
      return generatePreviewPath({
        slug: `${collection}/sub-hubs/${slug}`,
        collection: 'pages',
        req,
      })
    },
  },
  fields: [
    {
      name: 'locked',
      label: 'Locked content',
      type: 'checkbox',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'collection',
      type: 'select',
      required: true,
      options: [
        { label: 'Health', value: 'health' },
        { label: 'Food', value: 'food' },
        { label: 'How To', value: 'howTo' },
        { label: 'Recipes', value: 'recipes' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Which collection this sub-hub belongs to',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    {
      name: 'hub',
      type: 'relationship',
      relationTo: 'hubs',
      required: false,
      admin: {
        position: 'sidebar',
        description: 'Relates this Sub Hub to its parent Hub',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [
                SinglePageHero,
                Tabs,
                HealthSections,
                ContentBlock,
                CallToAction,
                MediaBlock,
              ],
              required: true,
              admin: { initCollapsed: true },
              defaultValue: [
                {
                  blockType: 'singlePageHero',
                  orientation: 'horizontal',
                  enableAuthor: true,
                },
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
    ...slugField(),
  ],
  versions: {
    drafts: { autosave: { interval: 100 }, schedulePublish: true },
    maxPerDoc: 20,
  },
  timestamps: true,
}
