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

export default async function HealthArticlePage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '', item_slug = '' } = await paramsPromise
  const url = `/health/${slug}/${item_slug}`

  // First verify the sub-hub exists
  const subHub = await querySubHubBySlug({ slug })
  if (!subHub) {
    return <PayloadRedirects url={url} />
  }

  // Then get the health article
  const healthDoc = await queryHealthBySlug({ slug: item_slug })
  if (!healthDoc) {
    return <PayloadRedirects url={url} />
  }

  // Verify the health article belongs to this sub-hub
  const belongsToSubHub = healthDoc.subHubs?.some((subHubRef: any) => {
    const subHubId = typeof subHubRef === 'string' ? subHubRef : subHubRef?.id
    return subHubId === subHub.id
  })

  if (!belongsToSubHub) {
    return <PayloadRedirects url={url} />
  }

  return (
    <article className="pt-24 pb-[22px] md:pb-[3.75rem] md:pt-[4.5rem]">
      <PageClient />
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}

      <RenderBlocks blocks={healthDoc.layout as any} title={healthDoc.title} />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '', item_slug = '' } = await paramsPromise

  const subHub = await querySubHubBySlug({ slug })
  const healthDoc = await queryHealthBySlug({ slug: item_slug })

  if (!subHub || !healthDoc) {
    return { title: 'Health' }
  }

  return {
    title: healthDoc.title || 'Health Article',
    description:
      healthDoc.meta?.description || `${healthDoc.title} - ${subHub.title} health information`,
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
            equals: 'health',
          },
        },
      ],
    },
  })

  return result.docs?.[0] || null
})

const queryHealthBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const res = await payload.find({
    collection: 'health',
    depth: 2,
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: { slug: { equals: slug } },
  })

  return res.docs?.[0] || null
})
