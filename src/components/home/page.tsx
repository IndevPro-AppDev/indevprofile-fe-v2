import { useMemo } from 'react'

import { useQuery } from '@tanstack/react-query'
import { motion } from 'motion/react'
import { match } from 'ts-pattern'

import type { Team } from '~/components/home/bento/team/pictures'

import LearnMoreButton from '~/components/home/bento/about/learn-more-button'
import ActivitiesMasonryGrid from '~/components/home/bento/activities'
import ContactForm from '~/components/home/bento/contact/form'
import { TeamPictures } from '~/components/home/bento/team/pictures'
import EventAlert from '~/components/home/event-alert'
import HeroTitle from '~/components/home/hero-title'
import IndevproScene from '~/components/indevpro-scene'
import {
  GradientCard,
  GradientCardContent,
  GradientCardDescription,
  GradientCardFooter,
  GradientCardHeader,
  GradientCardTitle
} from '~/components/ui/gradient-card'
import { useTRPC } from '~/lib/trpc/react'
import { m } from '~/paraglide/messages'

export default function HomePage() {
  return (
    <div className="relative w-full max-w-screen overflow-x-hidden">
      <section className="flex h-[calc(100dvh-calc(var(--spacing)*14))] items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div
            id="3d-scene"
            className="relative mx-auto flex size-64 items-center justify-center overflow-visible bg-transparent"
          >
            <motion.div
              className="absolute top-0 left-0 h-full w-full bg-transparent"
              initial={{ opacity: 0, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, filter: 'blur(0)' }}
              viewport={{ once: true }}
              transition={{ stiffness: 24, damping: 6, mass: 0.2, delay: 0.15 }}
            >
              <IndevproScene />
            </motion.div>
          </div>
          <div className="flex flex-col justify-center space-y-2 px-6 md:col-span-2">
            <EventAlert />
            <HeroTitle />
            <p className="text-muted-foreground text-center md:text-left">
              {m['home.hero.subtitle']()}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto flex min-h-dvh w-full max-w-screen-xl items-center justify-center py-6">
        <div className="grid w-full grid-cols-1 gap-6 px-6 md:min-h-56 md:grid-cols-2">
          <div className="grid gap-6 md:grid-rows-3">
            <GradientCard>
              <GradientCardHeader>
                <GradientCardTitle>
                  {m['home.cards.about.title']()}
                </GradientCardTitle>
                <GradientCardDescription>
                  {m['home.cards.about.description']()}
                </GradientCardDescription>
              </GradientCardHeader>
              <GradientCardContent>
                <GradientCardFooter>
                  <LearnMoreButton />
                </GradientCardFooter>
              </GradientCardContent>
            </GradientCard>
            <BentoTeams />
            <GradientCard>
              <GradientCardHeader>
                <GradientCardTitle>
                  {m['home.cards.contact.title']()}
                </GradientCardTitle>
                <GradientCardDescription>
                  {m['home.cards.contact.description']()}
                </GradientCardDescription>
              </GradientCardHeader>
              <GradientCardContent>
                <GradientCardFooter>
                  <ContactForm />
                </GradientCardFooter>
              </GradientCardContent>
            </GradientCard>
          </div>
          <div className="space-y-6">
            <ActivitiesMasonryGrid />
          </div>
        </div>
      </section>
    </div>
  )
}

function BentoTeams() {
  const trpc = useTRPC()
  const { data, isFetching } = useQuery(
    trpc.members.structural.queryOptions(undefined, {
      refetchOnWindowFocus: false
    })
  )

  const members: Team[] = useMemo(() => {
    return (data ?? []).map(member => ({
      id: member.id,
      name: member.name,
      department: match(member.department)
        .when(
          val => val === 'PIC',
          () => `PIC ${member.division.name}`
        )
        .otherwise(() => member.department),
      imageUrl: member.image.front
    }))
  }, [data])

  return (
    <GradientCard>
      <GradientCardHeader>
        <GradientCardTitle>{m['home.cards.teams.title']()}</GradientCardTitle>
        <GradientCardDescription>
          {m['home.cards.teams.description']()}
        </GradientCardDescription>
        <GradientCardContent className="px-0">
          <GradientCardFooter>
            <TeamPictures
              members={members}
              membersTotal={34}
              isLoading={!members || isFetching}
            />
          </GradientCardFooter>
        </GradientCardContent>
      </GradientCardHeader>
    </GradientCard>
  )
}
