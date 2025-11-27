'use client'
import React from 'react'
import type { HubHeroBlock as HubHeroBlockProps } from '@/payload-types'
import { Paytone_One } from 'next/font/google'
import { useRouter } from 'next/navigation'

const paytone = Paytone_One({ subsets: ['latin'], weight: '400' })

type Props = HubHeroBlockProps & {
  className?: string
  disableInnerContainer?: boolean
  pageTitle?: string
}

export const HubHeroBlock: React.FC<Props> = ({
  containerSize = 'container',
  backgroundColor = '#41A690',
  heading = 'Food Hub',
  subheading = "Science-backed nutrition for your dog's best life",
  searchPlaceholder = 'Search...',
  className,
}) => {
  const [value, setValue] = React.useState('')
  const router = useRouter()

  return (
    <section className="w-full py-[1.5rem] md:py-[2.5rem] mb-[1.25rem]" style={{ backgroundColor }}>
      <div className={[containerSize, className].filter(Boolean).join(' ')}>
        <div className="flex flex-col items-center text-center">
          {heading && (
            <h1
              className={[
                paytone.className,
                'text-white font-black text-[1.5rem] md:text-[2.625rem] leading-[1] mb-[0.75rem]',
              ].join(' ')}
            >
              {heading}
            </h1>
          )}
          {subheading && (
            <p className="text-white font-lato font-bold text-[0.875rem] md:text-[1.25rem] mb-[0.75rem]">
              {subheading}
            </p>
          )}

          {/* Search */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              const q = value.trim()
              router.push(`/search${q ? `?q=${encodeURIComponent(q)}` : ''}`)
            }}
            className="mx-auto relative w-full max-w-[22rem]"
          >
            <input
              type="text"
              name="q"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              placeholder={searchPlaceholder || 'Search...'}
              className="font-lato font-light bg-[#FFFFF8]/50 overflow-hidden w-full h-[2.375rem] rounded-full border-[0.088rem] border-solid border-white px-[1.5rem] pr-[3rem] text-[0.75rem] outline-none placeholder:text-black"
            />
            <button
              type="submit"
              className="absolute right-0 top-0 inline-flex items-center h-full w-[2.75rem] justify-center bg-[#FFFFF8] rounded-tr-full rounded-br-full"
              aria-label="Search"
            >
              <span className="material-symbols-outlined !text-[1rem] text-black">search</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
