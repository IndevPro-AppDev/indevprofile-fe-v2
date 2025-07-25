import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server'

import type { AppRouter } from './router/_root'

import { appRouter } from './router/_root'
import { createTRPCContext } from './trpc'

/**
 * Inference helpers for input types
 * @example
 * type PostByIdInput = RouterInputs['post']['byId']
 *      ^? { id: number }
 */
type RouterInputs = inferRouterInputs<AppRouter>

/**
 * Inference helpers for output types
 * @example
 * type AllPostsOutput = RouterOutputs['post']['all']
 *      ^? Post[]
 */
type RouterOutputs = inferRouterOutputs<AppRouter>

export { appRouter, createTRPCContext }
export type { AppRouter, RouterInputs, RouterOutputs }
