// src/app/api/querys/gruop/route.ts
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

    try {
      const result = await executeRequest("procedure", "spRSD", {
        IdMes: { type: sql.Int, value: idMes },
        Anio: { type: sql.Int, value: anio },
        Dia: { type: sql.Int, value: dia },
        IdGrupo: { type: sql.Int, value: idGrupo },
      });

      console.log("datos enviados");
      return NextResponse.json(result.recordset);
    } catch (err) {
      console.error("Error en API reporte-diario-asistencia:", err);
      return NextResponse.json(
        { error: "Error al obtener el reporte de asistencia" },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error("Error general en API:", err);
    return NextResponse.json(
      { error: "Error inesperado en el servidor" },
      { status: 500 }
    );
  }
}
