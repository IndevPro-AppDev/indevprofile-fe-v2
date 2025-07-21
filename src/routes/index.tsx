import { useEffect, useRef, useState } from 'react'

import { createFileRoute } from '@tanstack/react-router'
import { motion, useAnimationFrame, useMotionValue } from 'motion/react'

import EventAlert from '~/components/home/event-alert'
import HeroTitle from '~/components/home/hero-title'
import IndevproScene from '~/components/indevpro-scene'
import {
  GradientCard,
  GradientCardContent,
  GradientCardDescription,
  GradientCardHeader,
  GradientCardTitle
} from '~/components/ui/gradient-card'
import { useIsMobile } from '~/hooks/use-mobile'
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

function ActivitiesMasonryGrid() {
  const isMobile = useIsMobile()

  const items = Array.from({ length: 20 })

  const contentRef = useRef<HTMLDivElement>(null)
  const marqueeY = useMotionValue(0)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const lastScrollTop = useRef(0)
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up')
  const [isScrolling, setIsScrolling] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useAnimationFrame((_t, delta) => {
    if (isScrolling || isHovered) return

    const speed = 20
    const pxPerMs = speed / 1000
    const directionMultiplier = scrollDirection === 'up' ? -1 : 1
    marqueeY.set(marqueeY.get() + delta * pxPerMs * directionMultiplier)

    const height = contentRef.current?.scrollHeight ?? 0
    if (Math.abs(marqueeY.get()) >= height / 2) {
      marqueeY.set(0)
    }
  })

  useEffect(() => {
    const el = contentRef.current
    if (!el) return

    const handleScroll = () => {
      const currentTop = el.scrollTop
      const direction = currentTop > lastScrollTop.current ? 'down' : 'up'
      lastScrollTop.current = currentTop

      setScrollDirection(direction)
      setIsScrolling(true)

      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false)
      }, 500)
    }

    el.addEventListener('scroll', handleScroll)
    return () => {
      el.removeEventListener('scroll', handleScroll)
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
    }
  }, [])

  return (
    <GradientCard className="h-full space-y-0 overflow-hidden py-0">
      <GradientCardHeader className="z-10 pt-6">
        <GradientCardTitle>
          {m['home.cards.activities.title']()}
        </GradientCardTitle>
        <GradientCardDescription>
          {m['home.cards.activities.description']()}
        </GradientCardDescription>
      </GradientCardHeader>
      <GradientCardContent
        ref={contentRef}
        className="z-0 h-64 overflow-y-auto md:h-full"
      >
        <motion.div
          style={{ y: marqueeY }}
          className="absolute inset-0 grid h-auto max-h-none w-full grid-cols-2 gap-2 px-6"
        >
          {[...items, ...items].map((_, i) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={`activity-${i}`}
              className="bg-primary/10 w-full rounded-sm p-4 transition delay-75 duration-300 ease-out"
              onMouseEnter={() => {
                if (isMobile) return
                setIsHovered(true)
              }}
              onMouseLeave={() => setIsHovered(false)}
            >
              test
            </div>
          ))}
        </motion.div>
      </GradientCardContent>
    </GradientCard>
  )
}
