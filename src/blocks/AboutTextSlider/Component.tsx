'use client'

import React from 'react'
import { Paytone_One } from 'next/font/google'
import { cn } from '@/utilities/ui'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const paytone = Paytone_One({ subsets: ['latin'], weight: '400' })

type Slide = {
  icon?: string | null
  title?: string | null
  paragraph?: string | null
}

type Props = {
  heading?: string
  accentWord?: string
  content?: string | null
  slides?: Slide[]
  className?: string
}

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const AccentHeading: React.FC<{ heading: string; accentWord?: string }> = ({ heading, accentWord }) => {
  if (!heading) return null
  if (!accentWord) return <span className={paytone.className}>{heading}</span>
  const re = new RegExp(`(${escapeRegExp(accentWord)})`, 'i')
  const parts = heading.split(re)
  return (
    <span>
      {parts.map((p, i) =>
        re.test(p) ? (
          <span className={[paytone.className, 'text-[#FFA12F]'].join(' ')} key={i}>
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

const GoogleIcon: React.FC<{ name?: string; className?: string }> = ({ name, className }) => {
  if (!name) return null
  if (name === 'meat_icon') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 48 48" fill="none" className={className}>
        <path d="M30.9399 41.5707C30.087 41.5707 29.1945 41.4914 28.2822 41.3129C24.2164 40.5394 21.281 37.8817 18.4449 35.3034C17.3342 34.3117 16.2037 33.2605 14.974 32.3284C13.8237 31.4755 12.7527 30.8012 11.7015 30.1467C8.01252 27.8262 5.09702 25.9817 4.48219 19.0797C4.28385 17.7707 4.48219 15.9262 6.12835 13.923L6.30685 13.7049C9.83719 9.52003 17.473 7.49703 25.7832 8.50853C33.6372 9.46053 39.7062 12.8124 42.0069 17.4732C42.8399 19.0797 43.2167 20.944 43.1175 22.8877C43.1572 26.4775 42.701 34.9464 37.7229 39.1907C35.8387 40.7972 33.5579 41.6104 30.9002 41.6104L30.9399 41.5707Z" fill="black" />
      </svg>
    )
  }
  return (
    <span className={cn('material-symbols-outlined', className)} aria-hidden="true">
      {name}
    </span>
  )
}

export const AboutTextSliderBlock: React.FC<Props> = ({
  heading = '',
  accentWord,
  content,
  slides = [],
  className,
}) => {
  if (!slides.length) return null

  return (
    <section className={cn('bg-[rgba(233,246,242,1)] py-[2.5rem] md:py-[4rem]', className)}>
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
        {/* Left text */}
        <div>
          <h2 className="text-black font-black md:[&_*]:text-[3.25rem] [&_*]:leading-[1.05] [&_*]:uppercase mb-3">
            <AccentHeading heading={heading} accentWord={accentWord} />
          </h2>
          {content && (
            <p className="text-black font-lato text-[0.925rem] md:text-[1rem] leading-6">
              {content}
            </p>
          )}
        </div>

        {/* Right slider */}
        <div className="relative">
          {/* Navigation buttons (top-right) */}
          <div className="absolute right-2 top-2 z-10 flex gap-2">
            <button
              type="button"
              className="aboutTextSlider-prev rounded-full bg-white/80 border border-black/10 w-8 h-8 grid place-items-center shadow-sm"
              aria-label="Previous slide"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            </button>
            <button
              type="button"
              className="aboutTextSlider-next rounded-full bg-white/80 border border-black/10 w-8 h-8 grid place-items-center shadow-sm"
              aria-label="Next slide"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>

          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={16}
            slidesPerView={1}
            navigation={{
              prevEl: '.aboutTextSlider-prev',
              nextEl: '.aboutTextSlider-next',
            }}
            pagination={{
              clickable: true,
              bulletClass:
                'swiper-pagination-bullet !w-2.5 !h-2.5 !bg-gray-300 !opacity-100 !transition-all !duration-300',
              bulletActiveClass: 'swiper-pagination-bullet-active !w-6 !bg-[#E86D50] !rounded-full',
            }}
            breakpoints={{
              768: { slidesPerView: 1.1 },
              1024: { slidesPerView: 1.2 },
            }}
          >
            {slides.map((s, i) => (
              <SwiperSlide key={i}>
                <div className="rounded-2xl bg-[#F6C59F] shadow p-6 md:p-7 text-black">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center">
                      <GoogleIcon name={s.icon as string} className="!text-[20px]" />
                    </div>
                    <div className="font-lato font-bold text-[0.95rem]">{s.title}</div>
                  </div>
                  {s.paragraph && (
                    <p className="font-lato text-[0.875rem] leading-6">
                      {s.paragraph}
                    </p>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}

export default AboutTextSliderBlock