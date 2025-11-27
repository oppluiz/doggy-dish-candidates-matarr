'use client'

import React, { useState } from 'react'
import { Media } from '@/components/Media'

type HeroProps = {
  title: string
  hero?: {
    videoUrl?: string
    thumbnail?: any
    media?: any
  }
}

export const VideoHero: React.FC<HeroProps> = ({ title, hero }) => {
  const [playing, setPlaying] = useState(false)
  const videoUrl = hero?.videoUrl
  const thumb = typeof hero?.thumbnail === 'object' ? hero?.thumbnail : undefined
  const fallbackMedia = typeof hero?.media === 'object' ? hero?.media : undefined

  return (
    <div
      className="relative -mt-[10.4rem] flex items-center justify-center text-white"
      data-theme="dark"
    >
      <div className="container z-10 relative">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-lato font-bold text-3xl md:text-5xl lg:text-6xl">{title}</h1>
          <span className="rounded-full border border-white/70 px-6 py-2 text-sm uppercase tracking-wide">
            MASTERCLASS
          </span>
        </div>
      </div>

      <div className="min-h-[60vh] w-full select-none">
        {!playing ? (
          <div className="relative">
            {(thumb || fallbackMedia) && (
              <Media
                fill
                imgClassName="-z-10 object-cover rounded-xl"
                priority
                resource={thumb || fallbackMedia}
              />
            )}
            <button
              type="button"
              aria-label="Play video"
              onClick={() => setPlaying(true)}
              className="absolute inset-0 m-auto flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition"
              style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
            >
              <span className="material-symbols-outlined w-10 h-10 text-white text-[40px] leading-none">
                play_arrow
              </span>
            </button>
          </div>
        ) : videoUrl ? (
          <div className="relative">
            {/* Simple HTML5 video; swap to iframe if needed */}
            {videoUrl.includes('youtube') ||
            videoUrl.includes('youtu.be') ||
            videoUrl.includes('vimeo') ? (
              <iframe
                className="w-full aspect-video rounded-xl"
                src={videoUrl}
                allow="autoplay; fullscreen; picture-in-picture"
              />
            ) : (
              <video className="w-full aspect-video rounded-xl" src={videoUrl} controls autoPlay />
            )}
          </div>
        ) : null}
      </div>
    </div>
  )
}
