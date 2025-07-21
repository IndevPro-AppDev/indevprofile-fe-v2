import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring
} from 'motion/react'

import { cn } from '~/lib/utils'

export interface GradientCardProps extends React.ComponentProps<'div'> {}

export function GradientCard({
  className,
  children,
  ...props
}: GradientCardProps) {
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
      color-mix(in oklab, var(--color-primary-gradient-start) 14%, transparent),
      transparent 80%
  )`

  return (
    <div
      className={cn(
        'dark:border-primary/20 border-background/30 group bg-background/30 dark:bg-primary/8 relative flex h-auto flex-col gap-6 rounded-xl border py-6 backdrop-blur-md',
        className
      )}
      onMouseMove={handleMouseMove}
      {...props}
      data-card="container"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity delay-75 duration-300 ease-out group-hover:opacity-100 hover:delay-150"
        style={{ background }}
        data-card="overflay"
      />
      {children}
    </div>
  )
}

interface GradientCardContentProps extends React.ComponentProps<'div'> {}

export function GradientCardContent({
  children,
  className,
  ...props
}: GradientCardContentProps) {
  return (
    <div
      className={cn('relative h-full px-6', className)}
      {...props}
      data-card="content"
    >
      {children}
    </div>
  )
}

interface GradientCardHeaderProps extends React.ComponentProps<'div'> {}

export function GradientCardHeader({
  children,
  className,
  ...props
}: GradientCardHeaderProps) {
  return (
    <div
      className={cn('relative flex h-auto flex-col space-y-2 px-6', className)}
      {...props}
      data-card="header"
    >
      {children}
    </div>
  )
}

interface GradientCardTitleProps extends React.ComponentProps<'h2'> {}

export function GradientCardTitle({
  children,
  className,
  ...props
}: GradientCardTitleProps) {
  return (
    <h2
      className={cn(
        'font-display text-left text-xl md:text-2xl',
        'bg-clip-text text-transparent',
        'from-primary-gradient-start to-primary-gradient-end bg-gradient-to-br',
        'mb-1',
        className
      )}
      {...props}
      data-card="title"
    >
      {children}
    </h2>
  )
}

interface GradientCardDescriptionProps extends React.ComponentProps<'p'> {}

export function GradientCardDescription({
  children,
  className,
  ...props
}: GradientCardDescriptionProps) {
  return (
    <p
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
      data-card="description"
    >
      {children}
    </p>
  )
}
