import { motion } from 'motion/react'

import type { Member } from '~/trpc/router/members/types'

import { cn } from '~/lib/utils'

interface MemberCardFrontProps {
  member: Member
  isFlipped: boolean
}

export default function MemberCardFront({
  member,
  isFlipped
}: MemberCardFrontProps) {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 backface-hidden"
      animate={{ rotateY: isFlipped ? 180 : 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      style={{ backfaceVisibility: 'hidden' }}
    >
      <div className="absolute inset-0">
        <img
          src={member.image.front}
          alt={member.name}
          onError={e =>
            (e.currentTarget.src =
              'https://ik.imagekit.io/indevpro/formal/fallback.png')
          }
          className="h-full w-full object-cover"
        />
        <img
          src="https://ik.imagekit.io/indevpro/twibbon.png"
          alt="twibbon"
          className="absolute inset-0 w-full object-cover"
        />
      </div>
      <div className="to-primary-gradient-start/60 absolute inset-x-0 bottom-0 bg-gradient-to-b from-transparent">
        <div className="relative flex h-fit w-full flex-col justify-end space-y-1 px-3 pb-2 lg:px-6 lg:py-4">
          <span className="text-xs font-medium text-white/80 drop-shadow-sm">
            {member.department}
          </span>
          <h3
            className={cn(
              'font-display bg-clip-text text-transparent lg:text-lg',
              'bg-gradient-to-b from-white to-white/80 leading-tight'
            )}
          >
            {member.name}
          </h3>
          <span className="text-sm font-medium text-white/80 drop-shadow-sm">
            {member.division.name}
          </span>
        </div>
      </div>
    </motion.div>
  )
}
