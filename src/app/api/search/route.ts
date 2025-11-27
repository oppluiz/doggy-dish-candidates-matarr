import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q')
  const page = parseInt(searchParams.get('page') || '1', 10)
  const itemsPerPage = 20

  try {
    const payload = await getPayload({ config: configPromise })

    const posts = await payload.find({
      collection: 'search',
      depth: 1,
      limit: itemsPerPage,
      page: page,
      select: {
        title: true,
        slug: true,
        categories: true,
        meta: true,
        doc: true, // Include doc relation to get collection type
        locked: true, // include top-level locked when present in search docs
      },
      ...(query
        ? {
            where: {
              or: [
                {
                  title: {
                    like: query,
                  },
                },
                {
                  'meta.description': {
                    like: query,
                  },
                },
                {
                  'meta.title': {
                    like: query,
                  },
                },
                {
                  slug: {
                    like: query,
                  },
                },
              ],
            },
          }
        : {}),
    })

    // Derive locked from relation when missing; fetch by ID if not populated
    const deriveLockedForFood = async (doc: any): Promise<boolean> => {
      const rel = doc?.doc
      if (!(rel && rel.relationTo === 'food')) return false
      const v = rel.value

      if (v && typeof v === 'object') {
        return !!(v as any).locked
      }

      if (typeof v === 'string' || typeof v === 'number') {
        try {
          const food = await payload.findByID({
            collection: 'food',
            id: v,
            select: { locked: true },
          })
          return !!food?.locked
        } catch {
          return false
        }
      }

      return false
    }

    const docs = await Promise.all(
      posts.docs.map(async (doc: any) => {
        if (typeof doc.locked === 'boolean') return doc
        const locked = await deriveLockedForFood(doc)
        return { ...doc, locked }
      }),
    )

    return NextResponse.json({
      docs,
      hasNextPage: posts.hasNextPage,
      totalDocs: posts.totalDocs,
      page: posts.page,
    })
  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json({ error: 'Failed to fetch search results' }, { status: 500 })
  }
}
