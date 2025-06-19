import type { Metadata } from 'next'

import { cn } from '~/lib/utils'
import '~/styles/globals.css'
import { calSans, coraMontserra } from '~/styles/fonts'

export const metadata: Metadata = {
  title: 'IndevProfile',
  description: 'Together We Lead, Together We Achieve, Together We Innovate.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-dvh w-full overflow-x-hidden font-sans antialiased',
          calSans.variable,
          coraMontserra.variable
        )}
      >
        {children}
      </body>
    </html>
  )
}
