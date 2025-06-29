import { createServerFn } from '@tanstack/react-start'
import { getCookie, setCookie } from '@tanstack/react-start/server'

const THEME_STORAGE_KEY = '__app-ui-theme'

const getThemeServerFn = createServerFn().handler(async () => {
  return (getCookie(THEME_STORAGE_KEY) || 'dark') as Theme
})

const setThemeServerFn = createServerFn({ method: 'POST' })
  .validator((data: unknown) => {
    if (typeof data != 'string' || (data !== 'dark' && data !== 'light')) {
      throw new Error('Invalid theme provided')
    }
    return data as Theme
  })
  .handler(async ({ data }) => {
    setCookie(THEME_STORAGE_KEY, data)
  })

type Theme = 'light' | 'dark'

export { getThemeServerFn, setThemeServerFn }
export type { Theme }
