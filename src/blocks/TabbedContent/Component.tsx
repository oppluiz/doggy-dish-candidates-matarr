'use client'

import React, { useState } from 'react'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'
import type { TabbedContentBlock as TabbedContentBlockProps } from '@/payload-types'

type Props = TabbedContentBlockProps & {
  className?: string
  containerSize?: string
}

export const TabbedContentBlock: React.FC<Props> = ({
  tabs,
  backgroundColor,
  inactiveTabColor,
  borderColor,
  className,
  containerSize,
}) => {
  const [activeTab, setActiveTab] = useState(0)
  const [scales, setScales] = useState<number[]>(() => (tabs || []).map(() => 1))

  if (!tabs || tabs.length === 0) return null

  const currentTab = (tabs as any)[activeTab] || {}
  const scaleEnabled = Boolean(currentTab?.enableScale)
  const scale = scales[activeTab] ?? 1
  const [showScaleDropdown, setShowScaleDropdown] = useState(false)

  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const val = scales[activeTab] ?? 1
    window.dispatchEvent(
      new CustomEvent('dd:scale:update', { detail: { tabIndex: activeTab, value: val } }),
    )
  }, [activeTab, scales])

  React.useEffect(() => {
    const close = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('#scale-selector')) setShowScaleDropdown(false)
    }
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [])

  const scaleOptions = [1, 2, 3, 4, 5, 6, 7, 8]
  const selectScale = (val: number) => {
    setScales((arr) => arr.map((v, i) => (i === activeTab ? val : v)))
    setShowScaleDropdown(false)
  }

  React.useEffect(() => {
    const mql = window.matchMedia('(max-width: 768px)')
    const apply = () => setIsMobile(mql.matches)
    apply()
    mql.addEventListener('change', apply)
    return () => mql.removeEventListener('change', apply)
  }, [])

  var backgroundColorRender = isMobile ? '#C8E8DF' : backgroundColor
  var inactiveTabColorRender = isMobile ? '#41A690' : inactiveTabColor

  var x_backgroundColorRender = isMobile ? 'transparent' : backgroundColor
  var x_inactiveTabColorRender = isMobile ? 'transparent' : inactiveTabColor

  return (
    <div id="tabbed-content" className={cn(containerSize, 'md:!px-0 my-[2.625rem]', className)}>
      <div className="bg-[#EEF8F0] p-[2rem] md:p-0 md:bg-transparent tabbed-content rounded-[1.25rem]">
        {/* Tab Navigation */}
        <div className="grid grid-cols-2 gap-[0.25rem] md:gap-0 md:!flex">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={cn(
                'flex-1 py-[0.5rem] md:py-[1.125rem] top-[1px] relative text-center uppercase md:border md:border-b-[0px]',
                'rounded-[1.25rem] md:rounded-[unset] md:rounded-tr-[0.875rem] md:rounded-tl-[0.875rem]',
                'md:text-black text-white text-[0.875rem] font-normal font-lato tracking-[0.061rem] transition-colors duration-200',
                'md:after:content-[""] md:after:absolute md:after:-bottom-[2px] md:after:left-[0px] md:after:w-full md:after:h-[4px] md:after:bg-transparent',
                activeTab === index ? 'md:after:bg-[var(--after-bg)]' : '',
              )}
              style={{
                backgroundColor:
                  activeTab === index ? backgroundColorRender : inactiveTabColorRender,
                borderColor: borderColor ? borderColor : 'transparent',
                zIndex: activeTab === index ? '15' : '1',
                '--after-bg': activeTab === index ? backgroundColorRender : inactiveTabColorRender,
                ...(index === tabs.length - 1 &&
                  ({
                    '--tw-border-opacity': '1',
                  } as any)),
              }}
            >
              {tab.title}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div
          className={cn(
            'tab--content transition-all duration-200 rounded-br-[0.875rem] rounded-bl-[0.875rem]',
            scaleEnabled ? 'scale-enabled' : '',
          )}
          style={{
            backgroundColor:
              activeTab === tabs.length - 1
                ? ''
                : x_inactiveTabColorRender || x_backgroundColorRender,
            borderRight: isMobile ? 'none' : `1px solid ${borderColor || '#dee2e6'}`,
          }}
        >
          <div
            className={cn(
              'pt-[2rem] md:pt-[3.125rem] md:px-[2.625rem] md:pb-[2.625rem] z-10 relative rounded-br-[0.875rem] rounded-bl-[0.875rem]',
              activeTab === tabs.length - 1 ? '' : 'rounded-tr-[0.875rem]',
            )}
            style={{
              backgroundColor: x_backgroundColorRender || '#f8f9fa',
              border: isMobile ? 'none' : `1px solid ${borderColor || '#dee2e6'}`,
              width: 'calc(100% + 1px)',
              ['--dd-scale' as any]: scaleEnabled ? String(scale) : '1',
            }}
          >
            {scaleEnabled && (
              <div
                id="scale-selector"
                className="absolute top-[2rem] md:top-[2.875rem] right-[0px] md:right-[1.625rem]"
              >
                <button
                  type="button"
                  onClick={() => setShowScaleDropdown((v) => !v)}
                  className="flex items-center gap-[0.75rem]"
                  aria-haspopup="listbox"
                  aria-expanded={showScaleDropdown}
                >
                  <span className="hidden md:inline text-[0.75rem] text-black">Scale</span>
                  <div className="bg-[#FFA12F] rounded-[0.5rem] px-[0.75rem] py-[0.5rem] flex items-center justify-between">
                    <span className="font-bold font-lato text-[1.125rem] text-white">{scale}x</span>
                    <span className="material-symbols-outlined !text-[20px] text-white">
                      unfold_more
                    </span>
                  </div>
                </button>

                {showScaleDropdown && (
                  <div
                    role="listbox"
                    aria-label="Select scale"
                    className="mt-2 w-full mx-auto max-w-[4rem] md:max-w-[6.25rem] max-h-[6.5rem] overflow-y-auto rounded-[0.5rem] bg-white shadow-lg border border-[#FFA12F]"
                  >
                    {scaleOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => selectScale(opt)}
                        role="option"
                        aria-selected={opt === scale}
                        className={cn(
                          'w-full text-left px-3 py-2 font-lato text-[0.875rem]',
                          opt === scale ? 'bg-[#FFF3E0] font-bold' : 'hover:bg-[#FFF7EB]',
                        )}
                      >
                        {opt}x
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
            {tabs[activeTab]?.content && (
              <RichText data={tabs[activeTab].content} enableProse={false} enableGutter={false} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
