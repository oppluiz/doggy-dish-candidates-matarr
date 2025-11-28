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
        "Ever wish you had a dog-loving, fresh-feeding expert who dished out easy recipes, vet-backed advice, and fresh food tips for free? That's us, right in your inbox each week! Join our community of devoted dog parents and get emails your dog will thank you for. Because when it comes to your pup's health, you deserve a helping hand (or paw).!",
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
