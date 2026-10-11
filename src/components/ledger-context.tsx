import { createContext, useContext, useState, type ReactNode } from 'react';
import { initialAccounts, initialJournals, type Account, type Journal } from '@/lib/ledger-data';
type LedgerState = { journals: Journal[]; accounts: Account[]; addJournal: (journal: Journal) => void; approveJournal: (id: string) => void; saveAccount: (account: Account) => void };
const LedgerContext = createContext<LedgerState | null>(null);
export function LedgerProvider({ children }: { children: ReactNode }) {
  const [journals, setJournals] = useState(initialJournals);
  const [accounts, setAccounts] = useState(initialAccounts);
  return <LedgerContext.Provider value={{ journals, accounts, addJournal: journal => setJournals(previous => [journal, ...previous]), approveJournal: id => setJournals(previous => previous.map(j => j.id === id ? { ...j, status: 'Posted' } : j)), saveAccount: account => setAccounts(previous => previous.some(a => a.code === account.code) ? previous.map(a => a.code === account.code ? account : a) : [...previous, account]) }}>{children}</LedgerContext.Provider>;
}
export function useLedger() { const context = useContext(LedgerContext); if (!context) throw new Error('Ledger workspace is unavailable.'); return context; }