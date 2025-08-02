import type { TRPCRouterRecord } from '@trpc/server'

import z from 'zod'

import type { ApiResponse } from '~/lib/types'

import type { MemberResponseData } from './types'

import { publicProcedure } from '../../trpc'
import { memberDto } from './types'

export const membersRouter = {
  structural: publicProcedure.query(async ({ ctx: { api } }) => {
    const res = await api.indevpro.get<ApiResponse<Array<MemberResponseData>>>(
      '/anggotas/structural'
    )
    return (res.data.data ?? []).map(member => memberDto(member))
  }),
  all: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish().default(10),
        page: z.number().nullish().default(1),
        period_id: z.number().nullish()
      })
    )
    .query(async ({ ctx: { api }, input }) => {
      const res = await api.indevpro.get<
        ApiResponse<Array<MemberResponseData>>
      >('/anggotas', {
        params: {
          limit: input.limit,
          page: input.page,
          'filters[periode_id]': input.period_id || undefined
        }
      })

      const meta = res.data.meta
      const nextCursor = meta
        ? meta.current_page < meta.last_page
          ? meta.current_page + 1
          : null
        : null

      return {
        items: (res.data.data ?? []).map(member => memberDto(member)),
        nextCursor
      }
    })
} satisfies TRPCRouterRecord
