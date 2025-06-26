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
    [0, 100],
    [60, 120]
  )
  const percentage = useSpring(percentageConstraints, {
    damping: 18,
    stiffness: 70,
    mass: 2.5
  })

  const backgroundImage = useMotionTemplate`
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
          'font-brand text-xl font-medium sm:text-base',
          'bg-clip-text text-transparent'
        )}
        style={{ backgroundImage }}
      >
        Indevpro
      </motion.h2>
    </motion.a>
  )
}
