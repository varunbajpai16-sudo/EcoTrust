import {
  Bell,
  ChevronDown,
  CircleAlert,
  Cpu,
  Edit3,
  Factory,
  Filter,
  Gauge,
  LayoutDashboard,
  Leaf,
  LineChart,
  Menu,
  Moon,
  Plus,
  Radio,
  RefreshCw,
  Search,
  Settings,
  ShieldCheck,
  Signal,
  Sun,
  Thermometer,
  Wifi,
  X,
  Zap,
} from 'lucide-react';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../features/Theme/Theme_slice';


/* =========================================================
   DEVICES DATA
========================================================= */

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


/* =========================================================
   SIDEBAR
========================================================= */

function Sidebar({ open, setOpen }) {

  const navigate = useNavigate();

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
      active: true,
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
        className={`
          fixed left-0 top-0 z-50
          flex h-screen w-[250px]
          flex-col
          bg-[#052E24]
          text-white
          transition-transform duration-300

          ${open ? 'translate-x-0' : '-translate-x-full'}

          lg:translate-x-0
        `}
      >

        {/* Logo */}

        <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-white/10 px-6">

          <div className="flex items-center gap-3">

            <div
              onClick={() => navigate('/')}
              className="
                flex h-10 w-10
                cursor-pointer
                items-center justify-center
                rounded-xl
                bg-[#0B6B50]
              "
            >
              <Leaf size={22} />
            </div>

            <div>

              <div className="text-lg font-bold">
                EcoTrust
              </div>

              <div className="text-[9px] tracking-wider text-emerald-300/60">
                ENVIRONMENTAL INTELLIGENCE
              </div>

            </div>

          </div>


          <button
            onClick={() => setOpen(false)}
            className="lg:hidden"
          >
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
                  onClick={() => navigate(item.path)}
                  className={`
                    flex w-full
                    items-center gap-3
                    rounded-xl
                    px-3 py-3
                    text-sm
                    transition

                    ${
                      item.active
                        ? 'bg-[#0B6B50] text-white shadow-lg'
                        : 'text-white/55 hover:bg-white/5 hover:text-white'
                    }
                  `}
                >

                  <Icon size={18} />

                  <span className="flex-1 text-left">
                    {item.name}
                  </span>


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


          <button
            onClick={() => navigate('/settings')}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/55 transition hover:bg-white/5 hover:text-white"
          >
            <Settings size={18} />

            Settings
          </button>

        </div>


        {/* Sidebar status */}

        <div className="shrink-0 border-t border-white/10 p-4">

          <div className="rounded-xl bg-white/5 p-4">

            <div className="flex items-center gap-2">

              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

              <span className="text-xs font-medium">
                Device manager active
              </span>

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


/* =========================================================
   STAT CARD
========================================================= */

function StatCard({ stat }) {

  const Icon = stat.icon;

  const styles = {

    green:
      'bg-emerald-50 text-[#0B6B50] dark:bg-emerald-500/10 dark:text-emerald-400',

    blue:
      'bg-blue-50 text-blue-500 dark:bg-blue-500/10 dark:text-blue-400',

    amber:
      'bg-amber-50 text-amber-500 dark:bg-amber-500/10 dark:text-amber-400',

    red:
      'bg-red-50 text-red-500 dark:bg-red-500/10 dark:text-red-400',

  };

  return (

    <div
      className="
        rounded-2xl
        border border-slate-200
        bg-white
        p-5
        shadow-[0_4px_20px_rgba(15,23,42,0.03)]
        transition-colors duration-300

        dark:border-white/10
        dark:bg-white/[0.03]
        dark:shadow-none
      "
    >

      <div className="flex items-start justify-between">

        <div>

          <p className="text-xs font-medium text-slate-500 dark:text-white/45">
            {stat.title}
          </p>

          <p className="mt-2 text-2xl font-bold tracking-tight text-[#0F172A] dark:text-white">
            {stat.value}
          </p>

          <p className="mt-2 text-[10px] text-slate-400 dark:text-white/30">
            {stat.detail}
          </p>

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


/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({ status }) {

  const styles = {

    Online:
      'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',

    Warning:
      'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',

    Offline:
      'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400',

  };


  const dots = {

    Online: 'bg-emerald-500',

    Warning: 'bg-amber-500',

    Offline: 'bg-red-500',

  };


  return (

    <span
      className={`
        inline-flex
        items-center gap-1.5
        rounded-full
        px-2.5 py-1
        text-[9px]
        font-semibold

        ${styles[status]}
      `}
    >

      <span
        className={`h-1.5 w-1.5 rounded-full ${dots[status]}`}
      />

      {status}

    </span>

  );
}


/* =========================================================
   DEVICE TYPE BADGE
========================================================= */

function DeviceTypeBadge({ type }) {

  return (

    <span
      className={`
        rounded-md
        px-2 py-1
        text-[8px]
        font-bold

        ${
          type === 'CEMS'
            ? 'bg-emerald-50 text-[#0B6B50] dark:bg-emerald-500/10 dark:text-emerald-400'
            : 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400'
        }
      `}
    >
      {type}
    </span>

  );
}


/* =========================================================
   DEVICE HEALTH
========================================================= */

function DeviceHealth({ quality }) {

  if (quality === '—') {

    return (
      <span className="font-mono text-[10px] text-slate-400 dark:text-white/30">
        —
      </span>
    );

  }


  const number = parseFloat(quality);


  return (

    <div className="flex items-center gap-2">

      <span className="font-mono text-[10px] font-semibold text-slate-600 dark:text-white/60">
        {quality}
      </span>


      <div className="h-1.5 w-16 rounded-full bg-slate-100 dark:bg-white/10">

        <div
          className={`
            h-full
            rounded-full

            ${
              number >= 98
                ? 'bg-[#10B981]'
                : number >= 94
                  ? 'bg-[#F59E0B]'
                  : 'bg-[#EF4444]'
            }
          `}
          style={{
            width: `${number}%`,
          }}
        />

      </div>

    </div>

  );
}


/* =========================================================
   DEVICES PAGE
========================================================= */

export default function Devices() {
const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [search, setSearch] =
    useState('');

  const [filter, setFilter] =
    useState('All');

  const [selectedPlant, setSelectedPlant] =
    useState('Plant A');


  /* =======================================================
     THEME
  ======================================================= */

  const dispatch = useDispatch();

  const theme = useSelector(
    (state) => state.theme.theme
  );

  const isDark =
    theme === 'dark';


  useEffect(() => {

    const root =
      document.documentElement;

    if (theme === 'dark') {

      root.classList.add('dark');

    } else {

      root.classList.remove('dark');

    }

  }, [theme]);


  /* =======================================================
     PLANT DATA
  ======================================================= */

  const plantNames = [
    'Plant A',
    'Plant B',
    'Plant C',
    'Plant D',
  ];


  const plantDevices =
    devices.filter(
      (device) =>
        device.plant === selectedPlant
    );


  const selectedStats = {

    total:
      plantDevices.length,

    online:
      plantDevices.filter(
        (device) =>
          device.status === 'Online'
      ).length,

    warning:
      plantDevices.filter(
        (device) =>
          device.status === 'Warning'
      ).length,

    offline:
      plantDevices.filter(
        (device) =>
          device.status === 'Offline'
      ).length,

  };


  /* =======================================================
     SEARCH / FILTER
  ======================================================= */

  const filteredDevices =
    plantDevices.filter((device) => {

      const matchesSearch =

        device.id
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        device.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        device.plant
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );


      const matchesFilter =
        filter === 'All' ||
        device.status === filter;


      return (
        matchesSearch &&
        matchesFilter
      );

    });


  return (

    <div
      className="
        min-h-screen
        bg-[#F7FAF8]
        font-[Inter,sans-serif]
        text-[#0F172A]
        transition-colors duration-300

        dark:bg-[#071A15]
        dark:text-white
      "
    >

      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />


      <div className="min-w-0 lg:ml-[250px]">


        {/* =================================================
            HEADER
        ================================================= */}

        <header
          className="
            sticky top-0 z-30
            flex h-[76px]
            items-center justify-between
            border-b border-slate-200
            bg-white/90
            px-5
            backdrop-blur-xl
            transition-colors duration-300

            dark:border-white/10
            dark:bg-[#071A15]/90

            lg:px-8
          "
        >

          <div className="flex items-center gap-4">

            <button
              onClick={() =>
                setSidebarOpen(true)
              }
              className="
                rounded-lg
                p-2

                hover:bg-slate-100
                dark:hover:bg-white/5

                lg:hidden
              "
            >
              <Menu size={21} />
            </button>


            <div>

              <h1 className="text-lg font-bold text-[#0F172A] dark:text-white">
                Devices
              </h1>

              <p className="hidden text-[10px] text-slate-400 dark:text-white/35 sm:block">
                CEMS, CEQMS and environmental sensor management
              </p>

            </div>

          </div>


          <div className="flex items-center gap-2">


            {/* Online */}

            <div
              className="
                hidden
                items-center gap-2
                rounded-lg
                bg-emerald-50
                px-3 py-2
                text-[10px]
                font-semibold
                text-emerald-700

                dark:bg-emerald-500/10
                dark:text-emerald-400

                sm:flex
              "
            >

              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />

              98.7% devices online

            </div>


            {/* Theme */}

            <button
              type="button"
              onClick={() =>
                dispatch(toggleTheme())
              }
              aria-label={
                isDark
                  ? 'Switch to light mode'
                  : 'Switch to dark mode'
              }
              className="
                flex h-9 w-9
                items-center justify-center
                rounded-lg
                border border-slate-200
                bg-white
                text-slate-500
                transition

                hover:bg-emerald-50
                hover:text-[#0B6B50]

                dark:border-white/10
                dark:bg-white/5
                dark:text-white/60
                dark:hover:bg-white/10
                dark:hover:text-emerald-400
              "
            >

              {isDark ? (
                <Sun size={17} />
              ) : (
                <Moon size={17} />
              )}

            </button>


            {/* Notifications */}

            <button
              className="
                relative
                flex h-9 w-9
                items-center justify-center
                rounded-lg
                border border-slate-200
                bg-white
                text-slate-500

                dark:border-white/10
                dark:bg-white/5
                dark:text-white/60
              "
            >

              <Bell size={17} />

              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />

            </button>


            {/* User */}

            <div className="flex items-center gap-2">

               <div onClick={()=>navigate("/profile")} className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0B6B50] text-xs font-bold text-white">
                VB
              </div>


              <div className="hidden sm:block">

                <p className="text-xs font-semibold text-slate-700 dark:text-white/80">
                  Admin
                </p>

                <p className="text-[9px] text-slate-400 dark:text-white/35">
                  Environmental Officer
                </p>

              </div>


              <ChevronDown
                size={14}
                className="hidden text-slate-400 dark:text-white/35 sm:block"
              />

            </div>

          </div>

        </header>


        {/* =================================================
            MAIN
        ================================================= */}

        <main className="mx-auto max-w-[1600px] p-5 lg:p-8">


          {/* =================================================
              HEADING
          ================================================= */}

          <div className="mb-7 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">

            <div>

              <span
                className="
                  inline-flex
                  items-center gap-1.5
                  rounded-full
                  bg-emerald-50
                  px-2.5 py-1
                  text-[9px]
                  font-bold
                  text-emerald-600

                  dark:bg-emerald-500/10
                  dark:text-emerald-400
                "
              >

                <Cpu size={11} />

                DEVICE MANAGEMENT

              </span>


              <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#0F172A] dark:text-white">
                Environmental Devices
              </h2>


              <p className="mt-1 max-w-2xl text-sm text-slate-500 dark:text-white/45">
                Monitor connected CEMS, CEQMS and environmental
                sensors, their health, connectivity and data quality.
              </p>

            </div>


            {/* Controls */}

            <div className="flex flex-wrap gap-2">


              {/* Plant */}

              <div className="relative">

                <select
                  value={selectedPlant}
                  onChange={(e) => {

                    setSelectedPlant(
                      e.target.value
                    );

                    setSearch('');

                    setFilter('All');

                  }}
                  className="
                    appearance-none
                    rounded-lg
                    border border-slate-200
                    bg-white
                    py-2.5
                    pl-3 pr-9
                    text-xs
                    font-semibold
                    text-slate-600
                    outline-none
                    focus:border-[#0B6B50]

                    dark:border-white/10
                    dark:bg-white/[0.03]
                    dark:text-white/60
                  "
                >

                  {plantNames.map(
                    (plant) => (

                      <option
                        key={plant}
                        value={plant}
                        className="bg-white dark:bg-[#0D2921]"
                      >
                        {plant}
                      </option>

                    )
                  )}

                </select>


                <ChevronDown
                  size={13}
                  className="
                    pointer-events-none
                    absolute
                    right-2.5
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                    dark:text-white/30
                  "
                />

              </div>


              {/* Sync */}

              <button
                className="
                  flex items-center gap-2
                  rounded-lg
                  border border-slate-200
                  bg-white
                  px-3 py-2.5
                  text-xs
                  font-medium
                  text-slate-600
                  transition

                  hover:bg-slate-50
                  hover:text-[#0B6B50]

                  dark:border-white/10
                  dark:bg-white/[0.03]
                  dark:text-white/50
                  dark:hover:bg-white/10
                  dark:hover:text-emerald-400
                "
              >

                <RefreshCw size={14} />

                Sync Devices

              </button>


              {/* Add */}

              <button
                className="
                  flex items-center gap-2
                  rounded-lg
                  bg-[#0B6B50]
                  px-4 py-2.5
                  text-xs
                  font-semibold
                  text-white
                  shadow-lg
                  shadow-emerald-900/10
                  transition

                  hover:bg-[#064E3B]
                "
              >

                <Plus size={14} />

                Add Device

              </button>

            </div>

          </div>


          {/* =================================================
              SELECTED PLANT
          ================================================= */}

          <section
            className="
              mb-5
              rounded-2xl
              border border-emerald-100
              bg-emerald-50/60
              p-5
              transition-colors

              dark:border-emerald-500/20
              dark:bg-emerald-500/10
            "
          >

            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">


              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0B6B50] text-white">
                  <Factory size={19} />
                </div>


                <div>

                  <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-emerald-700 dark:text-emerald-400">
                    Currently viewing devices
                  </p>

                  <h3 className="mt-1 text-base font-bold text-[#064E3B] dark:text-emerald-300">
                    {selectedPlant}
                  </h3>

                </div>

              </div>


              <div className="grid grid-cols-3 gap-2 text-center">

                <div className="rounded-xl bg-white px-4 py-2.5 dark:bg-white/[0.06]">

                  <p className="text-lg font-bold text-[#0B6B50] dark:text-emerald-400">
                    {selectedStats.total}
                  </p>

                  <p className="text-[8px] text-slate-400 dark:text-white/30">
                    Devices
                  </p>

                </div>


                <div className="rounded-xl bg-white px-4 py-2.5 dark:bg-white/[0.06]">

                  <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                    {selectedStats.online}
                  </p>

                  <p className="text-[8px] text-slate-400 dark:text-white/30">
                    Online
                  </p>

                </div>


                <div className="rounded-xl bg-white px-4 py-2.5 dark:bg-white/[0.06]">

                  <p
                    className={`text-lg font-bold ${
                      selectedStats.offline > 0
                        ? 'text-red-500 dark:text-red-400'
                        : 'text-slate-600 dark:text-white/50'
                    }`}
                  >
                    {selectedStats.offline}
                  </p>

                  <p className="text-[8px] text-slate-400 dark:text-white/30">
                    Offline
                  </p>

                </div>

              </div>

            </div>

          </section>


          {/* =================================================
              STATS
          ================================================= */}

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
                  ? `${Math.round(
                      (selectedStats.online /
                        selectedStats.total) *
                        100
                    )}% connected`
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


          {/* =================================================
              DEVICE HEALTH
          ================================================= */}

          <section className="mt-5 grid gap-5 xl:grid-cols-[1.2fr_.8fr]">


            {/* Network Health */}

            <div
              className="
                rounded-2xl
                border border-slate-200
                bg-white
                p-5
                shadow-[0_4px_20px_rgba(15,23,42,0.03)]
                transition-colors

                dark:border-white/10
                dark:bg-white/[0.03]
                dark:shadow-none
              "
            >

              <div className="flex items-center justify-between">

                <div>

                  <h3 className="text-sm font-bold text-[#0F172A] dark:text-white">
                    Device Network Health
                  </h3>

                  <p className="mt-1 text-[11px] text-slate-400 dark:text-white/30">
                    {selectedPlant} device connectivity and health
                  </p>

                </div>


                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-[#0B6B50] dark:bg-emerald-500/10 dark:text-emerald-400">
                  <Signal size={18} />
                </div>

              </div>


              <div className="mt-6">

                <div className="flex items-end justify-between">

                  <div>

                    <span className="font-mono text-3xl font-semibold text-[#0F172A] dark:text-white">

                      {selectedStats.total
                        ? `${Math.round(
                            (selectedStats.online /
                              selectedStats.total) *
                              1000
                          ) / 10}%`
                        : '0%'}

                    </span>

                    <p className="mt-1 text-[10px] text-slate-400 dark:text-white/30">
                      {selectedPlant} connectivity
                    </p>

                  </div>


                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-semibold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                    Healthy
                  </span>

                </div>


                <div className="mt-5 flex h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">

                  <div
                    className="bg-[#10B981]"
                    style={{
                      width: selectedStats.total
                        ? `${
                            (selectedStats.online /
                              selectedStats.total) *
                            100
                          }%`
                        : '0%',
                    }}
                  />

                  <div
                    className="bg-[#F59E0B]"
                    style={{
                      width: selectedStats.total
                        ? `${
                            (selectedStats.warning /
                              selectedStats.total) *
                            100
                          }%`
                        : '0%',
                    }}
                  />

                  <div
                    className="bg-[#EF4444]"
                    style={{
                      width: selectedStats.total
                        ? `${
                            (selectedStats.offline /
                              selectedStats.total) *
                            100
                          }%`
                        : '0%',
                    }}
                  />

                </div>


                <div className="mt-4 grid grid-cols-3 gap-3">


                  <div>

                    <div className="flex items-center gap-1.5">

                      <span className="h-2 w-2 rounded-full bg-[#10B981]" />

                      <span className="text-[10px] text-slate-500 dark:text-white/40">
                        Online
                      </span>

                    </div>

                    <p className="mt-1 font-mono text-sm font-semibold text-[#0F172A] dark:text-white">
                      {selectedStats.online}
                    </p>

                  </div>


                  <div>

                    <div className="flex items-center gap-1.5">

                      <span className="h-2 w-2 rounded-full bg-[#F59E0B]" />

                      <span className="text-[10px] text-slate-500 dark:text-white/40">
                        Warning
                      </span>

                    </div>

                    <p className="mt-1 font-mono text-sm font-semibold text-[#0F172A] dark:text-white">
                      {selectedStats.warning}
                    </p>

                  </div>


                  <div>

                    <div className="flex items-center gap-1.5">

                      <span className="h-2 w-2 rounded-full bg-[#EF4444]" />

                      <span className="text-[10px] text-slate-500 dark:text-white/40">
                        Offline
                      </span>

                    </div>

                    <p className="mt-1 font-mono text-sm font-semibold text-[#0F172A] dark:text-white">
                      {selectedStats.offline}
                    </p>

                  </div>

                </div>

              </div>

            </div>


            {/* Device Distribution */}

            <div
              className="
                rounded-2xl
                border border-slate-200
                bg-white
                p-5
                shadow-[0_4px_20px_rgba(15,23,42,0.03)]
                transition-colors

                dark:border-white/10
                dark:bg-white/[0.03]
                dark:shadow-none
              "
            >

              <h3 className="text-sm font-bold text-[#0F172A] dark:text-white">
                Device Distribution
              </h3>

              <p className="mt-1 text-[11px] text-slate-400 dark:text-white/30">
                {selectedPlant} environmental equipment
              </p>


              <div className="mt-5 space-y-5">


                {/* CEMS */}

                <div>

                  <div className="flex justify-between">

                    <div className="flex items-center gap-2">

                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-[#0B6B50] dark:bg-emerald-500/10 dark:text-emerald-400">
                        <Zap size={15} />
                      </div>

                      <span className="text-xs font-semibold text-slate-700 dark:text-white/75">
                        CEMS
                      </span>

                    </div>


                    <span className="font-mono text-xs font-semibold text-[#0F172A] dark:text-white">
                      {
                        plantDevices.filter(
                          (device) =>
                            device.type === 'CEMS'
                        ).length
                      }
                    </span>

                  </div>


                  <div className="mt-3 h-2 rounded-full bg-slate-100 dark:bg-white/10">

                    <div className="h-full w-[63%] rounded-full bg-[#0B6B50]" />

                  </div>

                </div>


                {/* CEQMS */}

                <div>

                  <div className="flex justify-between">

                    <div className="flex items-center gap-2">

                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-500 dark:bg-blue-500/10 dark:text-blue-400">
                        <Radio size={15} />
                      </div>

                      <span className="text-xs font-semibold text-slate-700 dark:text-white/75">
                        CEQMS
                      </span>

                    </div>


                    <span className="font-mono text-xs font-semibold text-[#0F172A] dark:text-white">
                      {
                        plantDevices.filter(
                          (device) =>
                            device.type === 'CEQMS'
                        ).length
                      }
                    </span>

                  </div>


                  <div className="mt-3 h-2 rounded-full bg-slate-100 dark:bg-white/10">

                    <div className="h-full w-[37%] rounded-full bg-blue-500" />

                  </div>

                </div>

              </div>

            </div>

          </section>


          {/* =================================================
              DEVICE TABLE
          ================================================= */}

          <section className="mt-7">

            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">

              <div>

                <h3 className="text-sm font-bold text-[#0F172A] dark:text-white">
                  {selectedPlant} Devices
                </h3>

                <p className="mt-1 text-[11px] text-slate-400 dark:text-white/30">
                  {selectedPlant} individual device health,
                  connectivity and data quality
                </p>

              </div>


              <div className="flex flex-col gap-2 sm:flex-row">


                {/* Search */}

                <div className="relative">

                  <Search
                    size={15}
                    className="
                      absolute
                      left-3
                      top-1/2
                      -translate-y-1/2
                      text-slate-400
                      dark:text-white/30
                    "
                  />

                  <input
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    placeholder="Search devices..."
                    className="
                      w-full
                      rounded-lg
                      border border-slate-200
                      bg-white
                      py-2.5
                      pl-9 pr-3
                      text-xs
                      text-slate-700
                      outline-none
                      placeholder:text-slate-400
                      focus:border-[#0B6B50]

                      dark:border-white/10
                      dark:bg-white/[0.03]
                      dark:text-white/80
                      dark:placeholder:text-white/25

                      sm:w-[230px]
                    "
                  />

                </div>


                {/* Filter */}

                <div
                  className="
                    flex items-center gap-2
                    rounded-lg
                    border border-slate-200
                    bg-white
                    px-3 py-2.5
                    text-[10px]
                    text-slate-500

                    dark:border-white/10
                    dark:bg-white/[0.03]
                    dark:text-white/50
                  "
                >

                  <Filter size={13} />

                  <select
                    value={filter}
                    onChange={(e) =>
                      setFilter(e.target.value)
                    }
                    className="bg-transparent outline-none dark:text-white/60"
                  >

                    <option
                      value="All"
                      className="bg-white dark:bg-[#0D2921]"
                    >
                      All Status
                    </option>

                    <option
                      value="Online"
                      className="bg-white dark:bg-[#0D2921]"
                    >
                      Online
                    </option>

                    <option
                      value="Warning"
                      className="bg-white dark:bg-[#0D2921]"
                    >
                      Warning
                    </option>

                    <option
                      value="Offline"
                      className="bg-white dark:bg-[#0D2921]"
                    >
                      Offline
                    </option>

                  </select>

                </div>

              </div>

            </div>


            {/* Table */}

            <div
              className="
                mt-5
                overflow-hidden
                rounded-2xl
                border border-slate-200
                bg-white
                shadow-[0_4px_20px_rgba(15,23,42,0.03)]
                transition-colors

                dark:border-white/10
                dark:bg-white/[0.03]
                dark:shadow-none
              "
            >

              <div className="overflow-x-auto">

                <table className="w-full min-w-[1050px]">

                  <thead>

                    <tr
                      className="
                        border-b
                        border-slate-100
                        bg-slate-50/70
                        text-left
                        text-[9px]
                        text-slate-400

                        dark:border-white/10
                        dark:bg-white/[0.03]
                        dark:text-white/30
                      "
                    >

                      <th className="px-5 py-4 font-medium">
                        Device
                      </th>

                      <th className="px-5 py-4 font-medium">
                        Type
                      </th>

                      <th className="px-5 py-4 font-medium">
                        Facility
                      </th>

                      <th className="px-5 py-4 font-medium">
                        Parameters
                      </th>

                      <th className="px-5 py-4 font-medium">
                        Status
                      </th>

                      <th className="px-5 py-4 font-medium">
                        Data Quality
                      </th>

                      <th className="px-5 py-4 font-medium">
                        Last Seen
                      </th>

                      <th className="px-5 py-4 text-right font-medium">
                        Action
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {filteredDevices.map(
                      (device) => (

                        <tr
                          key={device.id}
                          className="
                            border-b
                            border-slate-50
                            transition
                            hover:bg-slate-50/50
                            last:border-0

                            dark:border-white/[0.06]
                            dark:hover:bg-white/[0.03]
                          "
                        >


                          {/* Device */}

                          <td className="px-5 py-4">

                            <div className="flex items-center gap-3">

                              <div
                                className={`
                                  flex h-9 w-9
                                  shrink-0
                                  items-center justify-center
                                  rounded-lg

                                  ${
                                    device.status ===
                                    'Online'

                                      ? 'bg-emerald-50 text-[#0B6B50] dark:bg-emerald-500/10 dark:text-emerald-400'

                                      : device.status ===
                                        'Warning'

                                        ? 'bg-amber-50 text-amber-500 dark:bg-amber-500/10 dark:text-amber-400'

                                        : 'bg-red-50 text-red-500 dark:bg-red-500/10 dark:text-red-400'
                                  }
                                `}
                              >

                                <Cpu size={16} />

                              </div>


                              <div>

                                <p className="text-xs font-semibold text-slate-700 dark:text-white/75">
                                  {device.name}
                                </p>

                                <p className="mt-1 font-mono text-[8px] text-slate-400 dark:text-white/30">
                                  {device.id}
                                </p>

                              </div>

                            </div>

                          </td>


                          {/* Type */}

                          <td className="px-5 py-4">

                            <DeviceTypeBadge
                              type={device.type}
                            />

                          </td>


                          {/* Facility */}

                          <td className="px-5 py-4">

                            <div>

                              <p className="text-xs font-semibold text-slate-700 dark:text-white/75">
                                {device.plant}
                              </p>

                              <p className="mt-1 flex items-center gap-1 text-[9px] text-slate-400 dark:text-white/30">

                                <Factory size={9} />

                                {device.unit}

                              </p>

                            </div>

                          </td>


                          {/* Parameters */}

                          <td className="px-5 py-4">

                            <div className="flex items-center gap-1.5">

                              <Thermometer
                                size={12}
                                className="text-slate-400 dark:text-white/30"
                              />

                              <span className="text-[10px] text-slate-500 dark:text-white/45">
                                {device.parameter}
                              </span>

                            </div>

                          </td>


                          {/* Status */}

                          <td className="px-5 py-4">

                            <StatusBadge
                              status={device.status}
                            />

                          </td>


                          {/* Quality */}

                          <td className="px-5 py-4">

                            <DeviceHealth
                              quality={device.quality}
                            />

                          </td>


                          {/* Last Seen */}

                          <td className="px-5 py-4">

                            <span
                              className={`
                                font-mono
                                text-[9px]

                                ${
                                  device.status ===
                                  'Offline'
                                    ? 'text-red-500 dark:text-red-400'
                                    : 'text-slate-400 dark:text-white/30'
                                }
                              `}
                            >
                              {device.lastSeen}
                            </span>

                          </td>


                          {/* Actions */}

                          <td className="px-5 py-4">

                            <div className="flex justify-end gap-1.5">


                              <button
                                title="View"
                                className="
                                  flex h-8 w-8
                                  items-center justify-center
                                  rounded-lg
                                  border border-slate-200
                                  text-slate-400
                                  transition

                                  hover:bg-slate-50
                                  hover:text-[#0B6B50]

                                  dark:border-white/10
                                  dark:text-white/30
                                  dark:hover:bg-white/10
                                  dark:hover:text-emerald-400
                                "
                              >
                                <Gauge size={14} />
                              </button>


                              <button
                                title="Edit"
                                className="
                                  flex h-8 w-8
                                  items-center justify-center
                                  rounded-lg
                                  border border-slate-200
                                  text-slate-400
                                  transition

                                  hover:bg-slate-50
                                  hover:text-[#0B6B50]

                                  dark:border-white/10
                                  dark:text-white/30
                                  dark:hover:bg-white/10
                                  dark:hover:text-emerald-400
                                "
                              >
                                <Edit3 size={14} />
                              </button>


                              <button
                                title="More"
                                className="
                                  flex h-8 w-8
                                  items-center justify-center
                                  rounded-lg
                                  border border-slate-200
                                  text-slate-400
                                  transition

                                  hover:bg-slate-50

                                  dark:border-white/10
                                  dark:text-white/30
                                  dark:hover:bg-white/10
                                "
                              >
                                <ChevronDown size={14} />
                              </button>

                            </div>

                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

              </div>


              {/* Empty */}

              {filteredDevices.length === 0 && (

                <div className="py-16 text-center">

                  <Cpu
                    size={32}
                    className="mx-auto text-slate-300 dark:text-white/20"
                  />

                  <p className="mt-4 text-sm font-semibold text-slate-600 dark:text-white/60">
                    No devices found
                  </p>

                  <p className="mt-1 text-xs text-slate-400 dark:text-white/30">
                    Try changing your search or filter.
                  </p>

                </div>

              )}


              {/* Pagination */}

              <div
                className="
                  flex flex-col
                  gap-3
                  border-t border-slate-100
                  px-5 py-4

                  dark:border-white/10

                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >

                <p className="text-[9px] text-slate-400 dark:text-white/30">
                  Showing {filteredDevices.length}
                  {' '}
                  device
                  {filteredDevices.length === 1
                    ? ''
                    : 's'}
                  {' '}
                  at {selectedPlant}
                </p>


                <div className="flex items-center gap-1">

                  <button
                    className="
                      rounded-lg
                      border border-slate-200
                      px-3 py-1.5
                      text-[9px]
                      text-slate-400
                      transition

                      hover:bg-slate-50

                      dark:border-white/10
                      dark:text-white/30
                      dark:hover:bg-white/5
                    "
                  >
                    Previous
                  </button>


                  <button className="rounded-lg bg-[#0B6B50] px-3 py-1.5 text-[9px] font-semibold text-white">
                    1
                  </button>


                  <button
                    className="
                      rounded-lg
                      border border-slate-200
                      px-3 py-1.5
                      text-[9px]
                      text-slate-500
                      transition

                      hover:bg-slate-50

                      dark:border-white/10
                      dark:text-white/50
                      dark:hover:bg-white/5
                    "
                  >
                    2
                  </button>


                  <button
                    className="
                      rounded-lg
                      border border-slate-200
                      px-3 py-1.5
                      text-[9px]
                      text-slate-500
                      transition

                      hover:bg-slate-50

                      dark:border-white/10
                      dark:text-white/50
                      dark:hover:bg-white/5
                    "
                  >
                    3
                  </button>


                  <button
                    className="
                      rounded-lg
                      border border-slate-200
                      px-3 py-1.5
                      text-[9px]
                      text-slate-500
                      transition

                      hover:bg-slate-50

                      dark:border-white/10
                      dark:text-white/50
                      dark:hover:bg-white/5
                    "
                  >
                    Next
                  </button>

                </div>

              </div>

            </div>

          </section>


          {/* =================================================
              MAINTENANCE + FIRMWARE
          ================================================= */}

          <section className="mt-5 grid gap-5 lg:grid-cols-2">


            {/* Maintenance */}

            <div
              className="
                rounded-2xl
                border border-slate-200
                bg-white
                p-5
                transition-colors

                dark:border-white/10
                dark:bg-white/[0.03]
              "
            >

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-500 dark:bg-amber-500/10 dark:text-amber-400">
                  <Settings size={19} />
                </div>


                <div>

                  <h3 className="text-sm font-bold text-[#0F172A] dark:text-white">
                    Maintenance Required
                  </h3>

                  <p className="mt-1 text-[10px] text-slate-400 dark:text-white/30">
                    {selectedPlant} devices requiring inspection or service
                  </p>

                </div>

              </div>


              <div className="mt-5 grid grid-cols-3 gap-3">

                <div className="rounded-xl bg-red-50 p-3 text-center dark:bg-red-500/10">

                  <p className="text-lg font-bold text-red-500 dark:text-red-400">
                    12
                  </p>

                  <p className="text-[8px] text-red-600 dark:text-red-400">
                    Critical
                  </p>

                </div>


                <div className="rounded-xl bg-amber-50 p-3 text-center dark:bg-amber-500/10">

                  <p className="text-lg font-bold text-amber-600 dark:text-amber-400">
                    34
                  </p>

                  <p className="text-[8px] text-amber-700 dark:text-amber-400">
                    Due Soon
                  </p>

                </div>


                <div className="rounded-xl bg-emerald-50 p-3 text-center dark:bg-emerald-500/10">

                  <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                    248
                  </p>

                  <p className="text-[8px] text-emerald-700 dark:text-emerald-400">
                    Healthy
                  </p>

                </div>

              </div>


              <button
                className="
                  mt-5
                  w-full
                  rounded-lg
                  border border-slate-200
                  py-2.5
                  text-[10px]
                  font-semibold
                  text-slate-600
                  transition

                  hover:bg-slate-50

                  dark:border-white/10
                  dark:text-white/50
                  dark:hover:bg-white/5
                "
              >
                View Maintenance Schedule
              </button>

            </div>


            {/* Firmware */}

            <div
              className="
                rounded-2xl
                border border-slate-200
                bg-white
                p-5
                transition-colors

                dark:border-white/10
                dark:bg-white/[0.03]
              "
            >

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-500 dark:bg-blue-500/10 dark:text-blue-400">
                  <RefreshCw size={19} />
                </div>


                <div>

                  <h3 className="text-sm font-bold text-[#0F172A] dark:text-white">
                    Firmware Status
                  </h3>

                  <p className="mt-1 text-[10px] text-slate-400 dark:text-white/30">
                    Device software and firmware versions
                  </p>

                </div>

              </div>


              <div className="mt-5 space-y-3">


                {/* CEMS Firmware */}

                <div
                  className="
                    flex items-center
                    justify-between
                    rounded-xl
                    border border-slate-100
                    p-3

                    dark:border-white/[0.07]
                  "
                >

                  <div>

                    <p className="text-xs font-semibold text-slate-700 dark:text-white/75">
                      v2.4.1
                    </p>

                    <p className="mt-1 text-[9px] text-slate-400 dark:text-white/30">
                      Latest CEMS firmware
                    </p>

                  </div>


                  <span className="rounded-full bg-emerald-50 px-2 py-1 text-[8px] font-semibold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                    6,214 devices
                  </span>

                </div>


                {/* CEQMS Firmware */}

                <div
                  className="
                    flex items-center
                    justify-between
                    rounded-xl
                    border border-slate-100
                    p-3

                    dark:border-white/[0.07]
                  "
                >

                  <div>

                    <p className="text-xs font-semibold text-slate-700 dark:text-white/75">
                      v1.9.0
                    </p>

                    <p className="mt-1 text-[9px] text-slate-400 dark:text-white/30">
                      Latest CEQMS firmware
                    </p>

                  </div>


                  <span className="rounded-full bg-blue-50 px-2 py-1 text-[8px] font-semibold text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                    3,421 devices
                  </span>

                </div>

              </div>


              <button
                className="
                  mt-5
                  w-full
                  rounded-lg
                  border border-slate-200
                  py-2.5
                  text-[10px]
                  font-semibold
                  text-slate-600
                  transition

                  hover:bg-slate-50

                  dark:border-white/10
                  dark:text-white/50
                  dark:hover:bg-white/5
                "
              >
                Manage Firmware
              </button>

            </div>

          </section>


          {/* =================================================
              FOOTER
          ================================================= */}

          <section
            className="
              mt-5
              flex flex-col
              gap-3
              rounded-2xl
              border border-emerald-100
              bg-emerald-50/50
              p-5
              transition-colors

              dark:border-emerald-500/20
              dark:bg-emerald-500/10

              sm:flex-row
              sm:items-center
            "
          >

            <div
              className="
                flex h-10 w-10
                items-center justify-center
                rounded-xl
                bg-emerald-100
                text-emerald-600

                dark:bg-emerald-500/10
                dark:text-emerald-400
              "
            >
              <Cpu size={19} />
            </div>


            <div className="flex-1">

              <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                Device monitoring is active
              </p>

              <p className="mt-1 text-[10px] text-emerald-700/70 dark:text-emerald-300/50">
                EcoTrust continuously tracks device connectivity,
                sensor health, data quality and communication status.
              </p>

            </div>


            <span
              className="
                flex items-center gap-1.5
                rounded-full
                bg-white
                px-3 py-1.5
                text-[9px]
                font-semibold
                text-emerald-600

                dark:bg-white/10
                dark:text-emerald-400
              "
            >

              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />

              System Active

            </span>

          </section>

        </main>

      </div>

    </div>

  );
}