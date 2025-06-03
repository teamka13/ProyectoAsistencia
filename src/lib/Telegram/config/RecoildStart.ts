const startLimits = new Map<string, number>();

export function RecoildStart(chatId: string): boolean {
  const ahora = Date.now();
  const tiempoPrevio = startLimits.get(chatId) || 0;
  const diferencia = ahora - tiempoPrevio;

  if (diferencia < 30_000) return false; // 1 minuto
  startLimits.set(chatId, ahora);
  return true;
}
