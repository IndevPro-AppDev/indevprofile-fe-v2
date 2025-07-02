import { Link } from '@tanstack/react-router'
import { motion } from 'motion/react'

import { cn } from '~/lib/utils'

import HomeLink from './home-link'
import IconGithub from './icons/github'
import IconInstagram from './icons/instagram'
import IconLinkedin from './icons/linkedin'

export default function Footer() {
  return (
    <footer className="border-muted/10 w-full border-t bg-gradient-to-r px-8 py-8 text-white">
      <div className="mx-auto max-w-screen-xl px-6">
        <motion.div
          className={cn('grid grid-cols-1 gap-10 py-12 text-sm md:grid-cols-4')}
          layout
        >
          {/* First Group - Brand Info */}
          <div className="space-y-4">
            <HomeLink />
            <p className="text-gray-300">Lorem Ipsum Yapping all the day</p>
            <p className="text-gray-300">Lorem Ipsum Yapping all the day</p>
            <div className="flex space-x-4 pt-2">
              <IconInstagram className="cursor-pointer text-xl transition hover:scale-110" />
              <IconGithub className="cursor-pointer text-xl transition hover:scale-110" />
              <IconLinkedin className="cursor-pointer text-xl transition hover:scale-110" />
            </div>
          </div>

          {/* Navigation Group */}
          <div className="grid gap-x-4 gap-y-4 md:col-span-2 md:grid-cols-4">
            {/* Tentang */}
            <div>
              <h4 className="mb-2 font-semibold">Tentang</h4>
              <ul className="space-y-1 text-gray-300">
                <li>
                  <Link to="/" onClick={e => e.preventDefault()}>
                    Our Teams
                  </Link>
                </li>
              </ul>
            </div>

            {/* Blog */}
            <div>
              <h4 className="mb-2 font-semibold">Blog</h4>
              <ul className="space-y-1 text-gray-300">
                <li>
                  <Link to="/" onClick={e => e.preventDefault()}>
                    Blog Terbaru
                  </Link>
                </li>
                <li>
                  <Link to="/" onClick={e => e.preventDefault()}>
                    Blog Terkait
                  </Link>
                </li>
                <li>
                  <Link to="/" onClick={e => e.preventDefault()}>
                    Blog Trending
                  </Link>
                </li>
              </ul>
            </div>

            {/* Portfolio */}
            <div>
              <h4 className="mb-2 font-semibold">Portfolio</h4>
              <ul className="space-y-1 text-gray-300">
                <li>
                  <Link to="/" onClick={e => e.preventDefault()}>
                    Tim Kami
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Us */}
            <div>
              <h4 className="mb-2 font-semibold">Contact Us</h4>
              <ul className="space-y-1 text-gray-300">
                <li>
                  <Link to="/" onClick={e => e.preventDefault()}>
                    Tim Kami
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Address */}
          <div>
            <h4 className="mb-2 font-semibold">Address</h4>
            <p className="text-gray-300">
              Jl. Terusan Dieng No.57-59, Pisang Candi,
              <br />
              Kec. Sukun, Kota Malang, Jawa Timur 65146
            </p>
          </div>
        </motion.div>

        {/* Copyright section with matching width */}
        <div className="border-muted-foreground/10 border-t py-4 text-center text-xs text-gray-400">
          ©2025 IndevPro. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
