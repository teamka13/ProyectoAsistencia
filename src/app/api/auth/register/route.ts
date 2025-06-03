import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const {
      name,
      user,
      patern,
      matern,
      nivel,
      rol, // opcional si quieres usar el default
      email,
      password,
    } = await request.json();
    console.log("Datos recibidos:");
    const newUser = await prisma.user.create({
      data: {
        name,
        user,
        patern,
        matern,
        nivel,
        rol,
        email,
        password,
      },
    });

    return NextResponse.json(newUser);
  } catch (error) {
    console.error("Error al recibir datos:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
