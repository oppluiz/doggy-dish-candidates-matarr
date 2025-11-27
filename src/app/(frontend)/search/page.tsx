import type { Metadata } from 'next/types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { SearchPageClient } from './page.client'

type Args = {
  searchParams: Promise<{
    q: string
    page?: string
  }>
}
export default async function Page({ searchParams: searchParamsPromise }: Args) {
  const { q: query, page = '1' } = await searchParamsPromise
  const currentPage = parseInt(page, 10)
  const itemsPerPage = 20 // 5x4 grid
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'search',
    depth: 2,
    limit: itemsPerPage,
    page: currentPage,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      locked: true,
      doc: true, // Include doc relation to get collection type
    },
    ...(query
      ? {
          where: {
            or: [
              {
                title: {
                  like: query,
                },
              },
              {
                'meta.description': {
                  like: query,
                },
              },
              {
                'meta.title': {
                  like: query,
                },
              },
              {
                slug: {
                  like: query,
                },
              },
            ],
          },
        }
      : {}),
  })

  return (
    <div className="pt-[3.75rem] pb-[2.75rem] md:py-[3.75rem]">
      <SearchPageClient
        initialPosts={posts.docs}
        initialHasNextPage={posts.hasNextPage}
        initialCurrentPage={currentPage}
        initialQuery={query}
        initialTotalDocs={posts.totalDocs}
      />
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `DoggyDish Search`,
  }
}
