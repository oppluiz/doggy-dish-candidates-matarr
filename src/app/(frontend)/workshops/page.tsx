import type { Metadata } from 'next/types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { Card } from '@/components/Card'
import PageClient from '../posts/page.client' // reuse light header client

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const workshops = await payload.find({
    collection: 'workshops',
    depth: 4,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
  })

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Workshops</h1>
        </div>
      </div>

      <div className="container">
        <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
          {workshops.docs?.map((doc, i) => (
            <div className="col-span-4" key={i}>
              <Card className="h-full" doc={doc} relationTo="workshops" showCategories />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Doggy Dish Workshops`,
  }
}
