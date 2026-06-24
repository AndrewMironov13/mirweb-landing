import { Send, Phone } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-white/8 py-12">
      <div className="container">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* brand */}
          <div className="max-w-xs">
            <a href="#top" className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-content-center rounded-xl bg-gradient-to-br from-primary to-accent text-sm font-bold text-white">
                M
              </span>
              <span className="font-display text-lg font-bold tracking-tight text-foreground">
                {SITE.brand}
              </span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Собираем разрозненную информацию о локальном бизнесе в понятную
              цифровую витрину.
            </p>
          </div>

          {/* nav */}
          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* contacts */}
          <div className="space-y-3">
            <a
              href={SITE.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-foreground transition-colors hover:text-accent"
            >
              <Send className="size-4 text-accent" /> {SITE.telegramHandle}
            </a>
            <a
              href={SITE.phoneTel}
              className="flex items-center gap-2 text-sm text-foreground transition-colors hover:text-emerald-400"
            >
              <Phone className="size-4 text-emerald-400" /> {SITE.phonePretty}
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-white/8 pt-6 text-xs text-muted-foreground/70 sm:flex-row">
          <span>
            © {new Date().getFullYear()} {SITE.brand}. Все права защищены.
          </span>
          <span>Сделано с вниманием к деталям</span>
        </div>
      </div>
    </footer>
  );
}
