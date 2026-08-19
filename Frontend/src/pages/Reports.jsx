import {
  MapPin,
  Bell,
  CalendarDays,
  ChevronDown,
  Download,
  Eye,
  FileBarChart2,
  FileCheck2,
  FileText,
  Filter,
  Gauge,
  LayoutDashboard,
  Leaf,
  LineChart,
  Menu,
  Plus,
  Radio,
  Search,
  Settings,
  ShieldCheck,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
const reports = [
  {
    id: 'RPT-2026-0824',
    name: 'Monthly Environmental Compliance Report',
    type: 'Compliance',
    plant: 'Plant A',
    period: 'July 2026',
    generated: 'Aug 02, 2026',
    status: 'Ready',
    format: 'PDF',
  },
  {
    id: 'RPT-2026-0823',
    name: 'CEMS Emission Summary',
    type: 'Emission',
    plant: 'Plant B',
    period: 'July 2026',
    generated: 'Aug 02, 2026',
    status: 'Ready',
    format: 'PDF',
  },
  {
    id: 'RPT-2026-0822',
    name: 'Environmental Monitoring Report',
    type: 'Monitoring',
    plant: 'Plant C',
    period: 'July 2026',
    generated: 'Aug 01, 2026',
    status: 'Ready',
    format: 'PDF',
  },
  {
    id: 'RPT-2026-0821',
    name: 'Regulatory Submission Report',
    type: 'Regulatory',
    plant: 'Plant D',
    period: 'July 2026',
    generated: 'Aug 01, 2026',
    status: 'Submitted',
    format: 'PDF',
  },
  {
    id: 'RPT-2026-0820',
    name: 'Quarterly Emission Analysis',
    type: 'Analytics',
    plant: 'All Plants',
    period: 'Q2 2026',
    generated: 'Jul 15, 2026',
    status: 'Ready',
    format: 'PDF',
  },
  {
    id: 'RPT-2026-0819',
    name: 'CEMS Data Quality Report',
    type: 'Data Quality',
    plant: 'Plant A',
    period: 'July 2026',
    generated: 'Jul 31, 2026',
    status: 'Processing',
    format: 'PDF',
  },
];

const reportTypes = [
  {
    title: 'Compliance Report',
    description: 'Regulatory compliance and violations',
    icon: ShieldCheck,
  },
  {
    title: 'Emission Report',
    description: 'CEMS emission measurements',
    icon: FileBarChart2,
  },
  {
    title: 'Monitoring Report',
    description: 'Environmental sensor readings',
    icon: Radio,
  },
  {
    title: 'Analytics Report',
    description: 'Trends and environmental insights',
    icon: LineChart,
  },
];

function Sidebar({ open, setOpen }) {
   const navigate = useNavigate()
  const items = [
    {
      name: 'Overview',
      icon: LayoutDashboard,
      path: '/dashboard',
    },
    {
      name: 'Live Monitoring',
      icon: Radio,
      path: '/livemonitoring',
       
    },
    {
      name: 'Alerts',
      icon: Bell,
      badge: '12',
      path: '/alerts',
    },
    {
      name: 'Compliance',
      icon: ShieldCheck,
      path: '/compliance',
    },
    {
      name: 'Reports',
      icon: LineChart,
      path: '/reports',
      active:true
    },
    {
      name: 'Analytics',
      icon: Gauge,
      path: '/analytics',
    },
    {
      name: 'Devices',
      icon: Radio,
      path: '/devices',
    },
  ];

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-[250px]
        flex-col bg-[#052E24] text-white transition-transform duration-300
        ${open ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-white/10 px-6">
          <div className="flex items-center gap-3">
           <div onClick={()=>navigate("/")} className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0B6B50] hover:cursor-pointer">
              <Leaf size={22} />
            </div>

            <div>
              <div className="text-lg font-bold">EcoTrust</div>

              <div className="text-[9px] tracking-wider text-emerald-300/60">
                ENVIRONMENTAL INTELLIGENCE
              </div>
            </div>
          </div>

          <button onClick={() => setOpen(false)} className="lg:hidden">
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-widest text-white/30">
            Workspace
          </p>

          <nav className="space-y-1">
            {items.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.name}
                  onClick={()=>navigate(item.path)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
                    item.active
                      ? 'bg-[#0B6B50] text-white shadow-lg'
                      : 'text-white/55 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon size={18} />

                  <span className="flex-1 text-left">{item.name}</span>

                  {item.badge && (
                    <span className="rounded-full bg-red-500 px-2 py-0.5 text-[9px] font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <p className="mb-3 mt-8 px-3 text-[10px] font-semibold uppercase tracking-widest text-white/30">
            System
          </p>

          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/55 hover:bg-white/5 hover:text-white">
            <Settings size={18} />
            Settings
          </button>
        </div>

        {/* Status */}
        <div className="shrink-0 border-t border-white/10 p-4">
          <div className="rounded-xl bg-white/5 p-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

              <span className="text-xs font-medium">
                Reporting engine active
              </span>
            </div>

            <p className="mt-2 text-[10px] text-white/40">
              Reports synchronized
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

function StatCard({ icon: Icon, title, value, detail, type }) {
  const iconStyles = {
    green: 'bg-emerald-50 text-[#0B6B50]',
    blue: 'bg-blue-50 text-blue-500',
    amber: 'bg-amber-50 text-amber-500',
    purple: 'bg-violet-50 text-violet-500',
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.03)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500">{title}</p>

          <p className="mt-2 text-2xl font-bold tracking-tight">{value}</p>

          <p className="mt-2 text-[10px] text-slate-400">{detail}</p>
        </div>

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconStyles[type]}`}
        >
          <Icon size={19} />
        </div>
      </div>
    </div>
  );
}

function ReportTypeCard({ report, onGenerate }) {
  const Icon = report.icon;

  return (
    <button
      onClick={() => onGenerate(report)}
      className="group rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-lg"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-[#0B6B50] transition group-hover:bg-[#0B6B50] group-hover:text-white">
          <Icon size={20} />
        </div>

        <Plus
          size={17}
          className="text-slate-300 transition group-hover:text-[#0B6B50]"
        />
      </div>

      <h3 className="mt-5 text-sm font-bold text-slate-700">{report.title}</h3>

      <p className="mt-1 text-[10px] leading-4 text-slate-400">
        {report.description}
      </p>

      <p className="mt-4 text-[10px] font-semibold text-[#0B6B50]">
        Generate report →
      </p>
    </button>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Ready: 'bg-emerald-50 text-emerald-600',
    Submitted: 'bg-blue-50 text-blue-600',
    Processing: 'bg-amber-50 text-amber-600',
  };

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[9px] font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function TypeBadge({ type }) {
  const styles = {
    Compliance: 'bg-emerald-50 text-emerald-600',
    Emission: 'bg-blue-50 text-blue-600',
    Monitoring: 'bg-violet-50 text-violet-600',
    Regulatory: 'bg-amber-50 text-amber-600',
    Analytics: 'bg-indigo-50 text-indigo-600',
    'Data Quality': 'bg-slate-100 text-slate-600',
  };

  return (
    <span
      className={`rounded-full px-2 py-1 text-[8px] font-semibold ${styles[type]}`}
    >
      {type}
    </span>
  );
}

export default function Reports() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [viewReport, setViewReport] = useState(null);
  const [reportMessage, setReportMessage] = useState('');

  const createReportText = (report) => {
    return `ECOTRUST
ENVIRONMENTAL INTELLIGENCE

${report.name}
Report ID: ${report.id}
Facility: ${report.plant}
Reporting Period: ${report.period}
Generated: ${report.generated}
Status: ${report.status}

ENVIRONMENTAL COMPLIANCE SUMMARY
--------------------------------
Overall compliance: 98.7%
PM2.5 compliance: 99.2%
PM10 compliance: 98.6%
SO2 compliance: 99.4%
NOx compliance: 97.8%
CO2 compliance: 98.1%

VIOLATIONS
----------
No additional violations recorded in this demo report.

This report was generated by the EcoTrust environmental monitoring system.
`;
  };

  const downloadReport = (report) => {
    if (report.status === 'Processing') return;

    const blob = new Blob([createReportText(report)], {
      type: 'text/plain;charset=utf-8',
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${report.id}-${report.name.replace(/[^a-z0-9]+/gi, '-')}.txt`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);

    setReportMessage(`${report.id} downloaded successfully.`);
    setTimeout(() => setReportMessage(''), 2500);
  };

  const viewReportDetails = (report) => {
    if (report.status === 'Processing') return;
    setViewReport(report);
  };

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.name.toLowerCase().includes(search.toLowerCase()) ||
      report.plant.toLowerCase().includes(search.toLowerCase()) ||
      report.type.toLowerCase().includes(search.toLowerCase());

    const matchesFilter = filter === 'All' || report.type === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-[#F7FAF8] font-[Inter,sans-serif] text-[#0F172A]">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Main content */}
      <div className="min-w-0 lg:ml-[250px]">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-slate-200 bg-white/90 px-5 backdrop-blur-xl lg:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"
            >
              <Menu size={21} />
            </button>

            <div>
              <h1 className="text-lg font-bold">Reports</h1>

              <p className="hidden text-[10px] text-slate-400 sm:block">
                Environmental reports and regulatory documentation
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-[10px] font-semibold text-emerald-700 sm:flex">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Reporting system active
            </div>

            <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500">
              <Bell size={17} />

              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
            </button>

            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0B6B50] text-xs font-bold text-white">
                VB
              </div>

              <div className="hidden sm:block">
                <p className="text-xs font-semibold">Admin</p>

                <p className="text-[9px] text-slate-400">
                  Environmental Officer
                </p>
              </div>

              <ChevronDown
                size={14}
                className="hidden text-slate-400 sm:block"
              />
            </div>
          </div>
        </header>

        {/* Page */}
        <main className="mx-auto max-w-[1600px] p-5 lg:p-8">
          {/* Heading */}
          <div className="mb-7 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-bold text-emerald-600">
                  <FileCheck2 size={11} />
                  REPORTING CENTER
                </span>
              </div>

              <h2 className="mt-3 text-2xl font-bold tracking-tight">
                Environmental Reports
              </h2>

              <p className="mt-1 max-w-2xl text-sm text-slate-500">
                Generate, review and manage environmental monitoring, emission
                and compliance reports.
              </p>
            </div>

            <button
              onClick={() => {
                const report = {
                  id: `RPT-DEMO-${Date.now().toString().slice(-6)}`,
                  name: 'Environmental Compliance Report',
                  type: 'Compliance',
                  plant: 'All Plants',
                  period: 'Current Period',
                  generated: 'Just now',
                  status: 'Ready',
                  format: 'PDF',
                };
                setViewReport(report);
              }}
              className="flex items-center gap-2 self-start rounded-lg bg-[#0B6B50] px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-emerald-900/10 hover:bg-[#064E3B]"
            >
              <Plus size={15} />
              Create Report
            </button>
          </div>

          {/* Stats */}
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              icon={FileText}
              title="Total Reports"
              value="248"
              detail="Generated this year"
              type="green"
            />

            <StatCard
              icon={FileCheck2}
              title="Ready Reports"
              value="42"
              detail="Available to download"
              type="blue"
            />

            <StatCard
              icon={CalendarDays}
              title="Scheduled"
              value="18"
              detail="Upcoming reports"
              type="amber"
            />

            <StatCard
              icon={Download}
              title="Downloads"
              value="1,284"
              detail="This month"
              type="purple"
            />
          </section>

          {/* Generate report */}
          <section className="mt-5">
            <div className="mb-4">
              <h3 className="text-sm font-bold">Generate a Report</h3>

              <p className="mt-1 text-[11px] text-slate-400">
                Select a report type to create a new environmental report.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {reportTypes.map((report) => (
                <ReportTypeCard
                  key={report.title}
                  report={report}
                  onGenerate={(type) => {
                    const newReport = {
                      id: `RPT-DEMO-${Date.now().toString().slice(-6)}`,
                      name: type.title,
                      type: type.title.replace(' Report', ''),
                      plant: 'All Plants',
                      period: 'Current Period',
                      generated: 'Just now',
                      status: 'Ready',
                      format: 'PDF',
                    };
                    setViewReport(newReport);
                    setReportMessage(`${type.title} generated successfully.`);
                    setTimeout(() => setReportMessage(''), 2500);
                  }}
                />
              ))}
            </div>
          </section>

          {/* Scheduled report banner */}
          <section className="mt-5 flex flex-col gap-4 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5 lg:flex-row lg:items-center">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0B6B50] text-white">
              <CalendarDays size={20} />
            </div>

            <div className="flex-1">
              <p className="text-sm font-bold text-[#064E3B]">
                18 reports are scheduled
              </p>

              <p className="mt-1 text-[10px] text-emerald-700/70">
                Your automated compliance and monitoring reports will be
                generated according to their configured schedules.
              </p>
            </div>

            <button className="rounded-lg border border-emerald-200 bg-white px-4 py-2.5 text-[10px] font-semibold text-[#0B6B50]">
              Manage Schedules
            </button>
          </section>

          {/* Report history */}
          <section className="mt-7">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h3 className="text-sm font-bold">Report History</h3>

                <p className="mt-1 text-[11px] text-slate-400">
                  Previously generated environmental reports
                </p>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                {/* Search */}
                <div className="relative">
                  <Search
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search reports..."
                    className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-xs outline-none focus:border-[#0B6B50] sm:w-[220px]"
                  />
                </div>

                {/* Filter */}
                <button className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-[10px] text-slate-500">
                  <Filter size={13} />

                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="bg-transparent outline-none"
                  >
                    <option value="All">All Types</option>

                    <option value="Compliance">Compliance</option>

                    <option value="Emission">Emission</option>

                    <option value="Monitoring">Monitoring</option>

                    <option value="Regulatory">Regulatory</option>

                    <option value="Analytics">Analytics</option>
                  </select>
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_20px_rgba(15,23,42,0.03)]">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px]">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/70 text-left text-[9px] text-slate-400">
                      <th className="px-5 py-4 font-medium">Report</th>

                      <th className="px-5 py-4 font-medium">Type</th>

                      <th className="px-5 py-4 font-medium">Facility</th>

                      <th className="px-5 py-4 font-medium">Period</th>

                      <th className="px-5 py-4 font-medium">Generated</th>

                      <th className="px-5 py-4 font-medium">Status</th>

                      <th className="px-5 py-4 text-right font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredReports.map((report) => (
                      <tr
                        key={report.id}
                        className="border-b border-slate-50 transition hover:bg-slate-50/50 last:border-0"
                      >
                        {/* Report */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-[#0B6B50]">
                              <FileText size={16} />
                            </div>

                            <div>
                              <p className="max-w-[280px] truncate text-xs font-semibold text-slate-700">
                                {report.name}
                              </p>

                              <p className="mt-1 font-mono text-[8px] text-slate-400">
                                {report.id}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Type */}
                        <td className="px-5 py-4">
                          <TypeBadge type={report.type} />
                        </td>

                        {/* Plant */}
                        <td className="px-5 py-4">
                          <div>
                            <p className="text-xs font-semibold text-slate-700">
                              {report.plant}
                            </p>

                            <p className="mt-1 flex items-center gap-1 text-[9px] text-slate-400">
                              <MapPin size={9} />
                              Environmental facility
                            </p>
                          </div>
                        </td>

                        {/* Period */}
                        <td className="px-5 py-4">
                          <span className="text-xs text-slate-600">
                            {report.period}
                          </span>
                        </td>

                        {/* Generated */}
                        <td className="px-5 py-4">
                          <span className="text-[10px] text-slate-500">
                            {report.generated}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="px-5 py-4">
                          <StatusBadge status={report.status} />
                        </td>

                        {/* Actions */}
                        <td className="px-5 py-4">
                          <div className="flex justify-end gap-1.5">
                            <button
                              title="View report"
                              onClick={() => viewReportDetails(report)}
                              disabled={report.status === 'Processing'}
                              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-[#0B6B50] disabled:cursor-not-allowed disabled:opacity-40"
                            >
                              <Eye size={14} />
                            </button>

                            <button
                              title="Download report"
                              onClick={() => downloadReport(report)}
                              disabled={report.status === 'Processing'}
                              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-[#0B6B50] disabled:cursor-not-allowed disabled:opacity-40"
                            >
                              <Download size={14} />
                            </button>

                            <button
                              title="More"
                              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50"
                            >
                              <ChevronDown size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Empty state */}
              {filteredReports.length === 0 && (
                <div className="py-16 text-center">
                  <FileText size={32} className="mx-auto text-slate-300" />

                  <p className="mt-4 text-sm font-semibold text-slate-600">
                    No reports found
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Try changing your search or filter.
                  </p>
                </div>
              )}

              {/* Pagination */}
              <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[9px] text-slate-400">
                  Showing {filteredReports.length} of 248 reports
                </p>

                <div className="flex items-center gap-1">
                  <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-[9px] text-slate-400">
                    Previous
                  </button>

                  <button className="rounded-lg bg-[#0B6B50] px-3 py-1.5 text-[9px] font-semibold text-white">
                    1
                  </button>

                  <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-[9px] text-slate-500">
                    2
                  </button>

                  <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-[9px] text-slate-500">
                    3
                  </button>

                  <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-[9px] text-slate-500">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Reporting info */}
          <section className="mt-5 grid gap-5 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-500">
                  <FileCheck2 size={19} />
                </div>

                <div>
                  <h3 className="text-sm font-bold">Regulatory Reports</h3>

                  <p className="mt-1 text-[10px] text-slate-400">
                    Track reports required for regulatory submissions.
                  </p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3">
                <div className="rounded-xl bg-emerald-50 p-3 text-center">
                  <p className="text-lg font-bold text-emerald-600">48</p>

                  <p className="text-[8px] text-emerald-700">Submitted</p>
                </div>

                <div className="rounded-xl bg-amber-50 p-3 text-center">
                  <p className="text-lg font-bold text-amber-600">2</p>

                  <p className="text-[8px] text-amber-700">Pending</p>
                </div>

                <div className="rounded-xl bg-red-50 p-3 text-center">
                  <p className="text-lg font-bold text-red-500">0</p>

                  <p className="text-[8px] text-red-600">Overdue</p>
                </div>
              </div>

              <button className="mt-5 w-full rounded-lg border border-slate-200 py-2.5 text-[10px] font-semibold text-slate-600 hover:bg-slate-50">
                Manage Regulatory Reports
              </button>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-[#0B6B50]">
                  <CalendarDays size={19} />
                </div>

                <div>
                  <h3 className="text-sm font-bold">Upcoming Reports</h3>

                  <p className="mt-1 text-[10px] text-slate-400">
                    Reports scheduled for the next 30 days.
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {[
                  ['Monthly Compliance Report', 'Plant A', 'Aug 31'],
                  ['CEMS Emission Summary', 'Plant B', 'Sep 02'],
                  ['Environmental Monitoring', 'All Plants', 'Sep 05'],
                ].map(([name, plant, date]) => (
                  <div
                    key={name}
                    className="flex items-center justify-between rounded-xl border border-slate-100 p-3"
                  >
                    <div>
                      <p className="text-xs font-semibold text-slate-700">
                        {name}
                      </p>

                      <p className="mt-1 text-[9px] text-slate-400">{plant}</p>
                    </div>

                    <span className="font-mono text-[10px] font-semibold text-[#0B6B50]">
                      {date}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {reportMessage && (
            <div className="fixed bottom-6 right-6 z-[80] rounded-xl bg-[#052E24] px-4 py-3 text-xs font-semibold text-white shadow-2xl">
              {reportMessage}
            </div>
          )}

          {viewReport && (
            <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
              <div className="max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-emerald-600">
                      Report Preview
                    </p>
                    <h3 className="mt-1 text-sm font-bold text-slate-800">
                      {viewReport.name}
                    </h3>
                    <p className="mt-1 text-[9px] text-slate-400">
                      {viewReport.id} · {viewReport.plant} · {viewReport.period}
                    </p>
                  </div>

                  <button
                    onClick={() => setViewReport(null)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50"
                  >
                    <X size={15} />
                  </button>
                </div>

                <div className="max-h-[60vh] overflow-y-auto p-6">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 font-mono text-[10px] leading-6 text-slate-600 whitespace-pre-line">
                    {createReportText(viewReport)}
                  </div>
                </div>

                <div className="flex justify-end gap-2 border-t border-slate-100 px-6 py-4">
                  <button
                    onClick={() => setViewReport(null)}
                    className="rounded-lg border border-slate-200 px-4 py-2 text-[10px] font-semibold text-slate-600"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => downloadReport(viewReport)}
                    className="flex items-center gap-2 rounded-lg bg-[#0B6B50] px-4 py-2 text-[10px] font-semibold text-white hover:bg-[#064E3B]"
                  >
                    <Download size={13} />
                    Download Report
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <section className="mt-5 flex flex-col gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-5 sm:flex-row sm:items-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
              <FileBarChart2 size={19} />
            </div>

            <div className="flex-1">
              <p className="text-xs font-bold text-emerald-800">
                Automated reporting is active
              </p>

              <p className="mt-1 text-[10px] text-emerald-700/70">
                EcoTrust automatically collects monitoring and compliance data
                to generate accurate environmental reports.
              </p>
            </div>

            <span className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[9px] font-semibold text-emerald-600">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              System Active
            </span>
          </section>
        </main>
      </div>
    </div>
  );
}
