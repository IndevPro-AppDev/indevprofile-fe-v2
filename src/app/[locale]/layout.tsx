import type { Metadata } from 'next'

import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'

import { ThemeProvider } from '~/components/theme-provider'
import { routing } from '~/i18n/routing'
import { cn } from '~/lib/utils'
import { calSans, coraMontserra } from '~/styles/fonts'

export const metadata: Metadata = {
  title: 'IndevPro',
  description: 'Together We Lead, Together We Achieve, Together We Innovate.'
}

export default async function RootLayout({
  children,
  params
}: React.PropsWithChildren<{ params: Promise<{ locale: string }> }>) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={cn(
          'min-h-dvh w-full overflow-x-hidden font-sans antialiased',
          calSans.variable,
          coraMontserra.variable
        )}
      >
        <NextIntlClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
