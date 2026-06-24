import { motion } from "framer-motion";
import { Check, X, Wrench } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { useLeadModal } from "@/context/lead-modal";
import { cn } from "@/lib/utils";

interface Benefit {
  text: string;
  checked: boolean;
}

const Benefit = ({ text, checked }: Benefit) => (
  <div className="flex items-center gap-3">
    {checked ? (
      <span className="grid size-5 shrink-0 place-content-center rounded-full bg-primary/20 text-primary">
        <Check className="size-3" />
      </span>
    ) : (
      <span className="grid size-5 shrink-0 place-content-center rounded-full bg-white/[0.04] text-muted-foreground/60">
        <X className="size-3" />
      </span>
    )}
    <span
      className={cn(
        "text-sm",
        checked ? "text-foreground/85" : "text-muted-foreground/60"
      )}
    >
      {text}
    </span>
  </div>
);

interface Tier {
  tier: string;
  price: string;
  bestFor: string;
  cta: string;
  featured?: boolean;
  benefits: Benefit[];
}

const TIERS: Tier[] = [
  {
    tier: "Демо-концепция",
    price: "0 ₽",
    bestFor: "Посмотреть стиль до старта",
    cta: "Получить демо",
    benefits: [
      { text: "Первый экран будущего сайта", checked: true },
      { text: "Визуальная концепция", checked: true },
      { text: "Пример оффера и подачи", checked: true },
      { text: "Полная структура сайта", checked: false },
      { text: "Публикация", checked: false },
    ],
  },
  {
    tier: "Лендинг под ключ",
    price: "от 7 000 ₽",
    bestFor: "Готовый сайт для бизнеса",
    cta: "Заказать лендинг",
    featured: true,
    benefits: [
      { text: "Структура и все блоки", checked: true },
      { text: "Тексты и адаптация", checked: true },
      { text: "Мобильная версия", checked: true },
      { text: "Публикация на домене", checked: true },
      { text: "Пакет правок", checked: true },
    ],
  },
  {
    tier: "Сопровождение",
    price: "от 3 000 ₽",
    bestFor: "Поддержка и развитие · в мес",
    cta: "Обсудить",
    benefits: [
      { text: "Обновление контента", checked: true },
      { text: "Мелкие доработки", checked: true },
      { text: "Технический присмотр", checked: true },
      { text: "Приоритетные правки", checked: true },
      { text: "Разовый редизайн", checked: false },
    ],
  },
];

export function Pricing() {
  const { open } = useLeadModal();

  return (
    <Section id="pricing" className="bg-grid">
      <div className="container">
        <SectionHeading
          align="center"
          eyebrow="Тарифы"
          title="Прозрачно и без сюрпризов"
          subtitle="Начните с бесплатного демо и платите только за то, что реально нужно вашему бизнесу."
        />

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {TIERS.map((t, i) => (
            <motion.div
              key={t.tier}
              initial={{ opacity: 0, y: 24, filter: "blur(3px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.08 }}
            >
              <Card
                className={cn(
                  "relative flex h-full flex-col overflow-hidden border-white/8 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-7",
                  t.featured && "border-primary/40"
                )}
              >
                {t.featured && (
                  <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-primary/25 blur-3xl" />
                )}

                <div className="flex flex-col border-b border-white/8 pb-6">
                  <div className="mb-3 h-6">
                    {t.featured && (
                      <span className="inline-flex w-fit rounded-full bg-primary px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">
                        Чаще всего берут
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-foreground/70">{t.tier}</span>
                  <span className="mt-3 whitespace-nowrap font-display text-4xl font-extrabold text-foreground">
                    {t.price}
                  </span>
                  <span className="mt-2 text-sm text-muted-foreground">
                    {t.bestFor}
                  </span>
                </div>

                <div className="flex-1 space-y-3.5 py-7">
                  {t.benefits.map((b) => (
                    <Benefit key={b.text} {...b} />
                  ))}
                </div>

                {t.featured ? (
                  <LiquidButton onClick={open} glow size="lg" className="w-full">
                    {t.cta}
                  </LiquidButton>
                ) : (
                  <Button
                    onClick={open}
                    variant="outline"
                    size="lg"
                    className="w-full"
                  >
                    {t.cta}
                  </Button>
                )}
              </Card>
            </motion.div>
          ))}
        </div>

        {/* one-off edits strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass mx-auto mt-5 flex max-w-2xl flex-col items-center justify-between gap-3 rounded-2xl px-6 py-4 sm:flex-row"
        >
          <div className="flex items-center gap-3 text-center sm:text-left">
            <span className="grid size-10 shrink-0 place-content-center rounded-xl bg-white/[0.05] text-accent ring-1 ring-white/10">
              <Wrench className="size-4" />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Разовые правки
              </p>
              <p className="text-sm text-muted-foreground">
                Точечные доработки уже готового сайта
              </p>
            </div>
          </div>
          <span className="font-display text-xl font-bold text-foreground">
            от 1 000 ₽
          </span>
        </motion.div>
      </div>
    </Section>
  );
}
