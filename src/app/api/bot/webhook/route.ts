// app/api/bot/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import { NotificacionEntradaTG } from "../mensajes/entrada/route";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("Mensaje recibido desde Telegram:", body);

    // Aquí puedes procesar los mensajes entrantes de Telegram si es necesario
    // Por ahora solo respondemos OK
    return NextResponse.json({ status: "OK" });
  } catch (error) {
    console.error("Error en webhook de Telegram:", error);
    return NextResponse.json(
      { error: "Error procesando el webhook" },
      { status: 500 }
    );
  }
}
