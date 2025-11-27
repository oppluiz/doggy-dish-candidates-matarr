'use client'

import React from 'react'
import Link from 'next/link'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

import type { CollectionItemSliderBlock as CollectionItemSliderBlockProps } from '@/payload-types'
import { Swiper as SwiperReact, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import { Navigation } from 'swiper/modules'
import 'swiper/css'

type Props = CollectionItemSliderBlockProps & { className?: string }

export const CollectionItemSliderBlock: React.FC<Props> = ({
  heading,
  aspectRatio,
  overflowSetting,
  widthConstraint = false,
  usePlaceholders,
  placeholderCount = 5,
  placeholderImage,
  displayTitleInsideBox = true,
  placeholderTitle = 'Placeholder',
  items = [],
  className,
}) => {
  const swiperRef = React.useRef<SwiperType | null>(null)
  const [swiperReady, setSwiperReady] = React.useState(false)
  const [isBeginning, setIsBeginning] = React.useState(true)
  const [isEnd, setIsEnd] = React.useState(false)
  const [activeIndex, setActiveIndex] = React.useState(0)

  const realItems = (items || [])
    .map((r) => {
      const rel = r?.reference?.relationTo as 'pages' | 'posts' | 'workshops' | undefined
      const val = r?.reference?.value as any
      if (!rel || typeof val !== 'object') return null
      const slug = val?.slug
      const title = val?.title || ''
      const media = val?.meta?.image || val?.image || null
      const href = rel === 'pages' ? `/${slug}` : `/${rel}/${slug}`
      const locked = val?.locked || false
      return { title, media, href, locked }
    })
    .filter(Boolean) as Array<{ title: string; media: any; href: string; locked: boolean }>

  const itemsToRender = usePlaceholders
    ? Array.from({ length: Math.max(1, placeholderCount) }).map(() => ({
        title: placeholderTitle,
        media: placeholderImage,
        href: '#',
        locked: false,
      }))
    : realItems

  if (!itemsToRender.length) return null

  return (
    <section className={cn('w-full', className)}>
      <div className={cn('w-full', widthConstraint && 'max-w-[1219px] mx-auto')}>
        <div className="flex items-center justify-between mb-[17px] md:mb-[1.625rem]">
          {heading ? (
            swiperReady ? (
              <h3 className="font-lato font-semibold tracking-[2px] uppercase text-[1.25rem] text-black">
                {heading}
              </h3>
            ) : (
              <div className="h-[28px] w-[180px] bg-neutral-200 rounded animate-pulse" />
            )
          ) : (
            <div />
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

        {!swiperReady && (
          <div className="flex gap-[1.25rem] overflow-hidden animate-pulse">
            {Array.from({
              length: Math.max(3, Math.min(5, itemsToRender.length || placeholderCount)),
            }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  'min-w-[12.5rem] sm:min-w-[12.5rem] rounded-[0.875rem] bg-neutral-200',
                  aspectRatio,
                )}
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
            setActiveIndex(swiper.realIndex) // use realIndex when loop is true
          }}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning)
            setIsEnd(swiper.isEnd)
            setActiveIndex(swiper.realIndex) // use realIndex when loop is true
          }}
          className={cn(
            !swiperReady && `opacity-0 pointer-events-none h-0 ${overflowSetting} md:!pr-[0.75rem]`,
            `transition-opacity duration-300 ${overflowSetting} md:!pr-[0.75rem]`,
          )}
          centeredSlides={true}
          spaceBetween={20}
          slidesPerView={1.5}
          loop={true}
          breakpoints={{
            640: { slidesPerView: 2.3, centeredSlides: false },
            768: { slidesPerView: 3, centeredSlides: false },
            1024: { slidesPerView: 4, centeredSlides: false },
            1280: { slidesPerView: 4, centeredSlides: false },
          }}
        >
          {itemsToRender.map((item, i) => {
            const isActive = i === activeIndex

            // Image box (absolute image inside a relative container)
            const imageBox = (
              <div
                className={cn(
                  'slide__item min-h-[9rem] md:min-w-[12.5rem] md:min-h-[166px] rounded-[0.875rem] overflow-hidden relative shadow transition-opacity duration-300',
                  isActive ? 'opacity-100' : 'opacity-50 md:opacity-100',
                  aspectRatio,
                )}
              >
                {item.locked && (
                  <div className="absolute z-10 top-0 right-0 bg-black/40 w-full h-full rounded-[0.875rem]"></div>
                )}
                {item.media ? (
                  <Media
                    resource={item.media as any}
                    fill
                    pictureClassName="absolute inset-0"
                    imgClassName="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-neutral-200" />
                )}

                {/* Only overlay the title inside the image when displayTitleInsideBox is true */}
                {displayTitleInsideBox && (
                  <div className="absolute left-0 right-0 bottom-0 text-white font-lato font-bold text-[16px] p-3 bg-gradient-to-t from-black/55 to-transparent">
                    {item.title}
                  </div>
                )}
              </div>
            )

            // Tile: if not inside, render title below as a sibling
            const Tile = displayTitleInsideBox ? (
              imageBox
            ) : (
              <div>
                {imageBox}
                <div className="text-center max-w-[80%] md:max-w-[90%] leading-[1] mx-auto text-black md:text-left md:ml-[0.75rem] !underline pb-[2px] mt-[0.75rem] font-lato font-bold text-[1rem]">
                  {item.title}
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

export default CollectionItemSliderBlock
