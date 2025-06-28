'use client'

import { cn } from '~/lib/utils'

import MotionLink from '../motion-link'

interface DesktopNavItemProps
  extends NavItem,
    Omit<React.ComponentProps<'li'>, 'children'> {
  linkProps?: Omit<React.ComponentProps<typeof MotionLink>, 'children' | 'href'>
}

interface NavItem {
  href?: string
  text: string
}

function DesktopNavItem({
  linkProps,
  text,
  href,
  className,
  ...props
}: DesktopNavItemProps) {
  return (
    <MotionLink {...linkProps} href={href} className="group relative">
      <li
        className={cn(
          'bg-clip-text text-sm text-transparent',
          'from-secondary-foreground to-secondary-foreground/80 dark:to-muted-foreground bg-gradient-to-br',
          'transition-opacity duration-150 ease-out group-hover:opacity-80',
          className
        )}
        {...props}
      >
        {text}
      </li>
    </MotionLink>
  )
}

export type { DesktopNavItemProps, NavItem }
export { DesktopNavItem }
