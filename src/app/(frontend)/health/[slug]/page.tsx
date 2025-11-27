import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import Link from 'next/link'
import PageClient from '../../posts/page.client'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Card } from '@/components/Card'

type Args = {
  params: Promise<{ slug?: string }>
}

export const revalidate = 600

export default async function HealthPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const url = '/health/' + slug

  // First try to find a sub-hub (priority for nested structure)
  const subHub = await querySubHubBySlug({ slug })

  if (subHub) {
    return (
      <div className="py-[3.5rem]">
        <RenderBlocks blocks={subHub.layout} />
        <SubHubHealthArticles subHubId={subHub.id} subHubSlug={slug} />
      </div>
    )
  }

  // If no sub-hub found, try to find a health article
  const healthDoc = await queryHealthBySlug({ slug })

  if (healthDoc) {
    return (
      <article className="pt-24 pb-[22px] md:pb-[3.75rem] md:pt-[4.5rem]">
        <PageClient />
        <PayloadRedirects disableNotFound url={url} />
        {draft && <LivePreviewListener />}

        <RenderBlocks blocks={healthDoc.layout} title={healthDoc.title} />
      </article>
    )
  }

  // If neither found, show 404
  return <PayloadRedirects url={url} />
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise

  // First try sub-hub
  const subHub = await querySubHubBySlug({ slug })
  if (subHub) {
    return {
      title: subHub.meta?.title || subHub.title || 'Health Sub-Hub',
      description:
        subHub.meta?.description || `Explore ${subHub.title} health resources and articles`,
    }
  }

  // Then try health article
  const healthDoc = await queryHealthBySlug({ slug })
  if (healthDoc) {
    return { title: healthDoc.title || 'Health' }
  }

  return { title: 'Health' }
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

// Component to show health articles related to a sub-hub
async function SubHubHealthArticles({
  subHubId,
  subHubSlug,
}: {
  subHubId: string
  subHubSlug: string
}) {
  const payload = await getPayload({ config: configPromise })

  const healthRes = await payload.find({
    collection: 'health',
    where: {
      subHubs: {
        in: [subHubId],
      },
      _status: {
        equals: 'published',
      },
    },
    depth: 2,
    limit: 50,
  })

  if (healthRes.docs.length === 0) return null

  return (
    <></>
    // <div className="container">
    //   <div className="prose prose-lg mx-auto mb-8">
    //     <h2>Related Health Articles</h2>
    //   </div>
    //   <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
    //     {healthRes.docs.map((article) => (
    //       <Card
    //         key={article.id}
    //         doc={article}
    //         relationTo="health"
    //         showCategories={false}
    //         // Override the href to use nested structure
    //         href={`/health/${subHubSlug}/${article.slug}`}
    //       />
    //     ))}
    //   </div>
    // </div>
  )
}
