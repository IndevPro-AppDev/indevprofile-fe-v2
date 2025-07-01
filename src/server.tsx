import {
  createStartHandler,
  defaultStreamHandler,
  getWebRequest
} from '@tanstack/react-start/server'

import { overwriteGetLocale } from './lib/paraglide/runtime'
import { paraglideMiddleware } from './lib/paraglide/server'
import { createRouter } from './router'

export default createStartHandler({
  createRouter: () => createRouter(getWebRequest().url)
})(event =>
  paraglideMiddleware(getWebRequest(), ({ locale }) => {
    overwriteGetLocale(() => locale)
    return defaultStreamHandler(event)
  })
)
