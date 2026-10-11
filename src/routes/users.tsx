import { createFileRoute } from '@tanstack/react-router';
import { UsersPage } from '@/components/ledger-pages';
export const Route = createFileRoute('/users')({
 head: () => ({ meta: [
  { title: 'User management · LedgerDesk' },
  { name: 'description', content: 'Manage your LedgerDesk bookkeeping workspace team.' },
  { property: 'og:title', content: 'User management · LedgerDesk' },
  { property: 'og:description', content: 'Manage your LedgerDesk bookkeeping workspace team.' },
  { property: 'og:type', content: 'website' },
  { name: 'twitter:card', content: 'summary_large_image' },
 ] }),
 component: UsersPage,
});
