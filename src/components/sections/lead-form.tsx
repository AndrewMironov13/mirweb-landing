import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Phone, CheckCircle2 } from "lucide-react";
import { SITE } from "@/lib/site";
import { LiquidButton } from "@/components/ui/liquid-glass-button";

const fields = [
  { name: "name", label: "Имя", placeholder: "Как к вам обращаться", type: "text", required: true },
  { name: "business", label: "Название бизнеса", placeholder: "Например, пекарня «Тихий двор»", type: "text", required: true },
  { name: "link", label: "Ссылка / соцсеть / карта", placeholder: "VK, Яндекс Карты, Instagram…", type: "text", required: false },
  { name: "contact", label: "Телефон или Telegram", placeholder: "+7… или @username", type: "text", required: true },
] as const;

export function LeadForm({ onClose }: { onClose: () => void }) {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = Object.fromEntries(new FormData(e.currentTarget).entries());
    setSending(true);
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      /* graceful fallback — the success screen still offers Telegram directly */
    } finally {
      setSending(false);
      setSent(true);
    }
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center py-6 text-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 240, damping: 18 }}
          className="mb-5 grid h-16 w-16 place-content-center rounded-full bg-primary/15 text-primary"
        >
          <CheckCircle2 className="size-8" />
        </motion.div>
        <h3 className="text-xl font-semibold text-foreground">
          Спасибо! Мы получили заявку
        </h3>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          Скоро свяжемся с вами и покажем демо первого экрана. Если удобнее —
          напишите нам сразу в Telegram.
        </p>
        <div className="mt-6 flex w-full flex-col gap-3 sm:flex-row">
          <LiquidButton
            href={SITE.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            glow
            size="lg"
            className="flex-1"
          >
            <Send className="size-4" /> Telegram
          </LiquidButton>
          <LiquidButton href={SITE.phoneTel} size="lg" className="flex-1">
            <Phone className="size-4" /> Позвонить
          </LiquidButton>
        </div>
        <button
          onClick={onClose}
          className="mt-4 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          Закрыть
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <h3
        id="lead-modal-title"
        className="text-xl font-semibold tracking-tight text-foreground"
      >
        Получить бесплатное демо
      </h3>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Оставьте контакты — соберём демо первого экрана на основе того, что у вас
        уже есть.
      </p>

      <div className="mt-5 space-y-3.5">
        {fields.map((f) => (
          <label key={f.name} className="block">
            <span className="mb-1.5 block text-xs font-medium text-foreground/80">
              {f.label}
              {f.required && <span className="text-primary"> *</span>}
            </span>
            <input
              name={f.name}
              type={f.type}
              required={f.required}
              placeholder={f.placeholder}
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/50 focus:bg-white/[0.05]"
            />
          </label>
        ))}
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-foreground/80">
            Комментарий
          </span>
          <textarea
            name="comment"
            rows={3}
            placeholder="Что важно показать, какие услуги, пожелания…"
            className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/50 focus:bg-white/[0.05]"
          />
        </label>
      </div>

      <LiquidButton
        type="submit"
        glow
        size="lg"
        disabled={sending}
        className="mt-5 w-full"
      >
        {sending ? "Отправляем…" : "Отправить заявку"}
      </LiquidButton>

      <div className="mt-4 flex items-center gap-3">
        <span className="h-px flex-1 bg-white/10" />
        <span className="text-xs text-muted-foreground">или сразу</span>
        <span className="h-px flex-1 bg-white/10" />
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <a
          href={SITE.telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-white/[0.07]"
        >
          <Send className="size-4 text-accent" /> Telegram
        </a>
        <a
          href={SITE.phoneTel}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-white/[0.07]"
        >
          <Phone className="size-4 text-emerald-400" /> Позвонить
        </a>
      </div>
    </form>
  );
}
