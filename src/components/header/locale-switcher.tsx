'use client'

import { useNavigate, useRouter, useRouterState } from '@tanstack/react-router'

import { getLocale, setLocale } from '~/paraglide/runtime'

import { MotionButton } from '../ui/button'

interface LocaleSwitcherProps
  extends React.ComponentProps<typeof MotionButton> {}

function LocaleSwitcher(props: LocaleSwitcherProps) {
  const navigate = useNavigate()
  const router = useRouter()
  const routerState = useRouterState()

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()

    router.startTransition(() => {
      setLocale(getLocale() === 'en' ? 'id' : 'en', { reload: false })
      navigate({
        to: routerState.location.pathname,
        reloadDocument: true,
        replace: true,
        resetScroll: false
      })
    })
  }

  return (
    <MotionButton
      type="button"
      variant="outline"
      className="bg-secondary dark:border-primary/60 border-primary/60 cursor-pointer rounded-full text-xs uppercase disabled:cursor-not-allowed"
      size="icon"
      onClick={handleClick}
      initial={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{ stiffness: 24, damping: 6, mass: 0.2, delay: 0.15 }}
      {...props}
    >
      {getLocale()}
    </MotionButton>
  )
}

export { LocaleSwitcher as default }
