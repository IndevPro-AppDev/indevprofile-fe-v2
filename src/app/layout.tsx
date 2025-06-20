import type { Metadata } from 'next'

import { ThemeProvider } from '~/components/theme-provider'
import { cn } from '~/lib/utils'
import { calSans, coraMontserra } from '~/styles/fonts'
import '~/styles/globals.css'

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
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-dvh w-full overflow-x-hidden font-sans antialiased',
          calSans.variable,
          coraMontserra.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
