import {
  Bell,
  ChevronDown,
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
  Settings,
  ShieldCheck,
  Sun,
  Thermometer,
  Wind,
  X,
} from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom';
import { toggleTheme } from '../features/Theme/Theme_slice';

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

const stats = [
  {
    title: 'Compliance Score',
    value: '98.7%',
    change: '+2.4%',
    label: 'vs last month',
    icon: ShieldCheck,
    type: 'green',
  },
  {
    title: 'Active Alerts',
    value: '12',
    change: '3 Critical',
    label: 'requires attention',
    icon: CircleAlert,
    type: 'red',
  },
  {
    title: 'Connected Devices',
    value: '10,248',
    change: '+124',
    label: 'this month',
    icon: Radio,
    type: 'green',
  },
  {
    title: 'Monitored Plants',
    value: '524',
    change: '100%',
    label: 'online',
    icon: Factory,
    type: 'blue',
  },
];

const emissions = [
  {
    name: 'PM2.5',
    value: '28.4',
    unit: 'µg/m³',
    status: 'Good',
    icon: Wind,
  },
  {
    name: 'PM10',
    value: '45.1',
    unit: 'µg/m³',
    status: 'Good',
    icon: Wind,
  },
  {
    name: 'SO₂',
    value: '12.3',
    unit: 'ppb',
    status: 'Normal',
    icon: Cloud,
  },
  {
    name: 'NOx',
    value: '18.7',
    unit: 'ppb',
    status: 'Normal',
    icon: Cloud,
  },
  {
    name: 'CO₂',
    value: '421.8',
    unit: 'ppm',
    status: 'Normal',
    icon: Cloud,
  },
  {
    name: 'Temperature',
    value: '31.4',
    unit: '°C',
    status: 'Normal',
    icon: Thermometer,
  },
];

const alerts = [
  {
    title: 'High PM2.5 Level',
    plant: 'Plant A · Unit 2',
    time: '2 min ago',
    severity: 'critical',
  },
  {
    title: 'CO₂ Level Warning',
    plant: 'Plant B · Unit 1',
    time: '15 min ago',
    severity: 'warning',
  },
  {
    title: 'Temperature High',
    plant: 'Plant C · Unit 3',
    time: '1 hour ago',
    severity: 'warning',
  },
  {
    title: 'Low AQI Risk',
    plant: 'Plant D · Unit 1',
    time: '2 hours ago',
    severity: 'normal',
  },
];

function Sidebar({ open, setOpen }) {
  const navigate = useNavigate();
  const items = [
    {
      name: 'Overview',
      icon: LayoutDashboard,
      path: '/dashboard',
      active: true,
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
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* FIXED SIDEBAR */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-[250px] flex-col
          bg-[#052E24] text-white
          transition-transform duration-300
          ${open ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-white/10 px-6">
          <div className="flex items-center gap-3">
            <div
              onClick={() => navigate('/')}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0B6B50] hover:cursor-pointer"
            >
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
                  onClick={() => navigate(item.path)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
                    item.active
                      ? 'bg-[#0B6B50] text-white shadow-lg shadow-black/10'
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
            onClick={() => navigate('/settings')}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/55 hover:bg-white/5 hover:text-white"
          >
            <Settings size={18} />
            Settings
          </button>
        </div>

        {/* System status */}
        <div className="shrink-0 border-t border-white/10 p-4">
          <div className="rounded-xl bg-white/5 p-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

              <span className="text-xs font-medium">
                All systems operational
              </span>
            </div>

            <p className="mt-2 text-[10px] text-white/40">
              Last synchronized 12 sec ago
            </p>
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
      ? 'bg-red-50 text-red-500'
      : data.type === 'blue'
        ? 'bg-blue-50 text-blue-500'
        : 'bg-emerald-50 text-[#0B6B50]';

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.03)] transition-colors duration-300 hover:-translate-y-0.5 hover:shadow-lg dark:border-white/10 dark:bg-[#0B241D]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {data.title}
          </p>

          <h3 className="mt-2 text-2xl font-bold tracking-tight text-[#0F172A] dark:text-white">
            {data.value}
          </h3>
        </div>

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconBg}`}
        >
          <Icon size={19} />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-xs">
        <span
          className={`font-semibold ${
            data.type === 'red' ? 'text-red-500' : 'text-emerald-600'
          }`}
        >
          {data.change}
        </span>

        <span className="text-slate-400 dark:text-slate-500">{data.label}</span>
      </div>
    </div>
  );
}

function ComplianceChart() {
  return (
    <div className="relative h-[260px] w-full">
      <svg
        viewBox="0 0 800 260"
        preserveAspectRatio="none"
        className="h-full w-full"
      >
        <defs>
          <linearGradient id="complianceFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10B981" stopOpacity=".22" />

            <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[30, 80, 130, 180, 230].map((y) => (
          <line
            key={y}
            x1="0"
            x2="800"
            y1={y}
            y2={y}
            stroke="#E2E8F0"
            strokeDasharray="5 5"
          />
        ))}

        <path
          d="M0 190
             C50 175 65 182 105 160
             C145 138 160 150 200 132
             C240 115 260 140 300 108
             C340 77 370 115 410 95
             C450 72 470 110 510 78
             C550 46 580 82 620 62
             C660 42 700 62 735 42
             C760 28 780 34 800 20
             V260 H0Z"
          fill="url(#complianceFill)"
        />

        <path
          d="M0 190
             C50 175 65 182 105 160
             C145 138 160 150 200 132
             C240 115 260 140 300 108
             C340 77 370 115 410 95
             C450 72 470 110 510 78
             C550 46 580 82 620 62
             C660 42 700 62 735 42
             C760 28 780 34 800 20"
          fill="none"
          stroke="#0B6B50"
          strokeWidth="3"
        />

        <circle cx="800" cy="20" r="5" fill="#0B6B50" />
      </svg>

      <div className="absolute bottom-0 left-0 flex w-full justify-between text-[10px] text-slate-400">
        <span>May 18</span>
        <span>May 19</span>
        <span>May 20</span>
        <span>May 21</span>
        <span>May 22</span>
        <span>May 23</span>
        <span>May 24</span>
      </div>
    </div>
  );
}

function AlertItem({ alert }) {
  const styles = {
    critical: {
      dot: 'bg-red-500',
      bg: 'bg-red-50',
    },
    warning: {
      dot: 'bg-amber-400',
      bg: 'bg-amber-50',
    },
    normal: {
      dot: 'bg-emerald-500',
      bg: 'bg-emerald-50',
    },
  };

  const style = styles[alert.severity];

  return (
    <div className="flex gap-3 border-b border-slate-100 py-3.5 last:border-0 dark:border-white/10">
      <div
        className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${style.bg}`}
      >
        <span className={`h-2 w-2 rounded-full ${style.dot}`} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="truncate text-xs font-semibold text-slate-700 dark:text-slate-200">
            {alert.title}
          </p>

          <span className="shrink-0 text-[9px] text-slate-400">
            {alert.time}
          </span>
        </div>

        <p className="mt-1 text-[10px] text-slate-400">{alert.plant}</p>
      </div>
    </div>
  );
}

function EmissionCard({ item }) {
  const Icon = item.icon;

  return (
    <div className="group rounded-xl border border-slate-200 bg-white p-4 transition hover:border-emerald-200 hover:shadow-md dark:border-white/10 dark:bg-[#0B241D]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-[#0B6B50] dark:bg-emerald-400/10 dark:text-emerald-300">
            <Icon size={15} />
          </div>

          <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
            {item.name}
          </span>
        </div>

        <span className="h-2 w-2 rounded-full bg-emerald-500" />
      </div>

      <div className="mt-4">
        <span className="font-mono text-xl font-semibold text-[#0F172A] dark:text-white">
          {item.value}
        </span>

        <span className="ml-1 font-mono text-[9px] text-slate-400">
          {item.unit}
        </span>
      </div>

      <p className="mt-1 text-[10px] font-medium text-emerald-600">
        {item.status}
      </p>
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const isDark = theme === 'dark';
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  return (
    <div className="min-h-screen bg-[#F7FAF8] font-[Inter,sans-serif] text-[#0F172A] transition-colors duration-300 dark:bg-[#071A15] dark:text-white">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* MAIN CONTENT
          250px left margin because sidebar is fixed */}
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
              <h1 className="text-lg font-bold text-[#0F172A] dark:text-white">
                Dashboard Overview
              </h1>

              <p className="hidden text-[10px] text-slate-400 dark:text-slate-500 sm:block">
                Real-time environmental intelligence
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Date */}
            <button className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-500 dark:border-white/10 dark:bg-[#0B241D] dark:text-slate-300 sm:flex">
              <span>May 18 – May 24, 2026</span>

              <ChevronDown size={13} />
            </button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Notification */}
            <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 dark:border-white/10 dark:bg-[#0B241D] dark:text-slate-300 dark:hover:bg-white/5">
              <Bell size={17} />

              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full border-2 border-white bg-red-500 dark:border-[#071A15]" />
            </button>

            {/* User */}
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
                className="hidden text-slate-400 dark:text-slate-500 sm:block"
              />
            </div>
          </div>
        </header>

        {/* Main */}
        <main className="mx-auto max-w-[1600px] p-5 lg:p-8">
          {/* Welcome */}
          <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Good morning, Admin 👋
              </p>

              <h2 className="mt-1 text-2xl font-bold tracking-tight text-[#0F172A] dark:text-white">
                Environmental Overview
              </h2>
            </div>

            <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              Live data connected
            </div>
          </div>

          {/* Stats */}
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((item) => (
              <StatCard key={item.title} data={item} />
            ))}
          </section>

          {/* Factory Map — primary monitoring surface */}
          <section className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_24px_rgba(15,23,42,0.04)] transition-colors duration-300 dark:border-white/10 dark:bg-[#0B241D]">
            <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center dark:border-white/10 lg:px-6">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-[#0F172A] dark:text-white">
                    Environmental Monitoring
                  </h3>
                  <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-semibold text-emerald-600">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                    LIVE
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">
                  Real-time status of monitored factories across your
                  jurisdiction
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-[10px] dark:border-white/10 dark:bg-white/5">
                  <span className="font-medium text-slate-500 dark:text-slate-400">
                    Status
                  </span>
                  <span className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />{' '}
                    Normal
                  </span>
                  <span className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
                    <span className="h-2 w-2 rounded-full bg-amber-400" />{' '}
                    Warning
                  </span>
                  <span className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
                    <span className="h-2 w-2 rounded-full bg-red-500" />{' '}
                    Violation
                  </span>
                </div>

                <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[10px] font-medium text-slate-500 hover:bg-slate-50 dark:border-white/10 dark:bg-[#071A15] dark:text-slate-300 dark:hover:bg-white/5">
                  <MapPin size={12} />
                  All locations
                  <ChevronDown size={12} />
                </button>
              </div>
            </div>

            <div className="grid lg:grid-cols-[1fr_250px]">
              {/* Map */}
              <div className="relative min-h-[430px] overflow-hidden bg-[#eef5f1] dark:bg-[#0A211B]">
                {/* subtle map grid */}
                <div
                  className="absolute inset-0 opacity-50"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(11,107,80,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(11,107,80,.06) 1px, transparent 1px)',
                    backgroundSize: '42px 42px',
                  }}
                />

                <div className="absolute left-4 top-4 z-10 rounded-xl border border-white/80 bg-white/90 px-3 py-2 shadow-sm backdrop-blur dark:border-white/10 dark:bg-[#0B241D]/90">
                  <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Monitoring area
                  </p>
                  <p className="mt-0.5 text-xs font-bold text-[#0F172A] dark:text-white">
                    India · 28 States
                  </p>
                </div>

                {/* Real geographic map */}
                <div className="absolute inset-0">
                  <MapContainer
                    center={[22.8, 79.2]}
                    zoom={5}
                    minZoom={4}
                    maxZoom={12}
                    scrollWheelZoom={true}
                    className="h-full w-full"
                  >
                    <TileLayer
                      attribution="&copy; OpenStreetMap contributors"
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {[
                      {
                        name: 'Plant A',
                        city: 'Delhi NCR',
                        position: [28.6139, 77.209],
                        status: 'normal',
                        score: '98.9%',
                        sensors: '248 sensors',
                        pm25: '28.4 µg/m³',
                      },
                      {
                        name: 'Plant B',
                        city: 'Lucknow, Uttar Pradesh',
                        position: [26.8467, 80.9462],
                        status: 'warning',
                        score: '97.4%',
                        sensors: '182 sensors',
                        pm25: '61.2 µg/m³',
                      },
                      {
                        name: 'Plant C',
                        city: 'Mumbai, Maharashtra',
                        position: [19.076, 72.8777],
                        status: 'violation',
                        score: '72.1%',
                        sensors: '316 sensors',
                        pm25: '148.7 µg/m³',
                      },
                      {
                        name: 'Plant D',
                        city: 'Pune, Maharashtra',
                        position: [18.5204, 73.8567],
                        status: 'normal',
                        score: '99.2%',
                        sensors: '204 sensors',
                        pm25: '24.8 µg/m³',
                      },
                      {
                        name: 'Plant E',
                        city: 'Ahmedabad, Gujarat',
                        position: [23.0225, 72.5714],
                        status: 'normal',
                        score: '96.8%',
                        sensors: '156 sensors',
                        pm25: '31.6 µg/m³',
                      },
                      {
                        name: 'Plant F',
                        city: 'Hyderabad, Telangana',
                        position: [17.385, 78.4867],
                        status: 'warning',
                        score: '91.4%',
                        sensors: '193 sensors',
                        pm25: '72.4 µg/m³',
                      },
                      {
                        name: 'Plant G',
                        city: 'Chennai, Tamil Nadu',
                        position: [13.0827, 80.2707],
                        status: 'normal',
                        score: '98.1%',
                        sensors: '217 sensors',
                        pm25: '26.1 µg/m³',
                      },
                    ].map((factory) => {
                      const markerColor =
                        factory.status === 'violation'
                          ? '#EF4444'
                          : factory.status === 'warning'
                            ? '#F59E0B'
                            : '#10B981';

                      return (
                        <CircleMarker
                          key={factory.name}
                          center={factory.position}
                          radius={9}
                          pathOptions={{
                            color: '#ffffff',
                            weight: 3,
                            fillColor: markerColor,
                            fillOpacity: 1,
                          }}
                        >
                          <Popup>
                            <div className="min-w-[190px] font-sans">
                              <div className="flex items-center justify-between gap-3">
                                <div>
                                  <p className="text-sm font-bold text-slate-900">
                                    {factory.name}
                                  </p>
                                  <p className="text-[10px] text-slate-500">
                                    {factory.city}
                                  </p>
                                </div>
                                <span
                                  className="h-2.5 w-2.5 rounded-full"
                                  style={{ backgroundColor: markerColor }}
                                />
                              </div>

                              <div className="mt-3 grid grid-cols-2 gap-2 text-[10px]">
                                <div className="rounded-lg bg-slate-50 p-2">
                                  <p className="text-slate-400">Compliance</p>
                                  <p className="mt-0.5 font-bold text-slate-800">
                                    {factory.score}
                                  </p>
                                </div>
                                <div className="rounded-lg bg-slate-50 p-2">
                                  <p className="text-slate-400">PM2.5</p>
                                  <p className="mt-0.5 font-bold text-slate-800">
                                    {factory.pm25}
                                  </p>
                                </div>
                                <div className="col-span-2 rounded-lg bg-slate-50 p-2">
                                  <p className="text-slate-400">
                                    Connected devices
                                  </p>
                                  <p className="mt-0.5 font-bold text-slate-800">
                                    {factory.sensors}
                                  </p>
                                </div>
                              </div>

                              <button className="mt-3 w-full rounded-lg bg-[#0B6B50] px-3 py-2 text-[10px] font-semibold text-white">
                                View factory details →
                              </button>
                            </div>
                          </Popup>
                        </CircleMarker>
                      );
                    })}
                  </MapContainer>
                </div>

                {/* map controls */}
                <div className="absolute bottom-4 right-4 rounded-lg border border-white bg-white/90 px-3 py-2 text-[9px] text-slate-400 shadow-sm backdrop-blur dark:border-white/10 dark:bg-[#0B241D]/90 dark:text-slate-500">
                  Updated 8 sec ago
                </div>
              </div>

              {/* Map summary */}
              <div className="border-t border-slate-100 bg-white p-5 dark:border-white/10 dark:bg-[#0B241D] lg:border-l lg:border-t-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      Network status
                    </p>
                    <p className="mt-1 text-xl font-bold text-[#0F172A] dark:text-white">
                      1,284
                    </p>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500">
                      monitored factories
                    </p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-[#0B6B50]">
                    <Factory size={19} />
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  {[
                    ['Compliant', '1,197', '93.2%', 'bg-emerald-500'],
                    ['Warnings', '44', '3.4%', 'bg-amber-400'],
                    ['Violations', '43', '3.3%', 'bg-red-500'],
                  ].map(([name, count, percent, dot]) => (
                    <div
                      key={name}
                      className="rounded-xl border border-slate-100 p-3 dark:border-white/10"
                    >
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-300">
                          <span className={`h-2 w-2 rounded-full ${dot}`} />
                          {name}
                        </span>
                        <span className="text-xs font-bold text-[#0F172A] dark:text-white">
                          {count}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
                          <div
                            className={`h-full rounded-full ${dot}`}
                            style={{ width: percent }}
                          />
                        </div>
                        <span className="text-[9px] text-slate-400">
                          {percent}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-xl bg-[#052E24] p-4 text-white">
                  <div className="flex items-center gap-2">
                    <CircleAlert size={15} className="text-amber-300" />
                    <span className="text-xs font-semibold">
                      Attention required
                    </span>
                  </div>
                  <p className="mt-2 text-[10px] leading-4 text-white/55">
                    43 factories currently require compliance review.
                  </p>
                  <button className="mt-3 text-[10px] font-semibold text-emerald-300 hover:text-white">
                    Review violations →
                  </button>
                </div>
              </div>
            </div>

            {/* Map KPI strip */}
            <div className="grid grid-cols-2 border-t border-slate-100 dark:border-white/10 sm:grid-cols-4">
              {[
                ['1,284', 'Factories', Factory],
                ['43', 'Violations', CircleAlert],
                ['17', 'Offline Devices', Radio],
                ['89', 'Active Alerts', Bell],
              ].map(([value, label, Icon], index) => (
                <div
                  key={label}
                  className={`flex items-center gap-3 p-4 ${
                    index < 3
                      ? 'border-r border-slate-100 dark:border-white/10'
                      : ''
                  } ${index === 1 ? 'border-t border-slate-100 dark:border-white/10 sm:border-t-0' : ''} ${
                    index === 2
                      ? 'border-t border-slate-100 dark:border-white/10 sm:border-t-0'
                      : ''
                  }`}
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50 text-slate-500 dark:bg-white/5 dark:text-slate-400">
                    <Icon size={16} />
                  </div>
                  <div>
                    <p className="text-base font-bold text-[#0F172A] dark:text-white">
                      {value}
                    </p>
                    <p className="text-[9px] text-slate-400">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Analytics + Alerts */}
          <section className="mt-5 grid gap-5 xl:grid-cols-[1.55fr_.75fr]">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.03)] transition-colors duration-300 dark:border-white/10 dark:bg-[#0B241D]">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#0F172A] dark:text-white">
                    Compliance Trend
                  </h3>
                  <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">
                    Overall environmental compliance score
                  </p>
                </div>
                <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-[10px] font-medium text-slate-500 dark:border-white/10 dark:text-slate-300">
                  Last 7 days
                </button>
              </div>

              <div className="mt-4 flex items-end gap-3">
                <span className="text-3xl font-bold text-[#0F172A] dark:text-white">
                  98.7%
                </span>
                <span className="mb-1 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-600">
                  +2.4%
                </span>
              </div>

              <ComplianceChart />
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.03)] transition-colors duration-300 dark:border-white/10 dark:bg-[#0B241D]">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#0F172A] dark:text-white">
                    Recent Alerts
                  </h3>
                  <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">
                    Events requiring attention
                  </p>
                </div>
                <button className="text-[10px] font-semibold text-[#0B6B50] hover:underline">
                  View all
                </button>
              </div>

              <div className="mt-3">
                {alerts.map((alert) => (
                  <AlertItem key={alert.title} alert={alert} />
                ))}
              </div>
            </div>
          </section>

          {/* Live Environmental Readings */}
          <section
            className="
    mt-5
    rounded-2xl
    border border-slate-200
    bg-white
    p-5
    shadow-[0_4px_20px_rgba(15,23,42,0.03)]
    transition-colors duration-300

    dark:border-white/10
    dark:bg-white/[0.03]
    dark:shadow-none
  "
          >
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-[#0F172A] dark:text-white">
                    Live Environmental Readings
                  </h3>

                  <span
                    className="
            flex items-center gap-1
            rounded-full
            bg-emerald-50
            px-2 py-1
            text-[9px]
            font-semibold
            text-emerald-600

            dark:bg-emerald-500/10
            dark:text-emerald-400
          "
                  >
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                    LIVE
                  </span>
                </div>

                <p className="mt-1 text-[11px] text-slate-400 dark:text-white/35">
                  Real-time readings from connected CEMS and environmental
                  sensors
                </p>
              </div>

              {/* Location Filter */}

              <button
                className="
        flex items-center gap-2
        self-start
        rounded-lg
        border border-slate-200
        bg-white
        px-3 py-2
        text-[10px]
        font-medium
        text-slate-500
        transition

        hover:bg-slate-50
        hover:text-[#0B6B50]

        dark:border-white/10
        dark:bg-white/[0.03]
        dark:text-white/50
        dark:hover:bg-white/10
        dark:hover:text-emerald-400
      "
              >
                <MapPin size={12} />
                All locations
                <ChevronDown size={12} />
              </button>
            </div>

            {/* Emission Cards */}

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {emissions.map((item) => (
                <EmissionCard key={item.name} item={item} />
              ))}
            </div>
          </section>

          {/* Bottom section */}
          <section className="mt-5 grid gap-5 lg:grid-cols-2">
            {/* Plants */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 transition-colors duration-300 dark:border-white/10 dark:bg-[#0B241D]">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold">Plant Monitoring</h3>

                  <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">
                    Current status of monitored facilities
                  </p>
                </div>

                <button className="text-[10px] font-semibold text-[#0B6B50]">
                  View plants →
                </button>
              </div>

              <div className="mt-5 space-y-3">
                {[
                  ['Plant A', 'Delhi NCR', '248 sensors', '98.9%'],
                  ['Plant B', 'Uttar Pradesh', '182 sensors', '97.4%'],
                  ['Plant C', 'Maharashtra', '316 sensors', '99.2%'],
                ].map(([name, location, sensors, score]) => (
                  <div
                    key={name}
                    className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 dark:border-white/10"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-[#0B6B50] dark:bg-emerald-400/10 dark:text-emerald-300">
                      <Factory size={17} />
                    </div>

                    <div className="flex-1">
                      <p className="text-xs font-semibold">{name}</p>

                      <p className="mt-0.5 text-[9px] text-slate-400">
                        {location} · {sensors}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-mono text-xs font-semibold text-emerald-600">
                        {score}
                      </p>

                      <p className="text-[8px] text-slate-400">compliance</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick actions */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 transition-colors duration-300 dark:border-white/10 dark:bg-[#0B241D]">
              <h3 className="text-sm font-bold">Quick Actions</h3>

              <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">
                Frequently used environmental tools
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3">
                {[
                  [Radio, 'Live Monitoring'],
                  [LineChart, 'Generate Report'],
                  [ShieldCheck, 'Compliance Check'],
                  [Bell, 'Alert Center'],
                ].map(([Icon, title]) => (
                  <button
                    key={title}
                    className="group rounded-xl border border-slate-200 p-4 text-left transition hover:border-emerald-200 hover:bg-emerald-50/40 dark:border-white/10 dark:hover:border-emerald-400/30 dark:hover:bg-emerald-400/5"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-[#0B6B50] group-hover:bg-[#0B6B50] group-hover:text-white">
                      <Icon size={17} />
                    </div>

                    <p className="mt-3 text-xs font-semibold text-slate-700 dark:text-slate-200">
                      {title}
                    </p>

                    <p className="mt-1 text-[9px] text-slate-400">
                      Open tool →
                    </p>
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
