import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

export const revalidateWorkshop: CollectionAfterChangeHook = async ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    const { revalidatePath, revalidateTag } = await import('next/cache')
    if (doc._status === 'published') {
      const path = `/workshops/${doc.slug}`
      payload.logger.info(`Revalidating workshop at path: ${path}`)
      revalidatePath(path)
      revalidateTag('workshops-sitemap')
    }
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const oldPath = `/workshops/${previousDoc.slug}`
      payload.logger.info(`Revalidating old workshop at path: ${oldPath}`)
      revalidatePath(oldPath)
      revalidateTag('workshops-sitemap')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook = async ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const { revalidatePath, revalidateTag } = await import('next/cache')

    const path = `/workshops/${doc?.slug}`
    revalidatePath(path)
    revalidateTag('workshops-sitemap')
  }
  return doc
}
