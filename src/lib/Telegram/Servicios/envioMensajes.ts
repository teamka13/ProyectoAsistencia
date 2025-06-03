import axios from "axios";
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const BASE_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;
export async function MensajesTG(chat_id: string, text: string) {
  try {
    const res = await axios.post(`${BASE_URL}/sendMessage`, { chat_id, text });
    console.log(`Mensaje Telegram Enviado a "${chat_id}"`);
    return res.data;
  } catch (error) {
    console.error(`Error al enviar mensaje a ${chat_id} :`, error);
    throw error;
  }
}
