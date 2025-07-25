import { Link } from '@tanstack/react-router'

import { Button } from '~/components/ui/button'
import { m } from '~/paraglide/messages'

export default function LearnMoreButton() {
  return (
    <Button variant="default" size="lg" className="rounded-full" asChild>
      <Link to="/about">{m['common.learn_more']()}</Link>
    </Button>
  )
}
