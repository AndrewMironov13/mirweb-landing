import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { useLeadModal } from "@/context/lead-modal";

type Example = {
  name: string;
  type: string;
  benefit: string;
  domain: string;
  tint: string;
  accent: string;
};

const EXAMPLES: Example[] = [
  {
    name: "Тихий двор",
    type: "Кондитерская",
    benefit: "Меню дня и заказ в один тап",
    domain: "tihiy-dvor.ru",
    tint: "from-amber-500/30 to-orange-600/10",
    accent: "bg-amber-400",
  },
  {
    name: "Lumière",
    type: "Салон красоты",
    benefit: "Услуги, мастера и онлайн-запись",
    domain: "lumiere-studio.ru",
    tint: "from-pink-500/30 to-fuchsia-600/10",
    accent: "bg-pink-400",
  },
  {
    name: "ТочкаСервис",
    type: "Автосервис",
    benefit: "Прайс и запись без звонков",
    domain: "tochka-service.ru",
    tint: "from-sky-500/30 to-blue-600/10",
    accent: "bg-sky-400",
  },
  {
    name: "Сила рук",
    type: "Студия массажа",
    benefit: "Процедуры и абонементы",
    domain: "sila-ruk.ru",
    tint: "from-emerald-500/30 to-teal-600/10",
    accent: "bg-emerald-400",
  },
  {
    name: "Совята",
    type: "Детский центр",
    benefit: "Программы и расписание",
    domain: "sovyata.ru",
    tint: "from-violet-500/30 to-indigo-600/10",
    accent: "bg-violet-400",
  },
  {
    name: "Парус",
    type: "Кафе",
    benefit: "Витрина меню и бронь стола",
    domain: "parus-cafe.ru",
    tint: "from-cyan-500/30 to-primary/10",
    accent: "bg-cyan-400",
  },
];

function PreviewFrame({ ex }: { ex: Example }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#0a0d1c] ring-1 ring-white/10">
      {/* browser bar */}
      <div className="flex items-center gap-1.5 border-b border-white/5 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="ml-2 truncate rounded bg-white/5 px-2 py-0.5 text-[9px] text-white/35">
          {ex.domain}
        </span>
      </div>
      {/* coded content */}
      <div className={`relative h-40 bg-gradient-to-br ${ex.tint} p-4`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_10%,rgba(255,255,255,0.18),transparent_55%)]" />
        <div className="relative">
          <div className={`h-1.5 w-10 rounded-full ${ex.accent}`} />
          <div className="mt-3 h-3 w-28 rounded-full bg-white/55" />
          <div className="mt-1.5 h-3 w-20 rounded-full bg-white/30" />
          <div className="mt-4 flex gap-2">
            <div className="h-6 w-20 rounded-full bg-white/80" />
            <div className="h-6 w-16 rounded-full border border-white/30" />
          </div>
          <div className="mt-4 flex gap-2">
            {[0, 1, 2].map((k) => (
              <div
                key={k}
                className="h-10 flex-1 rounded-lg bg-white/10 ring-1 ring-white/10"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Examples() {
  const { open } = useLeadModal();

  return (
    <Section id="examples">
      <div className="container">
        <SectionHeading
          eyebrow="Примеры"
          title="Как может выглядеть демо вашего бизнеса"
          subtitle="Несколько концептов первого экрана для разных направлений. Ваш будет собран под ваш бизнес и вашу подачу."
        />

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {EXAMPLES.map((ex, i) => (
            <Reveal key={ex.name} delay={(i % 3) * 0.06}>
              <button
                onClick={open}
                className="glass glass-hover group block w-full rounded-3xl p-3 text-left"
              >
                <PreviewFrame ex={ex} />
                <div className="flex items-start justify-between px-3 pb-2 pt-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-widest text-accent/80">
                      {ex.type}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold text-foreground">
                      {ex.name}
                    </h3>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {ex.benefit}
                    </p>
                  </div>
                  <span className="grid size-9 shrink-0 place-content-center rounded-full bg-white/[0.05] text-foreground/70 ring-1 ring-white/10 transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
