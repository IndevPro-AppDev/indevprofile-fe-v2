import { AnimatePresence, motion } from 'motion/react'

import { useTheme } from '~/hooks/use-theme'
import { cn } from '~/lib/utils'

import IconMoon from '../icons/moon'
import IconSun from '../icons/sun'
import { MotionButton } from '../ui/button'

interface ThemeSwitcherProps
  extends React.ComponentProps<typeof motion.button> {}

export default function ThemeSwitcher(props: ThemeSwitcherProps) {
  const { theme, setTheme } = useTheme()

  return (
    <MotionButton
      type="button"
      variant="default"
      onClick={() => {
        setTheme(theme === 'light' ? 'dark' : 'light')
      }}
      className="rounded-full"
      size="icon"
      initial={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{ stiffness: 24, damping: 6, mass: 0.2, delay: 0.15 }}
      {...props}
    >
      <AnimatePresence mode="wait">
        {theme === 'light' ? (
          <MotionWrapper key="theme-switcher-button-icon-dark">
            <IconSun
              pathProps={{ className: cn('fill-secondary') }}
              className="size-4"
            />
          </MotionWrapper>
        ) : (
          <MotionWrapper key="theme-switcher-button-icon-light">
            <IconMoon
              pathProps={{ className: cn('fill-secondary') }}
              className="size-4"
            />
          </MotionWrapper>
        )}{' '}
      </AnimatePresence>
    </MotionButton>
  )
}

function MotionWrapper({ children }: React.PropsWithChildren) {
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
