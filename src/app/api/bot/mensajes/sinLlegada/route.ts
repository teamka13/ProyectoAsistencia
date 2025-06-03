import sql from "mssql";
import { enviarMensajeTelegram } from "@/lib/telegramBot";

interface NotificacionParams {
  pool: sql.ConnectionPool;
  Tel: string;
  nombre: string;
  paterno: string;
  semestre: string;
  hora: string;
}

export async function enviarNotificacionTelegram(params: NotificacionParams) {
  try {
    const { pool, Tel, nombre, paterno, semestre } = params;

    const telegramResult = await pool
      .request()
      .input("phone", sql.VarChar(30), Tel)
      .query(
        "SELECT telegram_id FROM TelegramUsers WHERE phone_number = @phone"
      );

    if (telegramResult.recordset && telegramResult.recordset.length > 0) {
      const telegram_id = telegramResult.recordset[0].telegram_id.toString();

      await new Promise((resolve) => setTimeout(resolve, 3000));

      const fecha = new Intl.DateTimeFormat("es-MX", {
        dateStyle: "full",
      }).format(new Date());

      const mensaje = `⚠️ *Ausencia Registrada*

Estimado padre o tutor, le informamos que su hijo(a) ${nombre} ${paterno}, del semestre ${semestre}, *no ha registrado su entrada* al plantel el día *${fecha}*.

Le recomendamos tomar las medidas necesarias y comunicarse con el plantel en caso de requerir más información.

Este mensaje es emitido automáticamente por el sistema de control de asistencia.`;

      await enviarMensajeTelegram({
        chat_id: telegram_id,
        text: mensaje,
      });
    } else {
      console.log(`Usuario con teléfono ${Tel} no encontrado en Telegram`);
    }
  } catch (error) {
    console.error("Error en notificación Telegram:", error);
  }
}
