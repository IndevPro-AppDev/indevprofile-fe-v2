import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring
} from 'motion/react'

import { useTheme } from '~/hooks/use-theme'
import { cn } from '~/lib/utils'

export interface GradientCardProps extends React.ComponentProps<'div'> {}

export default function GradientCard({
  className,
  children,
  ...props
}: GradientCardProps) {
  const { theme } = useTheme()
  const coordX = useMotionValue(0)
  const coordY = useMotionValue(0)

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()

    coordX.set(e.clientX - rect.left)
    coordY.set(e.clientY - rect.top)
  }

  const coordXMotion = useSpring(coordX, {
    stiffness: 180,
    damping: 25,
    mass: 1
  })
  const coordYMotion = useSpring(coordY, {
    stiffness: 180,
    damping: 25,
    mass: 1
  })

  const background = useMotionTemplate`
  radial-gradient(
      20rem circle at ${coordXMotion}px ${coordYMotion}px,
      color-mix(in oklab, var(--color-primary-gradient-start) ${theme === 'dark' ? 12 : 10}%, transparent),
      transparent 80%
  )`

  return (
    <div
      className={cn(
        className,
        'dark:border-primary/20 border-background/30 group from-background/60 dark:from-primary/5 to-background/30 relative rounded-xl border bg-gradient-to-br backdrop-blur-md dark:to-transparent'
      )}
      onMouseMove={handleMouseMove}
      {...props}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity delay-75 duration-300 ease-out group-hover:opacity-100 hover:delay-150"
        style={{
          background
        }}
      />
      <div className="relative h-full space-y-6 rounded-xl py-6 backdrop-blur-lg">
        {children}
      </div>
    </div>
  )
}
