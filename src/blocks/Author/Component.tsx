import React from 'react'
import type { AuthorBlock as AuthorBlockProps } from '@/payload-types'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { getMediaUrl } from '@/utilities/getMediaUrl'

type Props = AuthorBlockProps & {
  disableInnerContainer?: boolean
  displayMode?: 'default' | 'recipe'
}

export const AuthorBlock: React.FC<Props> = ({
  author,
  disableInnerContainer,
  containerSize,
  displayMode,
}) => {
  const authorDoc = typeof author === 'object' ? author : null
  if (!authorDoc) return null

  const { image, name, certifications, description } = authorDoc
  const borderClass =
    displayMode === 'recipe' ? 'md:border md:border-black md:rounded-[0.875rem]' : ''

  const Container = ({ children }: { children: React.ReactNode }) =>
    disableInnerContainer ? (
      <section
        className={`w-[calc(100%-1.75rem)] md:w-full pt-[41px] px-[31px] pb-[52px] md:pt-[2.5rem] md:px-[6.25rem] md:pb-[4.5rem] rounded-[1.25rem] bg-[#EEF8F0] md:shadow-[0px_8px_15px_0px_rgba(0,0,0,0.05)] ${containerSize} ${borderClass}`}
      >
        {children}
      </section>
    ) : (
      <section className={`${containerSize} ${borderClass}`}>
        <div className="w-full pt-[41px] px-[31px] pb-[52px] md:pt-[2.5rem] md:px-[6.25rem] md:pb-[4.5rem] rounded-[1.25rem] bg-[#EEF8F0] md:shadow-[0px_8px_15px_0px_rgba(0,0,0,0.05)]">
          {children}
        </div>
      </section>
    )

  return (
    <Container>
      <div className="flex flex-col items-center text-center">
        {/* Recipe */}
        {displayMode === 'recipe' && (
          <h2 className="mb-[2rem] !tracking-[unset] font-lato font-bold text-[1rem] text-black">
            This recipe is brought to you by
          </h2>
        )}

        {/* Author image */}
        {image && typeof image !== 'string' && (
          <div className="mb-[1.25rem] md:mb-[1.25rem]">
            <Media
              resource={image}
              imgClassName="w-[91px] h-[91px] md:w-[135px] md:h-[135px] rounded-full object-cover shadow-[0_8px_15px_rgba(0,0,0,0.08)]"
            />
          </div>
        )}

        {/* Name */}
        {name && (
          <h3 className="!mb-[0.5rem] font-lato font-semibold uppercase tracking-[0.088rem] text-[20px] md:text-[1.25rem] text-black">
            {name}
          </h3>
        )}

        {/* Certifications line (or fallback text) */}
        <p className="!mb-[20px] md:!mb-[0.75rem] font-lato text-[15px] md:text-[0.875rem] leading-[1.2] font-bold text-black">
          {Array.isArray(certifications) && certifications.length > 0
            ? certifications.map((c) => (typeof c === 'string' ? c : c.name)).join(', ')
            : ''}
        </p>

        {/* Description */}
        {description && (
          <div className="max-w-[660px]">
            <RichText
              className="max-w-none font-lato font-light text-black [&_*]:text-[0.875rem] [&_*]:leading-[1.5] [&_a]:font-light"
              data={description}
              enableGutter={false}
              enableProse={false}
            />
          </div>
        )}
      </div>
    </Container>
  )
}
