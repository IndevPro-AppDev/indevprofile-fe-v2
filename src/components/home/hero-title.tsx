import { useEffect, useMemo, useState } from 'react'

import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform
} from 'motion/react'

import { cn } from '~/lib/utils'

export default function HeroTitle() {
  const [tick, setTick] = useState(0)
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
      to bottom right,
      var(--primary-gradient-start),
      var(--primary-gradient-end) ${percentage}%
    )`

  useEffect(() => {
    const interval = setInterval(() => {
      const progress = percentageMotionValue.get()
      const random = Math.floor(Math.random() * 100)

      percentageMotionValue.set(progress >= 100 ? 0 : random)

      setTick(prev => prev + 1)
    }, 2500)

    return () => clearInterval(interval)
  }, [percentageMotionValue])

  const animatedText = useMemo(() => ['Lead', 'Achieve'][tick % 2], [tick])

  return (
    <div className="relative w-full overflow-hidden">
      <motion.h1
        className={cn(
          'font-display text-center text-4xl md:text-left md:leading-relaxed lg:text-5xl',
          'mx-auto w-fit bg-clip-text text-transparent md:mx-0 md:w-[29.384rem]',
          'flex flex-col items-center justify-center overflow-y-hidden md:flex-row'
        )}
        style={{ backgroundImage: gradient }}
      >
        <span>Together We</span>
        <AnimatePresence mode="wait">
          <motion.span
            key={`subtitle-animate-count-${animatedText}`}
            className={cn(
              'font-display text-center text-4xl md:text-left md:leading-relaxed lg:text-5xl',
              'w-fit bg-clip-text text-transparent',
              'relative mx-auto flex items-center justify-center md:ml-2',
              'from-primary to-muted-foreground/80 bg-gradient-to-br'
            )}
            initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(8px)' }}
            transition={{ stiffness: 24, damping: 6, mass: 0.2, delay: 0.15 }}
          >
            {animatedText}
          </motion.span>
        </AnimatePresence>
      </motion.h1>
    </div>
  )
}
