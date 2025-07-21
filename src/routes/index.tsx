import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'motion/react'

import ActivitiesMasonryGrid from '~/components/home/bento/activities'
import EventAlert from '~/components/home/event-alert'
import HeroTitle from '~/components/home/hero-title'
import IndevproScene from '~/components/indevpro-scene'
import {
  GradientCard,
  GradientCardDescription,
  GradientCardHeader,
  GradientCardTitle
} from '~/components/ui/gradient-card'
import { m } from '~/paraglide/messages'

// import LogoMarquee from '~/components/marquee/logo-marquee'

export const Route = createFileRoute('/')({
  component: RouteComponent
})

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

      <section className="mx-auto flex min-h-dvh w-full max-w-screen-xl items-center justify-center py-6">
        <div className="grid w-full grid-cols-1 gap-6 px-6 md:min-h-56 md:grid-cols-2">
          <div className="grid gap-6 md:grid-rows-3">
            <GradientCard>
              <GradientCardHeader>
                <GradientCardTitle>
                  {m['home.cards.about.title']()}
                </GradientCardTitle>
                <GradientCardDescription>
                  {m['home.cards.about.description']()}
                </GradientCardDescription>
              </GradientCardHeader>
            </GradientCard>
            <GradientCard>
              <GradientCardHeader>
                <GradientCardTitle>
                  {m['home.cards.teams.title']()}
                </GradientCardTitle>
                <GradientCardDescription>
                  {m['home.cards.teams.description']()}
                </GradientCardDescription>
              </GradientCardHeader>
            </GradientCard>
            <GradientCard>
              <GradientCardHeader>
                <GradientCardTitle>
                  {m['home.cards.contact.title']()}
                </GradientCardTitle>
                <GradientCardDescription>
                  {m['home.cards.contact.description']()}
                </GradientCardDescription>
              </GradientCardHeader>
            </GradientCard>
          </div>
          <div className="space-y-6">
            <ActivitiesMasonryGrid />
          </div>
        </div>
      </section>

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
