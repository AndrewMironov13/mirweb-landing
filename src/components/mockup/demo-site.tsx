import { MapPin, Phone, Star, Clock, ArrowUpRight } from "lucide-react";

/**
 * A fully coded mini "business showcase" rendered inside the laptop screen.
 * No AI imagery — abstract gradient blocks, real type scale, clean grid.
 * This is the "собранная витрина" the chips feed into.
 */
export function DemoSite() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-[#080b18] text-left">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 border-b border-white/5 bg-[#0c1022] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <div className="mx-auto flex items-center gap-2 rounded-md bg-white/5 px-3 py-1 text-[10px] text-white/40">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          tihiy-dvor.ru
        </div>
      </div>

      {/* Site body */}
      <div className="relative flex-1 overflow-hidden p-4 md:p-7">
        {/* ambient screen glow */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-accent/20 blur-3xl" />

        {/* nav */}
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="grid h-7 w-7 place-content-center rounded-lg bg-gradient-to-br from-primary to-accent text-[11px] font-bold text-white">
              Т
            </div>
            <span className="text-sm font-semibold tracking-tight text-white">
              Тихий двор
            </span>
          </div>
          <div className="hidden items-center gap-4 text-[11px] text-white/50 md:flex">
            <span>Меню</span>
            <span>Доставка</span>
            <span>Отзывы</span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-white/80">
              Заказать
            </span>
          </div>
        </div>

        {/* hero row */}
        <div className="relative mt-5 grid grid-cols-1 gap-4 md:mt-7 md:grid-cols-5">
          <div className="md:col-span-3">
            <p className="text-[10px] uppercase tracking-[0.2em] text-accent/80">
              Пекарня · кофейня
            </p>
            <h3 className="mt-2 text-xl font-bold leading-tight text-white md:text-3xl">
              Свежий хлеб
              <br />
              каждое утро
            </h3>
            <p className="mt-2 max-w-xs text-[11px] leading-relaxed text-white/50 md:text-xs">
              Печём на закваске, варим кофе и доставляем по району за 40 минут.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-gradient-to-t from-primary to-primary/80 px-3.5 py-1.5 text-[11px] font-semibold text-white">
                Сделать заказ
              </span>
              <span className="rounded-full border border-white/15 px-3.5 py-1.5 text-[11px] text-white/80">
                Меню
              </span>
            </div>
          </div>
          {/* hero visual block */}
          <div className="relative h-24 overflow-hidden rounded-xl bg-gradient-to-br from-primary/40 via-violet-500/20 to-accent/30 md:col-span-2 md:h-auto">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_60%)]" />
            <div className="absolute bottom-2 left-2 rounded-md bg-black/30 px-2 py-1 text-[9px] text-white/80 backdrop-blur">
              4.9 ★ · 312 отзывов
            </div>
          </div>
        </div>

        {/* services / price list */}
        <div className="relative mt-5 grid grid-cols-3 gap-2.5">
          {[
            { t: "Хлеб на закваске", p: "от 180 ₽" },
            { t: "Кофе с собой", p: "от 150 ₽" },
            { t: "Десерты дня", p: "от 220 ₽" },
          ].map((s) => (
            <div
              key={s.t}
              className="rounded-lg border border-white/8 bg-white/[0.03] p-2.5"
            >
              <div className="mb-2 h-1.5 w-8 rounded-full bg-accent/60" />
              <p className="text-[11px] font-medium text-white/90">{s.t}</p>
              <p className="text-[10px] text-white/45">{s.p}</p>
            </div>
          ))}
        </div>

        {/* footer info row */}
        <div className="relative mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/5 pt-3 text-[10px] text-white/55">
          <span className="inline-flex items-center gap-1">
            <Star className="size-3 text-amber-400" /> 4.9
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3 text-accent" /> 08:00–22:00
          </span>
          <span className="inline-flex items-center gap-1">
            <MapPin className="size-3 text-primary" /> ул. Садовая, 12
          </span>
          <span className="inline-flex items-center gap-1">
            <Phone className="size-3 text-emerald-400" /> Позвонить
          </span>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-white/80">
            Маршрут <ArrowUpRight className="size-3" />
          </span>
        </div>
      </div>
    </div>
  );
}
