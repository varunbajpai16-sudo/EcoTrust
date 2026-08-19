import {
  Bell,
  Check,
  ChevronDown,
  Clock3,
  Database,
  FileText,
  Globe2,
  Lock,
  LogOut,
  Mail,
  Monitor,
  Moon,
  Palette,
  Save,
  Settings as SettingsIcon,
  ShieldCheck,
  Smartphone,
  Sun,
  User,
  Users,
  Wifi,
} from 'lucide-react';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const settingsSections = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'monitoring', label: 'Monitoring', icon: Monitor },
  { id: 'security', label: 'Security', icon: ShieldCheck },
  { id: 'system', label: 'System', icon: SettingsIcon },
];

function Toggle({ enabled, onChange }) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative h-6 w-11 rounded-full transition ${
        enabled ? 'bg-[#0B6B50]' : 'bg-slate-200'
      }`}
    >
      <span
        className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
          enabled ? 'left-6' : 'left-1'
        }`}
      />
    </button>
  );
}

function SettingRow({ icon: Icon, title, description, children, isDark }) {
  return (
    <div className={`flex flex-col justify-between gap-4 border-b py-5 last:border-b-0 sm:flex-row sm:items-center ${
      isDark ? 'border-white/10' : 'border-slate-100'
    }`}>
      <div className="flex gap-3">
        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
          isDark ? 'bg-[#0B6B50]/20 text-[#34D399]' : 'bg-emerald-50 text-[#0B6B50]'
        }`}>
          <Icon size={16} />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-700">{title}</p>
          <p className="mt-1 max-w-xl text-[11px] leading-5 text-slate-400">
            {description}
          </p>
        </div>
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

export default function Settings() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('profile');
  const [saved, setSaved] = useState(false);

  const [profile, setProfile] = useState({
    name: 'Environmental Officer',
    email: 'officer@ecotrust.gov.in',
    phone: '+91 98XXXXXX21',
    role: 'Monitoring Officer',
    department: 'Environmental Compliance',
  });

  const [notifications, setNotifications] = useState({
    critical: true,
    warning: true,
    offline: true,
    reports: true,
    email: true,
    browser: true,
  });

  const [monitoring, setMonitoring] = useState({
    autoRefresh: true,
    liveUpdates: true,
    thresholdAlerts: true,
    sound: false,
    refreshRate: '10 seconds',
  });

  const [system, setSystem] = useState({
    language: 'English',
    timezone: 'Asia/Kolkata',
    theme: localStorage.getItem('ecotrust-theme') || 'Light',
    dataRetention: '12 months',
  });

  const isDark = system.theme === 'Dark';

  const updateTheme = (theme) => {
    setSystem((prev) => ({ ...prev, theme }));
    localStorage.setItem('ecotrust-theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'Dark');
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const saveSettings = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  };

  return (
    <div className={`min-h-screen font-[Inter,sans-serif] transition-colors duration-300 ${
      isDark ? 'bg-[#071B16] text-slate-100' : 'bg-[#F7FAF8] text-[#0F172A]'
    }`}>
      <header className={`sticky top-0 z-50 border-b backdrop-blur-xl ${
        isDark ? 'border-white/10 bg-[#0A211B]/95' : 'border-slate-200 bg-white/95'
      }`}>
        <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-5 lg:px-8">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0B6B50] text-white">
              <ShieldCheck size={22} />
            </div>
            <span className={`text-[22px] font-bold tracking-tight ${
              isDark ? 'text-white' : 'text-[#0F172A]'
            }`}>
              Eco<span className="text-[#0B6B50]">Trust</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className={`text-xs font-semibold ${isDark ? 'text-slate-100' : 'text-slate-700'}`}>
                {profile.name}
              </p>
              <p className={`text-[9px] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{profile.role}</p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-xs font-bold text-[#0B6B50]">
              EO
            </div>

            <button
              onClick={() => navigate('/dashboard')}
              className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-50"
              title="Back to dashboard"
            >
              <Monitor size={16} />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1200px] px-5 py-8 lg:px-8 lg:py-10">
        <div className="mb-8">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#0B6B50]">
            <SettingsIcon size={14} />
            Administration
          </p>

          <h1 className={`mt-2 text-3xl font-bold tracking-tight sm:text-4xl ${
            isDark ? 'text-white' : 'text-[#0F172A]'
          }`}>
            Settings
          </h1>

          <p className={`mt-2 max-w-2xl text-sm leading-6 ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}>
            Manage your EcoTrust account, monitoring preferences, notifications
            and system configuration.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[230px_1fr]">
          {/* Settings navigation */}
          <aside className={`h-fit rounded-2xl border p-2 shadow-[0_4px_20px_rgba(15,23,42,0.03)] ${
            isDark ? 'border-white/10 bg-[#0B241D]' : 'border-slate-200 bg-white'
          }`}>
            {settingsSections.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveSection(id)}
                className={`mb-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-xs font-semibold transition last:mb-0 ${
                  activeSection === id
                    ? isDark
                      ? 'bg-[#0B6B50]/20 text-[#34D399]'
                      : 'bg-emerald-50 text-[#0B6B50]'
                    : isDark
                      ? 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}

            <div className={`my-3 border-t ${isDark ? 'border-white/10' : 'border-slate-100'}`} />

            <button
              onClick={() => navigate('/dashboard')}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-xs font-semibold text-slate-500 hover:bg-slate-50"
            >
              <Monitor size={16} />
              Back to Dashboard
            </button>

            <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-xs font-semibold text-red-500 hover:bg-red-50">
              <LogOut size={16} />
              Sign Out
            </button>
          </aside>

          {/* Settings content */}
          <section className={`rounded-2xl border p-6 shadow-[0_4px_20px_rgba(15,23,42,0.03)] sm:p-8 ${
            isDark ? 'border-white/10 bg-[#0B241D]' : 'border-slate-200 bg-white'
          }`}>
            {activeSection === 'profile' && (
              <>
                <div className={`border-b pb-5 ${isDark ? 'border-white/10' : 'border-slate-100'}`}>
                  <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-800'}`} >Profile</h2>
                  <p className={`mt-1 text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`} >
                    Manage the officer account associated with EcoTrust.
                  </p>
                </div>

                <div className={`mt-6 flex items-center gap-4 rounded-xl p-4 ${
                  isDark ? 'bg-[#0B6B50]/15' : 'bg-emerald-50/60'
                }`}>
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0B6B50] text-sm font-bold text-white">
                    EO
                  </div>
                  <div>
                    <p className={`text-sm font-bold ${isDark ? 'text-emerald-200' : 'text-[#064E3B]'}`} >
                      {profile.name}
                    </p>
                    <p className={`mt-1 text-[10px] ${isDark ? 'text-emerald-300/60' : 'text-emerald-700/70'}`} >
                      {profile.role} · {profile.department}
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  {[
                    ['name', 'Full Name', User],
                    ['email', 'Email Address', Mail],
                    ['phone', 'Phone Number', Smartphone],
                    ['role', 'Role', Users],
                  ].map(([key, label, Icon]) => (
                    <label key={key} className="block">
                      <span className={`mb-2 block text-[10px] font-semibold ${
                          isDark ? 'text-slate-400' : 'text-slate-500'
                        }`}>
                        {label}
                      </span>
                      <div className="relative">
                        <Icon
                          size={15}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <input
                          value={profile[key]}
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              [key]: e.target.value,
                            })
                          }
                          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-3 text-xs text-slate-700 outline-none transition focus:border-emerald-300 focus:ring-4 focus:ring-emerald-50"
                        />
                      </div>
                    </label>
                  ))}
                </div>

                <div className="mt-5">
                  <label className="block text-[10px] font-semibold text-slate-500">
                    Department
                  </label>
                  <input
                    value={profile.department}
                    onChange={(e) =>
                      setProfile({ ...profile, department: e.target.value })
                    }
                    className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 text-xs outline-none focus:border-emerald-300 focus:ring-4 focus:ring-emerald-50"
                  />
                </div>
              </>
            )}

            {activeSection === 'notifications' && (
              <>
                <div className={`border-b pb-5 ${isDark ? 'border-white/10' : 'border-slate-100'}`}>
                  <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-800'}`} >Notifications</h2>
                  <p className={`mt-1 text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`} >
                    Choose which environmental events should notify you.
                  </p>
                </div>

                <div className="mt-2">
                  <SettingRow
                    isDark={isDark}
                    icon={Bell}
                    title="Critical alerts"
                    description="Notify immediately when a critical environmental threshold is exceeded."
                  >
                    <Toggle
                      enabled={notifications.critical}
                      onChange={(value) =>
                        setNotifications({ ...notifications, critical: value })
                      }
                    />
                  </SettingRow>

                  <SettingRow
                    isDark={isDark}
                    icon={Bell}
                    title="Warning alerts"
                    description="Receive notifications when readings approach configured limits."
                  >
                    <Toggle
                      enabled={notifications.warning}
                      onChange={(value) =>
                        setNotifications({ ...notifications, warning: value })
                      }
                    />
                  </SettingRow>

                  <SettingRow
                    isDark={isDark}
                    icon={Wifi}
                    title="Device offline alerts"
                    description="Get notified when a monitoring device stops sending data."
                  >
                    <Toggle
                      enabled={notifications.offline}
                      onChange={(value) =>
                        setNotifications({ ...notifications, offline: value })
                      }
                    />
                  </SettingRow>

                  <SettingRow
                    isDark={isDark}
                    icon={FileText}
                    title="Report notifications"
                    description="Receive updates when scheduled reports are generated."
                  >
                    <Toggle
                      enabled={notifications.reports}
                      onChange={(value) =>
                        setNotifications({ ...notifications, reports: value })
                      }
                    />
                  </SettingRow>

                  <SettingRow
                    isDark={isDark}
                    icon={Mail}
                    title="Email notifications"
                    description="Send selected EcoTrust notifications to your registered email."
                  >
                    <Toggle
                      enabled={notifications.email}
                      onChange={(value) =>
                        setNotifications({ ...notifications, email: value })
                      }
                    />
                  </SettingRow>

                  <SettingRow
                    isDark={isDark}
                    icon={Monitor}
                    title="Browser notifications"
                    description="Show alerts as browser notifications while EcoTrust is open."
                  >
                    <Toggle
                      enabled={notifications.browser}
                      onChange={(value) =>
                        setNotifications({ ...notifications, browser: value })
                      }
                    />
                  </SettingRow>
                </div>
              </>
            )}

            {activeSection === 'monitoring' && (
              <>
                <div className={`border-b pb-5 ${isDark ? 'border-white/10' : 'border-slate-100'}`}>
                  <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-800'}`} >Monitoring Preferences</h2>
                  <p className={`mt-1 text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`} >
                    Configure how live environmental data is displayed and refreshed.
                  </p>
                </div>

                <div className="mt-2">
                  <SettingRow
                    isDark={isDark}
                    icon={Monitor}
                    title="Auto refresh"
                    description="Automatically refresh live monitoring information."
                  >
                    <Toggle
                      enabled={monitoring.autoRefresh}
                      onChange={(value) =>
                        setMonitoring({ ...monitoring, autoRefresh: value })
                      }
                    />
                  </SettingRow>

                  <SettingRow
                    isDark={isDark}
                    icon={Wifi}
                    title="Live data updates"
                    description="Keep sensor readings and device status synchronized in real time."
                  >
                    <Toggle
                      enabled={monitoring.liveUpdates}
                      onChange={(value) =>
                        setMonitoring({ ...monitoring, liveUpdates: value })
                      }
                    />
                  </SettingRow>

                  <SettingRow
                    isDark={isDark}
                    icon={Bell}
                    title="Automatic threshold alerts"
                    description="Create an alert when a monitored parameter crosses its configured threshold."
                  >
                    <Toggle
                      enabled={monitoring.thresholdAlerts}
                      onChange={(value) =>
                        setMonitoring({
                          ...monitoring,
                          thresholdAlerts: value,
                        })
                      }
                    />
                  </SettingRow>

                  <SettingRow
                    isDark={isDark}
                    icon={Clock3}
                    title="Refresh interval"
                    description="Choose how frequently the dashboard requests updated monitoring data."
                  >
                    <select
                      value={monitoring.refreshRate}
                      onChange={(e) =>
                        setMonitoring({
                          ...monitoring,
                          refreshRate: e.target.value,
                        })
                      }
                      className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 outline-none"
                    >
                      <option>5 seconds</option>
                      <option>10 seconds</option>
                      <option>30 seconds</option>
                      <option>60 seconds</option>
                    </select>
                  </SettingRow>

                  <SettingRow
                    isDark={isDark}
                    icon={Bell}
                    title="Alert sound"
                    description="Play a sound when a new critical alert is received."
                  >
                    <Toggle
                      enabled={monitoring.sound}
                      onChange={(value) =>
                        setMonitoring({ ...monitoring, sound: value })
                      }
                    />
                  </SettingRow>
                </div>
              </>
            )}

            {activeSection === 'security' && (
              <>
                <div className={`border-b pb-5 ${isDark ? 'border-white/10' : 'border-slate-100'}`}>
                  <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-800'}`} >Security</h2>
                  <p className={`mt-1 text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`} >
                    Protect your EcoTrust officer account and access.
                  </p>
                </div>

                <div className="mt-2">
                  <SettingRow
                    isDark={isDark}
                    icon={Lock}
                    title="Two-factor authentication"
                    description="Require an additional verification step when signing in."
                  >
                    <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-[9px] font-semibold text-emerald-600">
                      Enabled
                    </span>
                  </SettingRow>

                  <SettingRow
                    isDark={isDark}
                    icon={Clock3}
                    title="Session timeout"
                    description="Automatically sign out after a period of inactivity."
                  >
                    <select className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600 outline-none">
                      <option>30 minutes</option>
                      <option>1 hour</option>
                      <option>4 hours</option>
                      <option>8 hours</option>
                    </select>
                  </SettingRow>

                  <SettingRow
                    isDark={isDark}
                    icon={Users}
                    title="Role-based access"
                    description="Access to factories, reports, devices and compliance data is controlled by your assigned role."
                  >
                    <span className="rounded-full bg-slate-50 px-3 py-1.5 text-[9px] font-semibold text-slate-500">
                      {profile.role}
                    </span>
                  </SettingRow>

                  <SettingRow
                    isDark={isDark}
                    icon={ShieldCheck}
                    title="Account verification"
                    description="Your EcoTrust officer account is verified for authorized monitoring access."
                  >
                    <span className="flex items-center gap-1.5 text-[9px] font-semibold text-emerald-600">
                      <Check size={13} />
                      Verified
                    </span>
                  </SettingRow>
                </div>
              </>
            )}

            {activeSection === 'system' && (
              <>
                <div className={`border-b pb-5 ${isDark ? 'border-white/10' : 'border-slate-100'}`}>
                  <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-800'}`} >System Settings</h2>
                  <p className={`mt-1 text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`} >
                    Configure regional, display and data preferences.
                  </p>
                </div>

                <div className="mt-2">
                  <SettingRow
                    isDark={isDark}
                    icon={Globe2}
                    title="Language"
                    description="Language used throughout the EcoTrust dashboard."
                  >
                    <select
                      value={system.language}
                      onChange={(e) =>
                        setSystem({ ...system, language: e.target.value })
                      }
                      className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600 outline-none"
                    >
                      <option>English</option>
                      <option>Hindi</option>
                    </select>
                  </SettingRow>

                  <SettingRow
                    isDark={isDark}
                    icon={Clock3}
                    title="Timezone"
                    description="Timezone used for alerts, reports and monitoring timestamps."
                  >
                    <select
                      value={system.timezone}
                      onChange={(e) =>
                        setSystem({ ...system, timezone: e.target.value })
                      }
                      className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600 outline-none"
                    >
                      <option>Asia/Kolkata</option>
                      <option>UTC</option>
                    </select>
                  </SettingRow>

                  <SettingRow
                    isDark={isDark}
                    icon={Palette}
                    title="Theme"
                    description="Choose the appearance of the EcoTrust dashboard."
                  >
                    <div className="flex rounded-lg border border-slate-200 p-1">
                      {[
                        ['Light', Sun],
                        ['Dark', Moon],
                      ].map(([theme, Icon]) => (
                        <button
                          key={theme}
                          onClick={() => updateTheme(theme)}
                          className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[9px] font-semibold ${
                            system.theme === theme
                              ? isDark
                                ? 'bg-[#0B6B50]/25 text-[#34D399]'
                                : 'bg-emerald-50 text-[#0B6B50]'
                              : isDark
                                ? 'text-slate-500'
                                : 'text-slate-400'
                          }`}
                        >
                          <Icon size={12} />
                          {theme}
                        </button>
                      ))}
                    </div>
                  </SettingRow>

                  <SettingRow
                    isDark={isDark}
                    icon={Database}
                    title="Data retention"
                    description="Preferred period for retaining historical monitoring and report data."
                  >
                    <select
                      value={system.dataRetention}
                      onChange={(e) =>
                        setSystem({
                          ...system,
                          dataRetention: e.target.value,
                        })
                      }
                      className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600 outline-none"
                    >
                      <option>6 months</option>
                      <option>12 months</option>
                      <option>24 months</option>
                      <option>36 months</option>
                    </select>
                  </SettingRow>
                </div>
              </>
            )}

            <div className={`mt-8 flex flex-col justify-between gap-3 border-t pt-5 sm:flex-row sm:items-center ${
              isDark ? 'border-white/10' : 'border-slate-100'
            }`}>
              <p className={`text-[10px] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                Changes are applied to your EcoTrust officer account.
              </p>

              <button
                onClick={saveSettings}
                className="flex items-center justify-center gap-2 rounded-lg bg-[#0B6B50] px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-emerald-900/10 transition hover:bg-[#064E3B]"
              >
                {saved ? <Check size={14} /> : <Save size={14} />}
                {saved ? 'Saved' : 'Save Changes'}
              </button>
            </div>
          </section>
        </div>
      </main>

      <footer className={`border-t px-5 py-6 lg:px-8 ${
        isDark ? 'border-white/10 bg-[#061712]' : 'border-slate-200 bg-white'
      }`}>
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4">
          <p className={`text-[10px] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
            EcoTrust · Environmental Intelligence Platform
          </p>
          <p className={`text-[10px] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
            Timezone: {system.timezone}
          </p>
        </div>
      </footer>
    </div>
  );
}
