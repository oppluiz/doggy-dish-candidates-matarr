'use client'

import React from 'react'
import type { TestimonialBlock as TestimonialBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

type Props = TestimonialBlockProps & { className?: string }

const getContainerClass = (size?: string) =>
  size === 'container-small' ? 'container-small' : 'container'

const TestimonialBlock: React.FC<Props> = ({ containerSize, content, author, className }) => {
  // Resolve author relationship (supports value populated at depth or raw ID)
  const authorDoc =
    author && typeof author === 'object' && 'value' in author ? (author as any).value : author

  const authorImage = authorDoc?.image
  const authorName = authorDoc?.name
  const authorTitle = authorDoc?.author_title

  return (
    <section className={cn('w-full my-[1.5rem] mb-[4rem]', className)}>
      <div className={cn(getContainerClass(containerSize))}>
        <div className="rounded-[0.875rem] shadow-[0_2px_12px_rgba(0,0,0,0.08)] bg-[#F5FCF7] px-[3.5rem] pt-[2.75rem] pb-[2rem]">
          {content ? (
            <blockquote className="mb-[2rem] text-[1.25rem] leading-[1.2] text-black [&_p]:m-0">
              <RichText data={content} enableProse={false} />
            </blockquote>
          ) : null}

          <div className="flex items-center gap-4">
            {authorImage ? (
              <div className="w-[3.5rem] h-[3.5rem] rounded-full overflow-hidden bg-[#41A690]/10 shrink-0">
                <Media
                  resource={authorImage}
                  className="w-full h-full"
                  pictureClassName="w-full h-full block"
                  imgClassName="!w-full !h-full object-cover"
                />
              </div>
            ) : null}
            <div className="flex flex-col">
              {authorName ? (
                <span className="font-lato text-[1.25rem] mb-[.5rem] font-semibold uppercase tracking-[0.02em] text-black">
                  {authorName}
                </span>
              ) : null}
              {authorTitle ? (
                <span className="font-lato text-[0.875rem] text-black font-light">
                  {authorTitle}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialBlock
