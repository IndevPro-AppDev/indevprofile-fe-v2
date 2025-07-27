import { cn } from '~/lib/utils'

interface PortfolioCardProps {
  title: string
  desc: string
  imgSrc: string
  isCenter?: boolean
}

export default function PortfolioCard({
  title,
  desc,
  imgSrc,
  isCenter
}: PortfolioCardProps) {
  const aspectRatio = 717 / 585

  return (
    <div
      className={cn(
        'bg-primary flex flex-col items-center justify-between border shadow-md transition-transform duration-500 ease-in-out',
        isCenter ? 'z-10 scale-100' : 'scale-75',
        'p-5 sm:p-2 md:p-4',
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
        <div className="bg-primary-300 mb-2 flex-1 overflow-hidden rounded-md sm:rounded-sm">
          <img
            src={imgSrc}
            alt={title}
            className="h-full w-full rounded-md object-cover sm:rounded-sm"
          />
        </div>

        <div className="bg-primary mb-4 flex flex-col justify-center gap-[2px] rounded-md px-2 py-1 sm:rounded-sm">
          <h3 className="text-secondary text-xs leading-tight font-bold md:text-sm">
            {title}
          </h3>
          <p className="text-secondary text-[10px] leading-tight md:text-xs">
            {desc}
          </p>
        </div>
      </div>
    </div>
  )
}
