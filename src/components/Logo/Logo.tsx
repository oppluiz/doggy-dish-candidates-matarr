import clsx from 'clsx'
import React from 'react'

export const Logo: React.FC<{
  loading?: 'eager' | 'lazy'
  priority?: 'high' | 'low'
  className?: string
  src?: string
  alt?: string
  widthPx?: number
}> = ({ loading, priority, className, src, alt, widthPx }) => {
  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt={alt || 'Logo'}
      width={193}
      height={34}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('max-w-[6.25rem] w-full h-[34px]', className)}
      style={{ width: widthPx ? `${widthPx}px` : undefined, height: widthPx ? 'auto' : undefined }}
      src={
        src ||
        'https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-logo-light.svg'
      }
    />
  )
}
