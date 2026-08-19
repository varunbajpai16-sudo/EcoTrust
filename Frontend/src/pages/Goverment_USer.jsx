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
  Moon,
  Phone,
  ShieldCheck,
  Sun,
  User,
} from "lucide-react";

import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/Theme/Theme_slice";


/* =========================================================
   GOVERNMENT REGISTRATION
========================================================= */

export default function GovernmentRegistration() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    jurisdiction: "",
    state: "",
    employeeId: "",
  });

  const [submitted, setSubmitted] =
    useState(false);


  /* =======================================================
     THEME
  ======================================================= */

  const dispatch = useDispatch();

  const theme = useSelector(
    (state) => state.theme.theme
  );

  const isDark =
    theme === "dark";


  useEffect(() => {

    const root =
      document.documentElement;

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
      "Government registration:",
      formData
    );

    setSubmitted(true);

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


            {/* Government badge */}

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

              <ShieldCheck
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
                GOVERNMENT USER
              </span>

            </div>


            {/* Theme */}

            <button
              type="button"
              onClick={() =>
                dispatch(toggleTheme())
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
            BACKGROUND
        ================================================= */}

        <div
          className="
            pointer-events-none
            absolute
            left-[-250px]
            top-[80px]
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
              PAGE GRID
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

                <ShieldCheck size={14} />

                Government Portal

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

                Create your government

                <span className="text-[#0B6B50] dark:text-emerald-400">
                  {" "}EcoTrust account
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
                Register your official government profile
                to monitor environmental performance,
                industry compliance and environmental data
                across your jurisdiction.
              </p>


              {/* =================================================
                  BENEFITS
              ================================================= */}

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


              {/* =================================================
                  SECURITY CARD
              ================================================= */}

              <div
                className="
                  mt-9
                  overflow-hidden
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
                    <Lock size={18} />
                  </div>


                  <div>

                    <p className="text-xs font-bold">
                      Official account verification
                    </p>

                    <p className="mt-1 text-[9px] leading-4 text-white/40">
                      Government accounts may require verification
                      before dashboard access.
                    </p>

                  </div>

                </div>


                {/* Security indicators */}

                <div
                  className="
                    mt-5
                    grid
                    grid-cols-3
                    gap-2
                  "
                >

                  <div className="rounded-lg bg-white/[0.05] p-2.5">

                    <ShieldCheck
                      size={13}
                      className="text-emerald-300"
                    />

                    <p className="mt-1 text-[8px] text-white/40">
                      Verified
                    </p>

                  </div>


                  <div className="rounded-lg bg-white/[0.05] p-2.5">

                    <Lock
                      size={13}
                      className="text-emerald-300"
                    />

                    <p className="mt-1 text-[8px] text-white/40">
                      Secure
                    </p>

                  </div>


                  <div className="rounded-lg bg-white/[0.05] p-2.5">

                    <Globe2
                      size={13}
                      className="text-emerald-300"
                    />

                    <p className="mt-1 text-[8px] text-white/40">
                      Official
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
                    Official information
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
                    Enter your official government details
                    below.
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
                    Account information
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
                    PERSONAL
                ================================================= */}

                <div>

                  <div className="mb-4 flex items-center gap-2">

                    <User
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


                {/* =================================================
                    DEPARTMENT
                ================================================= */}

                <div
                  className="
                    border-t
                    border-slate-100
                    pt-6

                    dark:border-white/[0.07]
                  "
                >

                  <div className="mb-4 flex items-center gap-2">

                    <Building2
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
                        "Pollution Control Board",
                        "Ministry of Environment",
                        "State Environment Department",
                        "Municipal Corporation",
                        "District Administration",
                        "Other Government Organization",
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
                        "Uttar Pradesh",
                        "Delhi",
                        "Maharashtra",
                        "Karnataka",
                        "Gujarat",
                        "Rajasthan",
                        "Madhya Pradesh",
                        "Other",
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


                {/* =================================================
                    ACCESS
                ================================================= */}

                <div
                  className="
                    border-t
                    border-slate-100
                    pt-6

                    dark:border-white/[0.07]
                  "
                >

                  <div className="mb-4 flex items-center gap-2">

                    <Lock
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
                      Account access
                    </h3>

                  </div>


                  <div
                    className="
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

                      <CheckCircle2
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
                          Government verification required
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
                          Your official details may be reviewed
                          before government dashboard access is enabled.
                        </p>

                      </div>

                    </div>

                  </div>

                </div>


                {/* =================================================
                    TERMS
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
                    I confirm that the information provided
                    is accurate and that I am authorized to
                    create a government account.
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
                  SUCCESS
              ================================================= */}

              {submitted && (

                <div
                  className="
                    mt-5
                    rounded-xl
                    border
                    border-emerald-200
                    bg-emerald-50
                    p-4

                    dark:border-emerald-500/20
                    dark:bg-emerald-500/10
                  "
                >

                  <div className="flex gap-3">

                    <CheckCircle2
                      size={18}
                      className="
                        shrink-0
                        text-emerald-600

                        dark:text-emerald-400
                      "
                    />

                    <div>

                      <p
                        className="
                          text-xs
                          font-bold
                          text-emerald-700

                          dark:text-emerald-300
                        "
                      >
                        Registration submitted
                      </p>

                      <p
                        className="
                          mt-1
                          text-[10px]
                          leading-4
                          text-emerald-700/60

                          dark:text-emerald-300/40
                        "
                      >
                        Your government account details have
                        been submitted for verification.
                      </p>

                    </div>

                  </div>

                </div>

              )}


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

                Government accounts are securely verified.

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
              max-w-[650px]
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
              <ShieldCheck size={13} />
              Secure
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
              <Globe2 size={13} />
              Government network
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