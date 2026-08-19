import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Leaf,
  Lock,
  Mail,
  ShieldCheck,
} from 'lucide-react';

import { useState } from 'react';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const handleGoogleLogin = () => {
    // Connect your Google OAuth logic here
    console.log('Google login');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Connect your login API here
    console.log('Login submitted');
  };

  return (
    <div className="min-h-screen bg-[#F7FAF8] font-[Inter,sans-serif]">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* =====================================================
            LEFT HERO SECTION
        ====================================================== */}
        <section className="relative hidden overflow-hidden bg-[#052E24] lg:block">
          {/* Background effects */}
          <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#0B6B50]/30 blur-3xl" />

          <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-emerald-400/10 blur-3xl" />

          {/* Decorative circles */}
          <div className="absolute right-[-100px] top-[15%] h-[350px] w-[350px] rounded-full border border-emerald-400/10" />

          <div className="absolute right-[-50px] top-[22%] h-[250px] w-[250px] rounded-full border border-emerald-400/10" />

          <div className="relative flex min-h-screen flex-col px-10 py-9 xl:px-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0B6B50] text-white">
                <Leaf size={24} />
              </div>

              <div>
                <p className="text-xl font-bold text-white">EcoTrust</p>

                <p className="text-[8px] tracking-[0.18em] text-emerald-300/50">
                  ENVIRONMENTAL INTELLIGENCE
                </p>
              </div>
            </div>

            {/* Hero content */}
            <div className="my-auto max-w-[570px]">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3.5 py-2 text-[10px] font-semibold text-emerald-300">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                ENVIRONMENTAL MONITORING PLATFORM
              </div>

              <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-white xl:text-[52px]">
                Make every environmental decision with{' '}
                <span className="text-[#34D399]">confidence.</span>
              </h1>

              <p className="mt-6 max-w-[500px] text-sm leading-7 text-white/50 xl:text-base">
                Monitor emissions, track compliance, identify risks and turn
                environmental data into actionable insights with EcoTrust.
              </p>

              {/* Benefits */}
              <div className="mt-8 space-y-3">
                {[
                  'Real-time environmental monitoring',
                  'Intelligent compliance management',
                  'Actionable environmental insights',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400/10">
                      <CheckCircle2 size={14} className="text-emerald-300" />
                    </div>

                    <span className="text-xs font-medium text-white/70">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Dashboard preview */}
              <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-400/10">
                      <Activity size={15} className="text-emerald-300" />
                    </div>

                    <div>
                      <p className="text-[10px] font-semibold text-white">
                        Environmental Health
                      </p>

                      <p className="text-[8px] text-white/30">
                        Live network overview
                      </p>
                    </div>
                  </div>

                  <span className="flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2 py-1 text-[8px] font-semibold text-emerald-300">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                    LIVE
                  </span>
                </div>

                {/* Score */}
                <div className="mt-5 flex items-end gap-2">
                  <span className="font-mono text-3xl font-bold text-white">
                    98.7%
                  </span>

                  <span className="mb-1 text-[9px] font-semibold text-emerald-300">
                    +2.4%
                  </span>
                </div>

                {/* Chart */}
                <div className="mt-4 h-[90px]">
                  <svg
                    viewBox="0 0 600 100"
                    className="h-full w-full"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 78 C50 70 75 85 120 58 C165 32 190 68 235 45 C280 25 305 48 350 32 C400 12 425 42 465 25 C510 8 550 22 600 10"
                      fill="none"
                      stroke="#34D399"
                      strokeWidth="2.5"
                    />

                    <path
                      d="M0 78 C50 70 75 85 120 58 C165 32 190 68 235 45 C280 25 305 48 350 32 C400 12 425 42 465 25 C510 8 550 22 600 10 V100 H0Z"
                      fill="rgba(52,211,153,.06)"
                    />
                  </svg>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="rounded-lg bg-white/[0.04] p-2.5">
                    <p className="text-[8px] text-white/30">PM2.5</p>

                    <p className="mt-1 font-mono text-xs font-semibold text-white">
                      28.4
                    </p>

                    <p className="mt-1 text-[7px] text-emerald-300">Normal</p>
                  </div>

                  <div className="rounded-lg bg-white/[0.04] p-2.5">
                    <p className="text-[8px] text-white/30">Devices</p>

                    <p className="mt-1 font-mono text-xs font-semibold text-white">
                      10K+
                    </p>

                    <p className="mt-1 text-[7px] text-emerald-300">Online</p>
                  </div>

                  <div className="rounded-lg bg-white/[0.04] p-2.5">
                    <p className="text-[8px] text-white/30">Alerts</p>

                    <p className="mt-1 font-mono text-xs font-semibold text-white">
                      12
                    </p>

                    <p className="mt-1 text-[7px] text-amber-300">Active</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom */}
            <div className="flex items-center justify-between">
              <p className="text-[9px] text-white/30">© 2026 EcoTrust</p>

              <div className="flex items-center gap-2 text-[9px] text-white/30">
                <ShieldCheck size={12} />
                Secure environmental intelligence
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            RIGHT LOGIN SECTION
        ====================================================== */}
        <section className="flex min-h-screen items-center justify-center bg-[#F7FAF8] px-5 py-10 sm:px-8">
          <div className="w-full max-w-[440px]">
            {/* Mobile Logo */}
            <div className="mb-10 flex items-center gap-2.5 lg:hidden">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0B6B50] text-white">
                <Leaf size={21} />
              </div>

              <span className="text-xl font-bold">
                Eco<span className="text-[#0B6B50]">Trust</span>
              </span>
            </div>

            {/* Heading */}
            <div>
              <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-[#0B6B50]">
                <ShieldCheck size={21} />
              </div>

              <h2 className="text-3xl font-bold tracking-tight text-[#0F172A]">
                Welcome back
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Sign in to access your EcoTrust dashboard.
              </p>
            </div>

            {/* Google Login */}
            <button
              onClick={handleGoogleLogin}
              className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
            >
              {/* Google icon */}
              <svg width="19" height="19" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M21.35 12.23c0-.71-.06-1.4-.18-2.05H12v3.88h5.23a4.47 4.47 0 0 1-1.94 2.93v2.43h3.14c1.84-1.69 2.92-4.18 2.92-7.19z"
                />

                <path
                  fill="#34A853"
                  d="M12 21.78c2.63 0 4.83-.87 6.43-2.36l-3.14-2.43c-.87.58-1.98.92-3.29.92-2.53 0-4.67-1.71-5.44-4.01H3.32v2.51A9.72 9.72 0 0 0 12 21.78z"
                />

                <path
                  fill="#FBBC05"
                  d="M6.56 13.9A5.85 5.85 0 0 1 6.25 12c0-.66.11-1.3.31-1.9V7.59H3.32A9.76 9.76 0 0 0 2.25 12c0 1.58.38 3.07 1.07 4.41l3.24-2.51z"
                />

                <path
                  fill="#EA4335"
                  d="M12 6.09c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.82 3.16 14.62 2.22 12 2.22a9.72 9.72 0 0 0-8.68 5.37l3.24 2.51C7.33 7.8 9.47 6.09 12 6.09z"
                />
              </svg>
              Continue with Google
            </button>

            {/* Divider */}
            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200" />

              <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                or continue with email
              </span>

              <div className="h-px flex-1 bg-slate-200" />
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="mb-2 block text-xs font-semibold text-slate-700">
                  Email address
                </label>

                <div className="relative">
                  <Mail
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="email"
                    placeholder="you@company.com"
                    className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#0B6B50] focus:ring-4 focus:ring-emerald-500/10"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-700">
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-[10px] font-semibold text-[#0B6B50] hover:text-[#064E3B]"
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="relative">
                  <Lock
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-11 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#0B6B50] focus:ring-4 focus:ring-emerald-500/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              {/* Remember */}
              <div className="flex items-center gap-2">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 accent-[#0B6B50]"
                />

                <label htmlFor="remember" className="text-xs text-slate-500">
                  Remember me
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#0B6B50] py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-900/10 transition hover:bg-[#064E3B]"
              >
                Sign in
                <ArrowRight
                  size={16}
                  className="transition group-hover:translate-x-1"
                />
              </button>
            </form>

            {/* Signup */}
            <p className="mt-7 text-center text-xs text-slate-500">
              Don't have an account?{' '}
              <button className="font-semibold text-[#0B6B50] hover:text-[#064E3B]">
                Create an account
              </button>
            </p>

            {/* Security */}
            <div className="mt-8 flex items-center justify-center gap-2 text-[9px] text-slate-400">
              <ShieldCheck size={13} />
              Your data is protected with enterprise-grade security.
            </div>

            {/* Terms */}
            <p className="mt-5 text-center text-[9px] leading-4 text-slate-400">
              By continuing, you agree to EcoTrust's{' '}
              <button className="font-medium text-slate-600">
                Terms of Service
              </button>{' '}
              and{' '}
              <button className="font-medium text-slate-600">
                Privacy Policy
              </button>
              .
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
