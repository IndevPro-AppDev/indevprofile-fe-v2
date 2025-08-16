import { createFileRoute } from '@tanstack/react-router'

import Page from '~/components/portfolio/student-mobile/page'

export const Route = createFileRoute('/portfolio_/student-mobile')({
  component: StudentMobilePage
})

function StudentMobilePage() {
  return <Page />
}
