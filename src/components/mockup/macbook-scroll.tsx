import React, { useRef } from "react";
import {
  useScroll,
  useTransform,
  motion,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

/**
 * Fully coded MacBook (lid + keyboard base) that CLOSES as you scroll.
 * The section is pinned (sticky) so the closing plays in place.
 *
 * Implementation notes:
 * - Only transform-based motion values are used (rotateX / scale / y). Opacity
 *   driven by scroll proved unreliable in this setup, so the screen is hidden
 *   purely via the 3D fold + `backface-visibility` (the aluminium back shows
 *   once the lid passes vertical).
 * - As the lid folds onto its bottom hinge the assembly visually collapses
 *   downward; we lift it with a percentage-based `y` so the closing laptop
 *   stays framed on any screen size.
 */
export function MacbookScroll({
  titleComponent,
  chips,
  children,
}: {
  titleComponent: React.ReactNode;
  chips?: React.ReactNode;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Close finishes by ~0.33 — before sticky releases (mobile ~0.37 / desktop 0.5).
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.1, 0.33],
    reduce ? [0, 0, 0] : [0, 0, 94]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.33, 0.5],
    reduce ? [1, 1, 1] : [1, 0.97, 0.95]
  );
  const lift = useTransform(
    scrollYProgress,
    [0, 0.33],
    reduce ? ["0%", "0%"] : ["0%", "-34%"]
  );
  const titleY = useTransform(
    scrollYProgress,
    [0, 0.5],
    reduce ? [0, 0] : [0, -30]
  );
  const chipsScale = useTransform(
    scrollYProgress,
    [0.04, 0.26],
    reduce ? [1, 1] : [1, 0]
  );

  return (
    <div ref={ref} className="relative h-[170vh] md:h-[190vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-4">
        <motion.div
          style={{ y: titleY }}
          className="relative z-30 w-full max-w-4xl"
        >
          {titleComponent}
        </motion.div>

        <motion.div
          style={{ scale, y: lift }}
          className="relative z-10 mt-2 w-full max-w-2xl [perspective:1600px] md:mt-5"
        >
          <Lid rotate={rotate}>{children}</Lid>
          <Base />
        </motion.div>

        {chips && (
          <motion.div
            style={{ scale: chipsScale }}
            className="pointer-events-none absolute inset-0 origin-center"
          >
            {chips}
          </motion.div>
        )}
      </div>
    </div>
  );
}

function Lid({
  rotate,
  children,
}: {
  rotate: MotionValue<number>;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        transformOrigin: "bottom center",
        transformStyle: "preserve-3d",
      }}
      className="relative z-20 mx-auto aspect-[16/10] w-full will-change-transform"
    >
      {/* screen glow bleeding around the lid */}
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-[32px] bg-[radial-gradient(ellipse_at_center,hsl(244_84%_60%/0.45),transparent_65%)] blur-2xl"
      />

      {/* FRONT — the screen */}
      <div
        className="absolute inset-0 rounded-[20px] border border-white/12 bg-[#0a0c18] p-[6px] shadow-2xl shadow-black/70 md:rounded-[24px] md:p-2"
        style={{ backfaceVisibility: "hidden" }}
      >
        <span className="absolute left-1/2 top-[3px] z-10 h-1 w-1 -translate-x-1/2 rounded-full bg-white/25" />
        <div className="h-full w-full overflow-hidden rounded-[14px] bg-[#070a16] md:rounded-[18px]">
          {children}
        </div>
      </div>

      {/* BACK — aluminium shell (visible once the lid passes vertical) */}
      <div
        className="absolute inset-0 flex items-center justify-center rounded-[20px] bg-gradient-to-b from-[#262a37] to-[#0f111a] md:rounded-[24px]"
        style={{ transform: "rotateX(180deg)", backfaceVisibility: "hidden" }}
      >
        <div className="flex flex-col items-center gap-2 opacity-70">
          <span className="grid h-12 w-12 place-content-center rounded-2xl bg-gradient-to-br from-primary to-accent text-base font-bold text-white shadow-lg shadow-primary/30">
            M
          </span>
          <span className="font-display text-xs font-semibold tracking-widest text-white/50">
            MIRWEB
          </span>
        </div>
        <div className="pointer-events-none absolute inset-x-10 top-6 h-px bg-white/10" />
      </div>
    </motion.div>
  );
}

function Base() {
  const rows = [13, 13, 12, 11, 8];
  return (
    <div className="relative z-10 mx-auto -mt-px w-full">
      <div className="mx-auto h-2 w-[99%] rounded-b-[4px] bg-gradient-to-b from-[#2a2e3b] to-[#13151d]" />
      <div className="relative mx-auto h-20 w-full overflow-hidden rounded-b-[18px] bg-gradient-to-b from-[#191c26] to-[#0c0e15] shadow-2xl shadow-black/60 md:h-28 md:rounded-b-[22px]">
        <div className="absolute inset-x-[12%] top-1.5 flex justify-between">
          <span className="h-1 w-[20%] rounded-full bg-white/[0.04]" />
          <span className="h-1 w-[20%] rounded-full bg-white/[0.04]" />
        </div>
        <div className="absolute inset-x-[8%] top-4 flex flex-col gap-[3px] md:top-5 md:gap-1.5">
          {rows.map((count, r) => (
            <div key={r} className="flex justify-center gap-[3px] md:gap-1.5">
              {Array.from({ length: count }).map((_, k) => (
                <span
                  key={k}
                  className="h-1.5 flex-1 rounded-[2px] bg-white/[0.035] md:h-2.5"
                />
              ))}
            </div>
          ))}
        </div>
        <div className="absolute bottom-2 left-1/2 h-6 w-1/3 -translate-x-1/2 rounded-md bg-white/[0.03] ring-1 ring-white/[0.06] md:bottom-3 md:h-8" />
      </div>
      <div className="mx-auto h-1.5 w-[88%] rounded-b-2xl bg-gradient-to-b from-[#0e1017] to-[#06070d]" />
      <div className="mx-auto mt-3 h-6 w-[80%] rounded-[50%] bg-black/50 blur-xl" />
    </div>
  );
}
