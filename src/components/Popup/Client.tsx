'use client'

import React from 'react'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'
import type { Config } from '@/payload-types'
import { Paytone_One } from 'next/font/google'

const paytone = Paytone_One({ subsets: ['latin'], weight: '400' })

type PopupSettings = Config['globals']['popup']

type Props = {
  settings: PopupSettings
  initialOpen?: boolean
}

export default function PopupClient({ settings, initialOpen = false }: Props) {
  const {
    enabled,
    dismissible,
    title,
    colored_title_part,
    content,
    plans,
    overlayColor = 'rgba(0,0,0,0.5)',
  } = settings || {}

  // Open immediately if the server gated render says to show
  const [open, setOpen] = React.useState(Boolean(initialOpen))

  // Also support opening/closing via global custom events
  React.useEffect(() => {
    const onShow = () => setOpen(true)
    const onHide = () => setOpen(false)
    const onToggle = () => setOpen((prev) => !prev)

    window.addEventListener('dd:show-popup', onShow as EventListener)
    window.addEventListener('dd:hide-popup', onHide as EventListener)
    window.addEventListener('dd:toggle-popup', onToggle as EventListener)

    return () => {
      window.removeEventListener('dd:show-popup', onShow as EventListener)
      window.removeEventListener('dd:hide-popup', onHide as EventListener)
      window.removeEventListener('dd:toggle-popup', onToggle as EventListener)
    }
  }, [])

  const handleClose = React.useCallback(() => {
    if (dismissible !== false) {
      setOpen(false)
    }
  }, [dismissible])

  if (!open) return null

  const PLAN_BG_CLASSES = ['bg-[#EE6C4D]', 'bg-[#FFA12F]', 'bg-[#41A690]'] as const
  const PLAN_TXT_CLASSES = ['text-[#EE6C4D]', 'text-[#FFA12F]', 'text-[#41A690]'] as const

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
      style={{ backgroundColor: overlayColor }}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={cn(
          'relative w-full max-w-[922px] rounded-[1rem] shadow-[0_8px_32px_rgba(0,0,0,0.25)]',
          'px-[2rem] md:px-[2.75rem] pt-[4.5rem] pb-[3rem] bg-[#FFFFF8]',
        )}
      >
        {dismissible !== false && (
          <button
            type="button"
            aria-label="Close"
            onClick={handleClose}
            className="absolute top-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-full text-black hover:bg-black/10 transition-colors"
          >
            <span className="material-symbols-outlined !text-[1.25rem]">close</span>
          </button>
        )}

        {title ? (
          <h2 className="text-center mb-[1.75rem] ">
            <span
              className={cn(
                'font-black !leading-[1] text-black text-[2rem] md:text-[3.625rem] uppercase',
                paytone.className,
              )}
            >
              {title}
            </span>
            {colored_title_part && (
              <span
                className={cn(
                  'font-black !leading-[1] text-[2rem] md:text-[3.75rem] uppercase text-[#FFA12F]',
                  paytone.className,
                )}
              >
                {colored_title_part || ''}
              </span>
            )}
          </h2>
        ) : null}

        {content ? (
          <div className="max-w-[60rem] mx-auto mb-[1.5rem]">
            <RichText data={content} enableGutter={false} />
          </div>
        ) : null}

        {Array.isArray(plans) && plans.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:px-[1rem]">
            {plans.map((p, i: number) => (
              <div
                key={i}
                className="rounded-[1.25rem] border border-black p-2 pb-4 bg-transparent flex flex-col"
              >
                <div>
                  <div
                    className={cn(
                      'flex flex-col items-center justify-center px-2 py-4 rounded-[1.25rem] mb-4',
                      PLAN_BG_CLASSES[i % PLAN_BG_CLASSES.length],
                    )}
                  >
                    {p?.name ? (
                      <div className="text-center font-lato font-bold text-white text-[0.75rem] tracking-[0.066rem] leading-[1] uppercase">
                        {p.name}
                      </div>
                    ) : null}
                    {p?.price ? (
                      <div
                        className={cn(
                          'text-center text-white font-lato font-black text-[2.5rem] leading-[1] uppercase',
                          paytone.className,
                        )}
                      >
                        {p.price}
                      </div>
                    ) : null}
                  </div>
                  {Array.isArray(p?.features) && p.features.length > 0 ? (
                    <ul className="space-y-2 mb-4 px-4">
                      {p.features.map((f, fi) => (
                        <li key={fi} className="flex items-start gap-2">
                          <span className="material-symbols-outlined !text-[0.75rem] p-1 bg-[#D1E59F] text-white rounded-full">
                            check
                          </span>
                          <span className="text-black">{(f as any)?.text}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
                {p?.ctaLabel && p?.ctaUrl ? (
                  <div className="mt-auto flex justify-center">
                    <a
                      href={p.ctaUrl}
                      className={cn(
                        'inline-flex items-center justify-center rounded-full pl-8 pr-1 py-1 font-lato font-bold text-white',
                        PLAN_BG_CLASSES[i % PLAN_BG_CLASSES.length],
                      )}
                    >
                      <span className="uppercase leading-[1] text-[0.75rem] font-normal tracking-[0.066rem]">
                        {p.ctaLabel}
                      </span>
                      <span
                        className={cn(
                          'ml-4 material-symbols-outlined !text-[1.5rem] p-1 bg-[#FFFFF8] rounded-full',
                          PLAN_TXT_CLASSES[i % PLAN_TXT_CLASSES.length],
                        )}
                      >
                        pets
                      </span>
                    </a>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}
