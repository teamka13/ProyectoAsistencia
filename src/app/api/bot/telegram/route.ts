import { NextRequest } from "next/server";
import { enviarMensajeTelegram } from "@/lib/telegramBot";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { chat_id, text } = body;

    if (!chat_id || !text) {
      return new Response(
        JSON.stringify({ ok: false, error: "chat_id y text son requeridos" }),
        { status: 400 }
      );
    }

    const resultado = await enviarMensajeTelegram({ chat_id, text });

    return new Response(JSON.stringify({ ok: true, resultado }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error en /api/telegram:", error);
    return new Response(
      JSON.stringify({ ok: false, error: "Error interno del servidor" }),
      { status: 500 }
    );
  }
}
