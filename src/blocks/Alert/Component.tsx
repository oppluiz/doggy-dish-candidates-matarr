import React from 'react'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'

export type AlertBlockProps = {
  heading?: string
  content?: DefaultTypedEditorState
  widthConstraint?: boolean
  fullWidthContent?: boolean
  leftAligned?: boolean
  className?: string
  alertOverflow?: 'default' | 'overflow'
}

const AlertIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M12 3l9.197 16H2.803L12 3z"
      stroke="white"
      strokeWidth="2"
      fill="none"
      strokeLinejoin="round"
    />
    <path d="M12 9v5" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="16.5" r="1.2" fill="white" />
  </svg>
)

export const AlertBlock: React.FC<AlertBlockProps> = ({
  heading = 'IMPORTANT',
  content,
  fullWidthContent = false,
  widthConstraint = false,
  leftAligned = false,
  className,
  alertOverflow = 'default',
}) => {
  return (
    <section className={cn('w-full', className)}>
      <div
        className={cn(
          'alert mt-[40px] mb-[21px] md:my-0 pt-[30px] pb-[22px] px-[1.5rem] md:py-[1.625rem] rounded-[0.875rem] bg-[#EA6C4E] text-white',
          leftAligned ? 'text-left' : 'text-center',
          widthConstraint && 'max-w-[1219px] mx-auto',
          alertOverflow === 'overflow' && 'relative md:w-[104%] md:-left-[2%]',
        )}
      >
        <div
          className={cn(
            'mb-[10px] md:mb-[16px]',
            leftAligned
              ? 'flex flex-col md:flex-row items-center justify-center md:justify-start gap-[10px] md:gap-[14px]'
              : 'flex flex-col items-center justify-center gap-[0px] md:gap-[3px]',
          )}
        >
          {leftAligned ? (
            <>
              <AlertIcon className="!w-[28px] !h-[28px]" />
              <h3 className="font-lato font-semibold uppercase text-[1.25rem]">{heading}</h3>
              <AlertIcon className="hidden md:block !w-[28px] !h-[28px]" />
            </>
          ) : (
            <>
              <span className="material-symbols-outlined !text-[37px] md:!text-[2rem] md:leading-[1]">
                warning
              </span>
              <h3 className="font-lato font-semibold uppercase text-[1.25rem]">{heading}</h3>
            </>
          )}
        </div>
        {content && (
          <div
            className={cn(
              'mx-auto font-lato text-white',
              fullWidthContent ? 'max-w-[950px]' : 'max-w-[594px]',
              leftAligned ? '!max-w-[100%]' : '',
            )}
          >
            <RichText data={content} enableGutter={false} enableProse={false} />
          </div>
        )}
      </div>
    </section>
  )
}
