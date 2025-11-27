import React from 'react'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { cache } from 'react'
import Link from 'next/link'
import { PageClient } from './page.client'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { Recipe as RecipeType } from '@/payload-types'

type Args = {
  searchParams: Promise<{
    page?: string
  }>
}

export default async function RecipesPage({ searchParams: searchParamsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const searchParams = await searchParamsPromise
  const page = parseInt(searchParams?.page || '1', 10)

  const recipes = await queryRecipes({ page, draft })

  return (
    <div className="pt-[63px] md:pt-[5rem] pb-8 md:pb-[3rem]">
      <PageClient />
      <PayloadRedirects disableNotFound url="/recipes" />

      {/* Breadcrumb */}
      <div className="container mb-[11px] md:mb-[0.875rem] text-black">
        <nav aria-label="breadcrumb" className="text-sm">
          <Link href="/" className="font-lato text-[0.625rem] font-normal">
            Home
          </Link>
          <span className="font-lato text-[0.625rem] font-normal" aria-hidden="true">
            {' '}
            &gt;{' '}
          </span>
          <span className="font-lato text-[0.625rem] underline font-normal">Recipes</span>
        </nav>
      </div>

      {/* Page Header */}
      <div className="container mb-16">
        <div className="text-center">
          <h1 className="text-center font-lato font-normal uppercase tracking-[0.1rem] text-[1.25rem] leading-[1] text-black mb-[1.25rem]">
            RECIPE COLLECTION
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover delicious and healthy recipes for your beloved companion
          </p>
        </div>
      </div>

      {/* Recipes Grid */}
      <div className="container">
        {recipes.docs && recipes.docs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipes.docs.map((recipe) => (
              <Link
                key={recipe.id}
                href={`/recipes/${recipe.slug}`}
                className="group block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                {recipe.image && typeof recipe.image === 'object' && (
                  <div className="aspect-video overflow-hidden rounded-t-lg">
                    <img
                      src={recipe.image.url || ''}
                      alt={recipe.image.alt || recipe.name || ''}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="font-lato font-semibold text-lg text-black mb-2 group-hover:text-green-600 transition-colors">
                    {recipe.name}
                  </h3>
                  {recipe.categories && recipe.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {recipe.categories.slice(0, 3).map((category) => {
                        const cat = typeof category === 'object' ? category : null
                        return cat ? (
                          <span
                            key={cat.id}
                            className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                          >
                            {cat.title}
                          </span>
                        ) : null
                      })}
                    </div>
                  )}
                  {recipe.meta?.description && (
                    <p className="text-gray-600 text-sm line-clamp-3">{recipe.meta.description}</p>
                  )}
                  {recipe.servings && (
                    <div className="mt-3 text-sm text-gray-500">
                      <span className="font-medium">Servings:</span> {recipe.servings}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No recipes found.</p>
          </div>
        )}

        {/* Pagination */}
        {recipes.totalPages && recipes.totalPages > 1 && (
          <div className="flex justify-center mt-12 space-x-2">
            {recipes.hasPrevPage && (
              <Link
                href={`/recipes?page=${recipes.prevPage}`}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
              >
                Previous
              </Link>
            )}

            <span className="px-4 py-2 bg-green-600 text-white rounded">
              {recipes.page} of {recipes.totalPages}
            </span>

            {recipes.hasNextPage && (
              <Link
                href={`/recipes?page=${recipes.nextPage}`}
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

const queryRecipes = cache(
  async ({ page = 1, draft = false }: { page?: number; draft?: boolean }) => {
    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
      collection: 'recipes',
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
    title: 'Recipe Collection | DoggyDish',
    description: 'Discover delicious and healthy recipes for your beloved companion',
  }
}
