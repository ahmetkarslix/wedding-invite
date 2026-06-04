import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

// /admin/* yollarını korur. Geçerli oturum çerezi yoksa /admin/login'e yönlendirir.
// (Next.js 16'da bu dosya eskiden "middleware.ts" idi; artık "proxy.ts".)
export async function proxy(req: NextRequest) {
  // Login sayfasının kendisi korumadan muaf (aksi halde yönlendirme döngüsü olur).
  if (req.nextUrl.pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const ok = await verifySessionToken(token, process.env.ADMIN_COOKIE_SECRET ?? "");

  if (!ok) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
