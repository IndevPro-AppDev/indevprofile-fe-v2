import { createFileRoute } from '@tanstack/react-router'

import PortfolioDetailSistaPage from '~/components/portfolio/sista/page'

export const Route = createFileRoute('/portfolio_/sista')({
  component: PortfolioDetailSistaPage
})
