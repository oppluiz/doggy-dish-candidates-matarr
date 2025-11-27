import React from 'react'
import RichText from '@/components/RichText'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { cn } from '@/utilities/ui'

export type AccordionItem = {
  heading?: string
  content?: DefaultTypedEditorState
}

export type AccordionBlockProps = {
  items?: AccordionItem[]
  className?: string
}

export const AccordionBlock: React.FC<AccordionBlockProps> = ({ items, className }) => {
  if (!items || items.length === 0) return null

  return (
    <div className={cn('mx-auto py-[1.125rem]', className)}>
      <div className="space-y-[14px] md:space-y-[0.5rem]">
        {items.map((item, i) => (
          <details key={i} className="group">
            <summary className="flex cursor-pointer items-center justify-between gap-2 md:gap-4 list-none">
              <div className="flex items-center">
                <span className="material-symbols-outlined transition-transform group-open:rotate-90 text-[#f6A944] !text-[1.5rem]">
                  arrow_right
                </span>
                <span className="font-lato font-semibold text-black text-[16px] md:text-[0.875rem]">
                  {item?.heading || 'Untitled'}
                </span>
              </div>
            </summary>
            <div className="mt-[0.5rem] pl-[1.625rem]">
              {item?.content && (
                <RichText
                  className="text-black font-lato [&_*]:text-[0.75rem] [&_*]:leading-[1.2]"
                  data={item.content}
                  enableGutter={false}
                  enableProse={false}
                />
              )}
            </div>
          </details>
        ))}
      </div>
    </div>
  )
}
