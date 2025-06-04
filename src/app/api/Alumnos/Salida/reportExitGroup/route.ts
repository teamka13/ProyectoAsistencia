import { NextResponse } from "next/server";
import { getConnection } from "@/lib/dbMssql";

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
    const req = pool.request();

    req.input("IdMes", idMes);
    req.input("Anio", anio);
    req.input("Dia", dia);
    req.input("IdGrupo", idGrupo);

    const result = await req.execute("spRSD");

    console.log("datos enviados");
    return NextResponse.json(result.recordset);
  } catch (err) {
    console.error("Error en API reporte-diario-asistencia:", err);
    return NextResponse.json(
      { error: "Error al obtener el reporte de asistencia" },
      { status: 500 }
    );
  }
}
