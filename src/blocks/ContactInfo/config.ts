import type { Block } from 'payload'

export const ContactInfo: Block = {
  slug: 'contactInfo',
  interfaceName: 'ContactInfoBlock',
  labels: {
    singular: 'Contact Info',
    plural: 'Contact Info Blocks',
  },
  fields: [
    {
      name: 'subheading',
      label: 'Subheading',
      type: 'text',
      defaultValue: 'JOIN THE DOGGY DISH™ NEWSLETTER',
      admin: {
        description: 'Small text displayed above the main heading',
      },
    },
    {
      name: 'heading',
      label: 'Heading',
      type: 'text',
      required: true,
      defaultValue: 'YOUR WEEKLY FRESH FOOD SPOOP',
      admin: {
        description: 'Main heading text for the contact info section',
      },
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      required: true,
      defaultValue:
        "We make it short, sweet, and packed with tasty tidbits you won't find anywhere else. Subscribe to our newsletter and get the inside scoop on keeping your dog at their best for their best years yet. Because we're rooting for your pup!",
      admin: {
        description: 'Text displayed below the heading',
      },
    },
    {
      name: 'dogImages',
      label: 'Dog Images',
      type: 'array',
      maxRows: 6,
      admin: {
        description: 'Up to 6 circular dog images displayed on the left (desktop only)',
      },
      fields: [
        {
          name: 'image',
          label: 'Image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'emailPlaceholder',
      label: 'Email Field Placeholder',
      type: 'text',
      defaultValue: 'Email address',
    },
    {
      name: 'submitButtonText',
      label: 'Submit Button Text',
      type: 'text',
      defaultValue: 'HIT IT!',
      admin: {
        description: 'Text displayed on the submit button',
      },
    },
  ],
}
