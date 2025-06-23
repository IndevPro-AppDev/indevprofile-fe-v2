import { createTRPCRouter, publicProcedure } from '../trpc'

export const appRouter = createTRPCRouter({
  ping: publicProcedure.query(() => 'PONG!!!')
})

// export type definition of API
export type AppRouter = typeof appRouter
