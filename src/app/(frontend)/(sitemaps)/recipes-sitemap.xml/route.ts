import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function GET() {
  const payload = await getPayload({ config: configPromise })

  const recipes = await payload.find({
    collection: 'recipes',
    depth: 0,
    limit: 1000,
    overrideAccess: false,
    select: {
      slug: true,
      updatedAt: true,
    },
    where: {
      _status: {
        equals: 'published',
      },
    },
  })

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${recipes.docs
  .map((recipe) => {
    return `  <url>
    <loc>${process.env.NEXT_PUBLIC_SERVER_URL}/recipes/${recipe.slug}</loc>
    <lastmod>${recipe.updatedAt}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
  })
  .join('\n')}
</urlset>`

  return new Response(sitemap, {
    status: 200,
    headers: {
      'Cache-control': 'public, s-maxage=86400, stale-while-revalidate',
      'content-type': 'application/xml',
    },
  })
}