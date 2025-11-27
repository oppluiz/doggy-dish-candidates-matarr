'use client'

import React from 'react'
import Link from 'next/link'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import type { SliderBlock as SliderBlockProps } from '@/payload-types'
import { Swiper as SwiperReact, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import { Navigation } from 'swiper/modules'
import 'swiper/css'

type Props = SliderBlockProps & { className?: string }

export const SliderBlockComponent: React.FC<Props> = ({
  title,
  containerSize,
  aspectRatio = 'aspect-[1/1]',
  overflowSetting = 'overflow-hidden md:overflow-visible',
  usePlaceholders = false,
  placeholderCount = 5,
  placeholderImage,
  placeholderTitle = 'Placeholder',
  items = [],
  className,
  desktopSlidesPerView = 5,
  centerSlidesOnMobile = true,
}) => {
  const swiperRef = React.useRef<SwiperType | null>(null)
  const [swiperReady, setSwiperReady] = React.useState(false)
  const [isBeginning, setIsBeginning] = React.useState(true)
  const [isEnd, setIsEnd] = React.useState(false)
  const [activeIndex, setActiveIndex] = React.useState(0)

  const realItems = (items || [])
    .map((r) => {
      const rel = r?.reference?.relationTo as
        | 'pages'
        | 'posts'
        | 'howTo'
        | 'food'
        | 'workshops'
        | 'recipes'
        | undefined
      const val = r?.reference?.value as any
      if (!rel || typeof val !== 'object') return null
      const slug = val?.slug
      const itemTitle = val?.name || val?.title || ''
      const mediaRaw = val?.meta?.image || val?.image || null
      const media = typeof mediaRaw === 'object' ? mediaRaw : null
      const href = rel === 'pages' ? `/${slug}` : `/${rel}/${slug}`
      const locked = val?.locked || false
      return { title: itemTitle, media, href, locked }
    })
    .filter(Boolean) as Array<{ title: string; media: any; href: string; locked: boolean }>

  const itemsToRender = usePlaceholders
    ? Array.from({ length: Math.max(1, placeholderCount ?? 0) }).map(() => ({
        title: placeholderTitle,
        media: placeholderImage,
        href: '#',
        locked: false,
      }))
    : realItems

  if (!itemsToRender.length) return null

  const HeadingEl = title ? (
    <h3 className="font-lato font-semibold tracking-[2px] uppercase text-[1.25rem] text-black">
      {title}
    </h3>
  ) : (
    <h3 className="font-lato font-semibold tracking-[2px] uppercase text-[1.25rem] text-black">
      No title
    </h3>
  )

  return (
    <section className={cn('w-full my-[1.5rem]', containerSize, className)}>
      <div className={cn('w-full')}>
        <div className="flex items-center justify-between mb-[1rem] md:mb-[1.625rem]">
          {swiperReady ? (
            HeadingEl
          ) : (
            <div className="h-[28px] w-[180px] bg-neutral-200 rounded animate-pulse" />
          )}
          <div className="flex items-center gap-2">
            {swiperReady ? (
              <>
                <button
                  type="button"
                  className={cn(
                    'w-[1.5rem] h-[1.5rem] rounded-full text-black flex items-center justify-center transition-colors',
                    isBeginning ? 'bg-[#C8E8DF]/40 cursor-not-allowed' : 'bg-[#C8E8DF]',
                  )}
                  aria-label="Previous"
                  disabled={isBeginning}
                  onClick={() => swiperRef.current?.slidePrev()}
                >
                  <span className="material-symbols-outlined !text-[1.25rem]">chevron_left</span>
                </button>
                <button
                  type="button"
                  className={cn(
                    'w-[1.5rem] h-[1.5rem] rounded-full text-black flex items-center justify-center transition-colors',
                    isEnd ? 'bg-[#C8E8DF]/40 cursor-not-allowed' : 'bg-[#C8E8DF]',
                  )}
                  aria-label="Next"
                  disabled={isEnd}
                  onClick={() => swiperRef.current?.slideNext()}
                >
                  <span className="material-symbols-outlined !text-[1.25rem]">chevron_right</span>
                </button>
              </>
            ) : (
              <>
                <div className="w-[1.5rem] h-[1.5rem] rounded-full bg-neutral-200 animate-pulse" />
                <div className="w-[1.5rem] h-[1.5rem] rounded-full bg-neutral-200 animate-pulse" />
              </>
            )}
          </div>
        </div>

        {!swiperReady && itemsToRender.length > 0 && (
          <div className="flex gap-[1.25rem] overflow-hidden animate-pulse">
            {Array.from({
              length: Math.max(3, Math.min(5, (itemsToRender.length || placeholderCount) ?? 0)),
            }).map((_, i) => (
              <div
                key={i}
                className={cn('min-w-[12.5rem] rounded-[0.875rem] bg-neutral-200', aspectRatio)}
              />
            ))}
          </div>
        )}

        <SwiperReact
          modules={[Navigation]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper
            setSwiperReady(true)
            setIsBeginning(swiper.isBeginning)
            setIsEnd(swiper.isEnd)
            setActiveIndex(swiper.realIndex)
          }}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning)
            setIsEnd(swiper.isEnd)
            setActiveIndex(swiper.realIndex)
          }}
          className={cn(
            !swiperReady && `opacity-0 pointer-events-none h-0 ${overflowSetting} md:!p-[0.25rem]`,
            `transition-opacity duration-300 ${overflowSetting} md:!p-[0.25rem]`,
          )}
          centeredSlides={centerSlidesOnMobile ?? undefined}
          spaceBetween={20}
          slidesPerView={1.5}
          loop={true}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: {
              slidesPerView: Number(desktopSlidesPerView),
              centeredSlides: centerSlidesOnMobile ?? undefined,
            },
          }}
        >
          {itemsToRender.map((item, i) => {
            const isActive = i === activeIndex
            const Tile = (
              <div
                className={cn(
                  'slide__item rounded-[0.875rem] overflow-hidden relative shadow transition-opacity duration-300',
                  isActive ? 'opacity-100' : 'opacity-50 md:opacity-100',
                  aspectRatio,
                )}
              >
                {item.locked && (
                  <div className="absolute z-10 top-0 right-0 bg-black/40 w-full h-full rounded-[0.875rem]"></div>
                )}
                {item.media && typeof item.media === 'object' ? (
                  <Media
                    resource={item.media as any}
                    fill
                    pictureClassName="absolute inset-0"
                    imgClassName="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-neutral-200" />
                )}
                <div className="absolute left-0 right-0 bottom-0 p-3 bg-gradient-to-t from-black/55 to-transparent">
                  <div className="text-white font-lato font-bold text-[16px]">{item.title}</div>
                </div>
              </div>
            )

            return (
              <SwiperSlide key={i}>
                {item.href && item.href !== '#' ? (
                  <Link
                    href={item.locked ? '#' : item.href}
                    className="block"
                    onClick={(e) => {
                      if (item.locked) {
                        e.preventDefault()
                        window.dispatchEvent(new CustomEvent('dd:show-popup'))
                        return
                      }
                    }}
                  >
                    {item.locked && (
                      <span className="z-20 p-2 rounded-full material-symbols-outlined text-white text-2xl absolute -top-1 -left-1 bg-[#EE6C4D]">
                        lock
                      </span>
                    )}
                    {Tile}
                  </Link>
                ) : (
                  <div>{Tile}</div>
                )}
              </SwiperSlide>
            )
          })}
        </SwiperReact>
      </div>
    </section>
  )
}

export default SliderBlockComponent
