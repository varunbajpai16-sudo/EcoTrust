

// import {
//   Bell,
//   ChevronDown,
//   CircleAlert,
//   FileText,
//   Gauge,
//   LayoutDashboard,
//   Leaf,
//   LineChart,
//   Menu,
//   Radio,
//   Settings,
//   ShieldCheck,
//   Sun,
//   Moon,
//   X,
// } from 'lucide-react';
// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { toggleTheme } from '../features/Theme/Theme_slice';
// import { alerts } from '../data/alerts';

// // ---------------------------------------------------------------------------
// // Everything on this page is DERIVED from data/alerts.js — no separate
// // hardcoded numbers — so it can never drift out of sync with what the
// // Alerts / Investigation screens are showing for the same factories.
// // ---------------------------------------------------------------------------

// // Group alerts by plant, take the worst (lowest) trust score per plant —
// // that's the plant's overall trust status.
// function buildPlantLedger() {
//   const byPlant = {};
//   alerts.forEach((a) => {
//     if (!byPlant[a.plant]) {
//       byPlant[a.plant] = { plant: a.plant, location: a.location, trustScore: a.trustScore, openIssues: 0, alerts: [] };
//     }
//     const entry = byPlant[a.plant];
//     entry.trustScore = Math.min(entry.trustScore, a.trustScore);
//     entry.alerts.push(a);
//     if (a.status === 'Active') entry.openIssues += 1;
//   });
//   return Object.values(byPlant).sort((a, b) => a.trustScore - b.trustScore);
// }

// function trustStatus(score) {
//   if (score >= 75) return { label: 'Compliant', text: 'text-emerald-600 dark:text-emerald-300', bg: 'bg-emerald-50 dark:bg-emerald-400/10', bar: 'bg-emerald-500' };
//   if (score >= 45) return { label: 'Under Review', text: 'text-amber-600 dark:text-amber-300', bg: 'bg-amber-50 dark:bg-amber-400/10', bar: 'bg-amber-500' };
//   return { label: 'Non-Compliant', text: 'text-red-600 dark:text-red-300', bg: 'bg-red-50 dark:bg-red-400/10', bar: 'bg-red-500' };
// }

// function Sidebar({ open, setOpen }) {
//   const navigate = useNavigate();
//   const items = [
//     { name: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
//     { name: 'Live Monitoring', icon: Radio, path: '/livemonitoring' },
//     { name: 'Alerts', icon: Bell, badge: '12', path: '/alerts' },
//     { name: 'Compliance', icon: ShieldCheck, path: '/compliance', active: true },
//     { name: 'Reports', icon: LineChart, path: '/reports' },
//     { name: 'Analytics', icon: Gauge, path: '/analytics' },
//     { name: 'Devices', icon: Radio, path: '/devices' },
//   ];

//   return (
//     <>
//       {open && <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setOpen(false)} />}
//       <aside className={`fixed left-0 top-0 z-50 flex h-screen w-[250px] flex-col bg-[#052E24] text-white transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
//         <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-white/10 px-6">
//           <div className="flex items-center gap-3">
//             <div onClick={() => navigate('/')} className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0B6B50] hover:cursor-pointer">
//               <Leaf size={22} />
//             </div>
//             <div>
//               <div className="text-lg font-bold">EcoTrust</div>
//               <div className="text-[9px] tracking-wider text-emerald-300/60">ENVIRONMENTAL INTELLIGENCE</div>
//             </div>
//           </div>
//           <button onClick={() => setOpen(false)} className="lg:hidden"><X size={20} /></button>
//         </div>
//         <div className="flex-1 overflow-y-auto px-4 py-6">
//           <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-widest text-white/30">Workspace</p>
//           <nav className="space-y-1">
//             {items.map((item) => {
//               const Icon = item.icon;
//               return (
//                 <button onClick={() => navigate(item.path)} key={item.name} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${item.active ? 'bg-[#0B6B50] text-white shadow-lg' : 'text-white/55 hover:bg-white/5 hover:text-white'}`}>
//                   <Icon size={18} />
//                   <span className="flex-1 text-left">{item.name}</span>
//                   {item.badge && <span className="rounded-full bg-red-500 px-2 py-0.5 text-[9px] font-bold">{item.badge}</span>}
//                 </button>
//               );
//             })}
//           </nav>
//           <p className="mb-3 mt-8 px-3 text-[10px] font-semibold uppercase tracking-widest text-white/30">System</p>
//           <button onClick={() => navigate('/settings')} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/55 hover:bg-white/5 hover:text-white">
//             <Settings size={18} />
//             Settings
//           </button>
//         </div>
//         <div className="shrink-0 border-t border-white/10 p-4">
//           <div className="rounded-xl bg-white/5 p-4">
//             <div className="flex items-center gap-2">
//               <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
//               <span className="text-xs font-medium">Compliance engine active</span>
//             </div>
//             <p className="mt-2 text-[10px] text-white/40">Regulations synchronized</p>
//           </div>
//         </div>
//       </aside>
//     </>
//   );
// }

// function StatCard({ title, value, detail, icon: Icon, tone = 'green' }) {
//   const styles = {
//     green: 'bg-emerald-50 text-[#0B6B50] dark:bg-emerald-400/10 dark:text-emerald-300',
//     red: 'bg-red-50 text-red-500 dark:bg-red-400/10 dark:text-red-300',
//     blue: 'bg-blue-50 text-blue-500 dark:bg-blue-400/10 dark:text-blue-300',
//   };
//   return (
//     <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.03)] transition-colors duration-300 dark:border-white/10 dark:bg-[#0B241D]">
//       <div className="flex items-start justify-between">
//         <div>
//           <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{title}</p>
//           <p className="mt-2 text-2xl font-bold tracking-tight text-[#0F172A] dark:text-white">{value}</p>
//           <p className="mt-2 text-[10px] text-slate-400 dark:text-slate-500">{detail}</p>
//         </div>
//         <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${styles[tone]}`}>
//           <Icon size={19} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function Compliance() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const theme = useSelector((state) => state.theme.theme);
//   const isDark = theme === 'dark';
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   useEffect(() => {
//     document.documentElement.classList.toggle('dark', isDark);
//   }, [isDark]);

//   const ledger = buildPlantLedger();
//   const avgTrust = Math.round(ledger.reduce((sum, p) => sum + p.trustScore, 0) / ledger.length);
//   const compliantCount = ledger.filter((p) => p.trustScore >= 75).length;
//   const openIssues = alerts.filter((a) => a.status === 'Active').length;

//   return (
//     <div className="min-h-screen bg-[#F7FAF8] font-[Inter,sans-serif] text-[#0F172A] transition-colors duration-300 dark:bg-[#071A15] dark:text-white">
//       <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

//       <div className="min-w-0 lg:ml-[250px]">
//         <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-slate-200 bg-white/90 px-5 backdrop-blur-xl transition-colors duration-300 dark:border-white/10 dark:bg-[#071A15]/90 lg:px-8">
//           <div className="flex items-center gap-4">
//             <button onClick={() => setSidebarOpen(true)} className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5 lg:hidden">
//               <Menu size={21} />
//             </button>
//             <div>
//               <h1 className="text-lg font-bold">Compliance</h1>
//               <p className="hidden text-[10px] text-slate-400 dark:text-slate-500 sm:block">Trust-verified regulatory readiness across all facilities</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-3">
//             <button type="button" onClick={() => dispatch(toggleTheme())} className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 dark:border-white/10 dark:bg-[#0B241D] dark:text-yellow-300 dark:hover:bg-white/5">
//               {isDark ? <Sun size={17} /> : <Moon size={17} />}
//             </button>
//             <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0B6B50] text-xs font-bold text-white">VB</div>
//           </div>
//         </header>

//         <main className="mx-auto max-w-[1600px] p-5 lg:p-8">
//           <div className="mb-7">
//             <h2 className="text-2xl font-bold tracking-tight">Environmental Compliance</h2>
//             <p className="mt-1 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
//               Compliance status here is driven by each factory's <strong>Trust Score</strong> — not the raw sensor
//               reading — the same score calculated on the Investigation page.
//             </p>
//           </div>

//           <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
//             <StatCard title="Average Trust Score" value={`${avgTrust}%`} detail={`${ledger.length} facilities in sample`} icon={ShieldCheck} tone="green" />
//             <StatCard title="Compliant Plants" value={`${compliantCount}/${ledger.length}`} detail="Trust score ≥ 75%" icon={ShieldCheck} tone="green" />
//             <StatCard title="Open Issues" value={openIssues} detail="Active alerts requiring action" icon={CircleAlert} tone="red" />
//             <StatCard title="Reports Submitted" value="96%" detail="48 / 50 this period" icon={FileText} tone="blue" />
//           </section>

//           {/* Factory Trust Ledger — this is the part that's new/derived */}
//           <section className="mt-6">
//             <div className="mb-4">
//               <h3 className="text-sm font-bold">Factory Trust Ledger</h3>
//               <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">
//                 Each row's Trust Score is the worst score across that plant's active sensors — click through to investigate.
//               </p>
//             </div>

//             <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition-colors duration-300 dark:border-white/10 dark:bg-[#0B241D]">
//               <table className="w-full text-left text-xs">
//                 <thead className="border-b border-slate-100 text-[10px] uppercase tracking-wide text-slate-400 dark:border-white/10 dark:text-slate-500">
//                   <tr>
//                     <th className="px-5 py-3 font-semibold">Plant</th>
//                     <th className="px-5 py-3 font-semibold">Location</th>
//                     <th className="px-5 py-3 font-semibold">Trust Score</th>
//                     <th className="px-5 py-3 font-semibold">Status</th>
//                     <th className="px-5 py-3 font-semibold">Open Issues</th>
//                     <th className="px-5 py-3 font-semibold" />
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {ledger.map((p) => {
//                     const s = trustStatus(p.trustScore);
//                     const worstAlert = p.alerts.reduce((worst, a) => (a.trustScore < worst.trustScore ? a : worst), p.alerts[0]);
//                     return (
//                       <tr key={p.plant} className="border-b border-slate-50 last:border-0 dark:border-white/5">
//                         <td className="px-5 py-4 font-semibold text-slate-700 dark:text-slate-200">{p.plant}</td>
//                         <td className="px-5 py-4 text-slate-500 dark:text-slate-400">{p.location}</td>
//                         <td className="px-5 py-4">
//                           <div className="flex items-center gap-2">
//                             <div className="h-1.5 w-20 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
//                               <div className={`h-full rounded-full ${s.bar}`} style={{ width: `${p.trustScore}%` }} />
//                             </div>
//                             <span className="font-mono font-semibold text-slate-700 dark:text-slate-200">{p.trustScore}%</span>
//                           </div>
//                         </td>
//                         <td className="px-5 py-4">
//                           <span className={`rounded-full px-2.5 py-1 text-[9px] font-semibold ${s.bg} ${s.text}`}>{s.label}</span>
//                         </td>
//                         <td className="px-5 py-4 text-slate-500 dark:text-slate-400">{p.openIssues}</td>
//                         <td className="px-5 py-4">
//                           <button
//                             onClick={() => navigate(`/investigation/${worstAlert.id}`)}
//                             className="rounded-lg border border-slate-200 px-3 py-1.5 text-[10px] font-semibold text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5"
//                           >
//                             Investigate →
//                           </button>
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>
//           </section>
//         </main>
//       </div>
//     </div>
//   );
// }


import {
  Bell,
  CheckCircle2,
  CircleAlert,
  FileText,
  Gauge,
  LayoutDashboard,
  Leaf,
  LineChart,
  Menu,
  Moon,
  Radio,
  RefreshCw,
  Settings,
  ShieldCheck,
  Sparkles,
  Sun,
  X,
  Zap,
} from 'lucide-react';
import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toggleTheme } from '../features/Theme/Theme_slice';
import { getLiveDashboard, getActiveAlerts } from '../services/api.js';

// Status badge helper based on Trust Score & Verdict
function getTrustStatus(trustScore, verdict) {
  if (verdict === 'TAMPERED' || trustScore < 50) {
    return {
      label: 'Non-Compliant (Tampered)',
      text: 'text-red-600 dark:text-red-400',
      bg: 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20',
      bar: 'bg-red-500',
    };
  }
  if (verdict === 'SUSPICIOUS' || verdict === 'FAULTY_SENSOR' || trustScore < 75) {
    return {
      label: 'Under Review',
      text: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20',
      bar: 'bg-amber-400',
    };
  }
  return {
    label: 'Compliant & Verified',
    text: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20',
    bar: 'bg-emerald-500',
  };
}

function Sidebar({ open, setOpen, alertCount = 0 }) {
  const navigate = useNavigate();
  const items = [
    { name: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Live Monitoring', icon: Radio, path: '/livemonitoring' },
    { name: 'Alerts', icon: Bell, badge: alertCount > 0 ? String(alertCount) : null, path: '/alerts' },
    { name: 'Compliance', icon: ShieldCheck, path: '/compliance', active: true },
    { name: 'Reports', icon: LineChart, path: '/reports' },
    { name: 'Analytics', icon: Gauge, path: '/analytics' },
    { name: 'Devices', icon: Radio, path: '/devices' },
  ];

  return (
    <>
      {open && <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setOpen(false)} />}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-[250px] flex-col bg-[#052E24] text-white transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-white/10 px-6">
          <div className="flex items-center gap-3">
            <div onClick={() => navigate('/')} className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-[#0B6B50]">
              <Leaf size={22} />
            </div>
            <div>
              <div className="text-lg font-bold">EcoTrust</div>
              <div className="text-[9px] tracking-wider text-emerald-300/60">ENVIRONMENTAL INTELLIGENCE</div>
            </div>
          </div>
          <button onClick={() => setOpen(false)} className="lg:hidden">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6">
          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-widest text-white/30">Workspace</p>
          <nav className="space-y-1">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  onClick={() => navigate(item.path)}
                  key={item.name}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
                    item.active ? 'bg-[#0B6B50] text-white shadow-lg' : 'text-white/55 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon size={18} />
                  <span className="flex-1 text-left">{item.name}</span>
                  {item.badge && <span className="rounded-full bg-red-500 px-2 py-0.5 text-[9px] font-bold">{item.badge}</span>}
                </button>
              );
            })}
          </nav>

          <p className="mb-3 mt-8 px-3 text-[10px] font-semibold uppercase tracking-widest text-white/30">System</p>
          <button
            onClick={() => navigate('/settings')}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/55 hover:bg-white/5 hover:text-white"
          >
            <Settings size={18} />
            Settings
          </button>
        </div>

        <div className="shrink-0 border-t border-white/10 p-4">
          <div className="rounded-xl bg-white/5 p-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              <span className="text-xs font-medium">Compliance Engine Active</span>
            </div>
            <p className="mt-2 text-[10px] text-white/40">Continuous Regulatory Audit</p>
          </div>
        </div>
      </aside>
    </>
  );
}

function StatCard({ title, value, detail, icon: Icon, tone = 'green' }) {
  const styles = {
    green: 'bg-emerald-50 text-[#0B6B50] dark:bg-emerald-400/10 dark:text-emerald-300',
    red: 'bg-red-50 text-red-500 dark:bg-red-400/10 dark:text-red-300',
    amber: 'bg-amber-50 text-amber-600 dark:bg-amber-400/10 dark:text-amber-300',
    blue: 'bg-blue-50 text-blue-500 dark:bg-blue-400/10 dark:text-blue-300',
  };
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.03)] transition-colors duration-300 dark:border-white/10 dark:bg-[#0B241D]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{title}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-[#0F172A] dark:text-white">{value}</p>
          <p className="mt-2 text-[10px] text-slate-400 dark:text-slate-500">{detail}</p>
        </div>
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${styles[tone]}`}>
          <Icon size={19} />
        </div>
      </div>
    </div>
  );
}

export default function Compliance() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const isDark = theme === 'dark';
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Live State
  const [factories, setFactories] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchComplianceData = async () => {
    try {
      setLoading(true);
      const [factoryData, alertsData] = await Promise.all([
        getLiveDashboard(),
        getActiveAlerts(),
      ]);
      setFactories(factoryData || []);
      setAlerts(alertsData || []);
    } catch (err) {
      console.error('Failed to fetch compliance data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplianceData();
    const interval = setInterval(fetchComplianceData, 20000); // 20s auto-refresh
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  // Dynamic Ledger & Stats Calculation
  const ledger = useMemo(() => {
    return factories.map((f) => {
      const factoryAlerts = alerts.filter(
        (a) => a.factoryId === f.factoryId || a.factoryName === f.factoryName
      );
      return {
        ...f,
        openIssues: factoryAlerts.length,
      };
    }).sort((a, b) => a.trustScore - b.trustScore); // Worst trust scores first
  }, [factories, alerts]);

  const stats = useMemo(() => {
    const total = ledger.length || 1;
    const avgTrust = Math.round(ledger.reduce((sum, p) => sum + (p.trustScore || 100), 0) / total);
    const compliantCount = ledger.filter((p) => p.trustScore >= 75 && p.verdict === 'VERIFIED').length;
    const openIssuesCount = alerts.length;
    const regulatoryReadiness = Math.round((compliantCount / total) * 100);

    return {
      avgTrust: `${avgTrust}%`,
      compliantRatio: `${compliantCount}/${total}`,
      openIssues: openIssuesCount,
      regulatoryReadiness: `${regulatoryReadiness}%`,
    };
  }, [ledger, alerts]);

  return (
    <div className="min-h-screen bg-[#F7FAF8] font-[Inter,sans-serif] text-[#0F172A] transition-colors duration-300 dark:bg-[#071A15] dark:text-white">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} alertCount={alerts.length} />

      <div className="min-w-0 lg:ml-[250px]">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-slate-200 bg-white/90 px-5 backdrop-blur-xl transition-colors duration-300 dark:border-white/10 dark:bg-[#071A15]/90 lg:px-8">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5 lg:hidden">
              <Menu size={21} />
            </button>
            <div>
              <h1 className="text-lg font-bold">Regulatory Compliance Ledger</h1>
              <p className="hidden text-[10px] text-slate-400 dark:text-slate-500 sm:block">
                Trust-verified regulatory readiness & AI tamper audit across industrial facilities
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchComplianceData}
              disabled={loading}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:bg-[#0B241D] dark:text-slate-300"
            >
              <RefreshCw size={13} className={loading ? 'animate-spin text-emerald-500' : ''} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              type="button"
              onClick={() => dispatch(toggleTheme())}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 dark:border-white/10 dark:bg-[#0B241D] dark:text-yellow-300 dark:hover:bg-white/5"
            >
              {isDark ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            <div className="flex items-center gap-2">
              <div onClick={() => navigate('/profile')} className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#0B6B50] text-xs font-bold text-white">
                ET
              </div>
              <div className="hidden sm:block">
                <p className="text-xs font-semibold">Auditor Admin</p>
                <p className="text-[9px] text-slate-400 dark:text-slate-500">Environmental Officer</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Body */}
        <main className="mx-auto max-w-[1600px] p-5 lg:p-8">
          <div className="mb-7">
            <div className="flex items-center gap-2 mb-2">
              <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-bold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                <ShieldCheck size={13} />
                CPCB COMPLIANCE AUDIT
              </span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Environmental Compliance & Trust Ledger</h2>
            <p className="mt-1 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
              Compliance status is computed through continuous mathematical sanity checks, energy cross-correlation, and AI tamper evaluation.
            </p>
          </div>

          {/* Top 4 Stats */}
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Average Trust Score"
              value={stats.avgTrust}
              detail={`${ledger.length} monitored facilities`}
              icon={ShieldCheck}
              tone={Number(stats.avgTrust.replace('%', '')) >= 75 ? 'green' : 'red'}
            />
            <StatCard
              title="Verified Compliant Plants"
              value={stats.compliantRatio}
              detail="Trust score ≥ 75% without tampering"
              icon={CheckCircle2}
              tone="green"
            />
            <StatCard
              title="Open Compliance Issues"
              value={stats.openIssues}
              detail="Unresolved incident alerts"
              icon={CircleAlert}
              tone={stats.openIssues > 0 ? 'red' : 'green'}
            />
            <StatCard
              title="Regulatory Readiness"
              value={stats.regulatoryReadiness}
              detail="Clean audit submission rate"
              icon={FileText}
              tone="blue"
            />
          </section>

          {/* Factory Trust Ledger */}
          <section className="mt-7">
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h3 className="text-sm font-bold flex items-center gap-2">
                  <Sparkles size={16} className="text-emerald-500" />
                  Live Factory Trust & Audit Ledger
                </h3>
                <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">
                  Real-time audit records evaluated by EcoTrust Layer 1 (Rules) & Layer 2 (Cross-Correlation)
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition-colors duration-300 dark:border-white/10 dark:bg-[#0B241D]">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs min-w-[700px]">
                  <thead className="border-b border-slate-100 text-[10px] uppercase tracking-wide text-slate-400 dark:border-white/10 dark:text-slate-500">
                    <tr>
                      <th className="px-5 py-3 font-semibold">Plant / Stack</th>
                      <th className="px-5 py-3 font-semibold">Sensor & Load</th>
                      <th className="px-5 py-3 font-semibold">Trust Score</th>
                      <th className="px-5 py-3 font-semibold">Compliance Status</th>
                      <th className="px-5 py-3 font-semibold">Open Issues</th>
                      <th className="px-5 py-3 font-semibold">AI Auditor Flags</th>
                      <th className="px-5 py-3 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ledger.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="px-5 py-12 text-center text-slate-400">
                          Fetching live compliance ledger from CEMS stream...
                        </td>
                      </tr>
                    ) : (
                      ledger.map((p) => {
                        const status = getTrustStatus(p.trustScore, p.verdict);
                        return (
                          <tr key={p._id || p.factoryId} className="border-b border-slate-50 last:border-0 dark:border-white/5 hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition">
                            <td className="px-5 py-4">
                              <p className="font-semibold text-slate-800 dark:text-slate-200">{p.factoryName}</p>
                              <p className="text-[10px] text-slate-400">ID: {p.factoryId}</p>
                            </td>

                            <td className="px-5 py-4 text-slate-500 dark:text-slate-400">
                              <p className="font-mono text-[11px] text-slate-700 dark:text-slate-300">{p.sensorId || 'STACK-01'}</p>
                              <p className="text-[10px] flex items-center gap-1 text-slate-400">
                                <Zap size={10} /> {p.rawReading?.electricityConsumption || 0} kW
                              </p>
                            </td>

                            <td className="px-5 py-4">
                              <div className="flex items-center gap-2">
                                <div className="h-1.5 w-20 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
                                  <div className={`h-full rounded-full ${status.bar}`} style={{ width: `${p.trustScore}%` }} />
                                </div>
                                <span className="font-mono font-semibold text-slate-700 dark:text-slate-200">{p.trustScore}%</span>
                              </div>
                            </td>

                            <td className="px-5 py-4">
                              <span className={`inline-block rounded-full border px-2.5 py-1 text-[9px] font-semibold ${status.bg} ${status.text}`}>
                                {status.label}
                              </span>
                            </td>

                            <td className="px-5 py-4">
                              {p.openIssues > 0 ? (
                                <span className="inline-flex items-center gap-1 font-bold text-red-500">
                                  <CircleAlert size={12} /> {p.openIssues} active
                                </span>
                              ) : (
                                <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                                  <CheckCircle2 size={12} /> None
                                </span>
                              )}
                            </td>

                            <td className="px-5 py-4 max-w-[200px]">
                              {p.failedFlags && p.failedFlags.length > 0 ? (
                                <span className="rounded bg-red-100 dark:bg-red-500/20 px-2 py-0.5 text-[9px] font-bold text-red-700 dark:text-red-300 truncate inline-block">
                                  {p.failedFlags[0]}
                                </span>
                              ) : (
                                <span className="text-[10px] text-slate-400 dark:text-slate-500">
                                  ✓ Verified Clean
                                </span>
                              )}
                            </td>

                            <td className="px-5 py-4 text-right">
                              <button
                                onClick={() => navigate(`/livemonitoring`)}
                                className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-semibold text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:bg-[#071A15] dark:text-slate-300 dark:hover:bg-white/5 transition"
                              >
                                Live Stream →
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}