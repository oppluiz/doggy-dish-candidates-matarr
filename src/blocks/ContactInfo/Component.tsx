'use client'

import React from 'react'
import { Paytone_One } from 'next/font/google'
import { cn } from '@/utilities/ui'
import type { ContactInfoBlock as ContactInfoBlockType } from '@/payload-types'

const paytone = Paytone_One({ subsets: ['latin'], weight: '400' })

type Props = {
  heading?: string
  description?: string
  emailPlaceholder?: string
  submitButtonText?: string
  className?: string
}

export const ContactInfoBlock: React.FC<Props> = ({
  heading = 'FRESH TAKES ON DOG HEALTH + WELLNESS',
  description = "We make it short, sweet, and packed with tasty tidbits you won't find anywhere else. Subscribe to our newsletter and get the inside scoop on keeping your dog at their best for their best years yet. Because we're rooting for your pup!",
  emailPlaceholder = 'Email address',
  submitButtonText = 'HIT IT!',
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
    <section className={cn('relative w-full bg-primary-background py-12 md:py-16', className)}>
      <div className="container max-w-[1200px] mx-auto px-6 md:px-[84px]">
        <div className="max-w-[400px] ml-auto">
          {/* Heading */}
          {heading && (
            <h2
              className={cn(
                'text-[20px] md:text-[24px] leading-[1.2] uppercase mb-4',
                paytone.className,
              )}
            >
              {heading}
            </h2>
          )}

          {/* Description */}
          {description && (
            <p className="text-[12px] md:text-[14px] font-lato font-light leading-[1.6] mb-6">
              {description}
            </p>
          )}

          {/* Form */}
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="w-full">
              {/* Email Field */}
              <div className="relative mb-4">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  placeholder={emailPlaceholder}
                  required
                  className="w-full bg-transparent border-0 border-b-[2px] border-black pb-2 text-[14px] md:text-[16px] font-lato font-normal tracking-[0.05em] placeholder-black/60 focus:outline-none focus:border-black transition-colors"
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
    </section>
  )
}
