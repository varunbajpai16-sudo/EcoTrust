


import {
  Bell,
  Gauge,
  LayoutDashboard,
  Leaf,
  LineChart as LineChartIcon,
  Menu,
  Radio,
  Settings,
  ShieldCheck,
  Sun,
  Moon,
  TrendingDown,
  X,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toggleTheme } from '../features/Theme/Theme_slice';
import { alerts } from '../data/alerts';

// Only parameters with an electricity cross-check make sense to chart here —
// that's the whole point of surfacing the comparison on this page.
const CHARTABLE = alerts.filter((a) => a.expectedMin != null);

function Sidebar({ open, setOpen }) {
  const navigate = useNavigate();
  const items = [
    { name: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Live Monitoring', icon: Radio, path: '/livemonitoring' },
    { name: 'Alerts', icon: Bell, badge: '12', path: '/alerts' },
    { name: 'Compliance', icon: ShieldCheck, path: '/compliance' },
    { name: 'Reports', icon: LineChartIcon, path: '/reports' },
    { name: 'Analytics', icon: Gauge, path: '/analytics', active: true },
    { name: 'Devices', icon: Radio, path: '/devices' },
  ];
  return (
    <>
      {open && <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setOpen(false)} />}
      <aside className={`fixed left-0 top-0 z-50 flex h-screen w-[250px] flex-col bg-[#052E24] text-white transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
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
          <button onClick={() => setOpen(false)} className="lg:hidden"><X size={20} /></button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-widest text-white/30">Workspace</p>
          <nav className="space-y-1">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <button onClick={() => navigate(item.path)} key={item.name} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${item.active ? 'bg-[#0B6B50] text-white shadow-lg' : 'text-white/55 hover:bg-white/5 hover:text-white'}`}>
                  <Icon size={18} />
                  <span className="flex-1 text-left">{item.name}</span>
                  {item.badge && <span className="rounded-full bg-red-500 px-2 py-0.5 text-[9px] font-bold">{item.badge}</span>}
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
              <span className="text-xs font-medium">Analytics engine active</span>
            </div>
            <p className="mt-2 text-[10px] text-white/40">Data updated 2 min ago</p>
          </div>
        </div>
      </aside>
    </>
  );
}

// Reported-value line + a shaded band for the electricity-derived expected
// range, on the same axes — this is the chart that makes the cross-check
// visible without opening a single alert's Investigation page.
function OverlayChart({ history, expectedMin, expectedMax, unit }) {
  const allValues = [...history, expectedMin, expectedMax];
  const max = Math.max(...allValues) * 1.05;
  const min = Math.min(...allValues) * 0.95;
  const range = max - min || 1;

  const toY = (v) => 160 - ((v - min) / range) * 140;
  const toX = (i) => (i / (history.length - 1)) * 560;

  const bandTop = toY(expectedMax);
  const bandBottom = toY(expectedMin);
  const linePoints = history.map((v, i) => `${toX(i)},${toY(v)}`).join(' ');

  return (
    <svg viewBox="0 0 560 170" className="h-48 w-full">
      {/* Expected range band */}
      <rect x="0" y={bandTop} width="560" height={bandBottom - bandTop} className="fill-emerald-500/10" />
      <line x1="0" y1={bandTop} x2="560" y2={bandTop} strokeDasharray="4 4" className="stroke-emerald-500/50" strokeWidth="1" />
      <line x1="0" y1={bandBottom} x2="560" y2={bandBottom} strokeDasharray="4 4" className="stroke-emerald-500/50" strokeWidth="1" />

      {/* Reported reading line */}
      <polyline points={linePoints} fill="none" strokeWidth="2.5" className="stroke-red-500" />
      {history.map((v, i) => (
        <circle key={i} cx={toX(i)} cy={toY(v)} r="3" className="fill-red-500" />
      ))}
    </svg>
  );
}

export default function Analytics() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const isDark = theme === 'dark';
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(CHARTABLE[0]?.id);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const selected = useMemo(() => CHARTABLE.find((a) => a.id === selectedId) ?? CHARTABLE[0], [selectedId]);
  const inRange = selected.reportedValue >= selected.expectedMin && selected.reportedValue <= selected.expectedMax;

  return (
    <div className="min-h-screen bg-[#F7FAF8] font-[Inter,sans-serif] text-[#0F172A] transition-colors duration-300 dark:bg-[#071A15] dark:text-white">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="min-w-0 lg:ml-[250px]">
        <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-slate-200 bg-white/90 px-5 backdrop-blur-xl transition-colors duration-300 dark:border-white/10 dark:bg-[#071A15]/90 lg:px-8">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5 lg:hidden">
              <Menu size={21} />
            </button>
            <div>
              <h1 className="text-lg font-bold">Analytics</h1>
              <p className="hidden text-[10px] text-slate-400 dark:text-slate-500 sm:block">Sensor readings vs. electricity-derived expected ranges</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => dispatch(toggleTheme())} className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 dark:border-white/10 dark:bg-[#0B241D] dark:text-yellow-300 dark:hover:bg-white/5">
              {isDark ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0B6B50] text-xs font-bold text-white">VB</div>
          </div>
        </header>

        <main className="mx-auto max-w-[1600px] p-5 lg:p-8">
          <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Emission Trend Analysis</h2>
              <p className="mt-1 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
                The green band is the range CPCB emission factors predict for the plant's power draw — the red line
                is what the sensor actually reported.
              </p>
            </div>
            <select
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 dark:border-white/10 dark:bg-[#0B241D] dark:text-slate-300"
            >
              {CHARTABLE.map((a) => (
                <option key={a.id} value={a.id}>{a.plant} — {a.parameter}</option>
              ))}
            </select>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 transition-colors duration-300 dark:border-white/10 dark:bg-[#0B241D] lg:col-span-2">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400 dark:text-slate-500">{selected.plant} — {selected.parameter}</p>
                  <p className="text-lg font-bold">{selected.reportedValue} {selected.readingUnit} reported</p>
                </div>
                <span className={`rounded-full px-3 py-1.5 text-[10px] font-semibold ${inRange ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-300' : 'bg-red-50 text-red-600 dark:bg-red-400/10 dark:text-red-300'}`}>
                  {inRange ? 'Within expected range' : 'Outside expected range'}
                </span>
              </div>
              <OverlayChart history={selected.history} expectedMin={selected.expectedMin} expectedMax={selected.expectedMax} unit={selected.readingUnit} />
              <div className="mt-3 flex items-center gap-5 text-[10px] text-slate-400 dark:text-slate-500">
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-red-500" /> Sensor reading</span>
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-500/40" /> Electricity-expected range ({selected.expectedMin}–{selected.expectedMax} {selected.readingUnit})</span>
              </div>
            </div>

            <div className="space-y-5">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 transition-colors duration-300 dark:border-white/10 dark:bg-[#0B241D]">
                <div className="flex items-center gap-2 text-[10px] text-slate-400 dark:text-slate-500"><Gauge size={13} /> Trust Score</div>
                <p className="mt-2 text-2xl font-bold">{selected.trustScore}%</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5 transition-colors duration-300 dark:border-white/10 dark:bg-[#0B241D]">
                <div className="flex items-center gap-2 text-[10px] text-slate-400 dark:text-slate-500"><TrendingDown size={13} /> Electricity Draw</div>
                <p className="mt-2 text-2xl font-bold">{selected.electricityMWh} MWh</p>
              </div>
              <button
                onClick={() => navigate(`/investigation/${selected.id}`)}
                className="w-full rounded-xl bg-[#0B6B50] py-2.5 text-xs font-semibold text-white transition hover:bg-[#064E3B]"
              >
                Open Full Investigation →
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
