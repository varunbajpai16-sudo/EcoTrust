import {
  Bell,
  Gauge,
  LayoutDashboard,
  Leaf,
  LineChart as LineChartIcon,
  Menu,
  Moon,
  Radio,
  RefreshCw,
  Settings,
  ShieldCheck,
  Sparkles,
  Sun,
  TrendingDown,
  X,
  Zap,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toggleTheme } from '../features/Theme/Theme_slice';
import { getLiveDashboard, getFactoryHistory } from '../services/api.js';

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
              <span className="text-xs font-medium">Analytics Engine Active</span>
            </div>
            <p className="mt-2 text-[10px] text-white/40">Electricity Cross-Check Active</p>
          </div>
        </div>
      </aside>
    </>
  );
}

/* =========================================================
   DYNAMIC OVERLAY CHART (Power Corridor vs Reported Reading)
========================================================= */
function OverlayChart({ history = [], expectedMin = 20, expectedMax = 50, unit = 'ppb' }) {
  const safeHistory = history.length > 0 ? history : [expectedMin, (expectedMin + expectedMax) / 2, expectedMax];
  const allValues = [...safeHistory, expectedMin, expectedMax];
  const max = Math.max(...allValues, expectedMax + 10) * 1.1;
  const min = Math.max(0, Math.min(...allValues, expectedMin - 5) * 0.9);
  const range = max - min || 1;

  const toY = (v) => 160 - ((v - min) / range) * 140;
  const toX = (i) => (i / Math.max(safeHistory.length - 1, 1)) * 560;

  const bandTop = Math.max(10, toY(expectedMax));
  const bandBottom = Math.min(160, toY(expectedMin));
  const bandHeight = Math.max(4, bandBottom - bandTop);

  const linePoints = safeHistory.map((v, i) => `${toX(i)},${toY(v)}`).join(' ');

  return (
    <svg viewBox="0 0 560 170" className="h-52 w-full overflow-visible">
      {/* Expected Range Band (CPCB Power Correlation Corridor) */}
      <rect x="0" y={bandTop} width="560" height={bandHeight} rx="4" className="fill-emerald-500/15 dark:fill-emerald-400/20" />
      <line x1="0" y1={bandTop} x2="560" y2={bandTop} strokeDasharray="4 4" className="stroke-emerald-500/60" strokeWidth="1.5" />
      <line x1="0" y1={bandBottom} x2="560" y2={bandBottom} strokeDasharray="4 4" className="stroke-emerald-500/60" strokeWidth="1.5" />

      {/* Grid Lines */}
      {[30, 80, 130].map((y) => (
        <line key={y} x1="0" y1={y} x2="560" y2={y} strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-white/10" />
      ))}

      {/* Actual Sensor Reading Polyline */}
      <polyline points={linePoints} fill="none" strokeWidth="3" className="stroke-red-500" />
      {safeHistory.map((v, i) => (
        <circle key={i} cx={toX(i)} cy={toY(v)} r="3.5" className="fill-red-500 stroke-white stroke-2" />
      ))}
    </svg>
  );
}

/* =========================================================
   MAIN ANALYTICS COMPONENT
========================================================= */
export default function Analytics() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const isDark = theme === 'dark';

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [factories, setFactories] = useState([]);
  const [selectedFactoryId, setSelectedFactoryId] = useState('');
  const [selectedPollutant, setSelectedPollutant] = useState('so2');
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Live Dashboard Data
  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getLiveDashboard();
      if (data && data.length > 0) {
        setFactories(data);
        if (!selectedFactoryId) setSelectedFactoryId(data[0].factoryId);
      }
    } catch (err) {
      console.error('Failed to fetch analytics data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const selectedFactory = useMemo(() => {
    return factories.find((f) => f.factoryId === selectedFactoryId) || factories[0] || null;
  }, [factories, selectedFactoryId]);

  // Fetch Historical Samples for Selected Factory
  useEffect(() => {
    if (selectedFactory?.factoryId) {
      getFactoryHistory(selectedFactory.factoryId, 15).then((res) => {
        setHistoryData(res || []);
      });
    }
  }, [selectedFactory?.factoryId]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  // Dynamic Expected Range Calculation (Based on Factory Power Consumption)
  const correlationAnalysis = useMemo(() => {
    if (!selectedFactory) return null;

    const power = selectedFactory.rawReading?.electricityConsumption || 100;
    const pollutants = selectedFactory.rawReading?.pollutants || {};

    let reportedValue = pollutants[selectedPollutant] ?? 0;
    let unit = selectedPollutant === 'co' ? 'ppm' : 'ppb';
    if (selectedPollutant === 'pm25' || selectedPollutant === 'pm10') unit = 'µg/m³';

    // Stoichiometric Combustion Factor calculation
    let expectedMin = 15;
    let expectedMax = 45;

    if (selectedPollutant === 'so2') {
      expectedMin = Math.max(5, Math.round(power * 0.04));
      expectedMax = Math.round(power * 0.08 + 15);
    } else if (selectedPollutant === 'nox') {
      expectedMin = Math.max(8, Math.round(power * 0.05));
      expectedMax = Math.round(power * 0.10 + 20);
    } else if (selectedPollutant === 'pm25') {
      expectedMin = Math.max(10, Math.round(power * 0.03));
      expectedMax = Math.round(power * 0.06 + 15);
    } else if (selectedPollutant === 'co') {
      expectedMin = 0.5;
      expectedMax = Math.round((power * 0.005 + 1.5) * 10) / 10;
    }

    // Historical values series
    const historySeries = historyData
      .slice(0, 10)
      .reverse()
      .map((item) => Number(item.rawReading?.pollutants?.[selectedPollutant]) || reportedValue);

    if (historySeries.length === 0) historySeries.push(reportedValue);

    const inRange = reportedValue >= expectedMin && reportedValue <= expectedMax;

    return {
      reportedValue,
      unit,
      expectedMin,
      expectedMax,
      inRange,
      power,
      historySeries,
    };
  }, [selectedFactory, selectedPollutant, historyData]);

  if (!selectedFactory || !correlationAnalysis) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F7FAF8] dark:bg-[#071A15]">
        <RefreshCw className="animate-spin text-emerald-500" size={28} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7FAF8] font-[Inter,sans-serif] text-[#0F172A] transition-colors duration-300 dark:bg-[#071A15] dark:text-white">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="min-w-0 lg:ml-[250px]">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-slate-200 bg-white/90 px-5 backdrop-blur-xl transition-colors duration-300 dark:border-white/10 dark:bg-[#071A15]/90 lg:px-8">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5 lg:hidden">
              <Menu size={21} />
            </button>
            <div>
              <h1 className="text-lg font-bold">Electricity vs. Emission Analytics</h1>
              <p className="hidden text-[10px] text-slate-400 dark:text-slate-500 sm:block">
                Continuous physical cross-correlation to detect scrubber bypass and tampering
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
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
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 dark:border-white/10 dark:bg-[#0B241D] dark:text-yellow-300 dark:hover:bg-white/5"
            >
              {isDark ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            <div className="flex items-center gap-2">
              <div onClick={() => navigate('/profile')} className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#0B6B50] text-xs font-bold text-white">
                ET
              </div>
            </div>
          </div>
        </header>

        {/* Main Body */}
        <main className="mx-auto max-w-[1600px] p-5 lg:p-8">
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-bold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                  <Zap size={11} />
                  LAYER 2 PHYSICAL CROSS-CHECK
                </span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight">Stoichiometric Correlation Engine</h2>
              <p className="mt-1 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
                The <span className="text-emerald-600 font-semibold">green corridor</span> represents the theoretical emission level expected from plant power load. The <span className="text-red-500 font-semibold">red line</span> is the reported CEMS telemetry.
              </p>
            </div>

            {/* Selectors */}
            <div className="flex flex-wrap gap-2">
              <select
                value={selectedFactoryId}
                onChange={(e) => setSelectedFactoryId(e.target.value)}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 outline-none focus:border-[#0B6B50] dark:border-white/10 dark:bg-[#0B241D] dark:text-white"
              >
                {factories.map((f) => (
                  <option key={f.factoryId} value={f.factoryId}>
                    {f.factoryName} (ID: {f.factoryId})
                  </option>
                ))}
              </select>

              <select
                value={selectedPollutant}
                onChange={(e) => setSelectedPollutant(e.target.value)}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 outline-none focus:border-[#0B6B50] dark:border-white/10 dark:bg-[#0B241D] dark:text-white"
              >
                <option value="so2">SO₂ (Sulfur Dioxide)</option>
                <option value="nox">NOx (Nitrogen Oxides)</option>
                <option value="pm25">PM2.5 (Particulate Matter)</option>
                <option value="co">CO (Carbon Monoxide)</option>
              </select>
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {/* Main Correlation Overlay Graph */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 transition-colors duration-300 dark:border-white/10 dark:bg-[#0B241D] lg:col-span-2">
              <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    {selectedFactory.factoryName} · Parameter: {selectedPollutant.toUpperCase()}
                  </p>
                  <p className="text-xl font-bold mt-1">
                    {correlationAnalysis.reportedValue} {correlationAnalysis.unit} reported
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-[10px] font-semibold ${
                    correlationAnalysis.inRange
                      ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-300'
                      : 'bg-red-50 text-red-600 dark:bg-red-400/10 dark:text-red-300'
                  }`}
                >
                  {correlationAnalysis.inRange ? '✓ Conforms to Power Load' : '⚠️ Physical Discrepancy Flagged'}
                </span>
              </div>

              <OverlayChart
                history={correlationAnalysis.historySeries}
                expectedMin={correlationAnalysis.expectedMin}
                expectedMax={correlationAnalysis.expectedMax}
                unit={correlationAnalysis.unit}
              />

              <div className="mt-4 flex flex-wrap items-center gap-5 text-[10px] text-slate-400 dark:text-slate-500 border-t border-slate-100 pt-3 dark:border-white/10">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-red-500" /> CEMS Reported Sensor Telemetry
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" /> Electricity Expected Range ({correlationAnalysis.expectedMin}–{correlationAnalysis.expectedMax} {correlationAnalysis.unit})
                </span>
              </div>
            </div>

            {/* Right Meta Cards */}
            <div className="space-y-5">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 transition-colors duration-300 dark:border-white/10 dark:bg-[#0B241D]">
                <div className="flex items-center gap-2 text-[10px] text-slate-400 dark:text-slate-500">
                  <Gauge size={13} /> Trust Score Rating
                </div>
                <p className="mt-2 text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  {selectedFactory.trustScore}/100
                </p>
                <p className="text-[10px] text-slate-400 mt-1">Audit Verdict: {selectedFactory.verdict}</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 transition-colors duration-300 dark:border-white/10 dark:bg-[#0B241D]">
                <div className="flex items-center gap-2 text-[10px] text-slate-400 dark:text-slate-500">
                  <Zap size={13} className="text-amber-500" /> Active Electricity Draw
                </div>
                <p className="mt-2 text-2xl font-bold">{correlationAnalysis.power} kW</p>
                <p className="text-[10px] text-slate-400 mt-1">Plant Production Load</p>
              </div>

              {/* AI Auditor Explanation */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 transition-colors duration-300 dark:border-white/10 dark:bg-[#0B241D]">
                <div className="flex items-center gap-2 text-[10px] text-slate-400 dark:text-slate-500">
                  <Sparkles size={13} className="text-emerald-500" /> Groq AI Reasoning
                </div>
                <p className="mt-2 text-xs leading-relaxed italic text-slate-600 dark:text-white/70">
                  "{selectedFactory.aiSummary || 'Emissions correlate physically with monitored power load.'}"
                </p>
              </div>

              <button
                onClick={() => navigate(`/livemonitoring`)}
                className="w-full rounded-xl bg-[#0B6B50] py-3 text-xs font-semibold text-white transition hover:bg-[#064E3B]"
              >
                Inspect Live Stream →
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}