import { useEffect } from 'react'

import {
  useMutation,
  useQueryClient,
  useSuspenseQuery
} from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'

import type { Theme } from '~/lib/theme'

import { getThemeServerFn, setThemeServerFn } from '~/lib/theme'

const queryKey = ['theme'] as const

export function useTheme() {
  const queryClient = useQueryClient()

  const getTheme = useServerFn(getThemeServerFn)
  const { data: theme } = useSuspenseQuery({
    queryKey,
    queryFn: () => getTheme()
  })

  const setTheme = useServerFn(setThemeServerFn)
  const { mutate } = useMutation({
    mutationFn: (theme: Theme) => setTheme({ data: theme }),
    onMutate: async (newTheme: Theme) => {
      await queryClient.cancelQueries({ queryKey })
      const previousTheme = queryClient.getQueryData<Theme>(queryKey)
      queryClient.setQueryData(queryKey, newTheme)

      return { previousTheme, newTheme }
    },
    onError: (err, _newTheme, context) => {
      queryClient.setQueryData(queryKey, context?.previousTheme)
      throw err
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['theme'] })
    }
  })

  useEffect(() => {
    document.documentElement.style.colorScheme = theme
  }, [theme])

  return {
    theme,
    setTheme: mutate
  }
}
