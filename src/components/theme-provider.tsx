'use client'

import * as React from 'react'

import { ThemeProvider as NextThemesProvider } from 'next-themes'

import type { ThemeProviderProps } from 'next-themes'

const initialRender = process.env.NODE_ENV === 'production'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [shouldRender, setShouldRender] = React.useState(initialRender)
  React.useEffect(() => {
    if (!initialRender) {
      // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
      setShouldRender(true)
    }
  }, [])

  return shouldRender ? (
    <NextThemesProvider {...props}>{children}</NextThemesProvider>
  ) : (
    children
  )
}
