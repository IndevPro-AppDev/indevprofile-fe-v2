import { Icon } from '@iconify/react'
import { motion } from 'motion/react'
import { match } from 'ts-pattern'

import type { Member } from '~/trpc/router/members/types'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '~/components/ui/tooltip'

interface MemberCardBackProps {
  member: Member
  isFlipped: boolean
}

export default function MemberCardBack({
  member,
  isFlipped
}: MemberCardBackProps) {
  const getSocialIcon = (slug: string) => {
    return match(slug)
      .with('github', () => 'ant-design:github-filled')
      .with('ig', () => 'ph:instagram-logo-fill')
      .with('linkedin', () => 'mage:linkedin')
      .with('website', () => 'ant-design:global-outlined')
      .otherwise(() => 'ph:question-circle-fill')
  }

  const getSocialLabel = (slug: string) => {
    return slug === 'ig'
      ? 'Instagram'
      : slug.charAt(0).toUpperCase() + slug.slice(1)
  }

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 backface-hidden"
      animate={{ rotateY: isFlipped ? 0 : -180 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      style={{ backfaceVisibility: 'hidden' }}
    >
      <div className="absolute inset-0">
        <img
          src={
            member.image.back ??
            'https://ik.imagekit.io/indevpro/non-formal/fallback.png'
          }
          alt={member.name}
          className="h-full w-full object-cover"
          onError={e =>
            (e.currentTarget.src =
              'https://ik.imagekit.io/indevpro/non-formal/fallback.png')
          }
        />
        <img
          src="https://ik.imagekit.io/indevpro/twibbon.png"
          alt="twibbon"
          className="absolute inset-0 w-full object-cover"
        />
      </div>
      <div className="to-primary-gradient-start/60 absolute inset-x-0 bottom-0 bg-gradient-to-b from-transparent">
        <ul className="relative flex h-fit w-full flex-row items-center gap-2 px-3 pb-2 lg:px-6 lg:py-4">
          {member.socials
            .filter(social => !!social.url)
            .map((social, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <li key={`social-${index}`} className="flex items-center">
                <TooltipProvider>
                  <Tooltip useTouch>
                    <TooltipTrigger asChild>
                      <a
                        href={social.url ?? ''}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group pointer-events-auto"
                        onClick={e => {
                          e.stopPropagation()
                          e.preventDefault()
                          window.open(
                            social.url ?? '',
                            '_blank',
                            'noopener,noreferrer'
                          )
                        }}
                      >
                        <Icon
                          className="hover:text-foreground/80 active:text-foreground/60 text-muted-foreground size-4 transition ease-out active:scale-95 lg:size-6"
                          icon={getSocialIcon(social.slug)}
                        />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent className="ml-2 flex flex-col items-center justify-center">
                      {getSocialLabel(social.slug)}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </li>
            ))}
        </ul>
      </div>
    </motion.div>
  )
}
