// app/api/notificaciones/route.ts
import { NextResponse } from "next/server";
import { getConnection } from "@/lib/dbMssql";
import { NotificacionEntradaTG } from "../../mensajes/entrada/route";
export async function POST() {
  try {
    const pool = await getConnection();
    const result = await pool.request().execute("spDataTelegram");
    const usuarios = result.recordset;
    console.log("Usuarios a notificar:", result);
    const usuariosValidos = usuarios.filter((u) => u.Tel);

    await Promise.all(
      usuariosValidos.map((usuario) => {
        const horaActual = new Date().toLocaleTimeString("es-MX", {
          hour: "2-digit",
          minute: "2-digit",
        });

        return NotificacionEntradaTG({
          Tel: usuario.Tel,
          nombre: usuario.Nombre,
          paterno: usuario.Paterno,
          semestre: usuario.Semestre,
          hora: horaActual,
        });
      })
    );

    return NextResponse.json({
      success: true,
      total: usuariosValidos.length,
    });
  } catch (error) {
    console.error("Error enviando notificaciones:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
