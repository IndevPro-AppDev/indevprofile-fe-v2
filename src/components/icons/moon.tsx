'use client'

import * as React from 'react'

import { motion } from 'motion/react'

interface IconMoonProps extends React.SVGProps<SVGSVGElement> {
  pathProps?: React.SVGProps<SVGPathElement>
}

function IconMoon({ pathProps, ...props }: IconMoonProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 51 51"
      fill="none"
      {...props}
    >
      <path
        d="M50.885 32.553a26.2 26.2 0 0 1-9.25 13.227A26 26 0 0 1 0 25 25.77 25.77 0 0 1 5.22 9.37 26.2 26.2 0 0 1 18.447.12a2 2 0 0 1 2.5 2.5 22.02 22.02 0 0 0 27.45 27.45 2 2 0 0 1 2.5 2.5z"
        fill="#000"
        {...pathProps}
      />
    </svg>
  )
}

const MotionIconMoon = motion.create(IconMoon)

export type { IconMoonProps }
export { IconMoon as default, MotionIconMoon }
