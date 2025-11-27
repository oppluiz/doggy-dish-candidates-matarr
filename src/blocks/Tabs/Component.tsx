'use client'

import React, { useState, useRef } from 'react'
import type { TabsBlock as TabsBlockProps } from '@/payload-types'
import Link from 'next/link'
import { toKebabCase } from '@/utilities/toKebabCase'

type Props = TabsBlockProps & {
  className?: string
}

export const TabsBlock: React.FC<Props> = ({
  tabs,
  tabsGap,
  tabsPadding,
  className,
  containerSize,
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      setMousePosition({ x, y })
    }
  }

  const handleMouseLeave = () => {
    setMousePosition({ x: 50, y: 50 }) // Reset to center
  }
  const getHref = (anchor?: string | null) => {
    const a = anchor || ''
    if (a.startsWith('#')) return a
    return `#${toKebabCase(a)}`
  }

  if (!tabs || tabs.length === 0) return null

  var gapClass = ''
  if (tabsGap === 'default') gapClass = 'gap-[0.375rem] md:gap-[1rem]'
  if (tabsGap === 'small') gapClass = 'gap-[0.25rem] md:gap-[0.5rem]'

  var paddingClass = ''
  if (tabsPadding === 'default') paddingClass = 'px-[2.5rem] md:py-[0.875rem] py-[0.5rem]'
  if (tabsPadding === 'small') paddingClass = 'px-[1.5rem] md:py-[0.875rem] py-[0.5rem]'

  return (
    <section
      className={[`${containerSize} mb-[37px] md:mb-[2.5rem]`, className].filter(Boolean).join(' ')}
    >
      <div
        ref={containerRef}
        className="bg-light-green/50 rounded-2xl pt-[18px] pb-[16px] md:pt-[1.875rem] md:pb-[1.5rem] relative overflow-hidden transition-all duration-300 ease-out"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
            rgba(200, 232, 223, 0.4) 0%, 
            rgba(200, 232, 223, 0.5) 50%, 
            rgba(200, 232, 223, 0.5) 100%)`,
          transform: `perspective(1000px) rotateX(${(mousePosition.y - 50) * 0.08}deg) rotateY(${(mousePosition.x - 50) * 0.02}deg)`,
          boxShadow: `${(mousePosition.x - 50) * 0.05}px ${(mousePosition.y - 50) * 0.06}px 15px rgba(0,0,0,0.05)`,
        }}
      >
        <div className={`flex flex-wrap ${gapClass} justify-center`}>
          {tabs.map((tab, i) => {
            const title = tab?.title || ''
            const href = getHref(tab?.anchor)
            return (
              <Link
                key={i}
                href={href}
                className={`!mb-[0px] !leading-[1] inline-block ${paddingClass} w-[199px] text-center md:w-auto bg-dark-green text-white rounded-[2.5rem] uppercase tracking-[0.088rem] text-[0.75rem] font-lato`}
              >
                {title}
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
