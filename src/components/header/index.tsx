import HomeLink from './home-link'
import ThemeSwitcher from './theme-switcher'

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-20 h-14 w-full">
      <div className="flex h-full w-full items-center justify-between bg-transparent px-6">
        <HomeLink />
        <nav className="w-fit flex-1">
          <ul className="sr-only flex items-center justify-end gap-4 md:not-sr-only">
            <ThemeSwitcher />
          </ul>
          <ul className="not-sr-only flex items-center justify-end gap-4 md:sr-only">
            {/* TODO: mobile nav items */}
          </ul>
        </nav>
      </div>
    </header>
  )
}
