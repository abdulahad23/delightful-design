import { createFileRoute } from '@tanstack/react-router';
import { Overview } from '@/components/ledger-workspace';
export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'Overview · LedgerDesk' },
    { name: 'description', content: 'Your LedgerDesk bookkeeping overview: recent journals, accounts, and balanced books.' },
    { property: 'og:title', content: 'Overview · LedgerDesk' },
    { property: 'og:description', content: 'A clear view of your journals, accounts, and bookkeeping activity.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Overview,
});
