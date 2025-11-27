'use client'

import React, { useState } from 'react'
import { cn } from '@/utilities/ui'

type SelectOption = {
  label?: string
  value?: string
}

type Column = {
  heading?: string
  type?: 'text' | 'checkbox' | 'select'
  desktopWidth?: string
  mobileWidth?: string
  selectOptions?: SelectOption[]
}

type Cell = {
  value?: string
  checked?: boolean
  selectedValue?: string
}

type Row = {
  cells?: Cell[]
}

type Tab = {
  title?: string
  columns?: Column[]
  rows?: Row[]
}

export type TabbedTableBlockProps = {
  maxWidth?: string
  headerBackgroundColor?: string
  cellBackgroundColor?: string
  textColor?: string
  inactiveTextColor?: string
  borderColor?: string
  tabs?: Tab[]
  className?: string
}

export const TabbedTableBlock: React.FC<TabbedTableBlockProps> = ({
  maxWidth = '100%',
  headerBackgroundColor = '#F6A944',
  cellBackgroundColor = '#FFFFFF',
  textColor = '#000000',
  inactiveTextColor = '#666666',
  borderColor = '#E5E5E5',
  tabs = [],
  className,
}) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0)
  const [tableData, setTableData] = useState(tabs)
  const [animationKey, setAnimationKey] = useState(0)

  // Update tableData when tabs prop changes
  React.useEffect(() => {
    setTableData(tabs)
  }, [tabs])

  // Handle tab change with animation trigger
  const handleTabChange = (newTabIndex: number) => {
    setActiveTabIndex(newTabIndex)
    setAnimationKey((prev) => prev + 1) // Force re-animation
  }

  if (!tableData || tableData.length === 0) {
    return null
  }

  const activeTab = tableData[activeTabIndex]
  const roundHeaderOnDesktop = tableData?.length === 1

  const handleSelectChange = (
    tabIndex: number,
    rowIndex: number,
    cellIndex: number,
    newValue: string,
  ) => {
    setTableData((prevData) => {
      const newData = [...prevData]
      if (newData[tabIndex]?.rows?.[rowIndex]?.cells?.[cellIndex]) {
        newData[tabIndex].rows[rowIndex].cells[cellIndex] = {
          ...newData[tabIndex].rows[rowIndex].cells[cellIndex],
          selectedValue: newValue,
          value: newValue, // Also update value for consistency
        }
      }
      return newData
    })
  }

  const handleCheckboxChange = (
    tabIndex: number,
    rowIndex: number,
    cellIndex: number,
    checked: boolean,
  ) => {
    setTableData((prevData) => {
      const newData = [...prevData]
      if (newData[tabIndex]?.rows?.[rowIndex]?.cells?.[cellIndex]) {
        newData[tabIndex].rows[rowIndex].cells[cellIndex] = {
          ...newData[tabIndex].rows[rowIndex].cells[cellIndex],
          checked: checked,
        }
      }
      return newData
    })
  }

  const renderCell = (cell: Cell, column: Column, rowIndex: number, cellIndex: number) => {
    const cellKey = `${rowIndex}-${cellIndex}`

    switch (column.type) {
      case 'checkbox':
        return (
          <div className="flex justify-center items-center">
            <span
              className="material-symbols-outlined !text-[21px] md:!text-[33px] cursor-pointer select-none"
              onClick={() => {
                handleCheckboxChange(activeTabIndex, rowIndex, cellIndex, !cell?.checked)
              }}
            >
              {cell?.checked ? 'check_box' : 'check_box_outline_blank'}
            </span>
          </div>
        )

      case 'select':
        const searchValue = cell?.selectedValue || cell?.value
        const displayText = searchValue || 'Rarely'
        var baseValue = isMobile ? 36 : 36
        var multiplier = isMobile ? 6 : 8
        const calculatedWidth = baseValue + displayText.length * multiplier

        return (
          <div
            className="relative flex gap-[4px] items-center mx-auto"
            style={{ width: `${calculatedWidth}px` }}
          >
            <select
              value={searchValue || ''}
              onChange={(e) => {
                handleSelectChange(activeTabIndex, rowIndex, cellIndex, e.target.value)
              }}
              className="w-full appearance-none bg-[#F4B5A4] text-[0.625rem] md:text-[0.875rem] font-lato font-bold text-white px-2 py-1 pr-6 rounded-[10px] border-none focus:outline-none cursor-pointer"
              style={{
                backgroundColor: '#F4B5A4',
                color: 'white',
              }}
            >
              {column.selectOptions?.map((option, optIndex) => (
                <option key={optIndex} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <span className="material-symbols-outlined absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-[0.625rem] md:!text-[1.25rem] pointer-events-none">
              arrow_drop_down
            </span>
          </div>
        )

      case 'text':
      default:
        return (
          <span className="flex h-auto my-auto text-[0.625rem] md:text-[0.875rem] md:pr-[30px] font-lato font-bold leading-[1]">
            {cell?.value || '-'}
          </span>
        )
    }
  }

  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const mql = window.matchMedia('(max-width: 768px)')
    const apply = () => setIsMobile(mql.matches)
    apply()
    mql.addEventListener('change', apply)
    return () => mql.removeEventListener('change', apply)
  }, [])

  const getColumnWidth = (column: Column, isMobile: boolean) => {
    const width = isMobile ? column.mobileWidth : column.desktopWidth
    return width || 'auto'
  }

  return (
    <section className={cn('w-full mx-auto', className)} style={{ maxWidth }}>
      {/* Tab Navigation */}
      <div className="flex flex-col gap-[0.25rem] mb-[0.25rem] md:mb-0 md:gap-[unset] md:flex-row md:flex-wrap">
        {tableData.length > 1 &&
          tableData.map((tab, index) =>
            isMobile ? (
              <button
                key={index}
                onClick={() => handleTabChange(index)}
                className={cn(
                  'flex-1 py-[0.5rem] rounded-[1.25rem] text-center font-normal text-[0.75rem] font-lato tracking-[2px] transition-colors',
                  'border',
                  index === activeTabIndex ? 'text-white' : 'border-current',
                )}
                style={{
                  backgroundColor:
                    index === activeTabIndex
                      ? `${headerBackgroundColor}`
                      : `${cellBackgroundColor}80`,
                  color: index === activeTabIndex ? 'white' : inactiveTextColor,
                  borderColor: borderColor,
                  borderBottomColor: borderColor,
                }}
              >
                {tab.title || `Tab ${index + 1}`}
              </button>
            ) : (
              <button
                key={index}
                onClick={() => handleTabChange(index)}
                className={cn(
                  'flex-1 py-[1.125rem] rounded-tl-[0.875rem] rounded-tr-[0.875rem] text-center font-normal text-[0.75rem] font-lato tracking-[2px] transition-colors',
                  'border-t-[1px] border-l-[1px] border-r-[1px] border-solid',
                  index === activeTabIndex
                    ? 'text-white border-b-[1px] relative top-[1px]'
                    : 'border-current',
                )}
                style={{
                  backgroundColor:
                    index === activeTabIndex
                      ? `${headerBackgroundColor}`
                      : `${cellBackgroundColor}80`,
                  color: index === activeTabIndex ? 'white' : inactiveTextColor,
                  borderColor: borderColor,
                  borderBottomColor: index === activeTabIndex ? headerBackgroundColor : borderColor,
                }}
              >
                {tab.title || `Tab ${index + 1}`}
              </button>
            ),
          )}
      </div>

      {/* Active Tab Content */}
      {activeTab && (
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-0" style={{ borderColor }}>
            {/* Table Header */}
            {activeTab.columns && activeTab.columns.length > 0 && (
              <thead>
                <tr>
                  {activeTab.columns.map((column, colIndex) => (
                    <th
                      key={colIndex}
                      className={cn(
                        'px-[0.25rem] py-[0.5rem] md:px-[1rem] md:py-[1.125rem] text-center text-[0.625rem] md:text-[0.875rem] font-bold font-lato',
                        'border-t border-l border-b border-solid',
                        colIndex === activeTab.columns!.length - 1 && 'border-r',
                        // mobile-only rounded corners for first/last cells
                        isMobile &&
                          colIndex === 0 &&
                          'rounded-tl-[0.875rem] md:rounded-none overflow-hidden',
                        isMobile &&
                          colIndex === activeTab.columns!.length - 1 &&
                          'rounded-tr-[0.875rem] md:rounded-none overflow-hidden',
                        // desktop rounding when tableData.length < 1
                        !isMobile &&
                          roundHeaderOnDesktop &&
                          colIndex === 0 &&
                          'rounded-tl-[0.875rem] overflow-hidden',
                        !isMobile &&
                          roundHeaderOnDesktop &&
                          colIndex === activeTab.columns!.length - 1 &&
                          'rounded-tr-[0.875rem] overflow-hidden',
                      )}
                      style={{
                        backgroundColor: headerBackgroundColor,
                        color: 'white',
                        borderColor,
                        width: getColumnWidth(column, false),
                      }}
                    >
                      {column.heading || `Column ${colIndex + 1}`}
                    </th>
                  ))}
                </tr>
              </thead>
            )}

            {/* Table Body */}
            <tbody key={animationKey}>
              {activeTab.rows && activeTab.rows.length > 0 ? (
                activeTab.rows.map((row, rowIndex) => (
                  <tr
                    key={`${animationKey}-${rowIndex}`}
                    className="animate-fade-in-up"
                    style={{
                      animationDelay: `${rowIndex * 50}ms`,
                      animationFillMode: 'both',
                    }}
                  >
                    {activeTab.columns?.map((column, colIndex) => {
                      const cell = row.cells?.[colIndex] || {}
                      const isLastColumn = colIndex === (activeTab.columns?.length || 1) - 1
                      const isLastRow = rowIndex === (activeTab.rows?.length || 1) - 1
                      const isFirstColumn = colIndex === 0

                      return (
                        <td
                          key={colIndex}
                          className={cn(
                            'px-[0.875rem] py-[0.375rem]',
                            'border-l border-b border-solid',
                            isLastColumn && 'border-r',
                            isLastRow && isFirstColumn && 'rounded-bl-[0.875rem]',
                            isLastRow && isLastColumn && 'rounded-br-[0.875rem]',
                          )}
                          style={{
                            backgroundColor: cellBackgroundColor,
                            color: textColor,
                            borderColor,
                            width: getColumnWidth(column, false),
                          }}
                        >
                          {renderCell(cell, column, rowIndex, colIndex)}
                        </td>
                      )
                    })}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={activeTab.columns?.length || 1}
                    className="border-l border-r border-b border-solid px-4 py-8 text-center text-sm"
                    style={{
                      backgroundColor: cellBackgroundColor,
                      color: inactiveTextColor,
                      borderColor,
                    }}
                  >
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Mobile Responsive Styles */}
          <style jsx>{`
            @media (max-width: 768px) {
              table th,
              table td {
                width: ${activeTab.columns
                  ?.map((col) => getColumnWidth(col, true))
                  .join(' ')} !important;
              }
            }
          `}</style>
        </div>
      )}

      <div className="download--buttons gap-[0.5rem] flex items-center justify-center w-full mt-[0.75rem]">
        <span className="font-lato underline text-[0.75rem] md:text-[0.875rem] !font-normal">
          Download as PDF{' '}
        </span>
        <span className="font-lato text-[0.75rem] md:text-[0.875rem] !font-normal">|</span>
        <span className="font-lato underline text-[0.75rem] md:text-[0.875rem] !font-normal">
          Save and continue later
        </span>
      </div>
    </section>
  )
}
