import React from 'react'
import Link from 'next/link'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Media, Post } from '@/payload-types'
import { Card } from '@/components/Card'
import { Media as MediaComponent } from '@/components/Media'
import { OnboardingProgress } from './Progress.client'

export const OnboardingChecklistBlock: React.FC<{
  id?: string
  heading?: string | null
  populateBy?: 'recent' | 'manual' | null
  items?: Array<{
    reference?: {
      relationTo?: 'posts'
      value?: any
    } | null
  }> | null
  usePlaceholders?: boolean | null
  placeholderText?: string | null
  placeholderImage?: Media | string | null
}> = async (props) => {
  const {
    id,
    heading = 'ONBOARDING CHECKLIST',
    populateBy = 'recent',
    items = [],
    usePlaceholders = false,
    placeholderText = 'Recipe Title Here',
    placeholderImage,
  } = props

  let posts: Post[] = []

  if (!usePlaceholders) {
    if (populateBy === 'recent') {
      const payload = await getPayload({ config: configPromise })
      const results = await payload.find({
        collection: 'posts',
        depth: 1,
        limit: 2,
        overrideAccess: false,
        sort: '-updatedAt',
      })
      posts = results.docs as Post[]
    } else {
      posts = (items || [])
        .map((i) => (typeof i?.reference?.value === 'object' ? (i.reference!.value as Post) : null))
        .filter(Boolean) as Post[]
      posts = posts.slice(0, 2)
    }
  }

  return (
    <section className="container mb-[2.375rem]" id={id ? `block-${id}` : undefined}>
      {/* Heading bar */}
      <div className="rounded-[1.5rem] overflow-hidden shadow-[0px_8px_20px_0px_rgba(0,0,0,0.1)] bg-[#FFFFF8]">
        <div className="text-center md:text-left bg-[#E86D50] text-white tracking-[0.1rem] py-[0.75rem] md:py-[1.125rem] px-[1.75rem] md:px-[2rem] text-[1.25rem] md:text-[1.25rem] font-bold font-lato">
          {heading}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[4.375rem] py-[2rem] px-[1.5rem] md:p-[2.25rem]">
          {/* Left: Progress checklist */}
          <div className="lg:col-span-1">
            <OnboardingProgress />
          </div>

          {/* Right: Two recipe cards */}
          <div className="hidden lg:col-span-2 md:grid grid-cols-1 md:grid-cols-2 gap-[3rem]">
            {usePlaceholders ? (
              <>
                <article className="">
                  <div className="relative w-full rounded-[0.875rem] overflow-hidden">
                    {placeholderImage && typeof placeholderImage !== 'string' && (
                      <MediaComponent
                        resource={placeholderImage}
                        size="33vw"
                        className="w-[16.25rem]"
                        pictureClassName="w-[16.25rem]"
                        imgClassName="w-[16.25rem] object-cover"
                      />
                    )}
                  </div>
                  <div className="p-[0.75rem] pb-0">
                    <div className="prose">
                      <h3 className="text-[0.875rem] font-lato font-bold">{placeholderText}</h3>
                    </div>
                  </div>
                </article>
                <article className="">
                  <div className="relative w-full rounded-[0.875rem] overflow-hidden">
                    {placeholderImage && typeof placeholderImage !== 'string' && (
                      <MediaComponent
                        resource={placeholderImage}
                        size="33vw"
                        className="w-[16.25rem]"
                        pictureClassName="w-[16.25rem]"
                        imgClassName="w-[16.25rem] object-cover"
                      />
                    )}
                  </div>
                  <div className="p-[0.75rem] pb-0">
                    <div className="prose">
                      <h3 className="text-[0.875rem] font-lato font-bold">{placeholderText}</h3>
                    </div>
                  </div>
                </article>
              </>
            ) : posts && posts.length > 0 ? (
              posts.slice(0, 2).map((p, i) => <Card key={i} doc={p} relationTo="posts" />)
            ) : (
              <>
                <div className="border border-dashed rounded-lg p-6 text-center text-neutral-500">
                  No recipes found.
                </div>
                <div className="border border-dashed rounded-lg p-6 text-center text-neutral-500">
                  No recipes found.
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
