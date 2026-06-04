import { NextResponse } from "next/server";
import { SESSION_COOKIE, SESSION_TTL_MS, createSessionToken, timingSafeEqual } from "@/lib/auth";

export async function POST(req: Request) {
  const form = await req.formData();
  const password = String(form.get("password") ?? "");
  const expected = process.env.ADMIN_PASSWORD ?? "";
  const secret = process.env.ADMIN_COOKIE_SECRET ?? "";

  if (!expected || !secret || !timingSafeEqual(password, expected)) {
    return NextResponse.redirect(new URL("/admin/login?error=1", req.url), { status: 303 });
  }

  const token = await createSessionToken(secret);
  const res = NextResponse.redirect(new URL("/admin", req.url), { status: 303 });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: Math.floor(SESSION_TTL_MS / 1000),
  });
  return res;
}
