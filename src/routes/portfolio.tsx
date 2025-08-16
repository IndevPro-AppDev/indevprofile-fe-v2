import { useEffect, useState } from 'react'

import type { LinkComponentProps } from '@tanstack/react-router'

import { createFileRoute } from '@tanstack/react-router'

import type { CarouselApi } from '~/components/ui/carousel'

import HeroTitle from '~/components/portfolio/hero-title'
import PortfolioCard from '~/components/portfolio/portfolio-card'
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '~/components/ui/carousel'
import { m } from '~/paraglide/messages'

export const Route = createFileRoute('/portfolio')({
  component: PortfolioPage
})

export default PortfolioPage

function PortfolioPage() {
  const projects: {
    id: number
    title: string
    description: string
    imgSrc: string
    link?: Required<LinkComponentProps['to']>
  }[] = [
    {
      id: 1,
      title: m['portfolio.sista.title'](),
      description: m['portfolio.sista.description'](),
      imgSrc: 'https://ik.imagekit.io/indevpro/portfolio/thumbnail/sista.jpg'
    },
    {
      id: 2,
      title: m['portfolio.student_mobile.title'](),
      description: m['portfolio.student_mobile.description'](),
      imgSrc:
        'https://ik.imagekit.io/indevpro/portfolio/thumbnail/student-mobile.jpg',
      link: '/portfolio/student-mobile'
    },
    {
      id: 3,
      title: m['portfolio.3cc.title'](),
      description: m['portfolio.3cc.description'](),
      imgSrc: 'https://ik.imagekit.io/indevpro/portfolio/thumbnail/3cc.jpg'
    }
  ]

  const [api, setApi] = useState<CarouselApi | null>(null)
  const [selectedIndex, setSelectedIndex] = useState(1)

  useEffect(() => {
    if (!api) return

    const interval = setInterval(() => {
      // should scroll back to first index if project is last
      if (selectedIndex === projects.length - 1) {
        api.scrollTo(0)
      } else {
        api.scrollNext()
      }
    }, 3000)
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api, selectedIndex])

  useEffect(() => {
    if (!api) return

    // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
    const onSelect = () => setSelectedIndex(api.selectedScrollSnap())
    api.on('select', onSelect)
    onSelect()

    return () => {
      api.off('select', onSelect)
    }
  }, [api])

  return (
    <main className="relative mb-16 w-full">
      <section className="container mx-auto mb-10 flex w-full flex-col items-center overflow-x-hidden px-6 pt-16">
        <HeroTitle />
        <p className="text-muted-foreground mt-6 max-w-[86ch] text-center text-xs md:text-sm">
          {m['portfolio.hero.description']()}
        </p>
      </section>

      <section className="relative mx-auto w-full">
        <Carousel
          setApi={setApi}
          className="mx-auto w-full"
          opts={{
            loop: true,
            align: 'center',
            startIndex: 1
          }}
        >
          <CarouselContent className="-ml-1 flex md:-ml-2">
            {projects.map((project, index) => (
              <CarouselItem
                key={project.id}
                className="flex items-center justify-center px-4 md:px-8 lg:px-12"
                style={{
                  flex: '0 0 clamp(25vw, 60vw, 70vw)'
                }}
              >
                <PortfolioCard
                  title={project.title}
                  desc={project.description}
                  imgSrc={project.imgSrc}
                  isCenter={selectedIndex === index}
                  link={project.link}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>
    </main>
  )
}
