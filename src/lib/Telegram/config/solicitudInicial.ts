import axios from "axios";
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const BASE_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;
export async function solicitudInicial(options: {
  chat_id: string;
  text: string;
  requestContact?: boolean;
  removeKeyboard?: boolean;
}) {
  try {
    const payload: any = {
      chat_id: options.chat_id,
      text: options.requestContact
        ? "¡Hola! 👋 Para continuar, debemos de capturar su número telefónico:"
        : options.text,
    };

    if (options.requestContact) {
      payload.reply_markup = {
        keyboard: [
          [
            {
              text: "📱 Compartir mi número",
              request_contact: true,
            },
          ],
        ],
        resize_keyboard: true,
        one_time_keyboard: true,
      };
    } else if (options.removeKeyboard) {
      payload.reply_markup = {
        remove_keyboard: true,
      };
    }

    const res = await axios.post(`${BASE_URL}/sendMessage`, payload);
    return res.data;
  } catch (error) {
    console.error("Error enviando mensaje a Telegram:", error);
    throw error;
  }
}
