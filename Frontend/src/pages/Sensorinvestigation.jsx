

import {
  AlertCircle,
  ArrowLeft,
  Bell,
  CheckCircle2,
  CircleAlert,
  Gauge,
  LayoutDashboard,
  Leaf,
  LineChart,
  Menu,
  MessageSquareWarning,
  Radio,
  Send,
  Settings,
  ShieldCheck,
  Sun,
  Moon,
  Zap,
  X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toggleTheme } from '../features/Theme/Theme_slice';
import { getAlertById } from '../data/alerts';

// Same Sidebar as Alerts.jsx, just with no item marked active since this
// is a drill-down page rather than a primary nav destination.
function Sidebar({ open, setOpen }) {
  const navigate = useNavigate();
  const items = [
    { name: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Live Monitoring', icon: Radio, path: '/livemonitoring' },
    { name: 'Alerts', icon: Bell, badge: '12', path: '/alerts' },
    { name: 'Compliance', icon: ShieldCheck, path: '/compliance' },
    { name: 'Reports', icon: LineChart, path: '/reports' },
    { name: 'Analytics', icon: Gauge, path: '/analytics' },
    { name: 'Devices', icon: Radio, path: '/devices' },
  ];

  return (
    <>
      {open && <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setOpen(false)} />}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-[250px] flex-col bg-[#052E24] text-white transition-transform duration-300
        ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
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
          <button onClick={() => setOpen(false)} className="lg:hidden"><X size={20} /></button>
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
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/55 transition hover:bg-white/5 hover:text-white"
                >
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
              <span className="text-xs font-medium">Alert engine active</span>
            </div>
            <p className="mt-2 text-[10px] text-white/40">Monitoring 10,248 devices</p>
          </div>
        </div>
      </aside>
    </>
  );
}

function trustStyles(score) {
  if (score >= 75) return { ring: '#0B6B50', text: 'text-emerald-600 dark:text-emerald-300', bg: 'bg-emerald-50 dark:bg-emerald-400/10', label: 'Healthy' };
  if (score >= 45) return { ring: '#D97706', text: 'text-amber-600 dark:text-amber-300', bg: 'bg-amber-50 dark:bg-amber-400/10', label: 'Under Review' };
  return { ring: '#DC2626', text: 'text-red-600 dark:text-red-300', bg: 'bg-red-50 dark:bg-red-400/10', label: 'Critical' };
}

function TrustGauge({ score }) {
  const c = trustStyles(score);
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative h-36 w-36 shrink-0">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <circle cx="60" cy="60" r={radius} fill="none" strokeWidth="10" className="stroke-slate-100 dark:stroke-white/10" />
        <circle
          cx="60" cy="60" r={radius} fill="none" strokeWidth="10" strokeLinecap="round"
          stroke={c.ring} strokeDasharray={circumference} strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.6s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-3xl font-extrabold ${c.text}`}>{score}%</span>
        <span className="text-[10px] text-slate-400 dark:text-slate-500">Trust Score</span>
      </div>
    </div>
  );
}

function MiniTrendChart({ values }) {
  if (!values || values.length < 2) {
    return <p className="py-4 text-center text-xs text-slate-400 dark:text-slate-500">No trend data — sensor was offline.</p>;
  }
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const points = values.map((v, i) => `${(i / (values.length - 1)) * 280},${60 - ((v - min) / range) * 50}`).join(' ');

  return (
    <svg viewBox="0 0 280 60" className="h-16 w-full">
      <polyline points={points} fill="none" strokeWidth="2.5" className="stroke-[#0B6B50] dark:stroke-emerald-400" />
      {values.map((v, i) => {
        const x = (i / (values.length - 1)) * 280;
        const y = 60 - ((v - min) / range) * 50;
        return <circle key={i} cx={x} cy={y} r="2.5" className="fill-[#0B6B50] dark:fill-emerald-400" />;
      })}
    </svg>
  );
}

function Card({ children, className = '' }) {
  return (
    <div className={`rounded-2xl border border-slate-200 bg-white p-5 transition-colors duration-300 dark:border-white/10 dark:bg-[#0B241D] ${className}`}>
      {children}
    </div>
  );
}

export default function SensorInvestigation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const isDark = theme === 'dark';
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const alert = getAlertById(id);

  const [chatInput, setChatInput] = useState('');
  const [chatLog, setChatLog] = useState([]);

  useEffect(() => {
    // Seed one AI message specific to whichever alert is open.
    if (!alert) return;
    const hasElectricity = alert.expectedMin != null;
    const seed = hasElectricity
      ? `This sensor's trust score is ${alert.trustScore}% because the reported ${alert.parameter} (${alert.reportedValue} ${alert.readingUnit}) is being compared against the electricity-based expected range of ${alert.expectedMin}–${alert.expectedMax} ${alert.readingUnit}.`
      : `This alert was flagged purely on the configured threshold — ${alert.parameter} doesn't have an electricity cross-check, since it isn't a combustion-emission parameter.`;
    setChatLog([{ from: 'ai', text: seed }]);
    setChatInput('');
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!alert) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7FAF8] dark:bg-[#071A15] dark:text-white">
        <div className="text-center">
          <p className="text-sm font-semibold">Alert not found.</p>
          <button onClick={() => navigate('/alerts')} className="mt-3 text-xs font-semibold text-[#0B6B50] dark:text-emerald-300">
            ← Back to Alerts
          </button>
        </div>
      </div>
    );
  }

  const c = trustStyles(alert.trustScore);
  const hasElectricity = alert.expectedMin != null;

  const handleAsk = () => {
    if (!chatInput.trim()) return;
    setChatLog((log) => [
      ...log,
      { from: 'user', text: chatInput },
      {
        from: 'ai',
        text: hasElectricity
          ? `Given ${alert.electricityMWh} MWh of power draw, the expected ${alert.parameter} range is ${alert.expectedMin}–${alert.expectedMax} ${alert.readingUnit}. The sensor reported ${alert.reportedValue} ${alert.readingUnit}, which is why the trust score sits at ${alert.trustScore}%.`
          : `${alert.parameter} is evaluated against its configured limit (${alert.limit}) rather than an electricity cross-check. Current reading: ${alert.value}.`,
      },
    ]);
    setChatInput('');
  };

  return (
    <div className="min-h-screen bg-[#F7FAF8] font-[Inter,sans-serif] text-[#0F172A] transition-colors duration-300 dark:bg-[#071A15] dark:text-white">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="min-w-0 lg:ml-[250px]">
        <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-slate-200 bg-white/90 px-5 backdrop-blur-xl transition-colors duration-300 dark:border-white/10 dark:bg-[#071A15]/90 lg:px-8">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5 lg:hidden">
              <Menu size={21} />
            </button>
            <button onClick={() => navigate('/alerts')} className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-[#0B6B50] dark:text-slate-400 dark:hover:text-emerald-300">
              <ArrowLeft size={16} />
              Back to Alerts
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => dispatch(toggleTheme())}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 dark:border-white/10 dark:bg-[#0B241D] dark:text-yellow-300 dark:hover:bg-white/5"
            >
              {isDark ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0B6B50] text-xs font-bold text-white">VB</div>
          </div>
        </header>

        <main className="mx-auto max-w-[1400px] p-5 lg:p-8">
          {/* Page header */}
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="font-mono text-[11px] text-slate-400 dark:text-slate-500">{alert.id}</p>
              <h1 className="text-2xl font-bold">{alert.title}</h1>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{alert.plant} · {alert.unit} — {alert.location}</p>
            </div>
            <span className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${c.bg} ${c.text}`}>
              <CircleAlert size={14} />
              {c.label}
            </span>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {/* Left column */}
            <div className="space-y-5 lg:col-span-2">
              <Card>
                <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
                  <TrustGauge score={alert.trustScore} />
                  <div className="grid w-full flex-1 gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-slate-200 p-4 dark:border-white/10">
                      <div className="mb-1 flex items-center gap-2 text-[10px] text-slate-400 dark:text-slate-500">
                        <Radio size={13} /> Sensor Reading
                      </div>
                      <p className="text-2xl font-bold text-red-500">{alert.value}</p>
                      <p className="mt-1 text-[10px] text-slate-400 dark:text-slate-500">Configured limit: {alert.limit}</p>
                    </div>

                    {hasElectricity ? (
                      <div className="rounded-xl border border-slate-200 p-4 dark:border-white/10">
                        <div className="mb-1 flex items-center gap-2 text-[10px] text-slate-400 dark:text-slate-500">
                          <Zap size={13} /> Expected (from {alert.electricityMWh} MWh)
                        </div>
                        <p className="text-2xl font-bold text-[#0B6B50] dark:text-emerald-300">
                          {alert.expectedMin}–{alert.expectedMax} <span className="text-sm font-normal text-slate-400">{alert.readingUnit}</span>
                        </p>
                        <p className="mt-1 text-[10px] text-slate-400 dark:text-slate-500">Electricity-based cross-check</p>
                      </div>
                    ) : (
                      <div className="rounded-xl border border-dashed border-slate-200 p-4 text-xs text-slate-400 dark:border-white/10 dark:text-slate-500">
                        No electricity cross-check available — {alert.parameter} is evaluated on threshold alone.
                      </div>
                    )}
                  </div>
                </div>
              </Card>

              <Card>
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-bold">Reading Trend</h3>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500">Last 8 cycles</span>
                </div>
                <MiniTrendChart values={alert.history} />
              </Card>

              <Card>
                <h3 className="mb-4 text-sm font-bold">Anomaly Detection Log</h3>
                <div className="space-y-3">
                  {alert.anomalyLog.map((a, i) => (
                    <div key={i} className="flex gap-3 text-xs">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                      <div>
                        <span className="block text-[10px] text-slate-400 dark:text-slate-500">{a.time}</span>
                        <span className="text-slate-600 dark:text-slate-300">{a.text}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Right column */}
            <div className="space-y-5">
              <Card className="flex h-[420px] flex-col">
                <h3 className="mb-3 text-sm font-bold">AI Investigation Assistant</h3>
                <div className="flex-1 space-y-3 overflow-y-auto pr-1">
                  {chatLog.map((m, i) => (
                    <div
                      key={i}
                      className={`max-w-[90%] rounded-xl px-3 py-2 text-xs leading-5 ${
                        m.from === 'ai'
                          ? 'bg-emerald-50 text-slate-700 dark:bg-emerald-400/10 dark:text-slate-200'
                          : 'ml-auto bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-200'
                      }`}
                    >
                      {m.text}
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex items-center gap-2 border-t border-slate-200 pt-3 dark:border-white/10">
                  <input
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
                    placeholder="Ask why this alert was flagged…"
                    className="flex-1 rounded-lg bg-slate-100 px-3 py-2 text-xs outline-none placeholder:text-slate-400 dark:bg-white/10 dark:text-white dark:placeholder:text-slate-500"
                  />
                  <button onClick={handleAsk} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#0B6B50] text-white transition hover:bg-[#064E3B]">
                    <Send size={15} />
                  </button>
                </div>
              </Card>

              <Card>
                <h3 className="mb-2 text-sm font-bold">Take Action</h3>
                <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
                  Notify {alert.plant} to explain the discrepancy or schedule a physical inspection.
                </p>
                <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 py-2.5 text-xs font-semibold text-white transition hover:bg-red-600">
                  <MessageSquareWarning size={15} />
                  Send Compliance Notice
                </button>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
