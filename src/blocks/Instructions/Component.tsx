'use client'

import React from 'react'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'

type Row = { content?: any | null }
type Section = { heading?: string | null; rows?: Row[] | null }
type Tab = { tabLabel?: string | null; title?: string | null; sections?: Section[] | null }

type Props = {
  tabs?: Tab[] | null
  className?: string
}

export const InstructionsBlock: React.FC<Props> = ({ tabs = [], className }) => {
  const [active, setActive] = React.useState(0)
  const current = tabs[active]

  return (
    <section className={cn('space-y-[1.5rem]', className)}>
      {tabs.length > 1 && (
        <div className="md:absolute md:top-[2rem] md:right-[1.625rem] flex gap-[0.5rem]">
          {tabs.map((t, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                'font-bold font-lato text-[0.75rem] rounded-[2rem] tracking-[0.061rem] px-[1.75rem] py-[0.625rem] border transition-colors',
                active === i
                  ? 'bg-[#41A690] text-[#FFFFF8] border-transparent border-[#41A690]'
                  : 'text-black/30 border-black/50 bg-transparent',
              )}
            >
              {t?.tabLabel}
            </button>
          ))}
        </div>
      )}

      {current?.title && (
        <p className="font-lato font-normal text-[0.875rem] mb-[1.625rem]">{current.title}</p>
      )}

      {(current?.sections || []).map((sec, si) => (
        <div key={si} className="space-y-0">
          {sec?.heading && (
            <h3 className="font-lato !font-light text-[1rem] mb-[0.875rem]">{sec.heading}</h3>
          )}
          <div className="space-y-0">
            {(sec?.rows || []).map((row, ri) => (
              <div key={ri} className="flex items-start gap-[0.5rem]">
                <span className="relative font-lato font-bold rounded-full text-[0.75rem] min-w-[1.25rem] min-h-[1.25rem] w-[1.25rem] h-[1.25rem] bg-[#41A690] text-[#FFFFF8] flex items-center text-center justify-center leading-[1]">
                  {ri + 1}.
                </span>
                {row?.content && (
                  <RichText
                    className="[&_li]:marker:text-[#41A690]"
                    data={row.content}
                    enableProse={false}
                    enableGutter={false}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}

export default InstructionsBlock
