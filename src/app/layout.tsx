import { TRPCReactProvider } from '~/lib/trpc/react'
import '~/styles/globals.css'

export default function RootLayout({ children }: React.PropsWithChildren) {
  return <TRPCReactProvider>{children}</TRPCReactProvider>
}
