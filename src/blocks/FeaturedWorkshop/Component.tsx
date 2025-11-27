'use client'

import React, { useMemo, useState } from 'react'
import Link from 'next/link'
import { Media } from '@/components/Media'
import { Paytone_One } from 'next/font/google'
import { cn } from '@/utilities/ui'
import { getServerSideURL } from '@/utilities/getURL'

type FeaturedWorkshopBlockProps = {
  label?: string | null
  containerSize?: 'container' | 'container-small'
  workshop?: any
}

const paytone = Paytone_One({ subsets: ['latin'], weight: '400' })

type Props = FeaturedWorkshopBlockProps & {
  pageTitle?: string
  disableInnerContainer?: boolean
}

const getEmbed = (url?: string) => {
  if (!url) return null
  try {
    const u = new URL(url)
    const host = u.hostname
    if (host.includes('youtube.com') || host.includes('youtu.be')) {
      const id = u.searchParams.get('v') || u.pathname.replace('/', '') || ''
      const embed = `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`
      return (
        <iframe
          className="w-full h-full"
          src={embed}
          title="YouTube video player"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      )
    }
    if (host.includes('vimeo.com')) {
      const id = u.pathname.split('/').filter(Boolean).pop()
      const embed = `https://player.vimeo.com/video/${id}?autoplay=1`
      return (
        <iframe
          className="w-full h-full"
          src={embed}
          title="Vimeo video player"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      )
    }
    return <video className="w-full h-full" src={url} controls autoPlay playsInline />
  } catch {
    return <video className="w-full h-full" src={url} controls autoPlay playsInline />
  }
}

const getWorkshopIdFromRelation = (workshop: any): number | string | null => {
  if (!workshop) return null
  if (typeof workshop === 'number' || typeof workshop === 'string') return workshop
  if (typeof workshop === 'object') {
    if ('id' in workshop && (typeof workshop.id === 'number' || typeof workshop.id === 'string')) {
      return workshop.id
    }
    if ('value' in workshop) {
      const v = (workshop as any).value
      if (typeof v === 'number' || typeof v === 'string') return v
      if (v && typeof v === 'object' && 'id' in v) return (v as any).id
    }
  }
  return null
}

const getWorkshopFromRelation = (workshop: any): any | null => {
  if (!workshop) return null
  // Populated relation (full doc)
  if (typeof workshop === 'object' && 'layout' in workshop) return workshop
  // Relation wrapper with populated value
  if (typeof workshop === 'object' && 'value' in workshop) {
    const v = (workshop as any).value
    if (v && typeof v === 'object') return v
  }
  return null
}

export const FeaturedWorkshopBlock: React.FC<Props> = ({
  label = 'Featured Workshop',
  workshop,
  containerSize = 'container',
}) => {
  const baseDoc = getWorkshopFromRelation(workshop)
  const [doc, setDoc] = useState<any | null>(baseDoc)

  React.useEffect(() => {
    let active = true
    const id = getWorkshopIdFromRelation(workshop)

    if (!baseDoc && id) {
      // Fetch full workshop doc with its nested layout
      fetch(`/api/workshops/${encodeURIComponent(id)}?depth=4`)
        .then((r) => (r.ok ? r.json() : null))
        .then((d) => {
          if (active && d) setDoc(d)
        })
        .catch(() => {
          // Silent fail; keep doc as-is
        })
    } else {
      setDoc(baseDoc)
    }

    return () => {
      active = false
    }
  }, [workshop, baseDoc])

  const title = doc?.title || 'Workshop'
  const slug = doc?.slug || ''

  // find first VideoHero in workshop layout
  const videoHero = useMemo(() => {
    const layout = doc?.layout
    if (!layout || !Array.isArray(layout)) return null
    return layout.find((b: any) => b?.blockType === 'VideoHero') as any
  }, [doc])

  const [isPlaying, setIsPlaying] = useState(false)
  const embed = useMemo(() => getEmbed(videoHero?.videoUrl || undefined), [videoHero])
  const thumbnail = videoHero?.thumbnail

  const href = slug ? `/workshops/${slug}` : '#'

  return (
    <section className={`${containerSize} mb-[1.5rem] mt-[2.625rem]`}>
      {/* Mobile card layout: overlay text + pill + play icon */}
      <div className="md:hidden">
        <div className="relative overflow-hidden rounded-[1.25rem] bg-black">
          <div className="aspect-[325/246] w-full">
            {isPlaying && embed ? (
              <div className="w-full h-full">{embed}</div>
            ) : (
              <div className="relative w-full h-full">
                {thumbnail ? (
                  <Media
                    className="w-full h-full object-cover"
                    pictureClassName="w-full h-full object-cover"
                    resource={thumbnail}
                    imgClassName="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-neutral-200" />
                )}

                {/* subtle overlay */}
                <div className="absolute inset-0 bg-black/20" />

                {/* text + pill */}
                <div className="absolute top-0 left-0 p-5">
                  <h2
                    className={[
                      paytone.className,
                      'text-white font-black text-[1.125rem] md:text-[1.5rem] leading-[1.15] md:max-w-[85%]',
                    ].join(' ')}
                  >
                    {title}
                  </h2>
                  <div className="inline-flex items-center px-[0.75rem] py-[0.5rem] border border-white rounded-full">
                    <span className="font-lato font-normal text-white text-[0.5rem] tracking-[0.03rem] uppercase leading-[1]">
                      {label}
                    </span>
                  </div>
                </div>

                {/* play button */}
                {embed && (
                  <button
                    type="button"
                    aria-label="Play video"
                    onClick={() => setIsPlaying(true)}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white"
                  >
                    <span className="material-symbols-outlined !text-[32px] leading-none">
                      play_circle
                    </span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Desktop/tablet layout (existing two-column) */}
      <div className="hidden md:flex gap-[0.75rem] items-center justify-between">
        {/* Left column: label + title + CTA */}
        <div className="pl-6">
          <div className="inline-flex items-center px-[2rem] py-[0.5rem] border-black border-[1.4px] rounded-full mb-4">
            <span className="font-lato font-normal text-[0.75rem] tracking-[0.066rem] uppercase">
              {label}
            </span>
          </div>
          <h2
            className={[
              paytone.className,
              'text-black font-black text-[1.75rem] md:text-[2.625rem] leading-[1] mb-[1.5rem]',
            ].join(' ')}
          >
            {title}
          </h2>
          {href !== '#' && (
            <Link
              href={href}
              className="relative font-lato text-black font-bold text-[0.75rem] after:content-[''] after:bg-black after:h-[1.4px] after:w-full after:absolute after:-bottom-[2px] after:left-0"
            >
              Watch Now
            </Link>
          )}
        </div>

        {/* Right column: video thumbnail / embed */}
        <div>
          <div className="relative overflow-hidden rounded-[1rem] bg-black">
            <div className="aspect-video min-h-[280px] w-full">
              {isPlaying && embed ? (
                <div className="w-full h-full">{embed}</div>
              ) : (
                <div className="relative w-full h-full">
                  {thumbnail ? (
                    <Media
                      className="w-[100%] h-[100%] max-w-[unset] max-h-[unset] object-cover"
                      pictureClassName="w-[100%] h-[100%] max-w-[unset] max-h-[unset] object-cover"
                      resource={thumbnail}
                      imgClassName="w-[100%] h-[100%] max-w-[unset] max-h-[unset] object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200" />
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-10" />
                  {embed && (
                    <button
                      type="button"
                      aria-label="Play video"
                      onClick={() => setIsPlaying(true)}
                      className={cn(
                        'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 m-auto',
                        'text-white',
                      )}
                    >
                      <span className="material-symbols-outlined !text-[30px] md:!text-[3.125rem] leading-none">
                        play_circle
                      </span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
