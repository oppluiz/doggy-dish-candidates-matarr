'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  const isHomepage = pathname === '/'

  return (
    <>
      {/* Desktop header */}
      <header
        className="hidden md:block w-full h-[4.75rem] bg-primary-background relative z-20 shadow-[0px_5px_16px_rgba(0,0,0,0.1)]"
        {...(theme ? { 'data-theme': theme } : {})}
      >
        <div className="md:px-[2.5rem] max-w-[90rem] mx-auto py-[1.375rem] flex items-center justify-between h-full">
          <Link href="/" className="relative top-[1.375rem]">
            <Logo
              loading="eager"
              priority="high"
              className=""
              src={data?.logo ? (data.logo as any)?.url : undefined}
              alt={(data?.logo as any)?.alt || 'Logo'}
              widthPx={148}
            />
          </Link>
          <HeaderNav data={data} />
        </div>
      </header>
      {/* Mobile header */}
      <header
        className="md:hidden w-full h-[71px] bg-[#FFFFF8] relative z-20 shadow-[0px_5px_16px_rgba(0,0,0,0.1)]"
        {...(theme ? { 'data-theme': theme } : {})}
      >
        <div className="container h-full flex items-center justify-between px-[26px]">
          <Link href="/" className="inline-flex items-center top-[24px] relative">
            <Logo
              loading="eager"
              priority="high"
              src={data?.logo ? (data.logo as any)?.url : undefined}
              alt={(data?.logo as any)?.alt || 'Logo'}
              widthPx={94}
            />
          </Link>
          <div className="flex items-center gap-[9px]">
            {!isHomepage && Boolean(data?.showSearch) && (
              <Link href="/search" className="inline-flex items-center text-black">
                <span className="sr-only">Search</span>
                <span className="material-symbols-outlined !text-[28px]">search</span>
              </Link>
            )}
            <Link href="/account" className="inline-flex items-center text-black">
              <span className="sr-only">Account</span>
              <span className="material-symbols-outlined !text-[28px]">person</span>
            </Link>
            <Link href="/help" className="inline-flex items-center text-black">
              <span className="sr-only">Help</span>
              <span className="material-symbols-outlined !text-[28px]">contact_support</span>
            </Link>
          </div>
        </div>
      </header>
      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#FFFFF8] shadow-[0_-5px_16px_rgba(0,0,0,0.1)] z-30">
        <div className="container">
          <div className="flex justify-between items-center py-[14px] px-[22px]">
            {(data?.navItems || []).slice(0, 4).map((item, i) => {
              // resolve href similar to CMSLink
              const href =
                item?.link?.type === 'reference' &&
                typeof item?.link?.reference?.value === 'object' &&
                (item?.link?.reference?.value as any)?.slug
                  ? `${item?.link?.reference?.relationTo !== 'pages' ? `/${item?.link?.reference?.relationTo}` : ''}/${(item?.link?.reference?.value as any)?.slug}`
                  : (item?.link?.url as string) || '/'
              const isActive = pathname === href || (href === '/' && pathname === '/')

              const iconName =
                item?.icon === 'home'
                  ? 'home'
                  : item?.icon === 'nutrition'
                    ? 'nutrition'
                    : item?.icon === 'health_cross'
                      ? 'health_cross'
                      : item?.icon === 'square-play'
                        ? 'video_library'
                        : 'home'

              return (
                <Link key={i} href={href} className="flex flex-col items-center justify-center">
                  <span
                    className={`material-symbols-outlined !text-[28px] ${isActive ? 'text-black' : 'text-black/40'}`}
                    aria-hidden="true"
                  >
                    {iconName}
                  </span>
                  <span
                    className={`mt-[6px] font-lato font-normal uppercase tracking-[2px] text-[13px] leading-[1] ${
                      isActive ? 'text-black font-semibold' : 'text-black/50'
                    }`}
                  >
                    {item?.link?.label || 'Link'}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </nav>
    </>
  )
}
