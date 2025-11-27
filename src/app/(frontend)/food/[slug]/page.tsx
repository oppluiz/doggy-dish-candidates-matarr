import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import Link from 'next/link'
import { PopupServer } from '@/components/Popup'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import RichText from '@/components/RichText'
import type { Food as FoodType } from '@/payload-types'
import PageClient from '../../posts/page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const food = await payload.find({
    collection: 'food',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: { slug: true },
  })

  const params = food.docs
    .map(({ slug }) => {
      // Use valid string slugs directly
      if (typeof slug === 'string' && slug.length > 0) return { slug }
      // Normalize non-string slugs (object/number) to string, otherwise skip
      const normalized =
        typeof slug === 'object' && slug !== null && 'slug' in (slug as any)
          ? String((slug as any).slug)
          : typeof slug === 'number'
            ? String(slug)
            : null
      return normalized ? { slug: normalized } : null
    })
    .filter((p): p is { slug: string } => !!p)

  return params
}

type Args = {
  params: Promise<{ slug?: string }>
}

export default async function Food({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const url = '/food/' + slug
  const food = await queryFoodBySlug({ slug })

  if (!food) return <PayloadRedirects url={url} />

  const title = food?.name ?? 'Food'
  const description = food?.description
  const layout = (food as any)?.layout || []

  return (
    <article className="pt-[63px] md:pt-[4.5rem] pb-8 md:pb-[3.75rem]">
      <PageClient />
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}

      {/* Popup for locked content, server-gated */}
      <PopupServer shouldShow={!!(food as any)?.locked} />

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
  const food = await queryFoodBySlug({ slug })
  return {
    title: food?.name || 'Food',
    description: food?.description ? undefined : undefined,
  }
}

const queryFoodBySlug = cache(async ({ slug }: { slug: string }): Promise<FoodType | null> => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'food',
    depth: 2,
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: { slug: { equals: slug } },
  })

  return (result.docs?.[0] as FoodType) || null
})
