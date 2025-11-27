import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { RecentWorkshopsBlock as RecentWorkshopsBlockProps } from '@/payload-types'
import { RecentWorkshopsClient } from './ComponentClient'

type Props = RecentWorkshopsBlockProps & {
  className?: string
}

export const RecentWorkshopsBlock: React.FC<Props> = async ({ heading, repeat, className }) => {
  const payload = await getPayload({ config: configPromise })

  try {
    // Fetch the 3 most recent workshops
    const workshopsResult = await payload.find({
      collection: 'workshops',
      limit: 3,
      sort: '-createdAt',
      where: {
        _status: {
          equals: 'published',
        },
      },
    })

    let workshops = workshopsResult.docs || []

    // If repeat is enabled and we have fewer than 3 workshops, repeat them to fill 3 slots
    if (repeat && workshops.length > 0 && workshops.length < 3) {
      const originalWorkshops = [...workshops]
      while (workshops.length < 3) {
        workshops = [...workshops, ...originalWorkshops.slice(0, 3 - workshops.length)]
      }
    }

    return (
      <RecentWorkshopsClient
        heading={heading}
        workshops={workshops}
        className={className}
      />
    )
  } catch (error) {
    console.error('Error fetching recent workshops:', error)
    return null
  }
}