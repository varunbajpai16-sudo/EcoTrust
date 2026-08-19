import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronDown,
  Factory,
  FileCheck2,
  Globe2,
  Leaf,
  Lock,
  Mail,
  MapPin,
  Moon,
  Phone,
  Radio,
  ShieldCheck,
  Sun,
  User,
} from "lucide-react";

import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/Theme/Theme_slice";


/* =========================================================
   INDUSTRY REGISTRATION
========================================================= */

export default function IndustryRegistration() {

  const [formData, setFormData] = useState({
    companyName: "",
    industryType: "",
    registrationNumber: "",
    contactName: "",
    designation: "",
    email: "",
    phone: "",
    state: "",
    city: "",
    address: "",
    facilityType: "",
    monitoringSystem: "",
  });


  /* =======================================================
     THEME
  ======================================================= */

  const dispatch = useDispatch();

  const theme = useSelector(
    (state) => state.theme.theme
  );

  const isDark = theme === "dark";


  useEffect(() => {

    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

  }, [theme]);


  /* =======================================================
     INPUT
  ======================================================= */

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };


  /* =======================================================
     SUBMIT
  ======================================================= */

  const handleSubmit = (e) => {

    e.preventDefault();

    console.log(
      "Industry registration:",
      formData
    );

    // Send data to backend here
    // navigate("/industry/dashboard");

  };


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


      {/* =================================================
          HEADER
      ================================================= */}

      <header
        className="
          sticky
          top-0
          z-30
          border-b
          border-slate-200
          bg-white/90
          backdrop-blur-xl
          transition-colors duration-300

          dark:border-white/10
          dark:bg-[#071A15]/90
        "
      >

        <div
          className="
            mx-auto
            flex
            h-[72px]
            max-w-[1300px]
            items-center
            justify-between
            px-5

            lg:px-8
          "
        >


          {/* =================================================
              LOGO
          ================================================= */}

          <div className="flex items-center gap-2.5">

            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-[#0B6B50]
                text-white
                shadow-sm
              "
            >
              <Leaf size={22} />
            </div>


            <div>

              <span
                className="
                  text-[21px]
                  font-bold
                  tracking-tight
                  text-[#0F172A]

                  dark:text-white
                "
              >
                Eco
                <span className="text-[#0B6B50] dark:text-emerald-400">
                  Trust
                </span>
              </span>


              <p
                className="
                  hidden
                  text-[7px]
                  tracking-[0.18em]
                  text-slate-400

                  sm:block

                  dark:text-white/25
                "
              >
                ENVIRONMENTAL INTELLIGENCE
              </p>

            </div>

          </div>


          {/* =================================================
              RIGHT
          ================================================= */}

          <div className="flex items-center gap-3">


            {/* Industry badge */}

            <div
              className="
                hidden
                items-center
                gap-2
                rounded-full
                border
                border-emerald-100
                bg-emerald-50
                px-3.5
                py-2

                sm:flex

                dark:border-emerald-500/20
                dark:bg-emerald-500/10
              "
            >

              <Factory
                size={14}
                className="
                  text-[#0B6B50]

                  dark:text-emerald-400
                "
              />

              <span
                className="
                  text-[10px]
                  font-semibold
                  text-[#064E3B]

                  dark:text-emerald-300
                "
              >
                INDUSTRY USER
              </span>

            </div>


            {/* Theme */}

            <button
              type="button"
              onClick={() =>
                dispatch(toggleTheme())
              }
              aria-label={
                isDark
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-lg
                border
                border-slate-200
                bg-white
                text-slate-500
                transition

                hover:bg-emerald-50
                hover:text-[#0B6B50]

                dark:border-white/10
                dark:bg-white/[0.04]
                dark:text-white/50
                dark:hover:bg-white/[0.08]
                dark:hover:text-emerald-400
              "
            >

              {isDark ? (
                <Sun size={17} />
              ) : (
                <Moon size={17} />
              )}

            </button>

          </div>

        </div>

      </header>


      {/* =================================================
          MAIN
      ================================================= */}

      <main
        className="
          relative
          min-h-[calc(100vh-72px)]
          overflow-hidden
        "
      >


        {/* =================================================
            BACKGROUND DECORATIONS
        ================================================= */}

        <div
          className="
            pointer-events-none
            absolute
            left-[-250px]
            top-[100px]
            h-[500px]
            w-[500px]
            rounded-full
            bg-emerald-100/40
            blur-3xl

            dark:bg-emerald-900/10
          "
        />


        <div
          className="
            pointer-events-none
            absolute
            bottom-[-250px]
            right-[-150px]
            h-[550px]
            w-[550px]
            rounded-full
            bg-green-100/40
            blur-3xl

            dark:bg-emerald-900/10
          "
        />


        {/* Grid */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-[0.025]

            dark:opacity-[0.04]
          "
          style={{
            backgroundImage:
              "linear-gradient(#0B6B50 1px, transparent 1px), linear-gradient(90deg, #0B6B50 1px, transparent 1px)",
            backgroundSize:
              "50px 50px",
          }}
        />


        <div
          className="
            relative
            mx-auto
            max-w-[1300px]
            px-5
            py-10

            lg:px-8
            lg:py-14
          "
        >


          {/* =================================================
              GRID
          ================================================= */}

          <div
            className="
              grid
              gap-10

              lg:grid-cols-[.8fr_1.2fr]
              lg:items-start
            "
          >


            {/* =================================================
                LEFT INFORMATION
            ================================================= */}

            <div className="lg:sticky lg:top-28">


              {/* Badge */}

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-emerald-100
                  bg-emerald-50
                  px-4
                  py-2
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-wider
                  text-[#0B6B50]

                  dark:border-emerald-500/20
                  dark:bg-emerald-500/10
                  dark:text-emerald-400
                "
              >

                <Factory size={14} />

                Industry Portal

              </div>


              {/* Heading */}

              <h1
                className="
                  mt-6
                  text-3xl
                  font-bold
                  leading-tight
                  tracking-tight
                  text-[#0F172A]

                  dark:text-white

                  sm:text-4xl
                "
              >

                Connect your industry to{" "}

                <span className="text-[#0B6B50] dark:text-emerald-400">
                  EcoTrust
                </span>

              </h1>


              {/* Description */}

              <p
                className="
                  mt-5
                  max-w-[500px]
                  text-sm
                  leading-7
                  text-slate-500

                  dark:text-white/40
                "
              >
                Create your industry profile to monitor
                environmental performance, connect
                monitoring devices, track compliance
                and manage your facilities from one platform.
              </p>


              {/* =================================================
                  BENEFITS
              ================================================= */}

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


              {/* =================================================
                  INFO CARD
              ================================================= */}

              <div
                className="
                  mt-9
                  rounded-2xl
                  bg-[#052E24]
                  p-5
                  text-white
                  shadow-lg
                  shadow-emerald-950/10
                "
              >

                <div className="flex items-center gap-3">

                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-[#0B6B50]
                    "
                  >
                    <ShieldCheck size={18} />
                  </div>


                  <div>

                    <p className="text-xs font-bold">
                      Secure industry onboarding
                    </p>

                    <p className="mt-1 text-[9px] leading-4 text-white/40">
                      Your organization information is securely
                      stored and used to configure your EcoTrust workspace.
                    </p>

                  </div>

                </div>


                {/* Mini stats */}

                <div className="mt-5 grid grid-cols-3 gap-2">

                  <div className="rounded-lg bg-white/[0.05] p-2.5">

                    <Radio
                      size={13}
                      className="text-emerald-300"
                    />

                    <p className="mt-1 text-[8px] text-white/40">
                      Live data
                    </p>

                  </div>


                  <div className="rounded-lg bg-white/[0.05] p-2.5">

                    <ShieldCheck
                      size={13}
                      className="text-emerald-300"
                    />

                    <p className="mt-1 text-[8px] text-white/40">
                      Compliance
                    </p>

                  </div>


                  <div className="rounded-lg bg-white/[0.05] p-2.5">

                    <Lock
                      size={13}
                      className="text-emerald-300"
                    />

                    <p className="mt-1 text-[8px] text-white/40">
                      Protected
                    </p>

                  </div>

                </div>

              </div>

            </div>


            {/* =================================================
                FORM CARD
            ================================================= */}

            <div
              className="
                rounded-3xl
                border
                border-slate-200
                bg-white
                p-6
                shadow-[0_20px_70px_rgba(6,78,59,0.07)]
                transition-colors

                dark:border-white/10
                dark:bg-white/[0.03]
                dark:shadow-none

                sm:p-8
                lg:p-10
              "
            >


              {/* =================================================
                  FORM HEADER
              ================================================= */}

              <div
                className="
                  flex
                  items-start
                  justify-between
                  gap-5
                "
              >

                <div>

                  <p
                    className="
                      text-xs
                      font-bold
                      uppercase
                      tracking-[0.15em]
                      text-[#0B6B50]

                      dark:text-emerald-400
                    "
                  >
                    Step 1 of 2
                  </p>


                  <h2
                    className="
                      mt-2
                      text-2xl
                      font-bold
                      tracking-tight
                      text-[#0F172A]

                      dark:text-white
                    "
                  >
                    Industry information
                  </h2>


                  <p
                    className="
                      mt-2
                      text-xs
                      leading-5
                      text-slate-500

                      dark:text-white/35
                    "
                  >
                    Tell us about your organization
                    and facility.
                  </p>

                </div>


                <div
                  className="
                    hidden
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    bg-emerald-50
                    text-[#0B6B50]

                    dark:bg-emerald-500/10
                    dark:text-emerald-400

                    sm:flex
                  "
                >
                  <Building2 size={21} />
                </div>

              </div>


              {/* =================================================
                  PROGRESS
              ================================================= */}

              <div className="mt-7">

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    text-[9px]
                    font-semibold
                  "
                >

                  <span
                    className="
                      text-[#0B6B50]

                      dark:text-emerald-400
                    "
                  >
                    Organization details
                  </span>


                  <span className="text-slate-400 dark:text-white/25">
                    Verification
                  </span>

                </div>


                <div
                  className="
                    mt-2
                    h-1.5
                    rounded-full
                    bg-slate-100

                    dark:bg-white/10
                  "
                >

                  <div
                    className="
                      h-full
                      w-1/2
                      rounded-full
                      bg-[#0B6B50]
                    "
                  />

                </div>

              </div>


              {/* =================================================
                  FORM
              ================================================= */}

              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-6"
              >


                {/* =================================================
                    ORGANIZATION
                ================================================= */}

                <div>

                  <SectionTitle
                    icon={Building2}
                    title="Organization details"
                  />


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
                        "Manufacturing",
                        "Power & Energy",
                        "Cement",
                        "Steel",
                        "Chemical",
                        "Pharmaceutical",
                        "Textile",
                        "Mining",
                        "Oil & Gas",
                        "Other",
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
                        "Manufacturing Plant",
                        "Power Plant",
                        "Processing Facility",
                        "Industrial Unit",
                        "Mining Facility",
                        "Treatment Plant",
                        "Other",
                      ]}
                    />

                  </div>

                </div>


                {/* =================================================
                    CONTACT
                ================================================= */}

                <div
                  className="
                    border-t
                    border-slate-100
                    pt-6

                    dark:border-white/[0.07]
                  "
                >

                  <SectionTitle
                    icon={User}
                    title="Authorized contact"
                  />


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
                ================================================= */}

                <div
                  className="
                    border-t
                    border-slate-100
                    pt-6

                    dark:border-white/[0.07]
                  "
                >

                  <SectionTitle
                    icon={MapPin}
                    title="Facility location"
                  />


                  <div className="grid gap-4 sm:grid-cols-2">

                    <SelectField
                      label="State / UT"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      options={[
                        "Uttar Pradesh",
                        "Delhi",
                        "Maharashtra",
                        "Gujarat",
                        "Rajasthan",
                        "Karnataka",
                        "Tamil Nadu",
                        "Madhya Pradesh",
                        "West Bengal",
                        "Other",
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

                      <label
                        className="
                          mb-2
                          block
                          text-[10px]
                          font-semibold
                          text-slate-700

                          dark:text-white/60
                        "
                      >
                        Facility address
                      </label>


                      <div className="relative">

                        <MapPin
                          size={15}
                          className="
                            absolute
                            left-3.5
                            top-3.5
                            text-slate-400

                            dark:text-white/25
                          "
                        />


                        <textarea
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          placeholder="Complete facility address"
                          required
                          rows={3}
                          className="
                            w-full
                            resize-none
                            rounded-xl
                            border
                            border-slate-200
                            bg-white
                            py-3
                            pl-10
                            pr-3
                            text-xs
                            text-slate-700
                            outline-none
                            transition

                            placeholder:text-slate-400

                            focus:border-[#0B6B50]
                            focus:ring-4
                            focus:ring-emerald-500/10

                            dark:border-white/10
                            dark:bg-white/[0.04]
                            dark:text-white
                            dark:placeholder:text-white/20

                            dark:focus:border-emerald-500/60
                          "
                        />

                      </div>

                    </div>

                  </div>

                </div>


                {/* =================================================
                    MONITORING
                ================================================= */}

                <div
                  className="
                    border-t
                    border-slate-100
                    pt-6

                    dark:border-white/[0.07]
                  "
                >

                  <SectionTitle
                    icon={Radio}
                    title="Environmental monitoring"
                  />


                  <SelectField
                    label="Monitoring system"
                    name="monitoringSystem"
                    value={formData.monitoringSystem}
                    onChange={handleChange}
                    options={[
                      "CEMS",
                      "CEQMS",
                      "CEMS + CEQMS",
                      "Environmental IoT Sensors",
                      "Multiple monitoring systems",
                      "Not installed yet",
                    ]}
                  />


                  {/* Device connection card */}

                  <div
                    className="
                      mt-4
                      rounded-xl
                      border
                      border-emerald-100
                      bg-emerald-50
                      p-4

                      dark:border-emerald-500/20
                      dark:bg-emerald-500/10
                    "
                  >

                    <div className="flex gap-3">

                      <Radio
                        size={17}
                        className="
                          mt-0.5
                          shrink-0
                          text-[#0B6B50]

                          dark:text-emerald-400
                        "
                      />


                      <div>

                        <p
                          className="
                            text-xs
                            font-semibold
                            text-[#064E3B]

                            dark:text-emerald-300
                          "
                        >
                          Connect your monitoring devices later
                        </p>


                        <p
                          className="
                            mt-1
                            text-[10px]
                            leading-5
                            text-emerald-800/60

                            dark:text-emerald-200/40
                          "
                        >
                          You can configure CEMS, CEQMS and
                          other environmental devices after
                          completing registration.
                        </p>

                      </div>

                    </div>

                  </div>

                </div>


                {/* =================================================
                    CONFIRMATION
                ================================================= */}

                <div className="flex items-start gap-2">

                  <input
                    id="terms"
                    type="checkbox"
                    required
                    className="
                      mt-0.5
                      h-4
                      w-4
                      rounded
                      border-slate-300
                      accent-[#0B6B50]
                    "
                  />


                  <label
                    htmlFor="terms"
                    className="
                      text-[10px]
                      leading-4
                      text-slate-500

                      dark:text-white/35
                    "
                  >
                    I confirm that I am authorized to register
                    this organization and that the information
                    provided is accurate.
                  </label>

                </div>


                {/* =================================================
                    SUBMIT
                ================================================= */}

                <button
                  type="submit"
                  className="
                    group
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-[#0B6B50]
                    py-3.5
                    text-sm
                    font-semibold
                    text-white
                    shadow-lg
                    shadow-emerald-900/10
                    transition

                    hover:bg-[#064E3B]
                    hover:shadow-xl
                  "
                >

                  Continue to verification

                  <ArrowRight
                    size={16}
                    className="
                      transition
                      group-hover:translate-x-1
                    "
                  />

                </button>

              </form>


              {/* =================================================
                  FOOTER
              ================================================= */}

              <div
                className="
                  mt-7
                  flex
                  items-center
                  justify-center
                  gap-2
                  text-[9px]
                  text-slate-400

                  dark:text-white/25
                "
              >

                <ShieldCheck size={13} />

                Your organization data is securely protected.

              </div>

            </div>

          </div>


          {/* =================================================
              BOTTOM TRUST
          ================================================= */}

          <div
            className="
              mx-auto
              mt-12
              flex
              max-w-[700px]
              flex-wrap
              items-center
              justify-center
              gap-6
              border-t
              border-slate-200
              pt-6

              dark:border-white/10
            "
          >

            <div
              className="
                flex
                items-center
                gap-2
                text-[9px]
                text-slate-400

                dark:text-white/25
              "
            >
              <Radio size={13} />
              Real-time monitoring
            </div>


            <div
              className="
                hidden
                h-3
                w-px
                bg-slate-200

                dark:bg-white/10

                sm:block
              "
            />


            <div
              className="
                flex
                items-center
                gap-2
                text-[9px]
                text-slate-400

                dark:text-white/25
              "
            >
              <ShieldCheck size={13} />
              Compliance ready
            </div>


            <div
              className="
                hidden
                h-3
                w-px
                bg-slate-200

                dark:bg-white/10

                sm:block
              "
            />


            <div
              className="
                flex
                items-center
                gap-2
                text-[9px]
                text-slate-400

                dark:text-white/25
              "
            >
              <Leaf size={13} />
              EcoTrust
            </div>

          </div>

        </div>

      </main>

    </div>
  );
}


/* ============================================================
   SECTION TITLE
============================================================ */

function SectionTitle({
  icon: Icon,
  title,
}) {

  return (

    <div className="mb-4 flex items-center gap-2">

      <Icon
        size={15}
        className="
          text-[#0B6B50]

          dark:text-emerald-400
        "
      />

      <h3
        className="
          text-xs
          font-bold
          uppercase
          tracking-wider
          text-slate-700

          dark:text-white/65
        "
      >
        {title}
      </h3>

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
  type = "text",
  icon: Icon,
}) {

  return (

    <div>

      <label
        className="
          mb-2
          block
          text-[10px]
          font-semibold
          text-slate-700

          dark:text-white/60
        "
      >
        {label}
      </label>


      <div className="relative">

        <Icon
          size={15}
          className="
            absolute
            left-3.5
            top-1/2
            -translate-y-1/2
            text-slate-400

            dark:text-white/25
          "
        />


        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
          className="
            w-full
            rounded-xl
            border
            border-slate-200
            bg-white
            py-3
            pl-10
            pr-3
            text-xs
            text-slate-700
            outline-none
            transition

            placeholder:text-slate-400

            focus:border-[#0B6B50]
            focus:ring-4
            focus:ring-emerald-500/10

            dark:border-white/10
            dark:bg-white/[0.04]
            dark:text-white
            dark:placeholder:text-white/20

            dark:focus:border-emerald-500/60
            dark:focus:ring-emerald-500/10
          "
        />

      </div>

    </div>
  );
}


/* ============================================================
   SELECT FIELD
============================================================ */

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
}) {

  return (

    <div>

      <label
        className="
          mb-2
          block
          text-[10px]
          font-semibold
          text-slate-700

          dark:text-white/60
        "
      >
        {label}
      </label>


      <div className="relative">

        <select
          name={name}
          value={value}
          onChange={onChange}
          required
          className="
            w-full
            appearance-none
            rounded-xl
            border
            border-slate-200
            bg-white
            px-3
            py-3
            pr-9
            text-xs
            text-slate-600
            outline-none
            transition

            focus:border-[#0B6B50]
            focus:ring-4
            focus:ring-emerald-500/10

            dark:border-white/10
            dark:bg-[#0B211A]
            dark:text-white/65

            dark:focus:border-emerald-500/60
          "
        >

          <option
            value=""
            className="dark:bg-[#0B211A]"
          >
            Select {label.toLowerCase()}
          </option>


          {options.map((option) => (

            <option
              key={option}
              value={option}
              className="dark:bg-[#0B211A]"
            >
              {option}
            </option>

          ))}

        </select>


        <ChevronDown
          size={15}
          className="
            pointer-events-none
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            text-slate-400

            dark:text-white/30
          "
        />

      </div>

    </div>
  );
}


/* ============================================================
   BENEFIT
============================================================ */

function Benefit({
  icon: Icon,
  title,
  text,
}) {

  return (

    <div className="flex gap-3">

      <div
        className="
          flex
          h-9
          w-9
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-emerald-50
          text-[#0B6B50]

          dark:bg-emerald-500/10
          dark:text-emerald-400
        "
      >

        <Icon size={17} />

      </div>


      <div>

        <h3
          className="
            text-xs
            font-bold
            text-[#0F172A]

            dark:text-white/75
          "
        >
          {title}
        </h3>


        <p
          className="
            mt-1
            text-[10px]
            leading-5
            text-slate-500

            dark:text-white/30
          "
        >
          {text}
        </p>

      </div>

    </div>
  );
}


/* ============================================================
   ANALYTICS ICON
============================================================ */

function BarChartIcon({
  size = 17,
  className = "",
}) {

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