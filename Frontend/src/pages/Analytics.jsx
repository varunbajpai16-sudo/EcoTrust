import {
  Activity,
  Bell,
  ChevronDown,
  Download,
  Factory,
  Gauge,
  LayoutDashboard,
  Leaf,
  LineChart,
  Menu,
  Radio,
  Settings,
  ShieldCheck,
  Sun,
  Moon,
  TrendingDown,
  TrendingUp,
  X,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toggleTheme } from '../features/Theme/Theme_slice';

const parameters = {
  'Plant A': [
    { name: 'PM2.5', value: '32.8', change: '-8.4%', good: true },
    { name: 'PM10', value: '51.4', change: '-5.7%', good: true },
    { name: 'SO₂', value: '14.2', change: '+2.1%', good: false },
    { name: 'NOx', value: '21.6', change: '-11.2%', good: true },
  ],
  'Plant B': [
    { name: 'PM2.5', value: '42.7', change: '-4.2%', good: true },
    { name: 'PM10', value: '68.5', change: '+2.8%', good: false },
    { name: 'SO₂', value: '19.6', change: '-3.1%', good: true },
    { name: 'NOx', value: '31.4', change: '+4.6%', good: false },
  ],
  'Plant C': [
    { name: 'PM2.5', value: '25.8', change: '-12.6%', good: true },
    { name: 'PM10', value: '39.2', change: '-9.4%', good: true },
    { name: 'SO₂', value: '11.8', change: '-6.2%', good: true },
    { name: 'NOx', value: '17.5', change: '-13.1%', good: true },
  ],
  'Plant D': [
    { name: 'PM2.5', value: '48.2', change: '+3.8%', good: false },
    { name: 'PM10', value: '76.4', change: '+5.2%', good: false },
    { name: 'SO₂', value: '23.7', change: '+4.1%', good: false },
    { name: 'NOx', value: '36.9', change: '+2.7%', good: false },
  ],
};

const plants = [
  {
    name: 'Plant A',
    location: 'Delhi NCR',
    score: '99.2%',
    emissions: '28.4',
    trend: '-8.4%',
    reduction: '8.4%',
    anomalies: 2,
    efficiency: '96.8%',
    status: 'Compliant',
    peak: '46.2',
  },
  {
    name: 'Plant B',
    location: 'Uttar Pradesh',
    score: '97.4%',
    emissions: '42.7',
    trend: '-4.2%',
    reduction: '4.2%',
    anomalies: 5,
    efficiency: '92.6%',
    status: 'Review Required',
    peak: '64.8',
  },
  {
    name: 'Plant C',
    location: 'Maharashtra',
    score: '99.6%',
    emissions: '25.8',
    trend: '-12.6%',
    reduction: '12.6%',
    anomalies: 1,
    efficiency: '98.2%',
    status: 'Compliant',
    peak: '39.4',
  },
  {
    name: 'Plant D',
    location: 'Rajasthan',
    score: '96.8%',
    emissions: '48.2',
    trend: '+3.8%',
    reduction: '-3.8%',
    anomalies: 9,
    efficiency: '89.7%',
    status: 'Needs Attention',
    peak: '72.1',
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
    },
    {
      name: 'Analytics',
      icon: Gauge,
      path: '/analytics',
        active:true
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
        className={`fixed left-0 top-0 z-50 flex h-screen w-[250px] flex-col bg-[#052E24] text-white transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
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
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm ${
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

          <button onClick={() => navigate("/settings")} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/55 hover:bg-white/5 hover:text-white">
            <Settings size={18} />
            Settings
          </button>
        </div>

        <div className="shrink-0 border-t border-white/10 p-4">
          <div className="rounded-xl bg-white/5 p-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              <span className="text-xs font-medium">
                Analytics engine active
              </span>
            </div>

            <p className="mt-2 text-[10px] text-white/40">
              Data updated 2 min ago
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

function StatCard({ title, value, change, icon: Icon, type }) {
  const styles = {
    green: 'bg-emerald-50 text-[#0B6B50] dark:bg-emerald-400/10 dark:text-emerald-300',
    blue: 'bg-blue-50 text-blue-500 dark:bg-blue-400/10 dark:text-blue-300',
    amber: 'bg-amber-50 text-amber-500 dark:bg-amber-400/10 dark:text-amber-300',
    red: 'bg-red-50 text-red-500 dark:bg-red-400/10 dark:text-red-300',
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.03)] transition-colors duration-300 dark:border-white/10 dark:bg-[#0B241D]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400">{title}</p>

          <p className="mt-2 text-2xl font-bold">{value}</p>

          <div className="mt-2 flex items-center gap-2">
            <span
              className={`text-[10px] font-semibold ${
                change.startsWith('+') ? 'text-red-500' : 'text-emerald-600'
              }`}
            >
              {change}
            </span>

            <span className="text-[9px] text-slate-400 dark:text-slate-500">vs last period</span>
          </div>
        </div>

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${styles[type]}`}
        >
          <Icon size={19} />
        </div>
      </div>
    </div>
  );
}

function EmissionChart() {
  return (
    <div className="relative h-[310px] w-full">
      <svg
        viewBox="0 0 900 310"
        preserveAspectRatio="none"
        className="h-full w-full"
      >
        {[40, 95, 150, 205, 260].map((y) => (
          <line
            key={y}
            x1="0"
            x2="900"
            y1={y}
            y2={y}
            stroke="currentColor"
            className="text-slate-200 dark:text-white/10"
            strokeDasharray="5 5"
          />
        ))}

        <path
          d="M0 205
          C50 190 75 210 120 175
          C165 140 190 180 230 155
          C270 130 310 165 350 125
          C390 85 420 145 460 120
          C500 95 530 135 570 105
          C610 70 650 110 690 82
          C730 55 760 90 800 60
          C840 35 870 50 900 32
          V310 H0Z"
          fill="rgba(11,107,80,0.08)"
        />

        <path
          d="M0 205
          C50 190 75 210 120 175
          C165 140 190 180 230 155
          C270 130 310 165 350 125
          C390 85 420 145 460 120
          C500 95 530 135 570 105
          C610 70 650 110 690 82
          C730 55 760 90 800 60
          C840 35 870 50 900 32"
          fill="none"
          stroke="#0B6B50"
          strokeWidth="3"
        />

        <circle cx="900" cy="32" r="6" fill="#0B6B50" />
      </svg>

      <div className="absolute bottom-0 left-0 flex w-full justify-between text-[9px] text-slate-400">
        <span>Aug 12</span>
        <span>Aug 13</span>
        <span>Aug 14</span>
        <span>Aug 15</span>
        <span>Aug 16</span>
        <span>Aug 17</span>
        <span>Today</span>
      </div>
    </div>
  );
}

function ParameterCard({ parameter }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 transition-colors duration-300 dark:border-white/10 dark:bg-white/[0.03]">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">{parameter.name}</p>

        {parameter.good ? (
          <TrendingDown size={15} className="text-emerald-500" />
        ) : (
          <TrendingUp size={15} className="text-amber-500" />
        )}
      </div>

      <div className="mt-3 flex items-end justify-between">
        <span className="font-mono text-xl font-semibold">
          {parameter.value}
        </span>

        <span
          className={`font-mono text-[10px] font-semibold ${
            parameter.good ? 'text-emerald-600' : 'text-amber-500'
          }`}
        >
          {parameter.change}
        </span>
      </div>

      <p className="mt-1 text-[9px] text-slate-400">Average concentration</p>
    </div>
  );
}

export default function Analytics() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const isDark = theme === 'dark';

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(plants[0]);
  const selectedParameters = parameters[selectedPlant.name];

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  return (
    <div className="min-h-screen bg-[#F7FAF8] font-[Inter,sans-serif] text-[#0F172A] transition-colors duration-300 dark:bg-[#071A15] dark:text-white">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

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
              <h1 className="text-lg font-bold">Analytics</h1>

              <p className="hidden text-[10px] text-slate-400 dark:text-slate-500 sm:block">
                Environmental trends and performance insights
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300 sm:flex">
              <Activity size={13} />
              Analytics updated
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
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0B6B50] text-xs font-bold text-white">
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

        <main className="mx-auto max-w-[1600px] p-5 lg:p-8">
          {/* Heading */}
          <div className="mb-7 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-bold text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-300">
                <LineChart size={11} />
                ANALYTICS
              </span>

              <h2 className="mt-3 text-2xl font-bold tracking-tight">
                Environmental Analytics
              </h2>

              <p className="mt-1 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
                Understand emission trends, compare facilities and identify
                environmental performance patterns.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <select
                  value={selectedPlant.name}
                  onChange={(e) =>
                    setSelectedPlant(
                      plants.find((plant) => plant.name === e.target.value) || plants[0]
                    )
                  }
                  className="appearance-none rounded-lg border border-slate-200 bg-white py-2.5 pl-3 pr-8 text-xs font-semibold text-slate-600 outline-none transition dark:border-white/10 dark:bg-[#0B241D] dark:text-slate-200 focus:border-[#0B6B50]"
                >
                  {plants.map((plant) => (
                    <option key={plant.name} value={plant.name}>
                      {plant.name}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={13}
                  className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>

              <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-600 transition dark:border-white/10 dark:bg-[#0B241D] dark:text-slate-300">
                Last 30 Days
                <ChevronDown size={13} />
              </button>

              <button className="flex items-center gap-2 rounded-lg bg-[#0B6B50] px-4 py-2.5 text-xs font-semibold text-white">
                <Download size={14} />
                Export
              </button>
            </div>
          </div>

          {/* Selected plant analytics */}
          <section className="mb-5 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5 transition-colors duration-300 dark:border-emerald-400/20 dark:bg-emerald-400/10">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-emerald-700 dark:text-emerald-300">
                  Currently analyzing
                </p>
                <div className="mt-1 flex items-center gap-3">
                  <Factory size={19} className="text-[#0B6B50]" />
                  <h3 className="text-base font-bold text-[#064E3B] dark:text-emerald-200">
                    {selectedPlant.name}
                  </h3>
                  <span className="text-[10px] text-emerald-700/70 dark:text-emerald-300/70">
                    {selectedPlant.location}
                  </span>
                </div>
              </div>
              <span className={`rounded-full px-3 py-1.5 text-[9px] font-semibold ${
                selectedPlant.status === 'Compliant'
                  ? 'bg-white text-emerald-600 dark:bg-[#0B241D] dark:text-emerald-300'
                  : 'bg-amber-50 text-amber-600 dark:bg-amber-400/10 dark:text-amber-300'
              }`}>
                {selectedPlant.status}
              </span>
            </div>
          </section>

          {/* Stats */}
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Average PM2.5"
              value={`${selectedPlant.emissions} µg/m³`}
              change={selectedPlant.trend}
              icon={selectedPlant.trend.startsWith('+') ? TrendingUp : TrendingDown}
              type={selectedPlant.trend.startsWith('+') ? 'red' : 'green'}
            />

            <StatCard
              title="Emission Reduction"
              value={selectedPlant.reduction}
              change={selectedPlant.trend}
              icon={TrendingDown}
              type="blue"
            />

            <StatCard
              title="Compliance Score"
              value={selectedPlant.score}
              change={selectedPlant.trend.startsWith('+') ? '-0.8%' : '+2.4%'}
              icon={ShieldCheck}
              type="green"
            />

            <StatCard
              title="Anomalies Detected"
              value={selectedPlant.anomalies}
              change={selectedPlant.anomalies > 5 ? '+3' : '-2'}
              icon={Activity}
              type={selectedPlant.anomalies > 5 ? 'red' : 'amber'}
            />
          </section>

          {/* Main chart */}
          <section className="mt-5 grid gap-5 xl:grid-cols-[1.4fr_.6fr]">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.03)] transition-colors duration-300 dark:border-white/10 dark:bg-[#0B241D]">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold">Emission Trend</h3>

                    <span className="rounded-full bg-emerald-50 px-2 py-1 text-[8px] font-semibold text-emerald-600">
                      IMPROVING
                    </span>
                  </div>

                  <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">
                    {selectedPlant.name} PM2.5 concentration over the last 30 days
                  </p>
                </div>

                <div className="flex gap-2">
                  <button className="rounded-lg bg-emerald-50 px-3 py-2 text-[9px] font-semibold text-[#0B6B50] dark:bg-emerald-400/10 dark:text-emerald-300">
                    PM2.5
                  </button>

                  <button className="rounded-lg border border-slate-200 px-3 py-2 text-[9px] text-slate-500 dark:border-white/10 dark:text-slate-300">
                    PM10
                  </button>

                  <button className="hidden rounded-lg border border-slate-200 px-3 py-2 text-[9px] text-slate-500 sm:block">
                    NOx
                  </button>
                </div>
              </div>

              <div className="mt-5 flex items-end gap-3">
                <span className="font-mono text-3xl font-semibold">{selectedPlant.emissions}</span>

                <span className="mb-1 font-mono text-[10px] text-slate-400">
                  µg/m³
                </span>

                <span className={`mb-1 rounded-full px-2 py-1 text-[9px] font-semibold ${
                  selectedPlant.trend.startsWith('+')
                    ? 'bg-red-50 text-red-500'
                    : 'bg-emerald-50 text-emerald-600'
                }`}>
                  {selectedPlant.trend.startsWith('+') ? '↑' : '↓'} {selectedPlant.trend.replace('+', '').replace('-', '')}
                </span>
              </div>

              <EmissionChart />
            </div>

            {/* Parameter analysis */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.03)] transition-colors duration-300 dark:border-white/10 dark:bg-[#0B241D]">
              <div>
                <h3 className="text-sm font-bold">Parameter Analysis</h3>

                <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">
                  {selectedPlant.name} · 30-day average performance
                </p>
              </div>

              <div className="mt-5 space-y-3">
                {selectedParameters.map((parameter) => (
                  <ParameterCard key={parameter.name} parameter={parameter} />
                ))}
              </div>
            </div>
          </section>

          {/* Insight banner */}
          <section className="mt-5 flex flex-col gap-4 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5 transition-colors duration-300 dark:border-emerald-400/20 dark:bg-emerald-400/10 lg:flex-row lg:items-center">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0B6B50] text-white">
              <TrendingDown size={20} />
            </div>

            <div className="flex-1">
              <p className="text-sm font-bold text-[#064E3B] dark:text-emerald-200">
                {selectedPlant.name} emissions trend
              </p>

              <p className="mt-1 text-[10px] text-emerald-700/70 dark:text-emerald-300/70">
                {selectedPlant.trend.startsWith('+')
                  ? `${selectedPlant.name} shows a ${selectedPlant.trend} increase in average emissions over the previous 30 days.`
                  : `${selectedPlant.name} shows a ${selectedPlant.trend} reduction in average emissions over the previous 30 days.`}
              </p>
            </div>

            <button className="rounded-lg border border-emerald-200 bg-white px-4 py-2.5 text-[10px] font-semibold text-[#0B6B50] dark:border-emerald-400/30 dark:bg-[#0B241D] dark:text-emerald-300">
              View Insights
            </button>
          </section>

          {/* Selected plant performance */}
          <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.03)] transition-colors duration-300 dark:border-white/10 dark:bg-[#0B241D]">
            <div>
              <h3 className="text-sm font-bold text-[#0F172A] dark:text-white">{selectedPlant.name} Performance Analysis</h3>
              <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">
                Facility-specific environmental performance indicators
              </p>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl bg-slate-50 p-4 dark:bg-white/[0.03]">
                <p className="text-[9px] text-slate-400 dark:text-slate-500">Peak PM2.5</p>
                <p className="mt-2 font-mono text-xl font-semibold">{selectedPlant.peak}</p>
                <p className="mt-1 text-[9px] text-slate-400">µg/m³ · 30-day peak</p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4 dark:bg-white/[0.03]">
                <p className="text-[9px] text-slate-400 dark:text-slate-500">Operating Efficiency</p>
                <p className="mt-2 font-mono text-xl font-semibold text-[#0B6B50]">
                  {selectedPlant.efficiency}
                </p>
                <p className="mt-1 text-[9px] text-slate-400">Environmental efficiency</p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4 dark:bg-white/[0.03]">
                <p className="text-[9px] text-slate-400 dark:text-slate-500">Anomalies</p>
                <p className={`mt-2 font-mono text-xl font-semibold ${
                  selectedPlant.anomalies > 5 ? 'text-red-500' : 'text-amber-500'
                }`}>
                  {selectedPlant.anomalies}
                </p>
                <p className="mt-1 text-[9px] text-slate-400">Detected in 30 days</p>
              </div>
            </div>
          </section>

          {/* Plant comparison */}
          <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.03)] transition-colors duration-300 dark:border-white/10 dark:bg-[#0B241D]">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h3 className="text-sm font-bold text-[#0F172A] dark:text-white">
                  Plant Performance Comparison
                </h3>

                <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">
                  Compare environmental performance across facilities
                </p>
              </div>

              <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-[10px] text-slate-500 dark:border-white/10 dark:text-slate-300">
                Sort by
                <span className="font-semibold">Emissions</span>
                <ChevronDown size={11} />
              </button>
            </div>

            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="border-b border-slate-100 text-left text-[9px] text-slate-400 dark:border-white/10 dark:text-slate-500">
                    <th className="pb-3 font-medium">Facility</th>

                    <th className="pb-3 font-medium">Compliance</th>

                    <th className="pb-3 font-medium">Avg. PM2.5</th>

                    <th className="pb-3 font-medium">Trend</th>

                    <th className="pb-3 text-right font-medium">Performance</th>
                  </tr>
                </thead>

                <tbody>
                  {plants.map((plant) => (
                    <tr
                      key={plant.name}
                      className="border-b border-slate-50 last:border-0 dark:border-white/5"
                    >
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-[#0B6B50] dark:bg-emerald-400/10 dark:text-emerald-300">
                            <Factory size={16} />
                          </div>

                          <div>
                            <p className="text-xs font-semibold">
                              {plant.name}
                            </p>

                            <p className="mt-0.5 text-[9px] text-slate-400 dark:text-slate-500">
                              {plant.location}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="py-4">
                        <span className="font-mono text-xs font-semibold text-emerald-600">
                          {plant.score}
                        </span>
                      </td>

                      <td className="py-4">
                        <span className="font-mono text-xs font-semibold">
                          {plant.emissions}
                        </span>

                        <span className="ml-1 font-mono text-[8px] text-slate-400 dark:text-slate-500">
                          µg/m³
                        </span>
                      </td>

                      <td className="py-4">
                        <span
                          className={`flex items-center gap-1 text-[10px] font-semibold ${
                            plant.trend.startsWith('+')
                              ? 'text-red-500'
                              : 'text-emerald-600'
                          }`}
                        >
                          {plant.trend.startsWith('+') ? (
                            <TrendingUp size={12} />
                          ) : (
                            <TrendingDown size={12} />
                          )}

                          {plant.trend}
                        </span>
                      </td>

                      <td className="py-4">
                        <div className="flex justify-end">
                          <div className="h-2 w-24 rounded-full bg-slate-100 dark:bg-white/10">
                            <div
                              className="h-full rounded-full bg-[#0B6B50]"
                              style={{
                                width: plant.score,
                              }}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Insights */}
          <section className="mt-5 grid gap-5 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 transition-colors duration-300 dark:border-white/10 dark:bg-[#0B241D]">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-[#0B6B50]">
                  <TrendingDown size={18} />
                </div>

                <div>
                  <p className="text-xs font-bold">Best Improvement</p>

                  <p className="text-[9px] text-slate-400 dark:text-slate-500">Plant C</p>
                </div>
              </div>

              <p className="mt-5 font-mono text-2xl font-semibold text-emerald-600">
                -12.6%
              </p>

              <p className="mt-1 text-[10px] text-slate-400">
                Reduction in average emissions
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 transition-colors duration-300 dark:border-white/10 dark:bg-[#0B241D]">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-500">
                  <TrendingUp size={18} />
                </div>

                <div>
                  <p className="text-xs font-bold">Needs Attention</p>

                  <p className="text-[9px] text-slate-400 dark:text-slate-500">Plant D</p>
                </div>
              </div>

              <p className="mt-5 font-mono text-2xl font-semibold text-amber-500">
                +3.8%
              </p>

              <p className="mt-1 text-[10px] text-slate-400">
                Increase in average emissions
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 transition-colors duration-300 dark:border-white/10 dark:bg-[#0B241D]">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-500">
                  <Gauge size={18} />
                </div>

                <div>
                  <p className="text-xs font-bold">Overall Efficiency</p>

                  <p className="text-[9px] text-slate-400 dark:text-slate-500">All facilities</p>
                </div>
              </div>

              <p className="mt-5 font-mono text-2xl font-semibold text-blue-500">
                94.2%
              </p>

              <p className="mt-1 text-[10px] text-slate-400">
                Environmental operating efficiency
              </p>
            </div>
          </section>

          {/* Bottom status */}
          <section className="mt-5 flex flex-col gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-5 transition-colors duration-300 dark:border-emerald-400/20 dark:bg-emerald-400/10 sm:flex-row sm:items-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
              <Activity size={19} />
            </div>

            <div className="flex-1">
              <p className="text-xs font-bold text-emerald-800 dark:text-emerald-200">
                Analytics engine is active
              </p>

              <p className="mt-1 text-[10px] text-emerald-700/70 dark:text-emerald-300/70">
                EcoTrust is analyzing historical and live environmental data to
                identify trends, anomalies and performance changes.
              </p>
            </div>

            <span className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[9px] font-semibold text-emerald-600 dark:bg-[#0B241D] dark:text-emerald-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              Processing
            </span>
          </section>
        </main>
      </div>
    </div>
  );
}
