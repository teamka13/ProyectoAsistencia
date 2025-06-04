import { NextRequest, NextResponse } from "next/server";
import { getConnection } from "@/lib/dbMssql"; // Asegúrate de que la ruta sea correcta
import sql from "mssql";

function sendErrorResponse(errorMessage: string, statusCode: number) {
  return NextResponse.json({ error: errorMessage }, { status: statusCode });
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const Matricula = searchParams.get("Matricula");

    if (
      !Matricula ||
      typeof Matricula !== "string" ||
      Matricula.length > 12 ||
      Matricula.length < 6
    ) {
      console.error("Arreglo no cumple lo minimo:");
      return sendErrorResponse("INVALID", 422);
    }

    const pool = await getConnection();
    const result = await pool
      .request()
      .input("Matricula", sql.VarChar(12), Matricula)
      .execute("spBMC");

    if (!result.recordset[0]) {
      console.error("Arreglo Vacio:");
      return sendErrorResponse("INVALID", 422);
    }

    const query = result.recordset[0];

    if (query.CodigoError === 1) {
      return sendErrorResponse("SINREGISTRO", 409);
    }
    if (query.CodigoError === 2) {
      return sendErrorResponse("SINENTRADA", 404);
    }

    const responseData = { ...query, estado: "C" };
    console.log("datos enviados");
    return NextResponse.json(responseData);
  } catch (err) {
    console.error("Error en API Comedor:", err);
    return sendErrorResponse("Error interno del servidor", 500);
  }
}
