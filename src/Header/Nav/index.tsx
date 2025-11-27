'use client'

import React, { useEffect, useState, useRef } from 'react'
import { usePathname } from 'next/navigation'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const pathname = usePathname()
  const isHomepage = pathname === '/'
  const [activeIndex, setActiveIndex] = useState<number>(-1)
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1)
  const [backgroundStyle, setBackgroundStyle] = useState<{
    left: number
    width: number
    opacity: number
  }>({ left: 0, width: 0, opacity: 0 })
  const itemRefs = useRef<(HTMLSpanElement | null)[]>([])
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isTransitioningRef = useRef<boolean>(false)

  // Find the active item index based on pathname
  useEffect(() => {
    const activeIdx = (data?.navItems || []).findIndex((item) => {
      const href =
        item?.link?.type === 'reference' &&
        typeof item?.link?.reference?.value === 'object' &&
        (item?.link?.reference?.value as any)?.slug
          ? `${item?.link?.reference?.relationTo !== 'pages' ? `/${item?.link?.reference?.relationTo}` : ''}/${(item?.link?.reference?.value as any)?.slug}`
          : (item?.link?.url as string) || '/'
      return pathname === href || (href === '/' && pathname === '/')
    })
    setActiveIndex(activeIdx)
  }, [pathname, data?.navItems])

  // Smart background positioning with direct jumps between links
  const updateBackgroundPosition = (targetIndex: number, skipBounce: boolean = false) => {
    if (targetIndex !== -1 && itemRefs.current[targetIndex]) {
      const element = itemRefs.current[targetIndex]
      if (element) {
        const rect = element.getBoundingClientRect()
        const navRect = element.parentElement?.getBoundingClientRect()
        if (navRect) {
          const targetWidth = rect.width * 1.2
          const targetLeft = rect.left - navRect.left - rect.width * 0.1

          if (skipBounce || isTransitioningRef.current) {
            // Direct jump without bounce effect
            setBackgroundStyle({
              left: targetLeft,
              width: targetWidth,
              opacity: 1,
            })
          } else {
            // Bounce effect for initial hover
            isTransitioningRef.current = true

            // First shrink the background
            setBackgroundStyle((prev) => ({
              ...prev,
              width: targetWidth,
              left: targetLeft + targetWidth * 0.15,
            }))

            // Then expand to full size
            setTimeout(() => {
              setBackgroundStyle({
                left: targetLeft,
                width: targetWidth,
                opacity: 1,
              })
              setTimeout(() => {
                isTransitioningRef.current = false
              }, 200)
            }, 100)
          }
        }
      }
    } else {
      setBackgroundStyle((prev) => ({ ...prev, opacity: 0 }))
      isTransitioningRef.current = false
    }
  }

  // Update background position and size with smart behavior
  useEffect(() => {
    const targetIndex = hoveredIndex !== -1 ? hoveredIndex : activeIndex
    updateBackgroundPosition(targetIndex)
  }, [hoveredIndex, activeIndex, data?.navItems])

  // Smart hover handlers
  const handleMouseEnter = (index: number) => {
    // Clear any existing timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }

    // If we're already hovering something, jump directly to new item
    const skipBounce = hoveredIndex !== -1
    setHoveredIndex(index)

    if (skipBounce) {
      updateBackgroundPosition(index, true)
    }
  }

  const handleMouseLeave = () => {
    // Add tolerance time before returning to active item
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredIndex(-1)
      isTransitioningRef.current = false
    }, 300) // 300ms tolerance
  }

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
    }
  }, [])
  const renderIconByValue = (value?: string) => {
    switch (value) {
      case 'home':
        return <span className="material-symbols-outlined !text-[0.875rem] leading-[1]">home</span>
      case 'health_cross':
        return (
          <span className="material-symbols-outlined !text-[0.875rem] leading-[1]">
            health_cross
          </span>
        )
      case 'nutrition':
        return (
          <span className="material-symbols-outlined !text-[0.875rem] leading-[1]">nutrition</span>
        )
      case 'square-play':
        return (
          <span className="material-symbols-outlined !text-[0.875rem] leading-[1]">
            video_library
          </span>
        )
      default:
        return null
    }
  }

  return (
    <nav className="flex items-center relative">
      {/* Sliding background element */}
      <div
        className="absolute bg-[#41A690] z-10 rounded-full transition-all duration-300 ease-out pointer-events-none"
        style={{
          left: `${backgroundStyle.left}px`,
          width: `${backgroundStyle.width}px`,
          height: '32px',
          top: '50%',
          transform: 'translateY(-50%)',
          opacity: backgroundStyle.opacity,
        }}
      />

      {(data?.navItems || []).map((item, i) => {
        // resolve href similar to mobile nav
        const href =
          item?.link?.type === 'reference' &&
          typeof item?.link?.reference?.value === 'object' &&
          (item?.link?.reference?.value as any)?.slug
            ? `${item?.link?.reference?.relationTo !== 'pages' ? `/${item?.link?.reference?.relationTo}` : ''}/${(item?.link?.reference?.value as any)?.slug}`
            : (item?.link?.url as string) || '/'
        const isActive = i === activeIndex
        const isHovered = i === hoveredIndex

        return (
          <React.Fragment key={i}>
            <span
              ref={(el) => (itemRefs.current[i] = el)}
              className={`inline-flex items-center z-[15] [&_a]:leading-[1] [&_a]:text-[0.75rem] [&_a]:hover:no-underline gap-2 uppercase tracking-wide text-sm transition-colors duration-300 px-[1.25rem] py-[0.625rem] rounded-full relative ${
                isHovered
                  ? 'text-white [&_a]:text-white'
                  : isActive && hoveredIndex === -1
                    ? 'text-white [&_a]:text-white'
                    : 'text-black [&_a]:text-black hover:text-[#41A690] hover:[&_a]:text-[#41A690]'
              }`}
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={handleMouseLeave}
            >
              {renderIconByValue(item?.icon as unknown as string)}
              <CMSLink {...item.link} appearance="link" />
            </span>
            {Boolean(data?.showDividers) && i < (data?.navItems?.length || 0) - 1 && (
              <span aria-hidden="true" className="w-[0.088rem] h-[1.25rem] bg-black z-5 relative" />
            )}
          </React.Fragment>
        )
      })}

      {(Boolean(data?.showSearch) || Boolean(data?.showAccount) || Boolean(data?.showLocation)) &&
        Boolean(data?.showDividers) &&
        (data?.navItems?.length || 0) > 0 && (
          <span aria-hidden="true" className="w-[0.088rem] h-[1.25rem] bg-black" />
        )}

      <div className="ml-[1.375rem] flex gap-[0.375rem] items-center">
        {!isHomepage && Boolean(data?.showSearch) && (
          <Link href="/search" className="inline-flex items-center">
            <span className="sr-only">Search</span>
            <span className="material-symbols-outlined w-[1.125rem] leadng-[1] !text-[1.125rem] text-primary">
              search
            </span>
          </Link>
        )}

        {Boolean(data?.showAccount) && (
          <Link href="/account" className="inline-flex items-center">
            <span className="sr-only">Account</span>
            <span className="material-symbols-outlined w-[1.125rem] leadng-[1] !text-[1.125rem] text-primary">
              person
            </span>
          </Link>
        )}

        <Link href="/account" className="inline-flex items-center">
          <span className="sr-only">Info</span>
          <span className="material-symbols-outlined w-[1.125rem] leadng-[1] !text-[1.125rem] text-primary">
            contact_support
          </span>
        </Link>
      </div>

      {Boolean(data?.showLocation) && (
        <Link href="/locations" className="inline-flex items-center">
          <span className="sr-only">Locations</span>
          <span className="material-symbols-outlined w-5 text-primary">location_on</span>
        </Link>
      )}
    </nav>
  )
}
