import type { ToggledCollections as ToggledCollectionsProps } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { ToggledCollectionsClient } from './ComponentClient'

export const ToggledCollectionsBlock: React.FC<
  ToggledCollectionsProps & {
    id?: string
  }
> = async (props) => {
  const { collections } = props

  if (!collections || collections.length === 0) return null

  const payload = await getPayload({ config: configPromise })

  // Fetch data for all selected collections
  const collectionsData = await Promise.all(
    collections.map(async (collectionConfig) => {
      const collectionSlug = collectionConfig.collection
      const limit = collectionConfig.itemCount || 8
      const fillContent = collectionConfig.fillContent || false

      try {
        const result = await payload.find({
          collection: collectionSlug as any,
          depth: 1,
          limit,
          where: {
            _status: {
              equals: 'published',
            },
          },
        })

        let items = result.docs || []

        // Fill content if enabled and we have fewer items than requested
        if (fillContent && items.length > 0 && items.length < limit) {
          const duplicatesNeeded = limit - items.length
          const duplicates = []

          for (let i = 0; i < duplicatesNeeded; i++) {
            duplicates.push(items[i % items.length])
          }

          items = [...items, ...duplicates]
        }

        // Create display name based on collection slug
        const displayName =
          collectionSlug === 'food'
            ? 'Food'
            : collectionSlug === 'health'
              ? 'Health'
              : collectionSlug === 'howTo'
                ? 'How To'
                : collectionSlug

        return {
          slug: collectionSlug,
          displayName,
          items,
        }
      } catch (error) {
        console.error(`Error fetching ${collectionSlug}:`, error)

        const displayName =
          collectionSlug === 'food'
            ? 'Food'
            : collectionSlug === 'health'
              ? 'Health'
              : collectionSlug === 'howTo'
                ? 'How To'
                : collectionSlug

        return {
          slug: collectionSlug,
          displayName,
          items: [],
        }
      }
    }),
  )

  return <ToggledCollectionsClient collectionsData={collectionsData} />
}
