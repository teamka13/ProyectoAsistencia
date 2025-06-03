import { NextResponse } from "next/server";
import { executeRequest } from "@/lib/dbMssql";
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

    const result = await executeRequest("procedure", "spRCD", {
      IdMes: { type: sql.Int, value: idMes },
      Anio: { type: sql.Int, value: anio },
      Dia: { type: sql.Int, value: dia },
      IdGrupo: { type: sql.Int, value: idGrupo },
    });

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
