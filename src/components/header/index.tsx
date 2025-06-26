import HomeLink from './HomeLink'

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-20 h-14 w-full">
      <div className="flex h-full w-full items-center justify-between bg-transparent px-6">
        <HomeLink />
        <nav className="items-center justify-end"></nav>
      </div>
    </header>
  )
}
