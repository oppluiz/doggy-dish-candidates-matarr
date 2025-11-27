import React from 'react'
import Link from 'next/link'
import { Media } from '@/components/Media'
import { RichText as ConvertRichText } from '@payloadcms/richtext-lexical/react'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { Swiper as SwiperReact, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import { Navigation } from 'swiper/modules'
import 'swiper/css'

type Row = {
  heading?: string | null
  time?: string | null
}

export type TableOfContentsBlockProps = {
  icon?: 'home' | 'utensils' | 'plus' | 'squareStack' | null
  heading?: string | null
  rows?: Row[] | null
  className?: string
  // new fields
  description?: any
  resources?: Array<{
    reference?: {
      relationTo?: 'pages' | 'posts' | 'workshops'
      value?: any
    } | null
  }> | null
}

const IconByValue: React.FC<{ value?: string | null }> = ({ value }) => {
  switch (value) {
    case 'home':
      return <span className="material-symbols-outlined text-[20px] leading-none">home</span>
    case 'utensils':
      return <span className="material-symbols-outlined text-[20px] leading-none">restaurant</span>
    case 'plus':
      return <span className="material-symbols-outlined text-[20px] leading-none">add</span>
    case 'squareStack':
      return <span className="material-symbols-outlined text-[20px] leading-none">view_module</span>
    default:
      return null
  }
}

export const TableOfContentsBlock: React.FC<TableOfContentsBlockProps> = ({
  icon,
  heading,
  rows,
  className,
  description,
  resources,
  containerSize,
}) => {
  const [isVisible, setIsVisible] = React.useState(false)
  const [animatedRows, setAnimatedRows] = React.useState<boolean[]>([])
  const sectionRef = React.useRef<HTMLElement>(null)

  const resourceItems =
    (resources || [])
      .map((r) => {
        const rel = r?.reference?.relationTo
        const val = r?.reference?.value
        if (!rel || typeof val !== 'object') return null
        return { relationTo: rel, doc: val }
      })
      .filter(Boolean) || []

  const swiperRef = React.useRef<SwiperType | null>(null)

  // Initialize animated rows array
  React.useEffect(() => {
    if (rows) {
      setAnimatedRows(new Array(rows.length).fill(false))
    }
  }, [rows])

  // Intersection Observer for scroll-triggered animation
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
            setIsVisible(true)

            // Stagger the row animations
            if (rows) {
              rows.forEach((_, index) => {
                setTimeout(() => {
                  setAnimatedRows((prev) => {
                    const newState = [...prev]
                    newState[index] = true
                    return newState
                  })
                }, index * 100) // 100ms delay between each row
              })
            }
          }
        })
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [rows])

  return (
    <div className={containerSize}>
      <section
        ref={sectionRef}
        className={`toc--container overflow-hidden w-full
      pt-[33px] px-[21px] pb-[21px] md:py-[2.25rem] md:px-[2.5rem] 
      rounded-[0.875rem] shadow-[0px_8px_19px_rgba(0,0,0,0.1)] 
      mb-[36px] md:mb-[2.375rem]`}
      >
        {/* Heading */}
        <div className="flex items-center gap-[6px] md:gap-[0.5rem] mb-[15px] md:mb-[1.375rem]">
          <span className="material-symbols-outlined text-black !text-[25px] md:!text-[2.5rem] leading-[0.6] md:leading-[1]">
            list
          </span>
          {heading && (
            <h2
              className="font-semibold uppercase !my-0 text-[20px] md:text-[1.25rem] tracking-[0.088rem] text-black leading-[100%]"
              style={{ fontFamily: 'Lato', fontStyle: 'normal' }}
            >
              {heading}
            </h2>
          )}
        </div>

        {/* Rows */}
        <ul className="!p-0 grid gap-[9px] md:gap-[0.875rem] !mt-0 mb-[34px] md:mb-[2.375rem]">
          {(rows || []).map((row, i) => (
            <li
              key={i}
              className={`flex items-center justify-between px-[18px] py-[16px] md:px-[1.75rem] md:py-[1.25rem] bg-[#C8E8DF]/30 rounded-[7px] md:rounded-[0.875rem] transition-all duration-500 ease-out ${
                animatedRows[i] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{
                transitionDelay: animatedRows[i] ? '0ms' : `${i * 100}ms`,
              }}
            >
              <span
                className={`font-lato font-semibold text-[15px] md:text-[0.875rem] text-black transition-all duration-300 ease-out ${
                  animatedRows[i] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
                }`}
                style={{
                  transitionDelay: animatedRows[i] ? '0ms' : `${i * 100 + 150}ms`,
                }}
              >
                {row?.heading || 'Untitled'}
              </span>
              {row?.time && (
                <span
                  className={`inline-flex items-center rounded font-lato font-light text-[15px] md:text-[0.875rem] text-black transition-all duration-300 ease-out ${
                    animatedRows[i] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                  }`}
                  style={{
                    transitionDelay: animatedRows[i] ? '0ms' : `${i * 100 + 200}ms`,
                  }}
                >
                  {row.time}
                </span>
              )}
            </li>
          ))}
        </ul>

        {/* Description */}
        {description && (
          <div className="mt-[2rem]">
            <h3 className="font-semibold uppercase text-[20px] md:text-[1.25rem] tracking-[0.088rem] text-black mb-[16px] md:mb-[0.875rem]">
              Description
            </h3>
            <ConvertRichText
              data={description as DefaultTypedEditorState}
              converters={({ defaultConverters }) => ({ ...defaultConverters })}
              className="max-w-none font-lato font-light text-[14px] md:[&_*]:text-[0.875rem] text-black leading-[21px] md:[&_*]:leading-[1.2]"
            />
          </div>
        )}

        {/* Resources */}
        {resourceItems.length > 0 && (
          <div className="mt-[2rem]">
            <div className="flex items-center justify-between mb-[1.375rem]">
              <h3 className="font-semibold uppercase text-[20px] md:text-[1.25rem] tracking-[0.088rem] text-black">
                Resources
              </h3>
              <div className="md:hidden flex items-center gap-2">
                <button
                  type="button"
                  className="w-8 h-8 rounded-full bg-[#C8E8DF] text-black flex items-center justify-center"
                  aria-label="Previous"
                  onClick={() => swiperRef.current?.slidePrev()}
                >
                  <span className="material-symbols-outlined !text-[20px]">chevron_left</span>
                </button>
                <button
                  type="button"
                  className="w-8 h-8 rounded-full bg-[#C8E8DF] text-black flex items-center justify-center"
                  aria-label="Next"
                  onClick={() => swiperRef.current?.slideNext()}
                >
                  <span className="material-symbols-outlined !text-[20px]">chevron_right</span>
                </button>
              </div>
            </div>

            <SwiperReact
              modules={[Navigation]}
              onSwiper={(swiper) => {
                swiperRef.current = swiper
              }}
              spaceBetween={12}
              slidesPerView={'auto'}
              centeredSlides={true}
              loop={true}
              watchOverflow={true}
              breakpoints={{
                640: { slidesPerView: 'auto', centeredSlides: false },
                768: { slidesPerView: 'auto', centeredSlides: false },
                1024: { slidesPerView: 4, centeredSlides: false },
                1280: { slidesPerView: 4, centeredSlides: false },
              }}
            >
              {resourceItems.map((item: any, idx: number) => {
                const { relationTo, doc } = item
                const slug = doc?.slug
                const title = doc?.title || 'Untitled'
                const metaImage = doc?.meta?.image
                const href = relationTo === 'pages' ? `/${slug}` : `/${relationTo}/${slug}`

                return (
                  <SwiperSlide className="!w-[192px] md:!w-[182px]" key={idx}>
                    <Link href={href} className="group block w-fit">
                      <div className="w-[192px] h-[192px] md:w-[182px] md:h-[142px] rounded-[0.875rem] overflow-hidden bg-warning/60 shadow">
                        {metaImage && typeof metaImage !== 'string' ? (
                          <Media
                            resource={metaImage}
                            pictureClassName="w-[192px] h-[192px] md:w-[182px] md:h-[142px] m-0"
                            imgClassName="w-[192px] h-[192px] md:w-[182px] md:h-[142px] object-cover"
                          />
                        ) : (
                          <div className="w-[192px] h-[192px] md:w-[182px] md:h-[142px]" />
                        )}
                      </div>
                      <p className="text-center md:text-left md:ml-[0.75rem] mt-[10px] md:mt-3 md:max-w-[135px] font-lato font-bold text-[16px] md:text-[1rem] md:leading-[1.2] text-black group-hover:opacity-80">
                        {title}
                      </p>
                    </Link>
                  </SwiperSlide>
                )
              })}
            </SwiperReact>
          </div>
        )}
      </section>
    </div>
  )
}
