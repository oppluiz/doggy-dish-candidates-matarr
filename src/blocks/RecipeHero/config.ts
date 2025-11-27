import type { Block } from 'payload'
import { link } from '@/fields/link'

export const RecipeHero: Block = {
  slug: 'recipeHero',
  fields: [
    {
      name: 'containerSize',
      label: 'Container Size',
      type: 'select',
      options: [
        {
          label: 'Default',
          value: 'container',
        },
        {
          label: 'Small',
          value: 'container-small',
        },
      ],
      defaultValue: 'container',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'whoIsThisFor',
      type: 'group',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
        link({
          appearances: false,
        }),
      ],
    },
  ],
  interfaceName: 'RecipeHeroBlock',
}
