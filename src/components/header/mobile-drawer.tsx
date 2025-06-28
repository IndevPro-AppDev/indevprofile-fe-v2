'use client'

import { useEffect, useState } from 'react'

import { Icon } from '@iconify/react'
import { useMediaQuery } from '@uidotdev/usehooks'
import { AnimatePresence, motion } from 'motion/react'

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '~/components/ui/drawer'
import { Link } from '~/i18n/navigation'

import type { NavItem } from './nav-item'

import IconIndevPro from '../icons/indevpro'
import { MotionButton } from '../ui/button'
import LocaleSwitcher from './locale-switcher'
import ThemeSwitcher from './theme-switcher'

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

export default function MobileDrawer({ navItems }: { navItems: NavItem[] }) {
  const [open, setOpen] = useState(false)
  const isSmallDevice = useMediaQuery('only screen and (max-width : 40rem)')

  useEffect(() => {
    if (!isSmallDevice) {
      // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
      setOpen(false)
    }
  }, [isSmallDevice])

  return (
    <Drawer open={isSmallDevice ? open : false} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <MotionButton
          type="button"
          size="icon"
          className="cursor-pointer overflow-hidden rounded-full text-xs disabled:cursor-not-allowed"
          variant="ghost"
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
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            transition={{ stiffness: 24, damping: 6, mass: 0.2, delay: 0.15 }}
          >
            <DrawerTitle className="font-brand mb-1 flex items-center justify-center">
              <IconIndevPro className="mr-1 size-6" /> Indevpro
            </DrawerTitle>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ stiffness: 24, damping: 6, mass: 0.2, delay: 0.2 }}
          >
            <DrawerDescription className="mx-auto max-w-[32ch] text-center">
              Together We Lead, Together We Achieve, Together We Innovate
            </DrawerDescription>
          </motion.div>
        </DrawerHeader>
        <div className="py-6">
          <div className="mb-6 flex items-center justify-center gap-4">
            <LocaleSwitcher />
            <ThemeSwitcher />
          </div>
          <ul className="flex flex-col items-center justify-center">
            {navItems.map(({ href, text }, i) => (
              <li key={href} className="w-full">
                <MotionButton
                  className="w-full text-center"
                  variant="ghost"
                  size="lg"
                  initial={{
                    opacity: 0,
                    y: 10,
                    scale: 0.98,
                    filter: 'blur(4px)'
                  }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                  transition={{
                    stiffness: 24,
                    damping: 6,
                    mass: 0.2,
                    delay: 0.2 + i * 0.05
                  }}
                  asChild
                >
                  <Link
                    href={href ?? '#'}
                    className="hover:bg-muted/50 focus-visible:ring-ring flex w-full items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                    onClick={() => setOpen(false)}
                  >
                    {text}
                  </Link>
                </MotionButton>
              </li>
            ))}
          </ul>
        </div>
        <DrawerFooter className="text-muted-foreground mx-auto text-center text-xs">
          &copy;{new Date().getFullYear()} by IndevPro. All rights reserved.
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
