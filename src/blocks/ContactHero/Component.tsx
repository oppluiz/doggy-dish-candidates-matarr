'use client'

import React from 'react'
import { Paytone_One } from 'next/font/google'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import type { ContactHeroBlock as ContactHeroBlockType } from '@/payload-types'

const paytone = Paytone_One({ subsets: ['latin'], weight: '400' })

type Props = {
  heading?: string
  accentWord?: string
  description?: string
  dogImage?: any
  decorativeIcon?: any
  namePlaceholder?: string
  emailPlaceholder?: string
  messagePlaceholder?: string
  submitButtonText?: string
  className?: string
}

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

export const ContactHeroBlock: React.FC<Props> = ({
  heading = '',
  accentWord,
  description = '',
  dogImage,
  decorativeIcon,
  namePlaceholder = 'Name',
  emailPlaceholder = 'Email address',
  messagePlaceholder = 'Message',
  submitButtonText = 'submit',
  className,
}) => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitted, setIsSubmitted] = React.useState(false)

  const headingClassName = cn('text-[41px] md:text-[64px] leading-[1] uppercase text-center md:text-left tracking-[0em]', paytone.className)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: '', email: '', message: '' })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const renderHeading = () => {
    if (!heading) return null
    if (!accentWord) {
      return heading
    }
    const re = new RegExp(`(${escapeRegExp(accentWord)})`, 'i')
    const parts = heading.split(re)
    return parts.map((p, i) =>
      re.test(p) ? (
        <span className={`${headingClassName} text-[#EE6C4D]`} key={i}>
          {p}
        </span>
      ) : (
        p
      ),
    )
  }

  return (
    <section className={cn('relative w-full bg-[#FFFFF8] overflow-hidden', className)}>
      <div className="relative w-full max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[931px] md:min-h-[1112px]">
          {/* Left Column - Form */}
          <div className="order-2 md:order-1 flex flex-col justify-center px-6 md:px-0 md:pl-[84px] md:pr-[50px] py-12 md:py-0">
            {/* Heading with decorative icon */}
            <div className="relative mb-4 md:mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <h1 className={headingClassName}>
                {renderHeading()}
                {decorativeIcon && typeof decorativeIcon === 'object' && (
                  <span className="inline-block ml-2 w-[37px] h-[33px] md:w-[57px] md:h-[51px] align-middle">
                    <Media
                      resource={decorativeIcon}
                      className="w-full h-full"
                      imgClassName="object-contain w-full h-full"
                    />
                  </span>
                )}
              </h1>
            </div>

            {/* Description */}
            {description && (
              <p className="text-[12px] md:text-[14px] font-lato font-light leading-[1.6] text-center md:text-left mb-8 md:mb-12 max-w-full md:max-w-[376px] mx-auto md:mx-0 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
                {description}
              </p>
            )}

            {/* Form */}
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="w-full max-w-full md:max-w-[448px] mx-auto md:mx-0 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                {/* Name Field */}
                <div className="relative mb-8 md:mb-12">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={namePlaceholder ?? 'Name'}
                    required
                    className="w-full bg-transparent border-0 border-b-[3px] border-[#41A690] pb-2 text-[14px] md:text-[18px] font-lato font-bold tracking-[0.1em] placeholder-black placeholder:font-bold focus:outline-none focus:border-[#41A690] transition-colors"
                  />
                </div>

                {/* Email Field */}
                <div className="relative mb-8 md:mb-12">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={emailPlaceholder ?? 'Email address'}
                    required
                    className="w-full bg-transparent border-0 border-b-[3px] border-[#41A690] pb-2 text-[14px] md:text-[18px] font-lato font-bold tracking-[0.1em] placeholder-black placeholder:font-bold focus:outline-none focus:border-[#41A690] transition-colors"
                  />
                </div>

                {/* Message Field */}
                <div className="relative mb-8 md:mb-12">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={messagePlaceholder ?? 'Message'}
                    required
                    rows={1}
                    className="w-full bg-transparent border-0 border-b-[3px] border-[#41A690] pb-2 text-[14px] md:text-[18px] font-lato font-bold tracking-[0.1em] placeholder-black placeholder:font-bold focus:outline-none focus:border-[#41A690] transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center md:justify-end items-center gap-3">
                  <button
                    type="submit"
                    className="bg-[#41A690] hover:bg-[#359179] text-[#FFFFF8] px-8 py-3 rounded-full text-[12px] md:text-[14px] font-lato uppercase tracking-[0.1em] transition-all duration-300 font-normal"
                  >
                    {submitButtonText}
                  </button>
                  <div className="w-10 h-10 bg-[#FFFFF8] rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                    <svg
                      className="w-6 h-6"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.5 4.5L21 12M21 12L13.5 19.5M21 12H3"
                        stroke="#000"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </form>
            ) : (
              <div className="text-center py-12 max-w-[448px] mx-auto">
                <div className="mb-4">
                  <svg
                    className="w-12 h-12 mx-auto text-[#41A690]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-[14px] md:text-[16px] font-lato uppercase tracking-[0.1em]">
                  Thank you! Your response has been submitted.
                </p>
              </div>
            )}
          </div>

          {/* Right Column - Dog Image */}
          <div className="order-1 md:order-2 relative flex items-center justify-center md:justify-start animate-in fade-in slide-in-from-right duration-1000">
            {/* Coral Background Circle - positioned to extend beyond container */}
            <div className="absolute top-0 md:top-[-66px] left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 w-[246px] md:w-[664px] h-[394px] md:h-[1051px] bg-[#EE6C4D] rounded-b-[150px] md:rounded-b-[300px]" />

            {/* Dog Image */}
            {dogImage && typeof dogImage === 'object' && (
              <div className="relative w-[246px] md:w-[664px] h-[394px] md:h-[1051px] rounded-b-[150px] md:rounded-b-[300px] overflow-hidden z-10 -translate-y-[35px]">
                <Media
                  resource={dogImage}
                  className="w-full h-full"
                  imgClassName="object-cover w-full h-full"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
