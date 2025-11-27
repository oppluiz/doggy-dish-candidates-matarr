import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import PageClient from '../../../posts/page.client'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { LivePreviewListener } from '@/components/LivePreviewListener'

type Args = {
  params: Promise<{
    slug?: string
    item_slug?: string
  }>
}

export const revalidate = 600

export default async function RecipeArticlePage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '', item_slug = '' } = await paramsPromise
  const url = `/recipes/${slug}/${item_slug}`

  // First verify the sub-hub exists
  const subHub = await querySubHubBySlug({ slug })
  if (!subHub) {
    return <PayloadRedirects url={url} />
  }

  // Then get the recipe
  const recipeDoc = await queryRecipeBySlug({ slug: item_slug })
  if (!recipeDoc) {
    return <PayloadRedirects url={url} />
  }

  // Verify the recipe belongs to this sub-hub
  const belongsToSubHub = recipeDoc.subHubs?.some((subHubRef: any) => {
    const subHubId = typeof subHubRef === 'string' ? subHubRef : subHubRef?.id
    return subHubId === subHub.id
  })

  if (!belongsToSubHub) {
    return <PayloadRedirects url={url} />
  }

  return (
    <article className="pt-24 pb-[22px] md:pb-24">
      <PageClient />
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}

      {/* Breadcrumb */}
      <div className="container mb-[0.875rem] text-black">
        <nav aria-label="breadcrumb" className="text-sm">
          <Link href="/" className="font-lato text-[0.625rem] font-normal">
            Home
          </Link>
          <span className="font-lato" aria-hidden="true">
            {' '}
            &gt;{' '}
          </span>
          <Link href="/recipes" className="font-lato text-[0.625rem] font-normal">
            Recipes
          </Link>
          <span className="font-lato" aria-hidden="true">
            {' '}
            &gt;{' '}
          </span>
          <Link href={`/recipes/${slug}`} className="font-lato text-[0.625rem] font-normal">
            {subHub.title}
          </Link>
          <span className="font-lato" aria-hidden="true">
            {' '}
            &gt;{' '}
          </span>
          <span className="font-lato text-[0.625rem] underline font-normal">
            {recipeDoc.name || item_slug}
          </span>
        </nav>
      </div>

      <RenderBlocks blocks={recipeDoc.layout} title={recipeDoc.name} />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '', item_slug = '' } = await paramsPromise

  const subHub = await querySubHubBySlug({ slug })
  const recipeDoc = await queryRecipeBySlug({ slug: item_slug })

  if (!subHub || !recipeDoc) {
    return { title: 'Recipe' }
  }

  return {
    title: recipeDoc.name || 'Recipe',
    description: recipeDoc.meta?.description || `${recipeDoc.name} - ${subHub.title} recipe`,
  }
}

const querySubHubBySlug = cache(async ({ slug }: { slug: string }) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'subHubs',
    limit: 1,
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
  })

  return result.docs?.[0] || null
})

const queryRecipeBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const res = await payload.find({
    collection: 'recipes',
    depth: 2,
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: { slug: { equals: slug } },
  })

  return res.docs?.[0] || null
})
