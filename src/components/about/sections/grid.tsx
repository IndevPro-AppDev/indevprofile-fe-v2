import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import { useInfiniteQuery } from '@tanstack/react-query'

import { Skeleton } from '~/components/ui/skeleton'
import { useTRPC } from '~/lib/trpc/react'

import MemberCard from '../cards/container'

export default function MembersGrid() {
  const trpc = useTRPC()
  const {
    data,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    isError,
    fetchStatus,
    hasNextPage
  } = useInfiniteQuery(
    trpc.members.all.infiniteQueryOptions(
      {},
      {
        getNextPageParam: lastPage => lastPage.nextCursor,
        refetchOnWindowFocus: false
      }
    )
  )

  const isLoading =
    isFetching || isFetchingNextPage || fetchStatus === 'fetching'
  const members = data?.pages.flatMap(page => page.items) ?? []

  const { inView, ref } = useInView({
    threshold: 0.9,
    skip: isLoading || !hasNextPage,
    delay: 500
  })

  useEffect(() => {
    if (isError) return
    if (isLoading) return
    if (members.length === 0) return
    if (inView) {
      fetchNextPage()
    }
  }, [inView, isLoading, isError, members.length, fetchNextPage])

  const isInitialLoading = isFetching && !isFetchingNextPage
  if (isInitialLoading) {
    return Array.from({ length: 8 }).map((_, index) => (
      <Skeleton
        // eslint-disable-next-line react/no-array-index-key
        key={`bento-card-activity-skeleton-${index}`}
        className="aspect-[3/4] w-full rounded-sm"
      />
    ))
  }

  return (
    <>
      {members.map((member, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <MemberCard key={`bento-card-member-${index}`} member={member} />
      ))}
      {isFetchingNextPage && (
        <Skeleton className="aspect-[3/4] w-full rounded-sm" />
      )}
      <span ref={ref}></span>
    </>
  )
}
