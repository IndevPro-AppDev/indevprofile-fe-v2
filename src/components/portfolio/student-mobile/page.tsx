import { useEffect, useState } from 'react'

import type { CarouselApi } from '~/components/ui/carousel'

import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '~/components/ui/carousel'
import { m } from '~/paraglide/messages'

import PaletteIcon from '../../icons/palette'
import PictDemo1 from './assets/pict-demo-1.webp'
import PictDemo2 from './assets/pict-demo-2.webp'
import PictDemo3 from './assets/pict-demo-3.webp'
import PictDemo4 from './assets/pict-demo-4.webp'
import PictDesc from './assets/pict-desc.webp'
import PictHero from './assets/pict-hero.webp'
import GalleryCard from './gallery-card'
import HeroSubTitle from './hero-sub-title'
import HeroTitle from './hero-title'

export default function StudentMobilePage() {
  const gallery = [
    { id: 1, imgSrc: PictDemo1, alt: 'Screen 1' },
    { id: 2, imgSrc: PictDemo2, alt: 'Screen 2' },
    { id: 3, imgSrc: PictDemo3, alt: 'Screen 3' },
    { id: 4, imgSrc: PictDemo4, alt: 'Screen 4' }
  ]

  const [api, setApi] = useState<CarouselApi | null>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    if (!api) return

    const interval = setInterval(() => {
      if (selectedIndex === gallery.length - 1) {
        api.scrollTo(0)
      } else {
        api.scrollNext()
      }
    }, 3000)
    return () => clearInterval(interval)
  }, [api, gallery.length, selectedIndex])

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
    <div className="text-primary relative mb-16 flex w-full flex-col items-center">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center gap-8 px-6 py-16 text-center md:flex-row">
        <div className="flex flex-col items-center md:items-start">
          <HeroTitle />
        </div>
        <div className="flex justify-center">
          <img
            src={PictHero}
            alt="App screen"
            className="h-auto w-full drop-shadow-xl md:w-[50vw] lg:w-[45vw]"
          />
        </div>
      </section>

      {/* Section Title */}
      <section className="flex flex-col items-center space-y-6 px-6 py-8 text-center">
        <span className="border-foreground flex items-center justify-center gap-2 rounded-full border px-4 py-1 text-xs tracking-wider">
          <PaletteIcon className="h-4 w-4" />
          <span>UI/UX</span>
        </span>
        <div className="flex flex-col items-center space-y-4">
          <HeroSubTitle />
          <p className="max-w-lg text-sm">
            {m['portfolio_detail.student_mobile.subtitle']()}
          </p>
        </div>
      </section>

      {/* Description */}
      <section className="grid grid-cols-1 gap-6 px-6 py-10 md:grid-cols-2">
        <div className="flex justify-center">
          <img
            src={PictDesc}
            alt="App screen"
            className="h-auto w-full drop-shadow-xl md:w-[50vw] lg:w-[45vw]"
          />
        </div>
        <p className="text-primary my-auto max-w-[56ch] text-center text-sm md:text-left lg:text-base">
          {m['portfolio_detail.student_mobile.description']()}
        </p>
      </section>

      {/* Gallery Carousel */}
      <section className="relative mx-auto w-full py-16">
        <Carousel
          setApi={setApi}
          opts={{ align: 'center', loop: true }}
          className="flex items-center justify-center"
        >
          <CarouselContent className="gap-4 overflow-visible">
            {gallery.map((item, index) => (
              <CarouselItem
                key={item.id}
                className="flex basis-2/3 justify-center sm:basis-1/3"
              >
                <GalleryCard
                  imgSrc={item.imgSrc}
                  alt={item.alt}
                  isCenter={selectedIndex === index}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>
    </div>
  )
}
