import { useMemo, useRef, useState } from 'react'
import Masonry from 'react-masonry-css'

import { motion, useAnimationFrame, useMotionValue } from 'motion/react'

import {
  GradientCard,
  GradientCardContent,
  GradientCardDescription,
  GradientCardHeader,
  GradientCardTitle
} from '~/components/ui/gradient-card'
import { cn } from '~/lib/utils'
import { m } from '~/paraglide/messages'

export default function ActivitiesMasonryGrid() {
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

    const [hoveredCards, setHoveredCards] = useState<Set<number>>(() => new Set())

  const handleCardMouseEnter = (index: number) => {
    setIsHovered(true)
    setHoveredCards(prev => new Set(prev).add(index))
  }

  const handleCardMouseLeave = (index: number) => {
    setIsHovered(false)
    setHoveredCards(prev => {
      const newSet = new Set(prev)
      newSet.delete(index)
      return newSet
    })
  }

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
          <Masonry
            breakpointCols={2}
            className="-ml-4 flex w-auto"
            columnClassName="pl-4"
            style={{ backgroundClip: 'padding-box' }}
          >
            {items.map((_, i) => (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={`activity-${i}`}
                className={cn(
                  'bg-primary/10 relative mb-4 w-full overflow-hidden rounded-sm transition delay-75 duration-300 ease-out',
                  i % 2 === 0 ? 'aspect-square' : 'aspect-[9/16]'
                )}
                onMouseEnter={() => handleCardMouseEnter(i)}
                onMouseLeave={() => handleCardMouseLeave(i)}
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
