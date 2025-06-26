import * as React from 'react'
import type { SVGProps } from 'react'

import { motion } from 'motion/react'

interface IconIndevProProps extends SVGProps<SVGSVGElement> {}

function IconIndevPro(props: IconIndevProProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 156 156"
      {...props}
    >
      <path
        fill="url(#a)"
        d="M136.376 57.353c0 .816-.19 1.588-.528 2.273l-.463.76-28.552 47.063-4.675-7.706a5 5 0 0 0-.236-.39l-.006-.007a4.505 4.505 0 0 0-7.46 0l-.006.007q-.12.181-.225.37a4.46 4.46 0 0 0-.545 2.148c0 .778.197 1.504.542 2.143L76.745 75.208l5.263-8.674 25.741-42.429.488-.806a5.16 5.16 0 0 1 4.159-2.1c1.706 0 3.314.879 4.246 2.221l.329.544 11.61 19.134 6.815 11.235.44.726a5.1 5.1 0 0 1 .538 2.293z"
      />
      <path
        fill="url(#b)"
        d="M101.57 116.124 86.624 140.76l-.93 1.531a13.12 13.12 0 0 1-10.74 5.576 13.06 13.06 0 0 1-8.193-2.87 13.1 13.1 0 0 1-2.72-2.957l-.611-1.006-13.311-21.937-29.942-49.352-.13-.214a5.134 5.134 0 0 1 4.456-7.682h41.248c1.856 0 3.48.984 4.381 2.459l.017.026 5.377 8.864.839 1.38.381.63 17.477 28.806.003.005q.103.192.225.371l6.738 11.104z"
      />
      <path
        fill="url(#c)"
        d="M67.354 31.526c-6.297 0-12 2.553-16.127 6.68a22.73 22.73 0 0 0-6.68 16.128c0-6.298-2.553-12-6.68-16.127a22.74 22.74 0 0 0-16.128-6.68c6.298 0 12-2.554 16.128-6.682a22.74 22.74 0 0 0 6.68-16.127c0 12.596 10.211 22.808 22.807 22.808"
      />
      <defs>
        <linearGradient
          id="a"
          x1={77.328}
          x2={135.475}
          y1={76.702}
          y2={54.069}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00264B" />
          <stop offset={1} stopColor="#034B93" />
        </linearGradient>
        <linearGradient
          id="b"
          x1={35.94}
          x2={98}
          y1={110.519}
          y2={118}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E66C17" />
          <stop offset={0.967} stopColor="#FFDB00" />
        </linearGradient>
        <linearGradient
          id="c"
          x1={23.043}
          x2={76.895}
          y1={39.896}
          y2={18.935}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E66C17" />
          <stop offset={1} stopColor="#FFDB00" />
        </linearGradient>
      </defs>
    </svg>
  )
}

const MotionIconIndevPro = motion.create(IconIndevPro)

export type { IconIndevProProps }
export { IconIndevPro as default, MotionIconIndevPro }
