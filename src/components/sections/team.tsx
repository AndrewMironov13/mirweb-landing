import { Eye, MessageSquareText, Target } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/section";

const PRINCIPLES = [
  {
    icon: Eye,
    t: "Сначала показываем, потом продаём",
    d: "Вы видите демо до оплаты — решение принимаете по результату, а не по обещаниям.",
  },
  {
    icon: MessageSquareText,
    t: "Простым языком, без перегруза",
    d: "Без бюрократии, долгих согласований и технического жаргона.",
  },
  {
    icon: Target,
    t: "Красиво, но ради результата",
    d: "Дизайн работает на обращения и доверие, а не просто радует глаз.",
  },
];

export function Team() {
  return (
    <Section id="team">
      <div className="container">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Eyebrow>Команда</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-bold leading-[1.1] tracking-tight text-foreground md:text-[2.5rem]">
              MirWeb — команда, которая собирает бизнес в понятный сайт
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              Мы делаем лендинги для локального бизнеса без лишней бюрократии,
              долгих согласований и огромных бюджетов. Берём то, что уже есть о
              компании в интернете, и превращаем это в понятную, современную
              цифровую витрину.
            </p>
          </Reveal>

          <div className="space-y-4">
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.t} delay={i * 0.08}>
                <div className="glass glass-hover flex items-start gap-4 rounded-2xl p-5">
                  <span className="grid size-11 shrink-0 place-content-center rounded-xl bg-white/[0.05] text-accent ring-1 ring-white/10">
                    <p.icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-foreground">
                      {p.t}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {p.d}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
