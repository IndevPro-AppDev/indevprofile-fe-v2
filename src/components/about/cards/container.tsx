import { useRef, useState } from 'react'

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform
} from 'motion/react'

import type { Member } from '~/trpc/router/members/types'

import MemberCardBack from './back'
import MemberCardFront from './front'

export default function MemberCard({ member }: { member: Member }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [isFlipped, setIsFlipped] = useState(false)

  const rotateX = useTransform(mouseY, [-300, 300], [15, -15])
  const rotateY = useTransform(mouseX, [-300, 300], [-15, 15])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const offsetX = e.clientX - centerX
    const offsetY = e.clientY - centerY

    mouseX.set(offsetX)
    mouseY.set(offsetY)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFlipped(!isFlipped)
  }

  return (
    <AnimatePresence initial={false}>
      <motion.div
        ref={cardRef}
        role="buttons"
        className="relative flex aspect-[3/4] w-full cursor-pointer flex-col justify-end overflow-hidden rounded-sm shadow-md"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d'
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        transition={{ stiffness: 500, damping: 90 }}
      >
        <MemberCardFront member={member} isFlipped={isFlipped} />
        <MemberCardBack member={member} isFlipped={isFlipped} />
      </motion.div>
    </AnimatePresence>
  )
}
