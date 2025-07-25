import { useState } from 'react'

import { Icon } from '@iconify/react'
import { AnimatePresence, motion } from 'motion/react'

import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { m } from '~/paraglide/messages'

export default function ContactForm() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full gap-4"
      aria-disabled={isLoading}
    >
      <Input
        placeholder={m['home.cards.contact.input.placeholder']()}
        className="dark:border-primary/20 border-background/30 backdrop-blur-md md:h-10 lg:h-12"
      />
      <Button
        size="icon"
        className="relative overflow-y-hidden rounded-md md:h-10 lg:size-12"
        type="submit"
        disabled={isLoading}
      >
        <AnimatePresence mode="wait">
          {isLoading ? (
            <MotionWrapper key="contact-form-submit-button-loader">
              <Icon
                width={20}
                height={20}
                className="size-5 lg:size-6"
                icon="line-md:loading-loop"
              />
            </MotionWrapper>
          ) : (
            <MotionWrapper key="contact-form-submit-button-paper-plane">
              <Icon
                width={20}
                height={20}
                className="size-5 lg:size-6"
                icon="ph:paper-plane-tilt-fill"
              />
            </MotionWrapper>
          )}
        </AnimatePresence>
      </Button>
    </form>
  )
}

function MotionWrapper({ children }: React.PropsWithChildren) {
  return (
    <motion.div
      className="size-fit transform-gpu cursor-pointer [&>svg]:pointer-events-none"
      initial={{ scale: 0.5, y: 20, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      exit={{ scale: 0.5, y: -20, opacity: 0 }}
      transition={{
        stiffness: 24,
        damping: 14,
        mass: 0.6,
        delay: 0.05
      }}
    >
      {children}
    </motion.div>
  )
}
