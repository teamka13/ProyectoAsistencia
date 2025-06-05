// lib/Telegram/notifications.ts
import sql from "mssql";
import { getConnection } from "@/lib/dbMssql";
import axios from "axios";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_API_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;

interface NotificacionParams {
  Tel: string;
  nombre: string;
  paterno: string;
  semestre: string;
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

    const mensaje = `
❌ 🚨 *AUSENCIA DEL ALUMNO* 🚨 ❌
━━━━━━━━━━━━━━━━━━
👤  *Alumno:* ${nombre} ${paterno}

📚  *Semestre:* ${semestre}

📅  *Fecha:* ${fecha}
━━━━━━━━━━━━━━━━━━
🔍  *Acción requerida:*
Comunicarse con el plantel para justificar la ausencia

_Notificación automática - Sistema de Registro Institucional_ MX`;

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
