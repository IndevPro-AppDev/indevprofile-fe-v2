import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

import { useTRPC } from '~/lib/trpc/react'

export const Route = createFileRoute('/')({
  component: RouteComponent
})

function RouteComponent() {
  const trpc = useTRPC()
  const { data } = useQuery({ ...trpc.ping.queryOptions() })

  return <pre>{JSON.stringify(data, null, 2)}</pre>
}
