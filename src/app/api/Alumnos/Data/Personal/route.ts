import { NextResponse } from "next/server";
import { executeRequest } from "@/lib/dbMssql";

export async function GET() {
  try {
    const result = await executeRequest("procedure", "spPersonal");
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
