/* eslint-disable react/no-unstable-default-props */
import React, { useRef } from 'react'

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity
} from 'motion/react'

import { useElementWidth } from '~/hooks/use-element-width'

interface LogoMarqueeProps {
  scrollContainerRef?: React.RefObject<HTMLElement>
  logos: string[]
  velocity?: number
  className?: string
  damping?: number
  stiffness?: number
  numCopies?: number
  velocityMapping?: VelocityMapping
  parallaxClassName?: string
  scrollerClassName?: string
  parallaxStyle?: React.CSSProperties
  scrollerStyle?: React.CSSProperties
}

function LogoMarquee({
  scrollContainerRef,
  logos = [],
  velocity = 100,
  damping = 50,
  stiffness = 400,
  numCopies = 6,
  velocityMapping = {
    input: [0, 1000],
    output: [0, 5]
  },
  parallaxClassName,
  parallaxStyle,
  scrollerStyle
}: LogoMarqueeProps) {
  return (
    <section className="space-y-4 py-8">
      <VelocityText
        baseVelocity={velocity}
        scrollContainerRef={scrollContainerRef}
        damping={damping}
        stiffness={stiffness}
        numCopies={numCopies}
        velocityMapping={velocityMapping}
        parallaxClassName={parallaxClassName}
        scrollerClassName="gap-x-8 items-center"
        parallaxStyle={parallaxStyle}
        scrollerStyle={scrollerStyle}
      >
        <div className="flex items-center gap-x-8">
          {logos.map((logoUrl, index) => (
            <img
              key={logoUrl}
              src={logoUrl}
              alt={`Logo ${index}`}
              width={120}
              height={48}
              className="object-contain"
            />
          ))}
        </div>
      </VelocityText>
    </section>
  )
}

interface VelocityMapping {
  input: [number, number]
  output: [number, number]
}

interface VelocityTextProps {
  children: React.ReactNode
  baseVelocity: number
  scrollContainerRef?: React.RefObject<HTMLElement>
  className?: string
  damping?: number
  stiffness?: number
  numCopies?: number
  velocityMapping?: VelocityMapping
  parallaxClassName?: string
  scrollerClassName?: string
  parallaxStyle?: React.CSSProperties
  scrollerStyle?: React.CSSProperties
}

function VelocityText({
  children,
  baseVelocity = 100,
  scrollContainerRef,
  className = '',
  damping,
  stiffness,
  numCopies,
  velocityMapping,
  parallaxClassName,
  scrollerClassName,
  parallaxStyle,
  scrollerStyle
}: VelocityTextProps) {
  const baseX = useMotionValue(0)
  const scrollOptions = scrollContainerRef
    ? { container: scrollContainerRef }
    : {}
  const { scrollY } = useScroll(scrollOptions)
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: damping ?? 50,
    stiffness: stiffness ?? 400
  })
  const velocityFactor = useTransform(
    smoothVelocity,
    velocityMapping?.input || [0, 1000],
    velocityMapping?.output || [0, 5],
    { clamp: false }
  )

  const copyRef = useRef<HTMLSpanElement>(null)
  const copyWidth = useElementWidth(copyRef)

  function wrap(min: number, max: number, v: number): number {
    const range = max - min
    const mod = (((v - min) % range) + range) % range
    return mod + min
  }

  const x = useTransform(baseX, v => {
    if (copyWidth === 0) return '0px'
    return `${wrap(-copyWidth, 0, v)}px`
  })

  const directionFactor = useRef<number>(1)
  useAnimationFrame((_t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000)
    if (velocityFactor.get() < 0) directionFactor.current = -1
    else if (velocityFactor.get() > 0) directionFactor.current = 1
    moveBy += directionFactor.current * moveBy * velocityFactor.get()
    baseX.set(baseX.get() + moveBy)
  })

  const spans = []
  for (let i = 0; i < numCopies!; i++) {
    spans.push(
      <span
        className={`flex-shrink-0 ${className}`}
        key={i}
        ref={i === 0 ? copyRef : null}
      >
        {children}
      </span>
    )
  }

  return (
    <div
      className={`${parallaxClassName} relative overflow-hidden`}
      style={parallaxStyle}
    >
      <motion.div
        className={`${scrollerClassName} flex text-center font-sans text-4xl font-bold tracking-[-0.02em] whitespace-nowrap drop-shadow md:text-[5rem] md:leading-[5rem]`}
        style={{ x, ...scrollerStyle }}
      >
        {spans}
      </motion.div>
    </div>
  )
}

export default LogoMarquee
