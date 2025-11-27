import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []

  return (
    <footer className="mt-auto w-full bg-primary-background border-t border-black">
      {/* Desktop footer */}
      <div className="md:px-[2.5rem] max-w-[90rem] mx-auto pt-[3.375rem] pb-[1.625rem] [px-[2.75rem] hidden md:block">
        {/* Row 1: 4 columns */}
        <div className="flex gap-[5rem] justify-between">
          {/* Column 1: heading, paragraph, email + icon */}
          <div>
            <h3 className="font-lato font-bold text-[1.5rem] leading-[1.2] text-black">
              We're here to help.
            </h3>
            <p className="font-lato font-light text-[0.75rem] leading-[1.2] max-w-[12rem] text-black mt-[0.5rem]">
              Have a question? Send us an email and we'll get you an answer.
            </p>
            <a
              href="mailto:support@thedoggydish.com"
              className="inline-flex items-center gap-[0.625rem] text-black mt-[1.5rem]"
            >
              <span className="material-symbols-outlined text-[#FFA12F] text-[1.375rem] leading-none">
                mail
              </span>
              <span className="font-lato font-normal text-[0.75rem] leading-[1.2rem] text-black">
                support@thedoggydish.com
              </span>
            </a>
          </div>

          <div className="flex gap-[5rem]">
            {/* Column 2: heading + links */}
            <div>
              <h3 className="font-lato font-bold text-[1.125rem] leading-[1] text-[#FFA12F]">
                Learn
              </h3>
              <ul className="mt-[0.625rem] space-y-[0.625rem] text-black [&_a]:text-[0.75rem] [&_li]:leading-[1rem]">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/our-story">Our Story</Link>
                </li>
              </ul>
            </div>

            {/* Column 3: heading + links */}
            <div>
              <h3 className="font-lato font-bold text-[1.125rem] leading-[1] text-[#FFA12F]">
                Support
              </h3>
              <ul className="mt-[0.625rem] space-y-[0.625rem] text-black [&_a]:text-[0.75rem] [&_li]:leading-[1rem]">
                <li>
                  <Link href="/account">My Profile</Link>
                </li>
                <li>
                  <Link href="/contact">Have a question?</Link>
                </li>
              </ul>
            </div>

            {/* Column 4: heading + links */}
            <div>
              <h3 className="font-lato font-bold text-[1.125rem] leading-[1] text-[#FFA12F]">
                Socials
              </h3>
              <ul className="mt-[0.625rem] space-y-[0.625rem] text-black [&_a]:text-[0.75rem] [&_li]:leading-[1rem]">
                <li>
                  <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
                    TikTok
                  </Link>
                </li>
                <li>
                  <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    Facebook
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Row 2: border-top, 2 columns */}
        <div className="mt-[6.25rem] border-t border-black pt-[1.25rem] flex flex-col md:flex-row md:items-center md:justify-between">
          <span className="font-lato font-light text-[0.75rem] leading-[1] text-black">
            Copyright © {new Date().getFullYear()} The Doggy Dish
          </span>
          <div className="flex items-center gap-2">
            <Link
              href="/privacy-policy"
              className="font-lato font-light text-[0.75rem] leading-[1] text-black"
            >
              Privacy Policy
            </Link>
            <span
              aria-hidden="true"
              className="font-lato font-light text-[0.75rem] leading-[1] text-black"
            >
              |
            </span>
            <Link
              href="/terms-and-conditions"
              className="font-lato font-light text-[0.75rem] leading-[1] text-black"
            >
              Terms and Conditions
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile footer */}
      <div className="container md:hidden py-10">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <Link href="/" className="mb-4 inline-flex">
            <Logo
              loading="eager"
              priority="high"
              src={footerData?.logo ? (footerData.logo as any)?.url : undefined}
              alt={(footerData?.logo as any)?.alt || 'Logo'}
              widthPx={60}
            />
          </Link>

          {/* Heading + description */}
          <h3 className="font-lato font-bold text-[28px] leading-[34px] text-black">
            We’re here to help.
          </h3>
          <p className="mt-2 font-lato font-light text-[15px] leading-[22px] text-black max-w-[228px]">
            Have a question? Send us an email and we’ll get you an answer.
          </p>

          {/* Email */}
          <a
            href="mailto:support@thedoggydish.com"
            className="mt-4 inline-flex items-center gap-2 text-black"
          >
            <span className="material-symbols-outlined text-[#FFA12F] !text-[28px] leading-none">
              mail
            </span>
            <span className="font-lato text-[15px] leading-[18px]">support@thedoggydish.com</span>
          </a>

          {/* Search bar */}
          <form
            role="search"
            action="/search"
            method="get"
            className="mt-6 w-full max-w-[264px] flex items-center shadow-[0_8px_15px_rgba(0,0,0,0.1)] rounded-[50px] overflow-hidden"
          >
            <input
              type="text"
              name="q"
              placeholder="Search..."
              className="flex-1 max-w-[217px] h-[36px] pl-[31px] font-light text-[11px] rounded-l-full border border-[#C8E8DF] bg-[#C8E8DF]/20 px-4 outline-none placeholder:text-black"
            />
            <button
              type="submit"
              className="h-[36px] w-[47px] rounded-r-full bg-[#C8E8DF] text-black inline-flex items-center justify-center"
              aria-label="Search"
            >
              <span className="material-symbols-outlined !text-[21px]">search</span>
            </button>
          </form>

          {/* Collapsible sections */}
          <div className="w-full max-w-[360px] mt-8 space-y-[1.25rem]">
            <details>
              <summary className="cursor-pointer list-none flex items-center justify-between w-fit mx-auto">
                <span className="text-[#FFA12F] font-lato font-bold text-[20px]">Learn</span>
                <span className="material-symbols-outlined text-black/60 !text-[20px]">
                  expand_more
                </span>
              </summary>
              <ul className="mt-3 text-black space-y-2 text-[16px]">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/our-story">Our Story</Link>
                </li>
              </ul>
            </details>

            <details>
              <summary className="cursor-pointer list-none flex items-center justify-between w-fit mx-auto">
                <span className="text-[#FFA12F] font-lato font-bold text-[20px]">Support</span>
                <span className="material-symbols-outlined text-black/60 !text-[20px]">
                  expand_more
                </span>
              </summary>
              <ul className="mt-3 text-black space-y-2 text-[16px]">
                <li>
                  <Link href="/account">My Profile</Link>
                </li>
                <li>
                  <Link href="/contact">Have a question?</Link>
                </li>
              </ul>
            </details>

            <details>
              <summary className="cursor-pointer list-none flex items-center justify-between w-fit mx-auto">
                <span className="text-[#FFA12F] font-lato font-bold text-[20px]">Socials</span>
                <span className="material-symbols-outlined text-black/60 !text-[20px]">
                  expand_more
                </span>
              </summary>
              <ul className="mt-3 text-black space-y-2 text-[16px]">
                <li>
                  <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
                    TikTok
                  </Link>
                </li>
                <li>
                  <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    Facebook
                  </Link>
                </li>
              </ul>
            </details>
          </div>

          {/* Bottom bar */}
          <div className="w-full max-w-[360px] mt-8 mb-[71px]">
            <hr className="border-black/20" />
            <div className="mt-4 flex flex-col items-center gap-0">
              <span className="font-lato font-light text-[10px] leading-[10px] text-black">
                Copyright © {new Date().getFullYear()} The Doggy Dish
              </span>
              <div className="flex items-center gap-2 text-[10px] leading-[10px]">
                <Link href="/privacy-policy" className="font-lato font-light text-black">
                  Privacy Policy
                </Link>
                <span aria-hidden="true" className="font-lato font-light text-black">
                  |
                </span>
                <Link href="/terms-and-conditions" className="font-lato font-light text-black">
                  Terms and Conditions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
