export type JournalLine = { account: string; particular: string; name: string; debit: number; credit: number };
export type Journal = { id: string; date: string; reference: string; narration: string; author: string; amount: number; status: 'Posted' | 'Pending'; lines: JournalLine[] };
export type Account = { code: string; name: string; type: string; active: boolean; balance: number };
export const money = (value: number) => new Intl.NumberFormat('en-PK', { style: 'currency', currency: 'PKR', maximumFractionDigits: 2 }).format(value);
export const compactMoney = (value: number) => new Intl.NumberFormat('en-PK', { maximumFractionDigits: 0 }).format(value);
export const initialAccounts: Account[] = [
  { code: '1001', name: 'Cash in hand', type: 'Asset', active: true, balance: 185000 },
  { code: '1002', name: 'Bank account', type: 'Asset', active: true, balance: 740000 },
  { code: '1101', name: 'Accounts receivable', type: 'Asset', active: true, balance: 325000 },
  { code: '1201', name: 'Office equipment', type: 'Asset', active: true, balance: 145000 },
  { code: '2001', name: 'Accounts payable', type: 'Liability', active: true, balance: 195000 },
  { code: '3001', name: 'Owner’s capital', type: 'Equity', active: true, balance: 900000 },
  { code: '4001', name: 'Service revenue', type: 'Income', active: true, balance: 580000 },
  { code: '5001', name: 'Office rent', type: 'Expense', active: true, balance: 90000 },
  { code: '5002', name: 'Salaries and wages', type: 'Expense', active: true, balance: 140000 },
  { code: '5003', name: 'Utilities', type: 'Expense', active: true, balance: 22000 },
  { code: '5004', name: 'Office supplies', type: 'Expense', active: true, balance: 28000 },
  { code: '5005', name: 'Travel expenses', type: 'Expense', active: false, balance: 0 },
];
const rows = [
  ['2026-10-11', 'INV-1042', 'Payment received from client', '125000', '1002', '1101', 'Posted'],
  ['2026-10-10', 'RENT-OCT', 'Office rent — October 2026', '45000', '5001', '1002', 'Posted'],
  ['2026-10-10', 'INV-1041', 'Consulting services — October', '85000', '1101', '4001', 'Pending'],
  ['2026-10-09', 'PAY-1026', 'Staff salaries — October', '70000', '5002', '1002', 'Posted'],
  ['2026-10-08', 'BILL-028', 'Electricity and internet bills', '12500', '5003', '1002', 'Posted'],
  ['2026-10-07', 'PO-0086', 'Office supplies purchased', '8500', '5004', '2001', 'Pending'],
  ['2026-10-06', 'INV-1040', 'Website development services', '95000', '1101', '4001', 'Posted'],
  ['2026-10-05', 'RCPT-092', 'Cash deposited into bank', '50000', '1002', '1001', 'Posted'],
] as const;
export const initialJournals: Journal[] = rows.map((r, i) => ({ id: `GJ-${String(128 - i).padStart(5, '0')}`, date: r[0], reference: r[1], narration: r[2], author: i % 3 === 0 ? 'Abdul Ahad' : 'Sara Khan', amount: Number(r[3]), status: r[6], lines: [
  { account: r[4], particular: r[2], name: '', debit: Number(r[3]), credit: 0 },
  { account: r[5], particular: r[2], name: '', debit: 0, credit: Number(r[3]) },
] }));
export function validateJournal(lines: JournalLine[]) {
  if (lines.length < 2) return 'A journal needs at least two lines.';
  if (lines.some(l => !l.account)) return 'Choose an account for every line.';
  if (lines.some(l => l.debit < 0 || l.credit < 0 || (l.debit > 0 && l.credit > 0) || (!l.debit && !l.credit))) return 'Each line needs a positive debit or credit, not both.';
  const debit = lines.reduce((sum, l) => sum + l.debit, 0);
  const credit = lines.reduce((sum, l) => sum + l.credit, 0);
  if (!(debit > 0) || Math.abs(debit - credit) > .004) return 'Debits and credits must balance and be greater than zero.';
  return '';
}
export function validateAttachments(files: { size: number; name: string }[]) {
  if (files.length > 10) return 'Choose no more than 10 files.';
  if (files.some(f => f.size > 15 * 1024 * 1024)) return 'Each file must be 15 MB or smaller.';
  if (files.some(f => !/\.(pdf|jpe?g)$/i.test(f.name))) return 'Choose PDF, JPG, or JPEG files.';
  return '';
}