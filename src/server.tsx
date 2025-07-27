import {
  createStartHandler,
  defaultStreamHandler,
  getWebRequest
} from '@tanstack/react-start/server'

import { overwriteGetLocale } from './paraglide/runtime'
import { paraglideMiddleware } from './paraglide/server'
import { createRouter } from './router'

export default createStartHandler({
  createRouter: () => createRouter(getWebRequest().url)
})(event =>
  paraglideMiddleware(getWebRequest(), ({ locale }) => {
    overwriteGetLocale(() => locale)
    return defaultStreamHandler({
      request: event.request,
      responseHeaders: event.responseHeaders,
      router: event.router as any
    })
  })
)
