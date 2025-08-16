import { useEffect, useState } from 'react'

import type { CarouselApi } from '~/components/ui/carousel'

import GalleryCard from '~/components/portfolio/student-mobile/gallery-card'
import HeroSubTitle from '~/components/portfolio/student-mobile/hero-sub-title'
import HeroTitle from '~/components/portfolio/student-mobile/hero-title'
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '~/components/ui/carousel'

import PaletteIcon from '../../icons/palette'

export default function StudentMobilePage() {
  const gallery = [
    { id: 1, imgSrc: '/images/portfolio/phone3.png', alt: 'Screen 1' },
    { id: 2, imgSrc: '/images/portfolio/phone3.png', alt: 'Screen 2' },
    { id: 3, imgSrc: '/images/portfolio/phone3.png', alt: 'Screen 3' },
    { id: 4, imgSrc: '/images/portfolio/phone3.png', alt: 'Screen 4' }
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
  }, [api, selectedIndex])

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
    <main className="text-primary relative mb-16 flex w-full flex-col items-center">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center gap-8 px-6 py-16 text-center md:flex-row md:gap-12 md:px-20">
        <div className="flex flex-col items-center md:items-start">
          <HeroTitle />
        </div>
        <div className="flex justify-center">
          <img
            src="/images/portfolio/phone1.png"
            alt="App screen"
            className="h-auto w-[240px] drop-shadow-xl sm:w-[300px] md:w-[380px] lg:w-[450px] xl:w-[500px]"
          />
        </div>
      </section>

      {/* Section Title */}
      <section className="flex flex-col items-center py-8 text-center">
        <span className="border-foreground flex items-center justify-center gap-2 rounded-full border px-4 py-1 text-xs tracking-wider">
          <PaletteIcon className="h-4 w-4" />
          <span>UI/UX</span>
        </span>
        <div className="flex flex-col items-center gap-0">
          <HeroSubTitle />
          <p className="max-w-lg">
            Meningkatkan pengalaman akademis Mahasiswa dengan Student Mobile!
          </p>
        </div>
      </section>

      {/* Description */}
      <section className="flex flex-col items-center justify-center gap-10 px-6 py-16 md:flex-row md:px-20">
        <div className="flex justify-center">
          <img
            src="/images/portfolio/phone2.png"
            alt="App screen"
            className="h-auto w-[320px] drop-shadow-xl md:w-[450px]"
          />
        </div>
        <p className="text-primary max-w-lg text-right">
          Student Mobile adalah sebuah aplikasi yang dirancang untuk memudahkan
          mahasiswa dalam mengelola pengalaman akademik mereka. Dengan
          fitur-fitur unggulan seperti pelacakan poin, pembaruan jadwal, dan
          pengecekan ketersediaan ruang kelas, Student Mobile memungkinkan
          mahasiswa untuk tetap terorganisir dan efisien.
        </p>
      </section>

      {/* Gallery Carousel */}
      <section className="relative mx-auto w-full py-16">
        <Carousel
          setApi={setApi}
          opts={{ align: 'center', loop: true }}
          className="flex h-[420px] items-center justify-center px-4 sm:h-[500px] md:h-[560px] md:px-8 lg:px-12"
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
    </main>
  )
}
