'use client'

import React from 'react'
import { Paytone_One } from 'next/font/google'
import { cn } from '@/utilities/ui'

const paytone = Paytone_One({ subsets: ['latin'], weight: '400' })

type Props = {
  heading?: string
  subheading?: string
  className?: string
}

export const AboutBannerBlock: React.FC<Props> = ({ heading = '', subheading = '', className }) => {
  return (
    <section className={cn('w-full pb-20 bg-[rgba(233,246,242,1)]', className)}>
      <div className="relative">
        {/* Top accent */}
        <div className="absolute left-0 right-0 -top-6 h-[24px] bg-[rgba(209,229,159,1)] rotate-[-2.5deg]" />
        {/* Bottom accent */}
        <div className="absolute left-0 right-0 -bottom-6 h-[24px] bg-[rgba(209,229,159,1)] rotate-[-2.5deg]" />
        {/* Main angled banner */}
        <div className="relative bg-[#EE6C4D] text-white py-6 md:py-8 rotate-[-2.5deg] w-[110%] -left-[5%]">
          <div className="container text-center">
            <div
              className={[
                paytone.className,
                'font-black uppercase text-[1.35rem] md:text-[3rem] text-[rgba(200,232,223,1)] leading-[1.05]',
              ].join(' ')}
            >
              {heading}
            </div>
            <div
              className={[
                paytone.className,
                'mt-2 uppercase font-lato font-extrabold text-white text-[1.1rem] md:text-[3rem] leading-[1.05]',
              ].join(' ')}
            >
              {subheading}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutBannerBlock
