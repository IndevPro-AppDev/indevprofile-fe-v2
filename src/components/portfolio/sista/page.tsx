import CodeIcon from '~/components/icons/code'
import { m } from '~/paraglide/messages'

import SistaMacbook from './assets/sista-macbook.webp'
import SistaPlatforms from './assets/sista-platforms.webp'
import HeroSubTitle from './hero-sub-title'

export default function PortfolioDetailSistaPage() {
  return (
    <div className="text-primary relative mb-16 flex w-full flex-col items-center">
      <section className="relative container mx-auto flex flex-col items-center justify-center gap-8 overflow-x-hidden px-6 py-16 text-center md:flex-row">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-muted-foreground/20 pointer-events-none relative -translate-y-16 text-center text-[9rem] font-bold uppercase md:-translate-y-24 md:text-[16rem] lg:text-[20rem] xl:text-[24rem]">
            Sista
          </div>
        </div>
        <div className="flex flex-col items-center justify-center pt-24">
          <img
            src={SistaPlatforms}
            alt="Sista Platforms"
            className="border-muted-foreground/20 w-full max-w-2xl drop-shadow-2xl"
          />
        </div>
      </section>

      <section className="flex flex-col items-center space-y-6 px-6 py-8 text-center">
        <span className="border-foreground flex items-center justify-center gap-2 rounded-full border px-4 py-1 text-xs tracking-wider">
          <CodeIcon className="h-4 w-4" />
          <span>Software Development</span>
        </span>
        <div className="flex flex-col items-center justify-center space-y-4">
          <HeroSubTitle />
          <p className="max-w-lg text-sm">
            {m['portfolio_detail.sista.subtitle']()}
          </p>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center">
        <img
          src={SistaMacbook}
          alt="Sista Macbook"
          className="border-muted-foreground/20 w-full max-w-2xl drop-shadow-2xl"
        />
      </section>
    </div>
  )
}
