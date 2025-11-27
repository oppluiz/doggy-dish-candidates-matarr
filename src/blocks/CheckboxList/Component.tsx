'use client'

import React from 'react'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'

type Item = {
  text?: string | null
  href?: string | null
  content?: any
}

type Props = {
  items?: Item[] | null
  className?: string
}

export const CheckboxListBlock: React.FC<Props> = ({ items = [], className }) => {
  const [checked, setChecked] = React.useState<boolean[]>(() => (items || []).map(() => false))
  const [scale, setScale] = React.useState<number>(1)
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const originalTextMap = React.useRef<WeakMap<Node, string>>(new WeakMap())

  React.useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as { value?: number }
      setScale(typeof detail?.value === 'number' ? detail.value : 1)
    }
    window.addEventListener('dd:scale:update', handler as EventListener)
    return () => window.removeEventListener('dd:scale:update', handler as EventListener)
  }, [])

  React.useEffect(() => {
    const root = containerRef.current
    if (!root) return
    transformQuantities(root, scale, originalTextMap.current)
  }, [items, scale])

  const toggle = (index: number) => setChecked((prev) => prev.map((v, i) => (i === index ? !v : v)))

  return (
    <section ref={containerRef} className={cn('md:space-y-[1.25rem]', className)}>
      <ul className="!p-[0px] space-y-[1.25rem]">
        {(items || []).map((item, i) => {
          const isChecked = checked[i]
          const content = item?.content ? (
            <div
              className={cn(
                'pt-[5px] md:pt-0 inline-block text-[0.875rem] [&_p]:!m-[0px] font-lato font-light',
                isChecked ? 'line-through text-black/50' : 'text-black',
              )}
            >
              <RichText data={item.content} enableProse={false} enableGutter={false} />
            </div>
          ) : (
            <span
              className={cn(
                'inline-block',
                isChecked ? 'line-through text-black' : 'text-black',
              )}
            >
              {item?.href ? (
                <a href={item.href || '#'} target="_blank" rel="noopener noreferrer">
                  {item?.text}
                </a>
              ) : (
                item?.text
              )}
            </span>
          )

          return (
            <li key={i} className="flex items-start md:items-center gap-[0.75rem]">
              <button
                type="button"
                aria-pressed={isChecked}
                onClick={() => toggle(i)}
                className={cn(
                  'flex items-center justify-center',
                  isChecked ? 'bg-transparent text-black' : 'bg-transparent text-black',
                )}
              >
                <span className="material-symbols-outlined !text-[24px]">
                  {isChecked ? 'check_box' : 'check_box_outline_blank'}
                </span>
              </button>
              {content}
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default CheckboxListBlock

function transformQuantities(root: HTMLElement, scale: number, originalMap: WeakMap<Node, string>) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const text = node.textContent || ''
      if (!text.trim()) return NodeFilter.FILTER_REJECT
      const parent = node.parentElement
      if (!parent || ['SCRIPT', 'STYLE'].includes(parent.tagName)) return NodeFilter.FILTER_REJECT
      return NodeFilter.FILTER_ACCEPT
    },
  })

  let current: Node | null = walker.nextNode()
  while (current) {
    const baseText =
      originalMap.get(current) ??
      (() => {
        const t = current!.textContent || ''
        originalMap.set(current!, t)
        return t
      })()

    const scaled = replaceNumbers(baseText, scale)
    if (scaled !== current.textContent) {
      current.textContent = scaled
    }

    current = walker.nextNode()
  }
}

// Unit-aware quantity scaling and conversion
function replaceNumbers(text: string, scale: number): string {
  // Skip unit ratios such as "mg / g" or "mg per capsule"
  // Scale only standalone quantities when not part of a ratio
  const unitRegex =
    /\b(\d+(?:\.\d+)?)\s*(mg|gms?|kg|oz|lb)\b(?!\s*(?:\/|per)\s*(?:mg|gms?|kg|oz|lb|caps?(?:ule)?|tablets?|servings?|doses?|cups?|cup|tsp|tbsp|g|gm|gms|kg|oz|lb)\b)/gi

  let result = text.replace(unitRegex, (full, numStr: string, unitRaw: string) => {
    const num = parseFloat(numStr)
    if (!isFinite(num)) return full

    const unit = unitRaw.toLowerCase()
    const isMetric =
      unit === 'mg' || unit === 'g' || unit === 'gm' || unit === 'gms' || unit === 'kg'
    const isImperial = unit === 'oz' || unit === 'lb'

    if (isMetric) {
      // Normalize to grams
      let grams = unit === 'mg' ? num / 1000 : unit === 'kg' ? num * 1000 : num
      grams = grams * scale

      if (grams >= 1000) {
        const kg = grams / 1000
        return `${formatNumber(kg, 3)} kg`
      } else if (grams < 1) {
        const mg = grams * 1000
        return `${formatNumber(mg, 0)} mg`
      } else {
        const label = unitRaw.toLowerCase().startsWith('gm') ? 'gms' : 'g'
        return `${formatNumber(grams, 2)} ${label}`
      }
    }

    if (isImperial) {
      // Normalize to ounces
      let ounces = unit === 'lb' ? num * 16 : num
      ounces = ounces * scale

      if (ounces >= 16) {
        const lb = ounces / 16
        return `${formatNumber(lb, 2)} lb`
      } else {
        return `${formatNumber(ounces, 2)} oz`
      }
    }

    return full
  })

  // Scale standalone numbers ONLY when surrounded by spaces on both sides:
  // - Matches "text 123 text"
  // - Ignores "text-123 text", "text(123) text", "123-text"
  // - Also ignores numbers immediately followed by a unit (mg/gms/kg/oz/lb)
  const bareNumberRegex = /(^|\s)(\d+(?:\.\d+)?)(?!\s*(?:mg|gms?|kg|oz|lb)\b)(?=\s|$)/gi

  result = result.replace(bareNumberRegex, (match, leading: string, numStr: string) => {
    const num = parseFloat(numStr)
    if (!isFinite(num)) return match
    const scaled = num * scale
    return `${leading}${String(Math.round(scaled))}`
  })

  return result
}

function formatNumber(value: number, maxDecimals: number): string {
  // Use fixed decimals then trim trailing zeros and dot
  const fixed = value.toFixed(maxDecimals)
  return fixed.replace(/\.?0+$/, '')
}
