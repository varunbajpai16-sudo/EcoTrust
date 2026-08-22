function EcoTrustLoader() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);

  const phases = [
    'Connecting environmental sensors',
    'Synchronizing real-time data',
    'Analyzing environmental signals',
    'Verifying compliance intelligence',
    'Preparing your EcoTrust workspace',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 42);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const phaseInterval = setInterval(() => {
      setPhase((prev) => (prev + 1) % phases.length);
    }, 850);

    return () => clearInterval(phaseInterval);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center overflow-hidden bg-[#031E17] font-[Inter,sans-serif]">

      {/* =========================================================
          BACKGROUND
      ========================================================= */}

      <div className="pointer-events-none absolute inset-0">

        {/* Main atmospheric glow */}
        <div className="absolute left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/[0.07] blur-[140px]" />

        <div className="absolute -left-[180px] -top-[180px] h-[500px] w-[500px] rounded-full bg-emerald-400/[0.06] blur-[130px]" />

        <div className="absolute -bottom-[220px] -right-[150px] h-[500px] w-[500px] rounded-full bg-teal-300/[0.05] blur-[130px]" />

        {/* Premium grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)
            `,
            backgroundSize: '55px 55px',
          }}
        />

        {/* Floating particles */}
        {[...Array(18)].map((_, i) => (
          <span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-emerald-300/30 animate-[floatParticle_5s_ease-in-out_infinite]"
            style={{
              left: `${5 + ((i * 17) % 90)}%`,
              top: `${8 + ((i * 29) % 84)}%`,
              animationDelay: `${i * 0.25}s`,
            }}
          />
        ))}
      </div>


      {/* =========================================================
          MAIN LOADER
      ========================================================= */}

      <div className="relative z-10 flex w-full max-w-[560px] flex-col items-center px-6">

        {/* Brand */}
        <div className="flex flex-col items-center">

          {/* Logo system */}
          <div className="relative">

            {/* Outer rotating ring */}
            <div className="absolute -inset-8 animate-[spin_10s_linear_infinite] rounded-full border border-dashed border-emerald-400/10" />

            {/* Second ring */}
            <div className="absolute -inset-5 rounded-full border border-emerald-400/[0.12] animate-[logoPulse_2.5s_ease-in-out_infinite]" />

            {/* Glow */}
            <div className="absolute -inset-10 rounded-full bg-emerald-400/[0.08] blur-2xl" />

            {/* Logo */}
            <div className="relative flex h-[82px] w-[82px] items-center justify-center rounded-[26px] border border-emerald-300/20 bg-gradient-to-br from-[#0F7A5B] to-[#07543F] shadow-[0_0_70px_rgba(52,211,153,0.15)]">

              <Leaf
                size={42}
                strokeWidth={1.7}
                className="text-emerald-100"
              />

              {/* Small live indicator */}
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,.9)]" />
            </div>
          </div>


          {/* Brand name */}
          <div className="mt-10 text-center">

            <h1 className="text-[34px] font-bold tracking-[-0.04em] text-white">
              Eco<span className="text-emerald-400">Trust</span>
            </h1>

            <div className="mt-2 flex items-center justify-center gap-2">
              <span className="h-px w-7 bg-emerald-400/20" />

              <p className="text-[9px] font-semibold uppercase tracking-[0.32em] text-emerald-300/50">
                Environmental Intelligence
              </p>

              <span className="h-px w-7 bg-emerald-400/20" />
            </div>
          </div>
        </div>


        {/* =========================================================
            DATA PIPELINE
        ========================================================= */}

        <div className="relative mt-16 w-full max-w-[470px]">

          {/* Pipeline line */}
          <div className="absolute left-[15%] right-[15%] top-[28px] h-px bg-white/[0.06]" />

          {/* Moving data beam */}
          <div className="absolute left-[15%] top-[28px] h-px w-[25%] overflow-hidden bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-[dataBeam_2.2s_linear_infinite]" />

          <div className="relative grid grid-cols-3">

            <PremiumLoaderNode
              icon={Zap}
              label="Sensors"
              sub="LIVE DATA"
              delay="0s"
            />

            <PremiumLoaderNode
              icon={ActivityIcon}
              label="Intelligence"
              sub="ANALYZING"
              active
              delay="0.35s"
            />

            <PremiumLoaderNode
              icon={ShieldCheck}
              label="Compliance"
              sub="VERIFYING"
              delay="0.7s"
            />

          </div>
        </div>


        {/* =========================================================
            STATUS
        ========================================================= */}

        <div className="mt-12 flex min-h-[30px] items-center justify-center gap-2">

          <span className="relative flex h-2 w-2">

            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />

            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>

          <p
            key={phase}
            className="animate-[statusFade_.5s_ease-out] text-[10px] font-medium tracking-wide text-white/45"
          >
            {phases[phase]}
          </p>

        </div>


        {/* =========================================================
            PROGRESS
        ========================================================= */}

        <div className="mt-7 w-full max-w-[350px]">

          <div className="mb-2 flex items-center justify-between">

            <span className="text-[8px] font-semibold uppercase tracking-[0.18em] text-white/20">
              Initializing platform
            </span>

            <span className="font-mono text-[9px] font-medium text-emerald-300/70">
              {progress.toString().padStart(3, '0')}%
            </span>

          </div>

          {/* Track */}
          <div className="relative h-[3px] overflow-hidden rounded-full bg-white/[0.06]">

            {/* Progress */}
            <div
              className="relative h-full rounded-full bg-gradient-to-r from-[#087A58] via-emerald-400 to-emerald-300 transition-all duration-75"
              style={{
                width: `${progress}%`,
              }}
            >
              {/* Moving shine */}
              <span className="absolute right-0 top-0 h-full w-16 bg-gradient-to-r from-transparent to-white/60 blur-[2px]" />
            </div>

          </div>

          <div className="mt-3 flex justify-between text-[7px] uppercase tracking-[0.15em] text-white/15">
            <span>Data</span>
            <span>Intelligence</span>
            <span>Trust</span>
          </div>

        </div>


        {/* Footer message */}
        <div className="mt-9 text-center">

          <p className="text-[8px] tracking-wide text-white/20">
            Real-time environmental intelligence
          </p>

          <div className="mt-2 flex items-center justify-center gap-1.5 text-[7px] uppercase tracking-[0.18em] text-emerald-300/20">
            <span>Monitor</span>
            <span>•</span>
            <span>Analyze</span>
            <span>•</span>
            <span>Protect</span>
          </div>

        </div>

      </div>


      {/* =========================================================
          ANIMATIONS
      ========================================================= */}

      <style>{`

        @keyframes dataBeam {
          0% {
            transform: translateX(-120%);
            opacity: 0;
          }

          15% {
            opacity: 1;
          }

          85% {
            opacity: 1;
          }

          100% {
            transform: translateX(480%);
            opacity: 0;
          }
        }

        @keyframes logoPulse {
          0%, 100% {
            transform: scale(1);
            opacity: .5;
          }

          50% {
            transform: scale(1.08);
            opacity: 1;
          }
        }

        @keyframes floatParticle {
          0%, 100% {
            transform: translate3d(0, 0, 0);
            opacity: .15;
          }

          50% {
            transform: translate3d(0, -22px, 0);
            opacity: .55;
          }
        }

        @keyframes statusFade {
          from {
            opacity: 0;
            transform: translateY(4px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

      `}</style>

    </div>
  );
}


function PremiumLoaderNode({
  icon: Icon,
  label,
  sub,
  active = false,
  delay,
}) {
  return (
    <div
      className="relative flex flex-col items-center"
      style={{
        animation: 'nodePulse 2.4s ease-in-out infinite',
        animationDelay: delay,
      }}
    >

      {/* Node */}
      <div
        className={`
          relative flex h-[56px] w-[56px] items-center justify-center
          rounded-2xl border
          transition-all duration-500
          ${
            active
              ? `
                border-emerald-400/30
                bg-gradient-to-br from-[#0D7455] to-[#084B3A]
                shadow-[0_0_35px_rgba(52,211,153,.13)]
              `
              : `
                border-white/[0.08]
                bg-white/[0.025]
              `
          }
        `}
      >

        {/* Active glow */}
        {active && (
          <div className="absolute -inset-2 rounded-2xl border border-emerald-400/10 animate-pulse" />
        )}

        <Icon
          size={20}
          strokeWidth={1.7}
          className={
            active
              ? 'text-emerald-300'
              : 'text-white/25'
          }
        />

        {/* Status dot */}
        <span
          className={`
            absolute -right-1 -top-1 h-2 w-2 rounded-full
            ${
              active
                ? 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,.8)]'
                : 'bg-white/10'
            }
          `}
        />

      </div>


      {/* Label */}
      <div className="mt-3 text-center">

        <p
          className={`
            text-[9px] font-semibold
            ${active ? 'text-emerald-300/80' : 'text-white/35'}
          `}
        >
          {label}
        </p>

        <p
          className={`
            mt-1 text-[6px] font-medium tracking-[0.18em]
            ${active ? 'text-emerald-300/30' : 'text-white/15'}
          `}
        >
          {sub}
        </p>

      </div>

    </div>
  );
}