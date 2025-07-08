import type { ErrorComponentProps as PrimitiveErrorComponentProps } from '@tanstack/react-router'

import { motion } from 'motion/react'

import IndevproScene from './indevpro-scene'
import { Button } from './ui/button'

interface ErrorComponentProps extends Partial<PrimitiveErrorComponentProps> {
  type?: 'error' | 'not-found'
}

export default function ErrorComponent({
  error,
  reset,
  type = 'error'
}: ErrorComponentProps) {
  return (
    <div className="flex min-h-dvh flex-col items-center px-6 pt-16">
      <section className="mb-4">
        <motion.h1
          initial={{ opacity: 0, y: 10, filter: 'blur(4px)', scale: 0.9 }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0)', scale: 1 }}
          className="text-muted-foreground/20 text-center text-8xl font-bold"
        >
          {type === 'not-found' ? '404' : '500'}
        </motion.h1>
      </section>
      <section id="3d-scene" className="relative mb-4 h-64 w-64">
        <IndevproScene />
      </section>
      <section className="flex flex-col items-center justify-center space-y-2">
        <motion.p
          className="text-muted-foreground text-center text-sm"
          initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0)' }}
        >
          {type === 'not-found'
            ? 'Seems like you are lost fellas. The page you are looking for does not exist.'
            : error?.message || 'An unexpected error occurred.'}
        </motion.p>
        <Button variant="ghost" asChild={type === 'not-found'} onClick={reset}>
          {type === 'not-found' ? (
            <motion.a
              initial={{ opacity: 0, filter: 'blur(4px)' }}
              animate={{ opacity: 1, filter: 'blur(0)' }}
              href="/"
            >
              Go back to home
            </motion.a>
          ) : (
            'Try again'
          )}
        </Button>
      </section>
    </div>
  )
}
