import { useState, type ReactNode } from 'react';
import { Link } from '@tanstack/react-router';
import { LayoutDashboard, BookOpen, ListTree, ChartNoAxesCombined, ShieldCheck, Users, History, ChevronDown, ChevronsUpDown, Plus, Upload, Bell, Search, Menu, X, ArrowUpRight, CircleHelp, Check, ArrowRight, PanelLeftClose, FileText, LogOut } from 'lucide-react';
import { Button } from './ledger-button';
import { useLedger } from './ledger-context';
import { JournalTable } from './ledger-journal-table';
import { compactMoney } from '@/lib/ledger-data';
export const navigation = [
  { to: '/', label: 'Overview', icon: LayoutDashboard },
  { to: '/journals', label: 'General journal', icon: BookOpen },
  { to: '/accounts', label: 'Chart of accounts', icon: ListTree },
  { to: '/reports', label: 'Financial reports', icon: ChartNoAxesCombined },
  { to: '/approvals', label: 'Pending approvals', icon: ShieldCheck },
  { to: '/users', label: 'User management', icon: Users },
  { to: '/audit', label: 'Audit log', icon: History },
] as const;
export function Workspace({ title, children }: { title: string; children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [profile, setProfile] = useState(false);
  const [help, setHelp] = useState(false);
  const { journals } = useLedger();
  const pending = journals.filter(j => j.status === 'Pending').length;
  return <div className="workspace-shell">
    {menuOpen && <div className="mobile-shade" onClick={() => setMenuOpen(false)} />}
    <aside className={`sidebar ${menuOpen ? 'sidebar-open' : ''}`}>
      <Link to="/" className="brand" onClick={() => setMenuOpen(false)}><span className="brand-symbol"><BookOpen size={23} strokeWidth={2.1} /></span><span>LedgerDesk<span className="brand-period">.</span></span></Link>
      <Button variant="ghost" size="icon" className="close-sidebar" aria-label="Close navigation" onClick={() => setMenuOpen(false)}><X size={20} /></Button>
      <div className="workspace-selector"><span className="workspace-avatar">AA</span><div><strong>My workspace</strong><span>Bookkeeping workspace</span></div><ChevronsUpDown size={15} /></div>
      <p className="nav-group-label">WORKSPACE</p>
      <nav aria-label="Main navigation">{navigation.slice(0, 4).map(item => <Link key={item.to} to={item.to} activeOptions={{ exact: true }} activeProps={{ className: 'nav-link nav-active' }} inactiveProps={{ className: 'nav-link' }} onClick={() => setMenuOpen(false)}><item.icon size={19} /><span>{item.label}</span></Link>)}</nav>
      <div className="sidebar-rule" /><p className="nav-group-label">MANAGE</p>
      <nav aria-label="Management navigation">{navigation.slice(4).map(item => <Link key={item.to} to={item.to} activeProps={{ className: 'nav-link nav-active' }} inactiveProps={{ className: 'nav-link' }} onClick={() => setMenuOpen(false)}><item.icon size={19} /><span>{item.label}</span>{item.to === '/approvals' && pending > 0 && <span className="nav-count">{pending}</span>}</Link>)}</nav>
      <div className="sidebar-bottom"><div className="workspace-health"><span className="status-dot" /><span>Preview workspace</span><CircleHelp size={14} /></div><Button variant="ghost" className="help-button" onClick={() => setHelp(true)}><CircleHelp size={18} />Help & support<ArrowUpRight size={16} /></Button><div className="sidebar-user"><span className="user-avatar">AA</span><div><strong>Abdul Ahad</strong><span>Administrator</span></div><Button variant="ghost" size="icon" aria-label="Account menu" onClick={() => setProfile(!profile)}><ChevronsUpDown size={16} /></Button></div></div>
    </aside>
    <div className="workspace-main"><header className="topbar"><div className="breadcrumb"><Button variant="ghost" size="icon" className="mobile-menu" aria-label="Open navigation" onClick={() => setMenuOpen(true)}><Menu size={22} /></Button><PanelLeftClose size={18} className="desktop-sidebar-icon" /><span className="breadcrumb-parent">Workspace</span><span className="breadcrumb-divider">/</span><strong>{title}</strong></div><div className="topbar-tools"><span className="preview-label">Demo preview</span><div className="popover-wrap"><Button variant="ghost" size="icon" aria-label="Notifications" onClick={() => setNotifications(!notifications)}><Bell size={19} /><span className="notification-dot" /></Button>{notifications && <div className="toolbar-popover"><strong>Notifications</strong><p>{pending} journal entries are awaiting review.</p><Link to="/approvals" onClick={() => setNotifications(false)}>Review approvals <ArrowRight size={14} /></Link></div>}</div><span className="topbar-separator" /><div className="popover-wrap"><Button variant="ghost" size="icon" className="topbar-avatar" aria-label="Open profile" onClick={() => setProfile(!profile)}>AA</Button>{profile && <div className="toolbar-popover"><strong>Abdul Ahad</strong><p>Administrator · Demo workspace</p><p>Changes in this preview reset when the page is refreshed.</p></div>}</div></div></header>
      <main className="page-content">{children}</main><footer className="page-footer"><span>© 2026 LedgerDesk</span><span><span className="status-dot" />All figures in PKR</span></footer>
    </div>
    {help && <div className="modal-overlay" onClick={() => setHelp(false)}><section className="modal" role="dialog" aria-modal="true" aria-label="Help and support" onClick={e => e.stopPropagation()}><div className="section-heading"><h2>Help & support</h2><Button variant="ghost" size="icon" aria-label="Close help" onClick={() => setHelp(false)}><X size={20} /></Button></div><p>This is a redesigned preview of your LedgerDesk app, using sample records. Your original database, sign-in, and Google Drive are not connected.</p><p>For account access or bookkeeping questions, contact your workspace administrator.</p><Button onClick={() => setHelp(false)}>Got it</Button></section></div>}
  </div>;
}
export function PageHeading({ eyebrow, title, description, actions }: { eyebrow?: string; title: string; description: string; actions?: ReactNode }) {
  return <div className="page-heading"><div className="min-w-0">{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h1>{title}</h1><p className="page-description">{description}</p></div>{actions && <div className="page-actions">{actions}</div>}</div>;
}
export function NewEntryButton() { return <Button variant="primary" asChild><Link to="/new-journal"><Plus size={17} />New journal entry</Link></Button>; }
export function Overview() {
  const { journals, accounts } = useLedger();
  const [period, setPeriod] = useState('This month');
  const pending = journals.filter(j => j.status === 'Pending');
  const stats = [
    { label: 'Journal entries', value: String(journals.length), icon: BookOpen, note: `${journals.filter(j => j.status === 'Posted').length} posted entries`, change: 'Up to date', tone: 'green' },
    { label: 'Active accounts', value: String(accounts.filter(a => a.active).length), icon: ListTree, note: 'Across 5 account types', change: 'View accounts', tone: 'neutral' },
    { label: 'Total debits', value: compactMoney(journals.filter(j => j.status === 'Posted').reduce((s, j) => s + j.amount, 0)), icon: ArrowUpRight, note: 'Posted journal entries', change: 'PKR', tone: 'green' },
    { label: 'Total credits', value: compactMoney(journals.filter(j => j.status === 'Posted').reduce((s, j) => s + j.amount, 0)), icon: ArrowUpRight, note: 'Posted journal entries', change: 'PKR', tone: 'neutral' },
  ];
  const monthly = [{ m: 'May', debit: 48, credit: 35 }, { m: 'Jun', debit: 60, credit: 46 }, { m: 'Jul', debit: 52, credit: 43 }, { m: 'Aug', debit: 76, credit: 56 }, { m: 'Sep', debit: 63, credit: 49 }, { m: 'Oct', debit: 90, credit: 70 }];
  return <Workspace title="Overview"><PageHeading eyebrow="YOUR BOOKS, AT A GLANCE" title="Good afternoon, Abdul" description="Here’s what’s happening with your books today." actions={<><Button asChild><Link to="/import-journals"><Upload size={16} />Import journals</Link></Button><NewEntryButton /></>} />
    <div className="overview-date"><span><span className="status-dot" />Workspace overview</span><span>Sunday, October 11, 2026</span></div>
    <div className="stats-grid">{stats.map((stat, i) => <div className="stat-card" key={stat.label}><div className="stat-top"><span>{stat.label}</span><span className={`stat-icon stat-icon-${i}`}><stat.icon size={18} /></span></div><div className="stat-value">{stat.value}{i > 1 && <span>PKR</span>}</div><div className="stat-bottom"><span>{stat.note}</span>{i === 1 ? <Link to="/accounts">View accounts <ArrowUpRight size={12} /></Link> : <span className={i === 0 ? 'positive stat-change' : 'stat-change'}>{i === 0 && <Check size={12} />}{stat.change}</span>}</div></div>)}</div>
    <div className="overview-middle"><section className="chart-section"><div className="section-heading"><div><h2>Debit & credit activity</h2><p>A monthly look at your journal activity.</p></div><select aria-label="Activity period" value={period} onChange={e => setPeriod(e.target.value)}><option>This month</option><option>Last 3 months</option><option>Last 6 months</option></select></div><div className="chart-legend"><span><i className="legend-debit" />Debits</span><span><i className="legend-credit" />Credits</span><span className="chart-unit">PKR</span></div><div className="activity-chart"><div className="chart-labels"><span>500k</span><span>375k</span><span>250k</span><span>125k</span><span>0</span></div><div className="chart-plot"><div className="chart-gridlines"><i /><i /><i /><i /><i /></div><div className="chart-bars">{monthly.slice(period === 'Last 3 months' ? 3 : 0).map(item => <div className="chart-month" key={item.m}><div className="bar-pair"><div className="chart-bar bar-debit" title={`${item.m} debit activity`} style={{ height: `${item.debit}%` }} /><div className="chart-bar bar-credit" title={`${item.m} credit activity`} style={{ height: `${item.credit}%` }} /></div><span>{item.m}</span></div>)}</div></div></div></section>
      <section className="quick-section"><div className="section-heading"><div><h2>Quick actions</h2><p>A little less clicking. A little more done.</p></div></div><div className="quick-links"><Link to="/new-journal"><span className="quick-icon"><Plus size={19} /></span><span><strong>Create journal entry</strong><small>Record a new transaction</small></span><ArrowUpRight size={17} /></Link><Link to="/reports"><span className="quick-icon quick-blue"><ChartNoAxesCombined size={19} /></span><span><strong>View financial reports</strong><small>Get the complete picture</small></span><ArrowUpRight size={17} /></Link><Link to="/accounts"><span className="quick-icon quick-amber"><ListTree size={19} /></span><span><strong>Manage accounts</strong><small>Keep your accounts organized</small></span><ArrowUpRight size={17} /></Link></div><Link to="/approvals" className="approval-callout"><span className="approval-callout-icon"><ShieldCheck size={19} /></span><div><strong>{pending.length} entries need your review</strong><span>Head over to pending approvals</span></div><ArrowRight size={17} /></Link></section></div>
    <section className="journal-section"><div className="section-heading"><div><h2>Recent journal entries <span className="count-badge">{journals.length}</span></h2><p>Your latest transactions, all in one place.</p></div><Button variant="ghost" asChild><Link to="/journals">View all entries<ArrowRight size={16} /></Link></Button></div><JournalTable rows={journals.slice(0, 5)} /><div className="table-footer"><span>Showing {Math.min(5, journals.length)} of {journals.length} entries</span><span><ShieldCheck size={14} />Double-entry. Always balanced.</span></div></section>
    <div className="balance-notice"><span className="notice-icon"><Check size={16} /></span><div><strong>Your books are in balance.</strong><span>Total debits equal total credits across all posted entries.</span></div><Link to="/reports">View trial balance<ArrowRight size={15} /></Link></div>
  </Workspace>;
}