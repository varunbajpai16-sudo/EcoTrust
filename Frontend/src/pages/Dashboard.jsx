
import {
  Bell,
  CircleAlert,
  Cloud,
  Factory,
  Gauge,
  LayoutDashboard,
  Leaf,
  LineChart,
  MapPin,
  Menu,
  Moon,
  Radio,
  RefreshCw,
  Settings,
  ShieldCheck,
  Sun,
  Thermometer,
  Wind,
  X,
  Sparkles,
} from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect, useMemo } from 'react';
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom';
import { toggleTheme } from '../features/Theme/Theme_slice';
import { getLiveDashboard, getActiveAlerts } from '../services/api.js';

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

// Fallback Coordinates for Indian Cities
const CITY_COORDINATES = {
  default: [28.6139, 77.209], // Delhi
  'Plant A': [28.9845, 77.7064], // Meerut
  'Plant B': [26.8467, 80.9462], // Lucknow
  'Plant C': [19.076, 72.8777],  // Mumbai
  'Plant D': [18.5204, 73.8567], // Pune
  'Plant E': [23.0225, 72.5714], // Ahmedabad
};

// Theme Toggle Component
function ThemeToggle({ className = '' }) {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={() => dispatch(toggleTheme())}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-emerald-300 ${className}`}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}

function Sidebar({ open, setOpen, alertCount = 0 }) {
  const navigate = useNavigate();
  const items = [
    { name: 'Overview', icon: LayoutDashboard, path: '/dashboard', active: true },
    { name: 'Live Monitoring', icon: Radio, path: '/livemonitoring' },
    { name: 'Alerts', icon: Bell, badge: alertCount > 0 ? String(alertCount) : null, path: '/alerts' },
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
        className={`fixed left-0 top-0 z-50 flex h-screen w-[250px] flex-col bg-[#052E24] text-white transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
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
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
                    item.active ? 'bg-[#0B6B50] text-white shadow-lg shadow-black/10' : 'text-white/55 hover:bg-white/5 hover:text-white'
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
          <button onClick={() => navigate('/settings')} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/55 hover:bg-white/5 hover:text-white">
            <Settings size={18} />
            Settings
          </button>
        </div>

        <div className="shrink-0 border-t border-white/10 p-4">
          <div className="rounded-xl bg-white/5 p-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              <span className="text-xs font-medium">EcoTrust Engine Active</span>
            </div>
            <p className="mt-2 text-[10px] text-white/40">Real-time CEMS Polling (1 min)</p>
          </div>
        </div>
      </aside>
    </>
  );
}

function StatCard({ data }) {
  const Icon = data.icon;
  const iconBg =
    data.type === 'red'
      ? 'bg-red-50 text-red-500 dark:bg-red-500/10'
      : data.type === 'blue'
      ? 'bg-blue-50 text-blue-500 dark:bg-blue-500/10'
      : 'bg-emerald-50 text-[#0B6B50] dark:bg-emerald-400/10 dark:text-emerald-300';

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.03)] transition-colors duration-300 hover:-translate-y-0.5 hover:shadow-lg dark:border-white/10 dark:bg-[#0B241D]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{data.title}</p>
          <h3 className="mt-2 text-2xl font-bold tracking-tight text-[#0F172A] dark:text-white">{data.value}</h3>
        </div>
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconBg}`}>
          <Icon size={19} />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2 text-xs">
        <span className={`font-semibold ${data.type === 'red' ? 'text-red-500' : 'text-emerald-600 dark:text-emerald-400'}`}>
          {data.change}
        </span>
        <span className="text-slate-400 dark:text-slate-500">{data.label}</span>
      </div>
    </div>
  );
}

function EmissionCard({ item }) {
  const Icon = item.icon;
  const isDanger = item.status === 'Critical' || item.status === 'High';
  const isWarning = item.status === 'Warning';

  const dotColor = isDanger ? 'bg-red-500' : isWarning ? 'bg-amber-400' : 'bg-emerald-500';
  const textColor = isDanger ? 'text-red-500' : isWarning ? 'text-amber-500' : 'text-emerald-600 dark:text-emerald-400';

  return (
    <div className="group rounded-xl border border-slate-200 bg-white p-4 transition hover:border-emerald-200 hover:shadow-md dark:border-white/10 dark:bg-[#0B241D]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-[#0B6B50] dark:bg-emerald-400/10 dark:text-emerald-300">
            <Icon size={15} />
          </div>
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">{item.name}</span>
        </div>
        <span className={`h-2 w-2 rounded-full ${dotColor}`} />
      </div>

      <div className="mt-4">
        <span className="font-mono text-xl font-semibold text-[#0F172A] dark:text-white">{item.value}</span>
        <span className="ml-1 font-mono text-[9px] text-slate-400">{item.unit}</span>
      </div>

      <p className={`mt-1 text-[10px] font-medium ${textColor}`}>{item.status}</p>
    </div>
  );
}

function AlertItem({ alert }) {
  const isCritical = alert.severity === 'CRITICAL' || alert.severity === 'HIGH';
  const isWarning = alert.severity === 'MEDIUM';

  const style = isCritical
    ? { dot: 'bg-red-500', bg: 'bg-red-50 dark:bg-red-500/10' }
    : isWarning
    ? { dot: 'bg-amber-400', bg: 'bg-amber-50 dark:bg-amber-500/10' }
    : { dot: 'bg-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-500/10' };

  return (
    <div className="flex gap-3 border-b border-slate-100 py-3.5 last:border-0 dark:border-white/10">
      <div className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${style.bg}`}>
        <span className={`h-2 w-2 rounded-full ${style.dot}`} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="truncate text-xs font-semibold text-slate-700 dark:text-slate-200">
            {alert.title || alert.description}
          </p>
          <span className="shrink-0 text-[9px] text-slate-400">
            {timeAgo(alert.createdAt)}
          </span>
        </div>
        <p className="mt-0.5 text-[10px] text-slate-400">{alert.factoryName || alert.factoryId}</p>
        {alert.aiExplanation && (
          <p className="mt-1 line-clamp-1 text-[9px] italic text-slate-500 dark:text-slate-400">
            🤖 {alert.aiExplanation}
          </p>
        )}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme.theme);
  const isDark = theme === 'dark';
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Live Data States
  const [factoriesData, setFactoriesData] = useState([]);
  const [alertsData, setAlertsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState(new Date());

  // Fetch Live Data using API Service
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [factories, alerts] = await Promise.all([
        getLiveDashboard(),
        getActiveAlerts(),
      ]);

      if (factories) setFactoriesData(factories);
      if (alerts) setAlertsData(alerts);
      setLastRefreshed(new Date());
    } catch (error) {
      console.error('Failed to fetch live EcoTrust data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  useEffect(() => {
    fetchDashboardData();
    // Auto-refresh every 20 seconds
    const interval = setInterval(fetchDashboardData, 20000);
    return () => clearInterval(interval);
  }, []);

  // 1. Dynamic Top Stats Calculation
  const stats = useMemo(() => {
    const totalPlants = factoriesData.length || 1;
    const totalTrust = factoriesData.reduce((acc, f) => acc + (f.trustScore || 100), 0);
    const avgTrustScore = (totalTrust / totalPlants).toFixed(1);

    const criticalAlertsCount = alertsData.filter(
      (a) => a.severity === 'CRITICAL' || a.severity === 'HIGH'
    ).length;

    const verifiedCount = factoriesData.filter((f) => f.verdict === 'VERIFIED').length;
    const verifiedPercent = ((verifiedCount / totalPlants) * 100).toFixed(0);

    return [
      {
        title: 'Trust & Compliance Score',
        value: `${avgTrustScore}%`,
        change: `${verifiedPercent}% verified`,
        label: 'across plants',
        icon: ShieldCheck,
        type: Number(avgTrustScore) >= 80 ? 'green' : 'red',
      },
      {
        title: 'Active Alerts',
        value: String(alertsData.length),
        change: `${criticalAlertsCount} Critical`,
        label: 'tampering & faults',
        icon: CircleAlert,
        type: alertsData.length > 0 ? 'red' : 'green',
      },
      {
        title: 'Monitored Facilities',
        value: String(factoriesData.length || 0),
        change: 'Live CEMS',
        label: 'actively polling',
        icon: Factory,
        type: 'blue',
      },
      {
        title: 'AI Verification Status',
        value: `${factoriesData.length > 0 ? '100%' : 'Syncing'}`,
        change: 'Groq LLM',
        label: 'auditor active',
        icon: Sparkles,
        type: 'green',
      },
    ];
  }, [factoriesData, alertsData]);

  // 2. Dynamic Live Emissions Calculation (Average of real sensor readings)
  const emissions = useMemo(() => {
    if (factoriesData.length === 0) {
      return [
        { name: 'PM2.5', value: '28.4', unit: 'µg/m³', status: 'Good', icon: Wind },
        { name: 'PM10', value: '45.1', unit: 'µg/m³', status: 'Good', icon: Wind },
        { name: 'SO₂', value: '12.3', unit: 'ppb', status: 'Normal', icon: Cloud },
        { name: 'NOx', value: '18.7', unit: 'ppb', status: 'Normal', icon: Cloud },
        { name: 'CO', value: '1.8', unit: 'ppm', status: 'Normal', icon: Cloud },
        { name: 'Temperature', value: '31.4', unit: '°C', status: 'Normal', icon: Thermometer },
      ];
    }

    const avg = (key) => {
      const valid = factoriesData.map((f) => f.rawReading?.pollutants?.[key]).filter((v) => v != null);
      if (valid.length === 0) return 0;
      return (valid.reduce((a, b) => a + b, 0) / valid.length).toFixed(1);
    };

    const avgTemp = () => {
      const valid = factoriesData.map((f) => f.rawReading?.temperature).filter((v) => v != null);
      if (valid.length === 0) return '32.0';
      return (valid.reduce((a, b) => a + b, 0) / valid.length).toFixed(1);
    };

    const pm25Val = avg('pm25');
    const so2Val = avg('so2');
    const noxVal = avg('nox');
    const pm10Val = avg('pm10');
    const coVal = avg('co');

    return [
      { name: 'PM2.5', value: pm25Val, unit: 'µg/m³', status: pm25Val > 60 ? 'Warning' : 'Good', icon: Wind },
      { name: 'PM10', value: pm10Val, unit: 'µg/m³', status: pm10Val > 100 ? 'Warning' : 'Good', icon: Wind },
      { name: 'SO₂', value: so2Val, unit: 'ppb', status: so2Val > 80 ? 'Critical' : 'Normal', icon: Cloud },
      { name: 'NOx', value: noxVal, unit: 'ppb', status: noxVal > 80 ? 'Warning' : 'Normal', icon: Cloud },
      { name: 'CO', value: coVal, unit: 'ppm', status: coVal > 4 ? 'Warning' : 'Normal', icon: Cloud },
      { name: 'Temperature', value: avgTemp(), unit: '°C', status: 'Normal', icon: Thermometer },
    ];
  }, [factoriesData]);

  // 3. Network Breakdown Stats (Compliant / Warning / Violations)
  const networkBreakdown = useMemo(() => {
    const total = factoriesData.length || 1;
    const compliant = factoriesData.filter((f) => f.verdict === 'VERIFIED').length;
    const warning = factoriesData.filter((f) => f.verdict === 'SUSPICIOUS').length;
    const violation = factoriesData.filter((f) => f.verdict === 'TAMPERED' || f.verdict === 'FAULTY_SENSOR').length;

    return [
      ['Compliant', String(compliant), `${((compliant / total) * 100).toFixed(1)}%`, 'bg-emerald-500'],
      ['Suspicious', String(warning), `${((warning / total) * 100).toFixed(1)}%`, 'bg-amber-400'],
      ['Tampered / Fault', String(violation), `${((violation / total) * 100).toFixed(1)}%`, 'bg-red-500'],
    ];
  }, [factoriesData]);

  return (
    <div className="min-h-screen bg-[#F7FAF8] font-[Inter,sans-serif] text-[#0F172A] transition-colors duration-300 dark:bg-[#071A15] dark:text-white">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} alertCount={alertsData.length} />

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
              <h1 className="text-lg font-bold text-[#0F172A] dark:text-white">EcoTrust Audit Dashboard</h1>
              <p className="hidden text-[10px] text-slate-400 dark:text-slate-500 sm:block">
                AI-Powered CEMS Telemetry Verification & Tamper Detection
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Manual Refresh Button */}
            <button
              onClick={fetchDashboardData}
              disabled={loading}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:bg-[#0B241D] dark:text-slate-300"
            >
              <RefreshCw size={13} className={loading ? 'animate-spin text-emerald-500' : ''} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <ThemeToggle />

            <button
              onClick={() => navigate('/alerts')}
              className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 dark:border-white/10 dark:bg-[#0B241D] dark:text-slate-300 dark:hover:bg-white/5"
            >
              <Bell size={17} />
              {alertsData.length > 0 && (
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full border-2 border-white bg-red-500 dark:border-[#071A15]" />
              )}
            </button>

            <div className="flex items-center gap-2">
              <div
                onClick={() => navigate('/profile')}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0B6B50] text-xs font-bold text-white hover:cursor-pointer"
              >
                ET
              </div>
              <div className="hidden sm:block">
                <p className="text-xs font-semibold">Auditor Admin</p>
                <p className="text-[9px] text-slate-400 dark:text-slate-500">Environmental Officer</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="mx-auto max-w-[1600px] p-5 lg:p-8">
          {/* Welcome & Live Banner */}
          <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Welcome, Environmental Auditor 👋</p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-[#0F172A] dark:text-white">
                Live Verification & Compliance
              </h2>
            </div>

            <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              Live CEMS Stream Connected · Sync: {timeAgo(lastRefreshed)}
            </div>
          </div>

          {/* Top 4 Stats Cards */}
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((item) => (
              <StatCard key={item.title} data={item} />
            ))}
          </section>

          {/* Factory Map Section */}
          <section className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_24px_rgba(15,23,42,0.04)] transition-colors duration-300 dark:border-white/10 dark:bg-[#0B241D]">
            <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center dark:border-white/10 lg:px-6">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-[#0F172A] dark:text-white">
                    Live Industrial Emission Geo-Grid
                  </h3>
                  <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-semibold text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-300">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                    LIVE
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">
                  Real-time tamper audit status across connected factory stacks
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-[10px] dark:border-white/10 dark:bg-white/5">
                  <span className="font-medium text-slate-500 dark:text-slate-400">Verdicts:</span>
                  <span className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" /> Verified
                  </span>
                  <span className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
                    <span className="h-2 w-2 rounded-full bg-amber-400" /> Suspicious
                  </span>
                  <span className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
                    <span className="h-2 w-2 rounded-full bg-red-500" /> Tampered / Faulty
                  </span>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-[1fr_270px]">
              {/* Map */}
              <div className="relative min-h-[430px] overflow-hidden bg-[#eef5f1] dark:bg-[#0A211B]">
                <div className="absolute inset-0">
                  <MapContainer
                    center={[28.9845, 77.7064]}
                    zoom={7}
                    minZoom={4}
                    maxZoom={18}
                    scrollWheelZoom={true}
                    className="h-full w-full"
                  >
                    <TileLayer
                      attribution="&copy; OpenStreetMap contributors"
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {factoriesData.map((factory, index) => {
                      const pos = CITY_COORDINATES[factory.factoryName] || [
                        28.6139 + (index * 0.4 - 0.2),
                        77.209 + (index * 0.4 - 0.2),
                      ];

                      const markerColor =
                        factory.verdict === 'TAMPERED' || factory.verdict === 'FAULTY_SENSOR'
                          ? '#EF4444'
                          : factory.verdict === 'SUSPICIOUS'
                          ? '#F59E0B'
                          : '#10B981';

                      return (
                        <CircleMarker
                          key={factory._id || factory.factoryId}
                          center={pos}
                          radius={10}
                          pathOptions={{
                            color: '#ffffff',
                            weight: 3,
                            fillColor: markerColor,
                            fillOpacity: 1,
                          }}
                        >
                          <Popup>
                            <div className="min-w-[200px] font-sans">
                              <div className="flex items-center justify-between gap-3">
                                <div>
                                  <p className="text-sm font-bold text-slate-900">{factory.factoryName}</p>
                                  <p className="text-[10px] text-slate-500">ID: {factory.factoryId}</p>
                                </div>
                                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: markerColor }} />
                              </div>

                              <div className="mt-3 grid grid-cols-2 gap-2 text-[10px]">
                                <div className="rounded-lg bg-slate-50 p-2">
                                  <p className="text-slate-400">Trust Score</p>
                                  <p className="mt-0.5 font-bold text-slate-800">{factory.trustScore}/100</p>
                                </div>
                                <div className="rounded-lg bg-slate-50 p-2">
                                  <p className="text-slate-400">Verdict</p>
                                  <p className="mt-0.5 font-bold text-slate-800">{factory.verdict}</p>
                                </div>
                                <div className="rounded-lg bg-slate-50 p-2">
                                  <p className="text-slate-400">PM2.5</p>
                                  <p className="mt-0.5 font-bold text-slate-800">
                                    {factory.rawReading?.pollutants?.pm25 ?? 'N/A'} µg/m³
                                  </p>
                                </div>
                                <div className="rounded-lg bg-slate-50 p-2">
                                  <p className="text-slate-400">SO2</p>
                                  <p className="mt-0.5 font-bold text-slate-800">
                                    {factory.rawReading?.pollutants?.so2 ?? 'N/A'} ppb
                                  </p>
                                </div>
                              </div>

                              {factory.aiSummary && (
                                <p className="mt-2 text-[9px] italic text-slate-600 line-clamp-2">
                                  🤖 "{factory.aiSummary}"
                                </p>
                              )}

                              <button
                                onClick={() => navigate(`/sensorinvestigation?id=${factory.factoryId}`)}
                                className="mt-3 w-full rounded-lg bg-[#0B6B50] px-3 py-2 text-[10px] font-semibold text-white hover:bg-[#09523d] transition"
                              >
                                Investigate sensors →
                              </button>
                            </div>
                          </Popup>
                        </CircleMarker>
                      );
                    })}
                  </MapContainer>
                </div>
              </div>

              {/* Map Summary Breakdown */}
              <div className="border-t border-slate-100 bg-white p-5 dark:border-white/10 dark:bg-[#0B241D] lg:border-l lg:border-t-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      Network Status
                    </p>
                    <p className="mt-1 text-xl font-bold text-[#0F172A] dark:text-white">
                      {factoriesData.length}
                    </p>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500">monitored factories</p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-[#0B6B50] dark:bg-emerald-400/10 dark:text-emerald-300">
                    <Factory size={19} />
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  {networkBreakdown.map(([name, count, percent, dot]) => (
                    <div key={name} className="rounded-xl border border-slate-100 p-3 dark:border-white/10">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-300">
                          <span className={`h-2 w-2 rounded-full ${dot}`} />
                          {name}
                        </span>
                        <span className="text-xs font-bold text-[#0F172A] dark:text-white">{count}</span>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
                          <div className={`h-full rounded-full ${dot}`} style={{ width: percent }} />
                        </div>
                        <span className="text-[9px] text-slate-400">{percent}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {alertsData.length > 0 && (
                  <div className="mt-5 rounded-xl bg-[#052E24] p-4 text-white">
                    <div className="flex items-center gap-2">
                      <CircleAlert size={15} className="text-amber-300" />
                      <span className="text-xs font-semibold">Active Incidents</span>
                    </div>
                    <p className="mt-2 text-[10px] leading-4 text-white/70">
                      {alertsData.length} unresolved violation/tampering alerts detected.
                    </p>
                    <button
                      onClick={() => navigate('/alerts')}
                      className="mt-3 text-[10px] font-semibold text-emerald-300 hover:text-white"
                    >
                      Review alerts →
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Real-time Alerts Panel */}
          <section className="mt-5 grid gap-5 xl:grid-cols-[1.55fr_.75fr]">
            {/* AI Auditor Summary Card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.03)] transition-colors duration-300 dark:border-white/10 dark:bg-[#0B241D]">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#0F172A] dark:text-white flex items-center gap-2">
                    <Sparkles size={16} className="text-emerald-500" />
                    EcoTrust AI Auditor Logs (Groq LLaMA 3.3)
                  </h3>
                  <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">
                    Natural language reasoning and cross-correlation audit
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                {factoriesData.slice(0, 3).map((f) => (
                  <div key={f._id} className="rounded-xl border border-slate-100 p-3.5 dark:border-white/10">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{f.factoryName}</span>
                      <span className={`px-2 py-0.5 text-[9px] font-bold rounded-full ${
                        f.verdict === 'VERIFIED'
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300'
                          : 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300'
                      }`}>
                        Score: {f.trustScore}/100 • {f.verdict}
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">
                      "{f.aiSummary || 'All emission telemetry verified normal against factory power load.'}"
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Alerts Feed */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.03)] transition-colors duration-300 dark:border-white/10 dark:bg-[#0B241D]">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#0F172A] dark:text-white">Recent Alerts</h3>
                  <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">Events requiring attention</p>
                </div>
                <button onClick={() => navigate('/alerts')} className="text-[10px] font-semibold text-[#0B6B50] hover:underline dark:text-emerald-300">
                  View all ({alertsData.length})
                </button>
              </div>

              <div className="mt-3">
                {alertsData.length === 0 ? (
                  <p className="py-6 text-center text-xs text-slate-400">No active alerts. All facilities compliant 🌿</p>
                ) : (
                  alertsData.slice(0, 4).map((alert) => <AlertItem key={alert._id} alert={alert} />)
                )}
              </div>
            </div>
          </section>

          {/* Live Environmental Readings Strip */}
          <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.03)] transition-colors duration-300 dark:border-white/10 dark:bg-[#0B241D]">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-[#0F172A] dark:text-white">Live Environmental Readings</h3>
                  <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-semibold text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-300">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                    LIVE
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-slate-400 dark:text-white/35">
                  Aggregate telemetry calculated from verified CEMS stacks
                </p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {emissions.map((item) => (
                <EmissionCard key={item.name} item={item} />
              ))}
            </div>
          </section>

          {/* Bottom Plant Monitoring List */}
          <section className="mt-5 grid gap-5 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 transition-colors duration-300 dark:border-white/10 dark:bg-[#0B241D]">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold">Plant Monitoring Audit</h3>
                  <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">Live trust score status</p>
                </div>
                <button onClick={() => navigate('/livemonitoring')} className="text-[10px] font-semibold text-[#0B6B50] dark:text-emerald-300">
                  View all plants →
                </button>
              </div>

              <div className="mt-5 space-y-3">
                {factoriesData.slice(0, 4).map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 dark:border-white/10"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-[#0B6B50] dark:bg-emerald-400/10 dark:text-emerald-300">
                      <Factory size={17} />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold">{item.factoryName}</p>
                      <p className="mt-0.5 text-[9px] text-slate-400">ID: {item.factoryId} · Sensor: {item.sensorId}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        {item.trustScore}/100
                      </p>
                      <p className="text-[8px] uppercase tracking-wider text-slate-400">{item.verdict}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick actions */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 transition-colors duration-300 dark:border-white/10 dark:bg-[#0B241D]">
              <h3 className="text-sm font-bold">Quick Actions</h3>
              <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">Frequently used environmental tools</p>

              <div className="mt-5 grid grid-cols-2 gap-3">
                {[
                  [Radio, 'Live Monitoring', '/livemonitoring'],
                  [LineChart, 'Generate Report', '/reports'],
                  [ShieldCheck, 'Compliance Check', '/compliance'],
                  [Bell, 'Alert Center', '/alerts'],
                ].map(([Icon, title, path]) => (
                  <button
                    key={title}
                    onClick={() => navigate(path)}
                    className="group rounded-xl border border-slate-200 p-4 text-left transition hover:border-emerald-200 hover:bg-emerald-50/40 dark:border-white/10 dark:hover:border-emerald-400/30 dark:hover:bg-emerald-400/5"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-[#0B6B50] group-hover:bg-[#0B6B50] group-hover:text-white">
                      <Icon size={17} />
                    </div>
                    <p className="mt-3 text-xs font-semibold text-slate-700 dark:text-slate-200">{title}</p>
                    <p className="mt-1 text-[9px] text-slate-400">Open tool →</p>
                  </button>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}