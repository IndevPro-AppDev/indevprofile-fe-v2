import { DeviceFrameset } from 'react-device-frameset'

import { cn } from '~/lib/utils'
import 'react-device-frameset/styles/marvel-devices.min.css'

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
        'flex flex-col items-center transition-all duration-500 ease-in-out',
        isCenter ? 'z-10 scale-100 opacity-100' : 'z-0 scale-80 opacity-70'
      )}
    >
      <div className="relative scale-65 px-4 shadow-md md:scale-60 lg:scale-70 xl:scale-90">
        <DeviceFrameset device="iPhone X" color="black">
          <img
            src={imgSrc}
            alt={alt}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </DeviceFrameset>
      </div>
    </div>
  )
}
