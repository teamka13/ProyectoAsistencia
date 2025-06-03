/* src/lib/telegramBot.ts
import axios from "axios";
import { UpdateData } from "./Telegram/db/UpdateData";
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const BASE_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;


export async function enviarMensajeTelegram(options: {
  chat_id: string;
  text: string;
  requestContact?: boolean;
}) {
  try {
    const payload = {
      chat_id: options.chat_id,
      text: options.requestContact
        ? "¡Hola! 👋 Para continuar, debemos de capturar su número telefónico:"
        : options.text,
      reply_markup: options.requestContact
        ? {
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
          }
        : undefined,
    };

    const res = await axios.post(`${BASE_URL}/sendMessage`, payload);
    return res.data;
  } catch (error) {
    console.error("Error enviando mensaje a Telegram:", error);
    throw error;
  }
}
export async function manejarMensajeTelegram(update: any) {
  console.log("Update recibido:", update);
  const message = update.message || update.edited_message;
  if (!message) return;

  const chatId = message.chat.id.toString();
  const text = message.text?.trim();
  console.log("Mensaje recibido:", text);

  if (text === "/start") {
    console.log("Procesando /start para chat:", chatId);
    await enviarMensajeTelegram({
      chat_id: chatId,
      text: "¡Bienvenido!",
      requestContact: true,
    });
    return;
  }

  // Al recibir el contacto, se extraen y almacenan los datos
  if (message.contact) {
    const phone_number = message.contact.phone_number;
    const first_name = message.contact.first_name;
    const last_name = message.contact.last_name || "";
    // Utilizamos message.contact.user_id si está presente, sino usamos el chat.id
    const telegram_id = message.contact.user_id || message.chat.id;

    try {
      // Guardar en la tabla TelegramUsers en SQL Server
      await UpdateData({
        telegram_id,
        phone_number,
        first_name,
        last_name,
      });
      console.log(`Registro guardado para ${first_name} (${telegram_id})`);

      // Confirmación al usuario
      await enviarMensajeTelegram({
        chat_id: chatId,
        text: `¡Gracias ${first_name} ${last_name}! tus datos han sido registrados correctamente.`,
      });
    } catch (err) {
      console.error("Error guardando el contacto en la base de datos", err);
      await enviarMensajeTelegram({
        chat_id: chatId,
        text: "Hubo un error al registrar tus datos, inténtalo más tarde.",
      });
    }
  }
}

*/
