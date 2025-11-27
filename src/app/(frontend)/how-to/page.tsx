import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from '../posts/page.client'
import { RenderBlocks } from '@/blocks/RenderBlocks'

export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })
  const res = await payload.find({
    collection: 'howTo',
    depth: 2,
    limit: 1,
    pagination: false,
    overrideAccess: false,
  })

  const doc = res.docs?.[0]

  return (
    <article className="pt-24 pb-24">
      <PageClient />
      {doc ? (
        <RenderBlocks blocks={(doc as any).layout} />
      ) : (
        <div className="container">No content yet.</div>
      )}
    </article>
  )
}

export function generateMetadata(): Metadata {
  return { title: 'How to' }
}
