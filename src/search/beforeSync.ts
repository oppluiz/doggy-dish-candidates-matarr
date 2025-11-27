import type { BeforeSync } from '@payloadcms/plugin-search/types'

export const beforeSyncWithSearch: BeforeSync = async ({ req, originalDoc, searchDoc }) => {
  const {
    doc: { relationTo: collection },
  } = searchDoc

  // Handle different field names across collections
  const getTitle = (doc: any) => {
    return doc.title || doc.name || 'Untitled'
  }

  const { slug, id, categories, meta } = originalDoc
  const title = getTitle(originalDoc)

  const lockedFlag = (originalDoc as any)?.locked

  const modifiedDoc = {
    ...searchDoc,
    title,
    slug: (originalDoc as any)?.slug,
    doc: searchDoc.doc,
    locked: lockedFlag, // persist for search docs
    meta: {
      ...(originalDoc as any)?.meta,
      title: (originalDoc as any)?.meta?.title || title,
      image: (originalDoc as any)?.meta?.image?.id || (originalDoc as any)?.meta?.image,
      description: (originalDoc as any)?.meta?.description,
    },
    categories: [], // keep your existing categories population logic if any
  }

  if (categories && Array.isArray(categories) && categories.length > 0) {
    const populatedCategories: { id: string | number; title: string }[] = []
    for (const category of categories) {
      if (!category) {
        continue
      }

      if (typeof category === 'object') {
        populatedCategories.push(category)
        continue
      }

      const doc = await req.payload.findByID({
        collection: 'categories',
        id: category,
        disableErrors: true,
        depth: 0,
        select: { title: true },
        req,
      })

      if (doc !== null) {
        populatedCategories.push(doc)
      } else {
        console.error(
          `Failed. Category not found when syncing collection '${collection}' with id: '${id}' to search.`,
        )
      }
    }

    modifiedDoc.categories = populatedCategories.map((each) => ({
      relationTo: 'categories',
      categoryID: String(each.id),
      title: each.title,
    }))
  }

  return modifiedDoc
}
