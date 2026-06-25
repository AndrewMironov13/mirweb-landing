import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import {
  ArrowRight,
  Star,
  MapPin,
  Image as ImageIcon,
  Layers,
  Send,
  Phone,
} from "lucide-react";
import { useLeadModal } from "@/context/lead-modal";

/**
 * MirWebLaptopHero — scroll-driven cinematic product reveal.
 *
 * Closed device → lid opens (CSS 3D hinge) → MirWeb screen appears with glass
 * source-chips → camera zooms into the screen while chips are pulled in → the
 * screen becomes the full-viewport site. Driven entirely by scroll progress.
 *
 * Self-contained prototype: LaptopDevice, LaptopScreenUI, SourceChip,
 * HeroParticles and FullscreenWebsiteState all live in this file.
 */

const COLOR = {
  bg: "#05070D",
  text: "#F8FAFC",
  muted: "#94A3B8",
  cyan: "#38BDF8",
  blue: "#2563EB",
  violet: "#8B5CF6",
  violetSoft: "#A78BFA",
};

export function MirWebLaptopHero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  // Manual scroll progress (0→1 across the section) computed from layout — this
  // maps exactly to the sticky travel and avoids useScroll's vh/svh mapping
  // quirks in emulated viewports.
  const scrollYProgress = useMotionValue(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      const total = el.offsetHeight - window.innerHeight;
      const top = el.getBoundingClientRect().top;
      scrollYProgress.set(total > 0 ? Math.min(Math.max(-top / total, 0), 1) : 0);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [scrollYProgress]);

  // Smooth the raw scroll progress so the whole scene glides instead of
  // tracking jittery scroll deltas frame-for-frame.
  const progress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 26,
    mass: 0.6,
  });

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const f = () => setIsMobile(window.innerWidth <= 768);
    f();
    window.addEventListener("resize", f);
    return () => window.removeEventListener("resize", f);
  }, []);

  if (reduce) return <StaticHero />;

  return (
    <section ref={ref} className="relative" style={{ height: "340vh" }}>
      <div
        className="sticky top-0 h-[100svh] overflow-hidden"
        style={{ background: COLOR.bg }}
      >
        <Backdrop progress={progress} />
        <HeroParticles />
        <IntroText progress={progress} />
        <LaptopStage progress={progress} isMobile={isMobile} />
        <FullscreenWebsiteState progress={progress} />
        <ScrollHint progress={progress} />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Backdrop — dark base + blue/violet glow that intensifies on open    */
/* ------------------------------------------------------------------ */
function Backdrop({ progress }: { progress: MotionValue<number> }) {
  const glow = useTransform(progress, [0.12, 0.42], [0.25, 1]);
  const fade = useTransform(progress, [0.82, 0.92], [1, 0]);
  return (
    <motion.div aria-hidden className="absolute inset-0" style={{ opacity: fade }}>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 100% at 50% 6%, #0b1130 0%, #070a18 52%, #05070d 100%)",
        }}
      />
      <motion.div
        className="absolute left-1/2 top-[42%] h-[80vh] w-[78vw] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[40px]"
        style={{
          opacity: glow,
          background:
            "radial-gradient(closest-side, rgba(37,99,235,0.32), rgba(139,92,246,0.16) 46%, transparent 72%)",
        }}
      />
      <div
        className="absolute left-[16%] top-[58%] h-[42vh] w-[36vw] -translate-y-1/2 rounded-full blur-[30px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(56,189,248,0.18), transparent 70%)",
        }}
      />
      {/* soft horizontal blue/violet light line behind the device */}
      <div
        className="absolute left-1/2 top-[62%] h-[3px] w-[58%] -translate-x-1/2 rounded-full blur-[3px]"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(139,92,246,0.55) 28%, rgba(56,189,248,0.7) 58%, transparent)",
        }}
      />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* HeroParticles — light drifting dust on canvas                       */
/* ------------------------------------------------------------------ */
function HeroParticles() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const palette = ["#38BDF8", "#8B5CF6", "#A78BFA", "#2563EB"];
    const N = window.innerWidth <= 768 ? 26 : 48;
    const dots = Array.from({ length: N }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.4 + 0.4,
      s: Math.random() * 0.00018 + 0.00004,
      a: Math.random() * 0.4 + 0.1,
      c: palette[(Math.random() * palette.length) | 0],
    }));

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        d.y -= d.s;
        if (d.y < -0.02) {
          d.y = 1.02;
          d.x = Math.random();
        }
        ctx.globalAlpha = d.a;
        ctx.fillStyle = d.c;
        ctx.beginPath();
        ctx.arc(d.x * w, d.y * h, d.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}

/* ------------------------------------------------------------------ */
/* IntroText — brand line, fades as the lid starts to open             */
/* ------------------------------------------------------------------ */
function IntroText({ progress }: { progress: MotionValue<number> }) {
  // NB: 2-stop opacity only — 3+ stop opacity MotionValues can stick in Framer.
  const opacity = useTransform(progress, [0.06, 0.17], [1, 0]);
  const y = useTransform(progress, [0, 0.17], [0, -28]);
  return (
    <motion.div
      style={{ opacity, y }}
      className="pointer-events-none absolute inset-x-0 top-[16%] z-30 flex flex-col items-center px-6 text-center"
    >
      <span
        className="font-display text-sm font-semibold uppercase tracking-[0.4em]"
        style={{ color: COLOR.cyan }}
      >
        MirWeb
      </span>
      <h2
        className="mt-4 max-w-2xl font-display text-2xl font-bold leading-tight tracking-tight md:text-4xl"
        style={{ color: COLOR.text }}
      >
        Покажем, как выглядит сайт вашего бизнеса
      </h2>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* LaptopStage — the 3D device + chips, scaled/zoomed by scroll        */
/* ------------------------------------------------------------------ */
function LaptopStage({
  progress,
  isMobile,
}: {
  progress: MotionValue<number>;
  isMobile: boolean;
}) {
  // Phases are packed into 0–0.78 and the final site state is HELD over 0.78–1.0,
  // so the full reveal always completes before the sticky section releases
  // (robust against vh/svh scroll-mapping differences, esp. on mobile).
  // ONE laptop: lid closed (≈ −94° = folded FORWARD onto the keyboard, screen
  // facing down, aluminium up) through phase 1, then the front edge lifts up
  // around the rear hinge to open. Negative angle = folds forward (correct
  // direction); positive folded backward behind the hinge (the earlier bug).
  const lidRotate = useTransform(progress, [0, 0.16, 0.46], [-94, -94, -4]);
  const baseOpacity = useTransform(progress, [0.18, 0.34], [0, 1]);
  // Whole device: small/closed → settle at 1 → slight approach → zoom into screen.
  const scaleEnd = isMobile ? 2.2 : 3.0;
  const scale = useTransform(
    progress,
    [0, 0.4, 0.62, 0.86],
    [isMobile ? 0.92 : 0.82, 1, 1.06, scaleEnd]
  );
  const y = useTransform(
    progress,
    [0, 0.4, 0.62, 0.86],
    [110, 0, -4, isMobile ? -40 : -70]
  );
  const opacity = useTransform(progress, [0.82, 0.92], [1, 0]);
  const screenOpacity = useTransform(progress, [0.34, 0.46], [0, 1]);

  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-0 z-20 flex items-center justify-center"
    >
      <motion.div
        style={{
          scale,
          y,
          transformOrigin: "50% 42%",
          perspective: isMobile ? 1100 : 1500,
          perspectiveOrigin: "50% 17%",
        }}
        className="relative w-[88vw] max-w-[820px]"
      >
        {/* ONE coded laptop */}
        <div className="relative" style={{ transformStyle: "preserve-3d" }}>
          <LaptopDevice
            lidRotate={lidRotate}
            baseOpacity={baseOpacity}
            screenOpacity={screenOpacity}
          />
        </div>

        {/* glass source-chips drawn around the device */}
        <Chips progress={progress} isMobile={isMobile} />
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* LaptopDevice — coded base + hinged lid (front screen / back shell)  */
/* ------------------------------------------------------------------ */
function LaptopDevice({
  lidRotate,
  baseOpacity,
  screenOpacity,
}: {
  lidRotate: MotionValue<number>;
  baseOpacity: MotionValue<number>;
  screenOpacity: MotionValue<number>;
}) {
  return (
    <>
      {/* screen glow */}
      <motion.div
        aria-hidden
        style={{ opacity: screenOpacity }}
        className="absolute left-1/2 top-1/3 -z-10 h-[120%] w-[125%] -translate-x-1/2 -translate-y-1/4 rounded-[45%] blur-2xl"
      >
        <div
          className="h-full w-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(56,189,248,0.45), rgba(139,92,246,0.2) 50%, transparent 72%)",
          }}
        />
      </motion.div>

      {/* LID */}
      <motion.div
        style={{
          rotateX: lidRotate,
          transformOrigin: "50% 100%",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
        className="relative z-20 mx-auto aspect-[16/10] w-full"
      >
        {/* FRONT — screen (faces the keyboard when closed, the viewer when open) */}
        <div
          className="absolute inset-0 rounded-[16px] rounded-b-[5px] bg-gradient-to-b from-[#2c2f3a] to-[#0d0f16] p-[6px] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.8)] md:rounded-[22px] md:p-[9px]"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="absolute inset-0 rounded-[16px] rounded-b-[5px] ring-1 ring-white/10 md:rounded-[22px]" />
          <span className="absolute left-1/2 top-[4px] h-1 w-1 -translate-x-1/2 rounded-full bg-white/25 md:top-[6px]" />
          <div className="relative h-full w-full overflow-hidden rounded-[11px] bg-[#080a16] md:rounded-[15px]">
            <motion.div style={{ opacity: screenOpacity }} className="h-full w-full">
              <LaptopScreenUI />
            </motion.div>
            {/* glass sheen */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.07] via-transparent to-transparent" />
          </div>
        </div>

        {/* BACK — aluminium top, the only face seen while the lid is closed */}
        <div
          className="absolute inset-0 overflow-hidden rounded-[16px] rounded-b-[5px] md:rounded-[22px]"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.30), rgba(255,255,255,0.08) 26%, rgba(20,27,43,0.96)), linear-gradient(90deg, #1a2233, #2f3850 45%, #141a28)",
          }}
        >
          <div className="absolute inset-0 rounded-[16px] ring-1 ring-white/15 md:rounded-[22px]" />
          {/* metallic sheen across the top */}
          <div className="absolute inset-x-0 top-0 h-[34%] bg-gradient-to-b from-white/[0.14] to-transparent" />
          {/* MirWeb "M" lid logo (counter-mirrored against the back-face flip) */}
          <div
            className="absolute left-1/2 top-1/2"
            style={{ transform: "translate(-50%, -50%) scaleX(-1) scaleY(-1)" }}
          >
            <span
              className="font-display text-[2rem] font-extrabold leading-none"
              style={{
                backgroundImage: "linear-gradient(135deg, #38BDF8, #A78BFA)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                opacity: 0.6,
                filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.55))",
              }}
            >
              M
            </span>
          </div>
        </div>
      </motion.div>

      {/* BASE / keyboard deck — revealed as the lid lifts */}
      <motion.div
        style={{
          transform: "rotateX(72deg)",
          transformOrigin: "50% 0%",
          opacity: baseOpacity,
        }}
        className="relative z-10 mx-auto h-[180px] w-full md:h-[230px]"
      >
        <div className="absolute inset-0 rounded-b-[14px] bg-gradient-to-b from-[#33363f] via-[#212430] to-[#0e1016] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] md:rounded-b-[18px]">
          <div className="absolute inset-x-0 top-0 h-[8%] bg-gradient-to-b from-black/50 to-transparent" />
          {/* keyboard */}
          <div className="absolute inset-x-[5%] top-[10%] flex h-[56%] flex-col gap-[2.4%]">
            {[14, 14, 13, 12, 7].map((n, r) => (
              <div key={r} className="flex flex-1 gap-[0.8%]">
                {Array.from({ length: n }).map((_, k) => (
                  <span
                    key={k}
                    style={{ flexGrow: r === 4 && k === 3 ? 5 : 1 }}
                    className="flex-1 rounded-[2px] bg-[#0c0d12] shadow-[inset_0_-1px_0_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.05)]"
                  />
                ))}
              </div>
            ))}
          </div>
          {/* trackpad */}
          <div className="absolute bottom-[8%] left-1/2 h-[24%] w-[38%] -translate-x-1/2 rounded-[7px] bg-gradient-to-b from-[#2e313b] to-[#23262e] ring-1 ring-black/40" />
        </div>
        {/* front lip */}
        <div className="absolute inset-x-0 bottom-[-5px] mx-auto h-[6px] w-[99%] rounded-b-[8px] bg-gradient-to-b from-[#1a1c24] to-[#0a0b10]" />
      </motion.div>

      {/* floor reflection */}
      <div
        aria-hidden
        className="absolute left-1/2 top-full mt-1 h-10 w-[70%] -translate-x-1/2 rounded-[50%] bg-black/55 blur-2xl"
      />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Chips — appear in phase 3, get pulled into the screen in phase 4    */
/* ------------------------------------------------------------------ */
const CHIPS = [
  { label: "Фото", Icon: ImageIcon, style: "left-[-14%] top-[24%]", delay: 0 },
  { label: "Отзывы", Icon: Star, style: "right-[-13%] top-[15%]", delay: 0.4 },
  { label: "Адрес", Icon: MapPin, style: "left-[-11%] bottom-[22%]", delay: 0.8 },
  { label: "Услуги", Icon: Layers, style: "right-[-12%] bottom-[28%]", delay: 1.2 },
];

function Chips({
  progress,
  isMobile,
}: {
  progress: MotionValue<number>;
  isMobile: boolean;
}) {
  // 2-stop opacity (reliable); the retract is handled by scaling to 0 so the
  // chips visibly get pulled into the screen centre during zoom-in.
  const opacity = useTransform(progress, [0.4, 0.48], [0, 1]);
  const scale = useTransform(progress, [0, 0.66, 0.8], [1, 1, 0]);
  // The device fills the width on mobile — no clean margin for chips, so hide them.
  const list = isMobile ? [] : CHIPS;
  return (
    <motion.div
      aria-hidden
      style={{ opacity, scale, transformOrigin: "50% 38%" }}
      className="pointer-events-none absolute inset-0 z-30"
    >
      {list.map((c) => (
        <SourceChip key={c.label} {...c} />
      ))}
    </motion.div>
  );
}

function SourceChip({
  label,
  Icon,
  style,
  delay,
}: {
  label: string;
  Icon: typeof Star;
  style: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [0, -9, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}
      className={`absolute ${style} inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.06] px-3.5 py-2 text-xs font-medium text-white/85 shadow-xl shadow-black/30 backdrop-blur-md`}
    >
      <Icon className="size-3.5" style={{ color: COLOR.cyan }} />
      {label}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* LaptopScreenUI — the MirWeb site rendered inside the lid            */
/* ------------------------------------------------------------------ */
function LaptopScreenUI() {
  return (
    <div className="flex h-full w-full flex-col bg-[#080a16] text-left">
      {/* site header */}
      <div className="flex items-center justify-between border-b border-white/[0.06] bg-[#0a0c1a] px-4 py-2.5 md:px-6 md:py-3">
        <div className="flex items-center gap-2">
          <span className="grid h-5 w-5 place-content-center rounded-md bg-gradient-to-br from-[#2563EB] to-[#8B5CF6] text-[9px] font-bold text-white md:h-6 md:w-6 md:text-[11px]">
            M
          </span>
          <span className="text-xs font-semibold tracking-tight text-white md:text-sm">
            MirWeb
          </span>
        </div>
        <nav className="hidden items-center gap-4 text-[10px] text-white/45 lg:flex">
          <span>Демо</span>
          <span>Как работаем</span>
          <span>Примеры</span>
          <span>Тарифы</span>
          <span>Контакты</span>
        </nav>
        <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] text-white/85 md:text-[11px]">
          Получить демо
        </span>
      </div>

      {/* body */}
      <div className="relative flex-1 overflow-hidden p-5 md:p-7">
        <div
          className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl"
          style={{ background: "rgba(139,92,246,0.3)" }}
        />
        <div className="relative grid grid-cols-5 gap-4 md:gap-6">
          <div className="col-span-3">
            <span
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[8px] font-medium uppercase tracking-[0.16em] md:text-[10px]"
              style={{ color: COLOR.violetSoft }}
            >
              Демо за 48 часов
            </span>
            <h3 className="mt-3 text-lg font-bold leading-[1.1] tracking-tight text-white md:text-[1.8rem]">
              Сайт для вашего{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(90deg, ${COLOR.cyan}, ${COLOR.violetSoft})`,
                }}
              >
                бизнеса
              </span>
            </h3>
            <p className="mt-2 max-w-[15rem] text-[10px] leading-relaxed text-white/55 md:text-xs">
              Покажем, как может выглядеть сайт вашей компании — бесплатно и без
              обязательств.
            </p>
            <div className="mt-3.5 flex items-center gap-2">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[10px] font-semibold text-white shadow-lg md:text-[11px]"
                style={{
                  background: `linear-gradient(90deg, ${COLOR.blue}, ${COLOR.violet})`,
                  boxShadow: "0 8px 24px -8px rgba(139,92,246,0.6)",
                }}
              >
                Оставить заявку <ArrowRight className="size-3" />
              </span>
              <span className="rounded-full border border-white/12 px-3.5 py-2 text-[10px] font-medium text-white/75 md:text-[11px]">
                Посмотреть пример
              </span>
            </div>
          </div>
          <div className="col-span-2 overflow-hidden rounded-xl bg-gradient-to-br from-[#2563EB]/30 via-[#8B5CF6]/15 to-[#38BDF8]/15 ring-1 ring-white/10">
            <div className="h-full w-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.22),transparent_60%)]" />
          </div>
        </div>

        {/* cards */}
        <div className="relative mt-4 grid grid-cols-3 gap-2.5 md:mt-5">
          {[
            { t: "Услуги", d: "Понятный прайс", Icon: Layers },
            { t: "Отзывы", d: "Рейтинг 5.0", Icon: Star, star: true },
            { t: "Контакты", d: "Связь в 1 клик", Icon: Send },
          ].map((c) => (
            <div
              key={c.t}
              className="rounded-lg border border-white/[0.07] bg-white/[0.03] p-2.5"
            >
              <c.Icon
                className="mb-1.5 size-3"
                style={{ color: c.star ? "#FBBF24" : COLOR.violetSoft }}
              />
              <p className="text-[10px] font-medium text-white/90 md:text-[11px]">
                {c.t}
              </p>
              <p className="text-[8px] text-white/45 md:text-[10px]">{c.d}</p>
            </div>
          ))}
        </div>

        {/* footer */}
        <div className="relative mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 border-t border-white/[0.06] pt-3 text-[8px] text-white/50 md:text-[10px]">
          <span className="inline-flex items-center gap-1">
            <MapPin className="size-2.5" style={{ color: COLOR.cyan }} /> Нижний
            Новгород
          </span>
          <span className="inline-flex items-center gap-1">
            <Phone className="size-2.5" style={{ color: COLOR.violetSoft }} /> +7
            933 417 0016
          </span>
          <span className="inline-flex items-center gap-1">
            <Send className="size-2.5" style={{ color: COLOR.cyan }} /> @MirWeba
          </span>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-white/80">
            Заказать сайт <ArrowRight className="size-2.5" />
          </span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* FullscreenWebsiteState — you "land" inside the site                 */
/* ------------------------------------------------------------------ */
function FullscreenWebsiteState({ progress }: { progress: MotionValue<number> }) {
  const { open } = useLeadModal();
  const opacity = useTransform(progress, [0.78, 0.9], [0, 1]);
  const scale = useTransform(progress, [0.78, 0.96], [1.08, 1]);
  // Only catch clicks once the state is actually shown, so the invisible layer
  // never blocks (or steals) clicks during the earlier phases.
  const pointerEvents = useTransform(progress, (v) => (v > 0.82 ? "auto" : "none"));
  const viewExample = () =>
    document.getElementById("examples")?.scrollIntoView({ behavior: "smooth" });
  return (
    <motion.div
      style={{ opacity, scale, pointerEvents: pointerEvents as never }}
      className="absolute inset-0 z-40 flex flex-col"
    >
      <div className="absolute inset-0" style={{ background: COLOR.bg }} />
      <div
        className="absolute left-1/2 top-[36%] h-[70vh] w-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[40px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(37,99,235,0.28), rgba(139,92,246,0.16) 48%, transparent 72%)",
        }}
      />

      {/* centre headline (the global site header already provides nav) */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">
        <span
          className="font-display text-xs font-semibold uppercase tracking-[0.4em]"
          style={{ color: COLOR.cyan }}
        >
          Цифровая витрина
        </span>
        <h1 className="mt-5 max-w-4xl font-display text-3xl font-bold leading-[1.07] tracking-tight text-white sm:text-5xl md:text-6xl">
          Из разрозненной информации —{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(90deg, ${COLOR.cyan}, ${COLOR.violetSoft})`,
            }}
          >
            в одну цифровую витрину
          </span>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60 md:text-lg">
          Фото, услуги, отзывы и контакты — собраны в один аккуратный сайт,
          который понятен клиенту с первого экрана.
        </p>
        <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={open}
            className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03] active:scale-95"
            style={{
              background: `linear-gradient(90deg, ${COLOR.blue}, ${COLOR.violet})`,
              boxShadow: "0 14px 40px -12px rgba(139,92,246,0.7)",
            }}
          >
            Оставить заявку <ArrowRight className="size-4" />
          </button>
          <button
            type="button"
            onClick={viewExample}
            className="rounded-full border border-white/[0.14] bg-white/[0.04] px-7 py-3.5 text-sm font-medium text-white/80 backdrop-blur transition-colors hover:bg-white/[0.08]"
          >
            Посмотреть пример
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* ScrollHint — subtle "scroll" cue at the very start                  */
/* ------------------------------------------------------------------ */
function ScrollHint({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.06], [1, 0]);
  return (
    <motion.div
      style={{ opacity }}
      className="pointer-events-none absolute inset-x-0 bottom-7 z-30 flex flex-col items-center gap-2 text-white/40"
    >
      <span className="text-[11px] uppercase tracking-[0.3em]">Скролл</span>
      <span className="flex h-8 w-5 items-start justify-center rounded-full border border-white/20 p-1">
        <motion.span
          animate={{ y: [0, 9, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="h-1.5 w-1.5 rounded-full bg-white/60"
        />
      </span>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* StaticHero — reduced-motion fallback: open laptop, readable hero    */
/* ------------------------------------------------------------------ */
function StaticHero() {
  return (
    <section
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 py-24"
      style={{ background: COLOR.bg }}
    >
      <div
        className="absolute left-1/2 top-1/3 h-[60vh] w-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[40px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(37,99,235,0.26), rgba(139,92,246,0.14) 48%, transparent 72%)",
        }}
      />
      <h1 className="relative max-w-3xl text-center font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
        Сайт для вашего{" "}
        <span
          className="bg-clip-text text-transparent"
          style={{
            backgroundImage: `linear-gradient(90deg, ${COLOR.cyan}, ${COLOR.violetSoft})`,
          }}
        >
          бизнеса
        </span>
      </h1>
      <p className="relative mt-5 max-w-xl text-center text-white/60">
        Покажем, как может выглядеть сайт вашей компании — бесплатно и без
        обязательств.
      </p>
      <div
        className="relative mt-10 w-full max-w-[760px] overflow-hidden rounded-2xl border border-white/10 bg-[#080a16] shadow-2xl"
        style={{ aspectRatio: "16 / 10" }}
      >
        <LaptopScreenUI />
      </div>
    </section>
  );
}
