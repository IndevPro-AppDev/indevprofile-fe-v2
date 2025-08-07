import { Icon } from '@iconify/react'
import { Link } from '@tanstack/react-router'

import { cn } from '~/lib/utils'
import { m } from '~/paraglide/messages'

import { navItemStyle } from './header/nav-item'
import HomeLink from './home-link'

const titleStyle = cn(
  'font-brand text-base font-medium md:text-lg',
  'bg-clip-text text-transparent',
  'relative flex items-center',
  'from-primary to-muted-foreground/60 bg-gradient-to-br'
)

export default function Footer() {
  const navItems = [
    { group: m['nav.about'](), items: [{ name: 'Our Teams', href: '/about' }] },
    // {
    //   group: m['nav.blog'](),
    //   items: [
    //     { name: 'Blog 1', href: '/' },
    //     { name: 'Blog 2', href: '/' },
    //     { name: 'Blog 3', href: '/' }
    //   ]
    // },
    // {
    //   group: m['nav.portfolio'](),
    //   items: [
    //     { name: 'Portfolio 1', href: '/' },
    //     { name: 'Portfolio 2', href: '/' },
    //     { name: 'Portfolio 3', href: '/' }
    //   ]
    // },
    {
      group: m['nav.contact'](),
      items: [
        { name: 'Email', href: 'mailto:indevappfti@gmail.com' }
        // { name: 'FAQ', href: '/' }
      ]
    }
  ]

  return (
    <footer className="mx-auto w-full max-w-screen-xl space-y-6 px-6 pb-6">
      <div className="border-foreground/60 grid w-full grid-cols-1 gap-10 border-b py-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col space-y-4">
          <HomeLink />
          <p className="text-muted-foreground text-sm">
            {m['footer.description']()}
          </p>
          <ul className="flex items-center space-x-2">
            {[
              { href: '#', icon: 'ph:instagram-logo-fill' }
              // { href: '#', icon: 'mage:linkedin' },
              // { href: '#', icon: 'ant-design:github-filled' }
            ].map(({ href, icon }) => (
              <a
                key={icon}
                href={href}
                onClick={e => e.preventDefault()}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <li>
                  <Icon
                    className="hover:text-foreground/80 active:text-foreground/60 text-muted-foreground size-8 transition ease-out active:scale-95"
                    icon={icon}
                  />
                </li>
              </a>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {navItems.map(navItem => (
            <ul key={navItem.group} className="space-y-2">
              <li>
                <h3 className={titleStyle}>{navItem.group}</h3>
              </li>
              {navItem.items.map(item => (
                <li
                  key={item.name}
                  className="opacity-60 transition hover:opacity-100"
                >
                  <Link to={item.href} className={navItemStyle}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </div>

        <div className="flex flex-col space-y-2">
          <h3 className={titleStyle}>{m['footer.address.title']()}</h3>
          <p className="text-muted-foreground text-sm">
            Jl. Terusan Dieng No.57-59, Pisang Candi, Kec. Sukun, Kota Malang,
            Jawa Timur 65146.
          </p>
        </div>
      </div>
      <div className="flex w-full items-center justify-end">
        <p className="text-muted-foreground text-xs">
          &copy; {new Date().getFullYear()} Indevpro. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
