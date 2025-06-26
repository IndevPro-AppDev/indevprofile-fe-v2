import type { Metadata } from 'next'

import localFont from 'next/font/local'

import Header from '~/components/header'
import { ThemeProvider } from '~/components/theme-provider'
import { TRPCReactProvider } from '~/lib/trpc/react'

import './globals.css'

import { cn } from '~/lib/utils'

export const metadata: Metadata = {
  title: 'IndevPro',
  description: 'Together We Lead, Together We Achieve, Together We Innovate.'
}

export const calSans = localFont({
  src: './fonts/CalSans-Regular.ttf',
  variable: '--font-cal-sans'
})

export const coraMontserra = localFont({
  src: './fonts/cora-montserra-variable.ttf',
  variable: '--font-cora-montserra'
})

export const decog = localFont({
  src: './fonts/decog.otf',
  variable: '--font-decog'
})

export default async function RootLayout({
  children
}: React.PropsWithChildren) {
  return (
    <TRPCReactProvider>
      <html lang="en" suppressHydrationWarning>
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
            <Header />
            <main className="w-full pt-14">{children}</main>
          </ThemeProvider>
        </body>
      </html>
    </TRPCReactProvider>
  )
}
