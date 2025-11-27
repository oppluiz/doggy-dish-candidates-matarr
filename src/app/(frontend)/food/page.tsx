import React from 'react'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { cache } from 'react'
import Link from 'next/link'
import { PageClient } from './page.client'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { Food as FoodType } from '@/payload-types'

type Args = {
  searchParams: Promise<{
    page?: string
  }>
}

export default async function FoodPage({ searchParams: searchParamsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const searchParams = await searchParamsPromise
  const page = parseInt(searchParams?.page || '1', 10)

  const foods = await queryFoods({ page, draft })

  return (
    <div className="pt-[63px] md:pt-[4.5rem] pb-8 md:pb-[3.75rem]">
      <PageClient />
      <PayloadRedirects disableNotFound url="/food" />

      {/* Page Header */}
      <div className="container mb-16">
        <div className="text-center">
          <h1 className="text-center font-lato font-normal uppercase tracking-[0.1rem] text-[1.25rem] leading-[1] text-black mb-[1.25rem]">
            FOOD GUIDE
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover nutritious and delicious food options for your furry friend
          </p>
        </div>
      </div>

      {/* Food Grid */}
      <div className="container">
        {foods.docs && foods.docs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {foods.docs.map((food) => (
              <Link
                key={food.id}
                href={`/food/${food.slug}`}
                className="group block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                {food.image && typeof food.image === 'object' && (
                  <div className="aspect-video overflow-hidden rounded-t-lg">
                    <img
                      src={food.image.url || ''}
                      alt={food.image.alt || food.name || ''}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="font-lato font-semibold text-lg text-black mb-2 group-hover:text-green-600 transition-colors">
                    {food.name}
                  </h3>
                  {food.categories && food.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {food.categories.map((category) => (
                        <span
                          key={typeof category === 'object' ? category.id : category}
                          className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                        >
                          {typeof category === 'object' ? category.title : category}
                        </span>
                      ))}
                    </div>
                  )}
                  {food.meta?.description && (
                    <p className="text-gray-600 text-sm line-clamp-3">{food.meta.description}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No food items found.</p>
          </div>
        )}

        {/* Pagination */}
        {foods.totalPages && foods.totalPages > 1 && (
          <div className="flex justify-center mt-12 space-x-2">
            {foods.hasPrevPage && (
              <Link
                href={`/food?page=${foods.prevPage}`}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
              >
                Previous
              </Link>
            )}

            <span className="px-4 py-2 bg-green-600 text-white rounded">
              {foods.page} of {foods.totalPages}
            </span>

            {foods.hasNextPage && (
              <Link
                href={`/food?page=${foods.nextPage}`}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
              >
                Next
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

const queryFoods = cache(
  async ({ page = 1, draft = false }: { page?: number; draft?: boolean }) => {
    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
      collection: 'food',
      depth: 2,
      draft,
      limit: 12,
      page,
      overrideAccess: draft,
      where: {
        _status: {
          equals: 'published',
        },
      },
      sort: '-createdAt',
    })

    return result
  },
)

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Food Guide | DoggyDish',
    description: 'Discover nutritious and delicious food options for your furry friend',
  }
}
