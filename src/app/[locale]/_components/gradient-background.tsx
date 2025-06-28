'use client'

import { motion } from 'motion/react'
import Image from 'next/image'

import bgGradientImage from '~/res/drawable/landing-bg-grainny-gradient.webp'

export default function GradientBackground() {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 -z-1 pt-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut', delay: 0.2 }}
    >
      <Image
        src={bgGradientImage}
        alt="Background gradient"
        fill
        className="relative object-cover opacity-60 bg-blend-overlay dark:opacity-20"
        priority
      />
    </motion.div>
  )
}
