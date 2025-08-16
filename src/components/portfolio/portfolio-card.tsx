import type { LinkComponentProps } from '@tanstack/react-router'

import { Link } from '@tanstack/react-router'

import { cn } from '~/lib/utils'

interface PortfolioCardProps {
  title: string
  desc: string
  imgSrc: string
  isCenter?: boolean
  link?: Required<LinkComponentProps['to']>
}

export default function PortfolioCard({
  title,
  desc,
  imgSrc,
  isCenter,
  link
}: PortfolioCardProps) {
  const aspectRatio = 1920 / 1080

  return (
    <div
      className={cn(
        'from-bg-gradient-start via-bg-gradient-middle to-bg-gradient-end flex flex-col items-center justify-between border bg-gradient-to-br shadow-lg transition-transform duration-300 ease-out',
        isCenter ? 'z-10 scale-100' : 'scale-75',
        'p-3 md:p-4 lg:p-6',
        'sm:rounded-sg rounded-xl'
      )}
    >
      <div
        className="flex w-full flex-col justify-between"
        style={{
          aspectRatio: `${aspectRatio}`,
          width: '100%'
        }}
      >
        <Link
          to={link}
          className="bg-primary-300 mb-4 flex-1 overflow-hidden rounded-md sm:rounded-sm"
          disabled={!link}
        >
          <img
            src={imgSrc}
            alt={title}
            className="h-full w-full rounded-md object-cover sm:rounded-sm"
          />
        </Link>

        <div className="flex flex-col justify-center space-y-1">
          <Link to={link} disabled={!link}>
            <h3 className="text-card-foreground font-display text-sm leading-tight md:text-base lg:text-lg">
              {title}
            </h3>
          </Link>
          <p className="text-muted-foreground line-clamp-3 text-xs leading-tight md:text-sm lg:text-base">
            {desc}
          </p>
        </div>
      </div>
    </div>
  )
}
