import { cn } from '~/lib/utils'

interface GalleryCardProps {
  imgSrc: string
  alt: string
  isCenter?: boolean
}

export default function GalleryCard({
  imgSrc,
  alt,
  isCenter
}: GalleryCardProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center py-10 transition-all duration-500 ease-in-out',
        isCenter ? 'z-10 scale-110 opacity-100' : 'z-0 scale-90 opacity-70'
      )}
    >
      <div
        className={cn(
          'relative mb-4 w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px]',
          'bg-primary-300 aspect-[9/18] overflow-hidden rounded-xl shadow-md'
        )}
      >
        <img
          src={imgSrc}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  )
}
