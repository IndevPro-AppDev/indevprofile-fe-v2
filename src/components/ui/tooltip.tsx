import * as React from 'react'

import * as TooltipPrimitive from '@radix-ui/react-tooltip'

import { cn } from '~/lib/utils'

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    // eslint-disable-next-line react/no-context-provider
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  )
}

function Tooltip({
  children,
  useTouch = false,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root> & {
  useTouch?: boolean
}) {
  const [open, setOpen] = React.useState(false)

  const handleTouch = (event: React.TouchEvent | React.MouseEvent) => {
    event.persist()
    setOpen(true)
  }

  return (
    <TooltipProvider>
      <TooltipPrimitive.Root
        data-slot="tooltip"
        open={open}
        onOpenChange={setOpen}
        {...props}
      >
        {
          // eslint-disable-next-line react/no-children-map
          React.Children.map(children, child => {
            if (React.isValidElement(child) && useTouch) {
              // eslint-disable-next-line react/no-clone-element
              return React.cloneElement(
                child as React.ReactElement<React.HTMLAttributes<HTMLElement>>,
                {
                  onTouchStart: handleTouch,
                  onMouseDown: handleTouch
                }
              )
            }
            return child
          })
        }
      </TooltipPrimitive.Root>
    </TooltipProvider>
  )
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          'from-bg-gradient-start via-bg-gradient-middle to-bg-gradient-end text-popover-foreground/80 animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:border-primary/20 border-background/30 z-50 mb-2 w-fit max-w-[32ch] origin-(--radix-tooltip-content-transform-origin) rounded-md border bg-gradient-to-br px-3 py-2 text-sm font-medium text-balance backdrop-blur-sm',
          className
        )}
        {...props}
      >
        {children}
        {/* <TooltipPrimitive.Arrow
          className="bg-popover fill-popover size-2.5 translate-y-[calc(-50%_-2px)] rotate-45 rounded-[2px]"
          aria-hidden="true"
        /> */}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger }
