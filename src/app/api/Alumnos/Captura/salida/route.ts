import { NextRequest, NextResponse } from "next/server";
import { NotificacionSalidaTG } from "@/app/api/bot/mensajes/salida/route";
import { sendErrorResponse } from "@/lib/errorResponse";
import { getConnection } from "@/lib/dbMssql"; // Asegúrate de que la ruta sea correcta
import sql from "mssql";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const Matricula = searchParams.get("Matricula");

    if (
      !Matricula ||
      typeof Matricula !== "string" ||
      Matricula.length > 12 ||
      Matricula.length < 7
    ) {
      return sendErrorResponse("INVALID", 422);
    }

    const pool = await getConnection();
    const result = await pool
      .request()
      .input("Matricula", sql.VarChar(12), Matricula)
      .execute("spBMS");

    if (!result.recordset[0]) {
      return sendErrorResponse("INVALID", 422);
    }

    const query = result.recordset[0];
    console.log("Datos de Salida enviados");

    if (query.CodigoError === 1) {
      return sendErrorResponse("SINREGISTRO", 409);
    }
    if (query.CodigoError === 2) {
      return sendErrorResponse("SEGUNDOREGISTRO", 404);
    }
    if (query.CodigoError === 3) {
      console.log("No se encontró registro de entrada");
      return sendErrorResponse("SINENTRADA", 401);
    }

    const horaSalidaQuery = query.Hora;
    const horaSalidaEsperada = new Date();
    horaSalidaEsperada.setHours(19, 0, 0, 0);

    const horaSalidaReal = new Date();
    const [h, m] = horaSalidaQuery.split(":").map(Number);
    horaSalidaReal.setHours(h, m, 0, 0);

    const salidaTemprano = horaSalidaReal < horaSalidaEsperada; // corregido
    const estado = salidaTemprano ? "ANTES" : "DESPUES";

    const msDiferencia =
      horaSalidaEsperada.getTime() - horaSalidaReal.getTime();
    let anticipacion = "0 min";

    if (salidaTemprano && msDiferencia > 0) {
      const totalMin = Math.floor(msDiferencia / 60000);
      const horas = Math.floor(totalMin / 60);
      const minutos = totalMin % 60;
      anticipacion =
        horas > 0
          ? `${horas} hora${horas > 1 ? "s" : ""} ${minutos} min`
          : `${minutos} min`;
    }

    const responseData = {
      ...query,
      estado,
      anticipacion,
    };

    if (query.Tel) {
      console.log("Datos Siendo Procesados por telegram");
      NotificacionSalidaTG({
        Tel: query.Tel,
        nombre: query.Nombre,
        paterno: query.Paterno,
        semestre: query.Semestre,
        hora: query.Hora,
      }).catch(console.error);
    }

    return NextResponse.json(responseData);
  } catch (err) {
    console.error("Error en la API:", err);
    return sendErrorResponse("Error interno del servidor", 500);
  }
}
