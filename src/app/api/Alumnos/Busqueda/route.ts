// src/app/api/usuarios/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getConnection } from "@/lib/dbMssql"; // Asegúrate de que la ruta sea correcta
import sql from "mssql";

export async function POST(req: NextRequest) {
  try {
    const { estado, tipo } = await req.json();
    if (estado === undefined || tipo === undefined) {
      return NextResponse.json(
        { error: "Faltan parámetros requeridos" },
        { status: 400 }
      );
    }

    const pool = await getConnection();
    const result = await pool
      .request()
      .input("Estado", sql.Int, estado)
      .input("Tipo", sql.Int, tipo)
      .execute("spSearch");

    console.log("Datos Busqueda Enviados");
    return NextResponse.json(result.recordset);
  } catch (err) {
    console.error("Error en API usuarios:", err);
    return NextResponse.json(
      { error: "Error al conectar con SQL Server" },
      { status: 500 }
    );
  }
}
