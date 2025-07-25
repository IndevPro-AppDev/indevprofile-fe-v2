import { useEffect } from 'react'

import { motion, useAnimationControls } from 'motion/react'

import { cn } from '~/lib/utils'

interface StarIconProps extends React.ComponentProps<'svg'> {}

export default function AnimatedStarIcon({
  className,
  ...props
}: StarIconProps) {
  const gradientStartControl = useAnimationControls()
  const gradientEndControl = useAnimationControls()

  useEffect(() => {
    gradientStartControl.start({
      stopColor: [
        'var(--color-primary-gradient-start)',
        'var(--color-tertiary)'
      ],
      transition: {
        duration: 1.5,
        delay: 0.15,
        repeatType: 'reverse',
        repeatDelay: 0.3,
        ease: 'circOut',
        repeat: Infinity
      }
    })
    gradientEndControl.start({
      stopColor: ['var(--color-primary-gradient-end)', 'var(--color-tertiary)'],
      transition: {
        duration: 1.5,
        ease: 'circOut',
        delay: 0.3,
        repeatType: 'reverse',
        repeatDelay: 0.3,
        repeat: Infinity
      }
    })
  }, [gradientStartControl, gradientEndControl])

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 25"
      fill="none"
      className={cn(className)}
      {...props}
    >
      <path
        d="M24 12.919a11.96 11.96 0 0 0-8.485 3.514A11.96 11.96 0 0 0 12 24.92c0-3.314-1.343-6.314-3.514-8.486A11.96 11.96 0 0 0 0 12.92c3.314 0 6.314-1.344 8.486-3.515A11.96 11.96 0 0 0 12 .919c0 6.627 5.373 12 12 12"
        fill="url(#linear-gradient)"
      />
      <defs>
        <linearGradient
          id="linear-gradient"
          x1={0}
          y1={12.918}
          x2={24}
          y2={12.918}
          gradientUnits="userSpaceOnUse"
        >
          <motion.stop
            animate={gradientStartControl}
            initial={{ stopColor: 'var(--color-primary-gradient-start)' }}
          />
          <motion.stop
            offset={1}
            animate={gradientEndControl}
            initial={{ stopColor: 'var(--color-primary-gradient-end)' }}
          />
        </linearGradient>
      </defs>
    </svg>
  )
}
