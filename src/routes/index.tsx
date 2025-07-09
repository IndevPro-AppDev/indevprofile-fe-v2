import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'motion/react'

import IndevproScene from '~/components/indevpro-scene'
// import LogoMarquee from '~/components/marquee/logo-marquee'

export const Route = createFileRoute('/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div className="relative w-full max-w-screen overflow-x-hidden">
      <section className="flex h-[calc(100dvh-calc(var(--spacing)*14))] items-center justify-center">
        <div
          id="3d-scene"
          className="relative mx-auto h-72 w-72 overflow-visible"
        >
          <motion.div
            className="absolute top-0 left-0 h-full w-full overflow-visible"
            initial={{ opacity: 0, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, filter: 'blur(0)' }}
            exit={{ opacity: 0 }}
            viewport={{ once: true }}
          >
            <IndevproScene />
          </motion.div>
        </div>
      </section>

      <section className="h-dvh"></section>
      <section className="h-dvh"></section>
      {/* 
      <LogoMarquee
        logos={[
          '/logo/indevpro-logo.svg',
          '/logo/FTI-logo.svg',
          '/logo/FTI-logo2.svg',
          '/logo/unmer-logo.svg',
          '/logo/Universitas-Merdeka-1.svg'
        ]}
      /> */}
    </div>
  )
}
