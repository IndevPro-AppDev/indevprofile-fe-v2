import { createFileRoute } from '@tanstack/react-router'

import MembersGrid from '~/components/about/sections/grid'
import HeroTitle from '~/components/about/sections/hero-title'
import { HydrateClient, prefetch } from '~/lib/trpc/react'
import { m } from '~/paraglide/messages'

export const Route = createFileRoute('/about')({
  beforeLoad: ({ context: { trpc } }) => {
    prefetch(trpc.members.all.queryOptions({}))
  },
  component: RouteComponent
})

function RouteComponent() {
  return (
    <HydrateClient>
      <AboutPage />
    </HydrateClient>
  )
}

function AboutPage() {
  return (
    <div className="relative container mx-auto mb-16 w-full overflow-x-hidden">
      <section className="flex w-full flex-col items-center px-6 pt-16">
        <HeroTitle />
        <p className="text-muted-foreground mt-6 max-w-[86ch] text-center text-xs md:text-sm">
          {m['about.description']()}
        </p>
      </section>

      <section className="mt-16 grid grid-cols-2 gap-4 px-6 md:grid-cols-3 lg:grid-cols-4">
        <MembersGrid />
      </section>
    </div>
  )
}
