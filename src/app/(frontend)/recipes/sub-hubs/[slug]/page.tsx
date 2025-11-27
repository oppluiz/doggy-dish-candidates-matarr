import type { Metadata } from 'next'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import config from '@payload-config'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { generateMeta } from '@/utilities/generateMeta'
import { Card } from '@/components/Card'

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function RecipeSubHubPage({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const payload = await getPayload({ config })

  // Get the sub-hub by slug
  const subHubRes = await payload.find({
    collection: 'subHubs',
    where: {
      and: [
        {
          slug: {
            equals: slug,
          },
        },
        {
          collection: {
            equals: 'recipes',
          },
        },
      ],
    },
    limit: 1,
  })

  const subHub = subHubRes.docs?.[0]

  if (!subHub) {
    notFound()
  }

  // Get all recipe items that belong to this sub-hub
  const recipesRes = await payload.find({
    collection: 'recipes',
    where: {
      subHubs: {
        in: [subHub.id],
      },
    },
    depth: 2,
    limit: 50,
  })

  return (
    <div className="py-[3.5rem]">
      <RenderBlocks blocks={subHub.layout} />

      {recipesRes.docs.length > 0 && (
        <div className="container">
          <div className="prose prose-lg mx-auto mb-8">
            <h2>Related Recipes</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recipesRes.docs.map((item) => (
              <Card key={item.id} doc={item} relationTo="recipes" showCategories={false} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const payload = await getPayload({ config })

  const subHubRes = await payload.find({
    collection: 'subHubs',
    where: {
      and: [
        {
          slug: {
            equals: slug,
          },
        },
        {
          collection: {
            equals: 'recipes',
          },
        },
      ],
    },
    limit: 1,
  })

  const subHub = subHubRes.docs?.[0]

  return generateMeta({
    title: subHub?.meta?.title || subHub?.title || 'Recipe Sub-Hub',
    description: subHub?.meta?.description || `Explore ${subHub?.title} recipe resources and items`,
    image: subHub?.meta?.image,
  })
}

export async function generateStaticParams() {
  const payload = await getPayload({ config })

  const subHubs = await payload.find({
    collection: 'subHubs',
    where: {
      collection: {
        equals: 'recipes',
      },
    },
    limit: 100,
    pagination: false,
  })

  return subHubs.docs.map((subHub) => ({
    slug: subHub.slug,
  }))
}
