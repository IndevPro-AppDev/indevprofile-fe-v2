import type { NavItem } from './nav-item'

import DesktopNavigation from './desktop-navigation'
import HomeLink from './home-link'
import MobileDrawer from './mobile-drawer'
import ThemeSwitcher from './theme-switcher'

export default function Header() {
  const navItems: NavItem[] = [
    { text: 'Tentang', href: '/about' },
    { text: 'Blog', href: '/blog' },
    { text: 'Portofolio', href: '/portfolio' },
    { text: 'Kontak', href: '/contact' }
  ]

  return (
    <header className="fixed inset-x-0 top-0 z-20 h-14 w-full">
      <div className="flex h-full w-full items-center justify-between bg-transparent px-6">
        <HomeLink />
        <div id="actions" className="flex items-center justify-end gap-6">
          <DesktopNavigation items={navItems} />
          <div className="sr-only flex items-center justify-end gap-4 md:not-sr-only">
            <ThemeSwitcher />
          </div>
          <div className="not-sr-only flex items-center justify-end gap-4 md:sr-only">
            <MobileDrawer />
          </div>
        </div>
      </div>
    </header>
  )
}
