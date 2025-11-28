import type { Block } from 'payload'

export const ContactHero: Block = {
  slug: 'contactHero',
  interfaceName: 'ContactHeroBlock',
  labels: {
    singular: 'Contact Hero',
    plural: 'Contact Heroes',
  },
  fields: [
    {
      name: 'heading',
      label: 'Heading',
      type: 'text',
      required: true,
      defaultValue: 'tell your dog we say hi!',
      admin: {
        description: 'Main heading text (e.g., "tell your dog we say hi!")',
      },
    },
    {
      name: 'accentWord',
      label: 'Accent Word',
      type: 'text',
      admin: {
        description: 'Word to highlight in coral color (e.g., "hi"). Case-insensitive match.',
      },
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      required: true,
      defaultValue:
        "We're all ears when it comes to your questions, comments, or just sharing adorable dog photos. Fill out the form below and we'll be in touch within 48 business hours.",
      admin: {
        description: 'Text displayed below the heading',
      },
    },
    {
      name: 'dogImage',
      label: 'Dog Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Dog photo displayed on the right side (desktop) or top (mobile)',
      },
    },
    {
      name: 'decorativeIcon',
      label: 'Decorative Icon',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Small decorative graphic displayed next to the heading',
      },
    },
    {
      name: 'namePlaceholder',
      label: 'Name Field Placeholder',
      type: 'text',
      defaultValue: 'Name',
    },
    {
      name: 'emailPlaceholder',
      label: 'Email Field Placeholder',
      type: 'text',
      defaultValue: 'Email address',
    },
    {
      name: 'messagePlaceholder',
      label: 'Message Field Placeholder',
      type: 'text',
      defaultValue: 'Message',
    },
    {
      name: 'submitButtonText',
      label: 'Submit Button Text',
      type: 'text',
      defaultValue: 'submit',
      admin: {
        description: 'Text displayed on the submit button',
      },
    },
  ],
}
