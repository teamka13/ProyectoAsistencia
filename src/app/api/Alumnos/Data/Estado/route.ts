// src/app/api/querys/gruop/route.ts
import { NextResponse } from "next/server";
import { executeRequest } from "@/lib/dbMssql";

export async function GET() {
  try {
    const result = await executeRequest("procedure", "spEstado");
    const estado = result.recordset.map((i) => ({
      id: i.i,
      estado: i.s,
    }));
    return NextResponse.json(estado);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Error al conectar con SQL Server" },
      { status: 500 }
    );
  }
}
