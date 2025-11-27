'use client'

import React from 'react'

type Props = {
  text?: string
  color?: string
  className?: string
}

export const TagBlock: React.FC<Props> = ({
  text = 'ACTIVE DOG',
  color = '#FFA12F',
  className,
}) => {
  return (
    <span
      className={`inline-flex my-[1rem] min-w-[10.25rem] !w-fit text-[0.75rem] font-normal items-center justify-center rounded-full px-[2rem] py-[0.5rem] md:py-[1rem] uppercase tracking-[0.061rem] font-lato text-white ${className || ''}`}
      style={{ backgroundColor: color }}
    >
      {text}
    </span>
  )
}

export default TagBlock
