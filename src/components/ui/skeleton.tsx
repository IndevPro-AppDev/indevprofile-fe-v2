import { cn } from '~/lib/utils'

function Skeleton({
  className,
  animate = true,
  ...props
}: React.ComponentProps<'div'> & { animate?: boolean }) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        'dark:bg-primary bg-muted-foreground rounded-md',
        animate ? 'animate-pulse' : '',
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
