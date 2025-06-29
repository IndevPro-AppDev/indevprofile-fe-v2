import { createRouter as createTanstackRouter } from '@tanstack/react-router'

import { getTrpcTSRouterContext, TRPCReactProvider } from './lib/trpc/react'
import './res/styles/app.css'
// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Create a new router instance
export function createRouter() {
  const router = createTanstackRouter({
    routeTree,
    defaultPreload: 'intent',
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    context: {
      ...getTrpcTSRouterContext()
    },
    Wrap: ({ children }) => {
      return <TRPCReactProvider>{children}</TRPCReactProvider>
    }
  })

  return router
}

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}
