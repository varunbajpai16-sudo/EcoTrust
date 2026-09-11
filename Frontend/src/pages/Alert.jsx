import {
  AlertCircle,
  Bell,
  CheckCircle2,
  ChevronDown,
  CircleAlert,
  Clock3,
  Filter,
  Gauge,
  LayoutDashboard,
  Leaf,
  LineChart,
  MapPin,
  Menu,
  Moon,
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
import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toggleTheme } from '../features/Theme/Theme_slice';
import { getActiveAlerts, resolveAlert } from '../services/api.js';

// Relative time helper
function timeAgo(dateString) {
  if (!dateString) return 'Just now';
  const diffMs = Date.now() - new Date(dateString).getTime();
  const diffSec = Math.floor(diffMs / 1000);
  if (diffSec < 60) return `${diffSec}s ago`;
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHours = Math.floor(diffMin / 60);
  return `${diffHours}h ago`;
}

function Sidebar({ open, setOpen, alertCount = 0 }) {
  const navigate = useNavigate();
  const items = [
    { name: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Live Monitoring', icon: Radio, path: '/livemonitoring' },
    { name: 'Alerts', icon: Bell, badge: alertCount > 0 ? String(alertCount) : null, path: '/alerts', active: true },
    { name: 'Compliance', icon: ShieldCheck, path: '/compliance' },
    { name: 'Reports', icon: LineChart, path: '/reports' },
    { name: 'Analytics', icon: Gauge, path: '/analytics' },
    { name: 'Devices', icon: Radio, path: '/devices' },
  ];

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setOpen(false)} />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-[250px]
        flex-col bg-[#052E24] text-white transition-transform duration-300
        ${open ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0`}
      >
        <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-white/10 px-6">
          <div className="flex items-center gap-3">
            <div onClick={() => navigate('/')} className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0B6B50] hover:cursor-pointer">
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
                  onClick={() => navigate(item.path)}
                  key={item.name}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
                    item.active ? 'bg-[#0B6B50] text-white shadow-lg' : 'text-white/55 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon size={18} />
                  <span className="flex-1 text-left">{item.name}</span>
                  {item.badge && (
                    <span className="rounded-full bg-red-500 px-2 py-0.5 text-[9px] font-bold">{item.badge}</span>
                  )}
                </button>
              );
            })}
          </nav>

          <p className="mb-3 mt-8 px-3 text-[10px] font-semibold uppercase tracking-widest text-white/30">System</p>
          <button
            onClick={() => navigate('/settings')}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/55 hover:bg-white/5 hover:text-white"
          >
            <Settings size={18} />
            Settings
          </button>
        </div>

        <div className="shrink-0 border-t border-white/10 p-4">
          <div className="rounded-xl bg-white/5 p-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              <span className="text-xs font-medium">Alert Engine Active</span>
            </div>
            <p className="mt-2 text-[10px] text-white/40">Continuous AI Tamper Detection</p>
          </div>
        </div>
      </aside>
    </>
  );
}

function StatCard({ stat }) {
  const Icon = stat.icon;
  const styles = {
    green: 'bg-emerald-50 text-[#0B6B50] dark:bg-emerald-400/10 dark:text-emerald-300',
    red: 'bg-red-50 text-red-500 dark:bg-red-400/10 dark:text-red-300',
    amber: 'bg-amber-50 text-amber-600 dark:bg-amber-400/10 dark:text-amber-300',
    blue: 'bg-blue-50 text-blue-500 dark:bg-blue-400/10 dark:text-blue-300',
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.03)] transition-colors duration-300 dark:border-white/10 dark:bg-[#0B241D]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{stat.title}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-[#0F172A] dark:text-white">{stat.value}</p>
          <p className="mt-2 text-[10px] text-slate-400 dark:text-slate-500">{stat.detail}</p>
        </div>
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${styles[stat.type]}`}>
          <Icon size={19} />
        </div>
      </div>
    </div>
  );
}

function SeverityBadge({ severity }) {
  const isCritical = severity === 'CRITICAL' || severity === 'HIGH';
  const isWarning = severity === 'MEDIUM';

  const style = isCritical
    ? 'bg-red-50 text-red-600 dark:bg-red-400/10 dark:text-red-300 border border-red-200 dark:border-red-500/20'
    : isWarning
    ? 'bg-amber-50 text-amber-600 dark:bg-amber-400/10 dark:text-amber-300 border border-amber-200 dark:border-amber-500/20'
    : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/20';

  const dot = isCritical ? 'bg-red-500' : isWarning ? 'bg-amber-500' : 'bg-emerald-500';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] font-semibold ${style}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {severity}
    </span>
  );
}

function AlertCard({ alert, onResolve, onInvestigate }) {
  const [resolving, setResolving] = useState(false);
  const isCritical = alert.severity === 'CRITICAL' || alert.severity === 'HIGH';

  const handleResolve = async () => {
    try {
      setResolving(true);
      await onResolve(alert._id);
    } catch (err) {
      console.error(err);
    } finally {
      setResolving(false);
    }
  };

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 transition-colors duration-300 hover:border-emerald-200 hover:shadow-lg dark:border-white/10 dark:bg-[#0B241D] dark:hover:border-emerald-400/30">
      <div className="flex gap-4">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
            isCritical
              ? 'bg-red-50 text-red-500 dark:bg-red-400/10 dark:text-red-300'
              : 'bg-amber-50 text-amber-500 dark:bg-amber-400/10 dark:text-amber-300'
          }`}
        >
          {isCritical ? <CircleAlert size={20} /> : <AlertCircle size={20} />}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col justify-between gap-2 sm:flex-row">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-sm font-bold text-[#0F172A] dark:text-white">{alert.title}</h3>
                <SeverityBadge severity={alert.severity} />
              </div>
              <p className="mt-1 text-[10px] text-slate-400 dark:text-slate-500">
                Facility: <span className="font-semibold text-slate-700 dark:text-slate-300">{alert.factoryName}</span> (ID: {alert.factoryId}) · Stack Sensor: <span className="font-mono">{alert.sensorId || 'STACK-01'}</span>
              </p>
            </div>
            <div className="flex items-center gap-1 text-[9px] text-slate-400 dark:text-slate-500">
              <Clock3 size={11} />
              {timeAgo(alert.createdAt)}
            </div>
          </div>

          {/* AI Auditor Explanation */}
          <div className="mt-3 rounded-xl border border-slate-100 bg-slate-50/80 p-3.5 dark:border-white/10 dark:bg-white/[0.03]">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-400">
              <Sparkles size={13} />
              <span>AI AUDITOR ANALYSIS</span>
            </div>
            <p className="mt-1.5 text-xs leading-relaxed italic text-slate-600 dark:text-slate-300">
              "{alert.aiExplanation || alert.description}"
            </p>
          </div>

          {/* Flags Strip */}
          {alert.flags && alert.flags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {alert.flags.map((flag) => (
                <span
                  key={flag}
                  className="rounded-md bg-red-100 px-2 py-0.5 text-[9px] font-bold text-red-700 dark:bg-red-500/20 dark:text-red-300"
                >
                  ⚡ {flag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={handleResolve}
              disabled={resolving}
              className="flex items-center gap-1.5 rounded-lg bg-[#0B6B50] px-3.5 py-2 text-[10px] font-semibold text-white hover:bg-[#064E3B] transition"
            >
              <CheckCircle2 size={13} />
              {resolving ? 'Resolving...' : 'Acknowledge & Resolve'}
            </button>

            <button
              onClick={() => onInvestigate(alert.factoryId)}
              className="rounded-lg border border-slate-200 px-3.5 py-2 text-[10px] font-semibold text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5 transition"
            >
              Inspect Plant Telemetry →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Alerts() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const isDark = theme === 'dark';

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [alertsList, setAlertsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [selectedPlant, setSelectedPlant] = useState('All');
  const [toastMessage, setToastMessage] = useState('');

  const fetchAlertsData = async () => {
    try {
      setLoading(true);
      const data = await getActiveAlerts();

      // Prototype demo alerts: keep these visible even when the API has no alerts.
      const demoAlerts = [
        {
          _id: 'demo-alert-suspicious-001',
          title: 'Suspicious Emission Pattern',
          severity: 'MEDIUM',
          factoryName: 'Meerut Cement Works',
          factoryId: 'F-102',
          sensorId: 'STACK-01',
          createdAt: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
          aiExplanation:
            'AI detected a statistically unusual emission pattern. The telemetry requires manual verification.',
          description: 'Unusual emission behaviour detected.',
          flags: ['Emission Spike', 'Pattern Anomaly'],
        },
        {
          _id: 'demo-alert-tampered-002',
          title: 'Tampered Sensor Detected',
          severity: 'CRITICAL',
          factoryName: 'Shakti Paper Mill',
          factoryId: 'F-205',
          sensorId: 'STACK-03',
          createdAt: new Date(Date.now() - 17 * 60 * 1000).toISOString(),
          aiExplanation:
            'Possible sensor bypass or manipulated telemetry detected. Physical inspection is recommended.',
          description: 'Potential sensor tampering detected.',
          flags: ['Sensor Tampering', 'Telemetry Manipulation', 'Bypass Suspected'],
        },
        {
          _id: 'demo-alert-high-003',
          title: 'GPS Location Mismatch',
          severity: 'HIGH',
          factoryName: 'Green Steel Industries',
          factoryId: 'F-318',
          sensorId: 'STACK-02',
          createdAt: new Date(Date.now() - 31 * 60 * 1000).toISOString(),
          aiExplanation:
            'The reported sensor location differs from the registered factory coordinates. Verify the device installation.',
          description: 'GPS telemetry does not match the registered location.',
          flags: ['GPS Mismatch', 'Device Verification'],
        },
      ];

      const apiAlerts = Array.isArray(data) ? data : [];
      const existingIds = new Set(apiAlerts.map((alert) => alert._id));
      const mergedAlerts = [
        ...apiAlerts,
        ...demoAlerts.filter((alert) => !existingIds.has(alert._id)),
      ];

      setAlertsList(mergedAlerts);
    } catch (err) {
      console.error('Failed to fetch alerts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlertsData();
    const interval = setInterval(fetchAlertsData, 15000); // 15 sec auto-poll
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  // Resolve Alert Handler
  const handleResolveAlert = async (alertId) => {
    const isDemoAlert = String(alertId).startsWith('demo-alert-');

    if (!isDemoAlert) {
      await resolveAlert(alertId);
    }

    setAlertsList((prev) => prev.filter((a) => a._id !== alertId));
    setToastMessage(
      isDemoAlert
        ? 'Demo alert resolved.'
        : 'Alert resolved & logged in compliance history.'
    );
    setTimeout(() => setToastMessage(''), 2500);
  };

  // Dynamic Plant Names List
  const plantNames = useMemo(() => {
    const names = Array.from(new Set(alertsList.map((a) => a.factoryName).filter(Boolean)));
    return ['All', ...names];
  }, [alertsList]);

  // 1. Dynamic Stats Calculation
  const stats = useMemo(() => {
    const total = alertsList.length;
    const critical = alertsList.filter((a) => a.severity === 'CRITICAL' || a.severity === 'HIGH').length;
    const warnings = alertsList.filter((a) => a.severity === 'MEDIUM' || a.severity === 'LOW').length;

    return [
      { title: 'Active Incidents', value: String(total), detail: 'Requiring review', icon: Bell, type: 'red' },
      { title: 'Critical Violations', value: String(critical), detail: 'Tampering / Bypass', icon: CircleAlert, type: 'red' },
      { title: 'Warning Alerts', value: String(warnings), detail: 'Sensor drift / spikes', icon: AlertCircle, type: 'amber' },
      { title: 'AI Monitoring Health', value: '100%', detail: 'Continuous active stream', icon: ShieldCheck, type: 'green' },
    ];
  }, [alertsList]);

  // 2. Filter & Search Logic
  const filteredAlerts = useMemo(() => {
    return alertsList.filter((alert) => {
      const matchesPlant = selectedPlant === 'All' || alert.factoryName === selectedPlant;
      const q = search.toLowerCase();
      const matchesSearch =
        (alert.title && alert.title.toLowerCase().includes(q)) ||
        (alert.factoryName && alert.factoryName.toLowerCase().includes(q)) ||
        (alert.factoryId && alert.factoryId.toLowerCase().includes(q)) ||
        (alert.description && alert.description.toLowerCase().includes(q));

      const matchesFilter =
        filter === 'All' ||
        (filter === 'Critical' && (alert.severity === 'CRITICAL' || alert.severity === 'HIGH')) ||
        (filter === 'Warning' && alert.severity === 'MEDIUM');

      return matchesPlant && matchesSearch && matchesFilter;
    });
  }, [alertsList, search, filter, selectedPlant]);

  return (
    <div className="min-h-screen bg-[#F7FAF8] font-[Inter,sans-serif] text-[#0F172A] transition-colors duration-300 dark:bg-[#071A15] dark:text-white">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} alertCount={alertsList.length} />

      <div className="min-w-0 lg:ml-[250px]">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-slate-200 bg-white/90 px-5 backdrop-blur-xl transition-colors duration-300 dark:border-white/10 dark:bg-[#071A15]/90 lg:px-8">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5 lg:hidden">
              <Menu size={21} />
            </button>
            <div>
              <h1 className="text-lg font-bold">Alerts & Incident Center</h1>
              <p className="hidden text-[10px] text-slate-400 dark:text-slate-500 sm:block">
                Real-time CEMS violation and tamper audit logs
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Refresh Button */}
            <button
              onClick={fetchAlertsData}
              disabled={loading}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:bg-[#0B241D] dark:text-slate-300"
            >
              <RefreshCw size={13} className={loading ? 'animate-spin text-emerald-500' : ''} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            {alertsList.length > 0 && (
              <div className="hidden items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-[10px] font-semibold text-red-600 dark:bg-red-400/10 dark:text-red-300 sm:flex">
                <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
                {alertsList.length} active incidents
              </div>
            )}

            <button
              type="button"
              onClick={() => dispatch(toggleTheme())}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 dark:border-white/10 dark:bg-[#0B241D] dark:text-yellow-300 dark:hover:bg-white/5"
            >
              {isDark ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 dark:border-white/10 dark:bg-[#0B241D] dark:text-slate-300">
              <Bell size={17} />
              {alertsList.length > 0 && <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />}
            </button>

            <div className="flex items-center gap-2">
              <div onClick={() => navigate('/profile')} className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#0B6B50] text-xs font-bold text-white">
                ET
              </div>
              <div className="hidden sm:block">
                <p className="text-xs font-semibold">Auditor Admin</p>
                <p className="text-[9px] text-slate-400 dark:text-slate-500">Environmental Officer</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Body */}
        <main className="mx-auto max-w-[1600px] p-5 lg:p-8">
          <div className="mb-7 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <span className="flex w-fit items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-[9px] font-bold text-red-600 dark:bg-red-400/10 dark:text-red-300">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
                AUTOMATED AI AUDIT LOGS
              </span>
              <h2 className="mt-3 text-2xl font-bold tracking-tight">Active Environmental Incidents</h2>
              <p className="mt-1 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
                Real-time violations detected across CEMS telemetry, including bypass duct fraud, scrubber tampering, and frozen sensors.
              </p>
            </div>
          </div>

          {/* Top 4 Stat Cards */}
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <StatCard key={stat.title} stat={stat} />
            ))}
          </section>

          {/* Active Critical Banner */}
          {alertsList.length > 0 && (
            <section className="mt-5 flex flex-col gap-4 rounded-2xl border border-red-100 bg-red-50/60 p-5 transition-colors duration-300 dark:border-red-400/20 dark:bg-red-400/10 lg:flex-row lg:items-center">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-500 dark:bg-red-400/10 dark:text-red-300">
                <CircleAlert size={21} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-red-800 dark:text-red-200">
                  {alertsList.length} incident(s) require auditor inspection
                </p>
                <p className="mt-1 text-[10px] text-red-700/70 dark:text-red-300/70">
                  EcoTrust validation engine flagged statistical deviations or power-emission correlation anomalies.
                </p>
              </div>
              <button
                onClick={() => setFilter('Critical')}
                className="rounded-lg bg-red-500 px-4 py-2.5 text-[10px] font-semibold text-white hover:bg-red-600 transition"
              >
                Filter Critical Alerts
              </button>
            </section>
          )}

          {/* Search & Filter Strip */}
          <section className="mt-7">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative w-full lg:max-w-[350px]">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by plant name, ID or tampering type..."
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-xs text-slate-700 outline-none placeholder:text-slate-400 focus:border-[#0B6B50] dark:border-white/10 dark:bg-[#0B241D] dark:text-slate-200 dark:placeholder:text-slate-500"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* Plant Selector */}
                <div className="relative">
                  <select
                    value={selectedPlant}
                    onChange={(e) => setSelectedPlant(e.target.value)}
                    className="appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-8 text-xs font-semibold text-slate-600 outline-none focus:border-[#0B6B50] dark:border-white/10 dark:bg-[#0B241D] dark:text-slate-300"
                  >
                    {plantNames.map((p) => (
                      <option key={p} value={p} className="bg-white dark:bg-[#0D2921]">
                        {p === 'All' ? '🏢 All Plants' : p}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={12} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500 ml-2">
                  <Filter size={14} />
                  Filter:
                </div>
                {['All', 'Critical', 'Warning'].map((item) => (
                  <button
                    key={item}
                    onClick={() => setFilter(item)}
                    className={`rounded-lg px-3 py-2 text-[10px] font-semibold transition ${
                      filter === item
                        ? 'bg-[#0B6B50] text-white'
                        : 'border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 dark:border-white/10 dark:bg-[#0B241D] dark:text-slate-300 dark:hover:bg-white/5'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Alerts Feed */}
          <section className="mt-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold">Audit Feed ({filteredAlerts.length})</h3>
                <p className="mt-1 text-[11px] text-slate-400">Live active incident queue</p>
              </div>
            </div>

            <div className="space-y-3">
              {loading ? (
                <div className="rounded-2xl border border-slate-200 bg-white py-16 text-center dark:border-white/10 dark:bg-[#0B241D]">
                  <div className="mx-auto h-9 w-9 animate-spin rounded-full border-2 border-slate-200 border-t-[#0B6B50] dark:border-white/10 dark:border-t-emerald-400" />
                  <p className="mt-4 text-sm font-semibold text-slate-600 dark:text-slate-300">
                    Loading alerts...
                  </p>
                  <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                    Fetching the latest environmental incident data
                  </p>
                </div>
              ) : filteredAlerts.length > 0 ? (
                filteredAlerts.map((alert) => (
                  <AlertCard
                    key={alert._id}
                    alert={alert}
                    onResolve={handleResolveAlert}
                    onInvestigate={(factoryId) => navigate(`/livemonitoring`)}
                  />
                ))
              ) : (
                <div className="rounded-2xl border border-slate-200 bg-white py-16 text-center dark:border-white/10 dark:bg-[#0B241D]">
                  <CheckCircle2 size={36} className="mx-auto text-emerald-500" />
                  <h3 className="mt-4 text-sm font-bold">No Active Incidents 🌿</h3>
                  <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                    All connected factory stacks are conforming to baseline standards.
                  </p>
                </div>
              )}
            </div>
          </section>
        </main>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[80] rounded-xl bg-[#052E24] px-4 py-3 text-xs font-semibold text-white shadow-2xl">
          {toastMessage}
        </div>
      )}
    </div>
  );
}