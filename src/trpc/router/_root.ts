import { createTRPCRouter } from '../trpc'
import { membersRouter } from './members'

export const appRouter = createTRPCRouter({
  members: membersRouter
})

// export type definition of API
export type AppRouter = typeof appRouter
