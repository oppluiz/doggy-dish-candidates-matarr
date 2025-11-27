import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  HeadingFeature,
  lexicalEditor,
  UnorderedListFeature,
  OrderedListFeature,
  BlocksFeature,
} from '@payloadcms/richtext-lexical'

export const ContentBlock: Block = {
  slug: 'contentBlock',
  interfaceName: 'contentBlock',
  labels: { singular: 'Content Block', plural: 'Content Blocks' },
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
      name: 'content',
      type: 'richText',
      label: 'Content',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          UnorderedListFeature(),
          OrderedListFeature(),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
          BlocksFeature({
            blocks: [
              {
                slug: 'accordion',
                labels: { singular: 'Accordion', plural: 'Accordions' },
                fields: [
                  {
                    name: 'items',
                    type: 'array',
                    required: true,
                    labels: { singular: 'Item', plural: 'Items' },
                    fields: [
                      { name: 'heading', type: 'text', required: true, label: 'Heading' },
                      {
                        name: 'content',
                        type: 'richText',
                        label: 'Content',
                        editor: lexicalEditor({
                          features: ({ rootFeatures }) => [
                            ...rootFeatures,
                            UnorderedListFeature(),
                            OrderedListFeature(),
                            FixedToolbarFeature(),
                            InlineToolbarFeature(),
                          ],
                        }),
                      },
                    ],
                  },
                ],
              },
              {
                slug: 'table',
                labels: { singular: 'Table', plural: 'Tables' },
                fields: [
                  {
                    name: 'tableOverflow',
                    label: 'Table Overflow',
                    dbName: 'tbl_overflow',
                    type: 'select',
                    options: [
                      {
                        label: 'Default',
                        value: 'default',
                      },
                      {
                        label: 'Overflow',
                        value: 'overflow',
                      },
                    ],
                    defaultValue: 'default',
                    required: true,
                  },
                  { name: 'heading', type: 'text', label: 'Heading' },
                  { name: 'subheading', type: 'text', label: 'Subheading (italic)' },
                  {
                    name: 'backgroundColor',
                    type: 'text',
                    label: 'Background Color',
                    admin: { description: 'Any CSS color or hex (e.g. #FFF4E5)' },
                  },
                  {
                    name: 'intro',
                    type: 'richText',
                    label: 'Intro Content',
                    editor: lexicalEditor({
                      features: ({ rootFeatures }) => [
                        ...rootFeatures,
                        UnorderedListFeature(),
                        OrderedListFeature(),
                        FixedToolbarFeature(),
                        InlineToolbarFeature(),
                      ],
                    }),
                  },
                  {
                    type: 'row',
                    fields: [
                      { name: 'tableTitle', type: 'text', label: 'Table Title' },
                      {
                        name: 'tableColor',
                        type: 'text',
                        label: 'Table Color',
                        admin: { description: 'Header/cell background (e.g. #F6A944)' },
                      },
                      {
                        name: 'columnHeadingColor',
                        type: 'text',
                        label: 'Column Heading Color',
                        admin: { description: 'Color for column header cells' },
                      },
                    ],
                  },
                  {
                    name: 'columns',
                    type: 'array',
                    labels: { singular: 'Column', plural: 'Columns' },
                    fields: [
                      { name: 'heading', type: 'text', label: 'Column Heading' },
                      {
                        name: 'type',
                        type: 'select',
                        label: 'Type',
                        options: [
                          { label: 'Text', value: 'text' },
                          { label: 'Input', value: 'input' },
                        ],
                        defaultValue: 'text',
                        required: true,
                      },
                    ],
                  },
                  {
                    name: 'rows',
                    type: 'array',
                    labels: { singular: 'Row', plural: 'Rows' },
                    admin: {
                      description:
                        'Add one cell per column. For input columns, leave the cell empty to render a checkbox.',
                    },
                    fields: [
                      {
                        name: 'cells',
                        type: 'array',
                        labels: { singular: 'Cell', plural: 'Cells' },
                        fields: [{ name: 'value', type: 'text', label: 'Text' }],
                      },
                    ],
                  },
                ],
              },
              {
                slug: 'alert',
                labels: { singular: 'Alert Block', plural: 'Alert Blocks' },
                fields: [
                  { name: 'heading', type: 'text', label: 'Heading', defaultValue: 'IMPORTANT' },
                  {
                    name: 'content',
                    type: 'richText',
                    label: 'Paragraph',
                    editor: lexicalEditor({
                      features: ({ rootFeatures }) => [
                        ...rootFeatures,
                        FixedToolbarFeature(),
                        InlineToolbarFeature(),
                      ],
                    }),
                  },
                  {
                    name: 'alertOverflow',
                    label: 'Alert Overflow',
                    type: 'select',
                    options: [
                      {
                        label: 'Default',
                        value: 'default',
                      },
                      {
                        label: 'Overflow',
                        value: 'overflow',
                      },
                    ],
                    defaultValue: 'default',
                    required: true,
                  },
                  {
                    name: 'widthConstraint',
                    type: 'checkbox',
                    label: 'Width constraint',
                    defaultValue: false,
                    admin: {
                      description: 'Constrains the alert to max-width of 1219px and centers it',
                    },
                  },
                  {
                    name: 'fullWidthContent',
                    type: 'checkbox',
                    label: 'Full width content',
                    defaultValue: false,
                    admin: {
                      description: 'Expands content max-width from 594px to 950px',
                    },
                  },
                ],
              },
              {
                slug: 'pillRows',
                labels: { singular: 'Pill Rows', plural: 'Pill Rows' },
                fields: [
                  {
                    name: 'rows',
                    type: 'array',
                    labels: { singular: 'Row', plural: 'Rows' },
                    required: true,
                    fields: [
                      { name: 'heading', type: 'text', required: true, label: 'Heading' },
                      {
                        name: 'content',
                        type: 'richText',
                        label: 'Text',
                        editor: lexicalEditor({
                          features: ({ rootFeatures }) => [
                            ...rootFeatures,
                            FixedToolbarFeature(),
                            InlineToolbarFeature(),
                          ],
                        }),
                      },
                    ],
                  },
                ],
              },
              {
                slug: 'iconAccordions',
                labels: { singular: 'Icon Accordions', plural: 'Icon Accordions' },
                fields: [
                  {
                    name: 'secondaryColorLayout',
                    type: 'checkbox',
                    label: 'Secondary Color Layout',
                    defaultValue: false,
                    admin: {
                      description: 'Use green color scheme instead of the default light green',
                    },
                  },
                  {
                    name: 'items',
                    type: 'array',
                    required: true,
                    labels: { singular: 'Item', plural: 'Items' },
                    fields: [
                      {
                        name: 'icon',
                        type: 'select',
                        label: 'Google Icon (Material Symbols)',
                        required: true,
                        defaultValue: 'massage',
                        options: [
                          { label: 'Massage', value: 'massage' },
                          { label: 'Acupuncture', value: 'acupuncture' },
                          { label: 'Water', value: 'water' },
                          { label: 'Sunny', value: 'sunny' },
                          { label: 'Bolt', value: 'bolt' },
                          { label: 'Air', value: 'air' },
                          { label: 'Pill', value: 'pill' },
                          { label: 'Pulmonology', value: 'pulmonology' },
                          { label: 'Balance', value: 'balance' },
                          { label: 'Docs', value: 'docs' },
                          { label: 'Vital Signs', value: 'vital_signs' },
                          { label: 'Content Cut', value: 'content_cut' },
                          { label: 'Calendar', value: 'calendar_today' },
                          { label: 'Home', value: 'home' },
                          { label: 'Shield', value: 'shield' },
                          { label: 'Radiology', value: 'radiology' },
                          { label: 'Search', value: 'search' },
                          { label: 'Calculate', value: 'calculate' },
                          { label: 'Clock', value: 'nest_clock_farsight_analog' },
                          { label: 'Close', value: 'close' },
                          { label: 'Arrow Upward', value: 'arrow_upward' },
                          { label: 'Bone', value: 'pet_supplies' },
                          { label: 'Family Group', value: 'family_group' },
                          { label: 'Block', value: 'block' },
                          { label: 'Scale', value: 'scale' },
                          { label: 'Bacteria', value: 'coronavirus' },
                          { label: 'Dog', value: 'sound_detection_dog_barking' },
                          { label: 'Wash', value: 'wash' },
                          { label: 'Clock Loader 60', value: 'clock_loader_60' },
                          { label: 'Fire Hydrant', value: 'fire_hydrant' },
                          { label: 'Water PH', value: 'water_ph' },
                          { label: 'Paw', value: 'pets' },
                          { label: 'Ulna Radius Alt', value: 'ulna_radius_alt' },
                        ],
                        admin: {
                          description:
                            'Uses Material Symbols Outlined. Pick an icon name to render.',
                        },
                      },
                      { name: 'heading', type: 'text', required: true, label: 'Heading' },
                      { name: 'subheading', type: 'text', label: 'Subheading' },
                      {
                        name: 'content',
                        type: 'richText',
                        label: 'Content',
                        editor: lexicalEditor({
                          features: ({ rootFeatures }) => [
                            ...rootFeatures,
                            FixedToolbarFeature(),
                            InlineToolbarFeature(),
                          ],
                        }),
                      },
                    ],
                  },
                ],
              },
              {
                slug: 'serviceSize',
                labels: { singular: 'Service Size', plural: 'Service Size' },
                fields: [
                  {
                    name: 'heading',
                    type: 'text',
                    required: true,
                  },
                  {
                    name: 'columns',
                    type: 'array',
                    labels: { singular: 'Column', plural: 'Columns' },
                    minRows: 5,
                    maxRows: 5,
                    fields: [
                      { name: 'heading', type: 'text', required: true },
                      { name: 'text', type: 'text', required: true },
                    ],
                  },
                ],
              },
              {
                slug: 'collectionItemSlider',
                labels: { singular: 'Collection Item Slider', plural: 'Collection Item Slider' },
                fields: [
                  { name: 'heading', type: 'text', label: 'Heading', required: false },
                  {
                    name: 'overflowSetting',
                    label: 'Overflow setting',
                    type: 'select',
                    options: [
                      {
                        label: 'Hidden',
                        value: 'md:!overflow-hidden',
                      },
                      {
                        label: 'Overflow',
                        value: 'md:!overflow-visible',
                      },
                    ],
                    defaultValue: 'md:!overflow-visible',
                    required: true,
                  },
                  {
                    name: 'aspectRatio',
                    label: 'Aspect Ratio',
                    type: 'select',
                    options: [
                      {
                        label: 'Square',
                        value: 'aspect-square',
                      },
                      {
                        label: 'Rectangle',
                        value: 'aspect-[1.25/1]',
                      },
                    ],
                    defaultValue: 'aspect-[1.25/1]',
                    required: true,
                  },
                  {
                    name: 'widthConstraint',
                    type: 'checkbox',
                    label: 'Width constraint',
                    defaultValue: false,
                    admin: {
                      description: 'Constrains the slider to max-width of 1219px and centers it',
                    },
                  },
                  {
                    name: 'usePlaceholders',
                    type: 'checkbox',
                    label: 'Use placeholders',
                    defaultValue: true,
                  },
                  {
                    name: 'placeholderCount',
                    type: 'number',
                    label: 'Placeholder items count',
                    defaultValue: 5,
                    min: 1,
                    admin: { condition: (_, s) => Boolean(s?.usePlaceholders) },
                  },
                  {
                    name: 'placeholderImage',
                    type: 'upload',
                    relationTo: 'media',
                    label: 'Placeholder image',
                    admin: { condition: (_, s) => Boolean(s?.usePlaceholders) },
                  },
                  {
                    name: 'placeholderTitle',
                    type: 'text',
                    label: 'Placeholder title',
                    defaultValue: 'Osteoarthritis',
                    admin: { condition: (_, s) => Boolean(s?.usePlaceholders) },
                  },
                  {
                    name: 'items',
                    type: 'array',
                    labels: { singular: 'Item', plural: 'Items' },
                    admin: { description: 'Add individual collection items.' },
                    fields: [
                      {
                        name: 'reference',
                        type: 'relationship',
                        relationTo: ['pages', 'posts', 'workshops'],
                        required: true,
                      },
                    ],
                  },
                ],
              },
              {
                slug: 'tabbedTable',
                labels: { singular: 'Tabbed Table', plural: 'Tabbed Tables' },
                fields: [
                  {
                    name: 'maxWidth',
                    type: 'text',
                    label: 'Max Width (Desktop)',
                    defaultValue: '100%',
                    admin: {
                      description:
                        'Maximum width of the table on desktop (e.g., 1200px, 80%, 100vw)',
                    },
                  },
                  {
                    name: 'headerBackgroundColor',
                    type: 'text',
                    label: 'Header Background Color',
                    defaultValue: '#F6A944',
                    admin: { description: 'Background color for table headers and active tabs' },
                  },
                  {
                    name: 'cellBackgroundColor',
                    type: 'text',
                    label: 'Cell Background Color',
                    defaultValue: '#FFFFFF',
                    admin: { description: 'Background color for table cells and inactive tabs' },
                  },
                  {
                    name: 'textColor',
                    type: 'text',
                    label: 'Text Color',
                    defaultValue: '#000000',
                    admin: { description: 'Color for table text content' },
                  },
                  {
                    name: 'inactiveTextColor',
                    type: 'text',
                    label: 'Inactive Text Color',
                    defaultValue: '#666666',
                    admin: { description: 'Color for inactive tab text' },
                  },
                  {
                    name: 'borderColor',
                    type: 'text',
                    label: 'Border Color',
                    defaultValue: '#E5E5E5',
                    admin: { description: 'Color for table borders' },
                  },
                  {
                    name: 'tabs',
                    type: 'array',
                    labels: { singular: 'Tab', plural: 'Tabs' },
                    required: true,
                    fields: [
                      {
                        name: 'title',
                        type: 'text',
                        label: 'Tab Title',
                        required: true,
                      },
                      {
                        name: 'columns',
                        type: 'array',
                        labels: { singular: 'Column', plural: 'Columns' },
                        required: true,
                        fields: [
                          {
                            name: 'heading',
                            type: 'text',
                            label: 'Column Heading',
                            required: true,
                          },
                          {
                            name: 'type',
                            type: 'select',
                            label: 'Column Type',
                            options: [
                              { label: 'Text', value: 'text' },
                              { label: 'Checkbox', value: 'checkbox' },
                              { label: 'Select', value: 'select' },
                            ],
                            defaultValue: 'text',
                            required: true,
                          },
                          {
                            name: 'desktopWidth',
                            type: 'text',
                            label: 'Desktop Width',
                            admin: { description: 'CSS width value (e.g., 200px, 25%, auto)' },
                          },
                          {
                            name: 'mobileWidth',
                            type: 'text',
                            label: 'Mobile Width',
                            admin: {
                              description: 'CSS width value for mobile (e.g., 150px, 30%, auto)',
                            },
                          },
                          {
                            name: 'selectOptions',
                            type: 'array',
                            labels: { singular: 'Option', plural: 'Options' },
                            admin: {
                              condition: (_, siblingData) => siblingData?.type === 'select',
                              description: 'Available options for select type columns',
                            },
                            fields: [
                              {
                                name: 'label',
                                type: 'text',
                                label: 'Display Label',
                                required: true,
                              },
                              {
                                name: 'value',
                                type: 'text',
                                label: 'Value',
                                required: true,
                              },
                            ],
                          },
                        ],
                      },
                      {
                        name: 'rows',
                        type: 'array',
                        labels: { singular: 'Row', plural: 'Rows' },
                        fields: [
                          {
                            name: 'cells',
                            type: 'array',
                            labels: { singular: 'Cell', plural: 'Cells' },
                            admin: {
                              description:
                                'Add one cell per column. For checkbox columns, use "checked" field. For select columns, use "selectedValue" field.',
                            },
                            fields: [
                              {
                                name: 'value',
                                type: 'text',
                                label: 'Text Value',
                                admin: {
                                  description: 'For text type columns',
                                },
                              },
                              {
                                name: 'checked',
                                type: 'checkbox',
                                label: 'Checked',
                                admin: {
                                  description: 'For checkbox type columns',
                                },
                              },
                              {
                                name: 'selectedValue',
                                type: 'text',
                                label: 'Selected Value',
                                admin: {
                                  description:
                                    'For select type columns - should match one of the option values',
                                },
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          }),
        ],
      }),
      required: true,
    },
  ],
}
