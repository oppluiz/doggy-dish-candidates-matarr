import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
import { anyone } from '@/access/anyone'
import { SinglePageHero } from '@/blocks/SinglePageHero/config'
import { Tabs } from '@/blocks/Tabs/config'
import { HealthSections } from '@/blocks/HealthSections/config'
import { slugField } from '@/fields/slug'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import { ContentBlock } from '@/blocks/ContentBlock/config'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Health: CollectionConfig<'health'> = {
  slug: 'health',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    subHubs: true,
    meta: {
      image: true,
      description: true,
    },
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'updatedAt'],
    group: 'Content Collections',
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : 'health',
          collection: 'health',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : 'health',
        collection: 'health',
        req,
      }),
  },
  fields: [
    {
      name: 'locked',
      label: 'Locked content',
      type: 'checkbox',
    },
    { name: 'title', type: 'text', required: true, defaultValue: 'Health' },
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
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [SinglePageHero, Tabs, HealthSections, ContentBlock],
              required: true,
              admin: { initCollapsed: true },
              defaultValue: [
                {
                  blockType: 'singlePageHero',
                  orientation: 'horizontal',
                  title: 'Health',
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
