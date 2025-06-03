import { NextResponse } from "next/server";

export function sendErrorResponse(errorMessage: string, statusCode: number) {
  return NextResponse.json({ error: errorMessage }, { status: statusCode });
}
