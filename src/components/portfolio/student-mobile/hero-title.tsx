import { useEffect } from 'react'

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform
} from 'motion/react'

import { cn } from '~/lib/utils'

export default function HeroTitle() {
  const percentageMotionValue = useMotionValue(80)
  const percentageConstraints = useTransform(
    percentageMotionValue,
    [0, 20, 60, 100],
    [80, 70, 90, 100]
  )
  const percentage = useSpring(percentageConstraints, {
    damping: 18,
    stiffness: 70,
    mass: 2.5
  })

  const gradient = useMotionTemplate`
    linear-gradient(
      to right,
      var(--primary-gradient-start),
      var(--primary-gradient-end) ${percentage}%
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
    <motion.h1
      className={cn(
        'font-display text-center text-5xl font-extrabold md:text-left md:text-6xl md:leading-tight lg:text-8xl',
        'mx-auto w-fit bg-clip-text text-transparent md:mx-0',
        'flex flex-col items-center justify-center overflow-y-hidden md:flex-row'
      )}
      style={{ backgroundImage: gradient }}
    >
      Student <br /> Mobile
    </motion.h1>
  )
}
