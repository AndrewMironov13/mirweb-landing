import { Check, Gift, Layers } from "lucide-react";
import { LampContainer } from "@/components/ui/lamp";
import { Reveal } from "@/components/ui/reveal";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { Button } from "@/components/ui/button";
import { useLeadModal } from "@/context/lead-modal";
import { cn } from "@/lib/utils";

const demoIncludes = [
  "Первый экран будущего сайта",
  "Визуальная концепция и стиль",
  "Пример оффера и подачи",
  "Кнопки связи",
];

const fullIncludes = [
  "Полная структура и блоки",
  "Тексты и адаптация",
  "Мобильная версия",
  "Публикация и правки",
];

export function FreeDemo() {
  const { open } = useLeadModal();

  return (
    <section id="free-demo" className="relative scroll-mt-24 overflow-hidden">
      {/* Lamp spotlight on the heading */}
      <LampContainer className="pt-32 md:pt-40">
        <Reveal className="text-center">
          <h2 className="mx-auto max-w-3xl font-display text-3xl font-bold leading-[1.1] tracking-tight text-foreground md:text-5xl">
            Не покупайте сайт вслепую —{" "}
            <span className="text-gradient">сначала посмотрите демо</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground">
            Мы бесплатно показываем первый экран, чтобы вы увидели стиль и
            потенциал будущего сайта ещё до старта полноценной работы.
          </p>
        </Reveal>
      </LampContainer>

      {/* Two columns */}
      <div className="container relative z-10 -mt-24 pb-24 md:-mt-32">
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-5 md:grid-cols-2">
          {/* Free demo */}
          <Reveal>
            <PlanCard
              highlight
              icon={Gift}
              tag="Старт"
              title="Бесплатное демо"
              price="0 ₽"
              items={demoIncludes}
              cta={
                <LiquidButton onClick={open} glow size="lg" className="w-full">
                  Получить демо
                </LiquidButton>
              }
            />
          </Reveal>

          {/* Full landing */}
          <Reveal delay={0.08}>
            <PlanCard
              icon={Layers}
              tag="Дальше"
              title="Полноценный лендинг"
              price="от 7 000 ₽"
              items={fullIncludes}
              cta={
                <Button
                  onClick={open}
                  variant="outline"
                  size="lg"
                  className="w-full"
                >
                  Обсудить проект
                </Button>
              }
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function PlanCard({
  icon: Icon,
  tag,
  title,
  price,
  items,
  cta,
  highlight,
}: {
  icon: typeof Gift;
  tag: string;
  title: string;
  price: string;
  items: string[];
  cta: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "glass relative flex h-full flex-col rounded-3xl p-7",
        highlight && "ring-1 ring-primary/40"
      )}
    >
      {highlight && (
        <div className="pointer-events-none absolute -inset-px -z-10 rounded-3xl bg-gradient-to-b from-primary/20 to-transparent blur-[2px]" />
      )}
      <div className="flex items-center justify-between">
        <span className="grid h-11 w-11 place-content-center rounded-2xl bg-white/[0.05] text-accent ring-1 ring-white/10">
          <Icon className="size-5" />
        </span>
        <span className="rounded-full bg-white/[0.06] px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-foreground/70">
          {tag}
        </span>
      </div>
      <h3 className="mt-5 text-lg font-semibold text-foreground">{title}</h3>
      <div className="mt-1 font-display text-4xl font-extrabold text-foreground">
        {price}
      </div>
      <ul className="mt-6 space-y-3">
        {items.map((it) => (
          <li key={it} className="flex items-start gap-3 text-sm text-foreground/85">
            <span className="mt-0.5 grid size-5 shrink-0 place-content-center rounded-full bg-primary/20 text-primary">
              <Check className="size-3" />
            </span>
            {it}
          </li>
        ))}
      </ul>
      <div className="mt-7 pt-2">{cta}</div>
    </div>
  );
}
