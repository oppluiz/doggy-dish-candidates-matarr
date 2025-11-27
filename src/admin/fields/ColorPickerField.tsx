'use client'
import React from 'react'

type Props = {
  path: string
  value?: string
  label?: string
  onChange: (update: { path: string; value: string }) => void
}

/**
 * Minimal color picker field for Payload admin.
 * Syncs both the color swatch and the text input to the same value.
 */
export const ColorPickerField: React.FC<Props> = ({ path, value = '#41A690', onChange }) => {
  const handleChange = (next: string) => {
    onChange({ path, value: next })
  }

  return (
    <div className="flex items-center gap-3">
      <input
        type="color"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        className="w-8 h-8 p-0 border-none bg-transparent cursor-pointer"
        aria-label="Pick background color"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="#41A690"
        className="px-2 py-1 border rounded w-[12rem]"
        aria-label="Background color value"
      />
    </div>
  )
}