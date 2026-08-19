import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronDown,
  Factory,
  FileCheck2,
  Leaf,
  Lock,
  Mail,
  MapPin,
  Phone,
  Radio,
  ShieldCheck,
  User,
} from 'lucide-react';

import { useState } from 'react';

export default function IndustryRegistration() {
  const [formData, setFormData] = useState({
    companyName: '',
    industryType: '',
    registrationNumber: '',
    contactName: '',
    designation: '',
    email: '',
    phone: '',
    state: '',
    city: '',
    address: '',
    facilityType: '',
    monitoringSystem: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Industry registration:', formData);

    // Send data to backend here
    // navigate("/industry/dashboard");
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

            <span className="text-[21px] font-bold tracking-tight">
              Eco<span className="text-[#0B6B50]">Trust</span>
            </span>
          </div>

          {/* Badge */}
          <div className="hidden items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3.5 py-2 sm:flex">
            <Factory size={14} className="text-[#0B6B50]" />

            <span className="text-[10px] font-semibold text-[#064E3B]">
              INDUSTRY USER
            </span>
          </div>
        </div>
      </header>

      {/* =====================================================
          MAIN
      ====================================================== */}

      <main className="relative overflow-hidden">
        {/* Background */}
        <div className="pointer-events-none absolute left-[-250px] top-[100px] h-[500px] w-[500px] rounded-full bg-emerald-100/40 blur-3xl" />

        <div className="pointer-events-none absolute bottom-[-250px] right-[-150px] h-[550px] w-[550px] rounded-full bg-green-100/40 blur-3xl" />

        <div className="relative mx-auto max-w-[1300px] px-5 py-10 lg:px-8 lg:py-14">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
            {/* =================================================
                LEFT INFORMATION
            ================================================== */}

            <div className="lg:sticky lg:top-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-[#0B6B50]">
                <Factory size={14} />
                Industry Portal
              </div>

              <h1 className="mt-6 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                Connect your industry to{' '}
                <span className="text-[#0B6B50]">EcoTrust</span>
              </h1>

              <p className="mt-5 max-w-[500px] text-sm leading-7 text-slate-500">
                Create your industry profile to monitor environmental
                performance, connect monitoring devices, track compliance and
                manage your facilities from one platform.
              </p>

              {/* Benefits */}

              <div className="mt-8 space-y-5">
                <Benefit
                  icon={Radio}
                  title="Real-time monitoring"
                  text="Connect CEMS, CEQMS and other environmental devices to monitor live data."
                />

                <Benefit
                  icon={ShieldCheck}
                  title="Compliance management"
                  text="Track environmental limits, compliance status and potential violations."
                />

                <Benefit
                  icon={BarChartIcon}
                  title="Environmental analytics"
                  text="Understand emission trends and compare environmental performance."
                />

                <Benefit
                  icon={FileCheck2}
                  title="Automated reporting"
                  text="Generate environmental and compliance reports using your collected data."
                />
              </div>

              {/* Info Card */}

              <div className="mt-9 rounded-2xl bg-[#052E24] p-5 text-white">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0B6B50]">
                    <ShieldCheck size={18} />
                  </div>

                  <div>
                    <p className="text-xs font-bold">
                      Secure industry onboarding
                    </p>

                    <p className="mt-1 text-[9px] leading-4 text-white/40">
                      Your organization information is securely stored and used
                      to configure your EcoTrust workspace.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                FORM
            ================================================== */}

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_70px_rgba(6,78,59,0.07)] sm:p-8 lg:p-10">
              {/* Header */}

              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#0B6B50]">
                    Step 1 of 2
                  </p>

                  <h2 className="mt-2 text-2xl font-bold tracking-tight">
                    Industry information
                  </h2>

                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    Tell us about your organization and facility.
                  </p>
                </div>

                <div className="hidden h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-[#0B6B50] sm:flex">
                  <Building2 size={21} />
                </div>
              </div>

              {/* Progress */}

              <div className="mt-7">
                <div className="flex items-center justify-between text-[9px] font-semibold">
                  <span className="text-[#0B6B50]">Organization details</span>

                  <span className="text-slate-400">Verification</span>
                </div>

                <div className="mt-2 h-1.5 rounded-full bg-slate-100">
                  <div className="h-full w-1/2 rounded-full bg-[#0B6B50]" />
                </div>
              </div>

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                {/* =================================================
                    COMPANY
                ================================================== */}

                <div>
                  <div className="mb-4 flex items-center gap-2">
                    <Building2 size={15} className="text-[#0B6B50]" />

                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Organization details
                    </h3>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <InputField
                      label="Company / Organization name"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="ABC Industries Pvt. Ltd."
                      icon={Building2}
                    />

                    <SelectField
                      label="Industry type"
                      name="industryType"
                      value={formData.industryType}
                      onChange={handleChange}
                      options={[
                        'Manufacturing',
                        'Power & Energy',
                        'Cement',
                        'Steel',
                        'Chemical',
                        'Pharmaceutical',
                        'Textile',
                        'Mining',
                        'Oil & Gas',
                        'Other',
                      ]}
                    />

                    <InputField
                      label="Registration number"
                      name="registrationNumber"
                      value={formData.registrationNumber}
                      onChange={handleChange}
                      placeholder="Company / industry registration ID"
                      icon={FileCheck2}
                    />

                    <SelectField
                      label="Facility type"
                      name="facilityType"
                      value={formData.facilityType}
                      onChange={handleChange}
                      options={[
                        'Manufacturing Plant',
                        'Power Plant',
                        'Processing Facility',
                        'Industrial Unit',
                        'Mining Facility',
                        'Treatment Plant',
                        'Other',
                      ]}
                    />
                  </div>
                </div>

                {/* =================================================
                    CONTACT
                ================================================== */}

                <div className="border-t border-slate-100 pt-6">
                  <div className="mb-4 flex items-center gap-2">
                    <User size={15} className="text-[#0B6B50]" />

                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Authorized contact
                    </h3>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <InputField
                      label="Contact person"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleChange}
                      placeholder="Full name"
                      icon={User}
                    />

                    <InputField
                      label="Designation"
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
                      placeholder="Environmental Manager"
                      icon={User}
                    />

                    <InputField
                      label="Official email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@company.com"
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
                  </div>
                </div>

                {/* =================================================
                    LOCATION
                ================================================== */}

                <div className="border-t border-slate-100 pt-6">
                  <div className="mb-4 flex items-center gap-2">
                    <MapPin size={15} className="text-[#0B6B50]" />

                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Facility location
                    </h3>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <SelectField
                      label="State / UT"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      options={[
                        'Uttar Pradesh',
                        'Delhi',
                        'Maharashtra',
                        'Gujarat',
                        'Rajasthan',
                        'Karnataka',
                        'Tamil Nadu',
                        'Madhya Pradesh',
                        'West Bengal',
                        'Other',
                      ]}
                    />

                    <InputField
                      label="City / District"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="City or district"
                      icon={MapPin}
                    />

                    <div className="sm:col-span-2">
                      <label className="mb-2 block text-[10px] font-semibold text-slate-700">
                        Facility address
                      </label>

                      <div className="relative">
                        <MapPin
                          size={15}
                          className="absolute left-3.5 top-3.5 text-slate-400"
                        />

                        <textarea
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          placeholder="Complete facility address"
                          required
                          rows={3}
                          className="w-full resize-none rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-3 text-xs outline-none transition placeholder:text-slate-400 focus:border-[#0B6B50] focus:ring-4 focus:ring-emerald-500/10"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* =================================================
                    MONITORING
                ================================================== */}

                <div className="border-t border-slate-100 pt-6">
                  <div className="mb-4 flex items-center gap-2">
                    <Radio size={15} className="text-[#0B6B50]" />

                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Environmental monitoring
                    </h3>
                  </div>

                  <SelectField
                    label="Monitoring system"
                    name="monitoringSystem"
                    value={formData.monitoringSystem}
                    onChange={handleChange}
                    options={[
                      'CEMS',
                      'CEQMS',
                      'CEMS + CEQMS',
                      'Environmental IoT Sensors',
                      'Multiple monitoring systems',
                      'Not installed yet',
                    ]}
                  />

                  <div className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                    <div className="flex gap-3">
                      <Radio
                        size={17}
                        className="mt-0.5 shrink-0 text-[#0B6B50]"
                      />

                      <div>
                        <p className="text-xs font-semibold text-[#064E3B]">
                          Connect your monitoring devices later
                        </p>

                        <p className="mt-1 text-[10px] leading-5 text-emerald-800/60">
                          You can configure CEMS, CEQMS and other environmental
                          devices after completing registration.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* =================================================
                    CONFIRMATION
                ================================================== */}

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
                    I confirm that I am authorized to register this organization
                    and that the information provided is accurate.
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
                Your organization data is securely protected.
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

/* ============================================================
   ANALYTICS ICON
============================================================ */

function BarChartIcon({ size = 17, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 3v18h18" />
      <path d="M7 16v-5" />
      <path d="M11 16V7" />
      <path d="M15 16v-3" />
      <path d="M19 16V5" />
    </svg>
  );
}
