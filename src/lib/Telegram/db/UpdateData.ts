// src/lib/telegramBot.ts (o en un archivo aparte, ej. db.ts)
import sql from "mssql";
import { getConnection } from "@/lib/dbMssql";

export async function UpdateData(data: {
  telegram_id: number;
  phone_number: string;
  first_name: string;
  last_name?: string;
}) {
  const pool = await getConnection();
  try {
    await pool
      .request()
      .input("telegram_id", sql.BigInt, data.telegram_id)
      .input("phone_number", sql.Char(12), data.phone_number)
      .input("first_name", sql.VarChar(25), data.first_name)
      .input("last_name", sql.VarChar(25), data.last_name || "None")
      .execute("spTG_Register");
    console.log(
      `Registro del número "${data.phone_number}" guardado/actualizado correctamente`
    );
  } catch (err) {
    console.error("Error al guardar el contacto:", err);
    throw err;
  } finally {
    if (pool) await pool.close();
  }
}
