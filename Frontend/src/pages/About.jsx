import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Factory,
  Leaf,
  Menu,
  Moon,
  Radio,
  ShieldCheck,
  BarChart3,
  Bell,
  FileCheck2,
  Cpu,
  Sun,
  X,
} from 'lucide-react';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toggleTheme } from '../features/Theme/Theme_slice'; // adjust path to match your project structure

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
 * dispatches `toggleTheme()` on click. The `setTheme`-on-mount /
 * `<html>` class sync is handled once in Home.jsx (or a root layout) —
 * this component only needs to read state and dispatch the toggle.
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

function FeatureCard({ icon: Icon, title, text }) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/5 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-emerald-500/30 dark:hover:shadow-none">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-[#0B6B50] transition group-hover:bg-[#0B6B50] group-hover:text-white dark:bg-emerald-500/10 dark:text-emerald-400">
        <Icon size={22} />
      </div>

      <h3 className="mt-6 text-lg font-bold text-[#0F172A] dark:text-white">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-white/50">{text}</p>

      <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-[#0B6B50] dark:text-emerald-400">
        Learn more
        <ArrowRight size={14} />
      </div>
    </div>
  );
}

function StepCard({ number, icon: Icon, title, text }) {
  return (
    <div className="relative rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03]">
      <div className="flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-[#0B6B50] dark:bg-emerald-500/10 dark:text-emerald-400">
          <Icon size={21} />
        </div>

        <span className="font-mono text-3xl font-bold text-slate-100 dark:text-white/10">
          {number}
        </span>
      </div>

      <h3 className="mt-6 text-base font-bold text-[#0F172A] dark:text-white">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-white/50">{text}</p>
    </div>
  );
}

export default function About() {
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme.theme);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Keep the `dark` class on <html> in sync with the redux theme state,
  // in case this page is opened directly without Home.jsx having run first.
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Close image preview with the Escape key and prevent page scrolling while open.
  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedImage(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedImage]);

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

          <nav className="hidden items-center gap-9 md:flex">
            {['Home', 'About'].map((item) => (
              <button
                onClick={() =>
                  navigate(item === 'Home' ? '/' : `/${item.toLowerCase()}`)
                }
                key={item}
                className={` hover:cursor-pointer text-sm font-medium transition ${
                  item === 'About'
                    ? 'text-[#0B6B50] dark:text-emerald-400'
                    : 'text-slate-600 hover:text-[#0B6B50] dark:text-white/60 dark:hover:text-emerald-400'
                }`}
              >
                {item}
              </button>
            ))}

            <button
              onClick={() => navigate('/resources')}
              className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-[#0B6B50] dark:text-white/60 dark:hover:text-emerald-400"
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

        {/* Mobile menu */}
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
              <button
                onClick={() => navigate('/login')}
                className="rounded-lg border border-[#0B6B50] py-2.5 text-sm font-semibold text-[#064E3B] dark:border-emerald-500/40 dark:text-emerald-300"
              >
                Log In
              </button>

              <button
                onClick={() => navigate('/selectrole')}
                className="rounded-lg bg-[#0B6B50] py-2.5 text-sm font-semibold text-white"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main */}
      <main>
        {/* About Hero */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-[-200px] top-[100px] h-[500px] w-[500px] rounded-full bg-emerald-100/30 blur-3xl dark:bg-emerald-500/10" />

            <div className="absolute right-[-200px] top-[50px] h-[500px] w-[500px] rounded-full bg-green-100/30 blur-3xl dark:bg-green-500/10" />
          </div>

          <div className="relative mx-auto grid max-w-[1400px] items-center gap-12 px-5 pb-20 pt-16 lg:grid-cols-[1fr_.8fr] lg:px-8 lg:pb-24 lg:pt-24">
            {/* Left */}
            <div>
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-xs font-semibold text-[#064E3B] dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300">
                <CheckCircle2 size={15} />
                About EcoTrust
              </div>

              <h1 className="max-w-[650px] text-4xl font-bold leading-[1.08] tracking-[-0.035em] text-[#0F172A] dark:text-white sm:text-5xl lg:text-[58px]">
                Building trust through{' '}
                <span className="text-[#0B6B50] dark:text-emerald-400">
                  environmental intelligence
                </span>
              </h1>

              <p className="mt-7 max-w-[590px] text-base leading-7 text-slate-600 dark:text-white/60 sm:text-lg">
                EcoTrust is an environmental intelligence platform designed to
                help industries monitor emissions, maintain compliance,
                understand environmental risks, and make better decisions using
                real-time data.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="group flex items-center justify-center gap-3 rounded-xl bg-[#0B6B50] px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-emerald-900/15 transition hover:-translate-y-0.5 hover:bg-[#064E3B]"
                >
                  Explore Platform
                  <ArrowRight
                    size={17}
                    className="transition group-hover:translate-x-1"
                  />
                </button>

                
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative">
              <div className="absolute -inset-10 rounded-full bg-emerald-200/20 blur-3xl dark:bg-emerald-500/10" />

              <div className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_25px_80px_rgba(6,78,59,0.13)] dark:border-white/10 dark:bg-[#0A211B] dark:shadow-[0_25px_80px_rgba(0,0,0,0.4)]">
                <div className="flex items-center justify-between border-b border-slate-100 pb-5 dark:border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0B6B50] text-white">
                      <Leaf size={21} />
                    </div>

                    <div>
                      <p className="text-sm font-bold dark:text-white">EcoTrust</p>

                      <p className="text-[9px] text-slate-400 dark:text-white/30">
                        Environmental Intelligence
                      </p>
                    </div>
                  </div>

                  <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-semibold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                    LIVE
                  </span>
                </div>

                <div className="mt-6">
                  <p className="text-xs text-slate-400 dark:text-white/30">Environmental Health</p>

                  <div className="mt-2 flex items-end gap-2">
                    <span className="text-4xl font-bold text-[#0F172A] dark:text-white">
                      98.7%
                    </span>

                    <span className="mb-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      +2.4%
                    </span>
                  </div>
                </div>

                {/* Fake graph */}
                <div className="mt-7 h-[180px]">
                  <svg
                    viewBox="0 0 500 180"
                    className="h-full w-full"
                    preserveAspectRatio="none"
                  >
                    {[35, 75, 115, 155].map((y) => (
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
                      d="M0 125 C40 110 55 120 85 100 C120 75 135 110 165 88 C200 65 220 90 250 60 C285 35 305 72 335 55 C365 38 395 65 420 38 C450 15 475 30 500 20 V180 H0Z"
                      fill="rgba(16,185,129,.08)"
                    />

                    <path
                      d="M0 125 C40 110 55 120 85 100 C120 75 135 110 165 88 C200 65 220 90 250 60 C285 35 305 72 335 55 C365 38 395 65 420 38 C450 15 475 30 500 20"
                      fill="none"
                      stroke="#0B6B50"
                      strokeWidth="3"
                    />

                    <circle cx="500" cy="20" r="5" fill="#0B6B50" />
                  </svg>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="rounded-xl bg-emerald-50 p-3 dark:bg-white/5">
                    <p className="text-[9px] text-slate-400 dark:text-white/30">PM2.5</p>

                    <p className="mt-1 font-mono text-sm font-bold dark:text-white/80">28.4</p>

                    <p className="mt-1 text-[8px] text-emerald-600 dark:text-emerald-400">Good</p>
                  </div>

                  <div className="rounded-xl bg-emerald-50 p-3 dark:bg-white/5">
                    <p className="text-[9px] text-slate-400 dark:text-white/30">Devices</p>

                    <p className="mt-1 font-mono text-sm font-bold dark:text-white/80">10K+</p>

                    <p className="mt-1 text-[8px] text-emerald-600 dark:text-emerald-400">Online</p>
                  </div>

                  <div className="rounded-xl bg-emerald-50 p-3 dark:bg-white/5">
                    <p className="text-[9px] text-slate-400 dark:text-white/30">Alerts</p>

                    <p className="mt-1 font-mono text-sm font-bold dark:text-white/80">12</p>

                    <p className="mt-1 text-[8px] text-amber-500 dark:text-amber-400">Active</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Complete EcoTrust Data Pipeline */}
        <section className="relative overflow-hidden bg-[#F7FAF8] px-5 py-20 dark:bg-[#071A15] lg:px-8 lg:py-28">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-20 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-emerald-200/20 blur-3xl dark:bg-emerald-500/5" />
          </div>

          <div className="relative mx-auto max-w-[1280px]">
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#0B6B50] dark:text-emerald-400">
                EcoTrust Intelligence Pipeline
              </span>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0F172A] dark:text-white sm:text-4xl lg:text-5xl">
                From raw environmental data to trusted action
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-500 dark:text-white/50 sm:text-base">
                EcoTrust connects factory sensors, CEMS, government records and historical
                data into one continuous intelligence pipeline. Every reading is validated,
                scored for confidence, analyzed for abnormal behavior and converted into
                actionable alerts, investigations and final reports.
              </p>
            </div>

            {/* Pipeline diagram */}
            <div className="mt-10 overflow-hidden rounded-3xl border border-slate-200 bg-white p-3 shadow-[0_25px_80px_rgba(6,78,59,0.10)] dark:border-white/10 dark:bg-[#0A211B] dark:shadow-[0_25px_80px_rgba(0,0,0,0.35)] sm:p-5 lg:p-7">
              <div className="mt-12">
              <button
                type="button"
                onClick={() =>
                  setSelectedImage({
                    src: '/ecotrust-pipeline.png',
                    alt: 'EcoTrust complete industrial pollution intelligence pipeline',
                    title: 'EcoTrust Intelligence Pipeline'
                  })
                }
                className="group block w-full cursor-zoom-in text-left"
                aria-label="Open EcoTrust pipeline diagram"
              >
                <div className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white p-3 shadow-[0_20px_60px_rgba(6,78,59,0.10)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(6,78,59,0.16)] dark:border-white/10 dark:bg-[#0A211B] dark:shadow-[0_20px_60px_rgba(0,0,0,0.30)] dark:hover:shadow-[0_28px_80px_rgba(0,0,0,0.40)] sm:p-5 lg:p-6">
                  <div className="rounded-[20px] bg-slate-50 p-3 dark:bg-black/20 sm:p-5 lg:p-7">
                    <img
                      src="/ecotrust-pipeline.png"
                      alt="EcoTrust complete industrial pollution intelligence pipeline showing data sources, ingestion, validation, confidence scoring, historical and real-time analysis, anomaly detection, alerts, officer investigation and final report"
                      className="mx-auto block h-auto max-h-[560px] w-full object-contain"
                      loading="lazy"
                    />
                  </div>

                  <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full border border-white/20 bg-[#052E24]/90 px-4 py-2 text-[11px] font-semibold text-white opacity-0 shadow-lg transition duration-300 group-hover:opacity-100">
                    Click to explore full pipeline
                  </div>
                </div>
              </button>

              <p className="mt-3 text-center text-xs text-slate-400 dark:text-white/30">
                Complete EcoTrust intelligence flow · Click to expand
              </p>
            </div></div>

            {/* Visual walkthrough */}
            <div className="mt-12">
              <div className="mx-auto max-w-2xl text-center">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#0B6B50] dark:text-emerald-400">
                  Visual Walkthrough
                </span>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-[#0F172A] dark:text-white sm:text-3xl">
                  See how EcoTrust turns data into decisions
                </h3>
                <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500 dark:text-white/50">
                  Explore the major stages of the EcoTrust intelligence pipeline through
                  the visual flow below.
                </p>
              </div>

              <div className="mt-10 grid gap-6 lg:grid-cols-3">
                {[
                  {
                    image: '/ecotrust-data-ingestion.png',
                    title: '1. Collect & Validate',
                    text: 'Factory/CEMS readings and government data enter EcoTrust, pass validation checks and receive data-quality signals.',
                  },
                  {
                    image: '/ecotrust-analysis-alerts.png',
                    title: '2. Analyze & Detect',
                    text: 'Real-time and historical data are compared to identify trends, abnormal behavior, risk levels and high-priority alerts.',
                  },
                  {
                    image: '/ecotrust-investigation-report.png',
                    title: '3. Investigate & Report',
                    text: 'Officers review evidence, choose an action and generate a structured EcoTrust case report with an audit trail.',
                  },
                ].map(({ image, title, text }) => (
                  <div
                    key={title}
                    className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-900/10 dark:border-white/10 dark:bg-white/[0.03]"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-black/20 sm:aspect-[16/10] lg:aspect-[4/3]">
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedImage({
                            src: image,
                            alt: title,
                            title,
                          })
                        }
                        className="block h-full w-full cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-500"
                        aria-label={`Open ${title} image`}
                      >
                        <img
                          src={image}
                          alt={title}
                          className="h-full w-full object-contain bg-slate-50 p-2 transition duration-500 group-hover:scale-[1.02] dark:bg-black/20 sm:p-3"
                          loading="lazy"
                        />
                      </button>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                    </div>

                    <div className="p-5">
                      <h4 className="text-base font-bold text-[#0F172A] dark:text-white">
                        {title}
                      </h4>
                      <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-white/45">
                        {text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Explanation cards */}
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  number: '01',
                  title: 'Data Sources',
                  text: 'EcoTrust receives pollution readings from factories and CEMS, along with CEMS QA/QC information such as calibration, zero/span checks, analyzer status and diagnostics.',
                },
                {
                  number: '02',
                  title: 'Data Ingestion',
                  text: 'CEMS, DAS and APIs send incoming environmental data through the EcoTrust API, where the platform stores the data for continuous processing and analysis.',
                },
                {
                  number: '03',
                  title: 'Data Validation',
                  text: 'Each reading passes format, time and value checks. QA/QC signals such as calibration status, drift and analyzer status are also evaluated before data is marked valid or questionable.',
                },
                {
                  number: '04',
                  title: 'Data Confidence Layer',
                  text: 'Sensor health, data quality and continuity are combined into a confidence score so users can distinguish reliable readings from data that needs verification.',
                },
                {
                  number: '05',
                  title: 'History + Real-Time Analysis',
                  text: 'Live CEMS streams are compared with historical data to identify trends, baselines and recurring patterns, helping EcoTrust determine whether current behavior is normal or abnormal.',
                },
                {
                  number: '06',
                  title: 'Anomaly Engine',
                  text: 'The platform checks emission trends against limits and historical behavior. Detected anomalies are evaluated by severity, duration and confidence to calculate risk.',
                },
                {
                  number: '07',
                  title: 'Alert Engine',
                  text: 'High-risk events are converted into prioritized alerts using factors such as limit exceedance, persistent increases, abnormal historical patterns, sensor health and data confidence.',
                },
                {
                  number: '08',
                  title: 'Officer Dashboard',
                  text: 'Environmental officers can see nearby factories, critical alerts, analytics and trends, then prioritize which facility requires investigation first.',
                },
                {
                  number: '09',
                  title: 'Investigation',
                  text: 'Officers review CEMS readings, historical trends, sensor health, data confidence and alert duration before choosing verification, monitoring, field inspection or addressing a data issue.',
                },
                {
                  number: '10',
                  title: 'Final EcoTrust Report',
                  text: 'The investigation outcome is converted into a structured case report containing factory details, evidence, emission trends, sensor health, findings, action taken, officer remarks and resolution status.',
                },
              ].map(({ number, title, text }) => (
                <div
                  key={number}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-900/5 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-emerald-500/30"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 font-mono text-xs font-bold text-[#0B6B50] dark:bg-emerald-500/10 dark:text-emerald-400">
                      {number}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#0F172A] dark:text-white">
                        {title}
                      </h3>
                      <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-white/40">
                        {text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-6 text-center dark:border-emerald-500/20 dark:bg-emerald-500/5">
              <p className="text-sm font-semibold text-[#064E3B] dark:text-emerald-300 sm:text-base">
                Data Sources → Ingestion → Validation → Confidence → Analysis → Anomaly → Alert → Investigation → Action → Final Report
              </p>
              <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-white/40">
                This continuous flow is what turns raw environmental measurements into trusted, explainable and actionable environmental intelligence.
              </p>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="bg-white px-5 py-20 dark:bg-[#0A211B] lg:px-8 lg:py-24">
          <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#0B6B50] dark:text-emerald-400">
                Our Mission
              </span>

              <h2 className="mt-3 text-3xl font-bold tracking-tight dark:text-white sm:text-4xl">
                Turning environmental data into meaningful action
              </h2>

              <p className="mt-5 text-sm leading-7 text-slate-500 dark:text-white/50 sm:text-base">
                Industries generate enormous amounts of environmental data every
                day. EcoTrust transforms this complex data into simple,
                actionable information.
              </p>

              <p className="mt-4 text-sm leading-7 text-slate-500 dark:text-white/50 sm:text-base">
                From real-time emissions monitoring to compliance reporting, our
                platform helps organizations understand what is happening,
                identify risks, and respond faster.
              </p>

              <div className="mt-7 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-[#0B6B50] dark:bg-emerald-500/10 dark:text-emerald-400">
                  <CheckCircle2 size={18} />
                </div>

                <span className="text-sm font-semibold text-slate-700 dark:text-white/70">
                  Better data. Better decisions. Cleaner future.
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-[#052E24] p-6 text-white">
                <Leaf size={24} className="text-emerald-300" />

                <p className="mt-8 text-3xl font-bold">10K+</p>

                <p className="mt-2 text-xs text-white/50">
                  Environmental sensors monitored
                </p>
              </div>

              <div className="mt-8 rounded-2xl bg-emerald-50 p-6 dark:bg-white/[0.03] dark:border dark:border-white/10">
                <Factory size={24} className="text-[#0B6B50] dark:text-emerald-400" />

                <p className="mt-8 text-3xl font-bold text-[#0F172A] dark:text-white">500+</p>

                <p className="mt-2 text-xs text-slate-500 dark:text-white/40">
                  Industries across India
                </p>
              </div>

              <div className="rounded-2xl bg-emerald-50 p-6 dark:bg-white/[0.03] dark:border dark:border-white/10">
                <ShieldCheck size={24} className="text-[#0B6B50] dark:text-emerald-400" />

                <p className="mt-8 text-3xl font-bold dark:text-white">98.7%</p>

                <p className="mt-2 text-xs text-slate-500 dark:text-white/40">
                  Compliance accuracy
                </p>
              </div>

              <div className="mt-8 rounded-2xl bg-[#0B6B50] p-6 text-white">
                <Radio size={24} />

                <p className="mt-8 text-3xl font-bold">24/7</p>

                <p className="mt-2 text-xs text-white/60">
                  Continuous monitoring
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What EcoTrust Does */}
        <section className="bg-[#F7FAF8] px-5 py-20 dark:bg-[#071A15] lg:px-8 lg:py-28">
          <div className="mx-auto max-w-[1200px]">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#0B6B50] dark:text-emerald-400">
                What We Do
              </span>

              <h2 className="mt-3 text-3xl font-bold tracking-tight dark:text-white sm:text-4xl">
                One platform for complete environmental visibility
              </h2>

              <p className="mt-4 text-slate-500 dark:text-white/50">
                EcoTrust connects monitoring, compliance, analytics and
                reporting into one intelligent environmental platform.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              <FeatureCard
                icon={Radio}
                title="Real-Time Monitoring"
                text="Track CEMS, CEQMS and environmental sensor data continuously from one centralized platform."
              />

              <FeatureCard
                icon={ShieldCheck}
                title="Compliance Intelligence"
                text="Understand your compliance position instantly and identify environmental risks before they become violations."
              />

              <FeatureCard
                icon={Bell}
                title="Smart Alerts"
                text="Receive intelligent alerts when environmental parameters cross configured thresholds."
              />

              <FeatureCard
                icon={BarChart3}
                title="Environmental Analytics"
                text="Analyze historical trends, compare facilities and understand changes in environmental performance."
              />

              <FeatureCard
                icon={FileCheck2}
                title="Automated Reporting"
                text="Convert environmental monitoring data into structured compliance and performance reports."
              />

              <FeatureCard
                icon={Cpu}
                title="Device Management"
                text="Monitor CEMS and CEQMS device connectivity, health, data quality and maintenance status."
              />
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-white px-5 py-20 dark:bg-[#0A211B] lg:px-8 lg:py-28">
          <div className="mx-auto max-w-[1200px]">
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#0B6B50] dark:text-emerald-400">
                How EcoTrust Works
              </span>

              <h2 className="mt-3 text-3xl font-bold tracking-tight dark:text-white sm:text-4xl">
                From environmental data to action
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-slate-500 dark:text-white/50">
                EcoTrust creates a continuous flow from your environmental
                sensors to meaningful decisions.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              <StepCard
                number="01"
                icon={Radio}
                title="Collect"
                text="CEMS, CEQMS and environmental sensors continuously send environmental readings."
              />

              <StepCard
                number="02"
                icon={BarChart3}
                title="Analyze"
                text="EcoTrust processes the incoming data and identifies trends and anomalies."
              />

              <StepCard
                number="03"
                icon={ShieldCheck}
                title="Evaluate"
                text="Environmental readings are evaluated against configured compliance limits."
              />

              <StepCard
                number="04"
                icon={Bell}
                title="Act"
                text="Teams receive alerts, insights and reports to take informed action."
              />
            </div>
          </div>
        </section>

        {/* Why EcoTrust */}
        <section className="bg-[#F7FAF8] px-5 py-20 dark:bg-[#071A15] lg:px-8 lg:py-28">
          <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#0B6B50] dark:text-emerald-400">
                Why EcoTrust
              </span>

              <h2 className="mt-3 text-3xl font-bold tracking-tight dark:text-white sm:text-4xl">
                Built around trust, transparency and sustainability
              </h2>

              <p className="mt-5 text-sm leading-7 text-slate-500 dark:text-white/50">
                Environmental decisions require reliable information. EcoTrust
                is designed to make environmental data easier to understand,
                easier to monitor and easier to act upon.
              </p>

             
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                [
                  'Transparency',
                  'Make environmental performance visible and understandable.',
                ],
                [
                  'Accountability',
                  'Keep teams informed about compliance and environmental risks.',
                ],
                [
                  'Intelligence',
                  'Turn raw environmental readings into actionable insights.',
                ],
                [
                  'Sustainability',
                  'Help organizations continuously improve their environmental impact.',
                ],
              ].map(([title, text]) => (
                <div
                  key={title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-[#0B6B50] dark:bg-emerald-500/10 dark:text-emerald-400">
                    <CheckCircle2 size={18} />
                  </div>

                  <h3 className="mt-5 text-sm font-bold dark:text-white">{title}</h3>

                  <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-white/40">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-5 py-20 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-[1100px] overflow-hidden rounded-3xl bg-[#052E24] px-7 py-14 text-center text-white sm:px-12">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0B6B50]">
              <Leaf size={27} />
            </div>

            <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
              Build a cleaner, smarter future
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/50">
              Start monitoring environmental performance in real time, improve
              compliance and turn environmental data into meaningful action.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                onClick={() => navigate('/selectrole')}
                className="group flex items-center justify-center gap-2 rounded-xl bg-[#34D399] px-6 py-3.5 text-sm font-semibold text-[#052E24] hover:bg-emerald-300"
              >
                Get Started
                <ArrowRight
                  size={16}
                  className="transition group-hover:translate-x-1"
                />
              </button>

           
            </div>
          </div>
        </section>
        {/* Image lightbox */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-md sm:p-6 lg:p-10"
            role="dialog"
            aria-modal="true"
            aria-label={selectedImage.title}
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="relative flex max-h-[94vh] max-w-[96vw] flex-col items-center"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                aria-label="Close image preview"
                className="absolute right-2 top-2 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/60 text-2xl text-white shadow-xl backdrop-blur-sm transition hover:bg-black/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                <X size={22} />
              </button>

              <div className="overflow-auto rounded-2xl border border-white/20 bg-white/95 p-2 shadow-2xl dark:bg-[#0A211B]/95 sm:p-3">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="max-h-[88vh] max-w-[92vw] rounded-xl object-contain"
                />
              </div>

              <p className="mt-3 rounded-full bg-black/60 px-4 py-2 text-center text-xs font-semibold text-white backdrop-blur-sm">
                {selectedImage.title} · Click outside or press Esc to close
              </p>
            </div>
          </div>
        )}

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
