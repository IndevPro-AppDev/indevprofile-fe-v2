import { use } from 'react'

import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'

import type { ParamsWithLocale } from '~/types'

import Footer from '~/components/footer'

export default function Home({ params }: ParamsWithLocale) {
  const { locale } = use(params)
  // Enable static rendering
  setRequestLocale(locale)

  // Once the request locale is set, you
  // can call hooks from `next-intl`
  const t = useTranslations()

  return <Footer />
}
