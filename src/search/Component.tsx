'use client'
import React, { useState, useEffect } from 'react'
import { useDebounce } from '@/utilities/useDebounce'
import { useRouter, useSearchParams } from 'next/navigation'

export const Search: React.FC = () => {
  const searchParams = useSearchParams()
  const [value, setValue] = useState(searchParams.get('q') || '')
  const router = useRouter()

  const debouncedValue = useDebounce(value, 500)

  useEffect(() => {
    const params = new URLSearchParams()
    if (debouncedValue) {
      params.set('q', debouncedValue)
    }
    router.push(`/search${params.toString() ? `?${params.toString()}` : ''}`)

    if (debouncedValue) {
      try {
        localStorage.setItem('dd_searchPerformed', 'true')
      } catch {}
    }
  }, [debouncedValue, router])

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
      }}
      className="mx-auto max-w-[17rem] relative"
    >
      <input
        type="text"
        name="q"
        value={value}
        onChange={(event) => {
          setValue(event.target.value)
        }}
        placeholder="Search..."
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
  )
}
