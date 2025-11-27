'use client'

import React from 'react'

type Props = {
  color?: string
  className?: string
}

export const DividerBlock: React.FC<Props> = ({ color = '#6B7280', className }) => {
  return (
    <div className={`my-[0.5rem] w-full ${className || ''}`}>
      <div className="h-[1px] w-full rounded-sm" style={{ backgroundColor: color }} />
    </div>
  )
}

export default DividerBlock
