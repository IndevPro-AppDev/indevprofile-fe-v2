import { createRouter as createTanstackRouter } from '@tanstack/react-router'
import { routerWithQueryClient } from '@tanstack/react-router-with-query'

import { getTrpcTSRouterContext, TRPCReactProvider } from './lib/trpc/react'
// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Create a new router instance
export function createRouter() {
  const context = getTrpcTSRouterContext()

  const router = createTanstackRouter({
    routeTree,
    defaultPreload: 'intent',
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    context,
    Wrap: ({ children }) => {
      return <TRPCReactProvider>{children}</TRPCReactProvider>
    }
  })

  return routerWithQueryClient(router, context.queryClient)
}

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}
