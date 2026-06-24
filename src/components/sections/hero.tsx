import { motion } from "framer-motion";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { MirWebDemoScreen } from "@/components/mockup/mirweb-demo-screen";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { useLeadModal } from "@/context/lead-modal";

export function Hero() {
  const { open } = useLeadModal();

  return (
    <section id="top" className="relative overflow-hidden">
      {/* ===== Coded dark navy + violet/blue glow background ===== */}
      <div aria-hidden className="absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(125% 110% at 50% 0%, #14173a 0%, #0c0e22 45%, #080a18 72%, #06070f 100%)",
          }}
        />
        <div className="absolute left-[12%] top-[30%] h-[55vh] w-[44vw] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(139,92,246,0.30),transparent_70%)]" />
        <div className="absolute right-[10%] top-[34%] h-[55vh] w-[44vw] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(56,130,246,0.26),transparent_70%)]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-background" />
      </div>

      <div className="relative z-10">
        <ContainerScroll
          titleComponent={
            <div className="px-4">
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="mx-auto max-w-4xl text-balance text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-[3.4rem]"
              >
                Бесплатно покажем, как может выглядеть{" "}
                <span className="bg-gradient-to-r from-cyan-300 via-violet-300 to-indigo-300 bg-clip-text text-transparent">
                  сайт вашего бизнеса
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="mx-auto mt-5 max-w-xl text-balance text-base leading-relaxed text-white/60 md:text-lg"
              >
                Соберём демо первого экрана из того, что у вас уже есть — фото,
                отзывы, услуги. Понравится — доведём до полноценного сайта.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
              >
                <LiquidButton onClick={open} glow size="lg">
                  Получить бесплатное демо
                </LiquidButton>
                <LiquidButton href="#examples" size="lg">
                  Посмотреть примеры
                </LiquidButton>
              </motion.div>
            </div>
          }
        >
          {/* The product itself: a live MirWeb site inside a browser window */}
          <div className="flex h-full w-full flex-col">
            <div className="flex items-center gap-2 border-b border-white/[0.06] bg-[#0a0c1a] px-4 py-2.5 md:px-5 md:py-3">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              <span className="mx-auto rounded-md bg-white/[0.06] px-4 py-1 text-[11px] text-white/40 md:text-xs">
                mirweb.ru
              </span>
            </div>
            <div className="flex-1 overflow-hidden">
              <MirWebDemoScreen />
            </div>
          </div>
        </ContainerScroll>
      </div>
    </section>
  );
}
