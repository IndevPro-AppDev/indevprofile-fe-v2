import { Icon } from '@iconify/react'
import { Link } from '@tanstack/react-router'
import { motion } from 'motion/react'

import { m } from '~/paraglide/messages'

import { navItemStyle } from './header/nav-item'
import HomeLink from './home-link'

export default function Footer() {
  const navItems = [
    { group: m['nav.about'](), items: [{ name: 'Our Teams', href: '/' }] },
    {
      group: m['nav.blog'](),
      items: [
        { name: 'Blog 1', href: '/' },
        { name: 'Blog 2', href: '/' },
        { name: 'Blog 3', href: '/' }
      ]
    },
    {
      group: m['nav.portfolio'](),
      items: [
        { name: 'Portfolio 1', href: '/' },
        { name: 'Portfolio 2', href: '/' },
        { name: 'Portfolio 3', href: '/' }
      ]
    },
    {
      group: m['nav.contact'](),
      items: [
        { name: 'Email', href: '/' },
        { name: 'FAQ', href: '/' }
      ]
    }
  ]

  return (
    <footer className="mx-auto w-full max-w-screen-xl space-y-6 px-6 pb-6">
      <div className="border-foreground/60 grid w-full grid-cols-1 gap-6 border-b py-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col space-y-4">
          <HomeLink />
          <motion.p
            className="text-muted-foreground text-sm"
            initial={{ opacity: 0, y: -6 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            viewport={{ once: true }}
            transition={{
              stiffness: 569,
              damping: 61,
              mass: 4,
              delay: 0.15
            }}
          >
            {m['footer.description']()}
          </motion.p>
          <ul className="flex items-center space-x-2">
            {[
              { href: '#', icon: 'ph:instagram-logo-fill' },
              { href: '#', icon: 'mage:linkedin' },
              { href: '#', icon: 'ant-design:github-filled' }
            ].map(({ href, icon }) => (
              <motion.a
                key={icon}
                href={href}
                onClick={e => e.preventDefault()}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                initial={{
                  opacity: 0,
                  y: -10,
                  scale: 0.98
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1
                }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                viewport={{ once: true }}
                transition={{
                  stiffness: 24,
                  damping: 6,
                  mass: 0.2,
                  delay: 0.15
                }}
              >
                <li>
                  <Icon
                    className="hover:text-foreground/80 active:text-foreground/60 text-muted-foreground size-8 transition ease-out active:scale-95"
                    icon={icon}
                  />
                </li>
              </motion.a>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-2 lg:grid-cols-3 xl:grid-cols-4">
          {navItems.map((navItem, index) => (
            <ul key={navItem.group} className="space-y-2">
              <li>
                <motion.h3
                  className="font-display text-lg"
                  initial={{ opacity: 0, filter: 'blur(4px)', y: -6 }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -6 }}
                  viewport={{ once: true }}
                  transition={{
                    stiffness: 569,
                    damping: 61,
                    mass: 4,
                    delay: 0.15 + index * 0.05
                  }}
                >
                  {navItem.group}
                </motion.h3>
              </li>
              {navItem.items.map((item, itemIndex) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, y: -6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  viewport={{ once: true }}
                  transition={{
                    stiffness: 569,
                    damping: 61,
                    mass: 4,
                    delay: 0.15 + index * 0.05 + itemIndex * 0.02
                  }}
                >
                  <Link to={item.href} className={navItemStyle}>
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          ))}
        </div>

        <div className="flex flex-col space-y-2">
          <motion.h3
            className="font-display text-lg"
            initial={{ opacity: 0, filter: 'blur(4px)', y: -6 }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -6 }}
            viewport={{ once: true }}
            transition={{
              stiffness: 569,
              damping: 61,
              mass: 4,
              delay: 0.15
            }}
          >
            {m['footer.address.title']()}
          </motion.h3>
          <motion.p
            className="text-muted-foreground max-w-[32ch] text-sm"
            initial={{ opacity: 0, y: -6 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            viewport={{ once: true }}
            transition={{
              stiffness: 569,
              damping: 61,
              mass: 4,
              delay: 0.15
            }}
          >
            Jl. Terusan Dieng No.57-59, Pisang Candi, Kec. Sukun, Kota Malang,
            Jawa Timur 65146.
          </motion.p>
        </div>
      </div>
      <div className="flex w-full items-center justify-end">
        <motion.p
          className="text-muted-foreground text-xs"
          initial={{ opacity: 0, filter: 'blur(4px)', y: -6 }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -6 }}
          viewport={{ once: true }}
          transition={{
            stiffness: 569,
            damping: 61,
            mass: 4,
            delay: 0.15
          }}
        >
          &copy; {new Date().getFullYear()} Indevpro. All rights reserved.
        </motion.p>
      </div>
    </footer>
  )
}
