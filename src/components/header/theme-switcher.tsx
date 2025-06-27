'use client'

import { useTheme } from 'next-themes'

import { AnimatePresence, motion } from 'motion/react'

import { cn } from '~/lib/utils'

import IconMoon from '../icons/moon'
import IconSun from '../icons/sun'
import { buttonVariants } from '../ui/button'

function MotionIcon({ children }: React.PropsWithChildren) {
  return (
    <motion.div
      className="size-fit transform-gpu cursor-pointer [&>svg]:pointer-events-none"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 20, opacity: 0 }}
      transition={{
        stiffness: 110,
        damping: 14,
        mass: 0.6,
        delay: 0.05
      }}
    >
      {children}
    </motion.div>
  )
}

export default function ThemeSwitcher() {
  const { resolvedTheme: theme, setTheme } = useTheme()

  return (
    <motion.button
      type="button"
      className={cn(
        buttonVariants({ size: 'icon' }),
        'from-primary to-primary/60 dark:to-muted-foreground/90 bg-gradient-to-br',
        'rounded-full border shadow-sm',
        'relative cursor-pointer overflow-hidden'
      )}
      onClick={e => {
        e.persist()
        document.startViewTransition(() => {
          setTheme(theme === 'dark' ? 'light' : 'dark')
        })
      }}
      initial={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{ stiffness: 24, damping: 6, mass: 0.2, delay: 0.15 }}
    >
      <AnimatePresence mode="wait">
        {theme === 'light' ? (
          <MotionIcon key="theme-switcher-button-icon-dark">
            <IconSun
              pathProps={{ className: cn('fill-secondary') }}
              className="size-4"
            />
          </MotionIcon>
        ) : (
          <MotionIcon key="theme-switcher-button-icon-light">
            <IconMoon
              pathProps={{ className: cn('fill-secondary') }}
              className="size-4"
            />
          </MotionIcon>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
