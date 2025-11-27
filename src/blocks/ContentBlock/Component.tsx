import React from 'react'
import type { ContentBlock as ContentBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'

type Props = ContentBlockProps & { className?: string; containerSize?: string; content?: any }

export const ContentBlock: React.FC<Props> = ({ containerSize, content, className }) => {
  if (!content) return null

  return (
    <section className={[containerSize, className].filter(Boolean).join(' ')}>
      <RichText data={content} enableGutter={false} enableProse={false} />
    </section>
  )
}
