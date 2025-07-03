import { Link } from '@tanstack/react-router'
import { motion } from 'motion/react'

import HomeLink from './home-link'
import IconGithub from './icons/github'
import IconInstagram from './icons/instagram'
import IconLinkedin from './icons/linkedin'

function Footer() {
  return (
    <footer className="border-muted/10 text-primary w-full border-t bg-gradient-to-r px-8 py-8">
      <motion.div className="mx-auto max-w-screen-xl" layout>
        <motion.div
          className="grid grid-cols-1 gap-10 py-12 text-sm md:grid-cols-4"
          layout
        >
          <FooterBrand />

          <div className="grid gap-x-4 gap-y-4 md:col-span-2 md:grid-cols-4">
            <FooterNavGroup title="Tentang">
              <FooterLink>Our Teams</FooterLink>
            </FooterNavGroup>

            <FooterNavGroup title="Blog">
              <FooterLink>Blog Terbaru</FooterLink>
              <FooterLink>Blog Terkait</FooterLink>
              <FooterLink>Blog Trending</FooterLink>
            </FooterNavGroup>

            <FooterNavGroup title="Portfolio">
              <FooterLink>Tim Kami</FooterLink>
            </FooterNavGroup>

            <FooterNavGroup title="Contact Us">
              <FooterLink>Tim Kami</FooterLink>
            </FooterNavGroup>
          </div>

          <FooterAddress />
        </motion.div>

        <FooterCopyright />
      </motion.div>
    </footer>
  )
}

function FooterBrand() {
  return (
    <div className="space-y-4">
      <HomeLink />
      <p>Lorem Ipsum Yapping all the day</p>
      <p>Lorem Ipsum Yapping all the day</p>
      <div className="flex space-x-4 pt-2">
        <FooterSocial Icon={IconInstagram} />
        <FooterSocial Icon={IconGithub} />
        <FooterSocial Icon={IconLinkedin} />
      </div>
    </div>
  )
}

function FooterNavGroup({
  title,
  children
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div>
      <h4 className="mb-2 font-semibold">{title}</h4>
      <ul className="space-y-1">{children}</ul>
    </div>
  )
}

function FooterLink({ children }: { children: React.ReactNode }) {
  return (
    <li>
      <Link to="/" onClick={e => e.preventDefault()}>
        {children}
      </Link>
    </li>
  )
}

function FooterAddress() {
  return (
    <div>
      <h4 className="mb-2 font-semibold">Address</h4>
      <p>
        Jl. Terusan Dieng No.57-59, Pisang Candi,
        <br />
        Kec. Sukun, Kota Malang, Jawa Timur 65146
      </p>
    </div>
  )
}

function FooterSocial({
  Icon
}: {
  Icon: React.ComponentType<{ className?: string }>
}) {
  return <Icon className="cursor-pointer text-xl transition hover:scale-110" />
}

function FooterCopyright() {
  return (
    <div className="border-foreground/80 border-t py-4 text-end text-xs">
      ©2025 IndevPro. All rights reserved.
    </div>
  )
}

export default Footer
