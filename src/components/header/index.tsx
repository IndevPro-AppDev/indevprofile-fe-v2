'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import { motion, useMotionValueEvent, useScroll } from 'motion/react'

import { cn } from '~/lib/utils'

import type { NavItem } from './nav-item'

import DesktopNavigation from './desktop-navigation'
import HomeLink from './home-link'
import LocaleSwitcher from './locale-switcher'
import MobileDrawer from './mobile-drawer'
import ThemeSwitcher from './theme-switcher'

export default function Header() {
  const t = useTranslations('nav')

  const navItems: NavItem[] = [
    { text: t('about'), href: '/about' },
    { text: t('blog'), href: '/blog' },
    { text: t('portfolio'), href: '/portfolio' },
    { text: t('contact'), href: '/contact' }
  ]

  const { scrollY } = useScroll()
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up')
  const [scrollPosition, setScrollPosition] = useState(0)

  useMotionValueEvent(scrollY, 'change', current => {
    const diff = current - (scrollY.getPrevious() || 0)
    setScrollDirection(diff > 0 ? 'down' : 'up')
    setScrollPosition(current)
  })

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-20 h-14 w-full border-b border-transparent bg-transparent transition duration-300 ease-out',
        scrollDirection === 'down' || scrollPosition > 0
          ? 'border-muted-foreground/10 border-b shadow-sm backdrop-blur-md'
          : 'border-transparent shadow-none backdrop-blur-none'
      )}
    >
      <motion.div
        className={cn(
          'mx-auto flex h-full w-full items-center justify-between px-0 @sm:px-6',
          scrollDirection === 'down' || scrollPosition > 0
            ? 'max-w-[calc(var(--breakpoint-xl)-5%)]'
            : 'max-w-screen-xl'
        )}
        layout
      >
        <HomeLink />
        <div id="actions" className="flex items-center justify-end gap-6">
          <DesktopNavigation items={navItems} />
          <div className="sr-only flex items-center justify-end gap-4 sm:not-sr-only">
            <LocaleSwitcher />
            <ThemeSwitcher />
          </div>
          <div className="not-sr-only flex items-center justify-end gap-4 sm:sr-only">
            <MobileDrawer navItems={navItems} />
          </div>
        </div>
      </motion.div>
    </header>
  )
}
