import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronDown,
  FileCheck2,
  Globe2,
  Leaf,
  Lock,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  User,
} from 'lucide-react';

import { useState } from 'react';

export default function GovernmentRegistration() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    designation: '',
    jurisdiction: '',
    state: '',
    employeeId: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Government registration:', formData);

    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F7FAF8] font-[Inter,sans-serif] text-[#0F172A]">
      {/* =====================================================
          HEADER
      ====================================================== */}

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-[72px] max-w-[1300px] items-center justify-between px-5 lg:px-8">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0B6B50] text-white">
              <Leaf size={22} />
            </div>

            <div>
              <span className="text-[21px] font-bold tracking-tight">
                Eco<span className="text-[#0B6B50]">Trust</span>
              </span>
            </div>
          </div>

          {/* Government badge */}
          <div className="hidden items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3.5 py-2 sm:flex">
            <ShieldCheck size={14} className="text-[#0B6B50]" />

            <span className="text-[10px] font-semibold text-[#064E3B]">
              GOVERNMENT USER
            </span>
          </div>
        </div>
      </header>

      {/* =====================================================
          PAGE
      ====================================================== */}

      <main className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="pointer-events-none absolute left-[-250px] top-[80px] h-[500px] w-[500px] rounded-full bg-emerald-100/40 blur-3xl" />

        <div className="pointer-events-none absolute bottom-[-250px] right-[-150px] h-[550px] w-[550px] rounded-full bg-green-100/40 blur-3xl" />

        <div className="relative mx-auto max-w-[1300px] px-5 py-10 lg:px-8 lg:py-14">
          {/* =================================================
              TOP
          ================================================== */}

          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
            {/* LEFT INFORMATION */}
            <div className="lg:sticky lg:top-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-[#0B6B50]">
                <ShieldCheck size={14} />
                Government Portal
              </div>

              <h1 className="mt-6 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                Create your government
                <span className="text-[#0B6B50]"> EcoTrust account</span>
              </h1>

              <p className="mt-5 max-w-[500px] text-sm leading-7 text-slate-500">
                Register your official government profile to monitor
                environmental performance, industry compliance and environmental
                data across your jurisdiction.
              </p>

              {/* Benefits */}
              <div className="mt-8 space-y-4">
                <Benefit
                  icon={Globe2}
                  title="Jurisdiction-wide visibility"
                  text="Monitor environmental performance across registered industries and facilities."
                />

                <Benefit
                  icon={ShieldCheck}
                  title="Compliance intelligence"
                  text="Track compliance status, violations and environmental risks."
                />

                <Benefit
                  icon={FileCheck2}
                  title="Regulatory reporting"
                  text="Access structured environmental reports and compliance information."
                />

                <Benefit
                  icon={MapPin}
                  title="Regional monitoring"
                  text="Understand environmental conditions across your assigned region."
                />
              </div>

              {/* Trust card */}
              <div className="mt-9 rounded-2xl bg-[#052E24] p-5 text-white">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0B6B50]">
                    <Lock size={18} />
                  </div>

                  <div>
                    <p className="text-xs font-bold">
                      Official account verification
                    </p>

                    <p className="mt-1 text-[9px] text-white/40">
                      Government accounts may require verification before
                      dashboard access.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                REGISTRATION FORM
            ================================================== */}

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_70px_rgba(6,78,59,0.07)] sm:p-8 lg:p-10">
              {/* Form header */}

              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#0B6B50]">
                    Step 1 of 2
                  </p>

                  <h2 className="mt-2 text-2xl font-bold tracking-tight">
                    Official information
                  </h2>

                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    Enter your official government details below.
                  </p>
                </div>

                <div className="hidden h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-[#0B6B50] sm:flex">
                  <Building2 size={21} />
                </div>
              </div>

              {/* Progress */}
              <div className="mt-7">
                <div className="flex items-center justify-between text-[9px] font-semibold">
                  <span className="text-[#0B6B50]">Account information</span>

                  <span className="text-slate-400">Verification</span>
                </div>

                <div className="mt-2 h-1.5 rounded-full bg-slate-100">
                  <div className="h-full w-1/2 rounded-full bg-[#0B6B50]" />
                </div>
              </div>

              {/* Form */}

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                {/* Personal information */}

                <div>
                  <div className="mb-4 flex items-center gap-2">
                    <User size={15} className="text-[#0B6B50]" />

                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Personal information
                    </h3>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <InputField
                      label="Full name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      icon={User}
                    />

                    <InputField
                      label="Official email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@department.gov.in"
                      type="email"
                      icon={Mail}
                    />

                    <InputField
                      label="Phone number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX"
                      icon={Phone}
                    />

                    <InputField
                      label="Employee / Officer ID"
                      name="employeeId"
                      value={formData.employeeId}
                      onChange={handleChange}
                      placeholder="Official ID"
                      icon={ShieldCheck}
                    />
                  </div>
                </div>

                {/* Organization */}

                <div className="border-t border-slate-100 pt-6">
                  <div className="mb-4 flex items-center gap-2">
                    <Building2 size={15} className="text-[#0B6B50]" />

                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Department information
                    </h3>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <SelectField
                      label="Department / Organization"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      options={[
                        'Pollution Control Board',
                        'Ministry of Environment',
                        'State Environment Department',
                        'Municipal Corporation',
                        'District Administration',
                        'Other Government Organization',
                      ]}
                    />

                    <InputField
                      label="Designation"
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
                      placeholder="e.g. Environmental Officer"
                      icon={User}
                    />

                    <SelectField
                      label="State / UT"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      options={[
                        'Uttar Pradesh',
                        'Delhi',
                        'Maharashtra',
                        'Karnataka',
                        'Gujarat',
                        'Rajasthan',
                        'Madhya Pradesh',
                        'Other',
                      ]}
                    />

                    <InputField
                      label="Jurisdiction"
                      name="jurisdiction"
                      value={formData.jurisdiction}
                      onChange={handleChange}
                      placeholder="District / Region / Zone"
                      icon={MapPin}
                    />
                  </div>
                </div>

                {/* Access */}
                <div className="border-t border-slate-100 pt-6">
                  <div className="mb-4 flex items-center gap-2">
                    <Lock size={15} className="text-[#0B6B50]" />

                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Account access
                    </h3>
                  </div>

                  <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                    <div className="flex gap-3">
                      <CheckCircle2
                        size={17}
                        className="mt-0.5 shrink-0 text-[#0B6B50]"
                      />

                      <div>
                        <p className="text-xs font-semibold text-[#064E3B]">
                          Government verification required
                        </p>

                        <p className="mt-1 text-[10px] leading-5 text-emerald-800/60">
                          Your official details may be reviewed before
                          government dashboard access is enabled.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Terms */}

                <div className="flex items-start gap-2">
                  <input
                    id="terms"
                    type="checkbox"
                    required
                    className="mt-0.5 h-4 w-4 rounded border-slate-300 accent-[#0B6B50]"
                  />

                  <label
                    htmlFor="terms"
                    className="text-[10px] leading-4 text-slate-500"
                  >
                    I confirm that the information provided is accurate and that
                    I am authorized to create a government account.
                  </label>
                </div>

                {/* Submit */}

                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#0B6B50] py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-900/10 transition hover:bg-[#064E3B]"
                >
                  Continue to verification
                  <ArrowRight
                    size={16}
                    className="transition group-hover:translate-x-1"
                  />
                </button>
              </form>

              {/* Footer */}

              <div className="mt-7 flex items-center justify-center gap-2 text-[9px] text-slate-400">
                <ShieldCheck size={13} />
                Government accounts are securely verified.
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ============================================================
   INPUT FIELD
============================================================ */

function InputField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = 'text',
  icon: Icon,
}) {
  return (
    <div>
      <label className="mb-2 block text-[10px] font-semibold text-slate-700">
        {label}
      </label>

      <div className="relative">
        <Icon
          size={15}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-3 text-xs outline-none transition placeholder:text-slate-400 focus:border-[#0B6B50] focus:ring-4 focus:ring-emerald-500/10"
        />
      </div>
    </div>
  );
}

/* ============================================================
   SELECT FIELD
============================================================ */

function SelectField({ label, name, value, onChange, options }) {
  return (
    <div>
      <label className="mb-2 block text-[10px] font-semibold text-slate-700">
        {label}
      </label>

      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          required
          className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 py-3 pr-9 text-xs text-slate-600 outline-none transition focus:border-[#0B6B50] focus:ring-4 focus:ring-emerald-500/10"
        >
          <option value="">Select {label.toLowerCase()}</option>

          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <ChevronDown
          size={15}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
      </div>
    </div>
  );
}

/* ============================================================
   BENEFIT
============================================================ */

function Benefit({ icon: Icon, title, text }) {
  return (
    <div className="flex gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-[#0B6B50]">
        <Icon size={17} />
      </div>

      <div>
        <h3 className="text-xs font-bold text-[#0F172A]">{title}</h3>

        <p className="mt-1 text-[10px] leading-5 text-slate-500">{text}</p>
      </div>
    </div>
  );
}
