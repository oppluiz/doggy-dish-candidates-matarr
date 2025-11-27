import { notFound } from 'next/navigation'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { getServerSideURL } from '@/utilities/getURL'
import Link from 'next/link'

type HubDoc = {
  id: string
  title: string
  slug: string
  layout?: any[]
  subHubs?: Array<{
    id: string
    title: string
    slug: string
    collection?: 'health' | 'food' | 'howTo' | 'recipes'
  }>
}

const getCollectionPath = (collectionSlug?: string) => {
  switch (collectionSlug) {
    case 'health':
      return '/health'
    case 'food':
      return '/food'
    case 'howTo':
      return '/how-to'
    case 'recipes':
      return '/recipes'
    default:
      return ''
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const baseURL = getServerSideURL() || ''
  const res = await fetch(
    `${baseURL}/api/hubs?where[slug][equals]=${encodeURIComponent(params.slug)}&depth=4`,
    { next: { revalidate: 60 } },
  )
  const data = await res.json()
  const hub: HubDoc | undefined = data?.docs?.[0]

  if (!hub) {
    notFound()
  }

  return (
    <>
      {Array.isArray(hub.layout) && hub.layout.length > 0 ? (
        <div className="mb-[1.5rem]">
          <RenderBlocks blocks={hub.layout} />
        </div>
      ) : (
        <header className="mb-[1.5rem]">
          <h1 className="font-lato font-bold text-[1.75rem] md:text-[2rem]">{hub.title}</h1>
        </header>
      )}

      {/* {Array.isArray(hub.subHubs) && hub.subHubs.length > 0 && (
        <section className="mt-[1.5rem]">
          <h2 className="font-lato font-bold text-[1.25rem] mb-[0.75rem]">Sub Hubs</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-[0.75rem] md:gap-[1rem]">
            {hub.subHubs.map((sub) => {
              const base = getCollectionPath(sub.collection)
              const href = base ? `${base}/sub-hubs/${sub.slug}` : `/sub-hubs/${sub.slug}`
              return (
                <Link key={sub.id} href={href} className="block group">
                  <article className="bg-white border border-black/10 rounded-[0.875rem] p-4 shadow-sm hover:shadow-md transition">
                    <h3 className="font-lato font-semibold text-[1rem]">{sub.title}</h3>
                    {sub.collection && (
                      <p className="text-black/40 text-[0.875rem] mt-[0.25rem]">
                        {sub.collection.toUpperCase()}
                      </p>
                    )}
                  </article>
                </Link>
              )
            })}
          </div>
        </section>
      )} */}
    </>
  )
}
