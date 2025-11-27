'use client'

import React from 'react'
import type { IconSliderBlock as IconSliderBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

type Props = IconSliderBlockProps & { className?: string }

const GoogleIcon: React.FC<{ name?: string; className?: string }> = ({ name, className }) => {
  if (!name) return null
  if (name == 'meat_icon') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
      >
        <path
          d="M30.9399 41.5707C30.087 41.5707 29.1945 41.4914 28.2822 41.3129C24.2164 40.5394 21.281 37.8817 18.4449 35.3034C17.3342 34.3117 16.2037 33.2605 14.974 32.3284C13.8237 31.4755 12.7527 30.8012 11.7015 30.1467C8.01252 27.8262 5.09702 25.9817 4.48219 19.0797C4.28385 17.7707 4.48219 15.9262 6.12835 13.923L6.30685 13.7049C9.83719 9.52003 17.473 7.49703 25.7832 8.50853C33.6372 9.46053 39.7062 12.8124 42.0069 17.4732C42.8399 19.0797 43.2167 20.944 43.1175 22.8877C43.1572 26.4775 42.701 34.9464 37.7229 39.1907C35.8387 40.7972 33.5579 41.6104 30.9002 41.6104L30.9399 41.5707ZM9.24219 24.4545C10.1942 25.6842 11.523 26.5172 13.2882 27.6477C14.3195 28.3022 15.4897 29.036 16.759 29.9682C18.0879 30.9797 19.2779 32.0507 20.4282 33.1019C23.2049 35.6009 25.5849 37.7627 28.8177 38.3775C31.7332 38.8932 34.014 38.4172 35.8189 36.8702C37.1279 35.7595 38.0402 34.2324 38.6749 32.5664C37.2865 33.915 35.68 34.9067 33.9942 35.3827C29.5515 36.7314 25.5254 34.51 22.1537 32.1697C18.3655 29.1749 13.1692 26.3784 9.20252 24.4347L9.24219 24.4545ZM21.6579 11.2059C15.9459 11.2059 10.9479 12.8124 8.62735 15.589L8.44885 15.8072C7.61585 16.8385 7.27869 17.8699 7.47702 18.8417C7.69519 19.873 8.54802 20.8052 9.79752 21.4399C13.9427 23.443 19.7737 26.537 23.9585 29.8294C26.6559 31.7135 29.9284 33.558 33.181 32.5664C35.6602 31.8722 37.9609 29.6112 39.2302 26.6759C39.7855 25.3867 40.1029 24.0975 40.1624 22.848V22.8084C40.2417 21.3605 39.964 19.992 39.369 18.8219C37.5245 15.0932 32.1894 12.2967 25.446 11.4637C24.1569 11.305 22.8875 11.2257 21.6579 11.2257V11.2059ZM31.4357 29.155C29.9284 29.155 28.421 28.56 27.35 27.489C25.8824 26.0015 25.5055 23.8595 26.3187 21.6184C27.3302 19.1987 29.73 17.9492 32.3084 18.4252C34.9264 18.921 36.751 20.9639 36.8105 23.5422V24.038C36.5725 26.3784 35.2834 28.1237 33.3 28.8377C32.705 29.0559 32.0704 29.155 31.4357 29.155ZM31.2374 21.301C30.4044 21.301 29.5317 21.658 29.0954 22.7092C28.6987 23.7802 28.8177 24.7322 29.4722 25.3867C30.1664 26.1007 31.3564 26.3585 32.3084 26.0214C33.181 25.7239 33.7165 24.9504 33.8355 23.8V23.5819C33.7959 22.2134 32.705 21.5192 31.7729 21.3407C31.6142 21.301 31.4357 21.301 31.2374 21.301Z"
          fill="black"
        />
      </svg>
    )
  }
  return (
    <span className={cn('material-symbols-outlined', className)} aria-hidden="true">
      {name}
    </span>
  )
}

export const IconSliderBlock: React.FC<Props> = ({
  title,
  title_mobile,
  boxes = [],
  className,
}) => {
  if (!boxes?.length) return null
  const titleClass = title_mobile ? 'hidden md:block' : ''

  return (
    <section className={cn('w-full my-[1.25rem]', className)}>
      <div className="container">
        {title && (
          <h2
            className={`mb-[0.75rem] uppercase font-semibold font-lato text-[1.25rem] tracking-[0.088rem] text-black ${titleClass}`}
          >
            {title}
          </h2>
        )}
        {title_mobile && (
          <h2
            className={`mb-[0.75rem] uppercase font-semibold font-lato text-[1.25rem] tracking-[0.088rem] text-black md:hidden`}
          >
            {title_mobile}
          </h2>
        )}

        {/* Desktop/Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {boxes.map((box, i) => (
            <a
              key={i}
              href={box.url || '#'}
              className="rounded-[0.875rem] bg-light-green shadow p-[1.35rem] flex flex-col items-center justify-center text-center"
            >
              <GoogleIcon
                name={box.icon as unknown as string}
                className="!text-[2.625rem] mb-[0.5rem]"
              />
              <div className="font-lato text-[0.875rem] font-bold text-black leading-[1]">
                {box.title}
              </div>
            </a>
          ))}
        </div>

        {/* Mobile/Swiper */}
        <div className="md:hidden">
          <Swiper
            modules={[Pagination]}
            spaceBetween={12}
            slidesPerView={2.2}
            pagination={{
              clickable: true,
              bulletClass:
                'swiper-pagination-bullet !w-2.5 !h-2.5 !bg-gray-300 !opacity-100 !transition-all !duration-300',
              bulletActiveClass: 'swiper-pagination-bullet-active !w-6 !bg-[#E86D50] !rounded-full',
            }}
          >
            {boxes.map((box, i) => (
              <SwiperSlide key={i}>
                <div className="rounded-[0.875rem] bg-light-green/60 shadow px-4 py-5 flex flex-col items-center text-center">
                  <div className="w-[2.5rem] h-[2.5rem] rounded-xl bg-white flex items-center justify-center mb-3">
                    <GoogleIcon name={box.icon as unknown as string} className="!text-[1.625rem]" />
                  </div>
                  <div className="font-lato text-[0.875rem] font-medium text-black">
                    {box.title}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}

export default IconSliderBlock
