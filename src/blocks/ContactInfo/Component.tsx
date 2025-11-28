'use client'

import React from 'react'
import { Paytone_One } from 'next/font/google'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import type { ContactInfoBlock as ContactInfoBlockType } from '@/payload-types'

const paytone = Paytone_One({ subsets: ['latin'], weight: '400' })

type Props = {
  subheading?: string
  heading?: string
  description?: string
  emailPlaceholder?: string
  submitButtonText?: string
  dogImages?: any[]
  className?: string
}

export const ContactInfoBlock: React.FC<Props> = ({
  subheading = 'JOIN THE DOGGY DISH™ NEWSLETTER',
  heading = 'FRESH TAKES ON DOG HEALTH + WELLNESS',
  description = "We make it short, sweet, and packed with tasty tidbits you won't find anywhere else. Subscribe to our newsletter and get the inside scoop on keeping your dog at their best for their best years yet. Because we're rooting for your pup!",
  emailPlaceholder = 'Email address',
  submitButtonText = 'HIT IT!',
  dogImages = [],
  className,
}) => {
  const [email, setEmail] = React.useState('')
  const [isSubmitted, setIsSubmitted] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setEmail('')
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  return (
    <section className={cn('relative w-full bg-[#41A690] max-h-[690px] py-12 md:py-16 overflow-hidden', className)}>
      <div className="container max-w-[1200px] mx-auto px-6 md:px-[84px]">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column - Dog Images */}
          {dogImages && dogImages.length > 0 && (
            <div className="hidden md:grid grid-cols-2 gap-4 max-w-[320px] -translate-y-[140px]">
              {dogImages.slice(0, 6).map((item: any, index) => {
                // Varying heights for masonry effect - all portrait orientation
                const heights = ['h-[246px]', 'h-[246px]', 'h-[246px]', 'h-[246px]', 'h-[246px]', 'h-[246px]']
                const marginTops = ['mt-0', 'mt-8', 'mt-4', 'mt-0', 'mt-6', 'mt-2']
                const delays = ['delay-0', 'delay-150', 'delay-300', 'delay-[450ms]', 'delay-[600ms]', 'delay-[750ms]']

                return (
                  <div
                    key={index}
                    className={`relative overflow-hidden rounded-[80px] w-full ${heights[index]} ${marginTops[index]} animate-in fade-in slide-in-from-top duration-700 ${delays[index]}`}
                  >
                    {item?.image && typeof item.image === 'object' && (
                      <Media
                        resource={item.image}
                        className="w-full h-full"
                        imgClassName="object-cover w-full h-full"
                      />
                    )}
                  </div>
                )
              })}
            </div>
          )}

          {/* Right Column - Newsletter Form */}
          <div className="max-w-[600px] ml-auto">
          {/* Subheading */}
          {subheading && (
            <p className="text-[10px] md:text-[12px] font-lato font-normal leading-[1.2] uppercase mb-2 text-white tracking-wider animate-in fade-in slide-in-from-bottom-4 duration-700">
              {subheading}
            </p>
          )}

          {/* Heading */}
          {heading && (
            <h2
              className={cn(
                'text-[41px] md:text-[64px] leading-[1] md:text-left uppercase mb-4 text-white animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150',
                paytone.className,
              )}
            >
              {heading}
            </h2>
          )}

          {/* Description */}
          {description && (
            <p className="text-[12px] md:text-[14px] font-lato font-light leading-[1.6] mb-6 text-white animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
              {description}
            </p>
          )}

          {/* Form */}
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700 delay-450">
              {/* Email Field */}
              <div className="relative mb-4">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  placeholder={emailPlaceholder}
                  required
                  className="w-full bg-white border-0 pb-2 px-4 py-3 rounded-full text-[14px] md:text-[16px] font-lato font-normal tracking-[0.05em] placeholder-black/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#EE6C4D] hover:bg-[#d95a3a] text-white px-8 py-3 rounded-full text-[14px] md:text-[16px] font-lato uppercase tracking-[0.1em] transition-all duration-300 font-bold"
              >
                {submitButtonText}
              </button>
            </form>
          ) : (
            <div className="text-center py-8">
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
                Thank you for subscribing!
              </p>
            </div>
          )}
          </div>
        </div>
      </div>
    </section>
  )
}
