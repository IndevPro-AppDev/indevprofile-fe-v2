import Image from 'next/image'

import bgGradientImage from '~/res/drawable/landing-bg-grainny-gradient.webp'

export default function Home() {
  return (
    <div className="relative w-full max-w-screen overflow-x-hidden">
      <section className="flex h-[calc(100dvh-calc(var(--spacing)*14))] items-center justify-center"></section>
      <section className="h-dvh"></section>
      <section className="h-dvh"></section>
      <div className="pointer-events-none absolute inset-0 -z-1 pt-16">
        <Image
          src={bgGradientImage}
          alt="Background gradient"
          fill
          className="relative object-cover opacity-20 bg-blend-overlay"
          priority
        />
      </div>
    </div>
  )
}
