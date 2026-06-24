import {
  Star,
  MapPin,
  MessageCircle,
  HelpCircle,
  Images,
  Tag,
} from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

function Panel({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "glass glass-hover relative overflow-hidden rounded-3xl p-6",
        className
      )}
    >
      {children}
    </div>
  );
}

export function Showcase() {
  return (
    <Section id="showcase" className="bg-grid">
      <div className="container">
        <SectionHeading
          eyebrow="Зачем это нужно"
          title={
            <>
              Из разрозненных ссылок —<br className="hidden md:block" /> в одно
              понятное лицо бизнеса
            </>
          }
          subtitle="ВК, карты, отзывы, мессенджеры и фото уже работают на вас, но разрозненно. Мы собираем всё важное в одном месте, чтобы клиент быстро понял, кто вы, чем занимаетесь и как с вами связаться."
        />

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2">
          {/* Big feature panel */}
          <Reveal className="md:col-span-2 md:row-span-2">
            <Panel className="h-full">
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-accent/80">
                <Images className="size-4" /> Единая витрина
              </div>
              <h3 className="mt-4 font-display text-2xl font-bold text-foreground">
                Всё о бизнесе — на одном экране
              </h3>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                Услуги и цены, фото, отзывы, адрес и кнопки связи — в чистой и
                понятной структуре. Никакого хаоса из десятка вкладок.
              </p>

              {/* mini coded preview */}
              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="col-span-2 h-28 rounded-2xl bg-gradient-to-br from-primary/30 via-violet-500/15 to-accent/25 ring-1 ring-white/10">
                  <div className="flex h-full flex-col justify-end p-3">
                    <div className="h-2 w-16 rounded-full bg-white/40" />
                    <div className="mt-1.5 h-2 w-24 rounded-full bg-white/20" />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-12 rounded-2xl bg-white/[0.04] ring-1 ring-white/10" />
                  <div className="h-12 rounded-2xl bg-white/[0.04] ring-1 ring-white/10" />
                </div>
                {["Услуги", "Цены", "Фото"].map((t) => (
                  <div
                    key={t}
                    className="rounded-xl bg-white/[0.03] p-3 text-xs text-foreground/70 ring-1 ring-white/8"
                  >
                    <div className="mb-2 h-1.5 w-6 rounded-full bg-accent/60" />
                    {t}
                  </div>
                ))}
              </div>
            </Panel>
          </Reveal>

          {/* Reviews */}
          <Reveal delay={0.05}>
            <Panel className="h-full">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
                  <Star className="size-4 text-amber-400" /> Отзывы
                </span>
                <span className="text-lg font-bold text-foreground">4.9</span>
              </div>
              <div className="mt-3 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                «Нашли по карте, зашли на сайт — и сразу записались.»
              </p>
            </Panel>
          </Reveal>

          {/* Map / address */}
          <Reveal delay={0.1}>
            <Panel className="h-full">
              <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
                <MapPin className="size-4 text-primary" /> Адрес и карта
              </span>
              <div className="relative mt-3 h-20 overflow-hidden rounded-xl bg-[#0c1022] ring-1 ring-white/10">
                <div className="absolute inset-0 bg-grid opacity-40" />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="block h-3 w-3 rounded-full bg-primary shadow-[0_0_0_6px_hsl(244_84%_67%/0.25)]" />
                </div>
              </div>
            </Panel>
          </Reveal>
        </div>

        {/* secondary row */}
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            {
              icon: Tag,
              t: "Понятные цены",
              d: "Услуги и стоимость — без «уточняйте в директе».",
            },
            {
              icon: MessageCircle,
              t: "Кнопки связи",
              d: "Telegram, звонок и маршрут — в один тап.",
            },
            {
              icon: HelpCircle,
              t: "FAQ",
              d: "Ответы на частые вопросы снимают сомнения.",
            },
          ].map((b, i) => (
            <Reveal key={b.t} delay={i * 0.05}>
              <Panel>
                <b.icon className="size-5 text-accent" />
                <h4 className="mt-3 text-base font-semibold text-foreground">
                  {b.t}
                </h4>
                <p className="mt-1 text-sm text-muted-foreground">{b.d}</p>
              </Panel>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
