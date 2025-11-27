import React from 'react'
import type { ReferencesBlock as ReferencesBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'

type Props = ReferencesBlockProps & {
  className?: string
}

export const ReferencesBlock: React.FC<Props> = ({
  title,
  content,
  widthConstraint = false,
  className,
  containerSize,
}) => {
  return (
    <section className={cn(containerSize, className)}>
      <div className="border-t border-black pt-[27px] md:pt-6">
        <div className={cn(widthConstraint && 'max-w-[1219px] mx-auto')}>
          {title && (
            <h2 className="text-black font-lato font-bold text-sm tracking-wide uppercase mb-4">
              {title}
            </h2>
          )}
          {content && (
            <RichText
              className="font-lato font-light text-[14px] text-black leading-[22px]"
              data={content}
              enableGutter={false}
              enableProse={false}
            />
          )}
        </div>
      </div>
    </section>
  )
}
