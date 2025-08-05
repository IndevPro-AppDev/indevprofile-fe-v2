import type { TRPCRouterRecord } from '@trpc/server'

import type { ApiResponse } from '~/lib/types'

import { publicProcedure } from '~/trpc/trpc'

import type { Activity, ActivityResponseData } from './types'

export const activitiesRouter = {
  all: publicProcedure.query(async ({ ctx: { api } }) => {
    const res =
      await api.indevpro.get<ApiResponse<Array<ActivityResponseData>>>(
        '/activity'
      )

    const items = (res.data.data ?? []).map(activity => {
      return {
        id: activity.id,
        title: activity.title,
        description: activity.description,
        image: activity.image
      } satisfies Activity
    })
    return items
  })
} satisfies TRPCRouterRecord
