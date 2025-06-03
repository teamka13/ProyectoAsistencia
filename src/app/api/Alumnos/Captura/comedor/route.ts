import { NextRequest, NextResponse } from "next/server";
import { executeRequest } from "@/lib/dbMssql";
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
      return sendErrorResponse("INVALID", 422);
    }

    const result = await executeRequest("procedure", "spBMC", {
      Matricula: { type: sql.VarChar(12), value: Matricula },
    });
    if (!result.recordset[0]) {
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
