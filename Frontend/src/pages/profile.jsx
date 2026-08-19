import {
  Bell,
  Building2,
  CheckCircle2,
  ChevronDown,
  Edit3,
  Factory,
  FileText,
  KeyRound,
  Leaf,
  Lock,
  LogOut,
  Mail,
  MapPin,
  Menu,
  Moon,
  Phone,
  ShieldCheck,
  Settings,
  Sun,
  User,
  X,
  LayoutDashboard,
  Radio,
  LineChart,
  Gauge
} from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/Theme/Theme_slice";


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
      active: true,
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
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Logo */}

        <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-white/10 px-6">
          <div className="flex items-center gap-3">

            <div
              onClick={() => navigate("/")}
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
                  className="
                    flex w-full
                    items-center gap-3
                    rounded-xl
                    px-3 py-3
                    text-sm
                    text-white/55
                    transition
                    hover:bg-white/5
                    hover:text-white
                  "
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
            onClick={() => navigate("/settings")}
            className="
              flex w-full
              items-center gap-3
              rounded-xl
              px-3 py-3
              text-sm
              text-white/55
              transition
              hover:bg-white/5
              hover:text-white
            "
          >
            <Settings size={18} />
            Settings
          </button>

        </div>


        {/* Sidebar bottom */}

        <div className="shrink-0 border-t border-white/10 p-4">

          <div className="rounded-xl bg-white/5 p-4">

            <div className="flex items-center gap-2">

              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

              <span className="text-xs font-medium">
                System active
              </span>

            </div>

            <p className="mt-2 text-[10px] text-white/40">
              EcoTrust monitoring services running
            </p>

          </div>

        </div>

      </aside>
    </>
  );
}


/* =========================================================
   INFO ITEM
========================================================= */

function InfoItem({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="flex items-start gap-3">

      <div
        className="
          flex h-9 w-9
          shrink-0
          items-center justify-center
          rounded-lg
          bg-slate-50
          text-slate-500

          dark:bg-white/[0.05]
          dark:text-white/40
        "
      >
        <Icon size={16} />
      </div>

      <div className="min-w-0">

        <p className="text-[9px] font-medium uppercase tracking-wide text-slate-400 dark:text-white/25">
          {label}
        </p>

        <p className="mt-1 truncate text-xs font-semibold text-slate-700 dark:text-white/75">
          {value}
        </p>

      </div>

    </div>
  );
}


/* =========================================================
   PROFILE
========================================================= */

export default function Profile() {

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();


  /* =======================================================
     THEME
  ======================================================= */

  const theme = useSelector(
    (state) => state.theme.theme
  );

  const isDark = theme === "dark";


  useEffect(() => {

    const root =
      document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

  }, [theme]);


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

      {/* ===================================================
          SIDEBAR
      =================================================== */}

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
                Profile
              </h1>

              <p className="hidden text-[10px] text-slate-400 dark:text-white/35 sm:block">
                Manage your EcoTrust account and organization details
              </p>

            </div>

          </div>


          <div className="flex items-center gap-2">

            {/* Theme */}

            <button
              onClick={() =>
                dispatch(toggleTheme())
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


            {/* Notification */}

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

            <button
              onClick={() =>
                navigate("/profile")
              }
              className="flex items-center gap-2"
            >

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0B6B50] text-xs font-bold text-white">
                VB
              </div>

              <div className="hidden text-left sm:block">

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

            </button>

          </div>

        </header>


        {/* =================================================
            MAIN
        ================================================= */}

        <main className="mx-auto max-w-[1450px] p-5 lg:p-8">


          {/* =================================================
              PAGE INTRO
          ================================================= */}

          <div className="mb-7">

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
              <User size={11} />
              ACCOUNT PROFILE
            </span>


            <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#0F172A] dark:text-white">
              Your Profile
            </h2>


            <p className="mt-1 text-sm text-slate-500 dark:text-white/45">
              Manage your personal information, organization access
              and account security.
            </p>

          </div>


          {/* =================================================
              PROFILE HERO
          ================================================= */}

          <section
            className="
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

            {/* Green banner */}

            <div
              className="
                h-28
                bg-gradient-to-r
                from-[#064E3B]
                via-[#0B6B50]
                to-[#0F8A68]

                dark:from-[#06382D]
                dark:via-[#07503D]
                dark:to-[#08634B]
              "
            />


            <div className="px-5 pb-6 lg:px-7">

              <div className="-mt-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

                <div className="flex items-end gap-4">

                  {/* Avatar */}

                  <div
                    className="
                      flex h-24 w-24
                      shrink-0
                      items-center justify-center
                      rounded-2xl
                      border-4
                      border-white
                      bg-[#0B6B50]
                      text-2xl
                      font-bold
                      text-white
                      shadow-xl

                      dark:border-[#071A15]
                    "
                  >
                    VB
                  </div>


                  <div className="pb-1">

                    <h3 className="text-xl font-bold text-[#0F172A] dark:text-white">
                      Varun Bajpai
                    </h3>

                    <p className="mt-1 text-xs text-slate-500 dark:text-white/40">
                      Environmental Officer
                    </p>

                  </div>

                </div>


                <button
                  className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    bg-[#0B6B50]
                    px-4 py-2.5
                    text-xs
                    font-semibold
                    text-white
                    transition
                    hover:bg-[#064E3B]
                  "
                >
                  <Edit3 size={14} />
                  Edit Profile
                </button>

              </div>


              {/* Status */}

              <div className="mt-5 flex flex-wrap gap-2">

                <span
                  className="
                    flex items-center gap-1.5
                    rounded-full
                    bg-emerald-50
                    px-3 py-1.5
                    text-[9px]
                    font-semibold
                    text-emerald-600

                    dark:bg-emerald-500/10
                    dark:text-emerald-400
                  "
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Account Active
                </span>


                <span
                  className="
                    rounded-full
                    bg-blue-50
                    px-3 py-1.5
                    text-[9px]
                    font-semibold
                    text-blue-600

                    dark:bg-blue-500/10
                    dark:text-blue-400
                  "
                >
                  Administrator
                </span>


                <span
                  className="
                    rounded-full
                    bg-slate-100
                    px-3 py-1.5
                    text-[9px]
                    font-semibold
                    text-slate-500

                    dark:bg-white/[0.06]
                    dark:text-white/40
                  "
                >
                  Verified Account
                </span>

              </div>

            </div>

          </section>


          {/* =================================================
              CONTENT GRID
          ================================================= */}

          <section className="mt-5 grid gap-5 xl:grid-cols-[1.3fr_.7fr]">


            {/* =================================================
                PERSONAL INFORMATION
            ================================================= */}

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

              <div className="flex items-center justify-between">

                <div>

                  <h3 className="text-sm font-bold text-[#0F172A] dark:text-white">
                    Personal Information
                  </h3>

                  <p className="mt-1 text-[10px] text-slate-400 dark:text-white/30">
                    Your basic account information
                  </p>

                </div>


                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-[#0B6B50] dark:bg-emerald-500/10 dark:text-emerald-400">
                  <User size={16} />
                </div>

              </div>


              <div className="mt-6 grid gap-6 sm:grid-cols-2">

                <InfoItem
                  icon={User}
                  label="Full Name"
                  value="Varun Bajpai"
                />

                <InfoItem
                  icon={Mail}
                  label="Email Address"
                  value="varun@ecotrust.in"
                />

                <InfoItem
                  icon={Phone}
                  label="Phone Number"
                  value="+91 98765 43210"
                />

                <InfoItem
                  icon={MapPin}
                  label="Location"
                  value="Uttar Pradesh, India"
                />

              </div>

            </div>


            {/* =================================================
                ACCOUNT SECURITY
            ================================================= */}

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

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-[#0B6B50] dark:bg-emerald-500/10 dark:text-emerald-400">
                  <ShieldCheck size={19} />
                </div>

                <div>

                  <h3 className="text-sm font-bold text-[#0F172A] dark:text-white">
                    Account Security
                  </h3>

                  <p className="mt-1 text-[10px] text-slate-400 dark:text-white/30">
                    Keep your account protected
                  </p>

                </div>

              </div>


              <div className="mt-5 space-y-3">

                <button
                  className="
                    flex w-full
                    items-center
                    justify-between
                    rounded-xl
                    border border-slate-100
                    p-3
                    text-left
                    transition

                    hover:bg-slate-50

                    dark:border-white/[0.07]
                    dark:hover:bg-white/[0.04]
                  "
                >

                  <div className="flex items-center gap-3">

                    <KeyRound
                      size={16}
                      className="text-slate-400 dark:text-white/35"
                    />

                    <div>

                      <p className="text-xs font-semibold text-slate-700 dark:text-white/70">
                        Change Password
                      </p>

                      <p className="mt-1 text-[9px] text-slate-400 dark:text-white/25">
                        Update your login password
                      </p>

                    </div>

                  </div>

                  <ChevronDown
                    size={14}
                    className="-rotate-90 text-slate-400 dark:text-white/30"
                  />

                </button>


                <button
                  className="
                    flex w-full
                    items-center
                    justify-between
                    rounded-xl
                    border border-slate-100
                    p-3
                    text-left
                    transition

                    hover:bg-slate-50

                    dark:border-white/[0.07]
                    dark:hover:bg-white/[0.04]
                  "
                >

                  <div className="flex items-center gap-3">

                    <Lock
                      size={16}
                      className="text-slate-400 dark:text-white/35"
                    />

                    <div>

                      <p className="text-xs font-semibold text-slate-700 dark:text-white/70">
                        Two-Factor Authentication
                      </p>

                      <p className="mt-1 text-[9px] text-slate-400 dark:text-white/25">
                        Add another layer of security
                      </p>

                    </div>

                  </div>


                  <span
                    className="
                      rounded-full
                      bg-emerald-50
                      px-2 py-1
                      text-[8px]
                      font-semibold
                      text-emerald-600

                      dark:bg-emerald-500/10
                      dark:text-emerald-400
                    "
                  >
                    Enabled
                  </span>

                </button>

              </div>

            </div>

          </section>


          {/* =================================================
              ORGANIZATION
          ================================================= */}

          <section
            className="
              mt-5
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

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-[#0B6B50] dark:bg-emerald-500/10 dark:text-emerald-400">
                <Building2 size={19} />
              </div>

              <div>

                <h3 className="text-sm font-bold text-[#0F172A] dark:text-white">
                  Organization & Access
                </h3>

                <p className="mt-1 text-[10px] text-slate-400 dark:text-white/30">
                  Your EcoTrust organization and assigned facilities
                </p>

              </div>

            </div>


            <div className="mt-5 grid gap-4 md:grid-cols-3">

              {/* Organization */}

              <div
                className="
                  rounded-xl
                  border border-slate-100
                  p-4

                  dark:border-white/[0.07]
                "
              >

                <p className="text-[9px] uppercase tracking-wide text-slate-400 dark:text-white/25">
                  Organization
                </p>

                <p className="mt-2 text-sm font-bold text-slate-700 dark:text-white/75">
                  EcoTrust Authority
                </p>

                <p className="mt-1 text-[9px] text-slate-400 dark:text-white/30">
                  Environmental Monitoring Division
                </p>

              </div>


              {/* Role */}

              <div
                className="
                  rounded-xl
                  border border-slate-100
                  p-4

                  dark:border-white/[0.07]
                "
              >

                <p className="text-[9px] uppercase tracking-wide text-slate-400 dark:text-white/25">
                  Access Role
                </p>

                <p className="mt-2 text-sm font-bold text-slate-700 dark:text-white/75">
                  Environmental Officer
                </p>

                <p className="mt-1 text-[9px] text-slate-400 dark:text-white/30">
                  Full monitoring access
                </p>

              </div>


              {/* Joined */}

              <div
                className="
                  rounded-xl
                  border border-slate-100
                  p-4

                  dark:border-white/[0.07]
                "
              >

                <p className="text-[9px] uppercase tracking-wide text-slate-400 dark:text-white/25">
                  Member Since
                </p>

                <p className="mt-2 text-sm font-bold text-slate-700 dark:text-white/75">
                  January 2026
                </p>

                <p className="mt-1 text-[9px] text-slate-400 dark:text-white/30">
                  Account verified
                </p>

              </div>

            </div>

          </section>


          {/* =================================================
              ASSIGNED PLANTS
          ================================================= */}

          <section className="mt-5">

            <div className="mb-4">

              <h3 className="text-sm font-bold text-[#0F172A] dark:text-white">
                Assigned Facilities
              </h3>

              <p className="mt-1 text-[10px] text-slate-400 dark:text-white/30">
                Facilities currently under your monitoring access
              </p>

            </div>


            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">


              {[
                {
                  name: "Plant A",
                  devices: "124 devices",
                  status: "Healthy",
                },
                {
                  name: "Plant B",
                  devices: "98 devices",
                  status: "Attention",
                },
                {
                  name: "Plant C",
                  devices: "76 devices",
                  status: "Healthy",
                },
                {
                  name: "Plant D",
                  devices: "112 devices",
                  status: "Healthy",
                },
              ].map((plant) => (

                <div
                  key={plant.name}
                  className="
                    rounded-2xl
                    border border-slate-200
                    bg-white
                    p-4
                    transition

                    hover:-translate-y-0.5
                    hover:shadow-[0_8px_25px_rgba(15,23,42,0.06)]

                    dark:border-white/10
                    dark:bg-white/[0.03]
                    dark:hover:bg-white/[0.05]
                    dark:hover:shadow-none
                  "
                >

                  <div className="flex items-start justify-between">

                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-[#0B6B50] dark:bg-emerald-500/10 dark:text-emerald-400">
                      <Factory size={16} />
                    </div>


                    <span
                      className={`
                        rounded-full
                        px-2 py-1
                        text-[8px]
                        font-semibold

                        ${
                          plant.status === "Healthy"
                            ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                            : "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400"
                        }
                      `}
                    >
                      {plant.status}
                    </span>

                  </div>


                  <h4 className="mt-4 text-sm font-bold text-slate-700 dark:text-white/75">
                    {plant.name}
                  </h4>

                  <p className="mt-1 text-[9px] text-slate-400 dark:text-white/30">
                    {plant.devices}
                  </p>


                  <button
                    onClick={() =>
                      navigate("/devices")
                    }
                    className="
                      mt-4
                      text-[9px]
                      font-semibold
                      text-[#0B6B50]

                      hover:underline

                      dark:text-emerald-400
                    "
                  >
                    View facility →
                  </button>

                </div>

              ))}

            </div>

          </section>


          {/* =================================================
              RECENT ACTIVITY + ACCOUNT
          ================================================= */}

          <section className="mt-5 grid gap-5 lg:grid-cols-[1.3fr_.7fr]">


            {/* Activity */}

            <div
              className="
                rounded-2xl
                border border-slate-200
                bg-white
                p-5

                dark:border-white/10
                dark:bg-white/[0.03]
              "
            >

              <div className="flex items-center justify-between">

                <div>

                  <h3 className="text-sm font-bold text-[#0F172A] dark:text-white">
                    Recent Account Activity
                  </h3>

                  <p className="mt-1 text-[10px] text-slate-400 dark:text-white/30">
                    Recent actions performed on EcoTrust
                  </p>

                </div>

                <CheckCircle2
                  size={18}
                  className="text-emerald-500"
                />

              </div>


              <div className="mt-5 space-y-4">


                <div className="flex gap-3">

                  <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />

                  <div className="flex-1">

                    <p className="text-xs font-medium text-slate-700 dark:text-white/70">
                      Viewed Plant A device health
                    </p>

                    <p className="mt-1 text-[9px] text-slate-400 dark:text-white/25">
                      Today · 10:42 AM
                    </p>

                  </div>

                </div>


                <div className="flex gap-3">

                  <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500" />

                  <div className="flex-1">

                    <p className="text-xs font-medium text-slate-700 dark:text-white/70">
                      Generated compliance report
                    </p>

                    <p className="mt-1 text-[9px] text-slate-400 dark:text-white/25">
                      Today · 09:18 AM
                    </p>

                  </div>

                </div>


                <div className="flex gap-3">

                  <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber-500" />

                  <div className="flex-1">

                    <p className="text-xs font-medium text-slate-700 dark:text-white/70">
                      Reviewed environmental alert
                    </p>

                    <p className="mt-1 text-[9px] text-slate-400 dark:text-white/25">
                      Yesterday · 04:36 PM
                    </p>

                  </div>

                </div>


                <div className="flex gap-3">

                  <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-slate-400" />

                  <div className="flex-1">

                    <p className="text-xs font-medium text-slate-700 dark:text-white/70">
                      Signed in to EcoTrust
                    </p>

                    <p className="mt-1 text-[9px] text-slate-400 dark:text-white/25">
                      Yesterday · 09:02 AM
                    </p>

                  </div>

                </div>

              </div>

            </div>


            {/* Account actions */}

            <div
              className="
                rounded-2xl
                border border-slate-200
                bg-white
                p-5

                dark:border-white/10
                dark:bg-white/[0.03]
              "
            >

              <h3 className="text-sm font-bold text-[#0F172A] dark:text-white">
                Account
              </h3>

              <p className="mt-1 text-[10px] text-slate-400 dark:text-white/30">
                Manage your account preferences
              </p>


              <div className="mt-5 space-y-2">


                <button
                  onClick={() =>
                    navigate("/settings")
                  }
                  className="
                    flex w-full
                    items-center gap-3
                    rounded-xl
                    border border-slate-100
                    p-3
                    text-left
                    transition

                    hover:bg-slate-50

                    dark:border-white/[0.07]
                    dark:hover:bg-white/[0.04]
                  "
                >

                  <Settings
                    size={16}
                    className="text-slate-400 dark:text-white/35"
                  />

                  <span className="text-xs font-semibold text-slate-600 dark:text-white/60">
                    Account Settings
                  </span>

                </button>


                <button
                  className="
                    flex w-full
                    items-center gap-3
                    rounded-xl
                    border border-slate-100
                    p-3
                    text-left
                    transition

                    hover:bg-slate-50

                    dark:border-white/[0.07]
                    dark:hover:bg-white/[0.04]
                  "
                >

                  <Lock
                    size={16}
                    className="text-slate-400 dark:text-white/35"
                  />

                  <span className="text-xs font-semibold text-slate-600 dark:text-white/60">
                    Privacy & Security
                  </span>

                </button>


                <button
                  className="
                    mt-2
                    flex w-full
                    items-center gap-3
                    rounded-xl
                    border border-red-100
                    bg-red-50/50
                    p-3
                    text-left
                    transition

                    hover:bg-red-50

                    dark:border-red-500/10
                    dark:bg-red-500/5
                    dark:hover:bg-red-500/10
                  "
                >

                  <LogOut
                    size={16}
                    className="text-red-500"
                  />

                  <span className="text-xs font-semibold text-red-600 dark:text-red-400">
                    Sign Out
                  </span>

                </button>

              </div>

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
              <Leaf size={19} />
            </div>


            <div className="flex-1">

              <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                EcoTrust Environmental Intelligence
              </p>

              <p className="mt-1 text-[10px] text-emerald-700/70 dark:text-emerald-300/50">
                Your account has access to environmental monitoring,
                compliance analytics and facility intelligence.
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

              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

              Account Secure

            </span>

          </section>

        </main>

      </div>

    </div>
  );
}