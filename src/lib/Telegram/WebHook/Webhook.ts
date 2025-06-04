import axios from "axios";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const WEBHOOK_URL = process.env.NEXT_PUBLIC_WEBHOOK_URL!;

export async function configurarWebhook() {
  if (!BOT_TOKEN || !WEBHOOK_URL) {
    throw new Error("Faltan variables de entorno para Telegram");
  }
  try {
    const response = await axios.post(
      `https://api.telegram.org/bot${BOT_TOKEN}/setWebhook`,
      {
        url: WEBHOOK_URL,
        drop_pending_updates: true,
        allowed_updates: JSON.stringify(["message", "callback_query"]),
        max_connections: 40,
      }
    );
    console.log("Webhook configurado:", response.data);
  } catch (error) {
    console.error("Error al configurar el webhook:", error);
  }
}
