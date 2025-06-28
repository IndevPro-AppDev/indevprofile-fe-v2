'use client'

import { motion } from 'motion/react'

import type { NavItem } from './nav-item'

import { DesktopNavItem } from './nav-item'

export default function DesktopNavigation({ items }: { items: NavItem[] }) {
  return (
    <nav className="w-fit">
      <motion.ul
        className="sr-only flex w-fit items-center justify-end gap-4 md:not-sr-only"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          stiffness: 569,
          damping: 61,
          mass: 4,
          delay: 0.15,
          delayChildren: 0.15
        }}
      >
        {items.map(({ text, href }, i) => (
          <DesktopNavItem
            key={href}
            text={text}
            href={href}
            linkProps={{
              initial: { filter: 'blur(4px)' },
              animate: { filter: 'blur(0px)' },
              transition: { delay: (i + 1) * 0.05, ease: 'easeOut' }
            }}
          />
        ))}
      </motion.ul>
    </nav>
  )
}
