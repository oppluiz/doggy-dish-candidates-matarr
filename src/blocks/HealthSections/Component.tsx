'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import type { HealthSectionsBlock as HealthSectionsBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { toKebabCase } from '@/utilities/toKebabCase'

type Props = HealthSectionsBlockProps & { className?: string }

export const HealthSectionsBlock: React.FC<Props> = ({ sections, className }) => {
  if (!sections || sections.length === 0) return null

  const getId = (heading?: string | null, anchor?: string | null) => {
    const raw = anchor && anchor.trim() !== '' ? anchor : heading || ''
    return toKebabCase(raw)
  }

  // Helpers for table state
  const tableKeyFor = (id: string) => `health-table-${id}`

  return (
    <section className={['container', className].filter(Boolean).join(' ')}>
      <div className="rounded-2xl bg-[#FAFAF5] px-6 py-8 shadow-sm">
        <div className="flex flex-col gap-8">
          {sections.map((section: any, i: number) => {
            const id = getId(section?.heading, section?.anchor)

            // Table section
            if (section?.type === 'table') {
              const printRef = useRef<HTMLDivElement | null>(null)
              const [values, setValues] = useState<Record<string, any>>({})
              const columns = section?.columns || []
              const rows = section?.rows || []
              const tableOverflow = section?.tableOverflow || 'default'

              // Restore saved data
              useEffect(() => {
                try {
                  const raw = localStorage.getItem(tableKeyFor(id))
                  if (raw) setValues(JSON.parse(raw))
                } catch {}
              }, [id])

              const setCellValue = (rIdx: number, cIdx: number, val: any) => {
                setValues((prev) => {
                  const next = { ...prev }
                  const key = `${rIdx}-${cIdx}`
                  next[key] = val
                  return next
                })
              }

              const saveForLater = () => {
                try {
                  localStorage.setItem(tableKeyFor(id), JSON.stringify(values))
                } catch {}
              }

              const downloadPdf = () => {
                // Use browser print to PDF for broad compatibility
                window.print()
              }

              return (
                <div
                  key={i}
                  id={id}
                  className={tableOverflow === 'overflow' ? 'w-[104%] -l-[2%] relative' : ''}
                >
                  {section?.heading && (
                    <h2 className="text-black font-lato font-bold text-lg mb-2">
                      {section.heading}
                    </h2>
                  )}

                  {section?.intro && (
                    <RichText
                      className="text-black font-lato text-[14px] leading-6 mb-4"
                      data={section.intro}
                      enableGutter={false}
                      enableProse={false}
                    />
                  )}

                  <div
                    ref={printRef}
                    className="rounded-xl bg-[#FFF6E6] p-4 border border-orange-200"
                  >
                    <div className="overflow-x-auto">
                      <table className="min-w-full border-separate border-spacing-y-2">
                        <thead>
                          <tr>
                            {(columns || []).map((col: any, ci: number) => (
                              <th
                                key={ci}
                                className="bg-[#F4A72F] text-white font-lato font-semibold text-sm px-4 py-3 rounded-md"
                                style={{ textAlign: ci === 0 ? 'left' : 'center' }}
                              >
                                {col?.title || ''}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {(rows || []).map((row: any, ri: number) => (
                            <tr key={ri}>
                              {(columns || []).map((col: any, ci: number) => {
                                const isText = col?.columnType !== 'input'
                                const inputType = (col?.inputType || 'checkbox') as
                                  | 'checkbox'
                                  | 'text'
                                  | 'number'
                                  | 'textarea'
                                const key = `${ri}-${ci}`
                                const cellText =
                                  row?.cells?.[ci]?.text ??
                                  (ci === 0 ? (row?.cells?.[0]?.text ?? '') : '')

                                return (
                                  <td
                                    key={ci}
                                    className="bg-white px-4 py-3 rounded-md align-top"
                                    style={{ textAlign: isText ? 'left' : 'center' }}
                                  >
                                    {isText ? (
                                      <span className="text-black font-lato text-[14px] leading-6 block">
                                        {cellText}
                                      </span>
                                    ) : inputType === 'checkbox' ? (
                                      <input
                                        type="checkbox"
                                        checked={Boolean(values[key])}
                                        onChange={(e) => setCellValue(ri, ci, e.target.checked)}
                                        className="w-4 h-4 accent-[#44A38A]"
                                      />
                                    ) : inputType === 'textarea' ? (
                                      <textarea
                                        value={values[key] ?? ''}
                                        onChange={(e) => setCellValue(ri, ci, e.target.value)}
                                        className="w-full border border-black/20 rounded-md px-2 py-2 text-sm"
                                      />
                                    ) : (
                                      <input
                                        type={inputType}
                                        value={values[key] ?? ''}
                                        onChange={(e) => setCellValue(ri, ci, e.target.value)}
                                        className="w-full border border-black/20 rounded-md px-2 py-2 text-sm"
                                      />
                                    )}
                                  </td>
                                )
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="flex gap-4 mt-4 justify-end">
                      <button
                        type="button"
                        onClick={downloadPdf}
                        className="px-4 py-2 rounded-md bg-[#44A38A] text-white font-lato text-sm"
                      >
                        Download as PDF
                      </button>
                      <button
                        type="button"
                        onClick={saveForLater}
                        className="px-4 py-2 rounded-md bg-[#C8E8DF] text-black font-lato text-sm"
                      >
                        Save and continue later
                      </button>
                    </div>
                  </div>
                </div>
              )
            }

            if (section?.type === 'accordion') {
              const renderIcon = (name?: string) => {
                const common = 'w-5 h-5 text-[#2C6B62]'
                switch (name) {
                  case 'paw':
                    return (
                      <svg className={common} viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="7" cy="6" r="2" />
                        <circle cx="12" cy="4" r="2" />
                        <circle cx="17" cy="6" r="2" />
                        <path d="M12 12c-4 0-7 2-7 5v3h14v-3c0-3-3-5-7-5z" />
                      </svg>
                    )
                  case 'leaf':
                    return (
                      <svg className={common} viewBox="0 0 24 24" fill="currentColor">
                        <path d="M5 19c10-1 14-7 14-14-7 0-13 4-14 14z" />
                        <path
                          d="M5 19c0-4 3-7 7-9"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          fill="none"
                        />
                      </svg>
                    )
                  case 'sparkles':
                    return (
                      <svg className={common} viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6z" />
                      </svg>
                    )
                  case 'medkit':
                    return (
                      <svg className={common} viewBox="0 0 24 24" fill="currentColor">
                        <rect x="3" y="7" width="18" height="12" rx="2" />
                        <rect x="8" y="3" width="8" height="4" rx="1" />
                        <path d="M12 10v6M9 13h6" stroke="#fff" strokeWidth="2" />
                      </svg>
                    )
                  case 'activity':
                    return (
                      <svg
                        className={common}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M22 12h-4l-3 7-4-14-3 7H2" />
                      </svg>
                    )
                  default:
                    return null
                }
              }

              return (
                <div key={i} id={id}>
                  {section?.heading && (
                    <h2 className="text-black font-lato font-bold text-lg mb-2">
                      {section.heading}
                    </h2>
                  )}

                  {section?.intro && (
                    <RichText
                      className="text-black font-lato text-[14px] leading-6 mb-4"
                      data={section.intro}
                      enableGutter={false}
                      enableProse={false}
                    />
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(section.items || []).map((item: any, idx: number) => (
                      <details key={idx} className="group rounded-2xl bg-[#C8E8DF] p-4 shadow-sm">
                        <summary className="cursor-pointer list-none flex items-center gap-3">
                          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#CBE7C9]">
                            {renderIcon(item?.icon)}
                          </div>
                          <div className="flex-1">
                            <div className="text-black font-lato font-semibold text-sm">
                              {item?.title}
                            </div>
                            {item?.subtitle && (
                              <div className="text-black/70 font-lato text-xs">{item.subtitle}</div>
                            )}
                          </div>
                          <span className="inline-block w-0 h-0 border-y-4 border-y-transparent border-l-8 border-l-[#2C6B62] transition-transform group-open:rotate-90" />
                        </summary>

                        <div className="mt-3 pl-12">
                          {item?.content && (
                            <RichText
                              className="text-black font-lato text-[14px] leading-6"
                              data={item.content}
                              enableGutter={false}
                              enableProse={false}
                            />
                          )}
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              )
            }

            // Default: richText section
            return (
              <div key={i} id={id}>
                {section?.heading && (
                  <h2 className="text-black font-lato font-bold text-lg mb-2">{section.heading}</h2>
                )}
                {section?.content && (
                  <RichText
                    className="text-black font-lato text-[14px] leading-6"
                    data={section.content}
                    enableGutter={false}
                    enableProse={false}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
