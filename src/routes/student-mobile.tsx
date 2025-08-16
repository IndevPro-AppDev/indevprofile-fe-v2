import { createFileRoute } from '@tanstack/react-router'

import Page from '~/components/portfolio/student-mobile/page'

export const Route = createFileRoute('/student-mobile')({
  component: StudentMobilePage
})

function StudentMobilePage() {
  return <Page />
}
