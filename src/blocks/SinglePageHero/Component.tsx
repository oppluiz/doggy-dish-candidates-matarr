'use client'
import React from 'react'
import type { SinglePageHeroBlock as SinglePageHeroBlockProps } from '@/payload-types'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { Paytone_One } from 'next/font/google'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const paytone = Paytone_One({ subsets: ['latin'], weight: '400' })

type Props = SinglePageHeroBlockProps & {
  className?: string
}

export const SinglePageHeroBlock: React.FC<Props> = ({
  orientation = 'horizontal',
  image,
  title,
  enableAuthor,
  authors,
  heading,
  paragraph,
  className,
  containerSize,
}) => {
  const authorDocs = Array.isArray(authors)
    ? authors.filter((author) => typeof author === 'object' && author !== null)
    : []

  const heroImage = typeof image === 'object' ? image : undefined

  const [isMobile, setIsMobile] = React.useState(false)
  const [displayAuthorsFullNames, setDisplayAuthorsFullNames] = React.useState(false)

  React.useEffect(() => {
    const mql = window.matchMedia('(max-width: 768px)')
    const apply = () => setIsMobile(mql.matches)
    apply()
    mql.addEventListener('change', apply)
    return () => mql.removeEventListener('change', apply)
  }, [])

  // Build breadcrumbs from URL
  const pathname = usePathname()
  const segments = React.useMemo(() => pathname.split('/').filter(Boolean), [pathname])
  const formatSegment = (seg: string) =>
    decodeURIComponent(seg)
      .split('-')
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(' ')

  // Helper function to format multiple authors display
  const formatAuthorsDisplay = (authors: any[]) => {
    if (authors.length === 0) return null
    if (authors.length === 1) return authors[0].name
    if (authors.length === 2) return `${authors[0].name} and ${authors[1].name}`

    const remainingCount = authors.length - 2
    return `${authors[0].name}, ${authors[1].name} & ${remainingCount} others...`
  }

  const formatAuthorsDisplayFull = (authors: any[]) => {
    if (authors.length === 0) return null
    if (authors.length === 1) return authors[0].name
    if (authors.length === 2) return `${authors[0].name} and ${authors[1].name}`

    let authorString = ''
    authors.forEach((author) => {
      authorString += `${author.name}, `
    })
    return authorString.slice(0, -2)
  }

  let sectionClassname = `${containerSize} mb-[1.625rem]`
  let innerSectionClassname = `w-full pt-[37px] px-[30px] md:py-[3rem] pb-[34px] rounded-[0.875rem] shadow-[0px_8px_20px_rgba(0,0,0,0.1)] bg-transparent flex flex-col items-center`

  if (orientation === 'vertical') {
    // Vertical stack: HowToHero UI
    return (
      <>
        {/* Breadcrumb */}
        <div className={`${containerSize} mb-[11px] md:mb-[0.875rem] text-black`}>
          <nav aria-label="breadcrumb" className="text-sm">
            <Link href="/" className="font-lato text-[0.625rem] font-normal">
              Home
            </Link>
            {segments.slice(0, -1).map((seg, idx) => {
              const href = '/' + segments.slice(0, idx + 1).join('/')
              return (
                seg !== 'sub-hubs' &&
                seg !== 'how-to' && (
                  <React.Fragment key={href}>
                    <span className="font-lato text-[0.625rem] font-normal" aria-hidden="true">
                      {' '}
                      &gt;{' '}
                    </span>
                    <Link href={href} className="font-lato text-[0.625rem] font-normal">
                      {formatSegment(seg)}
                    </Link>
                  </React.Fragment>
                )
              )
            })}
            <span className="font-lato text-[0.625rem] font-normal" aria-hidden="true">
              {' '}
              &gt;{' '}
            </span>
            <span className="font-lato text-[0.625rem] underline font-normal">
              {title || formatSegment(segments.slice(-1)[0])}
            </span>
          </nav>
        </div>
        <section className={[sectionClassname, className].filter(Boolean).join(' ')}>
          <div className={innerSectionClassname}>
            {heroImage && (
              <div className="mx-auto mb-[17px] md:mb-[1.375rem] w-[149px] h-[149px] md:h-[10.5rem] md:w-[10.5rem] rounded-full overflow-hidden">
                <Media
                  resource={heroImage}
                  imgClassName="w-[149px] h-[149px] md:h-[10.5rem] md:w-[10.5rem] object-cover"
                  pictureClassName="w-[149px] h-[149px] md:h-[10.5rem] md:w-[10.5rem]"
                  className="w-[149px] h-[149px] md:h-[10.5rem] md:w-[10.5rem]"
                />
              </div>
            )}
            {heading && (
              <h1
                className={[
                  paytone.className,
                  'text-center max-w-[219px] md:max-w-[unset] font-black text-black text-[20px] md:text-[2.625rem] mb-[16px] md:mb-[1.375rem] leading-[26px] md:leading-[1]',
                ].join(' ')}
              >
                {heading}
              </h1>
            )}
            {paragraph && (
              <div className="max-w-[35rem] min-h-[5.625rem] mx-auto">
                <RichText
                  className="font-lato text-black [&_p]:text-[0.875rem] leading-[1.2] font-light text-center"
                  data={paragraph}
                  enableGutter={false}
                  enableProse={false}
                />
              </div>
            )}
          </div>
        </section>
      </>
    )
  }

  // Horizontal stack: CollectionHero UI
  return (
    <>
      {/* Breadcrumb */}
      <div className={`${containerSize} mb-[11px] md:mb-[0.875rem] text-black`}>
        <nav aria-label="breadcrumb" className="text-sm">
          <Link href="/" className="font-lato text-[0.625rem] font-normal">
            Home
          </Link>
          {segments.slice(0, -1).map((seg, idx) => {
            const href = '/' + segments.slice(0, idx + 1).join('/')
            return (
              seg !== 'sub-hubs' &&
              seg !== 'how-to' && (
                <React.Fragment key={href}>
                  <span className="font-lato text-[0.625rem] font-normal" aria-hidden="true">
                    {' '}
                    &gt;{' '}
                  </span>
                  <Link href={href} className="font-lato text-[0.625rem] font-normal">
                    {formatSegment(seg)}
                  </Link>
                </React.Fragment>
              )
            )
          })}
          <span className="font-lato text-[0.625rem] font-normal" aria-hidden="true">
            {' '}
            &gt;{' '}
          </span>
          <span className="font-lato text-[0.625rem] underline font-normal">{title}</span>
        </nav>
      </div>
      <section
        className={[`${containerSize} mb-[30px] md:mb-[2.5rem]`, className]
          .filter(Boolean)
          .join(' ')}
      >
        <div
          className="w-full p-[40px] md:p-[2.5rem] md:pl-[3.125rem] rounded-[0.875rem] 
      shadow-[0px_8px_20px_rgba(0,0,0,0.1)] bg-transparent grid md:grid-cols-2 gap-[6.25rem]"
        >
          <div className="flex flex-col items-center md:items-start">
            {title && (
              <h1
                className={[
                  paytone.className,
                  'text-center md:text-left leading-[1.2] mb-[1rem] font-black text-black text-[35px] md:text-[3.125rem] md:mb-[1.125rem] md:mt-[1.5rem]',
                ].join(' ')}
              >
                {title}
              </h1>
            )}

            {enableAuthor && authorDocs.length > 0 && (
              <div className="flex items-center flex-col md:flex-row gap-[11px] md:gap-[1rem]">
                {/* Author images with stacked layout */}
                <div className="flex items-center">
                  {authorDocs.slice(0, 4).map((authorDoc, index) => {
                    const authorImage =
                      authorDoc && typeof authorDoc.image === 'object' ? authorDoc.image : undefined

                    return index < 2 ? (
                      <div
                        key={authorDoc.id || index}
                        className={`w-[30px] h-[30px] md:w-[2.375rem] md:h-[2.375rem] rounded-full overflow-hidden ${
                          index === 0 && authorDocs.length > 1 ? '-ml-4' : ''
                        }`}
                        style={{
                          zIndex: index === 0 ? 10 : 9,
                          order: index === 0 ? 2 : 1,
                        }}
                      >
                        {authorImage ? (
                          <Media
                            resource={authorImage}
                            imgClassName="w-[30px] h-[30px] md:w-[2.375rem] md:h-[2.375rem] object-cover"
                            pictureClassName="w-[30px] h-[30px] md:w-[2.375rem] md:h-[2.375rem]"
                            className="w-[30px] h-[30px] md:w-[2.375rem] md:h-[2.375rem]"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-300 flex items-center justify-center text-xs font-bold text-gray-600">
                            {authorDoc.name?.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                    ) : (
                      ''
                    )
                  })}
                </div>

                {/* Author names */}
                {displayAuthorsFullNames ? (
                  <p
                    onClick={() => setDisplayAuthorsFullNames(false)}
                    className="text-center md:text-left cursor-pointer font-lato text-black font-bold text-[10px] md:text-[0.75rem] md:max-w-[19.5rem]"
                  >
                    Backed by {formatAuthorsDisplayFull(authorDocs)}
                  </p>
                ) : (
                  <p
                    onClick={() => setDisplayAuthorsFullNames(true)}
                    className="text-center md:text-left cursor-pointer font-lato text-black font-bold text-[10px] md:text-[0.75rem] md:max-w-[19.5rem]"
                  >
                    Backed by {formatAuthorsDisplay(authorDocs)}
                  </p>
                )}
              </div>
            )}
          </div>

          {heroImage && (
            <div className="hidden md:flex rounded-[0.875rem] overflow-hidden max-w-[22.5rem]">
              <Media resource={heroImage} imgClassName="object-cover min-h-[14.5rem]" />
            </div>
          )}
        </div>
      </section>
    </>
  )
}
