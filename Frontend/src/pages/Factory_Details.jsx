import {
  ArrowLeft,
  Bell,
  CheckCircle2,
  ChevronDown,
  CircleAlert,
  Cloud,
  Factory,
  Gauge,
  LineChart,
  MapPin,
  Radio,
  ShieldCheck,
  Thermometer,
  TrendingDown,
  TrendingUp,
  Wind,
  Activity,
  Database,
  Clock3,
  Cpu,
  FileText,
} from "lucide-react";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const factoryData = {
  name: "Plant C",
  company: "Eco Industrial Manufacturing Pvt. Ltd.",
  location: "Meerut, Uttar Pradesh",
  address: "Industrial Area, Meerut, Uttar Pradesh",
  status: "violation",

  compliance: 72.1,
  confidence: 94.8,

  established: "2012",
  industry: "Chemical Manufacturing",
  category: "Red Category",

  coordinates: "29.0100° N, 77.6800° E",

  sensors: 316,
  activeSensors: 309,
  offlineSensors: 7,

  lastUpdated: "8 seconds ago",

  emissions: {
    pm25: {
      value: 148.7,
      unit: "µg/m³",
      limit: 60,
      status: "Critical",
    },
    pm10: {
      value: 214.2,
      unit: "µg/m³",
      limit: 100,
      status: "Critical",
    },
    so2: {
      value: 42.6,
      unit: "ppb",
      limit: 80,
      status: "Normal",
    },
    nox: {
      value: 67.4,
      unit: "ppb",
      limit: 100,
      status: "Warning",
    },
    co2: {
      value: 487.2,
      unit: "ppm",
      limit: 800,
      status: "Normal",
    },
    temperature: {
      value: 34.8,
      unit: "°C",
      limit: 45,
      status: "Normal",
    },
  },
};

const historicalData = [
  72, 75, 73, 78, 76, 79, 81, 77, 74, 71, 69, 72, 70, 68,
  71, 74, 76, 73, 70, 72, 69, 67, 70, 72, 74, 71, 73, 72,
];

const alerts = [
  {
    title: "PM2.5 exceeded permitted limit",
    description:
      "Current PM2.5 concentration is significantly above the permitted threshold.",
    time: "8 min ago",
    severity: "critical",
  },
  {
    title: "PM10 emission spike detected",
    description:
      "Emission level increased by 18.4% compared with the previous hour.",
    time: "21 min ago",
    severity: "critical",
  },
  {
    title: "Sensor cluster offline",
    description:
      "7 environmental sensors are currently not responding.",
    time: "42 min ago",
    severity: "warning",
  },
];

function StatusBadge({ status }) {
  const styles = {
    normal:
      "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/20",

    warning:
      "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/20",

    violation:
      "bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-300 dark:border-red-500/20",

    critical:
      "bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-300 dark:border-red-500/20",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold ${styles[status.toLowerCase()]}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          status.toLowerCase() === "normal"
            ? "bg-emerald-500"
            : status.toLowerCase() === "warning"
            ? "bg-amber-400"
            : "bg-red-500"
        }`}
      />

      {status}
    </span>
  );
}

function MetricCard({ title, value, unit, limit, status, icon: Icon }) {
  const percentage = Math.min((value / limit) * 100, 100);

  const critical =
    status === "Critical" || status === "Violation";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.03)] dark:border-white/10 dark:bg-[#0B241D]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-xl ${
              critical
                ? "bg-red-50 text-red-500 dark:bg-red-500/10"
                : "bg-emerald-50 text-[#0B6B50] dark:bg-emerald-500/10 dark:text-emerald-300"
            }`}
          >
            <Icon size={17} />
          </div>

          <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
            {title}
          </span>
        </div>

        <StatusBadge status={status} />
      </div>

      <div className="mt-5 flex items-end gap-1">
        <span className="font-mono text-2xl font-bold text-slate-900 dark:text-white">
          {value}
        </span>

        <span className="mb-1 text-[10px] text-slate-400">
          {unit}
        </span>
      </div>

      <div className="mt-4">
        <div className="flex justify-between text-[9px]">
          <span className="text-slate-400">Permitted limit</span>

          <span className="font-semibold text-slate-600 dark:text-slate-300">
            {limit} {unit}
          </span>
        </div>

        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
          <div
            className={`h-full rounded-full ${
              critical
                ? "bg-red-500"
                : status === "Warning"
                ? "bg-amber-400"
                : "bg-emerald-500"
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function TrustScore() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-[#0B241D]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            EcoTrust Confidence
          </p>

          <h3 className="mt-1 text-sm font-bold text-slate-900 dark:text-white">
            Data Reliability Score
          </h3>
        </div>

        <ShieldCheck className="text-emerald-500" size={20} />
      </div>

      <div className="mt-6 flex items-center gap-6">
        <div className="relative flex h-28 w-28 items-center justify-center rounded-full border-[8px] border-emerald-100 dark:border-emerald-500/10">
          <div className="absolute inset-[-8px] rounded-full border-[8px] border-transparent border-t-emerald-500 border-r-emerald-500" />

          <div className="text-center">
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              94.8%
            </p>

            <p className="text-[8px] text-slate-400">
              Confidence
            </p>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600">
            <CheckCircle2 size={14} />
            High confidence
          </div>

          <p className="mt-2 text-[10px] leading-5 text-slate-400">
            EcoTrust validated this factory's environmental data using
            sensor consistency, historical patterns and cross-source
            validation.
          </p>

          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-[9px]">
              <span className="text-slate-400">
                Sensor consistency
              </span>

              <span className="font-semibold">97%</span>
            </div>

            <div className="flex justify-between text-[9px]">
              <span className="text-slate-400">
                Historical consistency
              </span>

              <span className="font-semibold">93%</span>
            </div>

            <div className="flex justify-between text-[9px]">
              <span className="text-slate-400">
                Source verification
              </span>

              <span className="font-semibold">95%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HistoricalChart() {
  const points = historicalData
    .map((value, index) => {
      const x = (index / (historicalData.length - 1)) * 800;

      const y = 220 - ((value - 60) / 25) * 180;

      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="relative h-[280px] w-full">
      <svg
        viewBox="0 0 800 240"
        preserveAspectRatio="none"
        className="h-full w-full"
      >
        {[40, 90, 140, 190].map((y) => (
          <line
            key={y}
            x1="0"
            x2="800"
            y1={y}
            y2={y}
            stroke="currentColor"
            className="text-slate-200 dark:text-white/10"
            strokeDasharray="5 5"
          />
        ))}

        <polyline
          points={points}
          fill="none"
          stroke="#0B6B50"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {historicalData.map((value, index) => {
          const x =
            (index / (historicalData.length - 1)) * 800;

          const y = 220 - ((value - 60) / 25) * 180;

          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="3"
              fill="#0B6B50"
            />
          );
        })}
      </svg>

      <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[9px] text-slate-400">
        <span>Aug 1</span>
        <span>Aug 7</span>
        <span>Aug 14</span>
        <span>Aug 21</span>
      </div>
    </div>
  );
}

function AlertCard({ alert }) {
  const critical = alert.severity === "critical";

  return (
    <div className="flex gap-3 border-b border-slate-100 py-4 last:border-0 dark:border-white/10">
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
          critical
            ? "bg-red-50 text-red-500 dark:bg-red-500/10"
            : "bg-amber-50 text-amber-500 dark:bg-amber-500/10"
        }`}
      >
        <CircleAlert size={16} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
            {alert.title}
          </p>

          <span className="shrink-0 text-[9px] text-slate-400">
            {alert.time}
          </span>
        </div>

        <p className="mt-1 text-[10px] leading-4 text-slate-400">
          {alert.description}
        </p>
      </div>
    </div>
  );
}

export default function FactoryDetails() {
  const navigate = useNavigate();

  const theme = useSelector((state) => state.theme.theme);

  const [period, setPeriod] = useState("30 Days");

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      theme === "dark"
    );
  }, [theme]);

  return (
    <div className="min-h-screen bg-[#F7FAF8] font-[Inter,sans-serif] text-slate-900 dark:bg-[#071A15] dark:text-white">
      {/* HEADER */}

      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur-xl dark:border-white/10 dark:bg-[#071A15]/90">
        <div className="mx-auto flex h-[76px] max-w-[1600px] items-center justify-between px-5 lg:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5"
            >
              <ArrowLeft size={17} />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold">
                  Factory Details
                </h1>

                <StatusBadge status="Violation" />
              </div>

              <p className="text-[10px] text-slate-400">
                Environmental intelligence · Live monitoring
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[10px] text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 sm:flex">
              <FileText size={13} />
              Generate Report
            </button>

            <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 dark:border-white/10">
              <Bell size={16} />

              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1600px] p-5 lg:p-8">
        {/* FACTORY HERO */}

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_4px_24px_rgba(15,23,42,0.04)] dark:border-white/10 dark:bg-[#0B241D]">
          <div className="flex flex-col justify-between gap-6 lg:flex-row">
            <div className="flex gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#052E24] text-white shadow-lg">
                <Factory size={28} />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-2xl font-bold">
                    {factoryData.name}
                  </h2>

                  <StatusBadge status="Violation" />
                </div>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {factoryData.company}
                </p>

                <div className="mt-3 flex flex-wrap gap-4 text-[10px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <MapPin size={12} />
                    {factoryData.location}
                  </span>

                  <span className="flex items-center gap-1">
                    <Factory size={12} />
                    {factoryData.industry}
                  </span>

                  <span className="flex items-center gap-1">
                    <Clock3 size={12} />
                    Updated {factoryData.lastUpdated}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div>
                <p className="text-[9px] uppercase tracking-wider text-slate-400">
                  Compliance
                </p>

                <p className="mt-1 text-3xl font-bold text-red-500">
                  {factoryData.compliance}%
                </p>

                <p className="text-[9px] text-red-400">
                  Below required threshold
                </p>
              </div>

              <div className="hidden h-14 w-px bg-slate-200 dark:bg-white/10 sm:block" />

              <div>
                <p className="text-[9px] uppercase tracking-wider text-slate-400">
                  Trust Score
                </p>

                <p className="mt-1 text-3xl font-bold text-emerald-600">
                  {factoryData.confidence}%
                </p>

                <p className="text-[9px] text-emerald-500">
                  High confidence
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* QUICK STATS */}

        <section className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            [
              "Connected Sensors",
              "316",
              "309 active",
              Radio,
            ],
            [
              "Active Alerts",
              "12",
              "3 critical",
              Bell,
            ],
            [
              "Risk Level",
              "HIGH",
              "Increasing",
              CircleAlert,
            ],
            [
              "Monitoring Status",
              "LIVE",
              "Updated 8 sec ago",
              Activity,
            ],
          ].map(([title, value, label, Icon]) => (
            <div
              key={title}
              className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-[#0B241D]"
            >
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-medium text-slate-400">
                  {title}
                </p>

                <Icon size={16} className="text-emerald-600" />
              </div>

              <p className="mt-3 text-xl font-bold">
                {value}
              </p>

              <p className="mt-1 text-[9px] text-slate-400">
                {label}
              </p>
            </div>
          ))}
        </section>

        {/* LIVE EMISSIONS */}

        <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-[#0B241D]">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold">
                  Live Environmental Readings
                </h3>

                <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-semibold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                  LIVE
                </span>
              </div>

              <p className="mt-1 text-[10px] text-slate-400">
                Current readings from connected environmental sensors
              </p>
            </div>

            <span className="flex items-center gap-1 text-[9px] text-slate-400">
              <Clock3 size={11} />
              Last synchronized 8 sec ago
            </span>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            <MetricCard
              title="PM2.5"
              value={factoryData.emissions.pm25.value}
              unit={factoryData.emissions.pm25.unit}
              limit={factoryData.emissions.pm25.limit}
              status={factoryData.emissions.pm25.status}
              icon={Wind}
            />

            <MetricCard
              title="PM10"
              value={factoryData.emissions.pm10.value}
              unit={factoryData.emissions.pm10.unit}
              limit={factoryData.emissions.pm10.limit}
              status={factoryData.emissions.pm10.status}
              icon={Wind}
            />

            <MetricCard
              title="SO₂"
              value={factoryData.emissions.so2.value}
              unit={factoryData.emissions.so2.unit}
              limit={factoryData.emissions.so2.limit}
              status={factoryData.emissions.so2.status}
              icon={Cloud}
            />

            <MetricCard
              title="NOx"
              value={factoryData.emissions.nox.value}
              unit={factoryData.emissions.nox.unit}
              limit={factoryData.emissions.nox.limit}
              status={factoryData.emissions.nox.status}
              icon={Cloud}
            />

            <MetricCard
              title="CO₂"
              value={factoryData.emissions.co2.value}
              unit={factoryData.emissions.co2.unit}
              limit={factoryData.emissions.co2.limit}
              status={factoryData.emissions.co2.status}
              icon={Cloud}
            />

            <MetricCard
              title="Temperature"
              value={factoryData.emissions.temperature.value}
              unit={factoryData.emissions.temperature.unit}
              limit={factoryData.emissions.temperature.limit}
              status={factoryData.emissions.temperature.status}
              icon={Thermometer}
            />
          </div>
        </section>

        {/* HISTORY + TRUST */}

        <section className="mt-5 grid gap-5 xl:grid-cols-[1.6fr_.8fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-[#0B241D]">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-bold">
                  Historical Compliance Trend
                </h3>

                <p className="mt-1 text-[10px] text-slate-400">
                  How factory compliance has changed over time
                </p>
              </div>

              <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-[9px] text-slate-500 dark:border-white/10 dark:text-slate-300">
                {period}
                <ChevronDown size={12} />
              </button>
            </div>

            <div className="mt-4 flex items-end gap-3">
              <span className="text-3xl font-bold">
                72.1%
              </span>

              <span className="mb-1 flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-[9px] font-semibold text-red-500 dark:bg-red-500/10">
                <TrendingDown size={11} />
                -8.4%
              </span>
            </div>

            <HistoricalChart />
          </div>

          <TrustScore />
        </section>

        {/* ECO TRUST ANALYSIS */}

        <section className="mt-5 rounded-2xl border border-emerald-200 bg-[#F1FBF6] p-6 dark:border-emerald-500/20 dark:bg-emerald-500/[0.04]">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0B6B50] text-white">
              <Gauge size={21} />
            </div>

            <div>
              <p className="text-[9px] font-semibold uppercase tracking-widest text-emerald-600">
                EcoTrust Intelligence
              </p>

              <h3 className="mt-1 text-base font-bold">
                High pollution risk detected
              </h3>

              <p className="mt-2 max-w-4xl text-[11px] leading-5 text-slate-500 dark:text-slate-400">
                PM2.5 and PM10 emissions are currently above the
                permitted threshold. Historical analysis shows that
                pollution levels have increased over the last several
                weeks. EcoTrust identifies this factory as a
                high-priority compliance risk.
              </p>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-emerald-100 bg-white p-3 dark:border-white/10 dark:bg-white/5">
                  <p className="text-[9px] text-slate-400">
                    Current Risk
                  </p>

                  <p className="mt-1 text-sm font-bold text-red-500">
                    HIGH
                  </p>
                </div>

                <div className="rounded-xl border border-emerald-100 bg-white p-3 dark:border-white/10 dark:bg-white/5">
                  <p className="text-[9px] text-slate-400">
                    Trend
                  </p>

                  <p className="mt-1 flex items-center gap-1 text-sm font-bold text-red-500">
                    <TrendingUp size={14} />
                    Increasing
                  </p>
                </div>

                <div className="rounded-xl border border-emerald-100 bg-white p-3 dark:border-white/10 dark:bg-white/5">
                  <p className="text-[9px] text-slate-400">
                    Data Confidence
                  </p>

                  <p className="mt-1 text-sm font-bold text-emerald-600">
                    94.8%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ALERTS + SENSOR HEALTH */}

        <section className="mt-5 grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-[#0B241D]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold">
                  Recent Alerts
                </h3>

                <p className="mt-1 text-[10px] text-slate-400">
                  Events detected by EcoTrust
                </p>
              </div>

              <Bell size={17} className="text-red-500" />
            </div>

            <div className="mt-3">
              {alerts.map((alert, index) => (
                <AlertCard
                  key={`${alert.title}-${index}`}
                  alert={alert}
                />
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-[#0B241D]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold">
                  Sensor Health
                </h3>

                <p className="mt-1 text-[10px] text-slate-400">
                  Reliability of connected monitoring devices
                </p>
              </div>

              <Cpu size={17} className="text-emerald-600" />
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3">
              <div className="rounded-xl bg-emerald-50 p-4 dark:bg-emerald-500/10">
                <p className="text-[9px] text-slate-400">
                  Active
                </p>

                <p className="mt-1 text-xl font-bold text-emerald-600">
                  309
                </p>
              </div>

              <div className="rounded-xl bg-red-50 p-4 dark:bg-red-500/10">
                <p className="text-[9px] text-slate-400">
                  Offline
                </p>

                <p className="mt-1 text-xl font-bold text-red-500">
                  7
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4 dark:bg-white/5">
                <p className="text-[9px] text-slate-400">
                  Health
                </p>

                <p className="mt-1 text-xl font-bold">
                  97.8%
                </p>
              </div>
            </div>

            <div className="mt-5">
              <div className="flex justify-between text-[9px]">
                <span className="text-slate-400">
                  Overall sensor health
                </span>

                <span className="font-semibold">
                  97.8%
                </span>
              </div>

              <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
                <div
                  className="h-full rounded-full bg-emerald-500"
                  style={{ width: "97.8%" }}
                />
              </div>
            </div>

            <div className="mt-5 flex items-center gap-3 rounded-xl border border-slate-100 p-3 dark:border-white/10">
              <Database
                size={16}
                className="text-emerald-600"
              />

              <div>
                <p className="text-[10px] font-semibold">
                  Data pipeline operational
                </p>

                <p className="mt-0.5 text-[9px] text-slate-400">
                  Sensor → Validation → Confidence → Analysis
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FACTORY INFORMATION */}

        <section className="mt-5 grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-[#0B241D]">
            <div className="flex items-center gap-2">
              <Factory size={17} className="text-emerald-600" />

              <h3 className="text-sm font-bold">
                Factory Information
              </h3>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4">
              {[
                ["Industry", factoryData.industry],
                ["Category", factoryData.category],
                ["Established", factoryData.established],
                ["Location", factoryData.location],
                ["Coordinates", factoryData.coordinates],
                ["Address", factoryData.address],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-[9px] uppercase tracking-wider text-slate-400">
                    {label}
                  </p>

                  <p className="mt-1 text-xs font-semibold text-slate-700 dark:text-slate-200">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-[#0B241D]">
            <div className="flex items-center gap-2">
              <ShieldCheck
                size={17}
                className="text-emerald-600"
              />

              <h3 className="text-sm font-bold">
                Compliance Summary
              </h3>
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <div className="flex justify-between text-[10px]">
                  <span className="text-slate-400">
                    Overall compliance
                  </span>

                  <span className="font-bold text-red-500">
                    72.1%
                  </span>
                </div>

                <div className="mt-2 h-2 rounded-full bg-slate-100 dark:bg-white/10">
                  <div
                    className="h-full rounded-full bg-red-500"
                    style={{ width: "72.1%" }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-red-50 p-4 dark:bg-red-500/10">
                <div className="flex items-center gap-3">
                  <CircleAlert
                    size={18}
                    className="text-red-500"
                  />

                  <div>
                    <p className="text-xs font-bold text-red-700 dark:text-red-300">
                      Compliance review required
                    </p>

                    <p className="mt-1 text-[9px] text-red-500/70">
                      3 environmental parameters exceed limits
                    </p>
                  </div>
                </div>

                <button className="rounded-lg bg-red-500 px-3 py-2 text-[9px] font-semibold text-white">
                  Review
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}