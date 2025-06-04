import { NextResponse } from "next/server";
import { getConnection } from "@/lib/dbMssql";
import { sendErrorResponse } from "@/lib/errorResponse";

export async function POST(request: Request) {
  try {
    const {
      estado,
      nombre,
      patern,
      matern,
      sexo,
      matricula,
      tipo,
      plantel,
      curp,
      nss,
      tel,
      gpo,
    } = await request.json();

    // Validación de campos requeridos
    if (
      !nombre ||
      !plantel ||
      !tipo ||
      !matricula ||
      !sexo ||
      !curp ||
      !estado
    ) {
      console.log("Faltan datos requeridos");
      return sendErrorResponse("INVALID", 422);
    }

    const pool = await getConnection();
    const requestDb = pool.request();

    // Agregar parámetros (sin especificar tipo explícitamente)
    if (gpo !== undefined) requestDb.input("IdGrupo", gpo);
    if (sexo !== undefined) requestDb.input("IdSexo", sexo);
    if (plantel !== undefined) requestDb.input("Plantel", plantel);
    if (estado !== undefined) requestDb.input("Estado", estado);
    if (tipo !== undefined) requestDb.input("IdPersonal", tipo);
    if (patern !== undefined)
      requestDb.input("ApPaterno", patern.toUpperCase());
    if (matern !== undefined)
      requestDb.input("ApMaterno", matern.toUpperCase());
    if (nombre !== undefined) requestDb.input("Nombre", nombre.toUpperCase());
    if (matricula !== undefined)
      requestDb.input("Matricula", matricula.toUpperCase());
    if (curp !== undefined) requestDb.input("CURP", curp.toUpperCase());
    if (tel !== undefined) requestDb.input("NumeroTel", tel);
    if (nss !== undefined) requestDb.input("NSS", nss);

    const result = await requestDb.execute("spRP");

    console.log("Datos enviados al sp");

    if (!result.recordset[0]) {
      console.log("No se recibieron datos del SP");
      return sendErrorResponse("error", 422);
    }

    const query = result.recordset[0];

    if (query.SUSCCESFULL === 1) {
      console.log("Registro exitoso");
      return NextResponse.json({ success: true }, { status: 200 });
    }

    if (query.CodigoError === 1) {
      console.log("Matrícula ya existe");
      return sendErrorResponse("MATRICULAEXISTE", 409);
    }

    if (query.CodigoError === 2) {
      console.log("CURP ya existe");
      return sendErrorResponse("CURPEXISTE", 404);
    }

    console.log("Error no manejado del SP:", query);
    return sendErrorResponse("SERVER_ERROR", 500);
  } catch (err) {
    console.error("Error en API:", err);
    return sendErrorResponse("SERVER_ERROR", 500);
  }
}
