'use client'

import React from 'react'
import { Paytone_One } from 'next/font/google'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

const paytone = Paytone_One({ subsets: ['latin'], weight: '400' })

type Props = {
  heading?: string
  accentWord?: string
  imageLeft?: any
  imageCenter?: any
  imageRight?: any
  showArrow?: boolean
  className?: string
}

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

export const AboutHeroBlock: React.FC<Props> = ({
  heading = '',
  accentWord,
  imageLeft,
  imageCenter,
  imageRight,
  showArrow = true,
  className,
}) => {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(t)
  }, [])

  const renderHeading = () => {
    if (!heading) return null
    if (!accentWord) {
      return <span>{heading}</span>
    }
    const re = new RegExp(`(${escapeRegExp(accentWord)})`, 'i')
    const parts = heading.split(re)
    return (
      <span>
        {parts.map((p, i) =>
          re.test(p) ? (
            <span className={[paytone.className, 'text-[#EE6C4D]'].join(' ')} key={i}>
              {p}
            </span>
          ) : (
            <span className={[paytone.className].join(' ')} key={i}>
              {p}
            </span>
          ),
        )}
      </span>
    )
  }

  return (
    <section className={cn('container my-[2rem] md:my-[3rem]', className)}>
      <div className="w-full flex items-center justify-center gap-4">
        {/* Left circle */}
        <div
          className={cn(
            'relative w-[190px] h-[190px] md:w-[270px] md:h-[270px] rounded-full overflow-hidden',
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
            'transition-all duration-500',
          )}
          style={{ transitionDelay: '0ms' }}
        >
          {imageLeft ? (
            <Media
              resource={imageLeft}
              fill
              imgClassName="object-cover"
              pictureClassName="absolute inset-0"
            />
          ) : (
            <div className="w-full h-full bg-neutral-200" />
          )}
        </div>

        {/* Center arch */}
        <div
          className={cn(
            'relative w-[220px] h-[220px] md:w-[270px] md:h-[270px] overflow-hidden',
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
            'transition-all duration-500',
          )}
          style={{ transitionDelay: '200ms' }}
        >
          {imageCenter ? (
            <Media
              resource={imageCenter}
              fill
              imgClassName="object-cover"
              pictureClassName="absolute inset-0"
            />
          ) : (
            <div className="w-full h-full bg-neutral-200" />
          )}
        </div>

        {/* Right circle */}
        <div
          className={cn(
            'relative w-[190px] h-[190px] md:w-[270px] md:h-[270px] rounded-t-full overflow-hidden',
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
            'transition-all duration-500',
          )}
          style={{ transitionDelay: '400ms' }}
        >
          {imageRight ? (
            <Media
              resource={imageRight}
              fill
              imgClassName="object-cover"
              pictureClassName="absolute inset-0"
            />
          ) : (
            <div className="w-full h-full bg-neutral-200" />
          )}
        </div>
      </div>

      {/* Heading */}
      <div className="mt-8 md:mt-10 text-center">
        <h2
          className={[
            paytone.className,
            'text-black [&_*]:text-center mx-auto max-w-[80%] [&_*]:font-black [&_*]:text-[1.75rem] md:[&_*]:text-[4rem] [&_*]:leading-[1.05] [&_*]:uppercase',
          ].join(' ')}
        >
          {renderHeading()}
        </h2>
      </div>

      {/* Down arrow with delayed slide-in */}
      {showArrow && (
        <div className="mt-6 md:mt-8 flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className={cn(
              'rotate-90 w-[4rem]',
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2',
              'transition-all duration-500',
            )}
            style={{ transitionDelay: '800ms', fontSize: '28px' }}
          >
            <path d="M158.53,473c-4.45,0-8.9-1.11-12.23-4.45a16.12,16.12,0,0,1,0-23.35L334.23,257.25,146.3,69.33A16.51,16.51,0,0,1,169.65,46l199,199a16.12,16.12,0,0,1,0,23.35l-199,200.15A14.28,14.28,0,0,1,158.53,473Z"></path>
          </svg>
        </div>
      )}
    </section>
  )
}

export default AboutHeroBlock
