import { Star, MapPin, Phone, ArrowRight, Sparkles, Images } from "lucide-react";

/**
 * The MirWeb-styled business-site demo shown inside the laptop screen.
 * Dark premium tech UI with violet / cyan neon accents (MirWeb palette).
 */
export function MirWebDemoScreen() {
  return (
    <div className="flex h-full w-full flex-col bg-[#080a16] text-left">
      {/* top bar */}
      <div className="flex items-center justify-between border-b border-white/[0.06] bg-[#0a0c1a] px-5 py-3 md:px-7 md:py-3.5">
        <div className="flex items-center gap-2">
          <span className="grid h-6 w-6 place-content-center rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400 text-[10px] font-bold text-white md:h-7 md:w-7 md:text-xs">
            M
          </span>
          <span className="text-sm font-semibold tracking-tight text-white md:text-base">
            mirweb
          </span>
        </div>
        <div className="hidden items-center gap-5 text-[11px] text-white/45 md:flex md:text-xs">
          <span>Услуги</span>
          <span>Кейсы</span>
          <span>Цены</span>
          <span className="rounded-full bg-white/10 px-3 py-1 text-white/85">
            Заявка
          </span>
        </div>
      </div>

      {/* body */}
      <div className="relative flex-1 overflow-hidden p-5 md:p-8">
        {/* neon glows */}
        <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-violet-500/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-12 h-48 w-48 rounded-full bg-cyan-500/20 blur-3xl" />

        {/* hero row */}
        <div className="relative grid grid-cols-5 gap-4 md:gap-6">
          <div className="col-span-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.18em] text-violet-300 md:text-[10px]">
              <Sparkles className="size-3" /> Демо за 48 часов
            </span>
            <h3 className="mt-3 text-xl font-bold leading-[1.1] tracking-tight text-white md:text-[2rem]">
              Сайт для вашего{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-violet-300 to-indigo-300 bg-clip-text text-transparent">
                бизнеса
              </span>
            </h3>
            <p className="mt-2.5 max-w-[14rem] text-[11px] leading-relaxed text-white/55 md:max-w-xs md:text-[13px]">
              Покажем, как может выглядеть сайт вашей компании — бесплатно и без
              обязательств.
            </p>
            <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 px-4 py-2 text-[11px] font-semibold text-white shadow-lg shadow-violet-500/30 md:text-xs">
              Оставить заявку <ArrowRight className="size-3" />
            </div>
          </div>

          {/* visual block */}
          <div className="relative col-span-2 overflow-hidden rounded-xl bg-gradient-to-br from-violet-500/30 via-indigo-500/15 to-cyan-500/20 ring-1 ring-white/10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.22),transparent_60%)]" />
            <div className="absolute bottom-2 left-2 inline-flex items-center gap-1 rounded-md bg-black/35 px-2 py-1 text-[9px] text-white/85 backdrop-blur md:text-[10px]">
              <Images className="size-3" /> Галерея
            </div>
          </div>
        </div>

        {/* UI cards */}
        <div className="relative mt-5 grid grid-cols-3 gap-2.5 md:mt-6 md:gap-3">
          {[
            { t: "Услуги", d: "Понятный прайс" },
            { t: "Отзывы", d: "Рейтинг 5.0", star: true },
            { t: "Контакты", d: "Связь в 1 клик" },
          ].map((c) => (
            <div
              key={c.t}
              className="rounded-lg border border-white/[0.07] bg-white/[0.03] p-2.5 md:p-3"
            >
              <div className="mb-2 flex items-center gap-1">
                {c.star ? (
                  <Star className="size-3 fill-amber-400 text-amber-400" />
                ) : (
                  <span className="h-1.5 w-6 rounded-full bg-violet-400/70" />
                )}
              </div>
              <p className="text-[11px] font-medium text-white/90 md:text-xs">
                {c.t}
              </p>
              <p className="text-[9px] text-white/45 md:text-[11px]">{c.d}</p>
            </div>
          ))}
        </div>

        {/* footer info */}
        <div className="relative mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/[0.06] pt-3 text-[10px] text-white/55 md:text-[11px]">
          <span className="inline-flex items-center gap-1">
            <MapPin className="size-3 text-violet-400" /> Москва, ул. Тверская
          </span>
          <span className="inline-flex items-center gap-1">
            <Phone className="size-3 text-cyan-400" /> Позвонить
          </span>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-white/80">
            Заказать сайт <ArrowRight className="size-3" />
          </span>
        </div>
      </div>
    </div>
  );
}
