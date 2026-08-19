import {
  AlertCircle,
  Bell,
  CheckCircle2,
  ChevronDown,
  CircleAlert,
  Clock3,
  Factory,
  Filter,
  Gauge,
  LayoutDashboard,
  Leaf,
  LineChart,
  MapPin,
  Menu,
  Radio,
  Search,
  Settings,
  ShieldCheck,
  X,
  Sun,
  Moon,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toggleTheme } from '../features/Theme/Theme_slice';

const alerts = [
  {
    id: 'ALT-2048',
    title: 'Critical PM2.5 Level',
    description:
      'PM2.5 concentration exceeded the configured emission threshold.',
    parameter: 'PM2.5',
    value: '84.7 µg/m³',
    limit: '60 µg/m³',
    plant: 'Plant A',
    unit: 'Unit 2',
    location: 'Delhi NCR',
    time: '2 min ago',
    severity: 'Critical',
    status: 'Active',
  },
  {
    id: 'ALT-2047',
    title: 'CO₂ Level Warning',
    description:
      'CO₂ concentration is approaching the configured warning threshold.',
    parameter: 'CO₂',
    value: '874.2 ppm',
    limit: '1000 ppm',
    plant: 'Plant B',
    unit: 'Unit 1',
    location: 'Uttar Pradesh',
    time: '15 min ago',
    severity: 'Warning',
    status: 'Active',
  },
  {
    id: 'ALT-2046',
    title: 'Temperature Threshold',
    description:
      'Stack temperature has remained above the recommended operating range.',
    parameter: 'Temperature',
    value: '47.2 °C',
    limit: '45 °C',
    plant: 'Plant C',
    unit: 'Unit 3',
    location: 'Maharashtra',
    time: '42 min ago',
    severity: 'Warning',
    status: 'Active',
  },
  {
    id: 'ALT-2045',
    title: 'Low AQI Risk',
    description: 'Air quality indicator has entered the configured risk range.',
    parameter: 'AQI',
    value: '156',
    limit: '150',
    plant: 'Plant D',
    unit: 'Unit 1',
    location: 'Rajasthan',
    time: '1 hour ago',
    severity: 'Warning',
    status: 'Acknowledged',
  },
  {
    id: 'ALT-2044',
    title: 'NOx Level Normalized',
    description:
      'NOx concentration has returned to the acceptable operating range.',
    parameter: 'NOx',
    value: '18.7 ppb',
    limit: '100 ppb',
    plant: 'Plant A',
    unit: 'Unit 1',
    location: 'Delhi NCR',
    time: '2 hours ago',
    severity: 'Normal',
    status: 'Resolved',
  },
  {
    id: 'ALT-2043',
    title: 'Sensor Communication Lost',
    description: 'No data has been received from the environmental sensor.',
    parameter: 'CEMS',
    value: 'Offline',
    limit: 'Online',
    plant: 'Plant B',
    unit: 'Unit 4',
    location: 'Uttar Pradesh',
    time: '3 hours ago',
    severity: 'Critical',
    status: 'Resolved',
  },
];

const stats = [
  {
    title: 'Total Alerts',
    value: '128',
    detail: 'This month',
    icon: Bell,
    type: 'green',
  },
  {
    title: 'Critical',
    value: '8',
    detail: 'Requires action',
    icon: CircleAlert,
    type: 'red',
  },
  {
    title: 'Warnings',
    value: '24',
    detail: 'Need attention',
    icon: AlertCircle,
    type: 'amber',
  },
  {
    title: 'Resolved',
    value: '96',
    detail: '75% resolution rate',
    icon: CheckCircle2,
    type: 'blue',
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
      active:true
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
                onClick={()=>navigate(item.path)}
                  key={item.name}
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

          <button
            onClick={() => navigate("/settings")}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/55 hover:bg-white/5 hover:text-white"
          >
            <Settings size={18} />
            Settings
          </button>
        </div>

        {/* System Status */}
        <div className="shrink-0 border-t border-white/10 p-4">
          <div className="rounded-xl bg-white/5 p-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

              <span className="text-xs font-medium">Alert engine active</span>
            </div>

            <p className="mt-2 text-[10px] text-white/40">
              Monitoring 10,248 devices
            </p>
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

          <p className="mt-2 text-2xl font-bold tracking-tight text-[#0F172A] dark:text-white">
            {stat.value}
          </p>

          <p className="mt-2 text-[10px] text-slate-400 dark:text-slate-500">{stat.detail}</p>
        </div>

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${styles[stat.type]}`}
        >
          <Icon size={19} />
        </div>
      </div>
    </div>
  );
}

function SeverityBadge({ severity }) {
  const styles = {
    Critical: 'bg-red-50 text-red-600 dark:bg-red-400/10 dark:text-red-300',
    Warning: 'bg-amber-50 text-amber-600 dark:bg-amber-400/10 dark:text-amber-300',
    Normal: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-300',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] font-semibold ${styles[severity]}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          severity === 'Critical'
            ? 'bg-red-500'
            : severity === 'Warning'
              ? 'bg-amber-500'
              : 'bg-emerald-500'
        }`}
      />

      {severity}
    </span>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Active: 'bg-red-50 text-red-600 dark:bg-red-400/10 dark:text-red-300',
    Acknowledged: 'bg-amber-50 text-amber-600 dark:bg-amber-400/10 dark:text-amber-300',
    Resolved: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-300',
  };

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[9px] font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function AlertCard({ alert }) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 transition-colors duration-300 hover:border-emerald-200 hover:shadow-lg dark:border-white/10 dark:bg-[#0B241D] dark:hover:border-emerald-400/30">
      <div className="flex gap-4">
        {/* Severity indicator */}
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
            alert.severity === 'Critical'
              ? 'bg-red-50 text-red-500 dark:bg-red-400/10 dark:text-red-300'
              : alert.severity === 'Warning'
                ? 'bg-amber-50 text-amber-500 dark:bg-amber-400/10 dark:text-amber-300'
                : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-300'
          }`}
        >
          {alert.severity === 'Critical' ? (
            <CircleAlert size={20} />
          ) : alert.severity === 'Warning' ? (
            <AlertCircle size={20} />
          ) : (
            <CheckCircle2 size={20} />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col justify-between gap-2 sm:flex-row">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-sm font-bold text-[#0F172A] dark:text-white">
                  {alert.title}
                </h3>

                <SeverityBadge severity={alert.severity} />
              </div>

              <p className="mt-1 text-[10px] text-slate-400 dark:text-slate-500">
                Alert ID: {alert.id}
              </p>
            </div>

            <div className="flex items-center gap-1 text-[9px] text-slate-400 dark:text-slate-500">
              <Clock3 size={11} />
              {alert.time}
            </div>
          </div>

          <p className="mt-4 text-xs leading-5 text-slate-500 dark:text-slate-400">
            {alert.description}
          </p>

          {/* Details */}
          <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4 dark:border-white/10 sm:grid-cols-4">
            <div>
              <p className="text-[9px] text-slate-400 dark:text-slate-500">Parameter</p>

              <p className="mt-1 font-mono text-xs font-semibold text-slate-700 dark:text-slate-200">
                {alert.parameter}
              </p>
            </div>

            <div>
              <p className="text-[9px] text-slate-400 dark:text-slate-500">Current Value</p>

              <p
                className={`mt-1 font-mono text-xs font-semibold ${
                  alert.severity === 'Critical'
                    ? 'text-red-500'
                    : 'text-slate-700 dark:text-slate-200'
                }`}
              >
                {alert.value}
              </p>
            </div>

            <div>
              <p className="text-[9px] text-slate-400 dark:text-slate-500">Location</p>

              <p className="mt-1 text-xs font-semibold text-slate-700 dark:text-slate-200">
                {alert.plant} · {alert.unit}
              </p>
            </div>

            <div>
              <p className="text-[9px] text-slate-400 dark:text-slate-500">Status</p>

              <div className="mt-1">
                <StatusBadge status={alert.status} />
              </div>
            </div>
          </div>

          {/* Actions */}
          {alert.status === 'Active' && (
            <div className="mt-4 flex gap-2">
              <button className="rounded-lg bg-[#0B6B50] px-3 py-2 text-[10px] font-semibold text-white hover:bg-[#064E3B]">
                Acknowledge
              </button>

              <button className="rounded-lg border border-slate-200 px-3 py-2 text-[10px] font-semibold text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5">
                View Device
              </button>

              <button className="rounded-lg border border-slate-200 px-3 py-2 text-[10px] font-semibold text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5">
                View Details
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Alerts() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const isDark = theme === 'dark';

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSearch =
      alert.title.toLowerCase().includes(search.toLowerCase()) ||
      alert.plant.toLowerCase().includes(search.toLowerCase()) ||
      alert.parameter.toLowerCase().includes(search.toLowerCase());

    const matchesFilter = filter === 'All' || alert.severity === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-[#F7FAF8] font-[Inter,sans-serif] text-[#0F172A] transition-colors duration-300 dark:bg-[#071A15] dark:text-white">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Main */}
      <div className="min-w-0 lg:ml-[250px]">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-slate-200 bg-white/90 px-5 backdrop-blur-xl transition-colors duration-300 dark:border-white/10 dark:bg-[#071A15]/90 lg:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5 lg:hidden"
            >
              <Menu size={21} />
            </button>

            <div>
              <h1 className="text-lg font-bold">Alerts & Events</h1>

              <p className="hidden text-[10px] text-slate-400 dark:text-slate-500 sm:block">
                Environmental incidents and compliance alerts
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-[10px] font-semibold text-red-600 dark:bg-red-400/10 dark:text-red-300 sm:flex">
              <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
              3 critical alerts
            </div>

            <button
              type="button"
              onClick={() => dispatch(toggleTheme())}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 dark:border-white/10 dark:bg-[#0B241D] dark:text-yellow-300 dark:hover:bg-white/5"
            >
              {isDark ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 dark:border-white/10 dark:bg-[#0B241D] dark:text-slate-300">
              <Bell size={17} />

              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
            </button>

            <div className="flex items-center gap-2">
              <div onClick={()=>navigate("/profile")} className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0B6B50] text-xs font-bold text-white">
                VB
              </div>
              <div className="hidden sm:block">
                <p className="text-xs font-semibold">Admin</p>

                <p className="text-[9px] text-slate-400 dark:text-slate-500">
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

        {/* Content */}
        <main className="mx-auto max-w-[1600px] p-5 lg:p-8">
          {/* Page heading */}
          <div className="mb-7 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-[9px] font-bold text-red-600 dark:bg-red-400/10 dark:text-red-300">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
                  ATTENTION REQUIRED
                </span>
              </div>

              <h2 className="mt-3 text-2xl font-bold tracking-tight">
                Alert Center
              </h2>

              <p className="mt-1 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
                Review environmental threshold violations, sensor events, and
                compliance risks across all monitored facilities.
              </p>
            </div>

            <button className="flex items-center gap-2 self-start rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-xs font-medium text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:bg-[#0B241D] dark:text-slate-300 dark:hover:bg-white/5">
              <Clock3 size={14} />
              Last 24 hours
              <ChevronDown size={13} />
            </button>
          </div>

          {/* Stats */}
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <StatCard key={stat.title} stat={stat} />
            ))}
          </section>

          {/* Critical banner */}
          <section className="mt-5 flex flex-col gap-4 rounded-2xl border border-red-100 bg-red-50/60 p-5 transition-colors duration-300 dark:border-red-400/20 dark:bg-red-400/10 lg:flex-row lg:items-center">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-500 dark:bg-red-400/10 dark:text-red-300">
              <CircleAlert size={21} />
            </div>

            <div className="flex-1">
              <p className="text-sm font-bold text-red-800 dark:text-red-200">
                3 critical alerts require immediate attention
              </p>

              <p className="mt-1 text-[10px] text-red-700/70 dark:text-red-300/70">
                Environmental parameters have exceeded configured thresholds.
                Review the affected facilities and take appropriate action.
              </p>
            </div>

            <button className="rounded-lg bg-red-500 px-4 py-2.5 text-[10px] font-semibold text-white hover:bg-red-600">
              View Critical Alerts
            </button>
          </section>

          {/* Filters */}
          <section className="mt-7">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              {/* Search */}
              <div className="relative w-full lg:max-w-[350px]">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search alerts, plants or parameters..."
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-xs text-slate-700 outline-none placeholder:text-slate-400 focus:border-[#0B6B50] dark:border-white/10 dark:bg-[#0B241D] dark:text-slate-200 dark:placeholder:text-slate-500"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
                  <Filter size={14} />
                  Filter:
                </div>

                {['All', 'Critical', 'Warning', 'Normal'].map((item) => (
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

                <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[10px] font-medium text-slate-500 dark:border-white/10 dark:bg-[#0B241D] dark:text-slate-300">
                  <MapPin size={12} />
                  All Plants
                  <ChevronDown size={11} />
                </button>
              </div>
            </div>
          </section>

          {/* Alert list */}
          <section className="mt-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold">Environmental Alerts</h3>

                <p className="mt-1 text-[11px] text-slate-400">
                  {filteredAlerts.length} alerts found
                </p>
              </div>

              <button className="hidden items-center gap-2 text-[10px] font-semibold text-[#0B6B50] sm:flex">
                Export alerts →
              </button>
            </div>

            <div className="space-y-3">
              {filteredAlerts.length > 0 ? (
                filteredAlerts.map((alert) => (
                  <AlertCard key={alert.id} alert={alert} />
                ))
              ) : (
                <div className="rounded-2xl border border-slate-200 bg-white py-16 text-center dark:border-white/10 dark:bg-[#0B241D]">
                  <CheckCircle2
                    size={32}
                    className="mx-auto text-emerald-500"
                  />

                  <h3 className="mt-4 text-sm font-bold">No alerts found</h3>

                  <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                    Try changing your search or filter.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Alert engine status */}
          <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 transition-colors duration-300 dark:border-white/10 dark:bg-[#0B241D]">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-[#0B6B50] dark:bg-emerald-400/10 dark:text-emerald-300">
                <ShieldCheck size={19} />
              </div>

              <div className="flex-1">
                <p className="text-xs font-bold">Automated Alert Engine</p>

                <p className="mt-1 text-[10px] text-slate-400 dark:text-slate-500">
                  EcoTrust is continuously evaluating sensor readings against
                  configured environmental and compliance thresholds.
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-[9px] font-semibold text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-300">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                System Active
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
