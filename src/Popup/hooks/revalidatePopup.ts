import type { GlobalAfterChangeHook } from 'payload'

export const revalidatePopup: GlobalAfterChangeHook = async ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info('Revalidating popup')

    const { revalidateTag } = await import('next/cache')
    revalidateTag('global_popup')
  }

  return doc
}