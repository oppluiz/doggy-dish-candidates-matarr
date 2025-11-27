'use client'

import React, { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'

type Task = {
  key: string
  title: string
  description: string
  iconDone?: string
  iconTodo?: string
  href?: string
  onClick?: () => void
}

export const OnboardingProgress: React.FC = () => {
  const [flags, setFlags] = useState({
    dd_profileUpdated: false,
    dd_searchPerformed: false,
    dd_visitedRecipe: false,
  })

  useEffect(() => {
    const read = () => {
      setFlags({
        dd_profileUpdated: localStorage.getItem('dd_profileUpdated') === 'true',
        dd_searchPerformed: localStorage.getItem('dd_searchPerformed') === 'true',
        dd_visitedRecipe: localStorage.getItem('dd_visitedRecipe') === 'true',
      })
    }
    read()
    const i = setInterval(read, 1000)
    return () => clearInterval(i)
  }, [])

  const tasks: Task[] = [
    {
      key: 'dd_profileUpdated',
      title: 'Update your profile',
      description: 'Subtext about trying your first recipe here.',
      iconDone: 'check',
      iconTodo: 'radio_button_unchecked',
      href: '/admin/account',
      onClick: () => {
        try {
          localStorage.setItem('dd_profileUpdated', 'true')
        } catch {}
      },
    },
    {
      key: 'dd_searchPerformed',
      title: 'Search the platform',
      description: 'Subtext about trying your first recipe here.',
      iconDone: 'check',
      iconTodo: 'radio_button_unchecked',
      href: '/search',
    },
    {
      key: 'dd_visitedRecipe',
      title: 'Try your first tip',
      description: 'Subtext about trying your first recipe here.',
      iconDone: 'check',
      iconTodo: 'radio_button_unchecked',
      href: '/posts',
    },
  ]

  const completeCount = useMemo(
    () => tasks.reduce((acc, t) => acc + (flags[t.key as keyof typeof flags] ? 1 : 0), 0),
    [flags, tasks],
  )

  const percent = Math.round((completeCount / tasks.length) * 100)

  return (
    <div className="space-y-[1.25rem]">
      {/* Progress bar */}
      <div className="mx-auto md:mx-0 w-full max-w-[14.25rem] md:max-w-[12.5rem] mb-[2.375rem] md:mb-[1.25rem] relative">
        <div
          className="h-[2.25rem] md:h-[1.625rem] 
          bg-[#FFFFF8] 
          border-[0.125rem] border-solid border-[#D1E59F] rounded-full 
          overflow-hidden 
          flex items-center"
        >
          <div
            className="h-full bg-[#D1E59F] transition-all"
            style={{ width: `${percent}%` }}
            aria-label={`Progress ${percent}%`}
          />
          <div className="font-lato font-normal text-[0.875rem] tracking-[0.061rem] absolute top-1/2 -translate-y-1/2 left-[1rem]">
            {percent}%
          </div>
        </div>
      </div>

      {/* Tasks */}
      <ul className="space-y-[1.25rem]">
        {tasks.map((t) => {
          const done = flags[t.key as keyof typeof flags]
          return (
            <li key={t.key} className="flex items-start gap-[0.5rem] md:gap-[1.25rem]">
              <div
                className={`h-[2.25rem] w-[2.25rem] flex items-center justify-center rounded-full ${
                  done ? 'bg-[#D1E59F]' : 'border-[1px] border-solid border-[#D1E59F]'
                }`}
              >
                <span
                  className={`material-symbols-outlined !text-[2.25rem] ${
                    done ? ' text-white ' : 'text-neutral-300'
                  }`}
                  aria-hidden="true"
                >
                  {done ? t.iconDone : ''}
                </span>
              </div>
              <div className="flex-1">
                <div
                  className={`font-lato font-bold text-[1rem] md:text-[0.875rem] leading-[1.2] ${done ? 'line-through text-black/50' : 'text-black'}`}
                >
                  {t.href ? (
                    <Link href={t.href} onClick={t.onClick}>
                      {t.title}
                    </Link>
                  ) : (
                    t.title
                  )}
                </div>
                <div
                  className={`font-lato font-light text-[0.875rem] md:text-[0.75rem] leading-[1.2] ${done ? 'line-through text-black/50' : 'text-black'}`}
                >
                  {t.description}
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
