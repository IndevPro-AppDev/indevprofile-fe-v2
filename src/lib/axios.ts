import { TRPCError } from '@trpc/server'
import Axios from 'axios'
import { match } from 'ts-pattern'

const indevproApi = Axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-Api-Key': import.meta.env.VITE_API_KEY
  }
})

function handleAxiosError(error: unknown): TRPCError {
  if (Axios.isAxiosError(error)) {
    const { response } = error
    const message: string | undefined =
      response?.data?.message || response?.data?.data?.message

    const code = match<number, TRPCError['code']>(response?.status || 500)
      .with(400, () => 'BAD_REQUEST')
      .with(401, () => 'UNAUTHORIZED')
      .with(403, () => 'FORBIDDEN')
      .with(404, () => 'NOT_FOUND')
      .with(429, () => 'TOO_MANY_REQUESTS')
      .otherwise(() => 'INTERNAL_SERVER_ERROR')

    return new TRPCError({ code, message })
  }

  return new TRPCError({
    code: 'INTERNAL_SERVER_ERROR',
    message: (error as Error).message || 'Uh oh! Something went wrong.'
  })
}

indevproApi.interceptors.response.use(
  response => response,
  async error => {
    throw handleAxiosError(error)
  }
)

export const api = {
  indevpro: indevproApi
}
