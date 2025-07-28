import { useState } from 'react'

import { motion, useMotionValueEvent, useScroll } from 'motion/react'

import { cn } from '~/lib/utils'
import { m } from '~/paraglide/messages'

import type { NavItem } from './nav-item'

import HomeLink from '../home-link'
import DesktopNavigation from './desktop-navigation'
import LocaleSwitcher from './locale-switcher'
import MobileNavigationDrawer from './mobile-navigation-drawer'
import ThemeSwitcher from './theme-switcher'

export default function Header() {
  const navItems: NavItem[] = [
    { text: m['nav.about'](), href: '/about' },
    { text: m['nav.blog'](), href: '/blog' },
    { text: m['nav.portfolio'](), href: '/portfolio' }
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
          'mx-auto flex h-full w-full items-center justify-between px-6 xl:px-0',
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
            <MobileNavigationDrawer items={navItems} />
          </div>
        </div>
      </motion.div>
    </header>
  )
}
