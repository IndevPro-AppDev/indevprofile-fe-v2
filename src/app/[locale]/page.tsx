import LogoMarquee from '../../components/marquee/logo-marquee'
import GradientBackground from './_components/gradient-background'

export default function Home() {
  return (
    <div className="relative w-full max-w-screen overflow-x-hidden">
      <section className="flex h-[calc(100dvh-calc(var(--spacing)*14))] items-center justify-center"></section>
      <section className="h-dvh"></section>
      <section className="h-dvh"></section>
      <LogoMarquee
        logos={[
          'https://cdn.prod.website-files.com/65aebad6eb424b0209ede842/65afaf92263c2c5d3f542556_Frame%2018608.svg',
          'https://cdn.prod.website-files.com/65aebad6eb424b0209ede842/65afaf92263c2c5d3f542559_deloitte.svg',
          'https://cdn.prod.website-files.com/65aebad6eb424b0209ede842/65afaf92263c2c5d3f542554_Amazon%20logo.svg',
          'https://cdn.prod.website-files.com/65aebad6eb424b0209ede842/65afaf92263c2c5d3f54255d_toyota.svg',
          'https://cdn.prod.website-files.com/65aebad6eb424b0209ede842/65afaf92263c2c5d3f542556_Frame%2018608.svg',
          'https://cdn.prod.website-files.com/65aebad6eb424b0209ede842/65afaf92263c2c5d3f542555_Frame%2018610.svg',
          'https://cdn.prod.website-files.com/65aebad6eb424b0209ede842/65afaf92263c2c5d3f542558_Frame%2018611.svg',
          'https://cdn.prod.website-files.com/65aebad6eb424b0209ede842/65afaf92263c2c5d3f542557_Frame%2018612.svg',
          'https://cdn.prod.website-files.com/65aebad6eb424b0209ede842/65afaf92263c2c5d3f54255c_Frame%2018608.svg',
          'https://cdn.prod.website-files.com/65aebad6eb424b0209ede842/65afaf92263c2c5d3f54255b_airbus.svg'
        ]}
        velocity={50}
      />
      <GradientBackground />
    </div>
  )
}
