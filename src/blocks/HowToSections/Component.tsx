'use client'
import React, { useMemo, useRef } from 'react'
import type { HowToSectionsBlock as HowToSectionsProps } from '@/payload-types'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import Link from 'next/link'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { Swiper as SwiperReact, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

type Props = HowToSectionsProps & { className?: string } & {
  containerSize: 'container' | 'container-small'
  columnsProportion?: '6-6' | '8-4'
}

const Tooltip: React.FC<{
  variant?: 'proTip' | 'important'
  text?: any
}> = ({ variant = 'proTip', text }) => {
  const styles = useMemo(() => {
    if (variant === 'important') {
      return 'bg-[#E8F2CB] text-black'
    }
    return 'bg-[#E8F2CB] text-black'
  }, [variant])

  const label = variant === 'important' ? 'Important' : 'Pro tip'

  if (!text) return null
  return (
    <div
      className={`mt-[1.125rem] shadow-[0px_8px_15px_0px_rgba(0,0,0,0.05)] rounded-[0.875rem] px-[1.375rem] py-[0.75rem] flex flex-col md:flex-row items-start md:items-center gap-[6px] md:gap-[1rem] ${styles}`}
    >
      <span className="font-lato font-bold text-[18px] md:text-[1.125rem] shrink-0">{label}</span>
      <RichText
        className="md:pl-[1rem] md:min-h-[2.5rem] md:flex md:items-center md:border-l-[1px] md:border-black [&_*]:!mb-0 [&_*]:text-[0.75rem] [&_*]:font-normal [&_*]:leading-[1]"
        data={text}
        enableGutter={false}
        enableProse={false}
      />
    </div>
  )
}

export const HowToSectionsBlock: React.FC<Props> = ({
  resources,
  steps,
  className,
  containerSize,
}) => {
  const swiperRef = useRef<any | null>(null)

  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const mql = window.matchMedia('(max-width: 768px)')
    const apply = () => setIsMobile(mql.matches)
    apply()
    mql.addEventListener('change', apply)
    return () => mql.removeEventListener('change', apply)
  }, [])

  // Duplicate slides for mobile to ensure smooth looping
  const duplicatedResources = useMemo(() => {
    if (!resources || resources.length === 0) return []

    // Only duplicate on mobile
    if (!isMobile) {
      return resources
    }

    // Double the amount of slides on mobile
    return [...resources, ...resources]
  }, [resources, isMobile])

  return (
    <>
      {/* Resources */}
      {resources && resources.length > 0 && (
        <div className="md:hidden block pt-[53px] pb-[26px] mb-[20px] mx-[20px] shadow-[0px_8px_20px_0px_rgba(0,0,0,0.1)] rounded-[0.875rem]">
          <div className="flex items-center justify-center mb-[30px]">
            <h2 className="text-center font-lato text-[20px] font-normal tracking-[0.088rem] text-black">
              WHAT YOU’LL NEED
            </h2>
          </div>

          <SwiperReact
            modules={[Pagination]}
            onSwiper={(swiper) => {
              swiperRef.current = swiper
            }}
            spaceBetween={12}
            slidesPerView={1.2}
            centeredSlides={true}
            loop={true}
            pagination={{
              clickable: true,
              bulletClass: 'swiper-pagination-bullet',
              bulletActiveClass: 'swiper-pagination-bullet-active !w-[32px]',
            }}
            breakpoints={{
              375: { slidesPerView: 1.3, spaceBetween: 16 },
              414: { slidesPerView: 1.4, spaceBetween: 16 },
              640: { slidesPerView: 2.2, centeredSlides: false },
              768: { slidesPerView: 3, centeredSlides: false },
            }}
            className="!pb-12 [&_.swiper-pagination-bullet]:w-3 [&_.swiper-pagination-bullet]:h-3 [&_.swiper-pagination-bullet]:bg-[#B8E6D3] [&_.swiper-pagination-bullet]:opacity-50 [&_.swiper-pagination-bullet]:transition-all [&_.swiper-pagination-bullet]:duration-300 [&_.swiper-pagination-bullet-active]:bg-[#4CAF50] [&_.swiper-pagination-bullet-active]:opacity-100 [&_.swiper-pagination-bullet-active]:w-8 [&_.swiper-pagination-bullet-active]:rounded-full"
          >
            {duplicatedResources.map((r, i) => {
              const href =
                r.linkType === 'file' && typeof r.file === 'object'
                  ? getMediaUrl(r.file)
                  : r.url || '#'

              return (
                <SwiperSlide key={`${i}-${r.title || i}`}>
                  <Link href={href} target="_blank" className="group block">
                    <div className="w-full flex justify-center items-center flex-col rounded-[0.875rem] overflow-hidden mb-3">
                      {r.image ? (
                        <Media
                          resource={r.image as any}
                          className="w-full min-h-[192px] h-full"
                          pictureClassName="w-full min-h-[192px] h-full m-0"
                          imgClassName="w-full min-h-[192px] h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-warning/60" />
                      )}
                    </div>
                    <p className="text-center font-lato font-bold text-[18px] text-black underline group-hover:opacity-80 px-2">
                      {r.title}
                    </p>
                  </Link>
                </SwiperSlide>
              )
            })}
          </SwiperReact>
        </div>
      )}

      <div className={containerSize}>
        <section
          className={[
            'p-[26px] md:pt-[4rem] md:px-[5rem] bg-[#EEF8F0] rounded-[0.875rem] mb-[18px] md:mb-[3.25rem]',
            className,
            isMobile ? '' : containerSize,
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {/* Resources */}
          {resources && resources.length > 0 && (
            <div className="hidden md:block mb-[4rem] mx-[0.75rem]">
              <div className="flex items-center justify-center">
                <h2 className="text-center mb-[3.25rem] font-lato text-[1.25rem] font-normal tracking-[0.088rem] text-black">
                  WHAT YOU’LL NEED
                </h2>
                <div className="md:hidden flex items-center gap-2">
                  <button
                    type="button"
                    className="w-[1.5rem] h-[1.5rem] rounded-full bg-[#C8E8DF] text-black flex items-center justify-center shadow"
                    aria-label="Previous"
                    onClick={() => swiperRef.current?.slidePrev()}
                  >
                    <span className="material-symbols-outlined !text-[1.25rem]">chevron_left</span>
                  </button>
                  <button
                    type="button"
                    className="w-[1.5rem] h-[1.5rem] rounded-full bg-[#C8E8DF] text-black flex items-center justify-center shadow"
                    aria-label="Next"
                    onClick={() => swiperRef.current?.slideNext()}
                  >
                    <span className="material-symbols-outlined !text-[1.25rem]">chevron_right</span>
                  </button>
                </div>
              </div>

              <SwiperReact
                modules={[Navigation]}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper
                }}
                spaceBetween={12}
                slidesPerView={1.1}
                centeredSlides
                breakpoints={{
                  640: { slidesPerView: 2.2, centeredSlides: false },
                  768: { slidesPerView: 3, centeredSlides: false },
                  1024: { slidesPerView: 4, centeredSlides: false },
                  1280: { slidesPerView: 4, centeredSlides: false },
                }}
              >
                {resources.map((r, i) => {
                  const href =
                    r.linkType === 'file' && typeof r.file === 'object'
                      ? getMediaUrl(r.file)
                      : r.url || '#'

                  return (
                    <SwiperSlide key={i}>
                      <Link href={href} target="_blank" className="group block">
                        <div className="max-w-[11.375rem] max-h-[8.75rem] aspect-[1.25/1] rounded-[0.875rem] overflow-hidden bg-warning/60 shadow">
                          {r.image ? (
                            <Media
                              resource={r.image as any}
                              pictureClassName="aspect-[1.25/1] m-0"
                              imgClassName="aspect-[1.25/1] object-cover"
                            />
                          ) : (
                            <div className="aspect-[1.25/1]" />
                          )}
                        </div>
                        <p className="ml-[0.75rem] mt-3 max-w-[8.5rem] font-lato font-bold text-[1rem] text-black underline group-hover:opacity-80">
                          {r.title}
                        </p>
                      </Link>
                    </SwiperSlide>
                  )
                })}
              </SwiperReact>
            </div>
          )}

          {/* Steps */}
          {steps?.map((step, i) => {
            const proportion = step.columnsProportion ?? '6-6'
            const desktopImageSpan = proportion === '6-6' ? 'md:col-span-6' : 'md:col-span-5'
            const desktopContentSpan = proportion === '6-6' ? 'md:col-span-6' : 'md:col-span-7'

            const imageCol = (
              <div
                className={
                  isMobile
                    ? 'flex items-center justify-center w-full h-full'
                    : `col-span-12 ${desktopImageSpan} h-full`
                }
              >
                {step.image && (
                  <div className="hidden md:block mx-auto max-w-[9rem] md:max-w-[unset] w-full md:w-auto h-full rounded-[0.875rem] overflow-hidden">
                    <Media
                      resource={step.image as any}
                      className="w-full h-full object-cover"
                      imgClassName="w-full h-full object-cover"
                      pictureClassName="w-full h-full object-cover"
                    />
                  </div>
                )}
                {step.mobile_image && (
                  <div className="block md:hidden mx-auto max-w-[9rem] md:max-w-[unset] w-full md:w-auto h-full rounded-[0.875rem] overflow-hidden">
                    <Media
                      resource={step.mobile_image as any}
                      className="w-full h-full object-cover"
                      imgClassName="w-full h-full object-cover"
                      pictureClassName="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            )

            const contentCol = (
              <div
                className={
                  isMobile
                    ? 'flex flex-col items-center justify-center w-full h-full'
                    : `col-span-12 ${desktopContentSpan}`
                }
              >
                <h3
                  className={`text-center md:text-left font-lato font-normal text-black text-[20px] md:text-[1.25rem] tracking-[0.088rem] mb-[24px] md:mb-[2rem] uppercase ${i > 0 ? 'max-w-[228px] md:max-w-none' : ''}`}
                >
                  {step.heading}
                </h3>

                {!step.useContentRepeater && step.richText && (
                  <RichText
                    className={`font-lato text-black text-[15px] leading-6 ${
                      (step as any).useListIndentation
                        ? '[&_.payload-richtext_.list-bullet]:md:pl-[3.5rem]'
                        : ''
                    }`}
                    data={step.richText}
                    enableGutter={false}
                    enableProse={false}
                  />
                )}

                {step.useContentRepeater && step.contentRows && (
                  <div className="space-y-3">
                    {step.contentRows.map((row, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl bg-[#FFFFF8] shadow px-[25px] py-[20px] md:px-[1.75rem] md:py-[1.125rem]"
                      >
                        <div className="font-lato font-bold text-black text-[1.125rem] mb-[0.25rem]">
                          {row.title}
                        </div>
                        {row.paragraph && (
                          <RichText
                            className="[&_*]:text-[0.875rem] [&_*]:leading-[1.2]"
                            data={row.paragraph}
                            enableGutter={false}
                            enableProse={false}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {step.tooltipEnabled && (
                  <div
                    className="mt-4"
                    style={{
                      maxWidth:
                        typeof (step as any)?.tipMaxWidthPx === 'number'
                          ? `${(step as any).tipMaxWidthPx}px`
                          : undefined,
                    }}
                  >
                    <Tooltip
                      variant={(step.tooltipVariant as any) || 'proTip'}
                      text={step.tooltipText}
                    />
                  </div>
                )}
              </div>
            )

            if (isMobile) {
              var mobileClassName =
                'py-[34px] first:!pt-[0px] border-t first:!border-t-[0px] md:border-t border-black'
              if (i == 0) {
                mobileClassName = 'first:!pt-[0px] pb-[36px]'
              }
              return (
                <div key={i} className={mobileClassName + ' ' + i}>
                  <div className="flex flex-col gap-[33px] items-center">
                    {imageCol}
                    {contentCol}
                  </div>
                </div>
              )
            } else {
              return (
                <div key={i} className="py-[4rem] border-t border-black">
                  <div className="grid grid-cols-12 gap-[2.625rem] items-center">
                    {step.swapColumns ? (
                      <>
                        {imageCol}
                        {contentCol}
                      </>
                    ) : (
                      <>
                        {contentCol}
                        {imageCol}
                      </>
                    )}
                  </div>
                </div>
              )
            }
          })}
        </section>
      </div>
    </>
  )
}
