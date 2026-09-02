import {
  Bell,
  ChevronDown,
  CircleAlert,
  Cpu,
  Edit3,
  Factory,
  Filter,
  Gauge,
  LayoutDashboard,
  Leaf,
  LineChart,
  Menu,
  Moon,
  Plus,
  Radio,
  RefreshCw,
  Search,
  Settings,
  ShieldCheck,
  Signal,
  Sun,
  Thermometer,
  Wifi,
  X,
  Zap,
} from 'lucide-react';
import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../features/Theme/Theme_slice';
import { getLiveDashboard } from '../services/api.js';

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

/* =========================================================
   SIDEBAR
========================================================= */
function Sidebar({ open, setOpen }) {
  const navigate = useNavigate();

  const items = [
    { name: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Live Monitoring', icon: Radio, path: '/livemonitoring' },
    { name: 'Alerts', icon: Bell, badge: '12', path: '/alerts' },
    { name: 'Compliance', icon: ShieldCheck, path: '/compliance' },
    { name: 'Reports', icon: LineChart, path: '/reports' },
    { name: 'Analytics', icon: Gauge, path: '/analytics' },
    { name: 'Devices', icon: Radio, path: '/devices', active: true },
  ];

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setOpen(false)} />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-[250px] flex-col bg-[#052E24] text-white transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-white/10 px-6">
          <div className="flex items-center gap-3">
            <div
              onClick={() => navigate('/')}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-[#0B6B50]"
            >
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

        {/* Navigation */}
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

        {/* Status */}
        <div className="shrink-0 border-t border-white/10 p-4">
          <div className="rounded-xl bg-white/5 p-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              <span className="text-xs font-medium">Device Manager Active</span>
            </div>
            <p className="mt-2 text-[10px] text-white/40">Real-time CEMS telemetry sync</p>
          </div>
        </div>
      </aside>
    </>
  );
}

/* =========================================================
   STAT CARD
========================================================= */
function StatCard({ stat }) {
  const Icon = stat.icon;
  const styles = {
    green: 'bg-emerald-50 text-[#0B6B50] dark:bg-emerald-500/10 dark:text-emerald-400',
    blue: 'bg-blue-50 text-blue-500 dark:bg-blue-500/10 dark:text-blue-400',
    amber: 'bg-amber-50 text-amber-500 dark:bg-amber-500/10 dark:text-amber-400',
    red: 'bg-red-50 text-red-500 dark:bg-red-500/10 dark:text-red-400',
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.03)] transition-colors duration-300 dark:border-white/10 dark:bg-white/[0.03] dark:shadow-none">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500 dark:text-white/45">{stat.title}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-[#0F172A] dark:text-white">{stat.value}</p>
          <p className="mt-2 text-[10px] text-slate-400 dark:text-white/30">{stat.detail}</p>
        </div>
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${styles[stat.type]}`}>
          <Icon size={19} />
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   STATUS BADGE
========================================================= */
function StatusBadge({ status }) {
  const styles = {
    Online: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',
    Warning: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
    Offline: 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400',
  };

  const dots = {
    Online: 'bg-emerald-500',
    Warning: 'bg-amber-500',
    Offline: 'bg-red-500',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] font-semibold ${styles[status]}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dots[status]}`} />
      {status}
    </span>
  );
}

/* =========================================================
   DEVICE TYPE BADGE
========================================================= */
function DeviceTypeBadge({ type }) {
  return (
    <span
      className={`rounded-md px-2 py-1 text-[8px] font-bold ${
        type === 'CEMS'
          ? 'bg-emerald-50 text-[#0B6B50] dark:bg-emerald-500/10 dark:text-emerald-400'
          : 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400'
      }`}
    >
      {type}
    </span>
  );
}

/* =========================================================
   DEVICE HEALTH (Trust Score Progress)
========================================================= */
function DeviceHealth({ quality }) {
  const number = parseFloat(quality) || 0;

  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-[10px] font-semibold text-slate-600 dark:text-white/60">
        {quality}
      </span>
      <div className="h-1.5 w-16 rounded-full bg-slate-100 dark:bg-white/10">
        <div
          className={`h-full rounded-full ${
            number >= 80 ? 'bg-[#10B981]' : number >= 60 ? 'bg-[#F59E0B]' : 'bg-[#EF4444]'
          }`}
          style={{ width: `${Math.min(number, 100)}%` }}
        />
      </div>
    </div>
  );
}

/* =========================================================
   MAIN DEVICES COMPONENT
========================================================= */
export default function Devices() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const isDark = theme === 'dark';

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [selectedPlant, setSelectedPlant] = useState('All');
  const [factoriesRaw, setFactoriesRaw] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Live Devices from CEMS Stream
  const fetchLiveDevices = async () => {
    try {
      setLoading(true);
      const data = await getLiveDashboard();
      setFactoriesRaw(data || []);
    } catch (err) {
      console.error('Failed to fetch devices:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveDevices();
    const interval = setInterval(fetchLiveDevices, 20000); // 20s auto-refresh
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Transform backend factories telemetry into Device Objects
  const devices = useMemo(() => {
    return factoriesRaw.map((f, idx) => {
      let status = 'Online';
      if (f.verdict === 'TAMPERED' || f.verdict === 'FAULTY_SENSOR' || f.trustScore < 50) {
        status = 'Offline';
      } else if (f.verdict === 'SUSPICIOUS' || f.trustScore < 75) {
        status = 'Warning';
      }

      const activePollutants = [];
      const pol = f.rawReading?.pollutants || {};
      if (pol.pm25 != null) activePollutants.push('PM2.5');
      if (pol.so2 != null) activePollutants.push('SO₂');
      if (pol.nox != null) activePollutants.push('NOx');
      if (pol.co != null) activePollutants.push('CO');

      return {
        id: f.sensorId || `CEMS-STK-${idx + 101}`,
        name: `${f.factoryName} Stack Analyzer`,
        type: 'CEMS',
        plant: f.factoryName,
        factoryId: f.factoryId,
        unit: `Stack ID: ${f.factoryId}`,
        parameter: activePollutants.join(' / ') || 'Multi-Gas (PM/SO2/NOx)',
        status,
        quality: `${f.trustScore || 100}%`,
        lastSeen: timeAgo(f.readingTimestamp || f.createdAt),
        firmware: 'v2.4.1 (CPCB Verified)',
        powerLoad: f.rawReading?.electricityConsumption || 0,
        verdict: f.verdict,
      };
    });
  }, [factoriesRaw]);

  // Unique Plant Names for Filter Dropdown
  const plantNames = useMemo(() => {
    const names = Array.from(new Set(devices.map((d) => d.plant)));
    return ['All', ...names];
  }, [devices]);

  // Filtered list based on Selected Plant, Search, and Status Filter
  const filteredDevices = useMemo(() => {
    return devices.filter((device) => {
      const matchesPlant = selectedPlant === 'All' || device.plant === selectedPlant;
      const q = search.toLowerCase();
      const matchesSearch =
        device.id.toLowerCase().includes(q) ||
        device.name.toLowerCase().includes(q) ||
        device.plant.toLowerCase().includes(q) ||
        device.parameter.toLowerCase().includes(q);
      const matchesFilter = filter === 'All' || device.status === filter;

      return matchesPlant && matchesSearch && matchesFilter;
    });
  }, [devices, selectedPlant, search, filter]);

  // Real-time Stats for Selected Plant / All Plants
  const selectedStats = useMemo(() => {
    const list = selectedPlant === 'All' ? devices : devices.filter((d) => d.plant === selectedPlant);
    return {
      total: list.length,
      online: list.filter((d) => d.status === 'Online').length,
      warning: list.filter((d) => d.status === 'Warning').length,
      offline: list.filter((d) => d.status === 'Offline').length,
    };
  }, [devices, selectedPlant]);

  return (
    <div className="min-h-screen bg-[#F7FAF8] font-[Inter,sans-serif] text-[#0F172A] transition-colors duration-300 dark:bg-[#071A15] dark:text-white">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="min-w-0 lg:ml-[250px]">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-slate-200 bg-white/90 px-5 backdrop-blur-xl transition-colors duration-300 dark:border-white/10 dark:bg-[#071A15]/90 lg:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-white/5 lg:hidden"
            >
              <Menu size={21} />
            </button>
            <div>
              <h1 className="text-lg font-bold text-[#0F172A] dark:text-white">Sensor Hardware & Devices</h1>
              <p className="hidden text-[10px] text-slate-400 dark:text-white/35 sm:block">
                CEMS stack analyzers, hardware drift tracking, and connectivity
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Refresh Button */}
            <button
              onClick={fetchLiveDevices}
              disabled={loading}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:bg-[#0B241D] dark:text-slate-300"
            >
              <RefreshCw size={13} className={loading ? 'animate-spin text-emerald-500' : ''} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            {/* Online Status Pill */}
            <div className="hidden items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 sm:flex">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              {selectedStats.total ? Math.round((selectedStats.online / selectedStats.total) * 100) : 100}% hardware online
            </div>

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={() => dispatch(toggleTheme())}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:bg-emerald-50 hover:text-[#0B6B50] dark:border-white/10 dark:bg-white/5 dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-emerald-400"
            >
              {isDark ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            {/* User */}
            <div className="flex items-center gap-2">
              <div
                onClick={() => navigate('/profile')}
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#0B6B50] text-xs font-bold text-white"
              >
                ET
              </div>
              <div className="hidden sm:block">
                <p className="text-xs font-semibold text-slate-700 dark:text-white/80">Auditor Admin</p>
                <p className="text-[9px] text-slate-400 dark:text-white/35">Environmental Officer</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Body */}
        <main className="mx-auto max-w-[1600px] p-5 lg:p-8">
          {/* Top Heading */}
          <div className="mb-7 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-bold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                <Cpu size={11} />
                LIVE CEMS HARDWARE STREAM
              </span>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#0F172A] dark:text-white">
                Environmental Sensors & Analyzers
              </h2>
              <p className="mt-1 max-w-2xl text-sm text-slate-500 dark:text-white/45">
                Monitor connected CEMS stack telemetry, sensor calibration drift, communication telemetry, and data fidelity scores.
              </p>
            </div>

            {/* Plant Dropdown Control */}
            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <select
                  value={selectedPlant}
                  onChange={(e) => {
                    setSelectedPlant(e.target.value);
                    setSearch('');
                    setFilter('All');
                  }}
                  className="appearance-none rounded-lg border border-slate-200 bg-white py-2.5 pl-3 pr-9 text-xs font-semibold text-slate-700 outline-none focus:border-[#0B6B50] dark:border-white/10 dark:bg-[#0B241D] dark:text-white/80"
                >
                  {plantNames.map((plant) => (
                    <option key={plant} value={plant} className="bg-white dark:bg-[#0D2921]">
                      {plant === 'All' ? '🏢 All Monitored Facilities' : plant}
                    </option>
                  ))}
                </select>
                <ChevronDown size={13} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/30" />
              </div>
            </div>
          </div>

          {/* Plant Overview Banner */}
          <section className="mb-5 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5 transition-colors dark:border-emerald-500/20 dark:bg-emerald-500/10">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0B6B50] text-white">
                  <Factory size={19} />
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-emerald-700 dark:text-emerald-400">
                    Currently inspecting hardware
                  </p>
                  <h3 className="mt-1 text-base font-bold text-[#064E3B] dark:text-emerald-300">
                    {selectedPlant === 'All' ? 'All Industrial Facilities (Fleet View)' : selectedPlant}
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded-xl bg-white px-4 py-2.5 dark:bg-white/[0.06]">
                  <p className="text-lg font-bold text-[#0B6B50] dark:text-emerald-400">{selectedStats.total}</p>
                  <p className="text-[8px] text-slate-400 dark:text-white/30">Total Analyzers</p>
                </div>
                <div className="rounded-xl bg-white px-4 py-2.5 dark:bg-white/[0.06]">
                  <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{selectedStats.online}</p>
                  <p className="text-[8px] text-slate-400 dark:text-white/30">Online / Verified</p>
                </div>
                <div className="rounded-xl bg-white px-4 py-2.5 dark:bg-white/[0.06]">
                  <p className={`text-lg font-bold ${selectedStats.offline > 0 ? 'text-red-500 dark:text-red-400' : 'text-slate-600 dark:text-white/50'}`}>
                    {selectedStats.offline}
                  </p>
                  <p className="text-[8px] text-slate-400 dark:text-white/30">Offline / Fault</p>
                </div>
              </div>
            </div>
          </section>

          {/* Top 4 Stat Cards */}
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              stat={{
                title: 'Total Monitored Analyzers',
                value: selectedStats.total,
                detail: selectedPlant === 'All' ? 'Across all stacks' : `Installed at ${selectedPlant}`,
                icon: Cpu,
                type: 'green',
              }}
            />
            <StatCard
              stat={{
                title: 'Online & Verified',
                value: selectedStats.online,
                detail: selectedStats.total ? `${Math.round((selectedStats.online / selectedStats.total) * 100)}% connected` : '0% connected',
                icon: Wifi,
                type: 'blue',
              }}
            />
            <StatCard
              stat={{
                title: 'Warning / Anomaly',
                value: selectedStats.warning,
                detail: 'Statistical drift flagged',
                icon: CircleAlert,
                type: 'amber',
              }}
            />
            <StatCard
              stat={{
                title: 'Tampered / Faulty',
                value: selectedStats.offline,
                detail: 'Requires immediate inspection',
                icon: Signal,
                type: 'red',
              }}
            />
          </section>

          {/* Network Health Bar Strip */}
          <section className="mt-5 grid gap-5 xl:grid-cols-[1.2fr_.8fr]">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.03)] transition-colors dark:border-white/10 dark:bg-white/[0.03] dark:shadow-none">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#0F172A] dark:text-white">Sensor Communication Health</h3>
                  <p className="mt-1 text-[11px] text-slate-400 dark:text-white/30">Data stream status and telemetry validity</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-[#0B6B50] dark:bg-emerald-500/10 dark:text-emerald-400">
                  <Signal size={18} />
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-end justify-between">
                  <div>
                    <span className="font-mono text-3xl font-semibold text-[#0F172A] dark:text-white">
                      {selectedStats.total ? `${Math.round((selectedStats.online / selectedStats.total) * 100)}%` : '0%'}
                    </span>
                    <p className="mt-1 text-[10px] text-slate-400 dark:text-white/30">Network telemetry health</p>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-semibold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                    EcoTrust Stream Active
                  </span>
                </div>

                <div className="mt-5 flex h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
                  <div
                    className="bg-[#10B981]"
                    style={{ width: selectedStats.total ? `${(selectedStats.online / selectedStats.total) * 100}%` : '0%' }}
                  />
                  <div
                    className="bg-[#F59E0B]"
                    style={{ width: selectedStats.total ? `${(selectedStats.warning / selectedStats.total) * 100}%` : '0%' }}
                  />
                  <div
                    className="bg-[#EF4444]"
                    style={{ width: selectedStats.total ? `${(selectedStats.offline / selectedStats.total) * 100}%` : '0%' }}
                  />
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-[#10B981]" />
                      <span className="text-[10px] text-slate-500 dark:text-white/40">Verified Online</span>
                    </div>
                    <p className="mt-1 font-mono text-sm font-semibold text-[#0F172A] dark:text-white">{selectedStats.online}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-[#F59E0B]" />
                      <span className="text-[10px] text-slate-500 dark:text-white/40">Drift Warning</span>
                    </div>
                    <p className="mt-1 font-mono text-sm font-semibold text-[#0F172A] dark:text-white">{selectedStats.warning}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-[#EF4444]" />
                      <span className="text-[10px] text-slate-500 dark:text-white/40">Fault / Tampered</span>
                    </div>
                    <p className="mt-1 font-mono text-sm font-semibold text-[#0F172A] dark:text-white">{selectedStats.offline}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Protocol Distribution */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.03)] transition-colors dark:border-white/10 dark:bg-white/[0.03] dark:shadow-none">
              <h3 className="text-sm font-bold text-[#0F172A] dark:text-white">Monitoring Protocol Standards</h3>
              <p className="mt-1 text-[11px] text-slate-400 dark:text-white/30">CEMS continuous stack equipment</p>

              <div className="mt-5 space-y-5">
                <div>
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-[#0B6B50] dark:bg-emerald-500/10 dark:text-emerald-400">
                        <Zap size={15} />
                      </div>
                      <span className="text-xs font-semibold text-slate-700 dark:text-white/75">CEMS (Stack Analyzers)</span>
                    </div>
                    <span className="font-mono text-xs font-semibold text-[#0F172A] dark:text-white">{devices.length}</span>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-slate-100 dark:bg-white/10">
                    <div className="h-full w-full rounded-full bg-[#0B6B50]" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Real Device Table */}
          <section className="mt-7">
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
              <div>
                <h3 className="text-sm font-bold text-[#0F172A] dark:text-white">Connected Analyzers Queue</h3>
                <p className="mt-1 text-[11px] text-slate-400 dark:text-white/30">
                  Live sensor health, verified trust scores, and telemetry status
                </p>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                {/* Search */}
                <div className="relative">
                  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/30" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search device ID, plant..."
                    className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-xs text-slate-700 outline-none placeholder:text-slate-400 focus:border-[#0B6B50] dark:border-white/10 dark:bg-[#0B241D] dark:text-white/80 sm:w-[240px]"
                  />
                </div>

                {/* Filter */}
                <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-[10px] text-slate-500 dark:border-white/10 dark:bg-[#0B241D] dark:text-white/50">
                  <Filter size={13} />
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="bg-transparent outline-none dark:text-white/70"
                  >
                    <option value="All" className="bg-white dark:bg-[#0D2921]">All Status</option>
                    <option value="Online" className="bg-white dark:bg-[#0D2921]">Online</option>
                    <option value="Warning" className="bg-white dark:bg-[#0D2921]">Warning</option>
                    <option value="Offline" className="bg-white dark:bg-[#0D2921]">Offline</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_20px_rgba(15,23,42,0.03)] transition-colors dark:border-white/10 dark:bg-white/[0.03] dark:shadow-none">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1050px]">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/70 text-left text-[9px] text-slate-400 dark:border-white/10 dark:bg-white/[0.03] dark:text-white/30">
                      <th className="px-5 py-4 font-medium">Device & Stack</th>
                      <th className="px-5 py-4 font-medium">Type</th>
                      <th className="px-5 py-4 font-medium">Facility</th>
                      <th className="px-5 py-4 font-medium">Active Parameters</th>
                      <th className="px-5 py-4 font-medium">Status</th>
                      <th className="px-5 py-4 font-medium">Trust Score</th>
                      <th className="px-5 py-4 font-medium">Last Sampled</th>
                      <th className="px-5 py-4 text-right font-medium">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredDevices.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="py-16 text-center text-xs text-slate-400">
                          No connected devices matching your criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredDevices.map((device) => (
                        <tr
                          key={device.id}
                          className="border-b border-slate-50 transition hover:bg-slate-50/50 last:border-0 dark:border-white/[0.06] dark:hover:bg-white/[0.03]"
                        >
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div
                                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                                  device.status === 'Online'
                                    ? 'bg-emerald-50 text-[#0B6B50] dark:bg-emerald-500/10 dark:text-emerald-400'
                                    : device.status === 'Warning'
                                    ? 'bg-amber-50 text-amber-500 dark:bg-amber-500/10 dark:text-amber-400'
                                    : 'bg-red-50 text-red-500 dark:bg-red-500/10 dark:text-red-400'
                                }`}
                              >
                                <Cpu size={16} />
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-slate-700 dark:text-white/75">{device.name}</p>
                                <p className="mt-1 font-mono text-[8px] text-slate-400 dark:text-white/30">{device.id}</p>
                              </div>
                            </div>
                          </td>

                          <td className="px-5 py-4">
                            <DeviceTypeBadge type={device.type} />
                          </td>

                          <td className="px-5 py-4">
                            <p className="text-xs font-semibold text-slate-700 dark:text-white/75">{device.plant}</p>
                            <p className="mt-1 flex items-center gap-1 text-[9px] text-slate-400 dark:text-white/30">
                              <Factory size={9} /> {device.unit}
                            </p>
                          </td>

                          <td className="px-5 py-4">
                            <div className="flex items-center gap-1.5">
                              <Thermometer size={12} className="text-slate-400 dark:text-white/30" />
                              <span className="text-[10px] text-slate-500 dark:text-white/45">{device.parameter}</span>
                            </div>
                          </td>

                          <td className="px-5 py-4">
                            <StatusBadge status={device.status} />
                          </td>

                          <td className="px-5 py-4">
                            <DeviceHealth quality={device.quality} />
                          </td>

                          <td className="px-5 py-4 font-mono text-[9px] text-slate-400 dark:text-white/30">
                            {device.lastSeen}
                          </td>

                          <td className="px-5 py-4 text-right">
                            <button
                              onClick={() => navigate('/livemonitoring')}
                              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-semibold text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:bg-[#071A15] dark:text-slate-300 dark:hover:bg-white/5 transition"
                            >
                              Inspect Stream →
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}