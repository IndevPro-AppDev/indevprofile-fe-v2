import { useEffect } from 'react'

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform
} from 'motion/react'

import { useTheme } from '~/hooks/use-theme'
import { cn } from '~/lib/utils'

import IconIndevPro from './icons/indevpro'
import MotionLink from './motion-link'

interface HomeLinkProps extends React.ComponentProps<typeof MotionLink> {}

export default function HomeLink(props: HomeLinkProps) {
  const { theme } = useTheme()

  const percentageMotionValue = useMotionValue(80)
  const percentageConstraints = useTransform(
    percentageMotionValue,
    [0, 20, 60, 100],
    [60, 40, 80, 120]
  )
  const percentage = useSpring(percentageConstraints, {
    damping: 18,
    stiffness: 70,
    mass: 2.5
  })

  const gradient = useMotionTemplate`
  linear-gradient(
    to bottom right,
    var(--primary),
    color-mix(in oklab, var(--muted-foreground) 60%, transparent) ${percentage}%
  )`

  useEffect(() => {
    const interval = setInterval(() => {
      const progress = percentageMotionValue.get()
      const random = Math.floor(Math.random() * 100)

      percentageMotionValue.set(progress >= 100 ? 0 : random)
    }, 2500)

    return () => clearInterval(interval)
  }, [percentageMotionValue])

  const starB64DataUrl =
    theme === 'light'
      ? 'before:content-[url("data:image/svg+xml;base64,PHN2ZyAgdmlld0JveD0iMCAwIDEzIDEzIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0xMi43MzYgNi4xMWMtMS42NzUgMC0zLjE5Mi42OC00LjI5IDEuNzc3YTYuMDUgNi4wNSAwIDAgMC0xLjc3NiA0LjI5YzAtMS42NzYtLjY4LTMuMTkzLTEuNzc3LTQuMjlBNi4wNSA2LjA1IDAgMCAwIC42MDMgNi4xMWE2LjA1IDYuMDUgMCAwIDAgNC4yOS0xLjc3N0E2LjA1IDYuMDUgMCAwIDAgNi42Ny4wNDNhNi4wNjYgNi4wNjYgMCAwIDAgNi4wNjYgNi4wNjciIGZpbGw9InVybCgjYSkiLz48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImEiIHgxPSIxIiB5MT0iMCIgeDI9IjEyLjUiIHkyPSIxMiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIHN0b3AtY29sb3I9IiMyRjJEMkQiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMyRjJEMkQiIHN0b3Atb3BhY2l0eT0iLjYiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48L3N2Zz4=")]'
      : 'before:content-[url("data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTMgMTMiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEyLjczNiA2LjExYy0xLjY3NSAwLTMuMTkyLjY4LTQuMjkgMS43NzdhNi4wNSA2LjA1IDAgMCAwLTEuNzc2IDQuMjljMC0xLjY3Ni0uNjgtMy4xOTMtMS43NzctNC4yOUE2LjA1IDYuMDUgMCAwIDAgLjYwMyA2LjExYTYuMDUgNi4wNSAwIDAgMCA0LjI5LTEuNzc3QTYuMDUgNi4wNSAwIDAgMCA2LjY3LjA0M2E2LjA2NiA2LjA2NiAwIDAgMCA2LjA2NiA2LjA2NyIgZmlsbD0idXJsKCNhKSIvPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iYSIgeDE9IjEiIHkxPSIwIiB4Mj0iMTIuNSIgeTI9IjEyIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agc3RvcC1jb2xvcj0iI0Y0RjRGNCIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0IwQjRCQSIgc3RvcC1vcGFjaXR5PSIuNiIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjwvc3ZnPg==")]'

  return (
    <MotionLink
      href="/"
      className="flex w-fit items-center"
      initial={{ opacity: 0, y: -10, scale: 0.98, filter: 'blur(4px)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -10, scale: 0.98, filter: 'blur(4px)' }}
      viewport={{ once: true }}
      transition={{ stiffness: 24, damping: 6, mass: 0.2, delay: 0.15 }}
      {...props}
    >
      <IconIndevPro className="mr-1 size-6" />
      <motion.h2
        className={cn(
          'font-brand text-2xl leading-none font-medium sm:text-base',
          'bg-clip-text text-transparent',
          'relative flex items-center'
        )}
        style={{ backgroundImage: gradient }}
      >
        {'Indevpro'.split('').map(char => (
          <motion.span
            className={cn(
              char === 'p' &&
                `before:text-primary before:pointer-events-none before:absolute before:-top-[13px] before:mb-1 before:block before:size-2.5 before:opacity-90 sm:before:-top-4 ${starB64DataUrl} md:before:-top-[10px]`
            )}
            key={`indevpro-${char}`}
          >
            {char}
          </motion.span>
        ))}
      </motion.h2>
    </MotionLink>
  )
}
