import type { Block } from 'payload'

export const TabbedTable: Block = {
  slug: 'tabbedTable',
  interfaceName: 'TabbedTableBlock',
  labels: {
    singular: 'Tabbed Table',
    plural: 'Tabbed Tables',
  },
  fields: [
    {
      name: 'maxWidth',
      type: 'text',
      label: 'Max Width (Desktop)',
      defaultValue: '100%',
      admin: {
        description: 'Maximum width of the table on desktop (e.g., 1200px, 80%, 100vw)',
      },
    },
    {
      name: 'headerBackgroundColor',
      type: 'text',
      label: 'Header Background Color',
      defaultValue: '#F6A944',
      admin: {
        description: 'Background color for table headers and active tabs',
      },
    },
    {
      name: 'cellBackgroundColor',
      type: 'text',
      label: 'Cell Background Color',
      defaultValue: '#FFFFFF',
      admin: {
        description: 'Background color for table cells and inactive tabs',
      },
    },
    {
      name: 'textColor',
      type: 'text',
      label: 'Text Color',
      defaultValue: '#000000',
      admin: {
        description: 'Color for table text content',
      },
    },
    {
      name: 'inactiveTextColor',
      type: 'text',
      label: 'Inactive Text Color',
      defaultValue: '#666666',
      admin: {
        description: 'Color for inactive tab text',
      },
    },
    {
      name: 'borderColor',
      type: 'text',
      label: 'Border Color',
      defaultValue: '#E5E5E5',
      admin: {
        description: 'Color for table borders',
      },
    },
    {
      name: 'tabs',
      type: 'array',
      label: 'Tabs',
      minRows: 1,
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
          label: 'Columns',
          minRows: 1,
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
              defaultValue: 'text',
              options: [
                {
                  label: 'Text',
                  value: 'text',
                },
                {
                  label: 'Checkbox',
                  value: 'checkbox',
                },
                {
                  label: 'Select',
                  value: 'select',
                },
              ],
            },
            {
              name: 'desktopWidth',
              type: 'text',
              label: 'Desktop Width',
              admin: {
                description: 'CSS width value for desktop (e.g., 200px, 25%, auto)',
              },
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
              label: 'Select Options',
              admin: {
                condition: (data, siblingData) => siblingData?.type === 'select',
                description: 'Options for select type columns',
              },
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  label: 'Option Label',
                  required: true,
                },
                {
                  name: 'value',
                  type: 'text',
                  label: 'Option Value',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          name: 'rows',
          type: 'array',
          label: 'Rows',
          fields: [
            {
              name: 'cells',
              type: 'array',
              label: 'Cells',
              fields: [
                {
                  name: 'value',
                  type: 'text',
                  label: 'Text Value',
                  admin: {
                    condition: (data, siblingData, { user, ...args }) => {
                      // This is a simplified condition - in practice, you'd need to access the column type
                      // For now, we'll show this field for all cells and handle the logic in the component
                      return true
                    },
                  },
                },
                {
                  name: 'checked',
                  type: 'checkbox',
                  label: 'Checked',
                  admin: {
                    condition: (data, siblingData, { user, ...args }) => {
                      // Similar to above - simplified condition
                      return true
                    },
                  },
                },
                {
                  name: 'selectedValue',
                  type: 'text',
                  label: 'Selected Value',
                  admin: {
                    condition: (data, siblingData, { user, ...args }) => {
                      // Similar to above - simplified condition
                      return true
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
