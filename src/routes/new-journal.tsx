import { createFileRoute } from '@tanstack/react-router';
import { NewJournalPage } from '@/components/ledger-pages';
export const Route = createFileRoute('/new-journal')({
 head: () => ({ meta: [
  { title: 'New journal entry · LedgerDesk' },
  { name: 'description', content: 'Create balanced double-entry journal transactions in LedgerDesk.' },
  { property: 'og:title', content: 'New journal entry · LedgerDesk' },
  { property: 'og:description', content: 'Create balanced double-entry journal transactions in LedgerDesk.' },
  { property: 'og:type', content: 'website' },
  { name: 'twitter:card', content: 'summary_large_image' },
 ] }),
 component: NewJournalPage,
});
