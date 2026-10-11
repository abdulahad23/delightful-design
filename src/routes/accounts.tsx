import { createFileRoute } from '@tanstack/react-router';
import { AccountsPage } from '@/components/ledger-pages';
export const Route = createFileRoute('/accounts')({
 head: () => ({ meta: [
  { title: 'Chart of accounts · LedgerDesk' },
  { name: 'description', content: 'Organize your LedgerDesk account heads and account types.' },
  { property: 'og:title', content: 'Chart of accounts · LedgerDesk' },
  { property: 'og:description', content: 'Organize your LedgerDesk account heads and account types.' },
  { property: 'og:type', content: 'website' },
  { name: 'twitter:card', content: 'summary_large_image' },
 ] }),
 component: AccountsPage,
});
