// lib/Telegram/notifications.ts
import sql from "mssql";
import { getConnection } from "@/lib/dbMssql";
import axios from "axios";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_API_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;

interface NotificacionParams {
  pool: sql.ConnectionPool;
  Tel: string;
  nombre: string;
  paterno: string;
  semestre: string;
  hora: string;
}

export async function NotificacionSinLlegadaTG(params: NotificacionParams) {
  try {
    const { Tel, nombre, paterno, semestre } = params;

    const pool = await getConnection();
    const telegramResult = await pool
      .request()
      .input("phone", sql.VarChar(30), Tel)
      .query(
        "SELECT telegram_id FROM TelegramUsers WHERE phone_number = @phone"
      );
    if (!telegramResult.recordset?.length) {
      console.log(`Usuario con teléfono ${Tel} no encontrado en Telegram`);
      return;
    }

    const telegram_id = telegramResult.recordset[0].telegram_id.toString();

    // 3. Construir mensaje
    const fecha = new Intl.DateTimeFormat("es-MX", {
      dateStyle: "full",
    }).format(new Date());

    const mensaje =
      `⚠️ *Ausencia Registrada*\n\n` +
      `Por este medio se le informa que su hijo(a) *${nombre} ${paterno}*,\n` +
      `del semestre *${semestre}*, *no ha registrado su entrada* al plantel el día\n` +
      `*${fecha}*.\n\n` +
      `Le recomendamos tomar las medidas necesarias y comunicarse con el plantel en caso de requerir más información.\n\n` +
      `_Este mensaje es generado automáticamente por el Sistema de Registro Institucional_`;

    // 4. Enviar mensaje a Telegram
    await axios.post(`${TELEGRAM_API_URL}/sendMessage`, {
      chat_id: telegram_id,
      text: mensaje,
      parse_mode: "Markdown",
    });

    console.log("Notificación enviada correctamente a Telegram");
  } catch (error) {
    console.error("Error en notificación Telegram:", error);
  }
}
