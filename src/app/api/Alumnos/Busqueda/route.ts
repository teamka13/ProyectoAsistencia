// src/app/api/usuarios/route.ts (App Router)
import { NextRequest, NextResponse } from "next/server";
import { executeRequest } from "@/lib/dbMssql";
import sql from "mssql";

export async function POST(req: NextRequest) {
  try {
    const { estado, tipo } = await req.json();
    console.log("Datos Busqueda Enviados");

    const result = await executeRequest("procedure", "spSearch", {
      Estado: { type: sql.Int, value: estado },
      Tipo: { type: sql.Int, value: tipo },
    });
    return NextResponse.json(result.recordset);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Error al conectar con SQL Server" },
      { status: 500 }
    );
  }
}
