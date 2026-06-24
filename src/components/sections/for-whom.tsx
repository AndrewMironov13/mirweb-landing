import {
  Croissant,
  Scissors,
  Car,
  HandHeart,
  Baby,
  Store,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

const ITEMS: { icon: LucideIcon; title: string; note: string; tint: string }[] =
  [
    {
      icon: Croissant,
      title: "Пекарни и кондитерские",
      note: "Меню, цены и витрина дня",
      tint: "from-amber-500/25 to-orange-500/10",
    },
    {
      icon: Scissors,
      title: "Салоны красоты",
      note: "Услуги, мастера, запись",
      tint: "from-pink-500/25 to-fuchsia-500/10",
    },
    {
      icon: Car,
      title: "Автосервисы",
      note: "Прайс, запись и контакты",
      tint: "from-sky-500/25 to-blue-500/10",
    },
    {
      icon: HandHeart,
      title: "Студии массажа",
      note: "Процедуры и онлайн-запись",
      tint: "from-emerald-500/25 to-teal-500/10",
    },
    {
      icon: Baby,
      title: "Детские центры",
      note: "Программы, расписание, цены",
      tint: "from-violet-500/25 to-indigo-500/10",
    },
    {
      icon: Store,
      title: "Локальные услуги",
      note: "Всё, что работает «у дома»",
      tint: "from-cyan-500/25 to-primary/10",
    },
  ];

export function ForWhom() {
  return (
    <Section id="for-whom">
      <div className="container">
        <SectionHeading
          eyebrow="Для кого"
          title="Делаем витрины для бизнеса, который ценят рядом"
          subtitle="Если клиенты находят вас в картах и соцсетях — сайт соберёт всё это в одно сильное первое впечатление."
        />

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((item, i) => (
            <Reveal key={item.title} delay={(i % 3) * 0.06}>
              <div className="glass glass-hover group relative h-full overflow-hidden rounded-3xl p-6">
                <div
                  className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${item.tint} opacity-60 blur-2xl transition-opacity duration-500 group-hover:opacity-100`}
                />
                <div className="relative">
                  <span className="grid h-12 w-12 place-content-center rounded-2xl bg-white/[0.04] text-foreground ring-1 ring-white/10 transition-transform duration-500 group-hover:scale-110">
                    <item.icon className="size-5 text-accent" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.note}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
