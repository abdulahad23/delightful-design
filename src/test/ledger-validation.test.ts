import { describe, expect, it } from 'vitest';
import { validateAttachments, validateJournal, type JournalLine } from '../lib/ledger-data';
const line = (debit: number, credit: number): JournalLine => ({ account: '1001', particular: '', name: '', debit, credit });
describe('Uploaded LedgerDesk rules', () => {
  it('requires at least two journal lines', () => expect(validateJournal([line(100, 0)])).toBe('A journal needs at least two lines.'));
  it('requires balanced positive totals', () => { expect(validateJournal([line(100, 0), line(0, 99)])).toBeTruthy(); expect(validateJournal([line(100, 0), line(0, 100)])).toBe(''); expect(validateJournal([line(0, 0), line(0, 0)])).toBeTruthy(); });
  it('does not allow both debit and credit on one line', () => expect(validateJournal([line(100, 100), line(100, 100)])).toBeTruthy());
  it('limits attachments to 10 files', () => expect(validateAttachments(Array.from({ length: 11 }, () => ({ name: 'receipt.pdf', size: 100 })))).toBe('Choose no more than 10 files.'));
  it('limits attachments to 15 MB per file', () => { expect(validateAttachments([{ name: 'receipt.pdf', size: 15 * 1024 * 1024 + 1 }])).toBeTruthy(); expect(validateAttachments([{ name: 'receipt.pdf', size: 15 * 1024 * 1024 }])).toBe(''); });
  it('accepts only PDF and JPEG documents', () => { expect(validateAttachments([{ name: 'file.exe', size: 100 }])).toBeTruthy(); expect(validateAttachments([{ name: 'receipt.jpg', size: 100 }, { name: 'receipt.jpeg', size: 100 }, { name: 'receipt.pdf', size: 100 }])).toBe(''); });
});