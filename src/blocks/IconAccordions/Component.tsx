'use client'

import React, { useEffect, useRef, useState } from 'react'
import type { IconAccordionsBlock as IconAccordionsBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'

type Props = IconAccordionsBlockProps & { className?: string }

const GoogleIcon: React.FC<{ name?: string; className?: string }> = ({ name, className }) => {
  if (!name) return null
  return (
    <span className={cn('material-symbols-outlined', className)} aria-hidden="true">
      {name}
    </span>
  )
}

export const IconAccordionsBlock: React.FC<Props> = ({
  items = [],
  secondaryColorLayout = false,
  className,
}) => {
  const [open, setOpen] = React.useState<Record<number, boolean>>({})
  const [isVisible, setIsVisible] = useState(false)
  const [animatedItems, setAnimatedItems] = useState<Record<number, boolean>>({})
  const sectionRef = useRef<HTMLElement>(null)

  const toggle = (i: number) => setOpen((s) => ({ ...s, [i]: !s[i] }))

  // Intersection Observer for viewport detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
          // Start cascade animation
          items.forEach((_, index) => {
            setTimeout(() => {
              setAnimatedItems((prev) => ({ ...prev, [index]: true }))
            }, index * 100) // 100ms delay between each accordion
          })
        }
      },
      { threshold: 0.2 }, // Trigger when 20% of the section is visible
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [items, isVisible])

  if (!items?.length) return null

  return (
    <section ref={sectionRef} className={cn('w-full', className)}>
      <div className="mb-[2rem] md:mb-0 grid gap-[11px] md:gap-x-[30px] md:gap-y-[11px] md:grid-cols-2 mx-auto max-w-[1219px]">
        {items.map((item, i) => {
          const isOpen = !!open[i]
          const isAnimated = animatedItems[i]
          return (
            <div
              key={i}
              className={cn(
                'rounded-[0.875rem] overflow-hidden shadow-[0_1px_0_rgba(0,0,0,0.06)] h-fit transition-all duration-700 ease-out',
                secondaryColorLayout ? 'bg-[#B1CF66]/25' : 'bg-[#C8E8DF]/25',
                isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
              )}
            >
              <button
                type="button"
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                className={cn(
                  'w-full flex items-center gap-[11px] md:gap-[14px] p-[14px] md:px-[1rem] md:py-[1.25rem] md:pr-[2rem] relative transition-colors duration-200',
                  secondaryColorLayout
                    ? isOpen
                      ? 'bg-[#B1CF66]/50 rounded-[0.875rem]'
                      : 'bg-[#B1CF66]/25 rounded-[0.875rem]'
                    : '',
                  !secondaryColorLayout
                    ? isOpen
                      ? 'bg-[#C8E8DF]/50 rounded-[0.875rem]'
                      : 'bg-[#C8E8DF]/25 rounded-[0.875rem]'
                    : '',
                )}
              >
                <div
                  className={cn(
                    'flex items-center justify-center w-[2.125rem] h-[2.125rem] rounded-xl bg-[#FFFFF8] text-black shadow-sm transition-all duration-2000 ease-out',
                    isOpen ? '' : '',
                    isAnimated ? 'opacity-100 scale-100 delay-100' : 'opacity-0 scale-75',
                  )}
                >
                  <GoogleIcon
                    name={item.icon as unknown as string}
                    className={cn(
                      '!text-[1.625rem] mb-0 min-w-[1.625rem] transition-all duration-500 ease-out',
                      isAnimated ? 'opacity-100 delay-300' : 'opacity-0',
                    )}
                  />
                </div>

                <div className="flex-1 text-left">
                  <div
                    className={cn(
                      'max-w-[90%] md:max-w-[100%] font-lato font-bold text-[16px] md:text-[0.875rem] leading-tight transition-all duration-500 ease-out',
                      isAnimated
                        ? 'opacity-100 translate-x-0 delay-500'
                        : 'opacity-0 translate-x-4',
                    )}
                  >
                    {item.heading}
                  </div>
                  {item.subheading && (
                    <div
                      className={cn(
                        'font-lato text-[12px] md:text-[0.75rem] font-light text-black mt-1 md:mt-0 min-w-[max-content] md:min-w-[unset] transition-all duration-500 ease-out',
                        isAnimated
                          ? 'opacity-100 translate-x-0 delay-600'
                          : 'opacity-0 translate-x-4',
                      )}
                    >
                      {item.subheading}
                    </div>
                  )}
                </div>

                <span
                  className={cn(
                    'absolute right-[12px] material-symbols-outlined !text-[32px] md:!text-[2rem] text-[#F59E0B] transition-all duration-300 ease-out mb-0',
                    isOpen ? 'rotate-180' : 'rotate-0',
                    isAnimated ? 'opacity-100 delay-700' : 'opacity-0',
                  )}
                  aria-hidden="true"
                >
                  expand_more
                </span>
              </button>

              <div
                className={cn(
                  'overflow-hidden transition-all duration-500 ease-out',
                  isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0',
                )}
              >
                <div
                  className={cn(
                    'px-[1.5rem] pb-[1.25rem] transform transition-all duration-500 ease-out',
                    secondaryColorLayout ? 'pt-[1rem]' : 'pt-[1rem]',
                    isOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0',
                  )}
                >
                  {item.content ? (
                    <RichText
                      data={item.content}
                      enableGutter={false}
                      enableProse={false}
                      className="[&_*]:text-[0.75rem] [&_*]:font-light"
                    />
                  ) : null}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export type { IconAccordionsBlockProps }
