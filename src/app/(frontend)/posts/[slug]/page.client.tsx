'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

const PageClient: React.FC = () => {
  /* Force header to light mode */
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('light')
  }, [setHeaderTheme])

  useEffect(() => {
    try {
      localStorage.setItem('dd_visitedRecipe', 'true')
    } catch {}
  }, [])

  return <React.Fragment />
}

export default PageClient
