'use client'
import React, { useState, useEffect } from 'react'
import { Media } from '@/components/Media'
import Link from 'next/link'
import { CardPostData } from '@/components/Card'

interface SearchResultsProps {
  posts: CardPostData[]
  hasNextPage: boolean
  currentPage: number
  query?: string
  totalDocs: number
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  posts: initialPosts,
  hasNextPage: initialHasNextPage,
  currentPage: initialCurrentPage,
  query,
  totalDocs,
}) => {
  const [posts, setPosts] = useState(initialPosts)
  const [hasNextPage, setHasNextPage] = useState(initialHasNextPage)
  const [currentPage, setCurrentPage] = useState(initialCurrentPage)
  const [loading, setLoading] = useState(false)

  // Update internal state when props change (new search results)
  useEffect(() => {
    setPosts(initialPosts)
    setHasNextPage(initialHasNextPage)
    setCurrentPage(initialCurrentPage)
  }, [initialPosts, initialHasNextPage, initialCurrentPage, query])

  const loadMore = async () => {
    if (loading || !hasNextPage) return

    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (query) params.set('q', query)
      params.set('page', (currentPage + 1).toString())

      const response = await fetch(`/api/search?${params.toString()}`)
      const data = await response.json()

      if (data.docs) {
        setPosts((prev) => [...prev, ...data.docs])
        setHasNextPage(data.hasNextPage)
        setCurrentPage((prev) => prev + 1)
      }
    } catch (error) {
      console.error('Error loading more results:', error)
    } finally {
      setLoading(false)
    }
  }

  if (posts.length === 0) {
    return (
      <div className="container">
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">No results found.</p>
          {query && (
            <p className="text-gray-400 mt-2">
              Try searching for something else or check your spelling.
            </p>
          )}
        </div>
      </div>
    )
  }

  // Group helpers
  const collectionLabelMap: Record<string, string> = {
    posts: 'Posts',
    food: 'Food',
    health: 'Health',
    howTo: 'How To',
    workshops: 'Workshops',
  }
  const collectionOrder: string[] = ['health', 'howTo', 'food', 'workshops', 'posts']

  const groupedPosts = React.useMemo(() => {
    const groups: Record<string, CardPostData[]> = {}
    for (const post of posts) {
      const collection =
        post &&
        'doc' in post &&
        post.doc &&
        typeof post.doc === 'object' &&
        'relationTo' in post.doc
          ? (post.doc as any).relationTo
          : 'posts'
      if (!groups[collection]) groups[collection] = []
      groups[collection].push(post)
    }
    return groups
  }, [posts])

  const getHrefForPost = (post: CardPostData) => {
    const { slug } = post
    const doc = (post as any).doc
    let href = `/posts/${slug}`
    if (doc && typeof doc === 'object' && 'relationTo' in doc) {
      const collection = (doc as any).relationTo
      switch (collection) {
        case 'posts':
          href = `/posts/${slug}`
          break
        case 'food':
          href = `/food/${slug}`
          break
        case 'health':
          href = `/health/${slug}`
          break
        case 'howTo':
          href = `/how-to/${slug}`
          break
        case 'workshops':
          href = `/workshops/${slug}`
          break
        default:
          href = `/${collection}/${slug}`
      }
    }
    return href
  }

  const isLocked = (post: any) => {
    return !!post?.locked
  }

  return (
    <div className="container">
      {/* Grouped by collection */}
      {collectionOrder.map((key) => {
        const group = groupedPosts[key] || []
        if (group.length === 0) return null

        return (
          <section key={key} className="mb-[2rem]">
            <h2 className="font-lato font-bold text-[1.25rem] mb-[0.75rem] uppercase">
              {collectionLabelMap[key]}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-[0.75rem] md:gap-[1rem]">
              {group.map((post, index) => {
                var href = getHrefForPost(post)
                const { meta, title } = post
                const { image: metaImage } = meta || {}
                const locked = isLocked(post)
                if (locked) {
                  href = '#'
                }

                return (
                  <Link
                    onClick={(e) => {
                      if (locked) {
                        e.preventDefault()
                        window.dispatchEvent(new CustomEvent('dd:show-popup'))
                        return
                      }
                    }}
                    key={`${key}-${post.slug}-${index}`}
                    href={href}
                    className="block group relative"
                  >
                    {locked && (
                      <span className="z-20 p-2 rounded-full material-symbols-outlined text-white text-2xl absolute -top-1 -left-1 bg-[#EE6C4D]">
                        lock
                      </span>
                    )}
                    <article className="bg-[#F4A72F] rounded-[0.875rem] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02] aspect-[4/3] relative">
                      {locked && (
                        <div className="absolute z-10 top-0 right-0 bg-black/40 w-full h-full rounded-[0.875rem]"></div>
                      )}
                      {metaImage && typeof metaImage !== 'string' ? (
                        <div className="w-full h-full">
                          <Media
                            resource={metaImage}
                            className="w-full h-full object-cover"
                            imgClassName="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-full bg-[#F4A72F] flex items-center justify-center">
                          <div className="w-16 h-16 bg-black/10 rounded-full flex items-center justify-center">
                            <span className="material-symbols-outlined text-white text-2xl">
                              restaurant
                            </span>
                          </div>
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                        <h3 className="text-white font-lato font-semibold text-sm leading-tight line-clamp-2">
                          {title || 'Untitled'}
                        </h3>
                      </div>
                    </article>
                  </Link>
                )
              })}
            </div>
          </section>
        )
      })}

      {/* Load More Button */}
      {hasNextPage && (
        <div className="text-center">
          <button
            onClick={loadMore}
            disabled={loading}
            className="disabled:opacity-50 disabled:cursor-not-allowed text-black font-lato font-normal text-[1rem] transition-colors duration-300 uppercase tracking-[0.07rem]"
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}

      {/* Results count */}
      <div className="text-center mt-[1.5rem] text-gray-500 text-[0.875rem]">
        Showing {posts.length} of {totalDocs} results
        {query && (
          <span className="ml-1">
            for "<span className="font-semibold">{query}</span>"
          </span>
        )}
      </div>
    </div>
  )
}
