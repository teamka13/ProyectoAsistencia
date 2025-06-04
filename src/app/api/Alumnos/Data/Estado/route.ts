import { NextResponse } from "next/server";
import { getConnection } from "@/lib/dbMssql";

export async function GET() {
  try {
    const pool = await getConnection();
    const result = await pool.request().execute("spEstado");

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
