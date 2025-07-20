import { cn } from '~/lib/utils'

import StarIcon from '../star-icon'
import { Button } from '../ui/button'

export default function EventAlert() {
  return (
    <Button
      variant="brand"
      className="mx-auto w-fit cursor-pointer md:mx-0"
      size="sm"
    >
      <StarIcon className="size-5" />
      <span
        className={cn(
          'bg-clip-text text-transparent',
          'from-primary to-muted-foreground/60 bg-gradient-to-b'
        )}
      >
        Indevpro {new Date().getFullYear()}
      </span>
    </Button>
  )
}
