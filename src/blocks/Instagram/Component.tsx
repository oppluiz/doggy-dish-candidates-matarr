import React from 'react'
import { cn } from '@/utilities/ui'

export interface InstagramBlockProps {
  heading?: string
  paragraph?: string
  backgroundColor?: string
  textColor?: string
  showIcon?: boolean
}

const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => (
  <img
    src="/icons/ig.svg"
    alt="Instagram"
    className={cn('w-[1.25rem] h-[1.25rem] md:w-[2.375rem] md:h-[2.375rem]', className)}
  />
)

export const InstagramBlock: React.FC<InstagramBlockProps> = ({
  heading = 'DID YOU MAKE THIS RECIPE?',
  paragraph = 'Share a pic and tag @thedoggydish on Instagram',
  backgroundColor = '#FFA12F',
  textColor = '#FFFFFF',
  showIcon = true,
}) => {
  return (
    <a
      href="https://www.instagram.com/thedoggydish/"
      target="_blank"
      rel="noopener noreferrer"
      className="flex !no-underline flex-col md:flex-row items-center gap-[0.75rem] md:gap-[1.5rem] px-[2rem] py-[1.5rem] md:py-[2.375rem] rounded-[0.875rem] mt-[2.625rem]"
      style={{
        backgroundColor,
        color: textColor,
      }}
    >
      {showIcon && (
        <div className="flex-shrink-0">
          <InstagramIcon />
        </div>
      )}
      <div className="flex-1">
        <h3 className="font-lato font-normal text-center md:text-left text-[0.875rem] md:text-[1.25rem] tracking-[0.088rem]">
          {heading}
        </h3>
        <p className="font-lato font-bold text-center md:text-left text-[0.875rem] mb-0">
          {paragraph}
        </p>
      </div>
    </a>
  )
}

export default InstagramBlock
