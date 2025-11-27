import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import PageClient from '../../posts/page.client'
import type { Page, Workshop as WorkshopType } from '@/payload-types'
import Link from 'next/link'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const workshops = await payload.find({
    collection: 'workshops',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: { slug: true },
  })

  return workshops.docs.map(({ slug }) => ({ slug }))
}

type Args = {
  params: Promise<{ slug?: string }>
}

export default async function Workshop({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const url = '/workshops/' + slug
  const workshop = await queryWorkshopBySlug({ slug })

  if (!workshop) return <PayloadRedirects url={url} />

  const w = workshop
  const title = w?.title ?? 'Workshop'
  const content = w?.content
  const layout = (w as any)?.layout || []

  return (
    <article className="pt-[50px] md:pt-[4rem] pb-16 md:pb-[3.25rem]">
      <PageClient />
      <LivePreviewListener />
      <PayloadRedirects disableNotFound url={url} />
      {/* Blocks (VideoHero) */}
      <RenderBlocks blocks={layout as any} title={title} />
      <div className="flex flex-col items-center gap-4 max-w-[90rem] mx-auto">
        <RichText className="mx-auto" data={content} enableGutter={false} />
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const workshop = await queryWorkshopBySlug({ slug })

  return {
    title: workshop?.title || 'Workshop',
    description: workshop?.meta?.description || undefined,
  }
}

const queryWorkshopBySlug = cache(
  async ({ slug }: { slug: string }): Promise<WorkshopType | null> => {
    const { isEnabled: draft } = await draftMode()
    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
      collection: 'workshops',
      draft,
      limit: 1,
      overrideAccess: draft,
      pagination: false,
      where: { slug: { equals: slug } },
    })

    return (result.docs?.[0] as WorkshopType) || null
  },
)
