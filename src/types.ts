import type { Locale } from 'next-intl'

export type MaybePromise<T> = T | Promise<T>

export interface ParamsWithLocale<T = unknown> {
  params: Promise<T & { locale: Locale }>
}
