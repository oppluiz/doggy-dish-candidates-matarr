import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import PageClient from '../../posts/page.client'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { PayloadRedirects } from '@/components/PayloadRedirects'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const res = await payload.find({
    collection: 'howTo',
    depth: 0,
    limit: 1000,
    pagination: false,
    overrideAccess: false,
    select: { slug: true },
  })
  // Only return params when `slug` is a string
  return res.docs
    .filter((doc) => typeof doc.slug === 'string' && doc.slug.length > 0)
    .map((doc) => ({ slug: doc.slug as string }))
}

type Args = {
  params: Promise<{ slug?: string }>
}

export default async function HowToPage({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const url = '/how-to/' + slug

  const doc = await queryHowToBySlug({ slug })
  if (!doc) return <PayloadRedirects url={url} />

  return (
    <article className="pt-[50px] pb-[47px] md:pt-24 md:pb-24">
      <PageClient />
      <PayloadRedirects disableNotFound url={url} />
      <RenderBlocks blocks={(doc as any).layout} />
    </article>
  )
}

const queryHowToBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const res = await payload.find({
    collection: 'howTo',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: { slug: { equals: slug } },
    depth: 2,
  })

  return res.docs?.[0] || null
})

export function generateMetadata(): Metadata {
  return { title: 'How to' }
}
