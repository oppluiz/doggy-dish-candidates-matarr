'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { SearchResults } from './SearchResults'
import { Search } from '@/search/Component'

interface SearchPageClientProps {
  initialPosts: any[]
  initialHasNextPage: boolean
  initialCurrentPage: number
  initialQuery?: string
  initialTotalDocs: number
}

export const SearchPageClient: React.FC<SearchPageClientProps> = ({
  initialPosts,
  initialHasNextPage,
  initialCurrentPage,
  initialQuery,
  initialTotalDocs,
}) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [posts, setPosts] = useState(initialPosts)
  const [hasNextPage, setHasNextPage] = useState(initialHasNextPage)
  const [currentPage, setCurrentPage] = useState(initialCurrentPage)
  const [totalDocs, setTotalDocs] = useState(initialTotalDocs)
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState(initialQuery || '')

  // Listen for search parameter changes
  useEffect(() => {
    const currentQuery = searchParams.get('q') || ''
    const currentPageParam = parseInt(searchParams.get('page') || '1', 10)

    // Only fetch if query actually changed
    if (currentQuery !== query) {
      setQuery(currentQuery)
      fetchSearchResults(currentQuery, 1)
    }
  }, [searchParams, query])

  const fetchSearchResults = async (searchQuery: string, page: number = 1) => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (searchQuery) params.set('q', searchQuery)
      params.set('page', page.toString())

      const response = await fetch(`/api/search?${params.toString()}`)
      const data = await response.json()

      // Always update the state with the new data, even if it's empty
      setPosts(data.docs || [])
      setHasNextPage(data.hasNextPage || false)
      setCurrentPage(page)
      setTotalDocs(data.totalDocs || 0)
    } catch (error) {
      console.error('Error fetching search results:', error)
      // On error, clear the results
      setPosts([])
      setHasNextPage(false)
      setCurrentPage(1)
      setTotalDocs(0)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Search Header */}
      <div className="container mb-[2.25rem]">
        <div className="text-center">
          <h1 className="text-center font-lato font-normal uppercase tracking-[0.1rem] text-[1.25rem] leading-[1.2] text-black mb-[1.25rem]">
            SEARCH FOR FOOD, HEALTH CONCERN, AND MORE
          </h1>

          <div className="max-w-[560px] mx-auto relative">
            <Search />
          </div>
        </div>
      </div>

      {loading && (
        <div className="container text-center py-8">
          <p className="text-gray-500">Searching...</p>
        </div>
      )}

      <SearchResults
        posts={posts}
        hasNextPage={hasNextPage}
        currentPage={currentPage}
        query={query}
        totalDocs={totalDocs}
      />
    </>
  )
}
