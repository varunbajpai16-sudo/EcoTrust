import {
  Bell,
  Building2,
  ChevronRight,
  CircleUserRound,
  Database,
  KeyRound,
  Leaf,
  Lock,
  LogOut,
  Mail,
  Moon,
  Save,
  Settings2,
  ShieldCheck,
  Sun,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/Theme/Theme_slice";
import { useNavigate } from "react-router";

const menuItems = [
  { id: "profile", label: "Profile", icon: User },
  { id: "organization", label: "Organization", icon: Building2 },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "monitoring", label: "Monitoring", icon: Database },
  { id: "security", label: "Security", icon: ShieldCheck },
  { id: "appearance", label: "Appearance", icon: Sun },
];

function Logo() {
  const navigate = useNavigate()
  return (
    <div className="flex items-center gap-2.5">
      <div onClick={()=>navigate("/")} className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0B6B50] text-white">
        <Leaf size={22} />
      </div>

      <span className="text-[21px] font-bold tracking-tight text-[#0F172A] dark:text-white">
        Eco
        <span className="text-[#0B6B50] dark:text-emerald-400">Trust</span>
      </span>
    </div>
  );
}

function Toggle({ enabled, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      className={`relative h-6 w-11 rounded-full transition-colors ${
        enabled ? "bg-[#0B6B50]" : "bg-slate-200 dark:bg-white/10"
      }`}
    >
      <span
        className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-all ${
          enabled ? "left-6" : "left-1"
        }`}
      />
    </button>
  );
}

function SettingRow({
  icon: Icon,
  title,
  description,
  enabled,
  onChange,
  children,
}) {
  return (
    <div className="flex items-center justify-between gap-5 border-b border-slate-100 py-5 last:border-0 dark:border-white/[0.07]">
      <div className="flex min-w-0 items-start gap-3.5">
        {Icon && (
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-[#0B6B50] dark:bg-emerald-500/10 dark:text-emerald-400">
            <Icon size={17} />
          </div>
        )}

        <div>
          <p className="text-sm font-semibold text-slate-800 dark:text-white/85">
            {title}
          </p>
          <p className="mt-1 max-w-xl text-xs leading-5 text-slate-400 dark:text-white/35">
            {description}
          </p>
        </div>
      </div>

      {children || <Toggle enabled={enabled} onChange={onChange} />}
    </div>
  );
}

function Card({ title, description, children }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_5px_25px_rgba(15,23,42,0.035)] dark:border-white/10 dark:bg-white/[0.03] dark:shadow-none">
      <div className="border-b border-slate-100 px-6 py-5 dark:border-white/[0.07]">
        <h2 className="text-base font-bold text-[#0F172A] dark:text-white">
          {title}
        </h2>

        {description && (
          <p className="mt-1 text-xs text-slate-400 dark:text-white/35">
            {description}
          </p>
        )}
      </div>

      <div className="px-6">{children}</div>
    </section>
  );
}

function Input({ label, value, onChange, type = "text" }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold text-slate-600 dark:text-white/55">
        {label}
      </span>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-300 focus:border-[#0B6B50] focus:ring-4 focus:ring-emerald-500/5 dark:border-white/10 dark:bg-white/[0.03] dark:text-white dark:focus:border-emerald-500/50"
      />
    </label>
  );
}

export default function Settings() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const isDark = theme === "dark";

  const [active, setActive] = useState("profile");

  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@ecotrust.in",
    phone: "+91 98765 43210",
    designation: "Environmental Officer",
  });

  const [notifications, setNotifications] = useState({
    critical: true,
    warning: true,
    compliance: true,
    reports: false,
    email: true,
  });

  const [monitoring, setMonitoring] = useState({
    liveUpdates: true,
    anomalyDetection: true,
    offlineDevice: true,
    autoReports: false,
  });

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="min-h-screen bg-[#F7FAF8] font-[Inter,sans-serif] text-[#0F172A] transition-colors duration-300 dark:bg-[#071A15] dark:text-white">

      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl dark:border-white/10 dark:bg-[#071A15]/90">
        <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-5 lg:px-8">
          <Logo />

          <div className="flex items-center gap-3">
            <button className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:bg-emerald-50 hover:text-[#0B6B50] dark:border-white/10 dark:bg-white/5 dark:text-white/60">
              <Bell size={18} />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-red-500" />
            </button>

            <button
              onClick={() => dispatch(toggleTheme())}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:bg-emerald-50 hover:text-[#0B6B50] dark:border-white/10 dark:bg-white/5 dark:text-white/60"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <div className="ml-1 flex items-center gap-3 border-l border-slate-200 pl-4 dark:border-white/10">
              <div   className="hidden text-right sm:block">
                <p className="text-xs font-semibold dark:text-white/80">
                  Admin User
                </p>
                <p className="mt-0.5 text-[10px] text-slate-400">
                  Administrator
                </p>
              </div>

              <div onClick={()=>navigate("/profile")} className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-[#0B6B50] dark:bg-emerald-500/15 dark:text-emerald-400">
                <CircleUserRound size={19} />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1250px] px-5 py-9 lg:px-8">
        {/* Heading */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#0B6B50] dark:text-emerald-400">
            <Settings2 size={15} />
            ACCOUNT SETTINGS
          </div>

          <h1 className="mt-2 text-3xl font-bold tracking-tight dark:text-white">
            Settings
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-white/40">
            Manage your EcoTrust account, monitoring preferences and security.
          </p>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
          {/* Settings sidebar */}
          <aside className="rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_5px_25px_rgba(15,23,42,0.035)] dark:border-white/10 dark:bg-white/[0.03]">
            <p className="px-3 pb-3 pt-2 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 dark:text-white/25">
              Preferences
            </p>

            <nav className="space-y-1">
              {menuItems.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActive(id)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition ${
                    active === id
                      ? "bg-emerald-50 text-[#0B6B50] dark:bg-emerald-500/10 dark:text-emerald-400"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-800 dark:text-white/40 dark:hover:bg-white/5 dark:hover:text-white"
                  }`}
                >
                  <Icon size={17} />
                  {label}

                  {active === id && (
                    <ChevronRight size={14} className="ml-auto" />
                  )}
                </button>
              ))}
            </nav>

            <div className="my-3 border-t border-slate-100 dark:border-white/10" />

            <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-red-500 transition hover:bg-red-50 dark:hover:bg-red-500/10">
              <LogOut size={17} />
              Log out
            </button>
          </aside>

          {/* Content */}
          <div className="space-y-5">

            {/* Profile */}
            {active === "profile" && (
              <>
                <Card
                  title="Profile information"
                  description="Update your personal information and contact details."
                >
                  <div className="flex flex-col gap-6 py-6 sm:flex-row sm:items-center">
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#0B6B50] text-white shadow-lg shadow-emerald-900/10">
                      <User size={31} />
                    </div>

                    <div>
                      <h3 className="font-semibold dark:text-white">
                        Profile photo
                      </h3>
                      <p className="mt-1 text-xs text-slate-400">
                        PNG or JPG. Maximum size 2MB.
                      </p>

                      <div className="mt-3 flex gap-2">
                        <button className="rounded-lg bg-[#0B6B50] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#064E3B]">
                          Upload photo
                        </button>

                        <button className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-500 dark:border-white/10 dark:text-white/50">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-5 border-t border-slate-100 py-6 dark:border-white/10 sm:grid-cols-2">
                    <Input
                      label="Full name"
                      value={profile.name}
                      onChange={(value) =>
                        setProfile({ ...profile, name: value })
                      }
                    />

                    <Input
                      label="Designation"
                      value={profile.designation}
                      onChange={(value) =>
                        setProfile({ ...profile, designation: value })
                      }
                    />

                    <Input
                      label="Email address"
                      value={profile.email}
                      onChange={(value) =>
                        setProfile({ ...profile, email: value })
                      }
                    />

                    <Input
                      label="Phone number"
                      value={profile.phone}
                      onChange={(value) =>
                        setProfile({ ...profile, phone: value })
                      }
                    />
                  </div>
                </Card>

                <div className="flex justify-end">
                  <button className="flex items-center gap-2 rounded-xl bg-[#0B6B50] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-900/10 transition hover:bg-[#064E3B]">
                    <Save size={16} />
                    Save changes
                  </button>
                </div>
              </>
            )}

            {/* Organization */}
            {active === "organization" && (
              <Card
                title="Organization"
                description="Information about the organization connected to your EcoTrust account."
              >
                <div className="grid gap-5 py-6 sm:grid-cols-2">
                  <Input
                    label="Organization name"
                    value="EcoTrust Environmental Authority"
                    onChange={() => {}}
                  />

                  <Input
                    label="Organization type"
                    value="Regulatory Authority"
                    onChange={() => {}}
                  />

                  <Input
                    label="State / Region"
                    value="Uttar Pradesh"
                    onChange={() => {}}
                  />

                  <Input
                    label="Organization ID"
                    value="ECT-UP-2026-001"
                    onChange={() => {}}
                  />
                </div>
              </Card>
            )}

            {/* Notifications */}
            {active === "notifications" && (
              <Card
                title="Notification preferences"
                description="Choose which environmental events you want EcoTrust to notify you about."
              >
                <SettingRow
                  icon={Bell}
                  title="Critical environmental alerts"
                  description="Receive alerts when monitored parameters cross critical regulatory limits."
                  enabled={notifications.critical}
                  onChange={(value) =>
                    setNotifications({ ...notifications, critical: value })
                  }
                />

                <SettingRow
                  icon={Bell}
                  title="Warning alerts"
                  description="Notify me when parameters approach configured threshold limits."
                  enabled={notifications.warning}
                  onChange={(value) =>
                    setNotifications({ ...notifications, warning: value })
                  }
                />

                <SettingRow
                  icon={ShieldCheck}
                  title="Compliance updates"
                  description="Receive updates about compliance status and regulatory changes."
                  enabled={notifications.compliance}
                  onChange={(value) =>
                    setNotifications({ ...notifications, compliance: value })
                  }
                />

                <SettingRow
                  icon={Mail}
                  title="Email notifications"
                  description="Send important alerts and reports to your registered email address."
                  enabled={notifications.email}
                  onChange={(value) =>
                    setNotifications({ ...notifications, email: value })
                  }
                />
              </Card>
            )}

            {/* Monitoring */}
            {active === "monitoring" && (
              <Card
                title="Monitoring preferences"
                description="Configure how EcoTrust monitors connected CEMS and CEQMS systems."
              >
                <SettingRow
                  icon={Database}
                  title="Real-time data updates"
                  description="Continuously refresh live environmental sensor readings."
                  enabled={monitoring.liveUpdates}
                  onChange={(value) =>
                    setMonitoring({ ...monitoring, liveUpdates: value })
                  }
                />

                <SettingRow
                  icon={ShieldCheck}
                  title="AI anomaly detection"
                  description="Automatically identify unusual patterns in environmental data."
                  enabled={monitoring.anomalyDetection}
                  onChange={(value) =>
                    setMonitoring({
                      ...monitoring,
                      anomalyDetection: value,
                    })
                  }
                />

                <SettingRow
                  icon={Bell}
                  title="Device offline alerts"
                  description="Notify administrators when a monitoring device stops transmitting data."
                  enabled={monitoring.offlineDevice}
                  onChange={(value) =>
                    setMonitoring({ ...monitoring, offlineDevice: value })
                  }
                />

                <SettingRow
                  icon={Database}
                  title="Automatic compliance reports"
                  description="Automatically prepare periodic environmental compliance reports."
                  enabled={monitoring.autoReports}
                  onChange={(value) =>
                    setMonitoring({ ...monitoring, autoReports: value })
                  }
                />
              </Card>
            )}

            {/* Security */}
            {active === "security" && (
              <div className="space-y-5">
                <Card
                  title="Security"
                  description="Manage account security and authentication."
                >
                  <SettingRow
                    icon={KeyRound}
                    title="Password"
                    description="Last changed 42 days ago."
                  >
                    <button className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 transition hover:border-emerald-300 hover:text-[#0B6B50] dark:border-white/10 dark:text-white/50">
                      Change
                    </button>
                  </SettingRow>

                  <SettingRow
                    icon={Lock}
                    title="Two-factor authentication"
                    description="Add an additional security layer to your EcoTrust account."
                    enabled={true}
                    onChange={() => {}}
                  />

                  <SettingRow
                    icon={ShieldCheck}
                    title="Login activity"
                    description="Review devices and sessions currently accessing your account."
                  >
                    <button className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 dark:border-white/10 dark:text-white/50">
                      View
                    </button>
                  </SettingRow>
                </Card>
              </div>
            )}

            {/* Appearance */}
            {active === "appearance" && (
              <Card
                title="Appearance"
                description="Customize how EcoTrust looks on your device."
              >
                <div className="py-6">
                  <p className="mb-4 text-sm font-semibold text-slate-700 dark:text-white/70">
                    Interface theme
                  </p>

                  <div className="grid max-w-lg grid-cols-2 gap-4">
                    <button
                      onClick={() => {
                        if (isDark) dispatch(toggleTheme());
                      }}
                      className={`rounded-xl border p-4 text-left transition ${
                        !isDark
                          ? "border-[#0B6B50] bg-emerald-50/50"
                          : "border-slate-200 dark:border-white/10"
                      }`}
                    >
                      <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-white text-[#0B6B50] shadow-sm">
                        <Sun size={18} />
                      </div>

                      <p className="text-sm font-semibold dark:text-white">
                        Light
                      </p>
                      <p className="mt-1 text-[10px] text-slate-400">
                        Light EcoTrust interface
                      </p>
                    </button>

                    <button
                      onClick={() => {
                        if (!isDark) dispatch(toggleTheme());
                      }}
                      className={`rounded-xl border p-4 text-left transition ${
                        isDark
                          ? "border-emerald-500/50 bg-emerald-500/10"
                          : "border-slate-200"
                      }`}
                    >
                      <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-[#052E24] text-emerald-300">
                        <Moon size={18} />
                      </div>

                      <p className="text-sm font-semibold dark:text-white">
                        Dark
                      </p>
                      <p className="mt-1 text-[10px] text-slate-400">
                        Dark EcoTrust interface
                      </p>
                    </button>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}