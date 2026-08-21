import {
  Bell,
  CheckCircle2,
  ChevronDown,
  Edit3,
  Factory,
  FileText,
  Gauge,
  KeyRound,
  LayoutDashboard,
  Leaf,
  Lock,
  Mail,
  MapPin,
  Menu,
  Moon,
  Phone,
  Radio,
  Save,
  Settings,
  ShieldCheck,
  Sun,
  User,
  X,
} from 'lucide-react';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toggleTheme } from '../features/Theme/Theme_slice';


// ============================================================
// THEME TOGGLE
// ============================================================

function ThemeToggle() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={() => dispatch(toggleTheme())}
      aria-label={
        isDark ? 'Switch to light mode' : 'Switch to dark mode'
      }
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}


// ============================================================
// SIDEBAR
// ============================================================

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
      path: '/alerts',
      badge: '12',
    },
    {
      name: 'Compliance',
      icon: ShieldCheck,
      path: '/compliance',
    },
    {
      name: 'Reports',
      icon: FileText,
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
      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-[250px] flex-col bg-[#052E24] text-white transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-white/10 px-6">
          <div
            onClick={() => navigate('/')}
            className="flex cursor-pointer items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0B6B50]">
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
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
                    item.path === '/profile'
                      ? 'bg-[#0B6B50] text-white'
                      : 'text-white/55 hover:bg-white/5 hover:text-white'
                  }`}
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

          {/* System */}
          <p className="mb-3 mt-8 px-3 text-[10px] font-semibold uppercase tracking-widest text-white/30">
            System
          </p>

          <button
            onClick={() => navigate('/settings')}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/55 transition hover:bg-white/5 hover:text-white"
          >
            <Settings size={18} />

            <span className="flex-1 text-left">
              Settings
            </span>
          </button>

          {/* Current Profile */}
          <button
            onClick={() => navigate('/profile')}
            className="mt-1 flex w-full items-center gap-3 rounded-xl bg-[#0B6B50] px-3 py-3 text-sm text-white"
          >
            <User size={18} />

            <span className="flex-1 text-left">
              My Profile
            </span>
          </button>
        </div>

        {/* System Status */}
        <div className="shrink-0 border-t border-white/10 p-4">
          <div className="rounded-xl bg-white/5 p-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

              <span className="text-xs font-medium">
                All systems operational
              </span>
            </div>

            <p className="mt-2 text-[10px] text-white/40">
              Last synchronized 12 sec ago
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}


// ============================================================
// INFO FIELD
// ============================================================

function InfoField({
  label,
  value,
  icon: Icon,
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 dark:border-white/10 dark:bg-white/[0.03]">
      <div className="flex items-center gap-2">
        <Icon
          size={14}
          className="text-[#0B6B50] dark:text-emerald-400"
        />

        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          {label}
        </p>
      </div>

      <p className="mt-2 text-sm font-semibold text-slate-800 dark:text-white">
        {value}
      </p>
    </div>
  );
}


// ============================================================
// STAT CARD
// ============================================================

function StatCard({
  value,
  label,
  icon: Icon,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_4px_20px_rgba(15,23,42,0.03)] dark:border-white/10 dark:bg-[#0B241D]">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-[#0B6B50] dark:bg-emerald-400/10 dark:text-emerald-300">
          <Icon size={18} />
        </div>

        <div>
          <p className="text-lg font-bold text-slate-900 dark:text-white">
            {value}
          </p>

          <p className="text-[9px] text-slate-400">
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}


// ============================================================
// ACTIVITY DATA
// ============================================================

const activity = [
  {
    icon: ShieldCheck,
    title: 'Compliance review completed',
    description: 'Plant A · Delhi NCR',
    time: '12 min ago',
  },
  {
    icon: Bell,
    title: 'Alert acknowledged',
    description: 'High PM2.5 · Plant C',
    time: '34 min ago',
  },
  {
    icon: FileText,
    title: 'Monthly report generated',
    description: 'Environmental compliance report',
    time: '2 hours ago',
  },
  {
    icon: Factory,
    title: 'Factory monitoring updated',
    description: 'Plant B · Uttar Pradesh',
    time: '5 hours ago',
  },
];


// ============================================================
// ADMIN PROFILE
// ============================================================

export default function AdminProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const theme = useSelector(
    (state) => state.theme.theme
  );

  const isDark = theme === 'dark';

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [editing, setEditing] =
    useState(false);

  const [profile, setProfile] = useState({
    name: 'Varun Bajpai',
    email: 'admin@ecotrust.gov.in',
    phone: '+91 98765 43210',
    department:
      'Environmental Monitoring Department',
    role: 'Environmental Officer',
    jurisdiction: 'Uttar Pradesh',
  });

  // Theme
  useEffect(() => {
    document.documentElement.classList.toggle(
      'dark',
      isDark
    );
  }, [isDark]);

  // Handle profile changes
  const handleChange = (
    field,
    value
  ) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Toggle editing
  const handleEdit = () => {
    setEditing((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-[#F7FAF8] font-[Inter,sans-serif] text-[#0F172A] transition-colors duration-300 dark:bg-[#071A15] dark:text-white">

      {/* ======================================================
          SIDEBAR
      ====================================================== */}

      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />

      {/* ======================================================
          MAIN CONTENT
      ====================================================== */}

      <div className="min-w-0 lg:ml-[250px]">

        {/* ====================================================
            HEADER
        ==================================================== */}

        <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-slate-200 bg-white/90 px-5 backdrop-blur-xl dark:border-white/10 dark:bg-[#071A15]/90 lg:px-8">

          <div className="flex items-center gap-4">

            {/* Mobile Menu */}
            <button
              onClick={() =>
                setSidebarOpen(true)
              }
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5 lg:hidden"
            >
              <Menu size={21} />
            </button>

            <div>
              <h1 className="text-lg font-bold text-[#0F172A] dark:text-white">
                Admin Profile
              </h1>

              <p className="hidden text-[10px] text-slate-400 dark:text-slate-500 sm:block">
                Manage your EcoTrust account
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">

            {/* Theme */}
            <ThemeToggle />

            {/* Notifications */}
            <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 dark:border-white/10 dark:bg-[#0B241D] dark:text-slate-300">
              <Bell size={17} />

              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full border-2 border-white bg-red-500 dark:border-[#071A15]" />
            </button>

            {/* Back */}
            <button
              onClick={() =>
                navigate('/dashboard')
              }
              className="hidden text-xs font-semibold text-[#0B6B50] hover:underline sm:block dark:text-emerald-400"
            >
              Back to Dashboard
            </button>
          </div>
        </header>


        {/* ====================================================
            MAIN
        ==================================================== */}

        <main className="mx-auto max-w-[1250px] p-5 lg:p-8">


          {/* ==================================================
              PROFILE HERO
          ================================================== */}

          <section className="relative overflow-hidden rounded-2xl bg-[#052E24] p-6 text-white shadow-lg lg:p-8">

            {/* Background Glow */}
            <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" />

            <div className="absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" />

            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

              {/* User */}
              <div className="flex items-center gap-5">

                {/* Avatar */}
                <div className="relative">

                  <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-[#0B6B50] text-2xl font-bold shadow-lg">
                    VB
                  </div>

                  {/* Online */}
                  <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-[#052E24] bg-emerald-400" />

                </div>

                {/* User Information */}
                <div>

                  <div className="flex flex-wrap items-center gap-2">

                    <h2 className="text-2xl font-bold">
                      {profile.name}
                    </h2>

                    <span className="rounded-full bg-emerald-400/15 px-2.5 py-1 text-[9px] font-semibold text-emerald-300">
                      VERIFIED ADMIN
                    </span>

                  </div>

                  <p className="mt-1 text-sm text-white/60">
                    {profile.role}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-3 text-[10px] text-white/45">

                    <span className="flex items-center gap-1">
                      <MapPin size={12} />
                      {profile.jurisdiction}
                    </span>

                    <span className="flex items-center gap-1">
                      <ShieldCheck size={12} />
                      Admin Access
                    </span>

                  </div>
                </div>
              </div>


              {/* Edit Button */}
              <button
                onClick={handleEdit}
                className="flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-semibold text-[#052E24] transition hover:bg-emerald-50"
              >

                {editing ? (
                  <>
                    <Save size={15} />
                    Save Changes
                  </>
                ) : (
                  <>
                    <Edit3 size={15} />
                    Edit Profile
                  </>
                )}

              </button>

            </div>
          </section>


          {/* ==================================================
              PROFILE STATISTICS
          ================================================== */}

          <section className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">

            <StatCard
              value="1,284"
              label="Factories monitored"
              icon={Factory}
            />

            <StatCard
              value="89"
              label="Alerts handled"
              icon={Bell}
            />

            <StatCard
              value="248"
              label="Reports generated"
              icon={FileText}
            />

            <StatCard
              value="98.7%"
              label="Compliance oversight"
              icon={ShieldCheck}
            />

          </section>


          {/* ==================================================
              ACCOUNT + SECURITY
          ================================================== */}

          <section className="mt-5 grid gap-5 xl:grid-cols-[1.4fr_.8fr]">


            {/* =================================================
                ACCOUNT INFORMATION
            ================================================= */}

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.03)] dark:border-white/10 dark:bg-[#0B241D] lg:p-6">

              <div className="flex items-center justify-between">

                <div>

                  <h3 className="text-sm font-bold">
                    Account Information
                  </h3>

                  <p className="mt-1 text-[11px] text-slate-400">
                    Your personal and administrative information
                  </p>

                </div>

                <User
                  size={18}
                  className="text-[#0B6B50] dark:text-emerald-400"
                />

              </div>


              <div className="mt-5 grid gap-3 sm:grid-cols-2">

                {editing ? (
                  <>
                    {/* Name */}
                    <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 dark:border-white/10 dark:bg-white/[0.03]">

                      <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                        Full Name
                      </label>

                      <input
                        value={profile.name}
                        onChange={(e) =>
                          handleChange(
                            'name',
                            e.target.value
                          )
                        }
                        className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium outline-none focus:border-emerald-500 dark:border-white/10 dark:bg-[#071A15] dark:text-white"
                      />

                    </div>


                    {/* Email */}
                    <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 dark:border-white/10 dark:bg-white/[0.03]">

                      <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                        Email Address
                      </label>

                      <input
                        value={profile.email}
                        onChange={(e) =>
                          handleChange(
                            'email',
                            e.target.value
                          )
                        }
                        className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium outline-none focus:border-emerald-500 dark:border-white/10 dark:bg-[#071A15] dark:text-white"
                      />

                    </div>


                    {/* Phone */}
                    <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 dark:border-white/10 dark:bg-white/[0.03]">

                      <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                        Phone Number
                      </label>

                      <input
                        value={profile.phone}
                        onChange={(e) =>
                          handleChange(
                            'phone',
                            e.target.value
                          )
                        }
                        className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium outline-none focus:border-emerald-500 dark:border-white/10 dark:bg-[#071A15] dark:text-white"
                      />

                    </div>


                    {/* Department */}
                    <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 dark:border-white/10 dark:bg-white/[0.03]">

                      <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                        Department
                      </label>

                      <input
                        value={profile.department}
                        onChange={(e) =>
                          handleChange(
                            'department',
                            e.target.value
                          )
                        }
                        className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium outline-none focus:border-emerald-500 dark:border-white/10 dark:bg-[#071A15] dark:text-white"
                      />

                    </div>


                    {/* Role */}
                    <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 dark:border-white/10 dark:bg-white/[0.03]">

                      <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                        Role
                      </label>

                      <input
                        value={profile.role}
                        onChange={(e) =>
                          handleChange(
                            'role',
                            e.target.value
                          )
                        }
                        className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium outline-none focus:border-emerald-500 dark:border-white/10 dark:bg-[#071A15] dark:text-white"
                      />

                    </div>


                    {/* Jurisdiction */}
                    <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 dark:border-white/10 dark:bg-white/[0.03]">

                      <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                        Jurisdiction
                      </label>

                      <input
                        value={profile.jurisdiction}
                        onChange={(e) =>
                          handleChange(
                            'jurisdiction',
                            e.target.value
                          )
                        }
                        className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium outline-none focus:border-emerald-500 dark:border-white/10 dark:bg-[#071A15] dark:text-white"
                      />

                    </div>
                  </>
                ) : (
                  <>
                    <InfoField
                      label="Full Name"
                      value={profile.name}
                      icon={User}
                    />

                    <InfoField
                      label="Email Address"
                      value={profile.email}
                      icon={Mail}
                    />

                    <InfoField
                      label="Phone Number"
                      value={profile.phone}
                      icon={Phone}
                    />

                    <InfoField
                      label="Department"
                      value={profile.department}
                      icon={Factory}
                    />

                    <InfoField
                      label="Role"
                      value={profile.role}
                      icon={ShieldCheck}
                    />

                    <InfoField
                      label="Jurisdiction"
                      value={profile.jurisdiction}
                      icon={MapPin}
                    />
                  </>
                )}

              </div>
            </div>


            {/* =================================================
                RIGHT SIDE
            ================================================= */}

            <div className="space-y-5">


              {/* Permissions */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.03)] dark:border-white/10 dark:bg-[#0B241D]">

                <div className="flex items-center gap-3">

                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-[#0B6B50] dark:bg-emerald-400/10 dark:text-emerald-300">
                    <ShieldCheck size={17} />
                  </div>

                  <div>

                    <h3 className="text-sm font-bold">
                      Access & Permissions
                    </h3>

                    <p className="text-[10px] text-slate-400">
                      Administrative privileges
                    </p>

                  </div>

                </div>


                <div className="mt-5 space-y-3">

                  {[
                    'View environmental data',
                    'Monitor factories',
                    'Review compliance violations',
                    'Manage alerts',
                    'Generate official reports',
                  ].map((permission) => (

                    <div
                      key={permission}
                      className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300"
                    >

                      <CheckCircle2
                        size={14}
                        className="text-emerald-500"
                      />

                      {permission}

                    </div>

                  ))}

                </div>

              </div>


              {/* Security */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.03)] dark:border-white/10 dark:bg-[#0B241D]">

                <div className="flex items-center gap-3">

                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600 dark:bg-white/5 dark:text-slate-300">
                    <Lock size={16} />
                  </div>

                  <div>

                    <h3 className="text-sm font-bold">
                      Security
                    </h3>

                    <p className="text-[10px] text-slate-400">
                      Account protection
                    </p>

                  </div>

                </div>


                <div className="mt-5 space-y-2">

                  {/* Password */}
                  <button className="flex w-full items-center justify-between rounded-xl border border-slate-200 p-3 text-left transition hover:bg-slate-50 dark:border-white/10 dark:hover:bg-white/5">

                    <span className="flex items-center gap-2 text-xs font-medium">

                      <KeyRound size={14} />

                      Change password

                    </span>

                    <ChevronDown
                      size={14}
                      className="-rotate-90 text-slate-400"
                    />

                  </button>


                  {/* 2FA */}
                  <button className="flex w-full items-center justify-between rounded-xl border border-slate-200 p-3 text-left transition hover:bg-slate-50 dark:border-white/10 dark:hover:bg-white/5">

                    <span className="flex items-center gap-2 text-xs font-medium">

                      <ShieldCheck size={14} />

                      Two-factor authentication

                    </span>

                    <span className="rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-semibold text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400">
                      Enabled
                    </span>

                  </button>

                </div>

              </div>

            </div>

          </section>


          {/* ==================================================
              RECENT ACTIVITY
          ================================================== */}

          <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.03)] dark:border-white/10 dark:bg-[#0B241D] lg:p-6">

            <div className="flex items-center justify-between">

              <div>

                <h3 className="text-sm font-bold">
                  Recent Admin Activity
                </h3>

                <p className="mt-1 text-[11px] text-slate-400">
                  Your latest actions across EcoTrust
                </p>

              </div>

              <button className="text-[10px] font-semibold text-[#0B6B50] hover:underline dark:text-emerald-400">
                View activity log →
              </button>

            </div>


            <div className="mt-5 grid gap-3 lg:grid-cols-2">

              {activity.map((item) => {

                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 dark:border-white/10"
                  >

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-[#0B6B50] dark:bg-emerald-400/10 dark:text-emerald-300">
                      <Icon size={16} />
                    </div>

                    <div className="min-w-0 flex-1">

                      <p className="truncate text-xs font-semibold">
                        {item.title}
                      </p>

                      <p className="mt-0.5 truncate text-[9px] text-slate-400">
                        {item.description}
                      </p>

                    </div>

                    <span className="shrink-0 text-[9px] text-slate-400">
                      {item.time}
                    </span>

                  </div>
                );
              })}

            </div>

          </section>


          {/* ==================================================
              SECURITY STATUS
          ================================================== */}

          <div className="mt-5 flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50 p-4 dark:border-emerald-400/10 dark:bg-emerald-400/5">

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-400">
              <ShieldCheck size={17} />
            </div>

            <div>

              <p className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                Your account is secure
              </p>

              <p className="mt-0.5 text-[10px] text-emerald-700/70 dark:text-emerald-400/60">
                Last security verification was completed today.
              </p>

            </div>

          </div>

        </main>
      </div>
    </div>
  );
}