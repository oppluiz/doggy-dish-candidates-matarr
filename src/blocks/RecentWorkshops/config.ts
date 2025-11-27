import type { Block } from 'payload'

export const RecentWorkshops: Block = {
  slug: 'recentWorkshops',
  interfaceName: 'RecentWorkshopsBlock',
  labels: {
    singular: 'Recent Workshops',
    plural: 'Recent Workshops',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Recent Workshops',
      admin: {
        description: 'Heading text for the section',
      },
    },
    {
      name: 'repeat',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Fill remaining slots with repeated workshops if less than 3 are available',
      },
    },
  ],
}