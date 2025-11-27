import React from 'react'
import type { IngredientTabsBlock as IngredientTabsBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'

type Props = IngredientTabsBlockProps & {
  className?: string
}

const DogIcon: React.FC<{ className?: string }> = ({ className }) => (
  <span className={['material-symbols-outlined', className].filter(Boolean).join(' ')}>pets</span>
)
const WarningIcon: React.FC<{ className?: string }> = ({ className }) => (
  <span className={['material-symbols-outlined', className].filter(Boolean).join(' ')}>
    warning
  </span>
)

export const IngredientTabsBlock: React.FC<Props> = ({
  benefits,
  servingSizeHeading,
  servingSizeItems,
  frequency,
  howToServe,
  enableWarning,
  warningHeading,
  warningText,
  className,
}) => {
  return (
    <section className={['container', className].filter(Boolean).join(' ')}>
      {/* Tabs */}
      <nav aria-label="Ingredient sections" className="mb-6">
        <ul className="flex flex-wrap gap-4">
          {[
            { href: '#benefits', label: 'BENEFITS' },
            { href: '#serving-size', label: 'SERVING SIZE' },
            { href: '#frequency', label: 'FREQUENCY' },
            { href: '#how-to-serve', label: 'HOW TO SERVE' },
          ].map((t) => (
            <li key={t.href}>
              <a
                href={t.href}
                className="inline-flex items-center px-5 py-3 rounded-full bg-[#C8E8DF] text-black font-lato text-xs uppercase tracking-wide hover:opacity-90"
              >
                {t.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Benefits */}
      <div id="benefits" className="scroll-mt-24">
        <h2 className="text-black font-lato font-bold text-2xl mb-3">BENEFITS</h2>
        {benefits && (
          <RichText
            className="font-lato font-light text-[16px] text-black leading-[26px] mb-8"
            data={benefits}
            enableGutter={false}
            enableProse={false}
          />
        )}
      </div>

      {/* Serving Size */}
      <div
        id="serving-size"
        className="scroll-mt-24 w-full p-6 md:p-8 rounded-[0.875rem] bg-[#D8EEC9] shadow-[0px_8px_19px_rgba(0,0,0,0.1)] mb-10"
      >
        <div className="text-center mb-6">
          <h3 className="text-black font-lato font-semibold uppercase tracking-[0.07em] text-lg">
            {servingSizeHeading || 'SERVING SIZE'}
          </h3>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {(servingSizeItems || []).map((item, i) => (
            <li
              key={i}
              className="bg-white rounded-[16px] shadow-[0px_8px_15px_rgba(0,0,0,0.03)] px-6 py-5 flex flex-col items-center text-center"
            >
              <DogIcon className="text-[36px] text-black mb-2" />
              <p className="font-lato font-bold text-black text-sm">{item?.heading || '—'}</p>
              <div className="w-10 h-[2px] bg-black/20 my-2" />
              <p className="font-lato font-light text-black text-sm">{item?.portion || '—'}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Frequency */}
      <div id="frequency" className="scroll-mt-24">
        <h2 className="text-black font-lato font-bold text-2xl mb-3">FREQUENCY</h2>
        {frequency && (
          <RichText
            className="font-lato font-light text-[16px] text-black leading-[26px] mb-8"
            data={frequency}
            enableGutter={false}
            enableProse={false}
          />
        )}
      </div>

      {/* How To Serve */}
      <div id="how-to-serve" className="scroll-mt-24">
        <h2 className="text-black font-lato font-bold text-2xl mb-3">HOW TO SERVE</h2>
        {howToServe && (
          <RichText
            className="font-lato font-light text-[16px] text-black leading-[26px] mb-6"
            data={howToServe}
            enableGutter={false}
            enableProse={false}
          />
        )}

        {enableWarning && (
          <div className="bg-[#F0614A] text-white rounded-[16px] px-6 py-8 shadow-[0px_8px_19px_rgba(0,0,0,0.08)]">
            <div className="flex flex-col items-center text-center gap-3">
              <WarningIcon className="text-[36px]" />
              <h4 className="font-lato font-bold uppercase tracking-wide">
                {warningHeading || 'IMPORTANT'}
              </h4>
              <p className="font-lato text-sm opacity-90">
                {warningText ||
                  'Warning text goes here. Replace with your specific cautionary message.'}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
