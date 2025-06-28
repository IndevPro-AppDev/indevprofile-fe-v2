'use client'

import { useTransition } from 'react'

import { useLocale } from 'next-intl'

import { useParams } from 'next/navigation'

import { usePathname, useRouter } from '~/i18n/navigation'

import { MotionButton } from '../ui/button'

function LocaleSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()

  const [isPending, startTransition] = useTransition()

  const locale = useLocale()

  return (
    <MotionButton
      type="button"
      variant="outline"
      className="bg-secondary dark:border-primary/60 border-primary/60 cursor-pointer rounded-full text-xs disabled:cursor-not-allowed"
      disabled={isPending}
      size="icon"
      onClick={e => {
        e.preventDefault()
        e.stopPropagation()

        startTransition(() => {
          router.replace(
            // @ts-expect-error -- TypeScript will validate that only known `params`
            // are used in combination with a given `pathname`. Since the two will
            // always match for the current route, we can skip runtime checks.
            { pathname, params },
            { locale: locale === 'en' ? 'id' : 'en' }
          )
        })
      }}
      initial={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{ stiffness: 24, damping: 6, mass: 0.2, delay: 0.15 }}
    >
      {locale === 'en' ? 'EN' : 'ID'}
    </MotionButton>
  )
}

export { LocaleSwitcher as default }
