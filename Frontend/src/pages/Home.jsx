import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  CircleAlert,
  Cloud,
  Factory,
  Leaf,
  Menu,
  Moon,
  ShieldCheck,
  Sun,
  Wind,
  X,
  Zap,
  ActivityIcon
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toggleTheme, setTheme } from '../features/Theme/Theme_slice'; 

const stats = [
  {
    icon: Zap,
    value: '10K+',
    label: 'Sensors',
    sub: 'Monitored in Real-time',
  },
  {
    icon: Factory,
    value: '500+',
    label: 'Industries',
    sub: 'Across India',
  },
  {
    icon: ShieldCheck,
    value: '98.7%',
    label: 'Compliance',
    sub: 'Accuracy Achieved',
  },
];

const metrics = [
  { label: 'PM2.5', value: '28.4', unit: 'µg/m³', status: 'Good' },
  { label: 'PM10', value: '45.1', unit: 'µg/m³', status: 'Good' },
  { label: 'SO₂', value: '12.3', unit: 'ppb', status: 'Normal' },
  { label: 'NOx', value: '18.7', unit: 'ppb', status: 'Normal' },
  { label: 'CO₂', value: '421.8', unit: 'ppm', status: 'Normal' },
];

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0B6B50] text-white">
        <Leaf size={23} strokeWidth={2.2} />
      </div>

      <span className="text-[22px] font-bold tracking-tight text-[#0F172A] dark:text-white">
        Eco<span className="text-[#0B6B50] dark:text-emerald-400">Trust</span>
      </span>
    </div>
  );
}

/**
 * Theme toggle button. Reads `theme.theme` from the redux store and
 * dispatches `toggleTheme()` on click. Renders a Sun icon in dark mode
 * (click to go light) and a Moon icon in light mode (click to go dark).
 */
function ThemeToggle({ className = '' }) {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={() => dispatch(toggleTheme())}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-emerald-50 hover:text-[#0B6B50] dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-emerald-300 ${className}`}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}

function MiniChart({ red = false }) {
  return (
    <svg
      viewBox="0 0 180 55"
      className="mt-3 h-12 w-full"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient
          id={red ? 'redFill' : 'greenFill'}
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop
            offset="0%"
            stopColor={red ? '#EF4444' : '#10B981'}
            stopOpacity=".25"
          />
          <stop
            offset="100%"
            stopColor={red ? '#EF4444' : '#10B981'}
            stopOpacity="0"
          />
        </linearGradient>
      </defs>

      <path
        d={
          red
            ? 'M0 36 C15 24 20 45 35 33 S55 42 70 27 S92 39 105 31 S125 44 140 20 S160 31 180 12 V55 H0Z'
            : 'M0 38 C15 31 20 41 34 28 S52 39 67 24 S88 35 104 29 S123 40 139 17 S160 29 180 10 V55 H0Z'
        }
        fill={`url(#${red ? 'redFill' : 'greenFill'})`}
      />

      <path
        d={
          red
            ? 'M0 36 C15 24 20 45 35 33 S55 42 70 27 S92 39 105 31 S125 44 140 20 S160 31 180 12'
            : 'M0 38 C15 31 20 41 34 28 S52 39 67 24 S88 35 104 29 S123 40 139 17 S160 29 180 10'
        }
        fill="none"
        stroke={red ? '#EF4444' : '#10B981'}
        strokeWidth="2"
      />
    </svg>
  );
}

function MetricCard({ title, value, unit, status, danger }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-[0_4px_20px_rgba(15,23,42,0.04)] dark:border-white/10 dark:bg-white/[0.03] dark:shadow-none">
      <div className="text-xs font-medium text-slate-500 dark:text-white/50">{title}</div>

      <div className="mt-2 flex items-end gap-1">
        <span className="text-[25px] font-bold tracking-tight text-[#0F172A] dark:text-white">
          {value}
        </span>
        <span className="mb-1 text-[10px] text-slate-400 dark:text-white/30">{unit}</span>
      </div>

      <div
        className={`mt-1 text-[11px] font-medium ${
          danger ? 'text-red-500 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'
        }`}
      >
        {status}
      </div>

      <MiniChart red={danger} />
    </div>
  );
}

function DashboardPreview() {
  return (
    <div className="relative mx-auto w-full max-w-[780px]">
      {/* Glow */}
      <div className="absolute -inset-10 rounded-full bg-emerald-200/20 blur-3xl dark:bg-emerald-500/10" />

      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_25px_80px_rgba(6,78,59,0.16)] dark:border-white/10 dark:bg-[#0A211B] dark:shadow-[0_25px_80px_rgba(0,0,0,0.4)]">
        <div className="flex min-h-[530px]">
          {/* Dashboard Sidebar */}
          <aside className="hidden w-[175px] shrink-0 bg-[#052E24] p-4 text-white sm:block">
            <div className="mb-7 flex items-center gap-2 border-b border-white/10 pb-5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0B6B50]">
                <Leaf size={17} />
              </div>
              <span className="font-semibold">EcoTrust</span>
            </div>

            <nav className="space-y-1.5">
              {[
                ['Overview', true],
                ['Live Monitoring'],
                ['Alerts'],
                ['Compliance'],
                ['Reports'],
                ['Analytics'],
                ['Devices'],
              ].map(([item, active]) => (
                <div
                  key={item}
                  className={`rounded-lg px-3 py-2.5 text-[11px] ${
                    active
                      ? 'bg-[#0B6B50] font-medium'
                      : 'text-white/60 hover:bg-white/5'
                  }`}
                >
                  {item}
                </div>
              ))}
            </nav>

            <div className="mt-20 rounded-lg bg-white/5 p-3 text-[10px] text-white/60">
              <div className="mb-1">System Status</div>
              <div className="flex items-center gap-1.5 text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                All systems operational
              </div>
            </div>
          </aside>

          {/* Dashboard Content */}
          <main className="min-w-0 flex-1 bg-[#F7FAF8] p-4 dark:bg-[#071A15] sm:p-5">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#0F172A] dark:text-white">
                  Dashboard Overview
                </h3>
                <p className="text-[10px] text-slate-500 dark:text-white/40">
                  Real-time environmental compliance
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="hidden items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-[9px] text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-white/50 sm:flex">
                  <CalendarDays size={11} />
                  May 18 – May 24, 2025
                </div>

                <div className="h-7 w-7 rounded-full bg-emerald-100 dark:bg-emerald-500/20" />
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
              <MetricCard
                title="Compliance Score"
                value="98.7%"
                unit=""
                status="+2.4% this month"
              />
              <MetricCard
                title="Active Alerts"
                value="12"
                unit=""
                status="3 Critical"
                danger
              />
              <MetricCard
                title="PM2.5"
                value="28.4"
                unit="µg/m³"
                status="Good"
              />
              <MetricCard
                title="CO₂"
                value="421.8"
                unit="ppm"
                status="Normal"
              />
            </div>

            {/* Chart + Alerts */}
            <div className="mt-3 grid gap-3 lg:grid-cols-[1.5fr_.8fr]">
              <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/[0.03]">
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-semibold text-slate-800 dark:text-white/80">
                      Compliance Trend
                    </h4>
                    <p className="text-[9px] text-slate-400 dark:text-white/30">
                      Overall compliance score
                    </p>
                  </div>

                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    98.7%
                  </span>
                </div>

                <svg
                  viewBox="0 0 500 170"
                  className="h-[170px] w-full"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient
                      id="chartGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#10B981" stopOpacity=".25" />
                      <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {[30, 70, 110, 150].map((y) => (
                    <line
                      key={y}
                      x1="0"
                      x2="500"
                      y1={y}
                      y2={y}
                      stroke="#E2E8F0"
                      strokeDasharray="4 4"
                    />
                  ))}

                  <path
                    d="M0 120 C40 105 50 112 80 95 C110 78 125 100 150 88 C175 75 190 95 220 70 C250 48 275 75 300 65 C330 50 355 82 380 52 C410 25 440 48 465 35 C480 28 490 30 500 20 V170 H0Z"
                    fill="url(#chartGradient)"
                  />

                  <path
                    d="M0 120 C40 105 50 112 80 95 C110 78 125 100 150 88 C175 75 190 95 220 70 C250 48 275 75 300 65 C330 50 355 82 380 52 C410 25 440 48 465 35 C480 28 490 30 500 20"
                    fill="none"
                    stroke="#0B6B50"
                    strokeWidth="3"
                  />
                </svg>

                <div className="flex justify-between text-[8px] text-slate-400 dark:text-white/30">
                  <span>May 18</span>
                  <span>May 19</span>
                  <span>May 20</span>
                  <span>May 21</span>
                  <span>May 22</span>
                  <span>May 23</span>
                  <span>May 24</span>
                </div>
              </div>

              {/* Alerts */}
              <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/[0.03]">
                <div className="mb-4 flex items-center justify-between">
                  <h4 className="text-xs font-semibold text-slate-800 dark:text-white/80">
                    Recent Alerts
                  </h4>
                  <span className="text-[9px] font-medium text-emerald-600 dark:text-emerald-400">
                    View All
                  </span>
                </div>

                <div className="space-y-4">
                  {[
                    ['High PM2.5 Level', 'Plant A · Unit 2', '2m ago', 'red'],
                    [
                      'CO₂ Level Warning',
                      'Plant B · Unit 1',
                      '15m ago',
                      'amber',
                    ],
                    ['Temperature High', 'Plant C · Unit 3', '1h ago', 'amber'],
                    ['Low AQI Risk', 'Plant D · Unit 1', '2h ago', 'green'],
                  ].map(([title, location, time, color]) => (
                    <div key={title} className="flex gap-2.5">
                      <span
                        className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                          color === 'red'
                            ? 'bg-red-500'
                            : color === 'amber'
                              ? 'bg-amber-400'
                              : 'bg-emerald-500'
                        }`}
                      />

                      <div className="min-w-0 flex-1">
                        <div className="flex justify-between gap-2">
                          <span className="truncate text-[10px] font-medium text-slate-700 dark:text-white/70">
                            {title}
                          </span>
                          <span className="shrink-0 text-[8px] text-slate-400 dark:text-white/30">
                            {time}
                          </span>
                        </div>
                        <p className="mt-0.5 text-[8px] text-slate-400 dark:text-white/30">
                          {location}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Monitoring */}
            <div className="mt-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/[0.03]">
              <div className="mb-3 flex items-center justify-between">
                <h4 className="text-xs font-semibold text-slate-800 dark:text-white/80">
                  Active Monitoring
                </h4>

                <span className="flex items-center gap-1 text-[8px] text-emerald-600 dark:text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Live
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                {metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="border-r border-slate-100 last:border-0 dark:border-white/10"
                  >
                    <div className="mb-1 flex items-center gap-1 text-[9px] text-slate-400 dark:text-white/30">
                      <Cloud size={10} />
                      {metric.label}
                    </div>

                    <div className="font-mono text-sm font-semibold text-slate-800 dark:text-white/80">
                      {metric.value}
                    </div>

                    <div className="font-mono text-[8px] text-slate-400 dark:text-white/30">
                      {metric.unit}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function EcoTrustLoader() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);

  const phases = [
    'Connecting environmental sensors',
    'Synchronizing real-time data',
    'Analyzing environmental signals',
    'Verifying compliance intelligence',
    'Preparing your EcoTrust workspace',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 42);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const phaseInterval = setInterval(() => {
      setPhase((prev) => (prev + 1) % phases.length);
    }, 850);

    return () => clearInterval(phaseInterval);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center overflow-hidden bg-[#031E17] font-[Inter,sans-serif]">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/[0.07] blur-[140px]" />
        <div className="absolute -left-[180px] -top-[180px] h-[500px] w-[500px] rounded-full bg-emerald-400/[0.06] blur-[130px]" />
        <div className="absolute -bottom-[220px] -right-[150px] h-[500px] w-[500px] rounded-full bg-teal-300/[0.05] blur-[130px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)
            `,
            backgroundSize: '55px 55px',
          }}
        />

        {[...Array(18)].map((_, i) => (
          <span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-emerald-300/30 animate-[floatParticle_5s_ease-in-out_infinite]"
            style={{
              left: `${5 + ((i * 17) % 90)}%`,
              top: `${8 + ((i * 29) % 84)}%`,
              animationDelay: `${i * 0.25}s`,
            }}
          />
        ))}
      </div>

      {/* Main loader */}
      <div className="relative z-10 flex w-full max-w-[560px] flex-col items-center px-6">
        {/* Brand */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="absolute -inset-8 animate-[spin_10s_linear_infinite] rounded-full border border-dashed border-emerald-400/10" />
            <div className="absolute -inset-5 rounded-full border border-emerald-400/[0.12] animate-[logoPulse_2.5s_ease-in-out_infinite]" />
            <div className="absolute -inset-10 rounded-full bg-emerald-400/[0.08] blur-2xl" />

            <div className="relative flex h-[82px] w-[82px] items-center justify-center rounded-[26px] border border-emerald-300/20 bg-gradient-to-br from-[#0F7A5B] to-[#07543F] shadow-[0_0_70px_rgba(52,211,153,0.15)]">
              <Leaf size={42} strokeWidth={1.7} className="text-emerald-100" />
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,.9)]" />
            </div>
          </div>

          <div className="mt-10 text-center">
            <h1 className="text-[34px] font-bold tracking-[-0.04em] text-white">
              Eco<span className="text-emerald-400">Trust</span>
            </h1>

            <div className="mt-2 flex items-center justify-center gap-2">
              <span className="h-px w-7 bg-emerald-400/20" />
              <p className="text-[9px] font-semibold uppercase tracking-[0.32em] text-emerald-300/50">
                Environmental Intelligence
              </p>
              <span className="h-px w-7 bg-emerald-400/20" />
            </div>
          </div>
        </div>

        {/* Data pipeline */}
        <div className="relative mt-16 w-full max-w-[470px]">
          <div className="absolute left-[15%] right-[15%] top-[28px] h-px bg-white/[0.06]" />
          <div className="absolute left-[15%] top-[28px] h-px w-[25%] overflow-hidden bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-[dataBeam_2.2s_linear_infinite]" />

          <div className="relative grid grid-cols-3">
            <PremiumLoaderNode
              icon={Zap}
              label="Sensors"
              sub="LIVE DATA"
              delay="0s"
            />

            <PremiumLoaderNode
              icon={ActivityIcon}
              label="Intelligence"
              sub="ANALYZING"
              active
              delay="0.35s"
            />

            <PremiumLoaderNode
              icon={ShieldCheck}
              label="Compliance"
              sub="VERIFYING"
              delay="0.7s"
            />
          </div>
        </div>

        {/* Status */}
        <div className="mt-12 flex min-h-[30px] items-center justify-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>

          <p
            key={phase}
            className="animate-[statusFade_.5s_ease-out] text-[10px] font-medium tracking-wide text-white/45"
          >
            {phases[phase]}
          </p>
        </div>

        {/* Progress */}
        <div className="mt-7 w-full max-w-[350px]">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[8px] font-semibold uppercase tracking-[0.18em] text-white/20">
              Initializing platform
            </span>

            <span className="font-mono text-[9px] font-medium text-emerald-300/70">
              {progress.toString().padStart(3, '0')}%
            </span>
          </div>

          <div className="relative h-[3px] overflow-hidden rounded-full bg-white/[0.06]">
            <div
              className="relative h-full rounded-full bg-gradient-to-r from-[#087A58] via-emerald-400 to-emerald-300 transition-all duration-75"
              style={{ width: `${progress}%` }}
            >
              <span className="absolute right-0 top-0 h-full w-16 bg-gradient-to-r from-transparent to-white/60 blur-[2px]" />
            </div>
          </div>

          <div className="mt-3 flex justify-between text-[7px] uppercase tracking-[0.15em] text-white/15">
            <span>Data</span>
            <span>Intelligence</span>
            <span>Trust</span>
          </div>
        </div>

        <div className="mt-9 text-center">
          <p className="text-[8px] tracking-wide text-white/20">
            Real-time environmental intelligence
          </p>

          <div className="mt-2 flex items-center justify-center gap-1.5 text-[7px] uppercase tracking-[0.18em] text-emerald-300/20">
            <span>Monitor</span>
            <span>•</span>
            <span>Analyze</span>
            <span>•</span>
            <span>Protect</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes dataBeam {
          0% {
            transform: translateX(-120%);
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          85% {
            opacity: 1;
          }
          100% {
            transform: translateX(480%);
            opacity: 0;
          }
        }

        @keyframes logoPulse {
          0%, 100% {
            transform: scale(1);
            opacity: .5;
          }
          50% {
            transform: scale(1.08);
            opacity: 1;
          }
        }

        @keyframes floatParticle {
          0%, 100% {
            transform: translate3d(0, 0, 0);
            opacity: .15;
          }
          50% {
            transform: translate3d(0, -22px, 0);
            opacity: .55;
          }
        }

        @keyframes statusFade {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes nodePulse {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-2px) scale(1.025);
          }
        }
      `}</style>
    </div>
  );
}

function PremiumLoaderNode({
  icon: Icon,
  label,
  sub,
  active = false,
  delay,
}) {
  // Safety fallback so React never receives an undefined component.
  const SafeIcon = Icon || Leaf;

  return (
    <div
      className="relative flex flex-col items-center"
      style={{
        animation: 'nodePulse 2.4s ease-in-out infinite',
        animationDelay: delay,
      }}
    >
      <div
        className={`
          relative flex h-[56px] w-[56px] items-center justify-center
          rounded-2xl border transition-all duration-500
          ${
            active
              ? 'border-emerald-400/30 bg-gradient-to-br from-[#0D7455] to-[#084B3A] shadow-[0_0_35px_rgba(52,211,153,.13)]'
              : 'border-white/[0.08] bg-white/[0.025]'
          }
        `}
      >
        {active && (
          <div className="absolute -inset-2 rounded-2xl border border-emerald-400/10 animate-pulse" />
        )}

        <SafeIcon
          size={20}
          strokeWidth={1.7}
          className={active ? 'text-emerald-300' : 'text-white/25'}
        />

        <span
          className={`
            absolute -right-1 -top-1 h-2 w-2 rounded-full
            ${
              active
                ? 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,.8)]'
                : 'bg-white/10'
            }
          `}
        />
      </div>

      <div className="mt-3 text-center">
        <p
          className={`
            text-[9px] font-semibold
            ${active ? 'text-emerald-300/80' : 'text-white/35'}
          `}
        >
          {label}
        </p>

        <p
          className={`
            mt-1 text-[6px] font-medium tracking-[0.18em]
            ${active ? 'text-emerald-300/30' : 'text-white/15'}
          `}
        >
          {sub}
        </p>
      </div>
    </div>
  );
}

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const [mobileMenu, setMobileMenu] = useState(false);

  const [loading, setLoading] = useState(() => {
    return sessionStorage.getItem('ecotrust-loader-shown') !== 'true';
  });

  // Initialize theme from localStorage once, on first mount


  // Keep the `dark` class on <html> in sync with the redux theme state
  // (Tailwind's class-based dark mode reads this)
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    if (!loading) return;

    const timer = setTimeout(() => {
      setLoading(false);

      // Remember that loader has already been shown
      sessionStorage.setItem('ecotrust-loader-shown', 'true');
    }, 4000);

    return () => clearTimeout(timer);
  }, [loading]);

  if (loading) {
    return <EcoTrustLoader />;
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F7FAF8] font-[Inter,sans-serif] text-[#0F172A] dark:bg-[#071A15] dark:text-white transition-colors duration-300">
      {/* Top Trust Banner */}
      <div className="bg-[#064E3B] px-4 py-2.5 text-center text-xs font-medium text-white sm:text-sm">
        <span className="inline-flex items-center gap-2">
          <Leaf size={15} />
          Building a cleaner tomorrow with real-time environmental transparency.
        </span>
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl dark:border-white/10 dark:bg-[#071A15]/90">
        <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-5 lg:px-8">
          <Logo />

          <nav className="hidden items-center gap-9 md:flex hover:cursor-pointer">
            {['Home', 'About'].map((item) => (
              <button
                onClick={() =>
                  navigate(item === 'Home' ? '/' : `/${item.toLowerCase()}`)
                }
                key={item}
                className={` hover:cursor-pointer text-sm font-medium transition ${
                  item === 'Home'
                    ? 'text-[#0B6B50] dark:text-emerald-400'
                    : 'text-slate-600 hover:text-[#0B6B50] dark:text-white/60 dark:hover:text-emerald-400'
                }`}
              >
                {item}
              </button>
            ))}

            <button
              onClick={() => navigate('/resources')}
              className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-[#0B6B50] hover:cursor-pointer dark:text-white/60 dark:hover:text-emerald-400"
            >
              Resources
            </button>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle />

            <button
              onClick={() => navigate('/login')}
              className="rounded-lg border border-[#0B6B50] px-5 py-2.5 text-sm font-semibold text-[#064E3B] transition hover:bg-emerald-50 dark:border-emerald-500/40 dark:text-emerald-300 dark:hover:bg-emerald-500/10"
            >
              Log In
            </button>

            <button
              onClick={() => navigate('/selectrole')}
              className="rounded-lg bg-[#0B6B50] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-900/10 transition hover:bg-[#064E3B]"
            >
              Get Started
            </button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />

            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="rounded-lg p-2 text-[#0F172A] dark:text-white"
            >
              {mobileMenu ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {mobileMenu && (
          <div className="border-t border-slate-100 bg-white px-5 py-5 dark:border-white/10 dark:bg-[#071A15] md:hidden">
            <div className="space-y-1">
              {['Home', 'About', 'Resources'].map((item) => (
                <button
                  key={item}
                  onClick={() =>
                    navigate(item === 'Home' ? '/' : `/${item.toLowerCase()}`)
                  }
                  className="block rounded-lg px-3 py-3 text-sm font-medium text-slate-700 hover:bg-emerald-50 dark:text-white/70 dark:hover:bg-white/5"
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <button className="rounded-lg border border-[#0B6B50] py-2.5 text-sm font-semibold text-[#064E3B] dark:border-emerald-500/40 dark:text-emerald-300">
                Log In
              </button>
              <button className="rounded-lg bg-[#0B6B50] py-2.5 text-sm font-semibold text-white">
                Get Started
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <main>
        <section className="relative">
          {/* Background decoration - moved overflow-hidden inside this div */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute left-[-200px] top-[200px] h-[500px] w-[500px] rounded-full bg-emerald-100/30 blur-3xl dark:bg-emerald-500/10" />
            <div className="absolute right-[-200px] top-[100px] h-[500px] w-[500px] rounded-full bg-green-100/30 blur-3xl dark:bg-green-500/10" />
          </div>

          <div className="relative mx-auto grid max-w-[1400px] items-center gap-12 px-5 pb-20 pt-16 lg:grid-cols-[.85fr_1.15fr] lg:px-8 lg:pb-28 lg:pt-24">
            {/* Hero Copy */}
            <div className="relative z-20">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-xs font-semibold text-[#064E3B] dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300">
                <CheckCircle2 size={15} />
                Trusted by 500+ Industries
              </div>

              <h1 className="max-w-[650px] text-4xl font-bold leading-[1.08] tracking-[-0.035em] text-[#0F172A] dark:text-white sm:text-5xl lg:text-[58px]">
                Real-Time Environmental{' '}
                <span className="text-[#0B6B50] dark:text-emerald-400">Monitoring & Compliance</span>{' '}
                Made Simple
              </h1>

              <p className="mt-7 max-w-[590px] text-base leading-7 text-slate-600 dark:text-white/60 sm:text-lg">
                EcoTrust empowers industries and regulatory bodies with
                real-time environmental data, AI-powered insights, and automated
                compliance reporting for a greener, sustainable future.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="group relative z-30 w-fit flex items-center justify-center gap-3 rounded-xl bg-[#0B6B50] px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-emerald-900/15 transition hover:-translate-y-0.5 hover:bg-[#064E3B] focus:outline-none focus:ring-2 focus:ring-[#0B6B50] focus:ring-offset-2 dark:focus:ring-offset-[#071A15]"
                >
                  Explore Dashboard
                  <ArrowRight
                    size={17}
                    className="transition group-hover:translate-x-1"
                  />
                </button>
              </div>

              {/* Stats */}
              <div className="mt-12 grid max-w-[610px] grid-cols-3 gap-4 border-t border-slate-200 pt-7 dark:border-white/10">
                {stats.map(({ icon: Icon, value, label, sub }) => (
                  <div key={label}>
                    <div className="mb-2 flex items-center gap-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-[#0B6B50] dark:bg-emerald-500/10 dark:text-emerald-400">
                        <Icon size={17} />
                      </div>

                      <span className="text-xl font-bold tracking-tight text-[#0F172A] dark:text-white sm:text-2xl">
                        {value}
                      </span>
                    </div>

                    <div className="text-xs font-semibold text-slate-700 dark:text-white/70 sm:text-sm">
                      {label}
                    </div>

                    <div className="mt-1 text-[9px] text-slate-400 dark:text-white/30 sm:text-[10px]">
                      {sub}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dashboard */}
            <div className="relative lg:pl-4">
              <DashboardPreview />
            </div>
          </div>

          {/* Bottom fade */}
          <div className="pointer-events-none absolute bottom-0 left-0 h-20 w-full bg-gradient-to-t from-white/70 to-transparent dark:from-[#071A15]/70" />
        </section>

        {/* Trusted companies */}
        <section className="border-y border-slate-100 bg-white py-10 dark:border-white/10 dark:bg-[#0A211B]">
          <div className="mx-auto max-w-[1200px] px-5 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-white/30">
              Trusted by leading organizations
            </p>

            <div className="mt-7 grid grid-cols-2 items-center gap-7 opacity-50 grayscale sm:grid-cols-4 lg:grid-cols-7">
              {[
                'TATA',
                'adani',
                'Reliance',
                'vedanta',
                'JSW',
                'ACC',
                'Ultratech',
              ].map((company) => (
                <div
                  key={company}
                  className="text-lg font-bold tracking-tight text-slate-500 dark:text-white/40"
                >
                  {company}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features preview */}
        <section className="bg-[#F7FAF8] px-5 py-20 dark:bg-[#071A15] lg:px-8 lg:py-28">
          <div className="mx-auto max-w-[1200px]">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#0B6B50] dark:text-emerald-400">
                One platform
              </span>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0F172A] dark:text-white sm:text-4xl">
                Complete environmental visibility
              </h2>

              <p className="mt-4 text-slate-500 dark:text-white/50">
                Monitor emissions, identify risks, and stay ahead of regulatory
                requirements from one intelligent platform.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {[
                {
                  icon: Wind,
                  title: 'Live Monitoring',
                  text: 'Track CEMS, CEQMS and environmental sensor data in real time.',
                  path:"/LiveMonitoring"
                },
                {
                  icon: ShieldCheck,
                  title: 'Compliance Intelligence',
                  text: 'Know your compliance status instantly with automated alerts.',
                  path:"/compliance"
                },
                {
                  icon: CircleAlert,
                  title: 'Smart Alerts',
                  text: 'Get notified before environmental parameters become critical.',
                  path:"/Alerts"
                },
              ].map(({ icon: Icon, title, text, path }) => (
                <div
                  key={title}
                  className="group rounded-2xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/5 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-emerald-500/30 dark:hover:shadow-none"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-[#0B6B50] transition group-hover:bg-[#0B6B50] group-hover:text-white dark:bg-emerald-500/10 dark:text-emerald-400">
                    <Icon size={22} />
                  </div>

                  <h3 className="mt-6 text-lg font-bold text-[#0F172A] dark:text-white">
                    {title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-white/50">
                    {text}
                  </p>

                  <div onClick={()=>navigate(path)} className="mt-5 flex items-center gap-2 text-xs font-semibold text-[#0B6B50] dark:text-emerald-400 hover:cursor-pointer">
                    Learn more
                    <ArrowRight size={14} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#052E24] px-5 py-10 text-white lg:px-8">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-5 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0B6B50]">
              <Leaf size={18} />
            </div>
            <span className="font-semibold">EcoTrust</span>
          </div>

          <p className="text-xs text-white/50">
            © 2026 EcoTrust. Building a cleaner tomorrow.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;