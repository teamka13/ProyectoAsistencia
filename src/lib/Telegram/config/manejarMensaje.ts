import { solicitudInicial } from "./solicitudInicial";
import { RecoildStart } from "./RecoildStart";
import { guardarUsuario } from "../db/guardarUsuario";
import { TelegramUpdate } from "./types";

export async function manejarMensajeTelegram(update: TelegramUpdate) {
  const message = update.message;
  if (!message) return;

  const chatId = message.chat.id.toString();
  const text = message.text?.trim();

  // 🟩 Si el usuario manda /start
  if (text === "/start") {
    if (!RecoildStart(chatId)) {
      await solicitudInicial({
        chat_id: chatId,
        text: "⏳ Espera 30 minutos antes de volver a usar /start.",
        removeKeyboard: true,
      });
      return;
    }

    await solicitudInicial({
      chat_id: chatId,
      text: "¡Bienvenido!",
      requestContact: true,
    });
    return;
  }

  // 🟩 Si el usuario comparte su número
  if (message.contact) {
    if (!RecoildStart(chatId)) {
      await solicitudInicial({
        chat_id: chatId,
        text: "⚠️ Ya has compartido tu número recientemente. Intenta más tarde.",
        removeKeyboard: true,
      });
      return;
    }

    const {
      phone_number,
      first_name,
      last_name = "",
      user_id,
    } = message.contact;

    const telegram_id = user_id || message.chat.id;

    try {
      await guardarUsuario({
        telegram_id,
        phone_number,
        first_name,
        last_name,
      });

      await solicitudInicial({
        chat_id: chatId,
        text: `✅ ¡Gracias ${first_name} ${last_name}! Tus datos fueron registrados.`,
        removeKeyboard: true,
      });
    } catch (err) {
      await solicitudInicial({
        chat_id: chatId,
        text: "❌ Error al registrar tus datos, inténtalo más tarde.",
        removeKeyboard: true,
      });
    }
  }
}
