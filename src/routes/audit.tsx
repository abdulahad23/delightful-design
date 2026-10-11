import { createFileRoute } from '@tanstack/react-router';
import { AuditPage } from '@/components/ledger-pages';
export const Route = createFileRoute('/audit')({
 head: () => ({ meta: [
  { title: 'Audit log · LedgerDesk' },
  { name: 'description', content: 'Review LedgerDesk bookkeeping activity and journal history.' },
  { property: 'og:title', content: 'Audit log · LedgerDesk' },
  { property: 'og:description', content: 'Review LedgerDesk bookkeeping activity and journal history.' },
  { property: 'og:type', content: 'website' },
  { name: 'twitter:card', content: 'summary_large_image' },
 ] }),
 component: AuditPage,
});
