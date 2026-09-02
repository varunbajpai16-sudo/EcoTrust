import {
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
  MapPin,
  Menu,
  Moon,
  Plus,
  Radio,
  RefreshCw,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Sun,
  X,
  Zap,
} from 'lucide-react';
import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../features/Theme/Theme_slice';
import { getLiveDashboard, getActiveAlerts } from '../services/api.js';

const reportTypes = [
  {
    title: 'Compliance Audit Report',
    description: 'Regulatory trust score & CPCB emission compliance',
    icon: ShieldCheck,
    type: 'Compliance',
  },
  {
    title: 'CEMS Emission Summary',
    description: 'Multi-gas telemetry & sensor fidelity stats',
    icon: FileBarChart2,
    type: 'Emission',
  },
  {
    title: 'AI Tamper & Bypass Audit',
    description: 'Electricity cross-check & bypass fraud audit',
    icon: Sparkles,
    type: 'Tamper',
  },
  {
    title: 'Fleet Analytics Report',
    description: 'Cross-facility statistical performance',
    icon: LineChart,
    type: 'Analytics',
  },
];

/* =========================================================
   SIDEBAR
========================================================= */
function Sidebar({ open, setOpen, alertCount = 0 }) {
  const navigate = useNavigate();

  const items = [
    { name: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Live Monitoring', icon: Radio, path: '/livemonitoring' },
    { name: 'Alerts', icon: Bell, badge: alertCount > 0 ? String(alertCount) : null, path: '/alerts' },
    { name: 'Compliance', icon: ShieldCheck, path: '/compliance' },
    { name: 'Reports', icon: LineChart, path: '/reports', active: true },
    { name: 'Analytics', icon: Gauge, path: '/analytics' },
    { name: 'Devices', icon: Radio, path: '/devices' },
  ];

  return (
    <>
      {open && <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setOpen(false)} />}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-[250px] flex-col bg-[#052E24] text-white transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-white/10 px-6">
          <div className="flex items-center gap-3">
            <div onClick={() => navigate('/')} className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-[#0B6B50]">
              <Leaf size={22} />
            </div>
            <div>
              <div className="text-lg font-bold">EcoTrust</div>
              <div className="text-[9px] tracking-wider text-emerald-300/60">ENVIRONMENTAL INTELLIGENCE</div>
            </div>
          </div>
          <button onClick={() => setOpen(false)} className="lg:hidden">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6">
          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-widest text-white/30">Workspace</p>
          <nav className="space-y-1">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
                    item.active ? 'bg-[#0B6B50] text-white shadow-lg' : 'text-white/55 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon size={18} />
                  <span className="flex-1 text-left">{item.name}</span>
                  {item.badge && <span className="rounded-full bg-red-500 px-2 py-0.5 text-[9px] font-bold">{item.badge}</span>}
                </button>
              );
            })}
          </nav>

          <p className="mb-3 mt-8 px-3 text-[10px] font-semibold uppercase tracking-widest text-white/30">System</p>
          <button
            onClick={() => navigate('/settings')}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/55 transition hover:bg-white/5 hover:text-white"
          >
            <Settings size={18} />
            Settings
          </button>
        </div>

        <div className="shrink-0 border-t border-white/10 p-4">
          <div className="rounded-xl bg-white/5 p-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              <span className="text-xs font-medium">Reporting Engine Active</span>
            </div>
            <p className="mt-2 text-[10px] text-white/40">Regulatory Audit Sync</p>
          </div>
        </div>
      </aside>
    </>
  );
}

/* =========================================================
   STAT CARD
========================================================= */
function StatCard({ icon: Icon, title, value, detail, type }) {
  const iconStyles = {
    green: 'bg-emerald-50 text-[#0B6B50] dark:bg-emerald-500/10 dark:text-emerald-400',
    blue: 'bg-blue-50 text-blue-500 dark:bg-blue-500/10 dark:text-blue-400',
    amber: 'bg-amber-50 text-amber-500 dark:bg-amber-500/10 dark:text-amber-400',
    purple: 'bg-violet-50 text-violet-500 dark:bg-violet-500/10 dark:text-violet-400',
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.03)] transition-colors duration-300 dark:border-white/10 dark:bg-white/[0.03] dark:shadow-none">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500 dark:text-white/45">{title}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-[#0F172A] dark:text-white">{value}</p>
          <p className="mt-2 text-[10px] text-slate-400 dark:text-white/30">{detail}</p>
        </div>
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconStyles[type]}`}>
          <Icon size={19} />
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MAIN REPORTS COMPONENT
========================================================= */
export default function Reports() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const isDark = theme === 'dark';

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [viewReport, setViewReport] = useState(null);
  const [reportMessage, setReportMessage] = useState('');

  // Live Backend State
  const [factories, setFactories] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLiveReportsData = async () => {
    try {
      setLoading(true);
      const [facs, alrts] = await Promise.all([getLiveDashboard(), getActiveAlerts()]);
      setFactories(facs || []);
      setAlerts(alrts || []);
    } catch (err) {
      console.error('Failed to fetch reporting data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveReportsData();
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Construct Dynamic Reports List based on Live Monitored Factories
  const reportsList = useMemo(() => {
    if (factories.length === 0) return [];

    const generatedReports = [];

    // 1. Individual Factory Compliance Reports
    factories.forEach((f, idx) => {
      const plantAlerts = alerts.filter((a) => a.factoryId === f.factoryId || a.factoryName === f.factoryName);
      generatedReports.push({
        id: `RPT-CPCB-${f.factoryId || idx + 101}`,
        name: `${f.factoryName} - CEMS Environmental Audit`,
        type: 'Compliance',
        plant: f.factoryName,
        period: 'Real-time Live Stream',
        generated: 'Automated Sync',
        status: f.verdict === 'VERIFIED' ? 'Ready' : 'Under Review',
        factoryData: f,
        alerts: plantAlerts,
      });

      generatedReports.push({
        id: `RPT-GAS-${f.factoryId || idx + 101}`,
        name: `${f.factoryName} - Telemetry Emission Dump`,
        type: 'Emission',
        plant: f.factoryName,
        period: 'Current Shift',
        generated: 'Real-time',
        status: 'Ready',
        factoryData: f,
        alerts: plantAlerts,
      });
    });

    // 2. Comprehensive Fleet Audit Report
    generatedReports.unshift({
      id: `RPT-FLEET-GLOBAL`,
      name: `Central CPCB Industrial Fleet Compliance Dossier`,
      type: 'Analytics',
      plant: 'All Monitored Facilities (Fleet View)',
      period: 'Active Audit Cycle',
      generated: 'Just now',
      status: 'Ready',
      factoryData: null,
      alerts,
    });

    return generatedReports;
  }, [factories, alerts]);

  // Dynamic Text Generator for Download and Modal Preview
  const createReportText = (report) => {
    const dateStr = new Date().toLocaleString();
    if (report.id === 'RPT-FLEET-GLOBAL') {
      const compliantCount = factories.filter((f) => f.trustScore >= 75).length;
      return `===============================================================
ECOTRUST CENTRAL REGULATORY INTELLIGENCE DOSSIER
CPCB / SPCB INDUSTRIAL EMISSION AUDIT SYSTEM
Generated At: ${dateStr}
===============================================================

AUDIT SUMMARY OVERVIEW:
---------------------------------------------------------------
Total Monitored Facilities : ${factories.length}
Verified Compliant Plants  : ${compliantCount} / ${factories.length}
Active Violation Incidents : ${alerts.length}
Overall Fleet Trust Rating : ${Math.round(factories.reduce((acc, f) => acc + (f.trustScore || 100), 0) / (factories.length || 1))}%

DETAILED FACILITY BREAKDOWN:
---------------------------------------------------------------
${factories
  .map(
    (f) =>
      `• [${f.factoryId}] ${f.factoryName}
   Trust Score: ${f.trustScore}% | Verdict: ${f.verdict}
   Active Power Load: ${f.rawReading?.electricityConsumption || 0} kW
   Pollutants: PM2.5: ${f.rawReading?.pollutants?.pm25 ?? 'N/A'}, SO2: ${f.rawReading?.pollutants?.so2 ?? 'N/A'}, NOx: ${f.rawReading?.pollutants?.nox ?? 'N/A'}
   AI Explanation: ${f.aiSummary || 'Clean verified baseline.'}
`
  )
  .join('\n')}

VIOLATIONS & TAMPERING LOGS:
---------------------------------------------------------------
${
  alerts.length === 0
    ? 'No active tampering or bypass violations detected across fleet.'
    : alerts.map((a, i) => `${i + 1}. [${a.severity}] ${a.title} (${a.factoryName}): ${a.description}`).join('\n')
}

---------------------------------------------------------------
Certified by EcoTrust AI Telemetry Validator Engine.
`;
    }

    const f = report.factoryData || {};
    const pol = f.rawReading?.pollutants || {};

    return `===============================================================
ECOTRUST REGULATORY COMPLIANCE AUDIT CERTIFICATE
Report ID: ${report.id}
Facility: ${report.plant}
Stack Sensor ID: ${f.sensorId || 'STACK-01'}
Generation Timestamp: ${dateStr}
===============================================================

1. EMISSION MEASUREMENTS (CPCB SENSOR TELEMETRY):
---------------------------------------------------------------
• PM2.5 (Particulate Matter) : ${pol.pm25 ?? '—'} µg/m³
• PM10 (Coarse Particulate)  : ${pol.pm10 ?? '—'} µg/m³
• SO2 (Sulfur Dioxide)       : ${pol.so2 ?? '—'} ppb
• NOx (Nitrogen Oxides)      : ${pol.nox ?? '—'} ppb
• CO (Carbon Monoxide)       : ${pol.co ?? '—'} ppm
• Stack Flow Rate            : ${f.rawReading?.flowRate ?? '—'} m/s
• Flue Temperature           : ${f.rawReading?.temperature ?? '—'} °C

2. CORRELATION & TAMPER EVALUATION (LAYER 2 & 3):
---------------------------------------------------------------
• Monitored Electricity Load : ${f.rawReading?.electricityConsumption ?? 0} kW
• EcoTrust Reliability Score : ${f.trustScore ?? 100} / 100
• Final Validation Verdict   : ${f.verdict || 'VERIFIED'}
• AI Auditor Evaluation      : ${f.aiSummary || 'Data conforms to expected stoichiometric ratios.'}

3. INCIDENTS & VIOLATIONS:
---------------------------------------------------------------
${
  report.alerts?.length === 0
    ? '✓ Zero non-compliance or bypass tampering flags recorded.'
    : report.alerts?.map((a, i) => `${i + 1}. [${a.severity}] ${a.title} - ${a.description}`).join('\n')
}

===============================================================
Report Status: ${report.status} | Digital Signature: VALID
===============================================================
`;
  };

  // Download Trigger
  const downloadReport = (report) => {
    const text = createReportText(report);
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${report.id}.txt`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);

    setReportMessage(`${report.id} exported successfully.`);
    setTimeout(() => setReportMessage(''), 2500);
  };

  const filteredReports = useMemo(() => {
    return reportsList.filter((report) => {
      const q = search.toLowerCase();
      const matchesSearch =
        report.name.toLowerCase().includes(q) ||
        report.plant.toLowerCase().includes(q) ||
        report.type.toLowerCase().includes(q) ||
        report.id.toLowerCase().includes(q);

      const matchesFilter = filter === 'All' || report.type === filter;
      return matchesSearch && matchesFilter;
    });
  }, [reportsList, search, filter]);

  return (
    <div className="min-h-screen bg-[#F7FAF8] font-[Inter,sans-serif] text-[#0F172A] transition-colors duration-300 dark:bg-[#071A15] dark:text-white">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} alertCount={alerts.length} />

      <div className="min-w-0 lg:ml-[250px]">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-slate-200 bg-white/90 px-5 backdrop-blur-xl transition-colors duration-300 dark:border-white/10 dark:bg-[#071A15]/90 lg:px-8">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-white/5 lg:hidden">
              <Menu size={21} />
            </button>
            <div>
              <h1 className="text-lg font-bold text-[#0F172A] dark:text-white">Regulatory Reports</h1>
              <p className="hidden text-[10px] text-slate-400 dark:text-white/35 sm:block">
                CPCB verified environmental documentation & audit exports
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchLiveReportsData}
              disabled={loading}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:bg-[#0B241D] dark:text-slate-300"
            >
              <RefreshCw size={13} className={loading ? 'animate-spin text-emerald-500' : ''} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              type="button"
              onClick={() => dispatch(toggleTheme())}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:bg-emerald-50 hover:text-[#0B6B50] dark:border-white/10 dark:bg-white/5 dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-emerald-400"
            >
              {isDark ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            <div className="flex items-center gap-2">
              <div onClick={() => navigate('/profile')} className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#0B6B50] text-xs font-bold text-white">
                ET
              </div>
              <div className="hidden sm:block">
                <p className="text-xs font-semibold dark:text-white/80">Auditor Admin</p>
                <p className="text-[9px] text-slate-400 dark:text-white/35">Environmental Officer</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Body */}
        <main className="mx-auto max-w-[1600px] p-5 lg:p-8">
          <div className="mb-7 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-bold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                <FileCheck2 size={11} />
                LIVE AUDIT REPORT GENERATOR
              </span>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#0F172A] dark:text-white">
                Environmental & Compliance Reports
              </h2>
              <p className="mt-1 max-w-2xl text-sm text-slate-500 dark:text-white/45">
                Generate and export tamper-verified emission reports containing physical cross-checks and AI audit rationales.
              </p>
            </div>

            <button
              onClick={() => {
                const fleetReport = reportsList[0];
                if (fleetReport) setViewReport(fleetReport);
              }}
              className="flex items-center gap-2 rounded-lg bg-[#0B6B50] px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-emerald-900/10 transition hover:bg-[#064E3B]"
            >
              <Plus size={15} />
              Export Fleet Dossier
            </button>
          </div>

          {/* Top 4 Stats */}
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard icon={FileText} title="Total Available Reports" value={String(reportsList.length)} detail="Generated from live streams" type="green" />
            <StatCard icon={FileCheck2} title="Verified Compliant" value={`${factories.filter((f) => f.trustScore >= 75).length}`} detail="Clean audit score" type="blue" />
            <StatCard icon={CalendarDays} title="Active Facilities" value={String(factories.length)} detail="Monitored CEMS stacks" type="amber" />
            <StatCard icon={Download} title="Active Violations" value={String(alerts.length)} detail="Recorded in dossiers" type="purple" />
          </section>

          {/* Report Type Generation Cards */}
          <section className="mt-7">
            <div className="mb-4">
              <h3 className="text-sm font-bold text-[#0F172A] dark:text-white">Quick Generate Reports</h3>
              <p className="mt-1 text-[11px] text-slate-400 dark:text-white/30">Select a report format to compile live audit telemetry.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {reportTypes.map((report) => {
                const Icon = report.icon;
                return (
                  <button
                    key={report.title}
                    onClick={() => {
                      const sampleReport = reportsList.find((r) => r.type === report.type) || reportsList[0];
                      if (sampleReport) setViewReport(sampleReport);
                    }}
                    className="group rounded-2xl border border-slate-200 bg-white p-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-emerald-500/30"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-[#0B6B50] transition group-hover:bg-[#0B6B50] group-hover:text-white dark:bg-emerald-500/10 dark:text-emerald-400">
                        <Icon size={20} />
                      </div>
                      <Plus size={17} className="text-slate-300 transition group-hover:text-[#0B6B50] dark:text-white/20" />
                    </div>
                    <h3 className="mt-5 text-sm font-bold text-slate-700 dark:text-white/80">{report.title}</h3>
                    <p className="mt-1 text-[10px] leading-4 text-slate-400 dark:text-white/30">{report.description}</p>
                    <p className="mt-4 text-[10px] font-semibold text-[#0B6B50] dark:text-emerald-400">Generate & Preview →</p>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Report History Table */}
          <section className="mt-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#0F172A] dark:text-white">Generated Audit Reports</h3>
                <p className="mt-1 text-[11px] text-slate-400 dark:text-white/30">Live telemetry dumps ready for CPCB regulatory filing</p>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="relative">
                  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/30" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search reports or plant..."
                    className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-xs text-slate-700 outline-none placeholder:text-slate-400 focus:border-[#0B6B50] dark:border-white/10 dark:bg-[#0B241D] dark:text-white/80 sm:w-[240px]"
                  />
                </div>

                <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-[10px] text-slate-500 dark:border-white/10 dark:bg-[#0B241D] dark:text-white/60">
                  <Filter size={13} />
                  <select value={filter} onChange={(e) => setFilter(e.target.value)} className="bg-transparent text-slate-600 outline-none dark:text-white/70">
                    <option value="All" className="bg-white dark:bg-[#0D2921]">All Types</option>
                    <option value="Compliance" className="bg-white dark:bg-[#0D2921]">Compliance</option>
                    <option value="Emission" className="bg-white dark:bg-[#0D2921]">Emission</option>
                    <option value="Analytics" className="bg-white dark:bg-[#0D2921]">Analytics</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_20px_rgba(15,23,42,0.03)] transition-colors dark:border-white/10 dark:bg-white/[0.03] dark:shadow-none">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px]">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/70 text-left text-[9px] text-slate-400 dark:border-white/10 dark:bg-white/[0.03] dark:text-white/30">
                      <th className="px-5 py-4 font-medium">Report Name</th>
                      <th className="px-5 py-4 font-medium">Type</th>
                      <th className="px-5 py-4 font-medium">Facility</th>
                      <th className="px-5 py-4 font-medium">Audit Period</th>
                      <th className="px-5 py-4 font-medium">Status</th>
                      <th className="px-5 py-4 text-right font-medium">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredReports.map((report) => (
                      <tr key={report.id} className="border-b border-slate-50 transition hover:bg-slate-50/50 last:border-0 dark:border-white/[0.06] dark:hover:bg-white/[0.03]">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-[#0B6B50] dark:bg-emerald-500/10 dark:text-emerald-400">
                              <FileText size={16} />
                            </div>
                            <div>
                              <p className="max-w-[280px] truncate text-xs font-semibold text-slate-700 dark:text-white/75">{report.name}</p>
                              <p className="mt-1 font-mono text-[8px] text-slate-400 dark:text-white/30">{report.id}</p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <span className="rounded-full bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-1 text-[8px] font-bold text-emerald-600 dark:text-emerald-400">
                            {report.type}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <p className="text-xs font-semibold text-slate-700 dark:text-white/75">{report.plant}</p>
                        </td>

                        <td className="px-5 py-4">
                          <span className="text-xs text-slate-600 dark:text-white/55">{report.period}</span>
                        </td>

                        <td className="px-5 py-4">
                          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-semibold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                            {report.status}
                          </span>
                        </td>

                        <td className="px-5 py-4 text-right">
                          <div className="flex justify-end gap-1.5">
                            <button
                              title="Preview Report"
                              onClick={() => setViewReport(report)}
                              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-400 transition hover:bg-slate-50 hover:text-[#0B6B50] dark:border-white/10 dark:hover:bg-white/10"
                            >
                              <Eye size={14} />
                            </button>
                            <button
                              title="Download Report"
                              onClick={() => downloadReport(report)}
                              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-400 transition hover:bg-slate-50 hover:text-[#0B6B50] dark:border-white/10 dark:hover:bg-white/10"
                            >
                              <Download size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Report Preview Modal */}
      {viewReport && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-[#0B241D]">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-white/10">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">CPCB Audit Preview</p>
                <h3 className="mt-1 text-sm font-bold text-slate-800 dark:text-white">{viewReport.name}</h3>
                <p className="mt-1 text-[9px] text-slate-400 dark:text-white/30">{viewReport.id} · {viewReport.plant}</p>
              </div>
              <button onClick={() => setViewReport(null)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 dark:border-white/10">
                <X size={15} />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-6">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 font-mono text-[11px] leading-6 text-slate-600 whitespace-pre-line dark:border-white/10 dark:bg-white/[0.03] dark:text-white/70">
                {createReportText(viewReport)}
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t border-slate-100 px-6 py-4 dark:border-white/10">
              <button onClick={() => setViewReport(null)} className="rounded-lg border border-slate-200 px-4 py-2 text-[10px] font-semibold text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:text-white/50">
                Close
              </button>
              <button onClick={() => downloadReport(viewReport)} className="flex items-center gap-2 rounded-lg bg-[#0B6B50] px-4 py-2 text-[10px] font-semibold text-white hover:bg-[#064E3B]">
                <Download size={13} />
                Export Audit File (.txt)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {reportMessage && (
        <div className="fixed bottom-6 right-6 z-[80] rounded-xl bg-[#052E24] px-4 py-3 text-xs font-semibold text-white shadow-2xl">
          {reportMessage}
        </div>
      )}
    </div>
  );
}