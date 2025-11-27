'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import type { FeaturedBlock } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

export const FeaturedBlock: React.FC<FeaturedBlock> = ({ heading, items }) => {
  if (!items || items.length === 0) return null

  const getItemData = (item: any) => {
    const reference = item.item || item.reference
    if (!reference || typeof reference !== 'object') return null

    const { value, relationTo } = reference
    if (!value || typeof value !== 'object') return null

    // Get the collection type for display
    const collectionType =
      relationTo === 'posts'
        ? 'Recipe'
        : relationTo === 'workshops'
          ? 'Workshop'
          : relationTo === 'food'
            ? 'Food'
            : relationTo === 'howTo'
              ? 'How To'
              : relationTo === 'health'
                ? 'Health'
                : 'Item'

    // Get the image - prioritize SEO meta image, then fallback to other images
    const metaImage = value.meta?.image
    const regularImage = value.image || value.featuredImage || value.heroImage
    const image = metaImage || regularImage
    const imageUrl = image && typeof image === 'object' ? image.url : null
    const locked = value.locked || false

    // Get the title
    const title = value.title || value.name

    // Get the slug for the link
    const slug = value.slug

    return {
      title,
      image: imageUrl,
      collectionType,
      slug,
      relationTo,
      locked,
    }
  }

  return (
    <section className="container mb-[2.5rem]">
      {/* Main container with rounded corners and shadow */}
      <div className="rounded-[0.875rem] overflow-hidden shadow-[0px_8px_20px_0px_rgba(0,0,0,0.1)] bg-[#FFFFF8]">
        {/* Header bar */}
        <div className="text-center md:text-left bg-[#E86D50] text-white tracking-[0.1rem] py-[0.75rem] md:py-[1.125rem] px-[1.75rem] md:px-[2rem] text-[1.25rem] md:text-[1.25rem] font-bold font-lato">
          {heading || 'FEATURED ITEMS'}
        </div>

        {/* Content area */}
        <div className="p-[1.5rem] pb-[0.25rem] md:px-[1.875rem] md:py-[1.5rem]">
          {/* Desktop Grid - Hidden on mobile */}
          <div className="hidden md:grid md:grid-cols-4 gap-[1.5rem]">
            {items.map((item, index) => {
              const itemData = getItemData(item)
              if (!itemData) return null
              return (
                <Link
                  key={index}
                  onClick={(e) => {
                    if (itemData.locked) {
                      e.preventDefault()
                      window.dispatchEvent(new CustomEvent('dd:show-popup'))
                      return
                    }
                  }}
                  href={itemData.locked ? '#' : `/${itemData.relationTo}/${itemData.slug}`}
                  className="block group relative"
                >
                  {itemData.locked && (
                    <span className="z-20 p-2 rounded-full material-symbols-outlined text-white text-2xl absolute -top-1 -left-1 bg-[#EE6C4D]">
                      lock
                    </span>
                  )}
                  <article className="relative">
                    {itemData.locked && (
                      <div className="absolute z-10 top-0 right-0 bg-black/40 w-full h-full rounded-[0.875rem]"></div>
                    )}
                    {/* Image */}
                    <div className="relative rounded-[0.875rem] h-[10rem] w-[12.5rem] overflow-hidden aspect-video">
                      {itemData.image ? (
                        <Image
                          src={itemData.image}
                          alt={itemData.title || ''}
                          fill
                          className="object-cover"
                          quality={100}
                        />
                      ) : (
                        <div className="w-full h-full bg-yellow-400" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="pt-[0.75rem] px-[0.25rem] pb-0">
                      <div className="prose">
                        <h3 className="text-[0.875rem] font-lato font-bold group-hover:text-orange-500 transition-colors leading-[1.5]">
                          {itemData.title}
                        </h3>
                        <p className="text-[0.75rem] text-gray-500 leading-[1.5]">
                          {itemData.collectionType}
                        </p>
                      </div>
                    </div>
                  </article>
                </Link>
              )
            })}
          </div>

          {/* Mobile Swiper - Visible only on mobile */}
          <div className="md:hidden">
            <Swiper
              modules={[Pagination]}
              spaceBetween={16}
              slidesPerView={1}
              pagination={{
                clickable: true,
                bulletClass:
                  'swiper-pagination-bullet !w-3 !h-3 !bg-gray-300 !opacity-100 !transition-all !duration-300',
                bulletActiveClass:
                  'swiper-pagination-bullet-active !w-8 !bg-[#E86D50] !rounded-full',
              }}
              className="featured-swiper"
            >
              {items.map((item, index) => {
                const itemData = getItemData(item)
                if (!itemData) return null

                return (
                  <SwiperSlide key={index}>
                    <Link href={`/${itemData.relationTo}/${itemData.slug}`} className="block group">
                      <article className="">
                        {/* Image */}
                        <div className="relative w-full rounded-[0.875rem] overflow-hidden aspect-video">
                          {itemData.image ? (
                            <Image
                              src={itemData.image}
                              alt={itemData.title || ''}
                              fill
                              className="object-cover"
                              quality={100}
                            />
                          ) : (
                            <div className="w-full h-full bg-yellow-400" />
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-4 pb-0 text-center">
                          <div className="prose">
                            <h3 className="text-[20px] font-lato font-bold group-hover:text-orange-500 transition-colors">
                              {itemData.title}
                            </h3>
                            <p className="text-sm text-gray-500 mt-2">{itemData.collectionType}</p>
                          </div>
                        </div>
                      </article>
                    </Link>
                  </SwiperSlide>
                )
              })}
            </Swiper>

            {/* Custom pagination styling */}
            <style jsx global>{`
              .featured-swiper .swiper-pagination {
                position: relative;
                margin-top: 20px;
                text-align: center;
              }
              .featured-swiper .swiper-pagination-bullet {
                margin: 0 4px;
                cursor: pointer;
                background-color: #c8e8df !important;
              }
              .featured-swiper .swiper-pagination-bullet-active {
                background-color: #c8e8df !important;
              }
            `}</style>
          </div>
        </div>
      </div>
    </section>
  )
}
