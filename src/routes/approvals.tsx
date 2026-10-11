import { createFileRoute } from '@tanstack/react-router';
import { ApprovalsPage } from '@/components/ledger-pages';
export const Route = createFileRoute('/approvals')({
 head: () => ({ meta: [
  { title: 'Pending approvals · LedgerDesk' },
  { name: 'description', content: 'Review journal transactions awaiting approval in LedgerDesk.' },
  { property: 'og:title', content: 'Pending approvals · LedgerDesk' },
  { property: 'og:description', content: 'Review journal transactions awaiting approval in LedgerDesk.' },
  { property: 'og:type', content: 'website' },
  { name: 'twitter:card', content: 'summary_large_image' },
 ] }),
 component: ApprovalsPage,
});
