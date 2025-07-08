import type { QueryClient } from '@tanstack/react-query'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import ErrorComponent from '~/components/error-component'
import Footer from '~/components/footer'
import GradientBackground from '~/components/gradient-background'
import Header from '~/components/header'
import { useTheme } from '~/hooks/use-theme'
import { createTRPCProxy } from '~/lib/trpc/react'
import { seo } from '~/lib/utils'
import { getLocale } from '~/paraglide/runtime'
import fontCoraMontserra from '~/res/fonts/cora-montserra-variable.ttf?url'
import fontDecog from '~/res/fonts/decog.otf?url'
import appCss from '~/res/styles/app.css?url'

export interface RouterAppContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterAppContext>()({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      { title: 'Indevpro' },
      { name: 'color-scheme', content: 'dark light' },
      { name: 'mobile-web-app-capable', content: 'yes' },
      {
        name: 'apple-mobile-web-app-status-bar-style',
        content: 'black-translucent'
      },
      { name: 'robots', content: 'index, follow' },
      { name: 'googlebot', content: 'index, follow' },
      ...seo({
        title: 'Indevpro',
        description: 'Together We Lead, Together We Achieve.'
      })
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: '/favicon.ico' },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png'
      },
      { rel: 'manifest', href: '/manifest.json' },
      {
        rel: 'preload',
        as: 'font',
        href: fontDecog,
        type: 'font/otf',
        crossOrigin: 'anonymous'
      },
      {
        rel: 'preload',
        as: 'font',
        href: fontCoraMontserra,
        type: 'font/ttf',
        crossOrigin: 'anonymous'
      }
    ]
  }),
  beforeLoad: () => {
    return {
      trpc: createTRPCProxy()
    }
  },
  shellComponent: RootComponent,
  errorComponent: props => <ErrorComponent {...props} />,
  notFoundComponent: () => <ErrorComponent type="not-found" />
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme()

  return (
    <html
      lang={getLocale()}
      className={theme}
      style={{
        colorScheme: theme
      }}
      suppressHydrationWarning
    >
      <head>
        <HeadContent />
      </head>
      <body className="relative transition duration-300 ease-in-out">
        <Header />
        <main className="w-full pt-14">{children}</main>
        <Footer />
        <GradientBackground />
        <ReactQueryDevtools buttonPosition="bottom-left" />
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}
