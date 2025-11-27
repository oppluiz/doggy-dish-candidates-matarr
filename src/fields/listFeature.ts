import { ListItemNode, ListNode } from '@lexical/list'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'

export const ListFeature = () => {
  return {
    key: 'list',
    // Register Lexical list nodes so the editor understands UL/OL structures
    nodes: [ListNode, ListItemNode],
    // Mount the list plugin to enable list behavior in the editor
    plugins: [
      {
        Component: ListPlugin,
      },
    ],
  }
}