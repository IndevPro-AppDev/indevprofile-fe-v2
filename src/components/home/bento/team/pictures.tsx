import { useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'

import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '~/components/ui/tooltip'
import { useIsMobile } from '~/hooks/use-mobile'
import { useTRPC } from '~/lib/trpc/react'

interface Member {
  id: number
  name: string
  imageUrl?: string
  department: string
}

interface TeamPicturesProps {
  members: Array<Member>
  membersTotal: number
}

export function TeamPictures({ members, membersTotal }: TeamPicturesProps) {
  const isMobile = useIsMobile()

  const trpc = useTRPC()
  const { data } = useQuery(trpc.members.structural.queryOptions())

  console.log('TeamPictures data:', data)

  return (
    <div className="py-6">
      <div className="relative flex flex-wrap items-center px-0">
        {[
          ...members,
          { id: members.length + 1, name: 'more', department: 'more' }
        ].map((member, index) => {
          if (member.name === 'more') {
            return (
              <Link
                key={member.id}
                to="/about"
                className="relative transition ease-out active:scale-95"
              >
                <Avatar
                  className="size-10 md:size-12 lg:size-16"
                  style={{
                    marginLeft:
                      index > 0 ? (isMobile ? '-1rem' : '-2rem') : '0',
                    zIndex: index + 1,
                    transform: `translateX(${index * (isMobile ? 0.5 : 1)}rem)`
                  }}
                >
                  <AvatarFallback className="from-primary-gradient-start to-primary-gradient-end bg-gradient-to-br text-xs font-bold text-white md:text-sm lg:text-base">
                    +{membersTotal - members.length}
                  </AvatarFallback>
                </Avatar>
              </Link>
            )
          }

          return (
            <TooltipProvider key={member.id}>
              <Tooltip useTouch>
                <TooltipTrigger asChild>
                  <Avatar
                    className="size-10 md:size-12 lg:size-16"
                    style={{
                      marginLeft:
                        index > 0 ? (isMobile ? '-1rem' : '-2rem') : '0',
                      zIndex: index + 1,
                      transform: `translateX(${index * (isMobile ? 0.5 : 1)}rem)`
                    }}
                  >
                    <AvatarImage
                      src={
                        member.imageUrl ??
                        `https://api.dicebear.com/9.x/glass/svg?seed=${index}`
                      }
                      alt={`Team member ${index + 1}`}
                    />
                    <AvatarFallback>{`Team ${index + 1}`}</AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent className="ml-2 flex flex-col items-center justify-center">
                  <div className="text-center leading-loose font-semibold">
                    {member.name}
                  </div>
                  <div className="text-muted-foreground text-center text-xs">
                    {member.department}
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )
        })}
      </div>
    </div>
  )
}
