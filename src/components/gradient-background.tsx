import { motion } from 'motion/react'

import bgGradientImage from '~/res/drawable/landing-bg-grainny-gradient.webp'

export default function GradientBackground() {
  return (
    <motion.div
      className="pointer-events-none fixed inset-0 -z-1 pt-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut', delay: 0.2 }}
    >
      <img
        src={bgGradientImage}
        alt="Background gradient"
        className="relative h-full object-cover object-bottom opacity-30 bg-blend-overlay dark:opacity-20"
      />
    </motion.div>
  )
}
