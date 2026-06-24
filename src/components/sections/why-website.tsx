import { MessagesSquare, Map, Globe, Check } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const CHANNELS = [
  {
    icon: MessagesSquare,
    name: "ВК",
    role: "Общение и контент",
    note: "Живёт лентой — важная информация быстро тонет в постах.",
    highlight: false,
  },
  {
    icon: Map,
    name: "Карты",
    role: "Поиск и отзывы",
    note: "Приводят клиентов, но подача и структура — не в ваших руках.",
    highlight: false,
  },
  {
    icon: Globe,
    name: "Сайт",
    role: "Единая витрина",
    note: "Понятная структура, ваш стиль и весь оффер на одном экране.",
    highlight: true,
  },
];

export function WhyWebsite() {
  return (
    <Section id="why">
      <div className="container">
        <SectionHeading
          align="center"
          eyebrow="Частый вопрос"
          title="У нас уже есть ВК и Яндекс Карты. Зачем сайт?"
          subtitle="Сайт не заменяет эти каналы. Он собирает всё важное в одном месте и помогает клиенту быстрее принять решение."
        />

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {CHANNELS.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.07}>
              <div
                className={cn(
                  "glass relative h-full overflow-hidden rounded-3xl p-7",
                  c.highlight && "ring-1 ring-primary/40"
                )}
              >
                {c.highlight && (
                  <>
                    <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/25 blur-3xl" />
                    <span className="absolute right-5 top-5 rounded-full bg-primary/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary">
                      Итог
                    </span>
                  </>
                )}
                <span
                  className={cn(
                    "grid h-12 w-12 place-content-center rounded-2xl ring-1 ring-white/10",
                    c.highlight
                      ? "bg-gradient-to-br from-primary to-accent text-white"
                      : "bg-white/[0.05] text-foreground/80"
                  )}
                >
                  <c.icon className="size-5" />
                </span>
                <h3 className="mt-5 text-xl font-semibold text-foreground">
                  {c.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-accent/80">
                  {c.role}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {c.note}
                </p>
                {c.highlight && (
                  <ul className="mt-5 space-y-2 border-t border-white/8 pt-5">
                    {["Контроль подачи", "Понятная структура", "Всё в одном месте"].map(
                      (t) => (
                        <li
                          key={t}
                          className="flex items-center gap-2 text-sm text-foreground/85"
                        >
                          <Check className="size-4 text-primary" /> {t}
                        </li>
                      )
                    )}
                  </ul>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
