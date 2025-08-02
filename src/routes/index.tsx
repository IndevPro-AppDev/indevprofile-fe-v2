import { createFileRoute } from '@tanstack/react-router'

import HomePage from '~/components/home/page'
import { HydrateClient, prefetch } from '~/lib/trpc/react'

export const Route = createFileRoute('/')({
  loader: ({ context: { trpc } }) => {
    prefetch(trpc.members.structural.queryOptions())
  },
  component: RouteComponent
})

function RouteComponent() {
  return (
    <HydrateClient>
      <HomePage />
    </HydrateClient>
  )
}
