import { useEffect, useState } from "react";
import {
  Activity,
  Leaf,
  Radio,
  ShieldCheck,
} from "lucide-react";

export default function EcoTrustLoader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }

        return prev + 1;
      });
    }, 25);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center overflow-hidden bg-[#052E24] font-[Inter,sans-serif]">

      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0">

        {/* Glow */}
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0B6B50]/20 blur-[120px]" />

        <div className="absolute left-[-150px] top-[-150px] h-[400px] w-[400px] rounded-full bg-emerald-400/10 blur-[100px]" />

        <div className="absolute bottom-[-200px] right-[-100px] h-[450px] w-[450px] rounded-full bg-emerald-300/10 blur-[120px]" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

      </div>

      {/* =====================================================
          LOADER CONTENT
      ====================================================== */}

      <div className="relative z-10 flex w-full max-w-[520px] flex-col items-center px-6">

        {/* Logo */}

        <div className="relative">

          {/* Outer pulse */}
          <div className="absolute -inset-5 animate-ping rounded-[28px] border border-emerald-400/10" />

          <div className="relative flex h-[76px] w-[76px] items-center justify-center rounded-[24px] bg-[#0B6B50] shadow-[0_0_60px_rgba(52,211,153,0.18)]">

            <Leaf
              size={39}
              strokeWidth={1.8}
              className="text-white"
            />

          </div>

        </div>

        {/* Brand */}

        <div className="mt-7 text-center">

          <h1 className="text-3xl font-bold tracking-tight text-white">
            Eco<span className="text-[#34D399]">
              Trust
            </span>
          </h1>

          <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.3em] text-emerald-300/50">
            Environmental Intelligence
          </p>

        </div>

        {/* =================================================
            SYSTEM VISUAL
        ================================================== */}

        <div className="relative mt-12 h-[130px] w-full max-w-[400px]">

          {/* Connection line */}

          <div className="absolute left-[12%] right-[12%] top-1/2 h-px bg-emerald-400/10" />

          {/* Animated line */}

          <div className="absolute left-[12%] top-1/2 h-px w-[30%] animate-[loaderLine_2s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-[#34D399] to-transparent" />

          {/* Nodes */}

          <LoaderNode
            icon={Radio}
            label="Sensors"
            position="left"
            delay="0s"
          />

          <LoaderNode
            icon={Activity}
            label="Analytics"
            position="center"
            delay="0.4s"
            active
          />

          <LoaderNode
            icon={ShieldCheck}
            label="Compliance"
            position="right"
            delay="0.8s"
          />

        </div>

        {/* =================================================
            STATUS
        ================================================== */}

        <div className="mt-4 flex items-center gap-2">

          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#34D399]" />

          <p className="text-[10px] font-medium tracking-wide text-white/40">
            Initializing environmental intelligence
          </p>

        </div>

        {/* Progress */}

        <div className="mt-7 w-full max-w-[320px]">

          <div className="flex items-center justify-between">

            <span className="text-[8px] font-medium uppercase tracking-wider text-white/25">
              Loading platform
            </span>

            <span className="font-mono text-[9px] text-emerald-300/70">
              {progress}%
            </span>

          </div>

          <div className="mt-2 h-[3px] overflow-hidden rounded-full bg-white/5">

            <div
              className="h-full rounded-full bg-gradient-to-r from-[#0B6B50] to-[#34D399] transition-all duration-75"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

        </div>

        {/* Bottom text */}

        <p className="mt-8 text-center text-[8px] text-white/20">
          Connecting monitoring systems • Preparing your workspace
        </p>

      </div>

      {/* =====================================================
          ANIMATION
      ====================================================== */}

      <style>{`
        @keyframes loaderLine {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }

          20% {
            opacity: 1;
          }

          80% {
            opacity: 1;
          }

          100% {
            transform: translateX(300%);
            opacity: 0;
          }
        }
      `}</style>

    </div>
  );
}


/* ============================================================
   LOADER NODE
============================================================ */

function LoaderNode({
  icon: Icon,
  label,
  position,
  delay,
  active = false,
}) {
  const positionClass =
    position === "left"
      ? "left-[7%]"
      : position === "right"
      ? "right-[7%]"
      : "left-1/2 -translate-x-1/2";

  return (
    <div
      className={`absolute top-1/2 -translate-y-1/2 ${positionClass}`}
      style={{
        animation: `nodePulse 2s ease-in-out infinite`,
        animationDelay: delay,
      }}
    >

      <div
        className={`relative flex h-12 w-12 items-center justify-center rounded-2xl border ${
          active
            ? "border-emerald-400/30 bg-[#0B6B50] shadow-[0_0_30px_rgba(52,211,153,0.15)]"
            : "border-white/10 bg-white/[0.03]"
        }`}
      >

        <Icon
          size={18}
          className={
            active
              ? "text-[#34D399]"
              : "text-white/30"
          }
        />

      </div>

      <p
        className={`absolute left-1/2 mt-3 -translate-x-1/2 whitespace-nowrap text-[8px] font-medium ${
          active
            ? "text-emerald-300/70"
            : "text-white/20"
        }`}
      >
        {label}
      </p>

    </div>
  );
}