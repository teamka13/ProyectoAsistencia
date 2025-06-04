import { NextResponse } from "next/server";
import { getConnection } from "@/lib/dbMssql";

export async function POST(request: Request) {
  try {
    const { idMes, anio, idGrupo } = await request.json();

    if (!idMes || !anio || !idGrupo) {
      return NextResponse.json(
        { error: "Faltan parámetros requeridos" },
        { status: 400 }
      );
    }

    const pool = await getConnection();
    const result = await pool
      .request()
      .input("IdMes", idMes)
      .input("Anio", anio)
      .input("IdGrupo", idGrupo)
      .execute("spRCM");

    return NextResponse.json(result.recordset);
  } catch (err) {
    console.error("Error en API reporte-diario-asistencia:", err);
    return NextResponse.json(
      { error: "Error al obtener el reporte de asistencia" },
      { status: 500 }
    );
  }
}
