import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  FileText,
  GraduationCap,
  Leaf,
  Menu,
  Moon,
  Search,
  ShieldCheck,
  Sparkles,
  Sun,
  Video,
  Wind,
  X,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toggleTheme, setTheme } from '../features/Theme/Theme_slice';

const categories = [
  'All',
  'CEMS & CEQMS',
  'Compliance',
  'Air Quality',
  'Regulations',
  'Alerts',
  'Reports',
  'Tutorials',
];

const resources = [
  {
    id: 1,
    icon: FileText,
    category: 'CEMS & CEQMS',
    type: 'Guide',
    time: '8 min read',
    title: 'CEMS & CEQMS Explained',
    description:
      'Understand how continuous emission monitoring systems collect environmental data and how that data can feed EcoTrust.',
    featured: true,
  },
  {
    id: 2,
    icon: ShieldCheck,
    category: 'Compliance',
    type: 'Guide',
    time: '6 min read',
    title: 'Understanding Environmental Compliance',
    description:
      'Learn how environmental parameters, thresholds, violations and compliance scores fit together.',
    featured: true,
  },
  {
    id: 3,
    icon: Sparkles,
    category: 'Alerts',
    type: 'How it works',
    time: '5 min read',
    title: 'How EcoTrust Detects Violations',
    description:
      'Follow the journey from incoming environmental data to analysis, violation detection and actionable alerts.',
    featured: true,
  },
  {
    id: 4,
    icon: Wind,
    category: 'Air Quality',
    type: 'Reference',
    time: '7 min read',
    title: 'Understanding PM2.5, PM10, SO₂ & NOx',
    description:
      'A simple reference for the environmental parameters displayed in live industrial monitoring.',
  },
  {
    id: 5,
    icon: BookOpen,
    category: 'Tutorials',
    type: 'Tutorial',
    time: '5 min read',
    title: 'Navigate the EcoTrust Dashboard',
    description:
      'Learn how to use the factory map, live readings, alerts, compliance overview and monitoring controls.',
  },
  {
    id: 6,
    icon: FileText,
    category: 'Reports',
    type: 'Guide',
    time: '6 min read',
    title: 'Compliance Reporting Guide',
    description:
      'Understand how compliance history and environmental events can be organized into actionable reports.',
  },
  {
    id: 7,
    icon: ShieldCheck,
    category: 'Regulations',
    type: 'Reference',
    time: '10 min read',
    title: 'Environmental Standards & Regulations',
    description:
      'A central reference area for environmental standards, regulatory guidance and official compliance documents.',
  },
  {
    id: 8,
    icon: Video,
    category: 'Alerts',
    type: 'Tutorial',
    time: '4 min read',
    title: 'Investigate a Factory Violation',
    description:
      'See how an officer can move from a red factory marker to live readings, alerts and compliance history.',
  },
  {
    id: 9,
    icon: GraduationCap,
    category: 'Tutorials',
    type: 'Tutorial',
    time: '5 min read',
    title: 'Review a Factory in Real Time',
    description:
      'Walk through the process of selecting a factory and reviewing its current environmental status.',
  },
];

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0B6B50] text-white">
        <Leaf size={23} strokeWidth={2.2} />
      </div>
      <span className="text-[22px] font-bold tracking-tight text-[#0F172A] dark:text-white">
        Eco<span className="text-[#0B6B50] dark:text-emerald-400">Trust</span>
      </span>
    </div>
  );
}

function ThemeToggle({ className = '' }) {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={() => dispatch(toggleTheme())}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-emerald-50 hover:text-[#0B6B50] dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-emerald-300 ${className}`}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}

function ResourceCard({ resource, onOpen }) {
  const Icon = resource.icon;

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/5 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-emerald-500/30 dark:hover:shadow-none">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-[#0B6B50] transition group-hover:bg-[#0B6B50] group-hover:text-white dark:bg-emerald-500/10 dark:text-emerald-400">
          <Icon size={20} />
        </div>

        <span className="rounded-full bg-slate-50 px-2.5 py-1 text-[9px] font-semibold text-slate-500 dark:bg-white/10 dark:text-white/60">
          {resource.type}
        </span>
      </div>

      <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#0B6B50] dark:text-emerald-400">
        {resource.category}
      </p>

      <h3 className="mt-2 text-lg font-bold tracking-tight text-[#0F172A] dark:text-white">
        {resource.title}
      </h3>

      <p className="mt-2 flex-1 text-sm leading-6 text-slate-500 dark:text-white/50">
        {resource.description}
      </p>

      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-white/10">
        <span className="text-[10px] text-slate-400 dark:text-white/30">{resource.time}</span>

        <button
          onClick={() => onOpen(resource)}
          className="flex items-center gap-2 text-xs font-semibold text-[#0B6B50] transition group-hover:gap-3 dark:text-emerald-400"
        >
          Read Guide
          <ArrowRight size={14} />
        </button>
      </div>
    </article>
  );
}

function ResourceReader({ resource, onClose }) {
  const Icon = resource.icon;

  const content = {
    'CEMS & CEQMS Explained': [
      ['What is CEMS?', 'Continuous Emission Monitoring Systems are used to continuously measure selected emission parameters from industrial processes.'],
      ['How the data reaches EcoTrust', 'Factory monitoring equipment produces environmental readings. Those readings can be transmitted to EcoTrust for monitoring, analysis and visualization.'],
      ['Why it matters', 'Continuous data allows officers and organizations to observe changes over time instead of relying only on periodic manual reviews.'],
    ],
    'Understanding Environmental Compliance': [
      ['What is compliance?', 'Environmental compliance is the process of operating within applicable environmental requirements and maintaining the required monitoring and reporting practices.'],
      ['How EcoTrust helps', 'EcoTrust brings environmental readings, alerts, factory status and compliance information together so officers can review facility conditions from one workspace.'],
      ['From warning to action', 'When a monitored parameter requires attention, the officer can investigate the factory, review the available data and take the appropriate compliance action.'],
    ],
    'How EcoTrust Detects Violations': [
      ['Step 1 — Collect', 'Environmental data is received from connected monitoring systems and sensors.'],
      ['Step 2 — Analyze', 'EcoTrust evaluates incoming readings against configured monitoring and compliance rules.'],
      ['Step 3 — Detect', 'When a reading crosses a configured threshold or requires attention, EcoTrust can flag the event.'],
      ['Step 4 — Alert', 'The event is surfaced to the officer through the alert and monitoring workflow.'],
      ['Step 5 — Act', 'The officer can open the factory, inspect the readings and review compliance information.'],
    ],
  };

  const sections =
    content[resource.title] || [
      ['Overview', resource.description],
      ['Using this resource', 'Use this guide as a quick reference while exploring the EcoTrust dashboard and monitoring workflows.'],
      ['Related workflow', 'Factory → Monitoring Data → EcoTrust → Analysis → Alert → Officer Review'],
    ];

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-[#F7FAF8] dark:bg-[#071A15]">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur-xl dark:border-white/10 dark:bg-[#071A15]/95">
        <div className="mx-auto flex h-[72px] max-w-[1000px] items-center justify-between px-5 lg:px-8">
          <button onClick={onClose} className="flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-[#0B6B50] dark:text-white/60 dark:hover:text-emerald-400">
            <ChevronRight size={15} className="rotate-180" />
            Back to Resources
          </button>

          <Logo />
        </div>
      </header>

      <main className="mx-auto max-w-[900px] px-5 py-12 lg:px-8 lg:py-16">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-[#0B6B50] dark:bg-emerald-500/10 dark:text-emerald-400">
          <Icon size={22} />
        </div>

        <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-[#0B6B50] dark:text-emerald-400">
          {resource.category} · {resource.type}
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#0F172A] dark:text-white sm:text-5xl">
          {resource.title}
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-500 dark:text-white/50">
          {resource.description}
        </p>

        <div className="mt-6 flex items-center gap-3 text-[10px] text-slate-400 dark:text-white/30">
          <span>{resource.time}</span>
          <span>•</span>
          <span>EcoTrust Resource Center</span>
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_15px_50px_rgba(15,23,42,0.06)] dark:border-white/10 dark:bg-white/[0.03] dark:shadow-none">
          <div className="border-b border-slate-100 bg-[#052E24] px-6 py-8 text-white dark:border-white/10 sm:px-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-300">
              Resource Guide
            </p>
            <h2 className="mt-2 text-2xl font-bold">
              Environmental intelligence, explained simply.
            </h2>
          </div>

          <div className="space-y-8 p-6 sm:p-10">
            {sections.map(([heading, body]) => (
              <section key={heading}>
                <h3 className="text-lg font-bold text-[#0F172A] dark:text-white">{heading}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-500 dark:text-white/50">{body}</p>
              </section>
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-emerald-100 bg-emerald-50 p-6 dark:border-emerald-500/30 dark:bg-emerald-500/10">
          <p className="text-xs font-bold text-[#064E3B] dark:text-emerald-300">EcoTrust workflow</p>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-[10px] font-semibold text-[#0B6B50] dark:text-emerald-300">
            {['Factory', 'CEMS / CEQMS', 'EcoTrust', 'Analysis', 'Alert', 'Officer'].map(
              (step, index) => (
                <div key={step} className="flex items-center gap-2">
                  <span className="rounded-lg bg-white px-3 py-2 shadow-sm dark:bg-white/10">{step}</span>
                  {index < 5 && <ArrowRight size={12} />}
                </div>
              ),
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function ResourceLibrary() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedResource, setSelectedResource] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  // Initialize theme from localStorage once, on first mount
  useEffect(() => {
    const saved = localStorage.getItem('ecotrust-theme');
    if (saved && saved !== theme) {
      dispatch(setTheme(saved));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep the `dark` class on <html> in sync with the redux theme state
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const filteredResources = useMemo(() => {
    const q = query.toLowerCase().trim();

    return resources.filter((resource) => {
      const categoryMatch =
        activeCategory === 'All' ||
        resource.category === activeCategory;

      const text = `${resource.title} ${resource.description} ${resource.category} ${resource.type}`.toLowerCase();

      return categoryMatch && (!q || text.includes(q));
    });
  }, [query, activeCategory]);

  if (selectedResource) {
    return (
      <ResourceReader
        resource={selectedResource}
        onClose={() => setSelectedResource(null)}
      />
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F7FAF8] font-[Inter,sans-serif] text-[#0F172A] dark:bg-[#071A15] dark:text-white transition-colors duration-300">
      {/* Trust Banner */}
      <div className="bg-[#064E3B] px-4 py-2.5 text-center text-xs font-medium text-white sm:text-sm">
        <span className="inline-flex items-center gap-2">
          <Leaf size={15} />
          Building a cleaner tomorrow with real-time environmental transparency.
        </span>
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl dark:border-white/10 dark:bg-[#071A15]/90">
        <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-5 lg:px-8">
          <Logo />

          <nav className="hidden items-center gap-9 md:flex">
            <button onClick={() => navigate("/")} className="text-sm font-medium text-slate-600 hover:text-[#0B6B50] dark:text-white/60 dark:hover:text-emerald-400">
              Home
            </button>
            <button onClick={() => navigate("/about")} className="text-sm font-medium text-slate-600 hover:text-[#0B6B50] dark:text-white/60 dark:hover:text-emerald-400">
              About
            </button>
            <button onClick={() => navigate("/resources")} className="text-sm font-semibold text-[#0B6B50] dark:text-emerald-400">
              Resources
            </button>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle />

            <button onClick={() => navigate("/login")} className="rounded-lg border border-[#0B6B50] px-5 py-2.5 text-sm font-semibold text-[#064E3B] transition hover:bg-emerald-50 dark:border-emerald-500/40 dark:text-emerald-300 dark:hover:bg-emerald-500/10">
              Log In
            </button>
            <button onClick={() => navigate("/selectrole")} className="rounded-lg bg-[#0B6B50] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-900/10 transition hover:bg-[#064E3B]">
              Get Started
            </button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />

            <button onClick={() => setMobileMenu(!mobileMenu)} className="rounded-lg p-2 text-[#0F172A] dark:text-white">
              {mobileMenu ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {mobileMenu && (
          <div className="border-t border-slate-100 bg-white px-5 py-5 dark:border-white/10 dark:bg-[#071A15] md:hidden">
            <div className="space-y-1">
              {['Home', 'About', 'Resources'].map((item) => (
                <button
                  key={item}
                  onClick={() => navigate(item === 'Home' ? '/' : `/${item.toLowerCase()}`)}
                  className="block rounded-lg px-3 py-3 text-sm font-medium text-slate-700 hover:bg-emerald-50 dark:text-white/70 dark:hover:bg-white/5"
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <button className="rounded-lg border border-[#0B6B50] py-2.5 text-sm font-semibold text-[#064E3B] dark:border-emerald-500/40 dark:text-emerald-300">
                Log In
              </button>
              <button className="rounded-lg bg-[#0B6B50] py-2.5 text-sm font-semibold text-white">
                Get Started
              </button>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-slate-100 bg-white dark:border-white/10 dark:bg-[#0A211B]">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-[-180px] top-[80px] h-[450px] w-[450px] rounded-full bg-emerald-100/30 blur-3xl dark:bg-emerald-500/10" />
            <div className="absolute right-[-180px] top-[-100px] h-[500px] w-[500px] rounded-full bg-green-100/30 blur-3xl dark:bg-green-500/10" />
          </div>

          <div className="relative mx-auto max-w-[1200px] px-5 pb-14 pt-14 lg:px-8 lg:pb-18 lg:pt-18">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-xs font-semibold text-[#064E3B] dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300">
                <BookOpen size={15} />
                Environmental Resource Library
              </span>

              <h1 className="mt-6 text-4xl font-bold leading-tight tracking-[-0.035em] text-[#0F172A] dark:text-white sm:text-5xl lg:text-[52px]">
                Knowledge for better{' '}
                <span className="text-[#0B6B50] dark:text-emerald-400">environmental action</span>
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-white/60">
                Find practical guides, references and tutorials for industrial
                monitoring, compliance, alerts and EcoTrust workflows.
              </p>
            </div>

            <div className="mt-8 max-w-2xl">
              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3.5 shadow-[0_10px_35px_rgba(15,23,42,0.06)] focus-within:border-emerald-300 focus-within:ring-4 focus-within:ring-emerald-50 dark:border-white/10 dark:bg-white/[0.03] dark:focus-within:border-emerald-500/30 dark:focus-within:ring-emerald-500/20">
                <Search size={18} className="text-slate-400 dark:text-white/30" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search CEMS, compliance, PM2.5, alerts..."
                  className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 dark:placeholder:text-white/30 dark:text-white"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="border-b border-slate-200 bg-white dark:border-white/10 dark:bg-[#0A211B]">
          <div className="mx-auto flex max-w-[1200px] flex-wrap gap-2 px-5 py-5 lg:px-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full border px-4 py-2 text-[10px] font-semibold transition ${
                  activeCategory === category
                    ? 'border-[#0B6B50] bg-[#0B6B50] text-white'
                    : 'border-slate-200 bg-white text-slate-500 hover:border-emerald-200 hover:text-[#0B6B50] dark:border-white/10 dark:bg-white/[0.03] dark:text-white/50 dark:hover:border-emerald-500/30 dark:hover:text-emerald-400'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Featured */}
        <section className="bg-[#F7FAF8] px-5 py-14 dark:bg-[#071A15] lg:px-8 lg:py-16">
          <div className="mx-auto max-w-[1200px]">
            <div className="flex items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#0B6B50] dark:text-emerald-400">
                  Recommended
                </span>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#0F172A] dark:text-white sm:text-3xl">
                  Start with these resources
                </h2>
              </div>
              <span className="hidden text-xs text-slate-400 dark:text-white/30 sm:block">
                {filteredResources.length} resources available
              </span>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {filteredResources
                .filter((resource) => resource.featured)
                .map((resource) => (
                  <ResourceCard
                    key={resource.id}
                    resource={resource}
                    onOpen={setSelectedResource}
                  />
                ))}
            </div>
          </div>
        </section>

        {/* Library */}
        <section className="bg-white px-5 py-14 dark:bg-[#0A211B] lg:px-8 lg:py-16">
          <div className="mx-auto max-w-[1200px]">
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#0B6B50] dark:text-emerald-400">
                Resource Library
              </span>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#0F172A] dark:text-white sm:text-3xl">
                Explore all resources
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500 dark:text-white/50">
                Browse practical content for understanding environmental data,
                compliance and EcoTrust operations.
              </p>
            </div>

            {filteredResources.length ? (
              <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {filteredResources.map((resource) => (
                  <ResourceCard
                    key={resource.id}
                    resource={resource}
                    onOpen={setSelectedResource}
                  />
                ))}
              </div>
            ) : (
              <div className="mt-10 rounded-2xl border border-dashed border-slate-200 bg-[#F7FAF8] p-14 text-center dark:border-white/10 dark:bg-white/[0.03]">
                <Search className="mx-auto text-slate-300 dark:text-white/20" size={30} />
                <p className="mt-3 text-sm font-semibold text-slate-700 dark:text-white/70">
                  No resources found
                </p>
                <p className="mt-1 text-xs text-slate-400 dark:text-white/30">
                  Try another search term or select All.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#F7FAF8] px-5 py-14 dark:bg-[#071A15] lg:px-8">
          <div className="mx-auto max-w-[1200px]">
            <div className="rounded-3xl bg-[#052E24] px-6 py-10 text-white sm:px-10 lg:px-12">
              <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
                <div>
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-300">
                    Explore EcoTrust
                  </span>
                  <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
                    Ready to see the monitoring workflow?
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-white/50">
                    Explore factories, live environmental readings, alerts and
                    compliance information in one dashboard.
                  </p>
                </div>

                <button onClick={() => navigate("/dashboard")} className="flex items-center justify-center gap-2 rounded-xl bg-[#0B6B50] px-5 py-3 text-xs font-semibold text-white transition hover:bg-[#064E3B]">
                  Explore Dashboard
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#052E24] px-5 py-10 text-white lg:px-8">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-5 sm:flex-row">
          <Logo />
          <p className="text-xs text-white/40">
            © 2026 EcoTrust. Building a cleaner tomorrow.
          </p>
        </div>
      </footer>
    </div>
  );
}