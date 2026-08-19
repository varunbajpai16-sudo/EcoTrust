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
  Radio,
  Settings,
  ShieldCheck,
  Thermometer,
  Wind,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
const plants = [
  {
    name: 'Plant A',
    location: 'Delhi NCR',
    status: 'Online',
    devices: 248,
    unit: 'Unit 2',
    dataQuality: 'selectedPlant.dataQuality',
    networkHealth: '{selectedPlant.networkHealth}',
    streamId: '{selectedPlant.streamId}',
    parameters: [
      { name: 'PM2.5', value: '28.4', unit: 'µg/m³', limit: '60', status: 'Good' },
      { name: 'PM10', value: '45.1', unit: 'µg/m³', limit: '100', status: 'Good' },
      { name: 'SO₂', value: '12.3', unit: 'ppb', limit: '80', status: 'Normal' },
      { name: 'NOx', value: '18.7', unit: 'ppb', limit: '100', status: 'Normal' },
      { name: 'CO₂', value: '421.8', unit: 'ppm', limit: '1000', status: 'Normal' },
      { name: 'Temperature', value: '31.4', unit: '°C', limit: '45', status: 'Normal' },
    ],
  },
  {
    name: 'Plant B',
    location: 'Uttar Pradesh',
    status: 'Online',
    devices: 182,
    unit: 'Unit 1',
    dataQuality: '98.9%',
    networkHealth: 'Good',
    streamId: 'CEMS-B-UNIT01 · 10.24.19.41',
    parameters: [
      { name: 'PM2.5', value: '41.8', unit: 'µg/m³', limit: '60', status: 'Good' },
      { name: 'PM10', value: '72.6', unit: 'µg/m³', limit: '100', status: 'Good' },
      { name: 'SO₂', value: '34.7', unit: 'ppb', limit: '80', status: 'Normal' },
      { name: 'NOx', value: '54.2', unit: 'ppb', limit: '100', status: 'Normal' },
      { name: 'CO₂', value: '568.3', unit: 'ppm', limit: '1000', status: 'Normal' },
      { name: 'Temperature', value: '34.8', unit: '°C', limit: '45', status: 'Normal' },
    ],
  },
  {
    name: 'Plant C',
    location: 'Maharashtra',
    status: 'Warning',
    devices: 316,
    unit: 'Unit 3',
    dataQuality: '96.4%',
    networkHealth: 'Warning',
    streamId: 'CEMS-C-UNIT03 · 10.24.21.17',
    parameters: [
      { name: 'PM2.5', value: '78.6', unit: 'µg/m³', limit: '60', status: 'High' },
      { name: 'PM10', value: '118.4', unit: 'µg/m³', limit: '100', status: 'High' },
      { name: 'SO₂', value: '71.8', unit: 'ppb', limit: '80', status: 'Near Limit' },
      { name: 'NOx', value: '92.4', unit: 'ppb', limit: '100', status: 'Near Limit' },
      { name: 'CO₂', value: '824.5', unit: 'ppm', limit: '1000', status: 'Normal' },
      { name: 'Temperature', value: '42.1', unit: '°C', limit: '45', status: 'Near Limit' },
    ],
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
       active:true
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
        {/* Logo */}
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

        {/* Navigation */}
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

        {/* Status */}
        <div className="shrink-0 border-t border-white/10 p-4">
          <div className="rounded-xl bg-white/5 p-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              <span className="text-xs font-medium">Monitoring active</span>
            </div>

            <p className="mt-2 text-[10px] text-white/40">
              Data stream synchronized
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

function ParameterCard({ parameter }) {
  const Icon = parameter.icon || Wind;
  const isHigh = parameter.status === 'High';
  const isNearLimit = parameter.status === 'Near Limit';

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.03)] transition hover:border-emerald-200 hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${
              isHigh ? 'bg-red-50 text-red-500' : isNearLimit ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-[#0B6B50]'
            }`}>
            <Icon size={18} />
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-700">
              {parameter.name}
            </p>

            <p className="text-[10px] text-slate-400">
              Environmental parameter
            </p>
          </div>
        </div>

        <span className={`flex items-center gap-1.5 rounded-full px-2 py-1 text-[9px] font-semibold ${
          isHigh
            ? 'bg-red-50 text-red-600'
            : isNearLimit
              ? 'bg-amber-50 text-amber-600'
              : 'bg-emerald-50 text-emerald-600'
        }`}>
          <span className={`h-1.5 w-1.5 rounded-full ${
            isHigh ? 'bg-red-500' : isNearLimit ? 'bg-amber-500' : 'bg-emerald-500'
          }`} />
          {parameter.status}
        </span>
      </div>

      <div className="mt-6 flex items-end gap-2">
        <span className="font-mono text-3xl font-semibold tracking-tight text-[#0F172A]">
          {parameter.value}
        </span>

        <span className="mb-1.5 font-mono text-[10px] text-slate-400">
          {parameter.unit}
        </span>
      </div>

      {/* Limit indicator */}
      <div className="mt-5">
        <div className="mb-2 flex justify-between text-[9px]">
          <span className="text-slate-400">Current level</span>

          <span className="font-medium text-slate-500">
            Limit: {parameter.limit} {parameter.unit}
          </span>
        </div>

        <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-[#10B981]"
            style={{
              width: `${Math.min(
                (Number(parameter.value) / Number(parameter.limit)) * 100,
                100,
              )}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

function LiveChart() {
  return (
    <div className="relative h-[300px] w-full">
      <svg
        viewBox="0 0 900 300"
        preserveAspectRatio="none"
        className="h-full w-full"
      >
        {/* Grid */}
        {[40, 90, 140, 190, 240].map((y) => (
          <line
            key={y}
            x1="0"
            x2="900"
            y1={y}
            y2={y}
            stroke="#E2E8F0"
            strokeDasharray="5 5"
          />
        ))}

        {/* Area */}
        <path
          d="M0 180
             C40 165 55 190 90 158
             C125 130 150 165 180 145
             C215 120 240 155 270 125
             C310 90 335 140 370 115
             C405 90 430 125 465 100
             C500 75 530 115 565 92
             C600 65 630 105 665 80
             C700 55 730 90 765 68
             C805 45 850 58 900 35
             V300 H0Z"
          fill="rgba(16,185,129,0.10)"
        />

        {/* Main line */}
        <path
          d="M0 180
             C40 165 55 190 90 158
             C125 130 150 165 180 145
             C215 120 240 155 270 125
             C310 90 335 140 370 115
             C405 90 430 125 465 100
             C500 75 530 115 565 92
             C600 65 630 105 665 80
             C700 55 730 90 765 68
             C805 45 850 58 900 35"
          fill="none"
          stroke="#0B6B50"
          strokeWidth="3"
        />

        {/* Current point */}
        <circle cx="900" cy="35" r="6" fill="#0B6B50" />

        <circle cx="900" cy="35" r="11" fill="#0B6B50" opacity=".12" />
      </svg>

      <div className="absolute bottom-0 left-0 flex w-full justify-between text-[9px] text-slate-400">
        <span>10:00</span>
        <span>11:00</span>
        <span>12:00</span>
        <span>13:00</span>
        <span>14:00</span>
        <span>15:00</span>
        <span>Now</span>
      </div>
    </div>
  );
}

function PlantSelector({ selectedPlant, onSelect }) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {plants.map((plant) => {
        const selected = selectedPlant.name === plant.name;
        const isWarning = plant.status !== 'Online';

        return (
          <button
            key={plant.name}
            onClick={() => onSelect(plant)}
            className={`rounded-xl border p-4 text-left transition ${
              selected
                ? 'border-emerald-300 bg-emerald-50/60 shadow-sm'
                : 'border-slate-200 bg-white hover:border-emerald-200'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    selected
                      ? 'bg-[#0B6B50] text-white'
                      : 'bg-emerald-50 text-[#0B6B50]'
                  }`}
                >
                  <Factory size={16} />
                </div>

                <div>
                  <p className="text-xs font-semibold text-slate-700">
                    {plant.name}
                  </p>

                  <p className="mt-0.5 flex items-center gap-1 text-[9px] text-slate-400">
                    <MapPin size={9} />
                    {plant.location}
                  </p>
                </div>
              </div>

              <span
                className={`text-[9px] font-semibold ${
                  isWarning ? 'text-amber-500' : 'text-emerald-600'
                }`}
              >
                ● {plant.status}
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between text-[9px] text-slate-400">
              <span>{plant.devices} connected sensors</span>
              <span className="font-semibold text-[#0B6B50]">
                {selected ? 'Selected' : 'View details →'}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default function LiveMonitoring() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(plants[0]);

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
              <h1 className="text-lg font-bold">Live Monitoring</h1>

              <p className="hidden text-[10px] text-slate-400 sm:block">
                Real-time environmental sensor data
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Connection */}
            <div className="hidden items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-[10px] font-semibold text-emerald-700 sm:flex">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              Live connection
            </div>

            {/* Notification */}
            <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500">
              <Bell size={17} />

              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
            </button>

            {/* User */}
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

        {/* Page */}
        <main className="mx-auto max-w-[1600px] p-5 lg:p-8">
          {/* Page title */}
          <div className="mb-7 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-bold text-emerald-600">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                  LIVE
                </span>

                <span className="text-[10px] text-slate-400">
                  Last updated just now
                </span>
              </div>

              <h2 className="mt-3 text-2xl font-bold tracking-tight">
                Environmental Monitoring
              </h2>

              <p className="mt-1 max-w-2xl text-sm text-slate-500">
                Monitor CEMS, CEQMS and connected environmental sensors in real
                time across all facilities.
              </p>
            </div>

            {/* Controls */}
            <div className="flex gap-2">
              <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600">
                <MapPin size={14} />
                All Locations
                <ChevronDown size={13} />
              </button>

              <button className="flex items-center gap-2 rounded-lg bg-[#0B6B50] px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-emerald-900/10">
                <Radio size={14} />
                Live Feed
              </button>
            </div>
          </div>

          {/* Plant selection */}
          <section className="mb-5">
            <div className="mb-3">
              <h3 className="text-sm font-bold">Monitoring Facilities</h3>

              <p className="mt-1 text-[11px] text-slate-400">
                Select a facility to inspect its live environmental data
              </p>
            </div>

            <PlantSelector
              selectedPlant={selectedPlant}
              onSelect={setSelectedPlant}
            />
          </section>

          {/* Status banner */}
          <section className="mb-5 flex flex-col justify-between gap-4 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0B6B50] text-white">
                <Radio size={20} />
              </div>

              <div>
                <p className="text-sm font-bold text-[#064E3B]">
                  {selectedPlant.name} · {selectedPlant.unit} is being monitored live
                </p>

                <p className="mt-1 text-[10px] text-emerald-700/70">
                  {selectedPlant.devices} sensors connected · Data stream {selectedPlant.status === 'Online' ? 'healthy' : 'requires attention'} · Sampling every
                  10 seconds
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[10px] font-semibold text-emerald-700">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              All systems operational
            </div>
          </section>

          {/* Parameters */}
          <section>
            <div className="mb-4 flex items-end justify-between">
              <div>
                <h3 className="text-sm font-bold">Live Parameters</h3>

                <p className="mt-1 text-[11px] text-slate-400">
                  Current readings from environmental sensors
                </p>
              </div>

              <span className="hidden text-[10px] text-slate-400 sm:block">
                Auto-refresh: 10 sec
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {selectedPlant.parameters.map((parameter) => (
                <ParameterCard key={parameter.name} parameter={parameter} />
              ))}
            </div>
          </section>

          {/* Chart + device status */}
          <section className="mt-5 grid gap-5 xl:grid-cols-[1.6fr_.7fr]">
            {/* Live trend */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.03)]">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold">Live Emission Trend</h3>

                    <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[8px] font-bold text-emerald-600">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                      STREAMING
                    </span>
                  </div>

                  <p className="mt-1 text-[11px] text-slate-400">
                    PM2.5 concentration · {selectedPlant.name} · {selectedPlant.unit}
                  </p>
                </div>

                <select
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600 outline-none"
                  defaultValue="PM2.5"
                >
                  <option>PM2.5</option>
                  <option>PM10</option>
                  <option>SO₂</option>
                  <option>NOx</option>
                  <option>CO₂</option>
                </select>
              </div>

              <div className="mt-5 flex items-center gap-4">
                <div>
                  <span className="font-mono text-2xl font-semibold">
                    {selectedPlant.parameters.find((p) => p.name === 'PM2.5')?.value}
                  </span>

                  <span className="ml-1 font-mono text-[9px] text-slate-400">
                    µg/m³
                  </span>
                </div>

                <span className={`rounded-full px-2 py-1 text-[9px] font-semibold ${
                  selectedPlant.parameters.find((p) => p.name === 'PM2.5')?.status === 'High'
                    ? 'bg-red-50 text-red-600'
                    : selectedPlant.parameters.find((p) => p.name === 'PM2.5')?.status === 'Near Limit'
                      ? 'bg-amber-50 text-amber-600'
                      : 'bg-emerald-50 text-emerald-600'
                }`}>
                  {selectedPlant.parameters.find((p) => p.name === 'PM2.5')?.status === 'High'
                    ? 'Above limit'
                    : selectedPlant.parameters.find((p) => p.name === 'PM2.5')?.status === 'Near Limit'
                      ? 'Near limit'
                      : 'Within limit'}
                </span>
              </div>

              <LiveChart />
            </div>

            {/* Device status */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.03)]">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold">Device Status</h3>

                  <p className="mt-1 text-[11px] text-slate-400">
                    {selectedPlant.name} · {selectedPlant.unit}
                  </p>
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-[#0B6B50]">
                  <Radio size={17} />
                </div>
              </div>

              <div className="mt-6 space-y-5">
                <div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Sensors online</span>

                    <span className="font-semibold text-emerald-600">
                      {selectedPlant.devices} / {selectedPlant.devices}
                    </span>
                  </div>

                  <div className="mt-2 h-2 rounded-full bg-slate-100">
                    <div className="h-full w-full rounded-full bg-[#10B981]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Data quality</span>

                    <span className="font-semibold">99.8%</span>
                  </div>

                  <div className="mt-2 h-2 rounded-full bg-slate-100">
                    <div className="h-full w-[99.8%] rounded-full bg-[#0B6B50]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Network health</span>

                    <span className="font-semibold text-emerald-600">
                      Excellent
                    </span>
                  </div>

                  <div className="mt-2 h-2 rounded-full bg-slate-100">
                    <div className="h-full w-[96%] rounded-full bg-[#10B981]" />
                  </div>
                </div>
              </div>

              <div className="mt-7 rounded-xl bg-slate-50 p-4">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />

                  <span className="text-xs font-semibold text-slate-700">
                    Data stream active
                  </span>
                </div>

                <p className="mt-2 font-mono text-[9px] text-slate-400">
                  {selectedPlant.streamId}
                </p>
              </div>
            </div>
          </section>

          {/* Recent readings */}
          <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.03)]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold">Latest Sensor Readings</h3>

                <p className="mt-1 text-[11px] text-slate-400">
                  Most recent values received from CEMS
                </p>
              </div>

              <button className="text-[10px] font-semibold text-[#0B6B50] hover:underline">
                View history →
              </button>
            </div>

            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[650px] text-left">
                <thead>
                  <tr className="border-b border-slate-100 text-[10px] text-slate-400">
                    <th className="pb-3 font-medium">Parameter</th>

                    <th className="pb-3 font-medium">Current Value</th>

                    <th className="pb-3 font-medium">Unit</th>

                    <th className="pb-3 font-medium">Status</th>

                    <th className="pb-3 text-right font-medium">Received</th>
                  </tr>
                </thead>

                <tbody>
                  {selectedPlant.parameters.slice(0, 5).map((parameter) => (
                    <tr
                      key={parameter.name}
                      className="border-b border-slate-50 last:border-0"
                    >
                      <td className="py-4 text-xs font-semibold text-slate-700">
                        {parameter.name}
                      </td>

                      <td className="py-4 font-mono text-xs font-semibold text-[#0F172A]">
                        {parameter.value}
                      </td>

                      <td className="py-4 font-mono text-[9px] text-slate-400">
                        {parameter.unit}
                      </td>

                      <td className="py-4">
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[9px] font-semibold ${
                          parameter.status === 'High'
                            ? 'bg-red-50 text-red-600'
                            : parameter.status === 'Near Limit'
                              ? 'bg-amber-50 text-amber-600'
                              : 'bg-emerald-50 text-emerald-600'
                        }`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${
                            parameter.status === 'High'
                              ? 'bg-red-500'
                              : parameter.status === 'Near Limit'
                                ? 'bg-amber-500'
                                : 'bg-emerald-500'
                          }`} />
                          {parameter.status}
                        </span>
                      </td>

                      <td className="py-4 text-right font-mono text-[9px] text-slate-400">
                        Just now
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Alert */}
          <section className="mt-5 flex items-center gap-4 rounded-2xl border border-amber-100 bg-amber-50/50 p-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
              <CircleAlert size={19} />
            </div>

            <div className="flex-1">
              <p className="text-xs font-semibold text-amber-800">
                Monitoring is active
              </p>

              <p className="mt-1 text-[10px] text-amber-700/70">
                EcoTrust continuously evaluates incoming sensor readings against
                configured environmental limits and compliance thresholds.
              </p>
            </div>

            <button className="hidden rounded-lg border border-amber-200 bg-white px-3 py-2 text-[10px] font-semibold text-amber-700 sm:block">
              Alert Settings
            </button>
          </section>
        </main>
      </div>
    </div>
  );
}
