import type { Block } from 'payload'

export const OnboardingChecklist: Block = {
  slug: 'onboardingChecklist',
  labels: {
    singular: 'Onboarding checklist',
    plural: 'Onboarding checklist',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      required: true,
      defaultValue: 'ONBOARDING CHECKLIST',
    },
    {
      name: 'populateBy',
      type: 'select',
      label: 'Populate Recipes By',
      defaultValue: 'recent',
      options: [
        { label: 'Most Recent (2)', value: 'recent' },
        { label: 'Manual Selection (2)', value: 'manual' },
      ],
      required: true,
    },
    {
      name: 'items',
      type: 'array',
      labels: { singular: 'Item', plural: 'Items' },
      maxRows: 2,
      admin: {
        condition: (_, s) => s?.populateBy === 'manual',
        description: 'Pick exactly two recipes (posts).',
      },
      fields: [
        {
          name: 'reference',
          type: 'relationship',
          relationTo: ['posts'],
          required: true,
        },
      ],
    },
    {
      name: 'usePlaceholders',
      type: 'checkbox',
      label: 'Use placeholders',
      defaultValue: false,
    },
    {
      name: 'placeholderText',
      type: 'text',
      label: 'Placeholder title',
      defaultValue: 'Recipe Title Here',
      admin: { condition: (_, s) => Boolean(s?.usePlaceholders) },
    },
    {
      name: 'placeholderImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Placeholder image',
      admin: { condition: (_, s) => Boolean(s?.usePlaceholders) },
    },
  ],
}