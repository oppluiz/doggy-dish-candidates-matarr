'use client'

import React from 'react'
import Link from 'next/link'
import { Media } from '@/components/Media'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface Workshop {
  id: string
  title: string
  slug: string
  meta?: {
    image?: any
  }
  createdAt: string
}

interface RecentWorkshopsClientProps {
  heading: string
  workshops: Workshop[]
  className?: string
}

export const RecentWorkshopsClient: React.FC<RecentWorkshopsClientProps> = ({
  heading,
  workshops,
  className,
}) => {
  if (!workshops || workshops.length === 0) {
    return (
      <section className={`container my-[21px] overflow-hidden ${className || ''}`}>
        <div className="text-center py-8 text-gray-500">No workshops available</div>
      </section>
    )
  }

  // Add loop state for arrows
  const [isBeginning, setIsBeginning] = React.useState(true)
  const [isEnd, setIsEnd] = React.useState(false)
  const prevBtnRef = React.useRef<HTMLButtonElement | null>(null)
  const nextBtnRef = React.useRef<HTMLButtonElement | null>(null)

  return (
    <section
      className={`container my-[21px] overflow-hidden pb-[1rem] md:pb-[1.5rem] ${className || ''}`}
    >
      {/* Desktop Layout */}
      <div className="hidden md:block">
        <h2 className="font-bold font-lato text-[1.25rem] uppercase tracking-[0.088rem] mb-[2rem]">
          {heading}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1.375rem]">
          {workshops.slice(0, 3).map((workshop, index) => (
            <WorkshopCard key={`${workshop.id}-${index}`} workshop={workshop} />
          ))}
        </div>
      </div>

      {/* Mobile Layout - Swiper */}
      <div className="block md:hidden">
        <div className="flex items-center justify-between mb-[1.125rem] md:mb-6">
          <h2 className="text-[1.25rem] font-bold font-lato uppercase tracking-[0.088rem] mb-0">
            {heading}
          </h2>
          <div className="flex gap-2">
            <button
              ref={prevBtnRef}
              className={`w-[1.625rem] h-[1.625rem] rounded-full text-black flex items-center justify-center transition-colors ${
                isBeginning
                  ? 'bg-[#C8E8DF]/40 cursor-not-allowed'
                  : 'bg-[#C8E8DF] hover:bg-[#C8E8DF]/40'
              }`}
              disabled={isBeginning}
            >
              <span className="material-symbols-outlined !text-[1.5rem] text-gray-600">
                chevron_left
              </span>
            </button>
            <button
              ref={nextBtnRef}
              className={`w-[1.625rem] h-[1.625rem] rounded-full text-black flex items-center justify-center transition-colors ${
                isEnd ? 'bg-[#C8E8DF]/40 cursor-not-allowed' : 'bg-[#C8E8DF] hover:bg-[#C8E8DF]/40'
              }`}
              disabled={isEnd}
            >
              <span className="material-symbols-outlined !text-[1.5rem] left-[1px] relative text-gray-600">
                chevron_right
              </span>
            </button>
          </div>
        </div>

        <Swiper
          className="md:!pb-12 !overflow-visible md:!overflow-hidden"
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={1.2}
          navigation={{
            enabled: true,
            prevEl: prevBtnRef.current,
            nextEl: nextBtnRef.current,
          }}
          onBeforeInit={(swiper) => {
            // Bind this swiper to the local button refs to avoid cross-instance binding
            swiper.params.navigation = {
              ...(swiper.params.navigation || {}),
              prevEl: prevBtnRef.current,
              nextEl: nextBtnRef.current,
            }
          }}
          onInit={(swiper) => {
            swiper.navigation.init()
            swiper.navigation.update()
            setIsBeginning(swiper.isBeginning)
            setIsEnd(swiper.isEnd)
          }}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning)
            setIsEnd(swiper.isEnd)
          }}
        >
          {workshops.slice(0, 3).map((workshop, index) => (
            <SwiperSlide key={`${workshop.id}-${index}`}>
              <WorkshopCard workshop={workshop} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Pagination for Mobile */}
        <div className="swiper-pagination-recent flex justify-center mt-4"></div>
      </div>

      <style jsx>{`
        :global(.swiper-pagination-recent .swiper-pagination-bullet) {
          width: 8px !important;
          height: 8px !important;
          background: #d1d5db !important;
          opacity: 1 !important;
          margin: 0 4px !important;
          cursor: pointer !important;
        }
        :global(.swiper-pagination-recent .swiper-pagination-bullet-active) {
          background: #e86d50 !important;
        }
      `}</style>
    </section>
  )
}

const WorkshopCard: React.FC<{ workshop: Workshop }> = ({ workshop }) => {
  const image = workshop.meta?.image
  const href = `/workshops/${workshop.slug}`

  return (
    <Link href={href} className="block group">
      <article className="bg-white rounded-2xl overflow-hidden shadow-[0px_8px_20px_0px_rgba(0,0,0,0.1)] hover:shadow-[0px_8px_20px_0px_rgba(0,0,0,0.2)] transition-all duration-300 group-hover:scale-[1.02]">
        {image && (
          <div className="aspect-[1.05/1] overflow-hidden relative">
            <Media resource={image} className="w-full h-full object-cover" />
            {/* Gradient overlay */}
            <div className="absolute inset-0" />

            {/* Text overlay */}
            <div className="absolute bottom-0 left-0 right-0 pl-[1rem] pr-[2.25rem] py-[1.375rem] md:px-[2.25rem] md:py-[1.375rem] text-black bg-white">
              <h3 className="font-bold font-lato text-[1.125rem] md:text-[0.875rem] leading-[1] mb-[0.25rem] md:mb-0">
                {workshop.title}
              </h3>
              <p className="text-[0.875rem] md:text-[0.75rem] font-light font-lato">30m 23s</p>
            </div>
          </div>
        )}

        {/* Fallback if no image */}
        {!image && (
          <div className="aspect-[1.05/1] bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center relative">
            <div className="absolute inset-0" />
            <div className="absolute bottom-0 left-0 right-0 pl-[1rem] pr-[2.25rem] py-[1.375rem] md:px-[2.25rem] md:py-[1.375rem] text-black bg-white">
              <h3 className="font-bold font-lato text-[1.125rem] md:text-[0.875rem] leading-[1] mb-[0.25rem] md:mb-0">
                {workshop.title}
              </h3>
              <p className="text-[0.875rem] md:text-[0.75rem] font-light font-lato">30m 23s</p>
            </div>
          </div>
        )}
      </article>
    </Link>
  )
}
