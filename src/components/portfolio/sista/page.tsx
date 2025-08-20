import { motion } from 'motion/react'

import CodeIcon from '~/components/icons/code'
import { Button } from '~/components/ui/button'
import { cn } from '~/lib/utils'
import { m } from '~/paraglide/messages'

import SistaMacbook from './assets/sista-macbook.webp'
import SistaPlatforms from './assets/sista-platforms.webp'
import HeroSubTitle from './hero-sub-title'

export default function PortfolioDetailSistaPage() {
  return (
    <div className="text-primary relative mb-16 flex w-full flex-col items-center">
      <section className="relative container mx-auto flex h-dvh flex-col items-center justify-center gap-8 overflow-x-hidden px-6 py-16 text-center md:flex-row">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-muted-foreground/20 pointer-events-none relative -translate-y-16 text-center text-[9rem] font-bold uppercase md:-translate-y-24 md:text-[16rem] lg:text-[20rem] xl:text-[24rem]">
            Sista
          </div>
        </div>
        <motion.div
          className="flex flex-col items-center justify-center pt-24"
          whileInView={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
          initial={{ opacity: 0, scale: 0, y: 20, filter: 'blur(6px)' }}
          transition={{ delay: 0.5, stiffness: 180, damping: 20, mass: 0.5 }}
          viewport={{ once: true }}
        >
          <img
            src={SistaPlatforms}
            alt="Sista Platforms"
            className="border-muted-foreground/20 w-full max-w-2xl drop-shadow-2xl"
          />
        </motion.div>
      </section>

      <section className="flex flex-col items-center space-y-6 px-6 py-8 text-center">
        <Button variant="brand">
          <CodeIcon className="size-5" />
          <span
            className={cn(
              'bg-clip-text text-transparent',
              'from-primary to-muted-foreground/60 bg-gradient-to-b'
            )}
          >
            Software Development
          </span>
        </Button>
        <div className="flex flex-col items-center justify-center space-y-4">
          <HeroSubTitle />
          <p className="max-w-lg text-sm">
            {m['portfolio_detail.sista.subtitle']()}
          </p>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center">
        <motion.div
          className="relative h-auto w-full"
          whileInView={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
          initial={{ opacity: 0, scale: 0, y: 20, filter: 'blur(6px)' }}
          transition={{ delay: 0.5, stiffness: 180, damping: 20, mass: 0.5 }}
          viewport={{ once: true }}
        >
          <img
            src={SistaMacbook}
            alt="Sista Macbook"
            className="border-muted-foreground/20 w-full max-w-2xl drop-shadow-2xl"
          />
        </motion.div>
      </section>
    </div>
  )
}
