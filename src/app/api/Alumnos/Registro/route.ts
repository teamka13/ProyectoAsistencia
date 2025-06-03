import { NextResponse } from "next/server";
import { executeRequest } from "@/lib/dbMssql";
import { sendErrorResponse } from "@/lib/errorResponse";
import sql from "mssql";

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

    // Ejecutar el stored procedure
    const result = await executeRequest("procedure", "spRP", {
      IdGrupo: { type: sql.Int, value: gpo },
      IdSexo: { type: sql.Int, value: sexo },
      Plantel: { type: sql.Int, value: plantel },
      Estado: { type: sql.Int, value: estado },
      IdPersonal: { type: sql.Int, value: tipo },
      ApPaterno: { type: sql.VarChar(70), value: patern?.toUpperCase() },
      ApMaterno: { type: sql.VarChar(70), value: matern?.toUpperCase() },
      Nombre: { type: sql.VarChar(50), value: nombre.toUpperCase() },
      Matricula: { type: sql.Char(12), value: matricula.toUpperCase() },
      CURP: { type: sql.Char(18), value: curp.toUpperCase() },
      NumeroTel: { type: sql.Char(12), value: tel },
      NSS: { type: sql.Char(11), value: nss },
    });

    console.log("Datos enviados al sp");

    // Validar respuesta
    if (!result.recordset[0]) {
      console.log("No se recibieron datos del SP");
      return sendErrorResponse("error", 422);
    }

    const query = result.recordset[0];

    // Manejo de respuestas del SP
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
