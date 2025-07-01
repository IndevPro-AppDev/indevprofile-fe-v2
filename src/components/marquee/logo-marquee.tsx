'use client'

import React, { useLayoutEffect, useRef, useState } from 'react'

import {
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity
} from 'framer-motion'
import { motion, useAnimationFrame } from 'motion/react'
import Image from 'next/image'

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

interface ScrollVelocityProps {
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

function useElementWidth<T extends HTMLElement>(
  ref: React.RefObject<T | null>
): number {
  const [width, setWidth] = useState(0)
  useLayoutEffect(() => {
    function updateWidth() {
      if (ref.current) {
        setWidth(ref.current.offsetWidth)
      }
    }
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [ref])
  return width
}

export const LogoMarquee: React.FC<ScrollVelocityProps> = ({
  scrollContainerRef,
  // eslint-disable-next-line react/no-unstable-default-props
  logos = [],
  velocity = 100,
  damping = 50,
  stiffness = 400,
  numCopies = 6,
  // eslint-disable-next-line react/no-unstable-default-props
  velocityMapping = { input: [0, 1000], output: [0, 5] },
  parallaxClassName,
  parallaxStyle,
  scrollerStyle
}) => {
  // eslint-disable-next-line react/no-nested-component-definitions
  function VelocityText({
    children,
    baseVelocity = velocity,
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

  return (
    <section className="py-8">
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
            <Image
              // eslint-disable-next-line react/no-array-index-key
              key={index}
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

export default LogoMarquee
