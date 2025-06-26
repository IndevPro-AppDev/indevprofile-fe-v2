import type { Metadata } from 'next'

import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'

import Header from '~/components/header'
import { ThemeProvider } from '~/components/theme-provider'
import { routing } from '~/i18n/routing'
import { TRPCReactProvider } from '~/lib/trpc/react'
import { cn } from '~/lib/utils'
import { calSans, coraMontserra, decog } from '~/styles/fonts'
import '~/styles/globals.css'

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
    <html lang={locale} suppressHydrationWarning>
      <body
        className={cn(
          'min-h-dvh w-full overflow-x-hidden font-sans antialiased',
          calSans.variable,
          coraMontserra.variable,
          decog.variable
        )}
      >
        <NextIntlClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <TRPCReactProvider>
              <Header />
              <main className="w-full pt-14">{children}</main>
            </TRPCReactProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
