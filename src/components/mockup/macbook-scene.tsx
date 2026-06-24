import { useEffect } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { MirWebDemoScreen } from "./mirweb-demo-screen";

/** Resting open angle of the lid (deg). Negative = leaned back / open. */
const OPEN = -12;
/** Slightly-more-upright angle the lid animates FROM on page load. */
const LOAD_START = 4;
/** How far the lid closes on scroll (deg) — clearly visible. */
const CLOSE_BY = 52;

/**
 * Parts-based 3D MacBook. Lid hinged at its bottom edge (rotateX), base folded
 * down so the keyboard reads from slightly above. Strong perspective so the
 * closing motion is clearly visible.
 */
export function MacbookScene({
  scrollProgress,
}: {
  scrollProgress: MotionValue<number>;
}) {
  const reduce = useReducedMotion();

  // Auto open on load (respects reduced-motion).
  const lidLoad = useMotionValue(reduce ? OPEN : LOAD_START);
  useEffect(() => {
    if (reduce) return;
    const controls = animate(lidLoad, OPEN, {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
  }, [reduce, lidLoad]);

  // Scroll-driven close — kept ON even for reduced-motion (it's user-driven),
  // and front-loaded so it reacts to the very first bit of scroll.
  const lidClose = useTransform(scrollProgress, [0, 0.28], [0, CLOSE_BY]);
  const lidRotate = useTransform(() => lidLoad.get() + lidClose.get());

  return (
    <div className="relative mx-auto w-full max-w-[820px] [perspective-origin:50%_22%] [perspective:1500px]">
      {/* blue / violet glow behind the device */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -z-10 h-[120%] w-[125%] -translate-x-1/2 -translate-y-[52%] rounded-[45%] bg-[radial-gradient(ellipse,rgba(120,120,255,0.55),rgba(150,90,255,0.25)_45%,transparent_66%)] blur-2xl"
      />

      <div
        className="relative"
        style={{
          transformStyle: "preserve-3d",
          WebkitBoxReflect:
            "below 4px linear-gradient(rgba(0,0,0,0.22), transparent 55%)",
        }}
      >
        {/* ===== LID / SCREEN ===== */}
        <motion.div
          style={{
            rotateX: lidRotate,
            transformOrigin: "50% 100%",
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
          className="relative z-20 mx-auto aspect-[16/10] w-full rounded-[16px] rounded-b-[6px] bg-gradient-to-b from-[#3a3b42] to-[#15161a] p-[6px] shadow-[0_40px_90px_-25px_rgba(0,0,0,0.7)] md:rounded-[22px] md:rounded-b-[7px] md:p-[8px]"
        >
          <div className="absolute inset-0 rounded-[16px] rounded-b-[6px] ring-1 ring-white/10 md:rounded-[22px]" />
          <span className="absolute left-1/2 top-[4px] z-10 h-1 w-1 -translate-x-1/2 rounded-full bg-white/25 md:top-[6px]" />
          <div className="relative h-full w-full overflow-hidden rounded-[11px] bg-black md:rounded-[15px]">
            <MirWebDemoScreen />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent"
            />
          </div>
        </motion.div>

        {/* ===== BASE / TOP CASE ===== */}
        <div
          style={{
            transform: "rotateX(56deg)",
            transformOrigin: "50% 0%",
            transformStyle: "preserve-3d",
          }}
          className="relative z-10 mx-auto h-[210px] w-full md:h-[240px]"
        >
          <TopCase />
        </div>

        {/* contact shadow */}
        <div
          aria-hidden
          className="absolute left-1/2 top-full mt-1 h-9 w-[72%] -translate-x-1/2 rounded-[50%] bg-black/55 blur-2xl"
        />
      </div>
    </div>
  );
}

/* Realistic MacBook key layout (per-row key widths). */
const FN_ROW = [1.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.2];
const NUM_ROW = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.9];
const QWE_ROW = [1.6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.3];
const ASD_ROW = [1.9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.9];
const ZXC_ROW = [2.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2.5];
const BTM_ROW = [1, 1, 1, 1.4, 6, 1.4, 1, 1];

function Row({
  weights,
  className,
}: {
  weights: number[];
  className?: string;
}) {
  return (
    <div className={cn("flex gap-[0.7%]", className)}>
      {weights.map((w, i) => (
        <span
          key={i}
          style={{ flexGrow: w, flexBasis: 0 }}
          className="rounded-[2px] bg-[#0c0c11] shadow-[inset_0_-1px_0_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.06)] md:rounded-[3px]"
        />
      ))}
    </div>
  );
}

const grille: React.CSSProperties = {
  backgroundImage:
    "radial-gradient(circle, rgba(0,0,0,0.55) 0.4px, transparent 0.9px)",
  backgroundSize: "3px 3px",
};

function TopCase() {
  return (
    <div className="absolute inset-0 rounded-b-[14px] bg-gradient-to-b from-[#43444b] via-[#2a2b31] to-[#141519] shadow-[inset_0_1px_0_rgba(255,255,255,0.10),inset_0_0_0_1px_rgba(0,0,0,0.45)] md:rounded-b-[18px]">
      {/* hinge shadow */}
      <div className="absolute inset-x-0 top-0 h-[8%] bg-gradient-to-b from-black/55 to-transparent" />

      {/* speaker grilles + keyboard */}
      <div className="absolute inset-x-[3%] top-[10%] flex h-[60%] gap-[2.5%]">
        <div className="w-[8%] rounded-[2px] opacity-60" style={grille} aria-hidden />
        <div className="flex flex-1 flex-col gap-[2.2%] py-[1%]">
          <Row weights={FN_ROW} className="h-[11%]" />
          <Row weights={NUM_ROW} className="flex-1" />
          <Row weights={QWE_ROW} className="flex-1" />
          <Row weights={ASD_ROW} className="flex-1" />
          <Row weights={ZXC_ROW} className="flex-1" />
          <Row weights={BTM_ROW} className="flex-1" />
        </div>
        <div className="w-[8%] rounded-[2px] opacity-60" style={grille} aria-hidden />
      </div>

      {/* trackpad */}
      <div className="absolute bottom-[10%] left-1/2 h-[22%] w-[40%] -translate-x-1/2 rounded-[7px] bg-gradient-to-b from-[#34353c] to-[#24252b] shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)] ring-1 ring-black/40" />

      {/* front lip + opening cutout */}
      <div className="absolute inset-x-0 bottom-0 h-[5%] rounded-b-[14px] bg-gradient-to-b from-[#24252b] to-[#0e0f13] md:rounded-b-[18px]" />
      <div className="absolute bottom-[1.5%] left-1/2 h-[2.5%] w-[12%] -translate-x-1/2 rounded-t-md bg-black/45" />
    </div>
  );
}
