'use client'

import { getLocale, setLocale } from '~/paraglide/runtime'

import { MotionButton } from '../ui/button'

interface LocaleSwitcherProps
  extends React.ComponentProps<typeof MotionButton> {}

function LocaleSwitcher(props: LocaleSwitcherProps) {
  return (
    <MotionButton
      type="button"
      variant="outline"
      className="bg-secondary dark:border-primary/60 border-primary/60 cursor-pointer rounded-full text-xs uppercase disabled:cursor-not-allowed"
      size="icon"
      onClick={e => {
        e.preventDefault()
        e.stopPropagation()
        setLocale(getLocale() === 'en' ? 'id' : 'en')
      }}
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
