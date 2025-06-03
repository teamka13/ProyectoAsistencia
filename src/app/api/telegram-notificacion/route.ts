import { NextResponse } from "next/server";
import { NotificacionEntradaTG } from "../bot/mensajes/entrada/route";
import { getConnection } from "@/lib/dbMssql";

export async function POST(req: Request) {
  const pool = await getConnection();
  try {
    const body = await req.json();

    await NotificacionEntradaTG({ pool, ...body });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error en API Telegram:", error);
    return NextResponse.json(
      { error: "Fallo al enviar notificación" },
      { status: 500 }
    );
  } finally {
    // Cerrar la conexión si existe
    if (pool) {
      try {
        await pool.close();
        console.log("Conexión cerrada");
      } catch (err) {
        console.error("Error al cerrar la conexión:", err);
      }
    }
  }
}
