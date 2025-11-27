'use client'

import React, { createContext, useCallback, use, useEffect, useState } from 'react'

import type { Theme, ThemeContextType } from './types'

import canUseDOM from '@/utilities/canUseDOM'
import { defaultTheme, getImplicitPreference, themeLocalStorageKey } from './shared'
import { themeIsValid } from './types'

const initialContext: ThemeContextType = {
  setTheme: () => null,
  theme: undefined,
}

const ThemeContext = createContext(initialContext)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<'light' | undefined>('light')

  const setTheme = useCallback((_themeToSet: 'light' | 'dark' | null) => {
    // Force light only; ignore localStorage and implicit preferences
    setThemeState('light')
    document.documentElement.setAttribute('data-theme', 'light')
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light')
    setThemeState('light')
  }, [])

  return <ThemeContext value={{ setTheme, theme }}>{children}</ThemeContext>
}

export const useTheme = (): ThemeContextType => use(ThemeContext)
