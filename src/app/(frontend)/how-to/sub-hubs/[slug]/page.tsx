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

export default async function HowToSubHubPage({ params: paramsPromise }: Args) {
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
            equals: 'howTo',
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

  // Get all how-to articles that belong to this sub-hub
  const howToRes = await payload.find({
    collection: 'howTo',
    where: {
      subHubs: {
        in: [subHub.id],
      },
      _status: {
        equals: 'published',
      },
    },
    depth: 2,
    limit: 50,
  })

  return (
    <div className="py-[3.5rem]">
      <RenderBlocks blocks={subHub.layout} />

      {howToRes.docs.length > 0 && (
        <div className="container">
          <div className="prose prose-lg mx-auto mb-8">
            <h2>Related How-To Guides</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {howToRes.docs.map((guide) => (
              <Card key={guide.id} doc={guide} relationTo="howTo" showCategories={false} />
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
            equals: 'howTo',
          },
        },
      ],
    },
    limit: 1,
  })

  const subHub = subHubRes.docs?.[0]

  return generateMeta({
    title: subHub?.meta?.title || subHub?.title || 'How-To Sub-Hub',
    description:
      subHub?.meta?.description || `Explore ${subHub?.title} how-to guides and tutorials`,
    image: subHub?.meta?.image,
  })
}

export async function generateStaticParams() {
  const payload = await getPayload({ config })

  const subHubs = await payload.find({
    collection: 'subHubs',
    where: {
      collection: {
        equals: 'howTo',
      },
    },
    limit: 100,
    pagination: false,
  })

  return subHubs.docs.map((subHub) => ({
    slug: subHub.slug,
  }))
}
