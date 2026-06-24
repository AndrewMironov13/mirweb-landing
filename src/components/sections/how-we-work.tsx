import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

const STEPS = [
  {
    n: "01",
    t: "Вы оставляете заявку",
    d: "Ссылка на бизнес, пара фото или короткое описание — этого достаточно для старта.",
  },
  {
    n: "02",
    t: "Мы собираем информацию",
    d: "Берём то, что уже есть в сети: услуги, отзывы, адрес, контакты, визуал.",
  },
  {
    n: "03",
    t: "Показываем демо первого экрана",
    d: "Бесплатно собираем визуальную концепцию — вы видите стиль и потенциал.",
  },
  {
    n: "04",
    t: "Обсуждаем и дорабатываем",
    d: "Меняем подачу, акценты и оффер, пока не попадём точно в ваш бизнес.",
  },
  {
    n: "05",
    t: "Если всё нравится — делаем сайт",
    d: "Доводим до полноценного лендинга: структура, тексты, адаптив, публикация.",
  },
];

export function HowWeWork() {
  return (
    <Section id="how">
      <div className="container">
        <SectionHeading
          eyebrow="Как мы работаем"
          title="Сначала демо — потом решение"
          subtitle="Никаких слепых предоплат и долгих брифов. Вы видите результат до того, как принимаете решение."
        />

        <ol className="mx-auto mt-14 max-w-3xl">
          {STEPS.map((s, i) => {
            const last = i === STEPS.length - 1;
            return (
              <li key={s.n} className="flex items-stretch gap-5 md:gap-7">
                {/* number node + connecting rail */}
                <div className="flex flex-col items-center">
                  <span className="glass grid h-12 w-12 shrink-0 place-content-center rounded-full font-display text-base font-extrabold text-foreground ring-1 ring-white/10 md:h-14 md:w-14 md:text-lg">
                    {s.n}
                  </span>
                  {!last && (
                    <span className="my-1.5 w-px flex-1 bg-gradient-to-b from-primary/40 to-primary/5" />
                  )}
                </div>

                {/* content */}
                <Reveal className={last ? "pb-0" : "pb-10 md:pb-12"} delay={0.04}>
                  <h3 className="mt-2 text-lg font-semibold tracking-tight text-foreground md:text-xl">
                    {s.t}
                  </h3>
                  <p className="mt-1.5 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
                    {s.d}
                  </p>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
