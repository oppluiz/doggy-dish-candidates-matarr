import type { Block } from 'payload'

export const SliderBlock: Block = {
  slug: 'slider',
  interfaceName: 'SliderBlock',
  labels: {
    singular: 'Slider',
    plural: 'Sliders',
  },
  fields: [
    {
      name: 'containerSize',
      label: 'Container Size',
      type: 'select',
      options: [
        { label: 'Default', value: 'container' },
        { label: 'Small', value: 'container-small' },
      ],
      defaultValue: 'container',
      required: true,
    },
    {
      name: 'title',
      label: 'Title',
      type: 'text',
    },
    {
      name: 'aspectRatio',
      label: 'Tile Aspect Ratio',
      type: 'select',
      options: [
        { label: '1:1 (Square)', value: 'aspect-[1/1]' },
        { label: '4:5 (Portrait)', value: 'aspect-[4/5]' },
        { label: '3:4 (Portrait)', value: 'aspect-[3/4]' },
        { label: '16:9 (Landscape)', value: 'aspect-[16/9]' },
        { label: '251:150', value: 'aspect-[251/150]' },
        { label: '3:2', value: 'aspect-[116/75]' },
        { label: '3:2 (Landscape)', value: 'aspect-[116:75]' },
      ],
      defaultValue: 'aspect-[1/1]',
    },
    {
      name: 'centerSlidesOnMobile',
      label: 'Center slides on mobile',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'overflowSetting',
      label: 'Overflow Behavior',
      type: 'select',
      options: [
        { label: 'Hidden', value: 'overflow-hidden' },
        { label: 'Visible', value: 'overflow-visible' },
        { label: 'Hidden (mobile), Visible (md+)', value: 'overflow-hidden md:overflow-visible' },
      ],
      defaultValue: 'overflow-hidden md:overflow-visible',
    },
    {
      name: 'desktopSlidesPerView',
      label: 'Desktop Slides Per View',
      type: 'select',
      options: [
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '5', value: '5' },
        { label: '6', value: '6' },
      ],
      defaultValue: '5',
      required: true,
    },
    {
      name: 'items',
      labels: { singular: 'Item', plural: 'Items' },
      type: 'array',
      fields: [
        {
          name: 'reference',
          type: 'relationship',
          relationTo: ['health', 'workshops', 'recipes', 'howTo', 'food'],
          required: true,
        },
      ],
    },
    {
      name: 'usePlaceholders',
      label: 'Use placeholders instead of manual items',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'placeholderImage',
      label: 'Placeholder Image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'placeholderTitle',
      label: 'Placeholder Title',
      type: 'text',
      defaultValue: 'Placeholder',
    },
    {
      name: 'placeholderCount',
      label: 'Placeholder Count',
      type: 'number',
      defaultValue: 5,
      min: 1,
      max: 20,
    },
  ],
}
