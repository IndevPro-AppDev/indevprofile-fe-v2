/* eslint-disable react-hooks-extra/no-direct-set-state-in-use-effect */
import { useEffect, useState } from 'react'

import { createFileRoute } from '@tanstack/react-router'
import { motion, useMotionTemplate } from 'motion/react'

import type { CarouselApi } from '~/components/ui/carousel'

import PortfolioCard from '~/components/portfolio/portfolio-card'
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '~/components/ui/carousel'
import { cn } from '~/lib/utils'

export const Route = createFileRoute('/portfolio')({
  component: PortfolioPage
})

export default PortfolioPage

const projects: {
  id: number
  title: string
  desc: string
  imgSrc: string
}[] = [
  {
    id: 1,
    title: 'Project One',
    desc: 'Lorem ipsum dolor sit amet.',
    imgSrc: 'https://placehold.co/600x400.png'
  },
  {
    id: 2,
    title: 'Project Two',
    desc: 'Consectetur adipiscing elit.',
    imgSrc: 'https://placehold.co/600x400.png'
  },
  {
    id: 3,
    title: 'Project Three',
    desc: 'Sed do eiusmod tempor incididunt.',
    imgSrc: 'https://placehold.co/600x400.png'
  },
  {
    id: 4,
    title: 'Project Four',
    desc: 'Ut enim ad minim veniam.',
    imgSrc: 'https://placehold.co/600x400.png'
  },
  {
    id: 5,
    title: 'Project Five',
    desc: 'Duis aute irure dolor.',
    imgSrc: 'https://placehold.co/600x400.png'
  }
]

function PortfolioPage() {
  const [api, setApi] = useState<CarouselApi | null>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const gradient = useMotionTemplate`
    linear-gradient(
      to bottom right,
      var(--primary-gradient-start),
      var(--primary-gradient-end)
    )`

  useEffect(() => {
    if (!api) return

    const interval = setInterval(() => api.scrollNext(), 3500)
    return () => clearInterval(interval)
  }, [api])

  useEffect(() => {
    if (!api) return

    const onSelect = () => setSelectedIndex(api.selectedScrollSnap())
    api.on('select', onSelect)
    onSelect()

    return () => {
      api.off('select', onSelect)
    }
  }, [api])

  return (
    <main className="flex flex-col items-center gap-6 overflow-hidden px-2 py-6 md:gap-12 md:px-4 md:py-12">
      <section className="mx-auto flex w-full max-w-screen-xl flex-col gap-4 text-center md:gap-6">
        <motion.h1
          className={cn(
            'mx-auto bg-clip-text text-center text-2xl font-bold text-transparent md:text-5xl'
          )}
          style={{ backgroundImage: gradient }}
        >
          Portfolio
        </motion.h1>

        <p className="text-muted-foreground mx-auto max-w-[90ch] space-y-10 text-center text-xs leading-relaxed md:text-sm">
          INDEVPRO adalah organisasi mahasiswa di bawah naungan Fakultas
          Teknologi Informasi, Universitas Merdeka Malang. Kami hadir sebagai
          wadah bagi mahasiswa untuk mengembangkan minat, kreativitas, dan
          kemampuan di bidang teknologi. <br />
          <br /> Lewat berbagai pelatihan intensif, pengembangan proyek
          kolaboratif, dan jembatan ke industri, INDEVPRO membekali mahasiswa
          dengan keterampilan praktis dan pengalaman yang relevan. Di sini, kami
          berkomitmen penuh untuk mempersiapkan mahasiswa menjadi talenta
          profesional yang siap bersaing di dunia kerja.
        </p>
      </section>

      <section className="relative mx-auto mb-6 w-full max-w-screen-xl overflow-hidden">
        <Carousel
          setApi={setApi}
          className="mx-auto w-full max-w-screen-xl"
          opts={{
            loop: true,
            align: 'center',
            dragFree: false
          }}
        >
          <CarouselContent className="-ml-1 flex md:-ml-2">
            {projects.map((project, index) => (
              <CarouselItem
                key={project.id}
                className="flex items-center justify-center"
                style={{
                  flex: '0 0 clamp(200px, 40vw, 717px)'
                }}
              >
                <PortfolioCard
                  title={project.title}
                  desc={project.desc}
                  imgSrc={project.imgSrc}
                  isCenter={selectedIndex === index}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>
    </main>
  )
}
