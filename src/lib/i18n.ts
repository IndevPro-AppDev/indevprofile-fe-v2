import { AsyncLocalStorage } from 'node:async_hooks'

import { createIsomorphicFn, createMiddleware } from '@tanstack/react-start'
import { getWebRequest } from '@tanstack/react-start/server'

import type { Locale } from '~/paraglide/runtime'

import {
  baseLocale,
  getLocale,
  isLocale,
  overwriteGetLocale,
  strategy
} from '~/paraglide/runtime'
import { paraglideMiddleware } from '~/paraglide/server'

export const resolveLocale = createIsomorphicFn()
  .client(getLocale)
  .server(() => {
    const request = getWebRequest()

    if (!request) {
      return baseLocale
    }

    return new Promise<Locale>(resolve =>
      paraglideMiddleware(request, ({ locale }) => resolve(locale))
    )
  })

export const localeMiddleware = createMiddleware({ type: 'function' })
  .client(async context =>
    context.next({
      sendContext: {
        locale: await resolveLocale()
      }
    })
  )
  .server(context => {
    const storage = new AsyncLocalStorage<Locale>()
    overwriteGetLocale(() => storage.getStore() ?? baseLocale)

    return storage.run(context.context.locale, context.next)
  })

export function extractLocale(url: string): Locale | undefined {
  const urlObj = new URL(url, 'http://dummy.com')
  const pathSegments = urlObj.pathname.split('/').filter(Boolean)
  if (pathSegments.length > 0) {
    const potentialLocale = pathSegments[0]
    if (isLocale(potentialLocale)) {
      return potentialLocale
    }
  }
}

export function getRouterBasepath(pathname?: string): string | undefined {
  const extractedLocale = extractLocale(pathname ?? '/')
  return strategy.includes('url') && extractedLocale
    ? `/${extractedLocale}`
    : undefined
}
