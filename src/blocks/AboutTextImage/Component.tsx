'use client'

import React from 'react'
import { Paytone_One } from 'next/font/google'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'

const paytone = Paytone_One({ subsets: ['latin'], weight: '400' })

type Props = {
  heading?: string
  accentWord?: string
  content?: any
  imageTop?: any
  imageCenter?: any
  imageBottom?: any
  showSparkle?: boolean
  className?: string
}

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const AccentHeading: React.FC<{ heading: string; accentWord?: string }> = ({
  heading,
  accentWord,
}) => {
  if (!heading) return null
  if (!accentWord) return <span>{heading}</span>
  const re = new RegExp(`(${escapeRegExp(accentWord)})`, 'i')
  const parts = heading.split(re)
  return (
    <span>
      {parts.map((p, i) =>
        re.test(p) ? (
          <span className={[paytone.className, 'text-[#FFA12F]'].join(' ')} key={i}>
            {p}
          </span>
        ) : (
          <span className={[paytone.className].join(' ')} key={i}>
            {p}
          </span>
        ),
      )}
    </span>
  )
}

export const AboutTextImageBlock: React.FC<Props> = ({
  heading = '',
  accentWord,
  content,
  imageTop,
  imageCenter,
  imageBottom,
  showSparkle = true,
  className,
}) => {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="bg-[rgba(233,246,242,1)] py-[2.5rem] md:py-[4rem]">
      <div className={cn('container ', className)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left: Heading + Rich Text */}
          <div>
            <h2 className="text-black font-black md:[&_*]:text-[3.25rem] [&_*]:leading-[1.05] [&_*]:uppercase mb-4">
              <AccentHeading heading={heading} accentWord={accentWord} />
            </h2>
            <div className="prose max-w-none">
              <RichText data={content} enableGutter={false} enableProse={false} />
            </div>
          </div>

          {/* Right: Staggered images + sparkle */}
          <div className="relative h-[340px] md:h-[500px]">
            {/* Top: image */}
            <div
              className={cn(
                'absolute z-20 left-0 top-0 w-[100px] h-[100px] md:w-[140px] md:h-[200px]',
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
                'transition-all duration-500',
              )}
              style={{ transitionDelay: '0ms' }}
            >
              {imageTop ? (
                <Media resource={imageTop} imgClassName="object-cover" />
              ) : (
                <div className="w-full h-full bg-neutral-200" />
              )}
            </div>

            {/* Center: tall rounded rectangle */}
            <div
              className={cn(
                'absolute z-10 left-[100px] top-[60px] w-[200px] h-[350px]',
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
                'transition-all duration-500',
              )}
              style={{ transitionDelay: '200ms' }}
            >
              {imageCenter ? (
                <Media resource={imageCenter} imgClassName="object-cover" />
              ) : (
                <div className="w-full h-full bg-neutral-200" />
              )}
            </div>

            {/* Bottom: image */}
            <div
              className={cn(
                'absolute left-[240px] bottom-[0px] w-[140px] h-[200px]',
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
                'transition-all duration-500',
              )}
              style={{ transitionDelay: '400ms' }}
            >
              {imageBottom ? (
                <Media resource={imageBottom} imgClassName="object-cover" />
              ) : (
                <div className="w-full h-full bg-neutral-200" />
              )}
            </div>

            {/* Sparkle icon appears after images */}
            {showSparkle && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="89.417"
                height="93.584"
                viewBox="0 0 89.417 93.584"
                className="absolute left-12 bottom-10 w-[80px] -rotate-90"
              >
                <defs>
                  <clipPath id="clip-path">
                    <path
                      id="Path_300"
                      data-name="Path 300"
                      d="M479,221.227h13.061V247.98H479Zm0,0"
                      transform="translate(-479 -221.227)"
                    />
                  </clipPath>
                  <clipPath id="clip-path-2">
                    <path
                      id="Path_304"
                      data-name="Path 304"
                      d="M628,476h9.042v4.308H628Zm0,0"
                      transform="translate(-628 -476)"
                    />
                  </clipPath>
                </defs>
                <g id="_7" data-name="7" transform="translate(-15.401 60.867) rotate(-45)">
                  <g
                    id="Group_88"
                    data-name="Group 88"
                    transform="translate(67.276 0)"
                    clip-path="url(#clip-path)"
                  >
                    <path
                      id="Path_299"
                      data-name="Path 299"
                      d="M491.387,221.227a1.2,1.2,0,0,0-1.133.807q-.34.982-1.06,2.584h0l-5.376,11.811-.012.027q-3.192,7.491-4.034,9.86a1.2,1.2,0,1,0,2.26.806q.815-2.292,3.969-9.7l5.378-11.816,0-.006q.76-1.694,1.137-2.78a1.2,1.2,0,0,0-1.134-1.6Zm0,0"
                      transform="translate(-479.586 -221.227)"
                    />
                  </g>
                  <path
                    id="Path_301"
                    data-name="Path 301"
                    d="M532.719,350.359a1.2,1.2,0,0,0-.971.5,64.971,64.971,0,0,0-4.6,7.279,1.2,1.2,0,1,0,2.111,1.142,62.706,62.706,0,0,1,4.431-7.01,1.2,1.2,0,0,0-.97-1.907Zm0,0"
                    transform="translate(-451.689 -328.737)"
                  />
                  <path
                    id="Path_302"
                    data-name="Path 302"
                    d="M636.274,357.5a1.192,1.192,0,0,0-.7.224q-14.851,10.6-15.814,11.523c-.039.037-.073.073-.1.107a1.2,1.2,0,0,0,1.762,1.63h0q.838-.8,15.549-11.3a1.2,1.2,0,0,0-.7-2.179Zm0,0"
                    transform="translate(-528.579 -334.679)"
                  />
                  <g
                    id="Group_89"
                    data-name="Group 89"
                    transform="translate(92.225 42.66)"
                    clip-path="url(#clip-path-2)"
                  >
                    <path
                      id="Path_303"
                      data-name="Path 303"
                      d="M636.541,476.246a1.2,1.2,0,0,0-.379.061q-2.94.98-4.295,1.387a13.062,13.062,0,0,1-1.966.436,1.2,1.2,0,0,0,.154,2.392,1.147,1.147,0,0,0,.156-.01,15.512,15.512,0,0,0,2.339-.515l.007,0q1.391-.418,4.361-1.408a1.2,1.2,0,0,0-.379-2.34Zm0,0"
                      transform="translate(-628.714 -476.205)"
                    />
                  </g>
                  <path
                    id="Path_305"
                    data-name="Path 305"
                    d="M396.759,279.273a1.176,1.176,0,0,0-.178.013,1.2,1.2,0,0,0-1.01,1.364l.449,3.03q.125,1.011.223,2.382v0q.168,2.232.223,7.468a1.2,1.2,0,0,0,1.2,1.188h.012a1.2,1.2,0,0,0,1.187-1.214q-.057-5.3-.23-7.618-.1-1.458-.239-2.537l0-.027-.449-3.03A1.2,1.2,0,0,0,396.759,279.273Zm0,0"
                    transform="translate(-342.254 -269.554)"
                  />
                  <path
                    id="Path_306"
                    data-name="Path 306"
                    d="M272.152,234.055A1.2,1.2,0,0,0,271,235.579l5.411,19.386a1.2,1.2,0,1,0,2.311-.646l-5.412-19.386A1.2,1.2,0,0,0,272.152,234.055Zm0,0"
                    transform="translate(-238.512 -231.907)"
                  />
                  <path
                    id="Path_307"
                    data-name="Path 307"
                    d="M211.566,361.563a1.2,1.2,0,0,0-1.084,1.715q.294.622.759,1.4l.009.013q4.212,6.844,4.475,7.365a1.2,1.2,0,0,0,2.172-1.018c-.01-.022-.02-.043-.029-.061l0-.005q-.309-.612-4.564-7.525-.405-.679-.65-1.2A1.2,1.2,0,0,0,211.566,361.563Zm0,0"
                    transform="translate(-188.072 -338.064)"
                  />
                  <path
                    id="Path_308"
                    data-name="Path 308"
                    d="M94.94,334.781a1.2,1.2,0,0,0-.878,2.018q.946,1.018,2.361,2.858,8.778,11.817,10.879,14.384a1.2,1.2,0,1,0,1.856-1.522Q107.093,350,98.336,338.207l-.012-.016q-1.481-1.925-2.5-3.026A1.2,1.2,0,0,0,94.94,334.781Zm0,0"
                    transform="translate(-90.975 -315.767)"
                  />
                  <path
                    id="Path_309"
                    data-name="Path 309"
                    d="M79.335,481.754c-.4,0-.746.012-1.022.037h0a1.2,1.2,0,0,0,.022,2.4c.027,0,.056,0,.083,0h0l.1,0q.313-.027.8-.028.285,0,.629.009h0q.544.014,1.039.033h0q2.668.112,3.471.136h0q1.16.039,2.207.065h.03a1.2,1.2,0,0,0,.028-2.4q-1.047-.025-2.189-.063h0q-.783-.023-3.447-.135h-.005q-.493-.019-1.068-.034h0Q79.651,481.754,79.335,481.754Zm0,0"
                    transform="translate(-77.218 -438.13)"
                  />
                </g>
              </svg>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutTextImageBlock
