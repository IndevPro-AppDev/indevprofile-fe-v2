'use client'

import { useEffect } from 'react'

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform
} from 'motion/react'

import { cn } from '~/lib/utils'

import IconIndevPro from '../icons/indevpro'

export default function HomeLink() {
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
    'before:content-[url("data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTMgMTMiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEyLjczNiA2LjExYy0xLjY3NSAwLTMuMTkyLjY4LTQuMjkgMS43NzdhNi4wNSA2LjA1IDAgMCAwLTEuNzc2IDQuMjljMC0xLjY3Ni0uNjgtMy4xOTMtMS43NzctNC4yOUE2LjA1IDYuMDUgMCAwIDAgLjYwMyA2LjExYTYuMDUgNi4wNSAwIDAgMCA0LjI5LTEuNzc3QTYuMDUgNi4wNSAwIDAgMCA2LjY3LjA0M2E2LjA2NiA2LjA2NiAwIDAgMCA2LjA2NiA2LjA2NyIgZmlsbD0idXJsKCNhKSIvPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iYSIgeDE9IjEiIHkxPSIwIiB4Mj0iMTIuNSIgeTI9IjEyIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agc3RvcC1jb2xvcj0iI0Y0RjRGNCIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0IwQjRCQSIgc3RvcC1vcGFjaXR5PSIuNiIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjwvc3ZnPg==")]'

  return (
    <motion.a
      href="/"
      className="flex items-center"
      initial={{ opacity: 0, y: -10, scale: 0.98, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      transition={{ stiffness: 24, damping: 6, mass: 0.2, delay: 0.15 }}
    >
      <IconIndevPro className="mr-1 size-6" />
      <motion.h2
        className={cn(
          'font-brand text-xl leading-none font-medium sm:text-base',
          'bg-clip-text text-transparent',
          'flex'
        )}
        style={{ backgroundImage: gradient }}
      >
        {'Indevpro'.split('').map(char => (
          <motion.span
            className={cn(
              char === 'p' &&
                `before:text-primary before:pointer-events-none before:absolute before:-top-2.5 before:inline-block before:size-2.5 before:opacity-90 md:before:-top-1.5 ${starB64DataUrl}`
            )}
            key={`indevpro-${char}`}
          >
            {char}
          </motion.span>
        ))}
      </motion.h2>
    </motion.a>
  )
}
