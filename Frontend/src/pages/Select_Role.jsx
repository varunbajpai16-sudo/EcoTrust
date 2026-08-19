import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Factory,
  Leaf,
  Map,
  Moon,
  ShieldCheck,
  Sun,
  Users,
} from "lucide-react";

import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/Theme/Theme_slice";
import { useNavigate } from "react-router";


/* =========================================================
   ROLES
========================================================= */

const roles = [
  {
    id: "industry_user",

    title: "Industry User",

    subtitle:
      "Manage your environmental operations",

    description:
      "Monitor your facilities, environmental devices, emissions and compliance from one centralized platform.",

    icon: Factory,

    features: [
      "Monitor facility emissions",
      "Manage CEMS & CEQMS devices",
      "Track compliance status",
      "Generate environmental reports",
    ],
  },

  {
    id: "government_user",

    title: "Government User",

    subtitle:
      "Monitor environmental compliance",

    description:
      "Get a centralized view of industries, environmental performance, alerts and compliance across your jurisdiction.",

    icon: ShieldCheck,

    features: [
      "Monitor registered industries",
      "View regional environmental data",
      "Track compliance violations",
      "Analyze environmental trends",
    ],
  },
];


/* =========================================================
   SELECT ROLE
========================================================= */

export default function SelectRole() {
const navigate = useNavigate()
  const [selectedRole, setSelectedRole] =
    useState(null);


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
     CONTINUE
  ======================================================= */

  const handleContinue = () => {

    if (!selectedRole) return;

    console.log(
      "Selected role:",
      selectedRole
    );
    if(selectedRole == "government_user"){
      navigate("/GovernmentRegistration")
    }
    else {
       navigate("/IndustryRegistration")
    }
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
          border-slate-200/80
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
            max-w-[1200px]
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
              HEADER RIGHT
          ================================================= */}

          <div className="flex items-center gap-3">


            {/* Security */}

            <div
              className="
                hidden
                items-center
                gap-2
                text-[10px]
                font-medium
                text-slate-400

                sm:flex

                dark:text-white/30
              "
            >

              <ShieldCheck size={14} />

              Secure onboarding

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
            left-[-200px]
            top-[80px]
            h-[450px]
            w-[450px]
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
            bottom-[-200px]
            right-[-100px]
            h-[500px]
            w-[500px]
            rounded-full
            bg-green-100/40
            blur-3xl

            dark:bg-emerald-900/10
          "
        />


        {/* Decorative grid */}

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
            max-w-[1100px]
            px-5
            py-12

            sm:py-16
            lg:py-20
          "
        >


          {/* =================================================
              HEADING
          ================================================= */}

          <div
            className="
              mx-auto
              max-w-[650px]
              text-center
            "
          >

            {/* Icon */}

            <div
              className="
                mx-auto
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-emerald-50
                text-[#0B6B50]
                shadow-sm

                dark:bg-emerald-500/10
                dark:text-emerald-400
              "
            >
              <Users size={24} />
            </div>


            {/* Label */}

            <p
              className="
                mt-5
                text-[10px]
                font-bold
                uppercase
                tracking-[0.2em]
                text-[#0B6B50]

                dark:text-emerald-400
              "
            >
              Account Setup
            </p>


            {/* Heading */}

            <h1
              className="
                mt-3
                text-3xl
                font-bold
                tracking-tight
                text-[#0F172A]

                dark:text-white

                sm:text-4xl
              "
            >
              How will you use EcoTrust?
            </h1>


            {/* Description */}

            <p
              className="
                mx-auto
                mt-4
                max-w-[560px]
                text-sm
                leading-6
                text-slate-500

                dark:text-white/40

                sm:text-base
              "
            >
              Select your role to personalize your
              EcoTrust experience and give you access
              to the tools relevant to your work.
            </p>


            {/* Progress */}

            <div
              className="
                mx-auto
                mt-6
                flex
                max-w-[300px]
                items-center
                gap-2
              "
            >

              <div className="h-1.5 flex-1 rounded-full bg-[#0B6B50]" />

              <div
                className="
                  h-1.5
                  flex-1
                  rounded-full
                  bg-slate-200

                  dark:bg-white/10
                "
              />

              <div
                className="
                  h-1.5
                  flex-1
                  rounded-full
                  bg-slate-200

                  dark:bg-white/10
                "
              />

            </div>

            <p
              className="
                mt-2
                text-[9px]
                text-slate-400

                dark:text-white/25
              "
            >
              Step 1 of 3
            </p>

          </div>


          {/* =================================================
              ROLE CARDS
          ================================================= */}

          <div
            className="
              mx-auto
              mt-12
              grid
              max-w-[900px]
              gap-5

              md:grid-cols-2
            "
          >

            {roles.map((role) => {

              const Icon =
                role.icon;

              const isSelected =
                selectedRole ===
                role.id;


              return (

                <button
                  key={role.id}
                  type="button"
                  onClick={() =>
                    setSelectedRole(
                      role.id
                    )
                  }
                  className={`
                    group
                    relative
                    text-left
                    transition
                    duration-300

                    ${
                      isSelected
                        ? "scale-[1.01]"
                        : "hover:-translate-y-1"
                    }
                  `}
                >


                  {/* Outer border */}

                  <div
                    className={`
                      h-full
                      rounded-3xl
                      p-[1px]
                      transition

                      ${
                        isSelected

                          ? "border border-[#0B6B50] bg-[#0B6B50] shadow-xl shadow-emerald-900/10"

                          : "border border-slate-200 bg-transparent dark:border-white/10"
                      }
                    `}
                  >


                    {/* Card */}

                    <div
                      className="
                        relative
                        h-full
                        rounded-[23px]
                        bg-white
                        p-7
                        transition-colors

                        dark:bg-[#0B211A]

                        sm:p-8
                      "
                    >


                      {/* Selected check */}

                      {isSelected && (

                        <div
                          className="
                            absolute
                            right-6
                            top-6
                            flex
                            h-7
                            w-7
                            items-center
                            justify-center
                            rounded-full
                            bg-[#0B6B50]
                            text-white
                          "
                        >
                          <CheckCircle2
                            size={17}
                          />
                        </div>

                      )}


                      {/* Top accent */}

                      <div
                        className={`
                          absolute
                          left-7
                          top-0
                          h-1
                          w-12
                          rounded-b-full
                          transition

                          ${
                            isSelected
                              ? "bg-[#34D399]"
                              : "bg-transparent group-hover:bg-emerald-300"
                          }
                        `}
                      />


                      {/* Icon */}

                      <div
                        className={`
                          flex
                          h-14
                          w-14
                          items-center
                          justify-center
                          rounded-2xl
                          transition

                          ${
                            isSelected

                              ? "bg-[#0B6B50] text-white shadow-lg shadow-emerald-900/10"

                              : "bg-emerald-50 text-[#0B6B50] group-hover:bg-[#0B6B50] group-hover:text-white dark:bg-emerald-500/10 dark:text-emerald-400"
                          }
                        `}
                      >
                        <Icon size={26} />
                      </div>


                      {/* Title */}

                      <h2
                        className="
                          mt-7
                          text-xl
                          font-bold
                          text-[#0F172A]

                          dark:text-white
                        "
                      >
                        {role.title}
                      </h2>


                      {/* Subtitle */}

                      <p
                        className="
                          mt-1
                          text-sm
                          font-medium
                          text-[#0B6B50]

                          dark:text-emerald-400
                        "
                      >
                        {role.subtitle}
                      </p>


                      {/* Description */}

                      <p
                        className="
                          mt-4
                          text-sm
                          leading-6
                          text-slate-500

                          dark:text-white/40
                        "
                      >
                        {role.description}
                      </p>


                      {/* Features */}

                      <div
                        className="
                          mt-7
                          space-y-3
                          border-t
                          border-slate-100
                          pt-6

                          dark:border-white/[0.07]
                        "
                      >

                        {role.features.map(
                          (feature) => (

                            <div
                              key={feature}
                              className="flex items-center gap-3"
                            >

                              <div
                                className="
                                  flex
                                  h-5
                                  w-5
                                  shrink-0
                                  items-center
                                  justify-center
                                  rounded-full
                                  bg-emerald-50

                                  dark:bg-emerald-500/10
                                "
                              >

                                <CheckCircle2
                                  size={13}
                                  className="
                                    text-[#0B6B50]

                                    dark:text-emerald-400
                                  "
                                />

                              </div>


                              <span
                                className="
                                  text-xs
                                  font-medium
                                  text-slate-600

                                  dark:text-white/55
                                "
                              >
                                {feature}
                              </span>

                            </div>

                          )
                        )}

                      </div>


                      {/* Select indicator */}

                      <div
                        className={`
                          mt-7
                          flex
                          items-center
                          justify-between
                          rounded-xl
                          px-4
                          py-3
                          transition

                          ${
                            isSelected

                              ? "bg-emerald-50 dark:bg-emerald-500/10"

                              : "bg-slate-50 group-hover:bg-emerald-50 dark:bg-white/[0.03] dark:group-hover:bg-emerald-500/10"
                          }
                        `}
                      >

                        <span
                          className={`
                            text-xs
                            font-semibold

                            ${
                              isSelected

                                ? "text-[#0B6B50] dark:text-emerald-400"

                                : "text-slate-500 group-hover:text-[#0B6B50] dark:text-white/40 dark:group-hover:text-emerald-400"
                            }
                          `}
                        >
                          {isSelected
                            ? "Selected"
                            : "Select this role"}
                        </span>


                        <ArrowRight
                          size={15}
                          className={`
                            transition

                            ${
                              isSelected

                                ? "translate-x-1 text-[#0B6B50] dark:text-emerald-400"

                                : "text-slate-400 group-hover:translate-x-1 group-hover:text-[#0B6B50] dark:text-white/25 dark:group-hover:text-emerald-400"
                            }
                          `}
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
          ================================================= */}

          <div
            className="
              mx-auto
              mt-9
              max-w-[900px]
            "
          >

            <button
              onClick={handleContinue}
              disabled={!selectedRole}
              className={`
                group
                mx-auto
                flex
                w-full
                max-w-[500px]
                items-center
                justify-center
                gap-2
                rounded-xl
                py-3.5
                text-sm
                font-semibold
                transition

                ${
                  selectedRole

                    ? "bg-[#0B6B50] text-white shadow-lg shadow-emerald-900/10 hover:bg-[#064E3B] hover:shadow-xl"

                    : "cursor-not-allowed bg-slate-200 text-slate-400 dark:bg-white/10 dark:text-white/20"
                }
              `}
            >

              Continue

              <ArrowRight
                size={17}
                className={
                  selectedRole
                    ? "transition group-hover:translate-x-1"
                    : ""
                }
              />

            </button>


            <p
              className="
                mt-4
                text-center
                text-[10px]
                text-slate-400

                dark:text-white/25
              "
            >
              You can change your role later by
              contacting your organization administrator.
            </p>

          </div>


          {/* =================================================
              TRUST FEATURES
          ================================================= */}

          <div
            className="
              mx-auto
              mt-14
              flex
              max-w-[700px]
              flex-wrap
              items-center
              justify-center
              gap-5
              border-t
              border-slate-200
              pt-7

              dark:border-white/10

              sm:gap-7
            "
          >


            {/* Secure */}

            <div
              className="
                flex
                items-center
                gap-2
                text-[9px]
                text-slate-400

                dark:text-white/30
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


            {/* Location */}

            <div
              className="
                flex
                items-center
                gap-2
                text-[9px]
                text-slate-400

                dark:text-white/30
              "
            >
              <Map size={13} />
              Location aware
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


            {/* Environmental */}

            <div
              className="
                flex
                items-center
                gap-2
                text-[9px]
                text-slate-400

                dark:text-white/30
              "
            >
              <Leaf size={13} />
              Environmental intelligence
            </div>

          </div>


          {/* =================================================
              FOOTER
          ================================================= */}

          <div
            className="
              mt-8
              text-center
              text-[9px]
              text-slate-400

              dark:text-white/20
            "
          >
            © 2026 EcoTrust · Environmental Intelligence Platform
          </div>

        </div>

      </main>

    </div>
  );
}