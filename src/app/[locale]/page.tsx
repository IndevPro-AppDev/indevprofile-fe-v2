import GradientBackground from './_components/gradient-background'

export default function Home() {
  return (
    <div className="relative w-full max-w-screen overflow-x-hidden">
      <section className="flex h-[calc(100dvh-calc(var(--spacing)*14))] items-center justify-center"></section>
      <section className="h-dvh"></section>
      <section className="h-dvh"></section>
      <GradientBackground />
    </div>
  )
}
