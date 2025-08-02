import { createTRPCRouter } from '../trpc'
import { activitiesRouter } from './activities'
import { membersRouter } from './members'

export const appRouter = createTRPCRouter({
  members: membersRouter,
  activities: activitiesRouter
})

// export type definition of API
export type AppRouter = typeof appRouter
