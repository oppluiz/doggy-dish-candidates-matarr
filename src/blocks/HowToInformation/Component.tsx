'use client'
import React from 'react'
import type { HowToInformationBlock as HowToInformationProps } from '@/payload-types'
import RichText from '@/components/RichText'

type Props = HowToInformationProps & {
  className?: string
}

export const HowToInformationBlock: React.FC<Props> = ({
  heading,
  list,
  disclosure,
  className,
  containerSize,
}) => {
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const mql = window.matchMedia('(max-width: 768px)')
    const apply = () => setIsMobile(mql.matches)
    apply()
    mql.addEventListener('change', apply)
    return () => mql.removeEventListener('change', apply)
  }, [])

  let containerClassName = isMobile
    ? 'w-full rounded-[0.875rem] py-[38px] px-[30px] shadow-[0px_8px_20px_0px_rgba(0,0,0,0.1)]'
    : 'w-full rounded-[0.875rem] p-[3rem] shadow-[0px_8px_20px_0px_rgba(0,0,0,0.1)]'

  let sectionClassname = containerSize

  return (
    <section className={[sectionClassname, className].filter(Boolean).join(' ')}>
      <div className={containerClassName}>
        {heading && (
          <h2 className="font-lato font-bold !tracking-[unset] text-black text-[1.125rem] mb-[0.375rem]">
            {heading}
          </h2>
        )}

        {list && (
          <RichText
            className="text-black [&_*]:text-[0.75rem] [&_*]:leading-[1.2]"
            data={list}
            enableGutter={false}
            enableProse={false}
          />
        )}

        <hr className="border-t border-black mt-[2rem] mb-[1rem]" />

        {disclosure && (
          <RichText
            className="text-black/80 [&_*]:text-[0.75rem] [&_*]:leading-[1.2] italic"
            data={disclosure}
            enableGutter={false}
            enableProse={false}
          />
        )}
      </div>
    </section>
  )
}
