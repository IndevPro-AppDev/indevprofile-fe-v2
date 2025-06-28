'use client'

import { useState } from 'react'

import { Icon } from '@iconify/react'
import { AnimatePresence, motion } from 'motion/react'

import { MotionButton } from '../ui/button'

function MotionIcon({ children }: React.PropsWithChildren) {
  return (
    <motion.div
      className="size-fit transform-gpu cursor-pointer [&>svg]:pointer-events-none"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{
        stiffness: 154,
        damping: 22,
        mass: 0.3,
        delay: 0.05
      }}
    >
      {children}
    </motion.div>
  )
}

export default function MobileDrawer() {
  const [open, setOpen] = useState(false)

  return (
    <MotionButton
      type="button"
      size="icon"
      className="bg-secondary dark:border-primary/60 border-primary/60 cursor-pointer overflow-hidden rounded-full text-xs disabled:cursor-not-allowed"
      variant="outline"
      onClick={() => setOpen(!open)}
      initial={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{ stiffness: 24, damping: 6, mass: 0.2, delay: 0.15 }}
    >
      <AnimatePresence mode="wait">
        {!open ? (
          <MotionIcon key="mobile-drawer-button-icon-open">
            <Icon
              icon="charm:menu-hamburger"
              width="16"
              height="16"
              className="size-4"
            />
          </MotionIcon>
        ) : (
          <MotionIcon key="mobile-drawer-button-icon-close">
            <Icon
              icon="material-symbols:close-rounded"
              width="16"
              height="16"
              className="size-4"
            />
          </MotionIcon>
        )}
      </AnimatePresence>
    </MotionButton>
  )
}
