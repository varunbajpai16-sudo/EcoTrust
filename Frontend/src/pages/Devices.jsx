import {
  Bell,
  CheckCircle2,
  ChevronDown,
  CircleAlert,
  Cpu,
  Download,
  Edit3,
  Factory,
  Filter,
  Gauge,
  LayoutDashboard,
  Leaf,
  LineChart,
  Menu,
  Plus,
  Radio,
  RefreshCw,
  Search,
  Settings,
  ShieldCheck,
  Signal,
  Thermometer,
  Wifi,
  X,
  Zap,
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
const devices = [
  {
    id: 'CEMS-A-001',
    name: 'CEMS Stack Monitor',
    type: 'CEMS',
    plant: 'Plant A',
    unit: 'Unit 2',
    parameter: 'PM2.5 / PM10',
    status: 'Online',
    quality: '99.8%',
    lastSeen: 'Just now',
    firmware: 'v2.4.1',
  },
  {
    id: 'CEMS-A-002',
    name: 'Gas Emission Monitor',
    type: 'CEMS',
    plant: 'Plant A',
    unit: 'Unit 1',
    parameter: 'SO₂ / NOx',
    status: 'Online',
    quality: '99.4%',
    lastSeen: '10 sec ago',
    firmware: 'v2.4.1',
  },
  {
    id: 'CEQMS-B-014',
    name: 'Ambient Air Monitor',
    type: 'CEQMS',
    plant: 'Plant B',
    unit: 'Station 1',
    parameter: 'PM2.5 / AQI',
    status: 'Warning',
    quality: '94.2%',
    lastSeen: '2 min ago',
    firmware: 'v1.8.3',
  },
  {
    id: 'CEMS-B-021',
    name: 'Stack Gas Analyzer',
    type: 'CEMS',
    plant: 'Plant B',
    unit: 'Unit 3',
    parameter: 'CO₂ / NOx',
    status: 'Offline',
    quality: '—',
    lastSeen: '18 min ago',
    firmware: 'v2.3.8',
  },
  {
    id: 'CEQMS-C-007',
    name: 'Environmental Station',
    type: 'CEQMS',
    plant: 'Plant C',
    unit: 'Station 2',
    parameter: 'PM10 / SO₂',
    status: 'Online',
    quality: '98.9%',
    lastSeen: '20 sec ago',
    firmware: 'v1.9.0',
  },
  {
    id: 'CEMS-D-011',
    name: 'Emission Analyzer',
    type: 'CEMS',
    plant: 'Plant D',
    unit: 'Unit 1',
    parameter: 'NOx / CO₂',
    status: 'Warning',
    quality: '91.6%',
    lastSeen: '1 min ago',
    firmware: 'v2.4.0',
  },
];

const stats = [
  {
    title: 'Total Devices',
    value: '10,248',
    detail: 'Across all facilities',
    icon: Cpu,
    type: 'green',
  },
  {
    title: 'Online',
    value: '10,112',
    detail: '98.7% connected',
    icon: Wifi,
    type: 'blue',
  },
  {
    title: 'Warnings',
    value: '84',
    detail: 'Need attention',
    icon: CircleAlert,
    type: 'amber',
  },
  {
    title: 'Offline',
    value: '52',
    detail: 'Require investigation',
    icon: Signal,
    type: 'red',
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
    },
    {
      name: 'Devices',
      icon: Radio,
      path: '/devices',
       active:true
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

              <span className="text-xs font-medium">Device manager active</span>
            </div>

            <p className="mt-2 text-[10px] text-white/40">
              Device status synchronized
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
    blue: 'bg-blue-50 text-blue-500',
    amber: 'bg-amber-50 text-amber-500',
    red: 'bg-red-50 text-red-500',
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.03)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500">{stat.title}</p>

          <p className="mt-2 text-2xl font-bold tracking-tight">{stat.value}</p>

          <p className="mt-2 text-[10px] text-slate-400">{stat.detail}</p>
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

function StatusBadge({ status }) {
  const styles = {
    Online: 'bg-emerald-50 text-emerald-600',
    Warning: 'bg-amber-50 text-amber-600',
    Offline: 'bg-red-50 text-red-600',
  };

  const dots = {
    Online: 'bg-emerald-500',
    Warning: 'bg-amber-500',
    Offline: 'bg-red-500',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] font-semibold ${styles[status]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dots[status]}`} />

      {status}
    </span>
  );
}

function DeviceTypeBadge({ type }) {
  return (
    <span
      className={`rounded-md px-2 py-1 text-[8px] font-bold ${
        type === 'CEMS'
          ? 'bg-emerald-50 text-[#0B6B50]'
          : 'bg-blue-50 text-blue-600'
      }`}
    >
      {type}
    </span>
  );
}

function DeviceHealth({ quality }) {
  if (quality === '—') {
    return <span className="font-mono text-[10px] text-slate-400">—</span>;
  }

  const number = parseFloat(quality);

  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-[10px] font-semibold text-slate-600">
        {quality}
      </span>

      <div className="h-1.5 w-16 rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full ${
            number >= 98
              ? 'bg-[#10B981]'
              : number >= 94
                ? 'bg-[#F59E0B]'
                : 'bg-[#EF4444]'
          }`}
          style={{ width: `${number}%` }}
        />
      </div>
    </div>
  );
}

export default function Devices() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [selectedPlant, setSelectedPlant] = useState('Plant A');

  const plantNames = ['Plant A', 'Plant B', 'Plant C', 'Plant D'];

  const plantDevices = devices.filter((device) => device.plant === selectedPlant);

  const selectedStats = {
    total: plantDevices.length,
    online: plantDevices.filter((device) => device.status === 'Online').length,
    warning: plantDevices.filter((device) => device.status === 'Warning').length,
    offline: plantDevices.filter((device) => device.status === 'Offline').length,
  };

  const filteredDevices = plantDevices.filter((device) => {
    const matchesSearch =
      device.id.toLowerCase().includes(search.toLowerCase()) ||
      device.name.toLowerCase().includes(search.toLowerCase()) ||
      device.plant.toLowerCase().includes(search.toLowerCase());

    const matchesFilter = filter === 'All' || device.status === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-[#F7FAF8] font-[Inter,sans-serif] text-[#0F172A]">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

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
              <h1 className="text-lg font-bold">Devices</h1>

              <p className="hidden text-[10px] text-slate-400 sm:block">
                CEMS, CEQMS and environmental sensor management
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-[10px] font-semibold text-emerald-700 sm:flex">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              98.7% devices online
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
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-bold text-emerald-600">
                <Cpu size={11} />
                DEVICE MANAGEMENT
              </span>

              <h2 className="mt-3 text-2xl font-bold tracking-tight">
                Environmental Devices
              </h2>

              <p className="mt-1 max-w-2xl text-sm text-slate-500">
                Monitor connected CEMS, CEQMS and environmental sensors, their
                health, connectivity and data quality.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <select
                  value={selectedPlant}
                  onChange={(e) => {
                    setSelectedPlant(e.target.value);
                    setSearch('');
                    setFilter('All');
                  }}
                  className="appearance-none rounded-lg border border-slate-200 bg-white py-2.5 pl-3 pr-9 text-xs font-semibold text-slate-600 outline-none focus:border-[#0B6B50]"
                >
                  {plantNames.map((plant) => (
                    <option key={plant} value={plant}>
                      {plant}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={13}
                  className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>

              <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-xs font-medium text-slate-600">
                <RefreshCw size={14} />
                Sync Devices
              </button>

              <button className="flex items-center gap-2 rounded-lg bg-[#0B6B50] px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-emerald-900/10">
                <Plus size={14} />
                Add Device
              </button>
            </div>
          </div>

          {/* Selected plant */}
          <section className="mb-5 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0B6B50] text-white">
                  <Factory size={19} />
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-emerald-700">
                    Currently viewing devices
                  </p>
                  <h3 className="mt-1 text-base font-bold text-[#064E3B]">
                    {selectedPlant}
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded-xl bg-white px-4 py-2.5">
                  <p className="text-lg font-bold text-[#0B6B50]">{selectedStats.total}</p>
                  <p className="text-[8px] text-slate-400">Devices</p>
                </div>
                <div className="rounded-xl bg-white px-4 py-2.5">
                  <p className="text-lg font-bold text-emerald-600">{selectedStats.online}</p>
                  <p className="text-[8px] text-slate-400">Online</p>
                </div>
                <div className="rounded-xl bg-white px-4 py-2.5">
                  <p className={`text-lg font-bold ${
                    selectedStats.offline > 0 ? 'text-red-500' : 'text-slate-600'
                  }`}>
                    {selectedStats.offline}
                  </p>
                  <p className="text-[8px] text-slate-400">Offline</p>
                </div>
              </div>
            </div>
          </section>

          {/* Stats */}
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              stat={{
                title: 'Total Devices',
                value: selectedStats.total,
                detail: `Installed at ${selectedPlant}`,
                icon: Cpu,
                type: 'green',
              }}
            />
            <StatCard
              stat={{
                title: 'Online',
                value: selectedStats.online,
                detail: selectedStats.total
                  ? `${Math.round((selectedStats.online / selectedStats.total) * 100)}% connected`
                  : '0% connected',
                icon: Wifi,
                type: 'blue',
              }}
            />
            <StatCard
              stat={{
                title: 'Warnings',
                value: selectedStats.warning,
                detail: 'Need attention',
                icon: CircleAlert,
                type: 'amber',
              }}
            />
            <StatCard
              stat={{
                title: 'Offline',
                value: selectedStats.offline,
                detail: 'Require investigation',
                icon: Signal,
                type: 'red',
              }}
            />
          </section>

          {/* Device health */}
          <section className="mt-5 grid gap-5 xl:grid-cols-[1.2fr_.8fr]">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.03)]">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold">Device Network Health</h3>

                  <p className="mt-1 text-[11px] text-slate-400">
                    {selectedPlant} device connectivity and health
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-[#0B6B50]">
                  <Signal size={18} />
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-end justify-between">
                  <div>
                    <span className="font-mono text-3xl font-semibold">
                      {selectedStats.total
                        ? `${Math.round((selectedStats.online / selectedStats.total) * 1000) / 10}%`
                        : '0%'}
                    </span>

                    <p className="mt-1 text-[10px] text-slate-400">
                      {selectedPlant} connectivity
                    </p>
                  </div>

                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-semibold text-emerald-600">
                    Healthy
                  </span>
                </div>

                <div className="mt-5 flex h-3 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="bg-[#10B981]"
                    style={{
                      width: selectedStats.total
                        ? `${(selectedStats.online / selectedStats.total) * 100}%`
                        : '0%',
                    }}
                  />
                  <div
                    className="bg-[#F59E0B]"
                    style={{
                      width: selectedStats.total
                        ? `${(selectedStats.warning / selectedStats.total) * 100}%`
                        : '0%',
                    }}
                  />
                  <div
                    className="bg-[#EF4444]"
                    style={{
                      width: selectedStats.total
                        ? `${(selectedStats.offline / selectedStats.total) * 100}%`
                        : '0%',
                    }}
                  />
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-[#10B981]" />
                      <span className="text-[10px] text-slate-500">Online</span>
                    </div>

                    <p className="mt-1 font-mono text-sm font-semibold">
                      {selectedStats.online}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-[#F59E0B]" />
                      <span className="text-[10px] text-slate-500">
                        Warning
                      </span>
                    </div>

                    <p className="mt-1 font-mono text-sm font-semibold">{selectedStats.warning}</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-[#EF4444]" />
                      <span className="text-[10px] text-slate-500">
                        Offline
                      </span>
                    </div>

                    <p className="mt-1 font-mono text-sm font-semibold">{selectedStats.offline}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Device types */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.03)]">
              <h3 className="text-sm font-bold">Device Distribution</h3>

              <p className="mt-1 text-[11px] text-slate-400">
                {selectedPlant} environmental equipment
              </p>

              <div className="mt-5 space-y-5">
                <div>
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-[#0B6B50]">
                        <Zap size={15} />
                      </div>

                      <span className="text-xs font-semibold">CEMS</span>
                    </div>

                    <span className="font-mono text-xs font-semibold">
                      {plantDevices.filter((device) => device.type === 'CEMS').length}
                    </span>
                  </div>

                  <div className="mt-3 h-2 rounded-full bg-slate-100">
                    <div className="h-full w-[63%] rounded-full bg-[#0B6B50]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-500">
                        <Radio size={15} />
                      </div>

                      <span className="text-xs font-semibold">CEQMS</span>
                    </div>

                    <span className="font-mono text-xs font-semibold">
                      {plantDevices.filter((device) => device.type === 'CEQMS').length}
                    </span>
                  </div>

                  <div className="mt-3 h-2 rounded-full bg-slate-100">
                    <div className="h-full w-[37%] rounded-full bg-blue-500" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Devices table */}
          <section className="mt-7">
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
              <div>
                <h3 className="text-sm font-bold">{selectedPlant} Devices</h3>

                <p className="mt-1 text-[11px] text-slate-400">
                  {selectedPlant} individual device health, connectivity and data quality
                </p>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="relative">
                  <Search
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search devices..."
                    className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-xs outline-none focus:border-[#0B6B50] sm:w-[230px]"
                  />
                </div>

                <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-[10px] text-slate-500">
                  <Filter size={13} />

                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="bg-transparent outline-none"
                  >
                    <option value="All">All Status</option>
                    <option value="Online">Online</option>
                    <option value="Warning">Warning</option>
                    <option value="Offline">Offline</option>
                  </select>
                </button>
              </div>
            </div>

            <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_20px_rgba(15,23,42,0.03)]">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1050px]">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/70 text-left text-[9px] text-slate-400">
                      <th className="px-5 py-4 font-medium">Device</th>

                      <th className="px-5 py-4 font-medium">Type</th>

                      <th className="px-5 py-4 font-medium">Facility</th>

                      <th className="px-5 py-4 font-medium">Parameters</th>

                      <th className="px-5 py-4 font-medium">Status</th>

                      <th className="px-5 py-4 font-medium">Data Quality</th>

                      <th className="px-5 py-4 font-medium">Last Seen</th>

                      <th className="px-5 py-4 text-right font-medium">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredDevices.map((device) => (
                      <tr
                        key={device.id}
                        className="border-b border-slate-50 transition hover:bg-slate-50/50 last:border-0"
                      >
                        {/* Device */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                                device.status === 'Online'
                                  ? 'bg-emerald-50 text-[#0B6B50]'
                                  : device.status === 'Warning'
                                    ? 'bg-amber-50 text-amber-500'
                                    : 'bg-red-50 text-red-500'
                              }`}
                            >
                              <Cpu size={16} />
                            </div>

                            <div>
                              <p className="text-xs font-semibold text-slate-700">
                                {device.name}
                              </p>

                              <p className="mt-1 font-mono text-[8px] text-slate-400">
                                {device.id}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Type */}
                        <td className="px-5 py-4">
                          <DeviceTypeBadge type={device.type} />
                        </td>

                        {/* Facility */}
                        <td className="px-5 py-4">
                          <div>
                            <p className="text-xs font-semibold text-slate-700">
                              {device.plant}
                            </p>

                            <p className="mt-1 flex items-center gap-1 text-[9px] text-slate-400">
                              <Factory size={9} />
                              {device.unit}
                            </p>
                          </div>
                        </td>

                        {/* Parameters */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-1.5">
                            <Thermometer size={12} className="text-slate-400" />

                            <span className="text-[10px] text-slate-500">
                              {device.parameter}
                            </span>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="px-5 py-4">
                          <StatusBadge status={device.status} />
                        </td>

                        {/* Quality */}
                        <td className="px-5 py-4">
                          <DeviceHealth quality={device.quality} />
                        </td>

                        {/* Last seen */}
                        <td className="px-5 py-4">
                          <span
                            className={`font-mono text-[9px] ${
                              device.status === 'Offline'
                                ? 'text-red-500'
                                : 'text-slate-400'
                            }`}
                          >
                            {device.lastSeen}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-5 py-4">
                          <div className="flex justify-end gap-1.5">
                            <button
                              title="View"
                              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-[#0B6B50]"
                            >
                              <Gauge size={14} />
                            </button>

                            <button
                              title="Edit"
                              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-[#0B6B50]"
                            >
                              <Edit3 size={14} />
                            </button>

                            <button
                              title="More"
                              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50"
                            >
                              <ChevronDown size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredDevices.length === 0 && (
                <div className="py-16 text-center">
                  <Cpu size={32} className="mx-auto text-slate-300" />

                  <p className="mt-4 text-sm font-semibold text-slate-600">
                    No devices found
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Try changing your search or filter.
                  </p>
                </div>
              )}

              <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[9px] text-slate-400">
                  Showing {filteredDevices.length} device{filteredDevices.length === 1 ? '' : 's'} at {selectedPlant}
                </p>

                <div className="flex items-center gap-1">
                  <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-[9px] text-slate-400">
                    Previous
                  </button>

                  <button className="rounded-lg bg-[#0B6B50] px-3 py-1.5 text-[9px] font-semibold text-white">
                    1
                  </button>

                  <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-[9px] text-slate-500">
                    2
                  </button>

                  <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-[9px] text-slate-500">
                    3
                  </button>

                  <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-[9px] text-slate-500">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Maintenance */}
          <section className="mt-5 grid gap-5 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-500">
                  <Settings size={19} />
                </div>

                <div>
                  <h3 className="text-sm font-bold">Maintenance Required</h3>

                  <p className="mt-1 text-[10px] text-slate-400">
                    {selectedPlant} devices requiring inspection or service
                  </p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3">
                <div className="rounded-xl bg-red-50 p-3 text-center">
                  <p className="text-lg font-bold text-red-500">12</p>
                  <p className="text-[8px] text-red-600">Critical</p>
                </div>

                <div className="rounded-xl bg-amber-50 p-3 text-center">
                  <p className="text-lg font-bold text-amber-600">34</p>
                  <p className="text-[8px] text-amber-700">Due Soon</p>
                </div>

                <div className="rounded-xl bg-emerald-50 p-3 text-center">
                  <p className="text-lg font-bold text-emerald-600">248</p>
                  <p className="text-[8px] text-emerald-700">Healthy</p>
                </div>
              </div>

              <button className="mt-5 w-full rounded-lg border border-slate-200 py-2.5 text-[10px] font-semibold text-slate-600 hover:bg-slate-50">
                View Maintenance Schedule
              </button>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-500">
                  <RefreshCw size={19} />
                </div>

                <div>
                  <h3 className="text-sm font-bold">Firmware Status</h3>

                  <p className="mt-1 text-[10px] text-slate-400">
                    Device software and firmware versions
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <div className="flex items-center justify-between rounded-xl border border-slate-100 p-3">
                  <div>
                    <p className="text-xs font-semibold">v2.4.1</p>

                    <p className="mt-1 text-[9px] text-slate-400">
                      Latest CEMS firmware
                    </p>
                  </div>

                  <span className="rounded-full bg-emerald-50 px-2 py-1 text-[8px] font-semibold text-emerald-600">
                    6,214 devices
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-slate-100 p-3">
                  <div>
                    <p className="text-xs font-semibold">v1.9.0</p>

                    <p className="mt-1 text-[9px] text-slate-400">
                      Latest CEQMS firmware
                    </p>
                  </div>

                  <span className="rounded-full bg-blue-50 px-2 py-1 text-[8px] font-semibold text-blue-600">
                    3,421 devices
                  </span>
                </div>
              </div>

              <button className="mt-5 w-full rounded-lg border border-slate-200 py-2.5 text-[10px] font-semibold text-slate-600 hover:bg-slate-50">
                Manage Firmware
              </button>
            </div>
          </section>

          {/* Footer */}
          <section className="mt-5 flex flex-col gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-5 sm:flex-row sm:items-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
              <Cpu size={19} />
            </div>

            <div className="flex-1">
              <p className="text-xs font-bold text-emerald-800">
                Device monitoring is active
              </p>

              <p className="mt-1 text-[10px] text-emerald-700/70">
                EcoTrust continuously tracks device connectivity, sensor health,
                data quality and communication status.
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
