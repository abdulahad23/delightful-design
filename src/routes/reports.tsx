import { createFileRoute } from '@tanstack/react-router';
import { ReportsPage } from '@/components/ledger-pages';
export const Route = createFileRoute('/reports')({
 head: () => ({ meta: [
  { title: 'Financial reports · LedgerDesk' },
  { name: 'description', content: 'Review trial balance, general ledger, profit and loss, and balance sheet reports.' },
  { property: 'og:title', content: 'Financial reports · LedgerDesk' },
  { property: 'og:description', content: 'Review trial balance, general ledger, profit and loss, and balance sheet reports.' },
  { property: 'og:type', content: 'website' },
  { name: 'twitter:card', content: 'summary_large_image' },
 ] }),
 component: ReportsPage,
});
