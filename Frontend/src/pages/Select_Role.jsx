import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Factory,
  Leaf,
  Map,
  ShieldCheck,
  Users,
} from 'lucide-react';

import { useState } from 'react';

const roles = [
  {
    id: 'industry_user',
    title: 'Industry User',
    subtitle: 'Manage your environmental operations',
    description:
      'Monitor your facilities, environmental devices, emissions and compliance from one centralized platform.',

    icon: Factory,

    features: [
      'Monitor facility emissions',
      'Manage CEMS & CEQMS devices',
      'Track compliance status',
      'Generate environmental reports',
    ],
  },

  {
    id: 'government_user',
    title: 'Government User',
    subtitle: 'Monitor environmental compliance',
    description:
      'Get a centralized view of industries, environmental performance, alerts and compliance across your jurisdiction.',

    icon: ShieldCheck,

    features: [
      'Monitor registered industries',
      'View regional environmental data',
      'Track compliance violations',
      'Analyze environmental trends',
    ],
  },
];

export default function SelectRole() {
  const [selectedRole, setSelectedRole] = useState(null);

  const handleContinue = () => {
    if (!selectedRole) return;

    console.log('Selected role:', selectedRole);

    // Example:
    // navigate("/dashboard");
    // or save role to backend
  };

  return (
    <div className="min-h-screen bg-[#F7FAF8] font-[Inter,sans-serif] text-[#0F172A]">
      {/* =====================================================
          HEADER
      ====================================================== */}

      <header className="border-b border-slate-200/80 bg-white/90">
        <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between px-5 lg:px-8">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0B6B50] text-white">
              <Leaf size={22} />
            </div>

            <span className="text-[21px] font-bold tracking-tight">
              Eco<span className="text-[#0B6B50]">Trust</span>
            </span>
          </div>

          {/* Security */}
          <div className="hidden items-center gap-2 text-[10px] font-medium text-slate-400 sm:flex">
            <ShieldCheck size={14} />
            Secure onboarding
          </div>
        </div>
      </header>

      {/* =====================================================
          MAIN
      ====================================================== */}

      <main className="relative min-h-[calc(100vh-72px)] overflow-hidden">
        {/* Background decorations */}

        <div className="pointer-events-none absolute left-[-200px] top-[80px] h-[450px] w-[450px] rounded-full bg-emerald-100/40 blur-3xl" />

        <div className="pointer-events-none absolute bottom-[-200px] right-[-100px] h-[500px] w-[500px] rounded-full bg-green-100/40 blur-3xl" />

        <div className="relative mx-auto max-w-[1050px] px-5 py-14 sm:py-20">
          {/* =================================================
              HEADING
          ================================================== */}

          <div className="mx-auto max-w-[650px] text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-[#0B6B50]">
              <Users size={22} />
            </div>

            <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-[#0B6B50]">
              Account Setup
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              How will you use EcoTrust?
            </h1>

            <p className="mx-auto mt-4 max-w-[560px] text-sm leading-6 text-slate-500 sm:text-base">
              Select your role to personalize your EcoTrust experience and give
              you access to the tools relevant to your work.
            </p>
          </div>

          {/* =================================================
              ROLE CARDS
          ================================================== */}

          <div className="mx-auto mt-12 grid max-w-[900px] gap-5 md:grid-cols-2">
            {roles.map((role) => {
              const Icon = role.icon;

              const isSelected = selectedRole === role.id;

              return (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`group relative text-left transition duration-300 ${
                    isSelected ? 'scale-[1.01]' : 'hover:-translate-y-1'
                  }`}
                >
                  {/* Selection border */}

                  <div
                    className={`h-full rounded-3xl border p-[1px] transition ${
                      isSelected
                        ? 'border-[#0B6B50] bg-[#0B6B50] shadow-xl shadow-emerald-900/10'
                        : 'border-slate-200 bg-transparent'
                    }`}
                  >
                    <div className="relative h-full rounded-[23px] bg-white p-7 sm:p-8">
                      {/* Selected check */}

                      {isSelected && (
                        <div className="absolute right-6 top-6 flex h-7 w-7 items-center justify-center rounded-full bg-[#0B6B50] text-white">
                          <CheckCircle2 size={17} />
                        </div>
                      )}

                      {/* Icon */}

                      <div
                        className={`flex h-14 w-14 items-center justify-center rounded-2xl transition ${
                          isSelected
                            ? 'bg-[#0B6B50] text-white'
                            : 'bg-emerald-50 text-[#0B6B50] group-hover:bg-[#0B6B50] group-hover:text-white'
                        }`}
                      >
                        <Icon size={26} />
                      </div>

                      {/* Title */}

                      <h2 className="mt-7 text-xl font-bold">{role.title}</h2>

                      <p className="mt-1 text-sm font-medium text-[#0B6B50]">
                        {role.subtitle}
                      </p>

                      {/* Description */}

                      <p className="mt-4 text-sm leading-6 text-slate-500">
                        {role.description}
                      </p>

                      {/* Features */}

                      <div className="mt-7 space-y-3 border-t border-slate-100 pt-6">
                        {role.features.map((feature) => (
                          <div
                            key={feature}
                            className="flex items-center gap-3"
                          >
                            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50">
                              <CheckCircle2
                                size={13}
                                className="text-[#0B6B50]"
                              />
                            </div>

                            <span className="text-xs font-medium text-slate-600">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Select indicator */}

                      <div
                        className={`mt-7 flex items-center justify-between rounded-xl px-4 py-3 transition ${
                          isSelected
                            ? 'bg-emerald-50'
                            : 'bg-slate-50 group-hover:bg-emerald-50'
                        }`}
                      >
                        <span
                          className={`text-xs font-semibold ${
                            isSelected
                              ? 'text-[#0B6B50]'
                              : 'text-slate-500 group-hover:text-[#0B6B50]'
                          }`}
                        >
                          {isSelected ? 'Selected' : 'Select this role'}
                        </span>

                        <ArrowRight
                          size={15}
                          className={`transition ${
                            isSelected
                              ? 'translate-x-1 text-[#0B6B50]'
                              : 'text-slate-400 group-hover:translate-x-1 group-hover:text-[#0B6B50]'
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* =================================================
              CONTINUE
          ================================================== */}

          <div className="mx-auto mt-9 max-w-[900px]">
            <button
              onClick={handleContinue}
              disabled={!selectedRole}
              className={`mx-auto flex w-full max-w-[500px] items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold transition ${
                selectedRole
                  ? 'bg-[#0B6B50] text-white shadow-lg shadow-emerald-900/10 hover:bg-[#064E3B]'
                  : 'cursor-not-allowed bg-slate-200 text-slate-400'
              }`}
            >
              Continue
              <ArrowRight
                size={17}
                className={
                  selectedRole ? 'transition group-hover:translate-x-1' : ''
                }
              />
            </button>

            <p className="mt-4 text-center text-[10px] text-slate-400">
              You can change your role later by contacting your organization
              administrator.
            </p>
          </div>

          {/* =================================================
              BOTTOM TRUST
          ================================================== */}

          <div className="mx-auto mt-14 flex max-w-[600px] items-center justify-center gap-6 border-t border-slate-200 pt-7">
            <div className="flex items-center gap-2 text-[9px] text-slate-400">
              <ShieldCheck size={13} />
              Secure
            </div>

            <div className="h-3 w-px bg-slate-200" />

            <div className="flex items-center gap-2 text-[9px] text-slate-400">
              <Map size={13} />
              Location aware
            </div>

            <div className="h-3 w-px bg-slate-200" />

            <div className="flex items-center gap-2 text-[9px] text-slate-400">
              <Leaf size={13} />
              Environmental intelligence
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
