import { createFileRoute } from '@tanstack/react-router';
import { ImportPage } from '@/components/ledger-pages';
export const Route = createFileRoute('/import-journals')({
 head: () => ({ meta: [
  { title: 'Import journals · LedgerDesk' },
  { name: 'description', content: 'Prepare your Excel or CSV journal entries for LedgerDesk.' },
  { property: 'og:title', content: 'Import journals · LedgerDesk' },
  { property: 'og:description', content: 'Prepare your Excel or CSV journal entries for LedgerDesk.' },
  { property: 'og:type', content: 'website' },
  { name: 'twitter:card', content: 'summary_large_image' },
 ] }),
 component: ImportPage,
});
