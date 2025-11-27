import React from 'react'

type Column = {
  heading: string
  text: string
}

type Props = {
  heading?: string
  columns?: Column[]
}

export const ServiceSizeBlock: React.FC<Props> = ({ heading, columns = [] }) => {
  const [isMobile, setIsMobile] = React.useState(false)
  const [isVisible, setIsVisible] = React.useState(false)
  const [animatedColumns, setAnimatedColumns] = React.useState<Record<number, boolean>>({})
  const sectionRef = React.useRef<HTMLElement>(null)

  const baseHeight = '100%'
  const heightStep = isMobile ? 16 : 30
  const baseIcon = isMobile ? 10 : 20
  const iconStep = isMobile ? 10 : 15

  const items = (columns || []).slice(0, 5)

  React.useEffect(() => {
    const mql = window.matchMedia('(max-width: 768px)')
    const apply = () => setIsMobile(mql.matches)
    apply()
    mql.addEventListener('change', apply)
    return () => mql.removeEventListener('change', apply)
  }, [])

  // Intersection Observer for scroll-triggered animations
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
          // Start cascade animation for each column
          items.forEach((_, index) => {
            setTimeout(() => {
              setAnimatedColumns((prev) => ({ ...prev, [index]: true }))
            }, index * 150) // 150ms delay between each column
          })
        }
      },
      { threshold: 0.3 }, // Trigger when 30% of the section is visible
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [items.length, isVisible])

  return (
    <section
      ref={sectionRef}
      className="mx-auto rounded-[0.875rem] bg-[#D8EAA8] my-[34px] md:my-0 pt-[32px] pb-[36px] px-[22px] md:pt-[3.75rem] md:px-[1rem] md:pb-[3.5rem]"
    >
      {heading && (
        <h3 className="font-bold font-lato tracking-[2px] uppercase text-[1.25rem] text-center mb-[18px] md:mb-[1.25rem]">
          {heading}
        </h3>
      )}

      <div className="grid grid-cols-3 md:grid-cols-5 gap-[9px] md:gap-[0.75rem] items-end">
        {items.map((col, i) => {
          const height = baseHeight + i * heightStep
          const iconSize = baseIcon + i * iconStep
          const isAnimated = animatedColumns[i]

          return (
            <div
              key={i}
              className={[
                i % 3 === 0 ? 'hidden' : '',
                'bg-[#FFFFF8] rounded-[0.875rem] shadow p-[11px] md:px-[0.75rem] md:py-[1rem] flex md:!flex flex-col items-center transition-all duration-700 ease-out',
                isAnimated
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-8 scale-95',
              ]
                .filter(Boolean)
                .join(' ')}
              style={{
                height,
                transitionDelay: isAnimated ? `${i * 150}ms` : '0ms',
              }}
            >
              <span
                className={[
                  'material-symbols-outlined text-black mb-[6px] md:mb-[0.625rem] transition-all duration-500 ease-out',
                  isAnimated ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 rotate-12',
                ].join(' ')}
                style={{
                  fontSize: iconSize,
                  lineHeight: 1,
                  transitionDelay: isAnimated ? `${i * 150 + 200}ms` : '0ms',
                }}
                aria-hidden="true"
              >
                sound_detection_dog_barking
              </span>

              <div
                className={[
                  'w-full text-center transition-all duration-600 ease-out',
                  isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
                ].join(' ')}
                style={{
                  transitionDelay: isAnimated ? `${i * 150 + 300}ms` : '0ms',
                }}
              >
                <h4 className="font-bold font-lato text-[10px] md:text-[1.125rem]">
                  {col.heading}
                </h4>

                <div className="mt-[5px] mb-[5px] md:mt-[1rem] md:mb-[0.75rem] w-full flex justify-center">
                  <div className="h-[1px] w-full bg-black" />
                </div>

                <p className="text-[8px] md:text-[0.75rem] font-lato font-normal leading-[1] md:leading-[1]">
                  {col.text}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default ServiceSizeBlock
