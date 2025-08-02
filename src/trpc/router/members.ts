import type { TRPCRouterRecord } from '@trpc/server'

import type { ResponseData } from '~/lib/types'

import { publicProcedure } from '../trpc'

export const membersRouter = {
  structural: publicProcedure.query(async ({ ctx: { api } }) => {
    const res = await api.indevpro.get<ResponseData>('/anggotas/structural')
    return res.data.data
  })
} satisfies TRPCRouterRecord
