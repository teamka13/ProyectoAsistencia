import { NextResponse } from "next/server";
import { getConnection } from "@/lib/dbMssql";

export async function GET() {
  try {
    const pool = await getConnection();
    const result = await pool.request().execute("spPersonal");

    const grupos = result.recordset.map((item) => ({
      id: item.i,
      personal: item.t,
    }));

    return NextResponse.json(grupos);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Error al conectar con SQL Server" },
      { status: 500 }
    );
  }
}
