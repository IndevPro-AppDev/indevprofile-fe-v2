'use client'

import * as React from 'react'

import { motion } from 'motion/react'

interface IconSunProps extends React.SVGProps<SVGSVGElement> {
  pathProps?: React.SVGProps<SVGPathElement>
}

function IconSun({ pathProps, ...props }: IconSunProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M30 10V4a2 2 0 1 1 4 0v6a2 2 0 0 1-4 0m2 6a16 16 0 1 0 16 16 16.017 16.017 0 0 0-16-16m-17.415 1.415a2.001 2.001 0 0 0 2.83-2.83l-4-4a2.001 2.001 0 0 0-2.83 2.83zm0 29.17-4 4a2.001 2.001 0 0 0 2.83 2.83l4-4a2.002 2.002 0 0 0-2.83-2.83M48 18a2 2 0 0 0 1.415-.585l4-4a2.001 2.001 0 0 0-2.83-2.83l-4 4A2 2 0 0 0 48 18m1.415 28.585a2.001 2.001 0 0 0-2.83 2.83l4 4a2.002 2.002 0 0 0 2.83-2.83zM12 32a2 2 0 0 0-2-2H4a2 2 0 1 0 0 4h6a2 2 0 0 0 2-2m20 20a2 2 0 0 0-2 2v6a2 2 0 0 0 4 0v-6a2 2 0 0 0-2-2m28-22h-6a2 2 0 0 0 0 4h6a2 2 0 0 0 0-4"
        fill="#000"
        {...pathProps}
      />
    </svg>
  )
}

const MotionIconSun = motion.create(IconSun)

export type { IconSunProps }
export { IconSun as default, MotionIconSun }
