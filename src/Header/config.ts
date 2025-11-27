import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'showDividers',
      type: 'checkbox',
      label: 'Show dividers between nav items',
      defaultValue: true,
    },
    {
      name: 'showSearch',
      type: 'checkbox',
      label: 'Show search icon',
      defaultValue: true,
    },
    {
      name: 'showAccount',
      type: 'checkbox',
      label: 'Show account icon',
      defaultValue: true,
    },
    {
      name: 'showLocation',
      type: 'checkbox',
      label: 'Show location icon',
      defaultValue: false,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo Image',
      required: false,
      admin: { description: 'Image shown in the header as the logo' },
    },
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
        {
          name: 'icon',
          type: 'select',
          label: 'Icon',
          admin: {
            description: 'Optional icon shown before the label',
            isClearable: true,
          },
          required: false,
          options: [
            // New icons
            { label: 'Home', value: 'home' },
            { label: 'Health Cross', value: 'health_cross' },
            { label: 'Nutrition', value: 'nutrition' },
            { label: 'Square Play', value: 'square-play' },
            // Legacy icons (keep temporarily to avoid save errors)
            { label: 'Food', value: 'utensils' },
            { label: 'Health', value: 'plus' },
            { label: 'Workshops', value: 'squareStack' },
          ],
        },
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
