import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS, SITE } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { useLeadModal } from "@/context/lead-modal";

export function Header() {
  const { open } = useLeadModal();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3 md:pt-4">
      <div
        className={cn(
          "flex w-full max-w-6xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-300 md:px-5",
          scrolled
            ? "glass shadow-lg shadow-black/30"
            : "border border-transparent"
        )}
      >
        {/* Logo */}
        <a href="#top" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-content-center rounded-xl bg-gradient-to-br from-primary to-accent text-sm font-bold text-white shadow-md shadow-primary/30">
            M
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-foreground">
            {SITE.brand}
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3.5 py-2 text-sm text-foreground/70 transition-colors hover:bg-white/[0.06] hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button onClick={open} variant="cool" size="sm" className="hidden sm:inline-flex">
            Получить демо
          </Button>
          <button
            aria-label="Меню"
            onClick={() => setMenuOpen((v) => !v)}
            className="grid h-10 w-10 place-content-center rounded-full text-foreground lg:hidden"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="glass absolute inset-x-4 top-[4.5rem] rounded-3xl p-4 lg:hidden">
          <nav className="flex flex-col">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-4 py-3 text-sm text-foreground/80 transition-colors hover:bg-white/[0.06]"
              >
                {l.label}
              </a>
            ))}
            <Button
              onClick={() => {
                setMenuOpen(false);
                open();
              }}
              variant="cool"
              className="mt-2"
            >
              Получить бесплатное демо
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
