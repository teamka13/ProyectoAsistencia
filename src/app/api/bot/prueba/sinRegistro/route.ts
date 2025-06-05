// app/api/notificaciones/route.ts
import { NextResponse } from "next/server";
import { getConnection } from "@/lib/dbMssql";
import { NotificacionSinLlegadaTG } from "../../mensajes/sinLlegada/route";
export async function POST() {
  try {
    const pool = await getConnection();
    const result = await pool.request().execute("spDataTelegram");
    const usuarios = result.recordset;
    console.log("Usuarios a notificar:", result);
    const usuariosValidos = usuarios.filter((u) => u.Tel);

    await Promise.all(
      usuariosValidos.map((usuario) =>
        NotificacionSinLlegadaTG({
          Tel: usuario.Tel,
          nombre: usuario.Nombre,
          paterno: usuario.Paterno,
          semestre: usuario.Semestre,
        })
      )
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
