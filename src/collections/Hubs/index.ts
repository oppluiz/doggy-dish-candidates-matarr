import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
import { anyone } from '@/access/anyone'
import { Tabs } from '@/blocks/Tabs/config'
import { ContentBlock } from '@/blocks/ContentBlock/config'
import { slugField } from '@/fields/slug'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { HubHero } from '@/blocks/HubHero/config'
import { IconSlider } from '@/blocks/IconSlider/config'
import { SliderBlock } from '@/blocks/SliderBlock/config'
import { Testimonial } from '@/blocks/Testimonial/config'
import { FeaturedWorkshop } from '@/blocks/FeaturedWorkshop/config'

// Hubs collection: add SliderBlock to available blocks
export const Hubs: CollectionConfig<'hubs'> = {
  slug: 'hubs',
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
          slug: typeof data?.slug === 'string' ? data.slug : 'hub',
          collection: 'hubs',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : 'hub',
        collection: 'hubs',
        req,
      }),
  },
  fields: [
    {
      name: 'locked',
      label: 'Locked content',
      type: 'checkbox',
    },
    { name: 'title', type: 'text', required: true },
    {
      name: 'subHubs',
      type: 'relationship',
      relationTo: 'subHubs',
      hasMany: true,
      admin: { position: 'sidebar' },
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [HubHero, Tabs, ContentBlock, IconSlider, SliderBlock, Testimonial, FeaturedWorkshop],
              required: true,
              admin: { initCollapsed: true },
              defaultValue: [
                {
                  blockType: 'hubHero',
                  containerSize: 'container',
                  backgroundColor: '#41A690',
                  heading: 'Food Hub',
                  subheading: "Science-backed nutrition for your dog's best life",
                  searchPlaceholder: 'Search ingredients, diets, recipes, and more',
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
