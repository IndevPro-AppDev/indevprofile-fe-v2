import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'

import type { Metadata } from 'next'

import localFont from 'next/font/local'
import { notFound } from 'next/navigation'

import Header from '~/components/header'
import { ThemeProvider } from '~/components/theme-provider'

import '../globals.css'

import { routing } from '~/i18n/routing'
import { TRPCReactProvider } from '~/lib/trpc/react'
import { cn } from '~/lib/utils'

const calSans = localFont({
  src: '../fonts/CalSans-Regular.ttf',
  variable: '--font-cal-sans'
})

const coraMontserra = localFont({
  src: '../fonts/cora-montserra-variable.ttf',
  variable: '--font-cora-montserra'
})

const decog = localFont({
  src: '../fonts/decog.otf',
  variable: '--font-decog'
})

export const metadata: Metadata = {
  title: 'IndevPro',
  description: 'Together We Lead, Together We Achieve, Together We Innovate.'
}

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }))
}

export default async function RootLayout({
  children,
  params
}: React.PropsWithChildren<{ params: Promise<{ locale: string }> }>) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  return (
    <TRPCReactProvider>
      <html
        lang="en"
        className="transition-colors duration-300 ease-out"
        suppressHydrationWarning
      >
        <body
          className={cn(
            calSans.variable,
            coraMontserra.variable,
            decog.variable
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <NextIntlClientProvider>
              <Header />
              <main className="w-full pt-14">{children}</main>
            </NextIntlClientProvider>
          </ThemeProvider>
        </body>
      </html>
    </TRPCReactProvider>
  )
}
