import { Send, Phone, Sparkles } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";
import { useLeadModal } from "@/context/lead-modal";

export function FinalCta() {
  const { open } = useLeadModal();

  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden py-24 md:py-32">
      {/* radial glow backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,hsl(244_84%_60%/0.22),transparent_60%)] blur-2xl" />
        <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
      </div>

      <div className="container">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="glass mx-auto inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-foreground/80">
            <Sparkles className="size-3.5 text-accent" /> Демо — бесплатно
          </span>
          <h2 className="mx-auto mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground md:text-6xl">
            Хотите увидеть, как может выглядеть{" "}
            <span className="text-gradient">сайт вашего бизнеса?</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
            Пришлите ссылку на ваш бизнес, фото или описание — покажем демо
            первого экрана.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <LiquidButton onClick={open} glow size="xl">
              Получить бесплатное демо
            </LiquidButton>
            <LiquidButton
              href={SITE.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              size="xl"
            >
              <Send className="size-4" /> Написать в Telegram
            </LiquidButton>
            <Button asChild variant="outline" size="lg">
              <a href={SITE.phoneTel}>
                <Phone className="size-4" /> Позвонить
              </a>
            </Button>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            Telegram{" "}
            <a
              href={SITE.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline-offset-4 hover:underline"
            >
              {SITE.telegramHandle}
            </a>{" "}
            · Телефон{" "}
            <a
              href={SITE.phoneTel}
              className="text-foreground underline-offset-4 hover:underline"
            >
              {SITE.phonePretty}
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
