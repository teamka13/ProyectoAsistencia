import { NextResponse } from "next/server";
import { getConnection } from "@/lib/dbMssql"; // Asegúrate de que la ruta sea correcta
import sql from "mssql";

export async function POST(request: Request) {
  try {
    const { idMes, anio, dia, idGrupo } = await request.json();
    if (!idMes || !anio || !dia || !idGrupo) {
      return NextResponse.json(
        { error: "Faltan parámetros requeridos" },
        { status: 400 }
      );
    }

    const pool = await getConnection();
    const result = await pool
      .request()
      .input("IdMes", sql.Int, idMes)
      .input("Anio", sql.Int, anio)
      .input("Dia", sql.Int, dia)
      .input("IdGrupo", sql.Int, idGrupo)
      .execute("spRCD");

    console.log("datos enviados");
    return NextResponse.json(result.recordset);
  } catch (err) {
    console.error("Error en API reporte-diario-comedor:", err);
    return NextResponse.json(
      { error: "Error al obtener el reporte de asistencia" },
      { status: 500 }
    );
  }
}
