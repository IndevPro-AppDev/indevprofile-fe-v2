'use client'

import { useState } from 'react'

import { Icon } from '@iconify/react'

import { MotionButton } from '../ui/button'

export default function MobileDrawer() {
  const [open, setOpen] = useState(false)

  return (
    <MotionButton
      type="button"
      size="icon"
      className="overflow-hidden rounded-full"
      variant="outline"
      onClick={() => setOpen(!open)}
    >
      <Icon
        icon={!open ? 'charm:menu-hamburger' : 'material-symbols:close-rounded'}
        width="16"
        height="16"
        className="size-4"
      />
    </MotionButton>
  )
}
