// Vercel serverless function: receives a lead from the site form and relays it
// to Telegram. The bot token / chat id live in Vercel env vars (never in the
// client bundle):
//   TELEGRAM_BOT_TOKEN  — from @BotFather
//   TELEGRAM_CHAT_ID    — the chat/group/channel to receive leads
//
// Local dev: this runs on Vercel only; on `npm run dev` the call simply 404s and
// the form gracefully falls back to the "write us in Telegram" success screen.

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    res.status(500).json({ error: "Telegram is not configured" });
    return;
  }

  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  const clean = (v: unknown) => String(v ?? "").slice(0, 600).trim();
  const name = clean(body.name);
  const business = clean(body.business);
  const link = clean(body.link);
  const contact = clean(body.contact);
  const comment = clean(body.comment);

  if (!name && !contact) {
    res.status(400).json({ error: "Empty submission" });
    return;
  }

  const text = [
    "🆕 Новая заявка с MirWeb",
    "",
    `👤 Имя: ${name || "—"}`,
    `🏢 Бизнес: ${business || "—"}`,
    `🔗 Ссылка: ${link || "—"}`,
    `📞 Контакт: ${contact || "—"}`,
    `💬 Комментарий: ${comment || "—"}`,
  ].join("\n");

  try {
    const tg = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        disable_web_page_preview: true,
      }),
    });
    if (!tg.ok) {
      res.status(502).json({ error: "Telegram rejected the message" });
      return;
    }
    res.status(200).json({ ok: true });
  } catch {
    res.status(502).json({ error: "Failed to reach Telegram" });
  }
}
