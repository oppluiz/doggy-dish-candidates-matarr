'use client'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
  type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'

import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component'
import type {
  BannerBlock as BannerBlockProps,
  CallToActionBlock as CTABlockProps,
  MediaBlock as MediaBlockProps,
  TableOfContentsBlock as TOCBlockProps,
  AuthorBlock as AuthorBlockProps,
  AccordionBlock as AccordionBlockProps,
  TableBlock as TableBlockProps,
  AlertBlock as AlertBlockProps,
  PillRowsBlock as PillRowsBlockProps,
  IconAccordionsBlock as IconAccordionsBlockProps,
  ServiceSizeBlock as ServiceSizeBlockProps,
  CollectionItemSliderBlock as CollectionItemSliderBlockProps,
  TabbedTableBlock as TabbedTableBlockProps,
} from '@/payload-types'
import { InstagramBlockProps } from '@/blocks/Instagram/Component'
import { BannerBlock } from '@/blocks/Banner/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { TableOfContentsBlock } from '@/blocks/TableOfContents/Component'
import { AuthorBlock } from '@/blocks/Author/Component'
import { cn } from '@/utilities/ui'
import { toKebabCase } from '@/utilities/toKebabCase'
import React from 'react'
import { AccordionBlock } from '@/blocks/Accordion/Component'
import { TableBlock } from '@/blocks/Table/Component'
import { AlertBlock } from '@/blocks/Alert/Component'
import { PillRowsBlock } from '@/blocks/PillRows/Component'
import { IconAccordionsBlock } from '@/blocks/IconAccordions/Component'
import { ServiceSizeBlock } from '@/blocks/ServiceSize/Component'
import { CollectionItemSliderBlock } from '@/blocks/CollectionItemSlider/Component'
import { TabbedTableBlock } from '@/blocks/TabbedTable/Component'
import { InstagramBlock } from '@/blocks/Instagram/Component'
import { CheckboxListBlock } from '@/blocks/CheckboxList/Component'
import { InstructionsBlock } from '@/blocks/Instructions/Component'
import { StarListBlock } from '@/blocks/StarList/Component'
import { BoxedInformationBlock } from '@/blocks/BoxedInformation/Component'
import { DividerBlock } from '@/blocks/Divider/Component'
import { TagBlock } from '@/blocks/Tag/Component'

type SerializedNodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<
      | CTABlockProps
      | MediaBlockProps
      | BannerBlockProps
      | CodeBlockProps
      | TOCBlockProps
      | AuthorBlockProps
      | AccordionBlockProps
      | TableBlockProps
      | AlertBlockProps
      | PillRowsBlockProps
      | IconAccordionsBlockProps
      | ServiceSizeBlockProps
      | CollectionItemSliderBlockProps
      | TabbedTableBlockProps
      | InstagramBlockProps
    >
  | SerializedBlockNode<any>

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return relationTo === 'posts' ? `/posts/${slug}` : `/${slug}`
}

const lexicalJsxConverters: JSXConvertersFunction<SerializedNodeTypes> = ({
  defaultConverters,
}) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  blocks: {
    banner: ({ node }) => <BannerBlock className="col-start-2 mb-4" {...node.fields} />,
    mediaBlock: ({ node }) => (
      <MediaBlock
        className="col-start-1 col-span-3"
        imgClassName="m-0"
        {...node.fields}
        captionClassName="mx-auto max-w-[48rem]"
        enableGutter={false}
        disableInnerContainer={true}
      />
    ),
    code: ({ node }) => <CodeBlock className="col-start-2" {...node.fields} />,
    cta: ({ node }) => <CallToActionBlock {...node.fields} />,
    tableOfContents: ({ node }) => <TableOfContentsBlock {...node.fields} />,
    author: ({ node }) => <AuthorBlock disableInnerContainer {...node.fields} />,
    accordion: ({ node }) => <AccordionBlock {...node.fields} />,
    table: ({ node }) => <TableBlock {...node.fields} />,
    alert: ({ node }) => <AlertBlock {...node.fields} />,
    pillRows: ({ node }) => <PillRowsBlock {...node.fields} />,
    iconAccordions: ({ node }) => <IconAccordionsBlock {...node.fields} />,
    serviceSize: ({ node }) => <ServiceSizeBlock {...node.fields} />,
    collectionItemSlider: ({ node }) => <CollectionItemSliderBlock {...node.fields} />,
    tabbedTable: ({ node }) => <TabbedTableBlock {...node.fields} />,
    instagram: ({ node }) => <InstagramBlock {...node.fields} />,
    checkboxList: ({ node }) => <CheckboxListBlock {...node.fields} />,
    instructions: ({ node }) => <InstructionsBlock {...node.fields} />,
    starList: ({ node }) => <StarListBlock {...node.fields} />,
    boxedInformation: ({ node }) => <BoxedInformationBlock {...node.fields} />,
    divider: ({ node }) => <DividerBlock {...node.fields} />,
    tag: ({ node }) => <TagBlock {...node.fields} />,
  },
})

export default function RichText(
  props: {
    data: DefaultTypedEditorState
    enableGutter?: boolean
    enableProse?: boolean
  } & React.HTMLAttributes<HTMLDivElement>,
) {
  const { className, enableProse = true, enableGutter = true, ...rest } = props

  const containerRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const headings = el.querySelectorAll('h1, h2, h3, h4, h5, h6')
    const seen = new Set<string>()

    headings.forEach((h) => {
      const base = toKebabCase(h.textContent || '')
      if (!base) return
      let id = base
      let i = 2
      while (seen.has(id) || document.getElementById(id)) {
        id = `${base}-${i++}`
      }
      h.id = id
      seen.add(id)
    })
  }, [props.data])

  return (
    <div
      ref={containerRef}
      className={cn(
        'payload-richtext',
        enableProse && 'prose dark:prose-invert max-w-none',
        className,
      )}
      {...rest}
    >
      <ConvertRichText converters={lexicalJsxConverters} data={props.data} />
    </div>
  )
}
