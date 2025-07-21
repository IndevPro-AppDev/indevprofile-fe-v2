import { useMemo, useRef, useState } from 'react'
import Masonry from 'react-responsive-masonry'

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
import { cn } from '~/lib/utils'
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
  const ITEM_COUNT = 3
  const items = useMemo(() => {
    const baseItems = Array.from(
      { length: ITEM_COUNT * 5 },
      (_, i) => i % ITEM_COUNT
    )
    return [...baseItems, ...baseItems]
  }, [])

  const contentRef = useRef<HTMLDivElement>(null)

  const marqueeY = useMotionValue(0)
  const [isHovered, setIsHovered] = useState(false)
  const [hoveredCards, setHoveredCards] = useState<Set<number>>(() => new Set())

  useAnimationFrame((_t, delta) => {
    if (isHovered) return

    const speed = 36
    const pxPerMs = speed / 1000

    marqueeY.set(marqueeY.get() - delta * pxPerMs)

    const height = contentRef.current?.scrollHeight ?? 0
    const halfHeight = height / 2

    if (marqueeY.get() <= -halfHeight) {
      marqueeY.set(0)
    }
  })

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
        className="no-scrollbar z-0 h-64 overflow-hidden md:h-full"
      >
        <motion.div
          style={{ y: marqueeY }}
          className="absolute inset-0 h-auto max-h-none w-full px-6 will-change-transform"
        >
          <Masonry columnsCount={2} gutter="1rem" className="py-6">
            {items.map((_, i) => (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={`activity-${i}`}
                className={cn(
                  'bg-primary/10 relative w-full overflow-hidden rounded-sm transition delay-75 duration-300 ease-out',
                  i % 2 === 0 ? 'aspect-square' : 'aspect-[9/16]'
                )}
                onMouseEnter={() => {
                  setIsHovered(true)
                  setHoveredCards(prev => {
                    const newSet = new Set(prev)
                    newSet.add(i)
                    return newSet
                  })
                }}
                onMouseLeave={() => {
                  setIsHovered(false)
                  setHoveredCards(prev => {
                    const newSet = new Set(prev)
                    newSet.delete(i)
                    return newSet
                  })
                }}
              >
                <img
                  src={`https://placehold.co/${i % 2 === 0 ? '400' : '400x600'}`}
                  className="z-0 h-full w-full object-cover"
                />
                <div
                  className={cn(
                    'absolute inset-0 z-10 flex flex-col items-start justify-end p-4 transition duration-300 ease-in-out',
                    'from-primary-gradient-end/50 to-primary-gradient-end/80 dark:text-foreground text-background rounded-sm bg-gradient-to-b',
                    hoveredCards.has(i)
                      ? 'opacity-100 backdrop-blur-[2px]'
                      : 'opacity-0 backdrop-blur-none'
                  )}
                >
                  <h3 className="font-display text-base font-bold md:text-lg">
                    3CC 2025
                  </h3>
                  <p className="line-clamp-4 text-xs opacity-80">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Consequatur neque perferendis praesentium totam quas
                    necessitatibus quos blanditiis magni aspernatur ab!
                  </p>
                </div>
              </div>
            ))}
          </Masonry>
        </motion.div>
      </GradientCardContent>
    </GradientCard>
  )
}
