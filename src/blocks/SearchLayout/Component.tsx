import React from 'react'

type Props = {
  heading?: string | null
  placeholder?: string | null
  className?: string
}

export const SearchLayoutBlock: React.FC<Props> = ({
  heading,
  placeholder = 'Search...',
  className,
}) => {
  return (
    <section className={['container mb-[2.25rem]', className].filter(Boolean).join(' ')}>
      <h2 className="text-center font-lato font-normal uppercase tracking-[0.1rem] text-[1.25rem] leading-[1] text-black mb-[1.25rem]">
        {heading || 'SEARCH FOR FOOD, HEALTH CONCERN, AND MORE'}
      </h2>
      <form action="/search" method="get" className="mx-auto max-w-[17rem] relative">
        <input
          type="text"
          name="q"
          placeholder={placeholder || 'Search...'}
          className="bg-[#FFFFF8] w-full h-[2.375rem] rounded-full border-[0.1rem] border-solid border-black px-[1.5rem] pr-[0.875rem] text-[0.75rem] outline-none placeholder:text-black/50"
        />
        <button
          type="submit"
          className="absolute right-[0.875rem] top-1/2 -translate-y-1/2 inline-flex items-center justify-center"
          aria-label="Search"
        >
          <span className="material-symbols-outlined !text-[1rem] text-black">search</span>
        </button>
      </form>
    </section>
  )
}
