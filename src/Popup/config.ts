import type { GlobalConfig } from 'payload'
import { revalidatePopup } from './hooks/revalidatePopup'

export const Popup: GlobalConfig = {
  slug: 'popup',
  label: 'Popup',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      label: 'Enable popup',
      defaultValue: false,
    },
    {
      name: 'dismissible',
      type: 'checkbox',
      label: 'Allow closing the popup',
      defaultValue: true,
    },
    // frequency and storageKey removed; popup will be triggered by UI interaction
    {
      name: 'title',
      type: 'text',
      label: 'Title',
    },
    {
      name: 'colored_title_part',
      type: 'text',
      label: 'Colored title part',
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Content',
      // Use the project's default editor configuration
    },
    {
      name: 'plans',
      type: 'array',
      labels: { singular: 'Plan', plural: 'Plans' },
      maxRows: 3,
      admin: { description: 'Pricing cards.' },
      fields: [
        { name: 'name', type: 'text', label: 'Name', required: true },
        { name: 'price', type: 'text', label: 'Price', required: true },
        {
          name: 'features',
          type: 'array',
          labels: { singular: 'Feature', plural: 'Features' },
          fields: [{ name: 'text', type: 'text', label: 'Text', required: true }],
        },
        {
          name: 'ctaLabel',
          type: 'text',
          label: 'CTA Label',
        },
        {
          name: 'ctaUrl',
          type: 'text',
          label: 'CTA URL',
        },
      ],
    },
    {
      name: 'overlayColor',
      type: 'text',
      label: 'Overlay color (CSS color)',
      defaultValue: 'rgba(0,0,0,0.5)',
    },
  ],
  hooks: {
    afterChange: [revalidatePopup],
  },
}
