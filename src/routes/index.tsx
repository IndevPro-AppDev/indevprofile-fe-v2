import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'motion/react'

import EventAlert from '~/components/home/event-alert'
import HeroTitle from '~/components/home/hero-title'
import IndevproScene from '~/components/indevpro-scene'
import GradientCard from '~/components/ui/gradient-card'
import { cn } from '~/lib/utils'
import { m } from '~/paraglide/messages'
// import LogoMarquee from '~/components/marquee/logo-marquee'

export const Route = createFileRoute('/')({
  component: RouteComponent
})

const cardTitleStyle = cn(
  'font-display text-left text-2xl',
  'bg-clip-text text-transparent',
  'from-primary-gradient-start to-primary-gradient-end bg-gradient-to-br'
)

function RouteComponent() {
  return (
    <div className="relative w-full max-w-screen overflow-x-hidden">
      <section className="flex h-[calc(100dvh-calc(var(--spacing)*14))] items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div
            id="3d-scene"
            className="relative mx-auto flex size-64 items-center justify-center overflow-visible bg-transparent"
          >
            <motion.div
              className="absolute top-0 left-0 h-full w-full bg-transparent"
              initial={{ opacity: 0, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, filter: 'blur(0)' }}
              viewport={{ once: true }}
              transition={{ stiffness: 24, damping: 6, mass: 0.2, delay: 0.15 }}
            >
              <IndevproScene />
            </motion.div>
          </div>
          <div className="flex flex-col justify-center space-y-2 px-6 md:col-span-2">
            <EventAlert />
            <HeroTitle />
            <p className="text-muted-foreground text-center md:text-left">
              {m['home.hero.subtitle']()}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-screen-xl">
        <div className="grid w-full grid-cols-1 gap-6 px-6 md:min-h-56 md:grid-cols-2 md:grid-rows-3">
          <div className="space-y-6">
            <GradientCard>
              <h2 className={cn(cardTitleStyle, 'px-6')}>Tentang Indevpro</h2>
              <p className="text-muted-foreground px-6">
                INDEVPRO adalah organisasi yang berada di bawah naungan Fakultas
                Teknologi Informasi, Universitas Merdeka Malang sebagai wadah
                bagi mahasiswa untuk mengembangkan minat, kreativitas, dan
                kemampuan di bidang teknologi.
              </p>
            </GradientCard>
            <GradientCard>
              <h2 className={cn(cardTitleStyle, 'px-6')}>Tim Kami</h2>
              <p className="text-muted-foreground px-6">
                Dari ide sederhana menuju karya luar biasa
              </p>
            </GradientCard>
            <GradientCard>
              <h2 className={cn(cardTitleStyle, 'px-6')}>Kontak Kami</h2>
              <p className="text-muted-foreground px-6">
                Kami selalu terbuka untuk menerima pertanyaan, masukan, atau
                saran dari kamu. tim kami akan segera merespons dengan senang
                hati.
              </p>
            </GradientCard>
          </div>
          <div className="space-y-6">
            <GradientCard className="h-full">
              <h2 className={cn(cardTitleStyle, 'px-6')}>Kontak Kami</h2>
              <p className="text-muted-foreground px-6">
                Kami selalu terbuka untuk menerima pertanyaan, masukan, atau
                saran dari kamu. tim kami akan segera merespons dengan senang
                hati.
              </p>
            </GradientCard>
          </div>
        </div>
      </section>

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
