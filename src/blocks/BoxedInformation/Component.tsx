'use client'

import React from 'react'
import RichText from '@/components/RichText'

type Props = {
  content: any
  className?: string
}

export const BoxedInformationBlock: React.FC<Props> = ({ content, className }) => {
  if (!content) return null

  return (
    <div
      className={`my-[1rem] rounded-[0.875rem] bg-[#45A893] text-white px-10 py-[1.75rem] ${className || ''}`}
    >
      <RichText
        data={content}
        enableProse={false}
        className="text-center text-white [&_p]:font-lato [&_p]:text-[0.875rem] md:[&_p]:text-[1.125rem] [&_p]:font-bold"
      />
    </div>
  )
}

export default BoxedInformationBlock
