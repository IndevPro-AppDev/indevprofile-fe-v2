import { useMemo } from 'react'

import { Link } from '@tanstack/react-router'

import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Skeleton } from '~/components/ui/skeleton'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '~/components/ui/tooltip'
import { useIsMobile } from '~/hooks/use-mobile'

export interface Team {
  id: number
  name: string
  department: string
  imageUrl?: string
}

interface TeamPicturesProps {
  members: Array<Team>
  membersTotal: number
  isLoading?: boolean
}

export function TeamPictures({
  members,
  membersTotal,
  isLoading
}: TeamPicturesProps) {
  const isMobile = useIsMobile()

  const itemMore: Team = {
    id: members.length + 1,
    name: 'more',
    department: 'more'
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const items: Team[] = useMemo(() => [...members, itemMore], [members])

  return (
    <div className="w-full py-6">
      <div className="no-scrollbar relative flex flex-wrap items-center overflow-x-scroll px-0">
        {isLoading &&
          Array.from({ length: 9 }).map((_, index) => (
            <Skeleton
              // eslint-disable-next-line react/no-array-index-key
              key={`skeleton-loader-${index}`}
              className="border-muted/20 size-10 rounded-full border md:size-12 lg:size-16"
              style={{
                marginLeft: index > 0 ? (isMobile ? '-1rem' : '-2rem') : '0',
                zIndex: index + 1,
                transform: `translateX(${index * (isMobile ? 0.5 : 1)}rem)`
              }}
              animate={false}
            />
          ))}

        {!isLoading &&
          items.map((member, index) => {
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
                        src={member.imageUrl}
                        alt={member.name}
                        onError={e =>
                          (e.currentTarget.src =
                            'https://ik.imagekit.io/indevpro/formal/fallback.png')
                        }
                      />
                      <AvatarFallback className="from-primary-gradient-start to-primary-gradient-end bg-gradient-to-br text-xs font-bold text-white md:text-sm lg:text-base">
                        {member.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
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
