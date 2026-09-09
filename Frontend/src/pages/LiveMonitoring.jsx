


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
  RefreshCw,
  Settings,
  ShieldCheck,
  Sun,
  Thermometer,
  Wind,
  X,
  Sparkles,
  Zap,
} from 'lucide-react';
import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toggleTheme } from '../features/Theme/Theme_slice';
import { getLiveDashboard, getFactoryHistory } from '../services/api.js';

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

// CPCB Environmental Standard Threshold Limits
const PARAMETER_CONFIG = {
  pm25: { name: 'PM2.5', unit: 'µg/m³', limit: 60, icon: Wind },
  pm10: { name: 'PM10', unit: 'µg/m³', limit: 100, icon: Wind },
  so2: { name: 'SO₂', unit: 'ppb', limit: 80, icon: Cloud },
  nox: { name: 'NOx', unit: 'ppb', limit: 100, icon: Cloud },
  co: { name: 'CO', unit: 'ppm', limit: 10, icon: Cloud },
  temperature: { name: 'Temperature', unit: '°C', limit: 50, icon: Thermometer },
};

/* =========================================================
   SIDEBAR
========================================================= */
function Sidebar({ open, setOpen }) {
  const navigate = useNavigate();

  const items = [
    { name: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Live Monitoring', icon: Radio, path: '/livemonitoring', active: true },
    { name: 'Alerts', icon: Bell, path: '/alerts' },
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
            className="flex w-full items-center gap-3 rounded-xl bg-white/5 px-3 py-3 text-sm text-white hover:text-emerald-300"
          >
            <Settings size={18} />
            Settings
          </button>
        </div>

        <div className="shrink-0 border-t border-white/10 p-4">
          <div className="rounded-xl bg-white/5 p-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              <span className="text-xs font-medium">Monitoring Active</span>
            </div>
            <p className="mt-2 text-[10px] text-white/40">Live CEMS Telemetry Engine</p>
          </div>
        </div>
      </aside>
    </>
  );
}

/* =========================================================
   PARAMETER CARD
========================================================= */
function ParameterCard({ parameter }) {
  const Icon = parameter.icon || Wind;
  const isHigh = parameter.status === 'High' || parameter.status === 'Critical';
  const isNearLimit = parameter.status === 'Near Limit' || parameter.status === 'Warning';

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.03)] transition hover:border-emerald-200 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.03] dark:shadow-none dark:hover:border-emerald-500/30">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-xl ${isHigh
              ? 'bg-red-50 text-red-500 dark:bg-red-500/10 dark:text-red-400'
              : isNearLimit
                ? 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400'
                : 'bg-emerald-50 text-[#0B6B50] dark:bg-emerald-500/10 dark:text-emerald-400'
              }`}
          >
            <Icon size={18} />
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-700 dark:text-white/80">{parameter.name}</p>
            <p className="text-[10px] text-slate-400 dark:text-white/35">Real-time sensor telemetry</p>
          </div>
        </div>

        <span
          className={`flex items-center gap-1.5 rounded-full px-2 py-1 text-[9px] font-semibold ${isHigh
            ? 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400'
            : isNearLimit
              ? 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400'
              : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400'
            }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              isHigh ? 'bg-red-500' : isNearLimit ? 'bg-amber-500' : 'bg-emerald-500'
            }`}
          />
          {parameter.status}
        </span>
      </div>

      <div className="mt-6 flex items-end gap-2">
        <span className="font-mono text-3xl font-semibold tracking-tight text-[#0F172A] dark:text-white">
          {parameter.value ?? 'N/A'}
        </span>
        <span className="mb-1.5 font-mono text-[10px] text-slate-400 dark:text-white/30">
          {parameter.unit}
        </span>
      </div>

      <div className="mt-5">
        <div className="mb-2 flex justify-between text-[9px]">
          <span className="text-slate-400 dark:text-white/35">Current level</span>
          <span className="font-medium text-slate-500 dark:text-white/45">
            Limit: {parameter.limit} {parameter.unit}
          </span>
        </div>

        <div className="h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isHigh ? 'bg-red-500' : isNearLimit ? 'bg-amber-500' : 'bg-[#10B981]'
            }`}
            style={{
              width: `${Math.min(((Number(parameter.value) || 0) / Number(parameter.limit)) * 100, 100)}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   DYNAMIC LIVE CHART (Plots Real History Data)
========================================================= */
function DynamicLiveChart({ historyData = [], pollutantKey = 'pm25' }) {
  // The history endpoint can return an array directly or wrap it in data/readings/history.
  // Support both the backend history shape and the flattened shape so the chart always
  // plots the actual historical telemetry points.
  const points = useMemo(() => {
    const rawHistory = Array.isArray(historyData)
      ? historyData
      : historyData?.data || historyData?.readings || historyData?.history || [];

    if (!Array.isArray(rawHistory) || rawHistory.length === 0) {
      return [];
    }

    const getValue = (item) => {
      const reading =
        item?.rawReading ||
        item?.reading ||
        item?.latestReading ||
        item ||
        {};

      const value =
        pollutantKey === 'temperature'
          ? reading?.temperature ?? item?.temperature
          : reading?.pollutants?.[pollutantKey] ??
            item?.pollutants?.[pollutantKey] ??
            reading?.[pollutantKey] ??
            item?.[pollutantKey];

      const numericValue = Number(value);
      return Number.isFinite(numericValue) ? numericValue : null;
    };

    const getTimestamp = (item) => {
      const reading = item?.rawReading || item?.reading || item?.latestReading || item || {};
      return reading?.timestamp || reading?.readingTimestamp || reading?.createdAt || item?.timestamp || item?.createdAt;
    };

    const values = rawHistory
      .map((item) => ({
        value: getValue(item),
        timestamp: getTimestamp(item),
      }))
      .filter((item) => item.value !== null)
      .sort((a, b) => {
        const ta = a.timestamp ? new Date(a.timestamp).getTime() : 0;
        const tb = b.timestamp ? new Date(b.timestamp).getTime() : 0;
        return ta - tb;
      })
      .slice(-20);

    if (values.length === 0) return [];

    const numericValues = values.map((item) => item.value);
    const dataMin = Math.min(...numericValues);
    const dataMax = Math.max(...numericValues);
    const dataRange = dataMax - dataMin;

    // Add a small visual padding around the real range. This keeps small but real
    // telemetry changes visible instead of making the line look flat.
    const padding = dataRange === 0 ? Math.max(dataMax * 0.08, 1) : dataRange * 0.12;
    const minVal = Math.max(0, dataMin - padding);
    const maxVal = dataMax + padding;
    const range = maxVal - minVal || 1;

    return values.map((item, idx) => {
      const x = values.length === 1 ? 450 : (idx / (values.length - 1)) * 900;
      const normalized = (item.value - minVal) / range;
      const y = 260 - normalized * 200;
      return { x, y, val: item.value, timestamp: item.timestamp };
    });
  }, [historyData, pollutantKey]);

  // Use a smooth SVG curve instead of straight segments so the telemetry looks
  // like a real continuous sensor trend while still following the actual points.
  const pathData = useMemo(() => {
    if (points.length === 0) return '';
    if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i += 1) {
      const prev = points[i - 1];
      const curr = points[i];
      const midX = (prev.x + curr.x) / 2;
      path += ` Q ${midX} ${prev.y}, ${midX} ${(prev.y + curr.y) / 2}`;
      path += ` T ${curr.x} ${curr.y}`;
    }
    return path;
  }, [points]);

  const fillData = useMemo(() => {
    if (points.length < 2 || !pathData) return '';
    const last = points[points.length - 1];
    return `${pathData} L ${last.x} 300 L 0 300 Z`;
  }, [pathData, points]);

  const latestPoint = points[points.length - 1];

  return (
    <div className="relative h-[300px] w-full">
      <svg viewBox="0 0 900 300" preserveAspectRatio="none" className="h-full w-full">
        <defs>
          <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {[40, 90, 140, 190, 240].map((y) => (
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

        {fillData && <path d={fillData} fill="url(#chartFill)" />}
        {pathData && points.length > 1 && (
          <path d={pathData} fill="none" stroke="#0B6B50" strokeWidth="3.5" strokeLinecap="round" />
        )}

        {/* Show actual historical points to make the up/down movement clear. */}
        {points.map((point, idx) => (
          <circle
            key={`${point.timestamp || idx}-${point.val}`}
            cx={point.x}
            cy={point.y}
            r={idx === points.length - 1 ? 5 : 2.5}
            fill="#0B6B50"
            opacity={idx === points.length - 1 ? 1 : 0.7}
          />
        ))}

        {latestPoint && (
          <circle cx={latestPoint.x} cy={latestPoint.y} r="12" fill="#0B6B50" opacity="0.15" />
        )}
      </svg>

      <div className="absolute bottom-0 left-0 flex w-full justify-between text-[9px] text-slate-400 dark:text-white/30">
        <span>History Start</span>
        <span>Telemetry Trend</span>
        <span>Now (Latest Audit)</span>
      </div>
    </div>
  );
}

/* =========================================================
   DYNAMIC FACILITY SELECTOR
========================================================= */
function PlantSelector({ factories = [], selectedPlant, onSelect }) {
  if (factories.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6 text-center text-xs text-slate-400 dark:border-white/10 dark:bg-white/5">
        Connecting to live CEMS factories...
      </div>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {factories.map((factory) => {
        const isSelected = selectedPlant?.factoryId === factory.factoryId;
        const isTampered = factory.verdict === 'TAMPERED' || factory.verdict === 'FAULTY_SENSOR';
        const isSuspicious = factory.verdict === 'SUSPICIOUS';

        return (
          <button
            key={factory._id || factory.factoryId}
            onClick={() => onSelect(factory)}
            className={`rounded-xl border p-4 text-left transition ${
              isSelected
                ? 'border-emerald-300 bg-emerald-50/60 shadow-sm dark:border-emerald-500/30 dark:bg-emerald-500/10'
                : 'border-slate-200 bg-white hover:border-emerald-200 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-emerald-500/30'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    isSelected
                      ? 'bg-[#0B6B50] text-white'
                      : 'bg-emerald-50 text-[#0B6B50] dark:bg-emerald-500/10 dark:text-emerald-400'
                  }`}
                >
                  <Factory size={16} />
                </div>

                <div>
                  <p className="text-xs font-semibold text-slate-700 dark:text-white/80">{factory.factoryName}</p>
                  <p className="mt-0.5 flex items-center gap-1 text-[9px] text-slate-400 dark:text-white/35">
                    <MapPin size={9} /> ID: {factory.factoryId}
                  </p>
                </div>
              </div>

              <span
                className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${
                  isTampered
                    ? 'bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400'
                    : isSuspicious
                    ? 'bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400'
                    : 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400'
                }`}
              >
                ● {factory.verdict}
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between text-[9px] text-slate-400 dark:text-white/35">
              <span>Trust: {factory.trustScore}/100</span>
              <span className="font-semibold text-[#0B6B50] dark:text-emerald-400">
                {isSelected ? 'Active Selection' : 'Inspect Live →'}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
/*=========================================================
ENVIRONMENT HEALTH SCORE
=========================================================*/
/* =========================================================
   FACTORY DATA BAR CHART
========================================================= */
function FactoryBarChart({ factories = [] }) {
  const [metric, setMetric] = useState('trustScore');

  const metricConfig = {
    trustScore: { label: 'Trust Score', unit: '', max: 100 },
    pm25: { label: 'PM2.5', unit: 'µg/m³' },
    pm10: { label: 'PM10', unit: 'µg/m³' },
    so2: { label: 'SO₂', unit: 'ppb' },
    nox: { label: 'NOx', unit: 'ppb' },
    co: { label: 'CO', unit: 'ppm' },
    temperature: { label: 'Temperature', unit: '°C' },
  };

  const config = metricConfig[metric];

  const chartData = useMemo(() => {
    return factories
      .map((factory) => {
        const value =
          metric === 'trustScore'
            ? Number(factory.trustScore)
            : metric === 'temperature'
              ? Number(factory.rawReading?.temperature)
              : Number(factory.rawReading?.pollutants?.[metric]);

        return {
          name: factory.factoryName || factory.factoryId || 'Factory',
          value: Number.isFinite(value) ? value : 0,
          verdict: factory.verdict,
        };
      })
      .filter((item) => item.value >= 0);
  }, [factories, metric]);

  const maxValue =
    config.max ??
    Math.max(...chartData.map((item) => item.value), 1);

  return (
    <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.03)] dark:border-white/10 dark:bg-white/[0.03] dark:shadow-none">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold dark:text-white">
              Factory Data Comparison
            </h3>
            <span className="rounded-full bg-blue-50 px-2 py-1 text-[8px] font-bold text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
              LIVE DATA
            </span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400 dark:text-white/35">
            Compare live values across all connected factories
          </p>
        </div>

        <select
          value={metric}
          onChange={(e) => setMetric(e.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600 outline-none dark:border-white/10 dark:bg-white/5 dark:text-white/70"
        >
          {Object.entries(metricConfig).map(([key, item]) => (
            <option key={key} value={key}>
              {item.label}
              {item.unit ? ` (${item.unit})` : ''}
            </option>
          ))}
        </select>
      </div>

      {chartData.length === 0 ? (
        <div className="flex h-[260px] items-center justify-center text-xs text-slate-400">
          No factory data available for the chart.
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {chartData.map((item) => {
            const percentage = Math.min(
              (item.value / maxValue) * 100,
              100
            );

            const barColor =
              item.verdict === 'TAMPERED' ||
              item.verdict === 'FAULTY_SENSOR'
                ? 'bg-red-500'
                : item.verdict === 'SUSPICIOUS'
                  ? 'bg-amber-400'
                  : 'bg-emerald-500';

            return (
              <div key={item.name}>
                <div className="mb-1.5 flex items-center justify-between gap-3">
                  <span className="truncate text-xs font-semibold text-slate-700 dark:text-white/75">
                    {item.name}
                  </span>
                  <span className="shrink-0 font-mono text-xs font-semibold text-slate-700 dark:text-white">
                    {item.value.toFixed(1)}
                    {config.unit ? ` ${config.unit}` : ''}
                  </span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${barColor}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

function EnvironmentalHealthScore({ plant }) {
  const score =
    plant.status === 'Online'
      ? 94
      : plant.status === 'Warning'
        ? 71
        : 45;

  const scoreColor =
    score >= 85
      ? 'text-emerald-500'
      : score >= 60
        ? 'text-amber-500'
        : 'text-red-500';

  return (
    <section className="mb-5 grid gap-4 md:grid-cols-3">

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">

        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Environmental Health
            </p>

            <p className="mt-1 text-xs text-slate-500 dark:text-white/40">
              Overall facility score
            </p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10">
            <Leaf size={18} />
          </div>
        </div>

        <div className="mt-5 flex items-end gap-2">
          <span className={`text-4xl font-bold ${scoreColor}`}>
            {score}
          </span>

          <span className="mb-1 text-xs text-slate-400">
            / 100
          </span>
        </div>

        <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all duration-700"
            style={{ width: `${score}%` }}
          />
        </div>

        <p className="mt-3 text-[10px] text-slate-400">
          Based on air quality, emissions & sensor health
        </p>

      </div>


      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">

        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          Active Sensors
        </p>

        <div className="mt-4 flex items-center gap-4">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10">
            <Radio size={20} />
          </div>

          <div>
            <p className="text-2xl font-bold dark:text-white">
              {plant.devices}
            </p>

            <p className="text-[10px] text-emerald-600">
              Sensors connected
            </p>
          </div>

        </div>

      </div>


      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">

        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          Data Quality
        </p>

        <div className="mt-4 flex items-center gap-4">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-500/10">
            <Gauge size={20} />
          </div>

          <div>
            <p className="text-2xl font-bold dark:text-white">
              {plant.dataQuality}
            </p>

            <p className="text-[10px] text-slate-400">
              Stream reliability
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}
function SmartAlert({ plant }) {
  const highParameters = plant.parameters.filter(
    (parameter) => parameter.status === 'High'
  );

  if (highParameters.length === 0) {
    return (
      <div className="mb-5 flex items-center gap-4 rounded-2xl border border-emerald-100 bg-emerald-50 p-4 dark:border-emerald-500/20 dark:bg-emerald-500/10">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
          <ShieldCheck size={19} />
        </div>

        <div>
          <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
            Environment looks healthy
          </p>

          <p className="mt-1 text-[10px] text-emerald-600/70">
            No environmental parameters are currently above configured limits.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-5 flex items-center gap-4 rounded-2xl border border-red-200 bg-red-50 p-4 dark:border-red-500/20 dark:bg-red-500/10">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400">
        <CircleAlert size={20} />
      </div>

      <div className="flex-1">
        <p className="text-xs font-bold text-red-700 dark:text-red-300">
          Environmental Alert Detected
        </p>

        <p className="mt-1 text-[10px] text-red-600/70 dark:text-red-300/50">
          {highParameters.length} parameter
          {highParameters.length > 1 ? 's are' : ' is'} above the
          configured environmental limit.
        </p>
      </div>

      <span className="rounded-full bg-red-100 px-3 py-1 text-[9px] font-bold text-red-600 dark:bg-red-500/10 dark:text-red-400">
        ACTION REQUIRED
      </span>
    </div>
  );
}

/* =========================================================
   PAGE LOADER
========================================================= */
function PageLoader() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#F7FAF8]/95 backdrop-blur-sm dark:bg-[#071A15]/95">
      <div className="flex flex-col items-center gap-4">
        <div className="relative flex h-16 w-16 items-center justify-center">
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-emerald-100 border-t-[#0B6B50] dark:border-white/10 dark:border-t-emerald-400" />
          <Leaf
            size={24}
            className="text-[#0B6B50] dark:text-emerald-400"
          />
        </div>

        <div className="text-center">
          <p className="text-sm font-semibold text-slate-700 dark:text-white">
            Loading Live Monitoring
          </p>
          <p className="mt-1 text-[10px] text-slate-400 dark:text-white/40">
            Fetching real-time CEMS telemetry...
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MAIN LIVE MONITORING COMPONENT
========================================================= */
export default function LiveMonitoring() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const theme = useSelector((state) => state.theme.theme);
  const isDark = theme === 'dark';

  // Live States
  const [factories, setFactories] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [historyData, setHistoryData] = useState([]);
  const [selectedPollutant, setSelectedPollutant] = useState('pm25');
  const [loading, setLoading] = useState(true);
  const [lastSync, setLastSync] = useState(new Date());

  // Fetch Live Data
  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getLiveDashboard();
      if (data && data.length > 0) {
        setFactories(data);
        // Default select first plant if not selected yet
        if (!selectedPlant) {
          setSelectedPlant(data[0]);
        } else {
          // Update currently selected plant with fresh telemetry
          const updated = data.find((f) => f.factoryId === selectedPlant.factoryId);
          if (updated) setSelectedPlant(updated);
        }
      }
      setLastSync(new Date());
    } catch (err) {
      console.error('Failed to fetch live monitoring data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch History for Selected Plant
  useEffect(() => {
    if (selectedPlant?.factoryId) {
      getFactoryHistory(selectedPlant.factoryId, 20).then((res) => {
        setHistoryData(res || []);
      });
    }
  }, [selectedPlant?.factoryId]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 15000); // 15 sec auto-polling
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

  // Transform current plant pollutants into Parameter List
  const parameters = useMemo(() => {
    if (!selectedPlant) return [];
    const pol = selectedPlant.rawReading?.pollutants || {};
    const temp = selectedPlant.rawReading?.temperature;

    const list = [
      { key: 'pm25', val: pol.pm25 },
      { key: 'pm10', val: pol.pm10 },
      { key: 'so2', val: pol.so2 },
      { key: 'nox', val: pol.nox },
      { key: 'co', val: pol.co },
      { key: 'temperature', val: temp },
    ];

    return list.map(({ key, val }) => {
      const config = PARAMETER_CONFIG[key];
      const numVal = val != null ? Number(val) : null;
      let status = 'Good';

      if (numVal != null) {
        if (numVal > config.limit) status = 'Critical';
        else if (numVal > config.limit * 0.75) status = 'Warning';
      }

      return {
        key,
        name: config.name,
        value: numVal != null ? numVal : 'N/A',
        unit: config.unit,
        limit: config.limit,
        status,
        icon: config.icon,
      };
    });
  }, [selectedPlant]);

  const currentPollutantValue = useMemo(() => {
    const p = parameters.find((param) => param.key === selectedPollutant);
    return p?.value ?? 'N/A';
  }, [parameters, selectedPollutant]);

  return (
    <>
      {loading && factories.length === 0 && <PageLoader />}

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
              <h1 className="text-lg font-bold text-[#0F172A] dark:text-white">Live Monitoring Console</h1>
              <p className="hidden text-[10px] text-slate-400 dark:text-white/35 sm:block">
                Real-time CEMS continuous telemetry verification
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Manual Refresh */}
            <button
              onClick={fetchData}
              disabled={loading}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:bg-[#0B241D] dark:text-slate-300"
            >
              <RefreshCw size={13} className={loading ? 'animate-spin text-emerald-500' : ''} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={() => dispatch(toggleTheme())}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:bg-emerald-50 hover:text-[#0B6B50] dark:border-white/10 dark:bg-white/5 dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-emerald-400"
            >
              {isDark ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            {/* Notification */}
            <button
              onClick={() => navigate('/alerts')}
              className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-white/60"
            >
              <Bell size={17} />
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
                <p className="text-xs font-semibold dark:text-white/80">Auditor Admin</p>
                <p className="text-[9px] text-slate-400 dark:text-white/35">Environmental Officer</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="mx-auto max-w-[1600px] p-5 lg:p-8">
          {/* Page Title */}
          <div className="mb-7 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-bold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                  LIVE CEMS FEED
                </span>
                <span className="text-[10px] text-slate-400 dark:text-white/35">
                  Last synced: {timeAgo(lastSync)}
                </span>
              </div>

              <h2 className="mt-3 text-2xl font-bold tracking-tight dark:text-white">
                Live Industrial Stack Monitoring
              </h2>
              <p className="mt-1 max-w-2xl text-sm text-slate-500 dark:text-white/45">
                Inspect continuous emission parameters, verify hardware sensor drift, and track cross-correlated energy metrics in real time.
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-white/60"
              >
                <LayoutDashboard size={14} />
                Overview Map
              </button>
            </div>
          </div>

          {/* Facility Selector */}
          <section className="mb-5">
            <div className="mb-3">
              <h3 className="text-sm font-bold dark:text-white">Connected Industrial Stacks ({factories.length})</h3>
              <p className="mt-1 text-[11px] text-slate-400 dark:text-white/35">
                Select a facility to inspect its live continuous telemetry and AI audit logs
              </p>
            </div>

            <PlantSelector
              factories={factories}
              selectedPlant={selectedPlant}
              onSelect={setSelectedPlant}
            />
          </section>

          {/* Selected Facility Status Banner */}
          {selectedPlant && (
            <section className="mb-5 flex flex-col justify-between gap-4 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5 dark:border-emerald-500/20 dark:bg-emerald-500/10 sm:flex-row sm:items-center">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0B6B50] text-white">
                  <Radio size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#064E3B] dark:text-emerald-300">
                    {selectedPlant.factoryName} (ID: {selectedPlant.factoryId}) · Sensor: {selectedPlant.sensorId}
                  </p>
                  <p className="mt-1 text-[10px] text-emerald-700/70 dark:text-emerald-300/50">
                    Trust Score: <span className="font-bold">{selectedPlant.trustScore}/100</span> · Verdict: <span className="font-bold">{selectedPlant.verdict}</span> · Power Load: {selectedPlant.rawReading?.electricityConsumption || 0} kW
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[10px] font-semibold text-emerald-700 dark:text-emerald-400">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                Live Validation Engine Active
              </div>
            </section>
          )}

          <FactoryBarChart factories={factories} />

          {/* Live Parameter Cards */}
          <section>
            <div className="mb-4 flex items-end justify-between">
              <div>
                <h3 className="text-sm font-bold dark:text-white">Live Continuous Emission Parameters</h3>
                <p className="mt-1 text-[11px] text-slate-400 dark:text-white/35">
                  Verified real-time sensor stack measurements
                </p>
              </div>
              <span className="hidden text-[10px] text-slate-400 dark:text-white/35 sm:block">
                Auto-refresh: 15s
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {parameters.map((parameter) => (
                <ParameterCard key={parameter.name} parameter={parameter} />
              ))}
            </div>
          </section>

          {/* Dynamic Trend Chart + AI Auditor Status */}
          <section className="mt-5 grid gap-5 xl:grid-cols-[1.6fr_.7fr]">
            {/* Live Chart */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.03)] dark:border-white/10 dark:bg-white/[0.03] dark:shadow-none">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold dark:text-white">Live Telemetry Trend Analysis</h3>
                    <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[8px] font-bold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                      STREAMING
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-slate-400 dark:text-white/35">
                    {PARAMETER_CONFIG[selectedPollutant]?.name} concentration history · {selectedPlant?.factoryName}
                  </p>
                </div>

                {/* Pollutant Selector Dropdown */}
                <select
                  value={selectedPollutant}
                  onChange={(e) => setSelectedPollutant(e.target.value)}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600 outline-none dark:border-white/10 dark:bg-[#0B241D] dark:text-white/70"
                >
                  <option value="pm25">PM2.5 (µg/m³)</option>
                  <option value="pm10">PM10 (µg/m³)</option>
                  <option value="so2">SO₂ (ppb)</option>
                  <option value="nox">NOx (ppb)</option>
                  <option value="co">CO (ppm)</option>
                  <option value="temperature">Temperature (°C)</option>
                </select>
              </div>

              <div className="mt-5 flex items-center gap-4">
                <div>
                  <span className="font-mono text-2xl font-semibold dark:text-white">
                    {currentPollutantValue}
                  </span>
                  <span className="ml-1 font-mono text-[9px] text-slate-400 dark:text-white/30">
                    {PARAMETER_CONFIG[selectedPollutant]?.unit}
                  </span>
                </div>
                <span className="rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-semibold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                  Limit: {PARAMETER_CONFIG[selectedPollutant]?.limit} {PARAMETER_CONFIG[selectedPollutant]?.unit}
                </span>
              </div>

              <DynamicLiveChart historyData={historyData} pollutantKey={selectedPollutant} />
            </div>

            {/* AI Auditor & Device Status */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.03)] dark:border-white/10 dark:bg-white/[0.03] dark:shadow-none">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold dark:text-white flex items-center gap-2">
                    <Sparkles size={16} className="text-emerald-500" />
                    AI Validation Integrity
                  </h3>
                  <p className="mt-1 text-[11px] text-slate-400 dark:text-white/35">
                    {selectedPlant?.factoryName} · Sensor Audit
                  </p>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-[#0B6B50] dark:bg-emerald-500/10 dark:text-emerald-400">
                  <Radio size={17} />
                </div>
              </div>

              <div className="mt-6 space-y-5">
                <div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 dark:text-white/45">Data Trust Score</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                      {selectedPlant?.trustScore ?? 100}%
                    </span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-slate-100 dark:bg-white/10">
                    <div
                      className="h-full rounded-full bg-[#10B981] transition-all duration-500"
                      style={{ width: `${selectedPlant?.trustScore ?? 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 dark:text-white/45">Audit Verdict</span>
                    <span className="font-semibold dark:text-white/80">{selectedPlant?.verdict || 'VERIFIED'}</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-slate-100 dark:bg-white/10">
                    <div
                      className={`h-full rounded-full ${
                        selectedPlant?.verdict === 'TAMPERED'
                          ? 'bg-red-500'
                          : selectedPlant?.verdict === 'SUSPICIOUS'
                          ? 'bg-amber-400'
                          : 'bg-[#0B6B50]'
                      }`}
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 dark:text-white/45">Electricity Correlation</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <Zap size={12} /> {selectedPlant?.rawReading?.electricityConsumption || 0} kW
                    </span>
                  </div>
                </div>
              </div>

              {/* AI Natural Language Explanation */}
              <div className="mt-6 rounded-xl bg-slate-50 p-4 dark:bg-white/5 border border-slate-100 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <Sparkles size={14} className="text-emerald-500" />
                  <span className="text-xs font-semibold text-slate-700 dark:text-white/80">
                    AI Auditor Reasoning
                  </span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-white/70 italic">
                  "{selectedPlant?.aiSummary || 'All emission telemetry verified normal and conforms to baseline standards.'}"
                </p>
              </div>
            </div>
          </section>

          {/* Latest Sensor Readings Table */}
          <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.03)] dark:border-white/10 dark:bg-white/[0.03] dark:shadow-none">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold dark:text-white">Continuous Sensor Readings (Live Stream)</h3>
                <p className="mt-1 text-[11px] text-slate-400 dark:text-white/35">
                  Latest verified telemetry received for {selectedPlant?.factoryName}
                </p>
              </div>
            </div>

            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[650px] text-left">
                <thead>
                  <tr className="border-b border-slate-100 text-[10px] text-slate-400 dark:border-white/10 dark:text-white/30">
                    <th className="pb-3 font-medium">Parameter</th>
                    <th className="pb-3 font-medium">Live Value</th>
                    <th className="pb-3 font-medium">Unit</th>
                    <th className="pb-3 font-medium">CPCB Standard Limit</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 text-right font-medium">Sampled</th>
                  </tr>
                </thead>

                <tbody>
                  {parameters.map((parameter) => (
                    <tr
                      key={parameter.name}
                      className="border-b border-slate-50 last:border-0 dark:border-white/[0.06]"
                    >
                      <td className="py-4 text-xs font-semibold text-slate-700 dark:text-white/75">
                        {parameter.name}
                      </td>
                      <td className="py-4 font-mono text-xs font-semibold text-[#0F172A] dark:text-white">
                        {parameter.value}
                      </td>
                      <td className="py-4 font-mono text-[9px] text-slate-400 dark:text-white/30">
                        {parameter.unit}
                      </td>
                      <td className="py-4 font-mono text-[10px] text-slate-500 dark:text-white/40">
                        {parameter.limit} {parameter.unit}
                      </td>
                      <td className="py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[9px] font-semibold ${
                            parameter.status === 'Critical'
                              ? 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400'
                              : parameter.status === 'Warning'
                              ? 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400'
                              : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400'
                            }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              parameter.status === 'Critical'
                                ? 'bg-red-500'
                                : parameter.status === 'Warning'
                                ? 'bg-amber-500'
                                : 'bg-emerald-500'
                              }`}
                          />
                          {parameter.status}
                        </span>
                      </td>
                      <td className="py-4 text-right font-mono text-[9px] text-slate-400 dark:text-white/30">
                        {timeAgo(selectedPlant?.readingTimestamp || selectedPlant?.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div >
      </div >
    </>
  );
}