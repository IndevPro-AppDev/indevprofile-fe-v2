import type { Metadata } from 'next'

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
    <html lang="en">
      <body className="min-h-dvh w-full overflow-x-hidden font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
