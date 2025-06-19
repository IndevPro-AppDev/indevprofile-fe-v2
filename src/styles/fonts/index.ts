import localFont from 'next/font/local'

export const calSans = localFont({
  src: './CalSans-Regular.ttf',
  style: 'normal',
  weight: '400',
  variable: '--font-cal-sans',
  display: 'swap',
  preload: true,
  fallback: ['sans-serif']
})

export const coraMontserra = localFont({
  src: './cora-montserra-variable.ttf',
  variable: '--font-cora-montserra',
  display: 'swap',
  preload: true,
  fallback: ['sans-serif']
})
