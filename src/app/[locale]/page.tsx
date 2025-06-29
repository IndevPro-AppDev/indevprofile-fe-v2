import { use } from 'react'

import { setRequestLocale } from 'next-intl/server'

import type { Locale } from 'next-intl'

import GradientBackground from './_components/gradient-background'

interface Props {
  params: Promise<{ locale: Locale }>
}

export default function Home({ params }: Props) {
  const { locale } = use(params)

  setRequestLocale(locale)

  return (
    <div className="relative w-full max-w-screen overflow-x-hidden">
      <section className="flex h-[calc(100dvh-calc(var(--spacing)*14))] items-center justify-center"></section>
      <section className="h-dvh"></section>
      <section className="h-dvh"></section>
      <GradientBackground />
    </div>
  )
}
