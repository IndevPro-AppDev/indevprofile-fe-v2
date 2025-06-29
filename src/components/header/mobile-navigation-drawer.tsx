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

import { MotionButton } from '../ui/button'
import HomeLink from './home-link'
import LocaleSwitcher from './locale-switcher'
import ThemeSwitcher from './theme-switcher'

interface MobileNavigationDrawerProps {
  items: NavItem[]
}

export default function MobileNavigationDrawer({
  items
}: MobileNavigationDrawerProps) {
  const [open, setOpen] = useState(false)
  const isSmallDevice = useMediaQuery('only screen and (max-width : 40rem)')

  useEffect(() => {
    if (!isSmallDevice) {
      // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
      setOpen(false)
    }
  }, [isSmallDevice])

  return (
    <Drawer
      open={isSmallDevice ? open : false}
      onOpenChange={setOpen}
      direction="bottom"
      handleOnly
      scrollLockTimeout={100}
      disablePreventScroll
    >
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
              <MotionWrapper key="mobile-drawer-button-icon-open">
                <Icon
                  icon="charm:menu-hamburger"
                  width="16"
                  height="16"
                  className="size-4"
                />
              </MotionWrapper>
            ) : (
              <MotionWrapper key="mobile-drawer-button-icon-close">
                <Icon
                  icon="material-symbols:close-rounded"
                  width="16"
                  height="16"
                  className="size-4"
                />
              </MotionWrapper>
            )}
          </AnimatePresence>
        </MotionButton>
      </DrawerTrigger>
      <DrawerContent className="h-auto">
        <DrawerHeader>
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            transition={{ stiffness: 24, damping: 6, mass: 0.2, delay: 0.15 }}
          >
            <DrawerTitle className="mb-1 flex items-center justify-center">
              <HomeLink
                initial={undefined}
                animate={undefined}
                transition={undefined}
                onClick={() => setOpen(false)}
              />
            </DrawerTitle>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ stiffness: 24, damping: 6, mass: 0.2, delay: 0.2 }}
          >
            <DrawerDescription className="mx-auto max-w-[32ch] text-center">
              Together We Lead, Together We Achieve.
            </DrawerDescription>
          </motion.div>
        </DrawerHeader>
        <div className="py-6">
          <motion.div
            className="mb-6 flex items-center justify-center gap-4"
            initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ stiffness: 24, damping: 6, mass: 0.2, delay: 0.2 }}
          >
            <LocaleSwitcher
              initial={undefined}
              animate={undefined}
              transition={undefined}
            />
            <ThemeSwitcher
              initial={undefined}
              animate={undefined}
              transition={undefined}
            />
          </motion.div>
          <ul className="flex flex-col items-center justify-center">
            {items.map(({ href, text }, i) => (
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

function MotionWrapper({ children }: React.PropsWithChildren) {
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
