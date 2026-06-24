// Single source of truth for brand + contacts.
// Only these contacts are allowed across the whole site.
export const SITE = {
  brand: "MirWeb",
  telegramHandle: "@MirWeba",
  telegramUrl: "https://t.me/MirWeba",
  phonePretty: "+7 933 417 0016",
  phoneTel: "tel:+79334170016",
} as const;

export const NAV_LINKS = [
  { label: "Демо", href: "#free-demo" },
  { label: "Как работаем", href: "#how" },
  { label: "Примеры", href: "#examples" },
  { label: "Тарифы", href: "#pricing" },
  { label: "Контакты", href: "#contact" },
] as const;
