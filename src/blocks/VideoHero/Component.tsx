'use client'

import React, { useMemo, useState } from 'react'
import type { VideoHeroBlock as VideoHeroBlockProps } from '@/payload-types'
import { Media } from '@/components/Media'
import { Paytone_One } from 'next/font/google'
import { cn } from '@/utilities/ui'
import Link from 'next/link'

const paytone = Paytone_One({ subsets: ['latin'], weight: '400' })

type Props = VideoHeroBlockProps & {
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

export const VideoHeroBlock: React.FC<Props> = ({
  pageTitle,
  thumbnail,
  videoUrl,
  tag,
  containerSize,
}) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const embed = useMemo(() => getEmbed(videoUrl || undefined), [videoUrl])

  return (
    <>
      {/* Breadcrumb */}
      <div className={`${containerSize} mb-[0.875rem] text-black`}>
        <nav aria-label="breadcrumb">
          <Link href="/" className="font-lato text-[0.625rem] font-normal">
            Home
          </Link>
          <span className="font-lato" aria-hidden="true">
            {' '}
            &gt;{' '}
          </span>
          <Link href="/workshops" className="font-lato text-[0.625rem] font-normal">
            Workshops
          </Link>
          <span className="font-lato" aria-hidden="true">
            {' '}
            &gt;{' '}
          </span>
          <span className="font-lato text-[0.625rem] underline font-normal">{pageTitle}</span>
        </nav>
      </div>
      <section className={`${containerSize} mb-[26px] md:mb-[3.5rem]`}>
        <div className="relative overflow-hidden rounded-[1rem] bg-black">
          <div className="aspect-video min-h-[246px] w-full">
            {isPlaying ? (
              <div className="w-full h-full">{embed}</div>
            ) : (
              <div className="relative w-full h-full">
                <Media
                  className="w-[100%] h-[100%] max-w-[unset] max-h-[unset] object-cover"
                  pictureClassName="w-[100%] h-[100%] max-w-[unset] max-h-[unset] object-cover"
                  resource={thumbnail}
                  imgClassName="w-[100%] h-[100%] max-w-[unset] max-h-[unset] object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
              </div>
            )}
          </div>

          {/* Overlay heading and tag */}
          {!isPlaying && (
            <div
              className={[
                'absolute inset-x-0 top-0 flex gap-[12px]',
                'items-start flex-col p-[21px]',
                'md:items-end md:flex-row md:py-[49px] md:px-[62px] md:gap-[38px]',
              ].join(' ')}
            >
              <h1
                className={[
                  paytone.className,
                  'font-black text-white text-[20px] md:text-[2.625rem] leading-[1]',
                ].join(' ')}
              >
                {pageTitle || 'Workshop'}
              </h1>
              {tag && (
                <span
                  className={[
                    'flex font-lato font-normal tracking-[2px] text-white text-[9px] leading-[1] px-[23px] py-[6px] border-solid border-[1px] border-white rounded-[80px]',
                    'md:text-[0.7] md:px-[2rem] md:py-[0.625rem] md:border-[0.1rem]',
                  ].join(' ')}
                >
                  {tag}
                </span>
              )}
            </div>
          )}

          {/* Play button overlay */}
          {!isPlaying && (
            <button
              type="button"
              aria-label="Play video"
              onClick={() => setIsPlaying(true)}
              className={cn(
                'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 m-auto',
                'text-white',
              )}
              style={{ top: '50%', transform: 'translateY(-50%)' }}
            >
              <span className="material-symbols-outlined !text-[30px] md:!text-[3.125rem] leading-none">
                play_circle
              </span>
            </button>
          )}
        </div>
      </section>
    </>
  )
}
