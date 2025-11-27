import React from 'react'
import { getCachedGlobal } from '@/utilities/getGlobals'
import PopupClient from './Client'

type Props = {
  shouldShow?: boolean
}

export default async function PopupServer({ shouldShow = false }: Props) {
  let popup: any = null
  try {
    const getPopup = getCachedGlobal('popup', 0)
    popup = await getPopup()
  } catch (e) {
    // If the popup global tables do not exist yet, fail silently
    return null
  }

  if (!popup?.enabled) return null

  // Mount the client so it can also listen for events; control initial open by prop
  return <PopupClient settings={popup} initialOpen={Boolean(shouldShow)} />
}
