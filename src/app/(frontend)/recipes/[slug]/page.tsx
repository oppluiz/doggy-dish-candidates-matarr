import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import Link from 'next/link'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import RichText from '@/components/RichText'
import type { Recipe as RecipeType } from '@/payload-types'
import PageClient from '../../posts/page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const recipes = await payload.find({
    collection: 'recipes',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: { slug: true },
  })

  return recipes.docs.map(({ slug }) => ({ slug }))
}

type Args = {
  params: Promise<{ slug?: string }>
}

export default async function Recipe({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const url = '/recipes/' + slug
  const recipe = await queryRecipeBySlug({ slug })

  if (!recipe) return <PayloadRedirects url={url} />

  const title = recipe?.name ?? 'Recipe'
  const description = recipe?.description
  const layout = (recipe as any)?.layout || []

  return (
    <article className="pt-[63px] md:pt-[5rem] md:pb-[2.625rem] pb-8">
      <PageClient />
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}

      {/* Breadcrumb */}
      {/* <div className="container mb-[11px] md:mb-[0.875rem] text-black">
        <nav aria-label="breadcrumb" className="text-sm">
          <Link href="/" className="font-lato text-[0.625rem] font-normal">
            Home
          </Link>
          <span className="font-lato text-[0.625rem] font-normal" aria-hidden="true">
            {' '}
            &gt;{' '}
          </span>
          <Link href="/recipes" className="font-lato text-[0.625rem] font-normal">
            Recipes
          </Link>
          <span className="font-lato text-[0.625rem] font-normal" aria-hidden="true">
            {' '}
            &gt;{' '}
          </span>
          <span className="font-lato text-[0.625rem] underline font-normal">{title}</span>
        </nav>
      </div> */}

      <RenderBlocks blocks={layout as any} title={title} />

      {/* Description */}
      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="container">
          {description && <RichText className="mx-auto" data={description} enableGutter={false} />}
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const recipe = await queryRecipeBySlug({ slug })
  return {
    title: recipe?.name || 'Recipe',
    description: recipe?.description ? undefined : undefined,
  }
}

const queryRecipeBySlug = cache(async ({ slug }: { slug: string }): Promise<RecipeType | null> => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'recipes',
    depth: 2,
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: { slug: { equals: slug } },
  })

  return (result.docs?.[0] as RecipeType) || null
})
