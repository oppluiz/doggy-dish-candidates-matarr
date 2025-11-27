import React from 'react'
import RichText from '@/components/RichText'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { cn } from '@/utilities/ui'

type Column = {
  heading?: string
  type?: 'text' | 'input'
}

type Row = {
  cells?: { value?: string }[]
}

export type TableBlockProps = {
  heading?: string
  subheading?: string
  backgroundColor?: string
  intro?: DefaultTypedEditorState
  tableTitle?: string
  tableColor?: string
  columnHeadingColor?: string
  columns?: Column[]
  rows?: Row[]
  className?: string
  tableOverflow?: 'default' | 'overflow'
}

export const TableBlock: React.FC<TableBlockProps> = ({
  heading,
  subheading,
  backgroundColor = '#FFF4E5',
  intro,
  tableTitle,
  tableColor = '#F6A944',
  columnHeadingColor = '#FFFFFF',
  columns = [],
  rows = [],
  className,
  tableOverflow,
}) => {
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const mql = window.matchMedia('(max-width: 768px)')
    const apply = () => setIsMobile(mql.matches)
    apply()
    mql.addEventListener('change', apply)
    return () => mql.removeEventListener('change', apply)
  }, [])

  backgroundColor = isMobile ? 'transparent' : backgroundColor

  let inputColumn = isMobile ? 'minmax(0, 0.4fr)' : 'minmax(0, 0.8fr)'

  const gridTemplateColumns =
    (columns?.length || 0) > 0
      ? columns.map((c) => (c?.type === 'input' ? inputColumn : 'minmax(0, 1fr)')).join(' ')
      : 'minmax(0, 1fr)'

  const tableOverflowClass =
    tableOverflow === 'overflow' ? 'md:w-[104%] md:-left-[2%] relative' : ''
  return (
    <section
      className={cn(
        'table--container px-0 pb-[31px] md:pt-[34px] md:pb-[60px] md:px-[45px] md:rounded-[0.875rem]',
        tableOverflowClass,
        className,
      )}
      style={{ backgroundColor }}
    >
      <div>
        {heading && <h2 className="uppercase">{heading}</h2>}
        {subheading && (
          <p className="text-black italic text-[0.875rem] !mb-[12px] md:!mb-[1rem]">{subheading}</p>
        )}

        {intro && (
          <div className="mb-[49px] md:mb-[2rem]">
            <RichText data={intro} enableGutter={false} enableProse={false} />
          </div>
        )}

        {tableTitle && (
          <div className="text-center font-lato font-bold text-black mb-[0.875rem] leading-[1.2] text-[0.875rem]">
            {tableTitle}
          </div>
        )}

        {/* Grid-based table */}
        <div className="overflow-auto max-w-[32.75rem] m-auto rounded-[0.875rem]">
          <div
            role="table"
            className="grid w-full rounded-[0.875rem]"
            style={{
              backgroundColor: tableColor,
              gridTemplateColumns,
            }}
          >
            {/* Header row */}
            {(columns || []).map((col, ci) => {
              const isLastCol = ci === (columns?.length || 0) - 1
              const isFirstCol = ci === 0
              return (
                <div
                  role="columnheader"
                  key={`h-${ci}`}
                  className={cn(
                    'flex justify-center items-center text-center font-lato font-semibold py-[6px] px-[11px] md:py-[1rem] md:px-4 text-white text-[15px] md:text-[1.125rem]',
                    'border-t border-r border-solid border-white leading-[1.2]',
                    isLastCol && 'border-r-0',
                  )}
                  style={{
                    backgroundColor: columnHeadingColor,
                    ...(isFirstCol ? { borderTopLeftRadius: 14 } : {}),
                    ...(isLastCol ? { borderTopRightRadius: 14 } : {}),
                  }}
                >
                  {col?.heading || ''}
                </div>
              )
            })}

            {/* Body cells */}
            {(rows || []).map((row, ri) =>
              (columns || []).map((col, ci) => {
                const cellText = row?.cells?.[ci]?.value || ''
                const isFirstCol = ci === 0
                const isLastCol = ci === (columns?.length || 0) - 1
                const isFirstRow = ri === 0
                const isLastRow = ri === (rows?.length || 0) - 1

                return (
                  <div
                    role="cell"
                    key={`c-${ri}-${ci}`}
                    className={cn(
                      'text-center px-[17px] py-[13px] md:px-[1.5rem] md:py-[0.75rem] flex items-center justify-center',
                      'border-white border-r border-b',
                      isFirstRow && 'border-t',
                      isFirstCol && 'border-l',
                    )}
                    style={{
                      ...(isLastRow && isFirstCol ? { borderBottomLeftRadius: 14 } : {}),
                      ...(isLastRow && isLastCol ? { borderBottomRightRadius: 14 } : {}),
                    }}
                    aria-label={`Row ${ri + 1} column ${ci + 1}`}
                  >
                    {col.type === 'input' ? (
                      <label className="flex justify-center items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="peer sr-only"
                          aria-label={`Row ${ri + 1} column ${ci + 1}`}
                        />
                        <span
                          className="
                            inline-block min-h-[15.75px] min-w-[15.75px] md:h-[1.5rem] md:w-[1.5rem] rounded-[4px] border-2 border-white relative
                            after:content-[''] after:absolute 
                            after:left-[2px] after:top-[3px] 
                            after:md:left-[3px] after:md:top-[4px] 
                            after:w-[8px] after:h-[4px]
                            after:md:w-[14px] after:md:h-[8px]
                            after:border-b-2 after:border-l-2 after:border-white after:rotate-[-45deg]
                            after:opacity-0 peer-checked:after:opacity-100
                          "
                        />
                      </label>
                    ) : (
                      <span className="block text-white text-[12px] md:text-[0.875rem] font-lato font-semibold">
                        {cellText}
                      </span>
                    )}
                  </div>
                )
              }),
            )}
          </div>
        </div>

        <div className="download--buttons gap-[0.5rem] flex items-center justify-center w-full mt-[0.75rem]">
          <span className="font-lato underline text-[0.75rem] md:text-[0.875rem] !font-normal">
            Download as PDF{' '}
          </span>
          <span className="font-lato text-[0.75rem] md:text-[0.875rem] !font-normal">|</span>
          <span className="font-lato underline text-[0.75rem] md:text-[0.875rem] !font-normal">
            Save and continue later
          </span>
        </div>
      </div>
    </section>
  )
}
