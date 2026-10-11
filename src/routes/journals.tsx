import { createFileRoute } from '@tanstack/react-router';
import { JournalsPage } from '@/components/ledger-pages';
export const Route = createFileRoute('/journals')({
 head: () => ({ meta: [
  { title: 'General journal · LedgerDesk' },
  { name: 'description', content: 'Browse and search your LedgerDesk journal entries.' },
  { property: 'og:title', content: 'General journal · LedgerDesk' },
  { property: 'og:description', content: 'Browse and search your LedgerDesk journal entries.' },
  { property: 'og:type', content: 'website' },
  { name: 'twitter:card', content: 'summary_large_image' },
 ] }),
 component: JournalsPage,
});
