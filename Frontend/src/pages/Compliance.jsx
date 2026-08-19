import {
  Bell,
  CheckCircle2,
  ChevronDown,
  CircleAlert,
  ClipboardCheck,
  Factory,
  FileCheck2,
  Gauge,
  LayoutDashboard,
  Leaf,
  LineChart,
  MapPin,
  Menu,
  Radio,
  Settings,
  ShieldCheck,
  TrendingUp,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const complianceStats = [
  {
    title: 'Overall Compliance',
    value: '98.7%',
    change: '+2.4%',
    label: 'vs last month',
    icon: ShieldCheck,
    type: 'green',
  },
  {
    title: 'Compliant Plants',
    value: '518',
    change: '98.8%',
    label: 'of 524 plants',
    icon: Factory,
    type: 'blue',
  },
  {
    title: 'Open Violations',
    value: '6',
    change: '-3',
    label: 'vs last month',
    icon: CircleAlert,
    type: 'red',
  },
  {
    title: 'Reports Submitted',
    value: '96%',
    change: '48 / 50',
    label: 'this period',
    icon: FileCheck2,
    type: 'amber',
  },
];

const parameters = [
  {
    name: 'PM2.5',
    compliance: 99.2,
    limit: '60 µg/m³',
    readings: '12,482',
    status: 'Compliant',
  },
  {
    name: 'PM10',
    compliance: 98.6,
    limit: '100 µg/m³',
    readings: '12,482',
    status: 'Compliant',
  },
  {
    name: 'SO₂',
    compliance: 99.4,
    limit: '80 ppb',
    readings: '11,936',
    status: 'Compliant',
  },
  {
    name: 'NOx',
    compliance: 97.8,
    limit: '100 ppb',
    readings: '11,824',
    status: 'Compliant',
  },
  {
    name: 'CO₂',
    compliance: 98.1,
    limit: '1000 ppm',
    readings: '12,104',
    status: 'Compliant',
  },
];

const plants = [
  {
    name: 'Plant A',
    location: 'Delhi NCR',
    score: 99.2,
    status: 'Compliant',
    violations: 0,
    reporting: '100%',
    parameters: [
      { name: 'PM2.5', compliance: 99.8, limit: '60 µg/m³', readings: '3,240' },
      { name: 'PM10', compliance: 99.4, limit: '100 µg/m³', readings: '3,240' },
      { name: 'SO₂', compliance: 99.7, limit: '80 ppb', readings: '3,120' },
      { name: 'NOx', compliance: 98.9, limit: '100 ppb', readings: '3,118' },
      { name: 'CO₂', compliance: 99.2, limit: '1000 ppm', readings: '3,205' },
    ],
  },
  {
    name: 'Plant B',
    location: 'Uttar Pradesh',
    score: 97.4,
    status: 'Review Required',
    violations: 2,
    reporting: '96%',
    parameters: [
      { name: 'PM2.5', compliance: 95.6, limit: '60 µg/m³', readings: '2,940' },
      { name: 'PM10', compliance: 97.1, limit: '100 µg/m³', readings: '2,940' },
      { name: 'SO₂', compliance: 98.4, limit: '80 ppb', readings: '2,882' },
      { name: 'NOx', compliance: 96.2, limit: '100 ppb', readings: '2,875' },
      { name: 'CO₂', compliance: 98.0, limit: '1000 ppm', readings: '2,910' },
    ],
  },
  {
    name: 'Plant C',
    location: 'Maharashtra',
    score: 99.6,
    status: 'Compliant',
    violations: 0,
    reporting: '100%',
    parameters: [
      { name: 'PM2.5', compliance: 99.9, limit: '60 µg/m³', readings: '4,112' },
      { name: 'PM10', compliance: 99.5, limit: '100 µg/m³', readings: '4,112' },
      { name: 'SO₂', compliance: 99.8, limit: '80 ppb', readings: '4,080' },
      { name: 'NOx', compliance: 99.2, limit: '100 ppb', readings: '4,074' },
      { name: 'CO₂', compliance: 99.6, limit: '1000 ppm', readings: '4,098' },
    ],
  },
  {
    name: 'Plant D',
    location: 'Rajasthan',
    score: 96.8,
    status: 'Review Required',
    violations: 4,
    reporting: '92%',
    parameters: [
      { name: 'PM2.5', compliance: 94.2, limit: '60 µg/m³', readings: '2,730' },
      { name: 'PM10', compliance: 95.8, limit: '100 µg/m³', readings: '2,730' },
      { name: 'SO₂', compliance: 97.1, limit: '80 ppb', readings: '2,690' },
      { name: 'NOx', compliance: 94.6, limit: '100 ppb', readings: '2,684' },
      { name: 'CO₂', compliance: 98.3, limit: '1000 ppm', readings: '2,710' },
    ],
  },
];

const violations = [
  {
    id: 'VIO-1024',
    title: 'PM2.5 threshold exceeded',
    plant: 'Plant B · Unit 1',
    value: '78.4 µg/m³',
    limit: '60 µg/m³',
    time: 'Today, 14:32',
    severity: 'Critical',
  },
  {
    id: 'VIO-1023',
    title: 'NOx emission limit exceeded',
    plant: 'Plant D · Unit 2',
    value: '118 ppb',
    limit: '100 ppb',
    time: 'Today, 11:18',
    severity: 'Warning',
  },
  {
    id: 'VIO-1022',
    title: 'Delayed compliance report',
    plant: 'Plant D · Unit 1',
    value: '2 days late',
    limit: '0 days',
    time: 'Yesterday',
    severity: 'Warning',
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
      active:true
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
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-[250px]
        flex-col bg-[#052E24] text-white transition-transform duration-300
        ${open ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0`}
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
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
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

          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/55 hover:bg-white/5 hover:text-white">
            <Settings size={18} />
            Settings
          </button>
        </div>

        <div className="shrink-0 border-t border-white/10 p-4">
          <div className="rounded-xl bg-white/5 p-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              <span className="text-xs font-medium">
                Compliance engine active
              </span>
            </div>

            <p className="mt-2 text-[10px] text-white/40">
              Regulations synchronized
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

function StatCard({ stat }) {
  const Icon = stat.icon;

  const styles = {
    green: 'bg-emerald-50 text-[#0B6B50]',
    red: 'bg-red-50 text-red-500',
    amber: 'bg-amber-50 text-amber-600',
    blue: 'bg-blue-50 text-blue-500',
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.03)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500">{stat.title}</p>

          <h3 className="mt-2 text-2xl font-bold tracking-tight">
            {stat.value}
          </h3>

          <div className="mt-3 flex items-center gap-2 text-[10px]">
            <span
              className={`font-semibold ${
                stat.type === 'red' ? 'text-red-500' : 'text-emerald-600'
              }`}
            >
              {stat.change}
            </span>

            <span className="text-slate-400">{stat.label}</span>
          </div>
        </div>

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${styles[stat.type]}`}
        >
          <Icon size={19} />
        </div>
      </div>
    </div>
  );
}

function ComplianceGauge({ score = 98.7 }) {
  return (
    <div className="relative mx-auto h-[190px] w-[190px]">
      <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90">
        <circle
          cx="100"
          cy="100"
          r="78"
          fill="none"
          stroke="#E2E8F0"
          strokeWidth="14"
        />

        <circle
          cx="100"
          cy="100"
          r="78"
          fill="none"
          stroke="#0B6B50"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray="490"
          strokeDashoffset={490 - (490 * score) / 100}
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold">{score}%</span>

        <span className="mt-1 text-[10px] text-slate-400">Plant score</span>
      </div>
    </div>
  );
}

function TrendChart() {
  return (
    <div className="relative h-[250px] w-full">
      <svg
        viewBox="0 0 800 250"
        preserveAspectRatio="none"
        className="h-full w-full"
      >
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
          d="M0 180
             C60 170 80 150 130 158
             C180 165 205 120 255 135
             C305 150 330 108 380 118
             C430 128 450 92 500 105
             C550 118 580 70 625 82
             C670 94 710 52 755 60
             C775 63 790 45 800 38"
          fill="none"
          stroke="#0B6B50"
          strokeWidth="3"
        />

        <circle cx="800" cy="38" r="5" fill="#0B6B50" />
      </svg>

      <div className="absolute bottom-0 left-0 flex w-full justify-between text-[9px] text-slate-400">
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

function ParameterRow({ parameter }) {
  return (
    <div className="rounded-xl border border-slate-100 p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-slate-700">
            {parameter.name}
          </p>

          <p className="mt-1 text-[9px] text-slate-400">
            Limit: {parameter.limit}
          </p>
        </div>

        <div className="text-right">
          <p className="font-mono text-sm font-semibold text-emerald-600">
            {parameter.compliance}%
          </p>

          <p className="text-[9px] text-slate-400">
            {parameter.readings} readings
          </p>
        </div>
      </div>

      <div className="mt-3 h-1.5 rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-[#0B6B50]"
          style={{
            width: `${parameter.compliance}%`,
          }}
        />
      </div>
    </div>
  );
}

function ViolationRow({ violation }) {
  return (
    <div className="flex gap-3 border-b border-slate-100 py-4 last:border-0">
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
          violation.severity === 'Critical'
            ? 'bg-red-50 text-red-500'
            : 'bg-amber-50 text-amber-500'
        }`}
      >
        <CircleAlert size={17} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-slate-700">
              {violation.title}
            </p>

            <p className="mt-1 text-[9px] text-slate-400">
              {violation.id} · {violation.plant}
            </p>
          </div>

          <span
            className={`h-fit rounded-full px-2 py-1 text-[8px] font-semibold ${
              violation.severity === 'Critical'
                ? 'bg-red-50 text-red-600'
                : 'bg-amber-50 text-amber-600'
            }`}
          >
            {violation.severity}
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="font-mono text-[10px] text-slate-500">
            {violation.value}
            <span className="mx-1 text-slate-300">vs</span>
            {violation.limit}
          </span>

          <span className="text-[9px] text-slate-400">{violation.time}</span>
        </div>
      </div>
    </div>
  );
}

export default function Compliance() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(plants[0]);

  const selectedViolations = violations.filter((violation) =>
    violation.plant.startsWith(selectedPlant.name)
  );

  return (
    <div className="min-h-screen bg-[#F7FAF8] font-[Inter,sans-serif] text-[#0F172A]">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Main content */}
      <div className="min-w-0 lg:ml-[250px]">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-slate-200 bg-white/90 px-5 backdrop-blur-xl lg:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"
            >
              <Menu size={21} />
            </button>

            <div>
              <h1 className="text-lg font-bold">Compliance</h1>

              <p className="hidden text-[10px] text-slate-400 sm:block">
                Environmental compliance and regulatory readiness
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-[10px] font-semibold text-emerald-700 sm:flex">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Compliance healthy
            </div>

            <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500">
              <Bell size={17} />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
            </button>

            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0B6B50] text-xs font-bold text-white">
                VB
              </div>

              <div className="hidden sm:block">
                <p className="text-xs font-semibold">Admin</p>

                <p className="text-[9px] text-slate-400">
                  Environmental Officer
                </p>
              </div>

              <ChevronDown
                size={14}
                className="hidden text-slate-400 sm:block"
              />
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1600px] p-5 lg:p-8">
          {/* Heading */}
          <div className="mb-7 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-bold text-emerald-600">
                  <CheckCircle2 size={11} />
                  COMPLIANCE MONITORED
                </span>
              </div>

              <h2 className="mt-3 text-2xl font-bold tracking-tight">
                Environmental Compliance
              </h2>

              <p className="mt-1 max-w-2xl text-sm text-slate-500">
                Monitor regulatory compliance, emission limits, violations and
                reporting status across all facilities.
              </p>
            </div>

            <div className="flex gap-2">
              <div className="relative">
                <select
                  value={selectedPlant.name}
                  onChange={(e) =>
                    setSelectedPlant(
                      plants.find((plant) => plant.name === e.target.value) || plants[0]
                    )
                  }
                  className="appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-8 text-xs font-medium text-slate-600 outline-none focus:border-[#0B6B50]"
                >
                  {plants.map((plant) => (
                    <option key={plant.name} value={plant.name}>
                      {plant.name}
                    </option>
                  ))}
                </select>
                <MapPin
                  size={14}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <ChevronDown
                  size={12}
                  className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>

              <button className="flex items-center gap-2 rounded-lg bg-[#0B6B50] px-4 py-2 text-xs font-semibold text-white">
                <FileCheck2 size={14} />
                Generate Report
              </button>
            </div>
          </div>

          {/* Stats */}
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {complianceStats.map((stat) => (
              <StatCard key={stat.title} stat={stat} />
            ))}
          </section>

          {/* Score + Trend */}
          <section className="mt-5 grid gap-5 xl:grid-cols-[.7fr_1.3fr]">
            {/* Score */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.03)]">
              <div>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold">Compliance Health</h3>
                    <p className="mt-1 text-[11px] text-slate-400">
                      {selectedPlant.name} · {selectedPlant.location}
                    </p>
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-[9px] font-semibold ${
                    selectedPlant.status === 'Compliant'
                      ? 'bg-emerald-50 text-emerald-600'
                      : 'bg-amber-50 text-amber-600'
                  }`}>
                    {selectedPlant.status}
                  </span>
                </div>
              </div>

              <ComplianceGauge score={selectedPlant.score} />

              <div className="grid grid-cols-3 border-t border-slate-100 pt-4 text-center">
                <div>
                  <p className="text-lg font-bold text-emerald-600">{selectedPlant.score}%</p>
                  <p className="text-[9px] text-slate-400">Score</p>
                </div>
                <div className="border-x border-slate-100">
                  <p className="text-lg font-bold text-amber-500">{selectedPlant.violations}</p>
                  <p className="text-[9px] text-slate-400">Violations</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-blue-500">{selectedPlant.reporting}</p>
                  <p className="text-[9px] text-slate-400">Reporting</p>
                </div>
              </div>
            </div>

            {/* Trend */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.03)]">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold">Compliance Trend</h3>

                    <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[8px] font-semibold text-emerald-600">
                      <TrendingUp size={10} />
                      Improving
                    </span>
                  </div>

                  <p className="mt-1 text-[11px] text-slate-400">
                    Compliance score over the last 7 days
                  </p>
                </div>

                <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-[10px] text-slate-500">
                  7 Days
                  <ChevronDown size={11} />
                </button>
              </div>

              <div className="mt-4 flex items-end gap-3">
                <span className="text-3xl font-bold">98.7%</span>

                <span className="mb-1 rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-semibold text-emerald-600">
                  +2.4%
                </span>
              </div>

              <TrendChart />
            </div>
          </section>

          {/* Parameters */}
          <section className="mt-5 grid gap-5 xl:grid-cols-[1.2fr_.8fr]">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.03)]">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold">{selectedPlant.name} Parameter Compliance</h3>

                  <p className="mt-1 text-[11px] text-slate-400">
                    Compliance against configured emission limits
                  </p>
                </div>

                <button className="text-[10px] font-semibold text-[#0B6B50]">
                  View all →
                </button>
              </div>

              <div className="mt-5 space-y-3">
                {selectedPlant.parameters.map((parameter) => (
                  <ParameterRow key={parameter.name} parameter={parameter} />
                ))}
              </div>
            </div>

            {/* Violations */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.03)]">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold">{selectedPlant.name} Recent Violations</h3>

                  <p className="mt-1 text-[11px] text-slate-400">
                    Issues requiring review
                  </p>
                </div>

                <button className="text-[10px] font-semibold text-[#0B6B50]">
                  View all →
                </button>
              </div>

              <div className="mt-3">
                {selectedViolations.length > 0 ? (
                  selectedViolations.map((violation) => (
                    <ViolationRow key={violation.id} violation={violation} />
                  ))
                ) : (
                  <div className="py-10 text-center">
                    <CheckCircle2 size={28} className="mx-auto text-emerald-500" />
                    <p className="mt-3 text-xs font-semibold text-slate-700">
                      No active violations
                    </p>
                    <p className="mt-1 text-[10px] text-slate-400">
                      {selectedPlant.name} is within configured limits.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Selected plant summary */}
          <section className="mt-5 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0B6B50] text-white">
                  <Factory size={19} />
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-emerald-700">
                    Currently viewing
                  </p>
                  <h3 className="mt-1 text-base font-bold text-[#064E3B]">
                    {selectedPlant.name}
                  </h3>
                  <p className="mt-0.5 text-[10px] text-emerald-700/70">
                    {selectedPlant.location} · {selectedPlant.score}% compliance · {selectedPlant.violations} violations
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="rounded-xl bg-white px-4 py-2.5">
                  <p className="text-lg font-bold text-[#0B6B50]">{selectedPlant.score}%</p>
                  <p className="text-[8px] text-slate-400">Compliance</p>
                </div>
                <div className="rounded-xl bg-white px-4 py-2.5">
                  <p className={`text-lg font-bold ${
                    selectedPlant.violations > 0 ? 'text-red-500' : 'text-emerald-600'
                  }`}>
                    {selectedPlant.violations}
                  </p>
                  <p className="text-[8px] text-slate-400">Violations</p>
                </div>
              </div>
            </div>
          </section>

          {/* Plant compliance */}
          <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.03)]">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h3 className="text-sm font-bold">Plant-wise Compliance</h3>

                <p className="mt-1 text-[11px] text-slate-400">
                  Compliance health across monitored facilities
                </p>
              </div>

              <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-[10px] text-slate-500">
                Sort by
                <span className="font-semibold">Score</span>
                <ChevronDown size={11} />
              </button>
            </div>

            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="border-b border-slate-100 text-left text-[9px] text-slate-400">
                    <th className="pb-3 font-medium">Facility</th>

                    <th className="pb-3 font-medium">Compliance Score</th>

                    <th className="pb-3 font-medium">Status</th>

                    <th className="pb-3 font-medium">Violations</th>

                    <th className="pb-3 text-right font-medium">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {plants.map((plant) => (
                    <tr
                      key={plant.name}
                      className="border-b border-slate-50 last:border-0"
                    >
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-[#0B6B50]">
                            <Factory size={16} />
                          </div>

                          <div>
                            <p className="text-xs font-semibold">
                              {plant.name}
                            </p>

                            <p className="mt-0.5 flex items-center gap-1 text-[9px] text-slate-400">
                              <MapPin size={9} />
                              {plant.location}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs font-semibold">
                            {plant.score}%
                          </span>

                          <div className="h-1.5 w-24 rounded-full bg-slate-100">
                            <div
                              className="h-full rounded-full bg-[#10B981]"
                              style={{
                                width: `${plant.score}%`,
                              }}
                            />
                          </div>
                        </div>
                      </td>

                      <td className="py-4">
                        <span
                          className={`rounded-full px-2.5 py-1 text-[9px] font-semibold ${
                            plant.status === 'Compliant'
                              ? 'bg-emerald-50 text-emerald-600'
                              : 'bg-amber-50 text-amber-600'
                          }`}
                        >
                          {plant.status}
                        </span>
                      </td>

                      <td className="py-4">
                        <span
                          className={`font-mono text-xs font-semibold ${
                            plant.violations > 0
                              ? 'text-red-500'
                              : 'text-emerald-600'
                          }`}
                        >
                          {plant.violations}
                        </span>
                      </td>

                      <td className="py-4 text-right">
                        <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-[9px] font-semibold text-slate-600 hover:bg-slate-50">
                          Review
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Reporting */}
          <section className="mt-5 grid gap-5 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-[#0B6B50]">
                  <ClipboardCheck size={19} />
                </div>

                <div>
                  <h3 className="text-sm font-bold">Regulatory Reporting</h3>

                  <p className="mt-1 text-[10px] text-slate-400">
                    Submission status for current reporting period
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-end justify-between">
                  <span className="text-2xl font-bold">96%</span>

                  <span className="text-[10px] text-slate-400">
                    48 of 50 submitted
                  </span>
                </div>

                <div className="mt-3 h-2 rounded-full bg-slate-100">
                  <div className="h-full w-[96%] rounded-full bg-[#0B6B50]" />
                </div>
              </div>

              <button className="mt-5 w-full rounded-lg border border-slate-200 py-2.5 text-[10px] font-semibold text-slate-600 hover:bg-slate-50">
                Manage Reports
              </button>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-500">
                  <FileCheck2 size={19} />
                </div>

                <div>
                  <h3 className="text-sm font-bold">
                    Compliance Documentation
                  </h3>

                  <p className="mt-1 text-[10px] text-slate-400">
                    Required regulatory documents and certificates
                  </p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3">
                <div className="rounded-xl bg-emerald-50 p-3 text-center">
                  <p className="text-lg font-bold text-emerald-600">42</p>
                  <p className="text-[8px] text-emerald-700">Valid</p>
                </div>

                <div className="rounded-xl bg-amber-50 p-3 text-center">
                  <p className="text-lg font-bold text-amber-600">3</p>
                  <p className="text-[8px] text-amber-700">Expiring</p>
                </div>

                <div className="rounded-xl bg-red-50 p-3 text-center">
                  <p className="text-lg font-bold text-red-500">1</p>
                  <p className="text-[8px] text-red-600">Missing</p>
                </div>
              </div>

              <button className="mt-5 w-full rounded-lg border border-slate-200 py-2.5 text-[10px] font-semibold text-slate-600 hover:bg-slate-50">
                Manage Documents
              </button>
            </div>
          </section>

          {/* Footer status */}
          <section className="mt-5 flex flex-col gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-5 sm:flex-row sm:items-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
              <ShieldCheck size={19} />
            </div>

            <div className="flex-1">
              <p className="text-xs font-bold text-emerald-800">
                Compliance monitoring is active
              </p>

              <p className="mt-1 text-[10px] text-emerald-700/70">
                EcoTrust is continuously evaluating environmental readings
                against configured compliance thresholds.
              </p>
            </div>

            <span className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[9px] font-semibold text-emerald-600">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              System Active
            </span>
          </section>
        </main>
      </div>
    </div>
  );
}
