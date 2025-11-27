'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Media } from '@/components/Media'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'

interface CollectionData {
  slug: string
  displayName: string
  items: any[]
}

interface ToggledCollectionsClientProps {
  collectionsData: CollectionData[]
}

// Skeleton component for loading state
const CollectionSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="relative rounded-2xl overflow-hidden bg-gray-200">
            <div className="aspect-[4/3] bg-gray-300"></div>
            <div className="absolute bottom-0 left-0 right-0 px-[1.5rem] pb-[1rem]">
              <div className="h-4 bg-gray-400 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export const ToggledCollectionsClient: React.FC<ToggledCollectionsClientProps> = ({
  collectionsData,
}) => {
  const [activeCollection, setActiveCollection] = useState(0)
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const prevBtnRef = React.useRef<HTMLButtonElement | null>(null)
  const nextBtnRef = React.useRef<HTMLButtonElement | null>(null)
  const swiperRef = React.useRef<SwiperType | null>(null)

  if (!collectionsData || collectionsData.length === 0) return null

  const currentCollection = collectionsData[activeCollection]

  // Simulate loading delay and handle initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500) // Show skeleton for 500ms minimum

    return () => clearTimeout(timer)
  }, [])

  // Reset loading when collection changes
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 200) // Shorter delay for collection switches

    return () => clearTimeout(timer)
  }, [activeCollection])

  const getItemData = (item: any, collectionSlug: string) => {
    // Get the image - prioritize SEO meta image, then fallback to other images
    const metaImage = item.meta?.image
    const regularImage = item.image || item.featuredImage || item.heroImage
    const image = metaImage || regularImage
    const locked = item.locked || false

    // Get the title
    const title = item.title || item.name

    // Get the slug for the link
    const slug = item.slug

    // Get collection type for display
    const collectionType =
      collectionSlug === 'posts'
        ? 'Recipe'
        : collectionSlug === 'workshops'
          ? 'Workshop'
          : collectionSlug === 'food'
            ? 'Food'
            : collectionSlug === 'howTo'
              ? 'How To'
              : collectionSlug === 'health'
                ? 'Health'
                : 'Item'

    return {
      title,
      image,
      collectionType,
      slug,
      locked,
      collectionSlug,
    }
  }

  const getCollectionPath = (collectionSlug: string) => {
    const pathMap: Record<string, string> = {
      posts: '/posts',
      workshops: '/workshops',
      food: '/food',
      howTo: '/how-to',
      health: '/health',
    }
    return pathMap[collectionSlug] || `/${collectionSlug}`
  }

  const computeEdges = (swiper: SwiperType) => {
    // Use translate vs min/max with rounding to avoid float issues
    const t = Math.round(swiper.translate)
    const minT = Math.round(swiper.minTranslate())
    const maxT = Math.round(swiper.maxTranslate())
    const locked = swiper.isLocked === true
    const begin = locked || t === minT || swiper.isBeginning
    const end = locked || t === maxT || swiper.isEnd
    setIsBeginning(begin)
    setIsEnd(end)
  }

  const handleSwiperInit = (swiper: SwiperType) => {
    if (prevBtnRef.current && nextBtnRef.current) {
      swiper.params.navigation = {
        ...(swiper.params.navigation || {}),
        prevEl: prevBtnRef.current,
        nextEl: nextBtnRef.current,
      }
      swiper.navigation.init()
      swiper.navigation.update()
    }
    // Ensure internals are up-to-date before computing
    swiper.update()
    computeEdges(swiper)
  }

  const handleSlideChange = (swiper: SwiperType) => {
    computeEdges(swiper)
  }

  const handleCollectionChange = (index: number) => {
    setActiveCollection(index)
    // Let Swiper mount, then recompute edges using ref
    setTimeout(() => {
      const s = swiperRef.current
      if (s) {
        computeEdges(s)
      } else {
        // Fallback when not yet mounted: disable next if items fit in view
        const w = typeof window !== 'undefined' ? window.innerWidth : 1024
        const spv = w >= 1024 ? 4 : w >= 768 ? 3 : w >= 640 ? 2 : 1.8
        const itemsCount = collectionsData[index]?.items?.length || 0
        setIsBeginning(true)
        setIsEnd(itemsCount <= spv)
      }
    }, 0)
  }

  return (
    <section className="container my-[0.875rem] mb-[3.75rem] overflow-hidden">
      <div className="relative">
        {/* Header with toggle buttons and navigation arrows */}
        <div className="flex items-center justify-between mb-[1rem]">
          {/* Toggle buttons */}
          <div className="flex gap-[0.25rem] md:gap-[0.75rem]">
            {collectionsData.map((collection, index) => (
              <button
                key={collection.slug}
                onClick={() => handleCollectionChange(index)}
                className={`px-[1.25rem] md:px-[1.875rem] py-[0.5rem] md:py-[0.625rem] leading-[1] tracking-[0.125rem] rounded-[2.25rem] text-[1rem] md:text-[1.25rem] font-bold font-lato transition-all duration-300 ${
                  activeCollection === index
                    ? 'bg-[#41A690] text-white border border-transparent'
                    : 'bg-white text-black/30 border border-black/30 hover:border-[#41A690] hover:text-[#41A690]'
                }`}
              >
                {collection.displayName.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Navigation arrows */}
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

        {/* Swiper */}
        {isLoading ? (
          <CollectionSkeleton />
        ) : currentCollection && currentCollection.items.length > 0 ? (
          <div className="relative !overflow-visible md:!overflow-hidden px-[4px] py-[4px]">
            <Swiper
              className="!overflow-visible md:!overflow-hidden"
              key={`swiper-${activeCollection}`}
              modules={[Navigation]}
              spaceBetween={20}
              slidesPerView={1.8}
              navigation={{
                enabled: true,
                prevEl: prevBtnRef.current,
                nextEl: nextBtnRef.current,
              }}
              watchOverflow={true}
              onBeforeInit={(swiper) => {
                swiper.params.navigation = {
                  ...(swiper.params.navigation || {}),
                  prevEl: prevBtnRef.current,
                  nextEl: nextBtnRef.current,
                }
              }}
              onSwiper={(swiper) => {
                swiperRef.current = swiper
                handleSwiperInit(swiper)
              }}
              onSlideChange={handleSlideChange}
              onResize={handleSlideChange}
              onReachBeginning={(swiper) => {
                setIsBeginning(true)
                // recompute to ensure `isEnd` isn’t sticky
                computeEdges(swiper)
              }}
              onReachEnd={(swiper) => {
                setIsEnd(true)
                // recompute to ensure `isBeginning` isn’t sticky
                computeEdges(swiper)
              }}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
            >
              {currentCollection.items.map((item, index) => {
                const itemData = getItemData(item, currentCollection.slug)
                const href = `${getCollectionPath(currentCollection.slug)}/${itemData.slug}`

                return (
                  <SwiperSlide key={`${currentCollection.slug}-${index}`}>
                    <Link
                      href={itemData.locked ? '#' : href}
                      className="block group relative"
                      onClick={(e) => {
                        if (itemData.locked) {
                          e.preventDefault()
                          window.dispatchEvent(new CustomEvent('dd:show-popup'))
                          return
                        }
                      }}
                    >
                      {itemData.locked && (
                        <span className="z-20 p-2 rounded-full material-symbols-outlined text-white text-2xl absolute -top-1 -left-1 bg-[#EE6C4D]">
                          lock
                        </span>
                      )}
                      <article className="relative rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02]">
                        {itemData.locked && (
                          <div className="absolute z-10 top-0 right-0 bg-black/40 w-full h-full rounded-[0.875rem]"></div>
                        )}
                        {itemData.image && (
                          <div className="aspect-[4/3] overflow-hidden">
                            <Media
                              resource={itemData.image}
                              className="w-full h-full object-cover"
                              pictureClassName="w-full h-full object-cover"
                              imgClassName="w-full h-full object-cover"
                              quality={100}
                            />
                            {/* Text overlay */}
                            <div className="absolute bottom-0 left-0 right-0 px-[1.5rem] pb-[1rem] text-white">
                              <h3 className="font-bold text-[1rem] font-lato">{itemData.title}</h3>
                            </div>
                          </div>
                        )}
                      </article>
                    </Link>
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No items found for {currentCollection?.displayName}
          </div>
        )}
      </div>
    </section>
  )
}
