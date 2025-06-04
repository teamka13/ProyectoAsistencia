import sql from "mssql";
import axios from "axios";
import { getConnection } from "@/lib/dbMssql";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_API_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;

interface NotificacionParams {
  Tel: string;
  nombre: string;
  paterno: string;
  semestre: string;
  hora: string;
}

export async function NotificacionSalidaTG(params: NotificacionParams) {
  try {
    const { Tel, nombre, paterno, semestre, hora } = params;
    // 1. Obtener conexión
    const pool = await getConnection();
    // 2. Buscar telegram_id en la base de datos
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
      `📢 *Registro de Salida*\n\n` +
      `Por este medio se le informa que su hijo(a) *${nombre} ${paterno}*,\n` +
      `del semestre *${semestre}*, ha registrado su salida del plantel el día\n` +
      `*${fecha}* a las *${hora}* horas.\n\n` +
      `_Este mensaje es generado automáticamente por el Sistema de Registro Institucional_`;

    // 4. Enviar mensaje a Telegram
    await axios.post(`${TELEGRAM_API_URL}/sendMessage`, {
      chat_id: telegram_id,
      text: mensaje,
      parse_mode: "Markdown",
    });
  } catch (error) {
    console.error("Error en notificación Telegram:", error);
  }
}
