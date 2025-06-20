import { use } from 'react'

import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'

import type { ParamsWithLocale } from '~/types'

export default function Home({ params }: ParamsWithLocale) {
  const { locale } = use(params)
  // Enable static rendering
  setRequestLocale(locale)

  // Once the request locale is set, you
  // can call hooks from `next-intl`
  const t = useTranslations()

  return (
    <div className="flex h-dvh items-center justify-center">{t('hello')}</div>
  )
}
