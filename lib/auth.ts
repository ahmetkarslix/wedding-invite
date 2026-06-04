// HMAC imzalı oturum çerezi için yardımcılar.
// Web Crypto kullanır → hem edge middleware'de hem de Node route handler'larında çalışır.

export const SESSION_COOKIE = "admin_session";
export const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 gün

const encoder = new TextEncoder();

function toHex(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let hex = "";
  for (let i = 0; i < bytes.length; i++) {
    hex += bytes[i].toString(16).padStart(2, "0");
  }
  return hex;
}

// Sabit zamanlı string karşılaştırma (timing attack'a karşı)
export function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

async function hmacHex(payload: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return toHex(sig);
}

// "admin|<expiryEpochMs>.<hmac>" biçiminde imzalı token üretir.
export async function createSessionToken(secret: string): Promise<string> {
  const payload = `admin|${Date.now() + SESSION_TTL_MS}`;
  const sig = await hmacHex(payload, secret);
  return `${payload}.${sig}`;
}

// Token'ı doğrular: imza geçerli mi ve süresi dolmamış mı?
export async function verifySessionToken(
  token: string | undefined | null,
  secret: string,
): Promise<boolean> {
  if (!token || !secret) return false;
  const dot = token.lastIndexOf(".");
  if (dot < 0) return false;

  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = await hmacHex(payload, secret);
  if (!timingSafeEqual(sig, expected)) return false;

  const [role, expRaw] = payload.split("|");
  if (role !== "admin") return false;
  const exp = Number(expRaw);
  if (!Number.isFinite(exp) || Date.now() > exp) return false;

  return true;
}
