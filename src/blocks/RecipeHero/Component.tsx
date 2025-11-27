'use client'

import type { RecipeHeroBlock as RecipeHeroBlockProps } from 'src/payload-types'
import React from 'react'
import { Media } from '@/components/Media'
import Link from 'next/link'
import { cn } from '@/utilities/ui'
import { Paytone_One } from 'next/font/google'

const paytone = Paytone_One({ subsets: ['latin'], weight: '400' })

type Props = {
  className?: string
} & RecipeHeroBlockProps

export const RecipeHeroBlock: React.FC<Props> = ({
  className,
  image,
  heading,
  whoIsThisFor,
  containerSize,
}) => {
  return (
    <div className={cn(containerSize, 'md:!px-0', className)}>
      <div className={cn('w-full', '')}>
        <div className="flex flex-col md:flex-row items-end gap-[1rem] md:gap-[2.625rem] bg-[#EEF8F0] md:bg-transparent pt-[2.625rem] pb-[2.5rem] px-[1.75rem] md:p-0 rounded-[1.25rem]">
          {/* Heading (Mobile) */}
          <h1
            className={[
              paytone.className,
              'block md:hidden font-normal text-black text-[1.25rem] text-center max-w-[70%] mx-auto leading-[1.2] md:leading-[1]',
            ].join(' ')}
          >
            {heading}
          </h1>

          {/* Image */}
          <div className="w-full lg:w-1/2">
            <div className="relative min-w-[18rem] md:min-w-[25.5rem] aspect-[4/3] rounded-[0.875rem] overflow-hidden bg-yellow-400">
              {image && typeof image === 'object' && (
                <Media
                  resource={image}
                  pictureClassName="w-full h-full object-cover"
                  className="w-full h-full object-cover"
                  imgClassName="w-full h-full object-cover"
                />
              )}
            </div>
          </div>

          {/* Content */}
          <div className="w-full lg:w-1/2 md:space-y-6">
            {/* Heading (Desktop) */}
            <h1
              className={[
                paytone.className,
                'hidden md:block font-normal text-black text-[2.625rem] leading-[1]',
              ].join(' ')}
            >
              {heading}
            </h1>

            {/* Who is this for */}
            {whoIsThisFor && (
              <div className="flex flex-col md:flex-row space-x-[0.25rem] items-center">
                <span className="font-lato text-[1rem] md:text-[0.875rem] font-bold text-black">
                  Who is this recipe for?
                </span>
                <div>
                  {whoIsThisFor.link?.url ? (
                    <Link
                      href={whoIsThisFor.link.url}
                      className="font-lato text-[1rem] text-center md:text-left md:text-[0.875rem] font-normal text-black underline hover:no-underline transition-all"
                    >
                      {whoIsThisFor.text}
                    </Link>
                  ) : (
                    <span className="font-lato text-[1rem] text-center md:text-left md:text-[0.875rem] font-normal text-black underline hover:no-underline transition-all">
                      {whoIsThisFor.text}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Jump to recipe */}
            <div className="md:hidden pt-[1.125rem] pb-[0.5rem]">
              <a
                type="button"
                href="#tabbed-content"
                className="w-full justify-center md:w-auto inline-flex items-center gap-[0.5rem] bg-[#C8E8DF] hover:bg-[#C8E8DF]/70 md:bg-[#41A690] hover:md:bg-[#41A690]/70 text-black md:text-white text-[0.875rem] font-lato tracking-[0.061rem] font-normal px-[1.5rem] py-[0.875rem] rounded-full transition-colors"
              >
                <span className="material-symbols-outlined !text-[1.25rem]">arrow_downward</span>
                JUMP TO RECIPE
              </a>
            </div>

            {/* Print Recipe Button */}
            <div className="md:pt-[1.125rem] md:pb-[0.5rem]">
              <button
                type="button"
                className="w-full justify-center md:w-auto inline-flex items-center gap-[0.5rem] bg-[#C8E8DF] hover:bg-[#C8E8DF]/70 md:bg-[#41A690] hover:md:bg-[#41A690]/70 text-black md:text-white text-[0.875rem] font-lato tracking-[0.061rem] font-normal px-[1.5rem] py-[0.875rem] rounded-full transition-colors"
                onClick={() => {
                  // Print functionality will be implemented later
                  console.log('Print recipe clicked')
                }}
              >
                <span className="material-symbols-outlined !text-[1.25rem]">print</span>
                PRINT RECIPE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
