'use client'
import React from 'react'
import type { PillRowsBlock as PillRowsBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'
import { useEffect, useRef, useState } from 'react'

type Props = PillRowsBlockProps & { className?: string }

export const PillRowsBlock: React.FC<Props> = ({ rows = [], className }) => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [activated, setActivated] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry?.isIntersecting) {
          setActivated(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  if (!rows?.length) return null

  return (
    <section ref={sectionRef} className={cn('w-full', className)}>
      <div className="space-y-[8px] md:space-y-[24px] max-w-[1249px] mx-auto">
        {rows.map((row: { heading: string; content?: any }, idx: number) => {
          const baseDelay = idx * 120 // cascade step per row
          const headingDelay = activated ? `${baseDelay}ms` : '0ms'
          const contentDelay = activated ? `${baseDelay + 180}ms` : '0ms'

          return (
            <div
              key={idx}
              className={`grid grid-cols-[102px,1fr] md:grid-cols-[160px,1fr] items-stretch rounded-2xl overflow-hidden md:transition-all md:duration-500 md:ease-out md:overflow-hidden md:opacity-0 md:max-w-[75%] md:mx-auto ${
                activated ? ' md:!opacity-100 md:!max-w-full' : ''
              }`}
              style={{ backgroundColor: '#E8F3D4', transitionDelay: headingDelay }}
            >
              <div
                className={`flex items-center justify-center pl-[22px] pr-[21px] pb-[20px] pt-[23px] md:px-[2rem] md:py-[1.625rem] font-semibold text-[15px] md:text-[1.125rem]`}
                style={{ backgroundColor: '#C9E19C' }}
              >
                {row.heading}
              </div>

              <div
                className={`row-pill py-[16px] pr-[39px] pl-[18px] md:px-[2rem] md:py-[1.625rem] flex items-center`}
              >
                {row.content ? (
                  <RichText
                    data={row.content}
                    enableGutter={false}
                    enableProse={false}
                    className="[&_*]:text-[0.875rem] [&_*]:font-light [&_*]:!mb-0"
                  />
                ) : null}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export type { PillRowsBlockProps }
