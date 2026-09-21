import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import type { UserRole } from "./types/auth";

// ── Route constants ──
const ROUTES = {
  LOGIN: "/auth/signin",
  DRIVER_LOGIN: "/driver/auth/signin",
  AUTH: "/auth",
  DRIVER_AUTH: "/driver/auth",
  DASHBOARD: "/dashboard",
  ONBOARDING: "/onboarding",
  MARKETPLACE: "/marketplace",
  DRIVER: "/driver",
} as const;

// The emailed verification link lands here with a token, and the Google
// redirect lands on signin with one. Both have to reach the page while a stale
// session cookie is still sitting in the browser, so they bypass the
// already-signed-in bounce.
const AUTH_BYPASS_PATHS = [
  "/auth/email-verified",
  "/auth/reset-password",
  "/driver/auth/email-verified",
  "/driver/auth/reset-password",
];

// One codebase, three surfaces — the session type decides which one a
// signed-in visitor belongs to. UX only; every endpoint checks the role itself.
const SURFACE_FOR_ROLE: Record<UserRole, string> = {
  CLIENT: ROUTES.DASHBOARD,
  DRIVER: "/driver/dashboard",
  ADMIN: process.env.NEXT_PUBLIC_ADMIN_APP_URL ?? ROUTES.LOGIN,
};

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const sessionType = request.cookies.get("session_type")?.value as
    UserRole | undefined;
  const refreshToken = request.cookies.get("session_id_ref")?.value;

  /*
    Presence of the refresh cookie only. The access token is short-lived and
    api.ts refreshes it in the background, so gating on session_id would sign a
    client out every thirty minutes. This is a UX gate, never the security
    boundary — every endpoint behind it is checked on the server.
  */
  const hasValidSession = !!sessionType && !!refreshToken;

  const redirectTo = (path: string) => {
    if (path.startsWith("http")) return NextResponse.redirect(path);
    return NextResponse.redirect(new URL(path, request.url));
  };

  // Carries the originally-requested path so the visitor lands where they were
  // going rather than on the dashboard. Driver paths get the driver signin.
  const redirectToLogin = () => {
    const login = pathname.startsWith(ROUTES.DRIVER)
      ? ROUTES.DRIVER_LOGIN
      : ROUTES.LOGIN;
    const loginUrl = new URL(login, request.url);
    loginUrl.searchParams.set("callbackUrl", pathname + request.nextUrl.search);
    return NextResponse.redirect(loginUrl);
  };

  const homeForSession = () =>
    sessionType ? SURFACE_FOR_ROLE[sessionType] : ROUTES.LOGIN;

  if (AUTH_BYPASS_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // The driver landing page is public; only its nested app routes are gated.
  if (pathname === ROUTES.DRIVER) {
    return NextResponse.next();
  }

  if (
    pathname.startsWith(ROUTES.DRIVER_AUTH) ||
    pathname.startsWith(ROUTES.AUTH)
  ) {
    return hasValidSession ? redirectTo(homeForSession()) : NextResponse.next();
  }

  // The driver area: everything except its auth pages needs a driver session.
  if (pathname.startsWith(ROUTES.DRIVER)) {
    if (!hasValidSession) return redirectToLogin();
    if (sessionType !== "DRIVER") return redirectTo(homeForSession());
    return NextResponse.next();
  }

  if (
    pathname.startsWith(ROUTES.DASHBOARD) ||
    pathname.startsWith(ROUTES.ONBOARDING) ||
    pathname.startsWith(ROUTES.MARKETPLACE)
  ) {
    if (!hasValidSession) return redirectToLogin();

    // A signed-in driver or admin never reaches a client screen.
    if (sessionType !== "CLIENT") return redirectTo(homeForSession());
  }

  return NextResponse.next();
}

// "/" is the public landing page, so it is not matched.
export const config = {
  matcher: [
    "/auth/:path*",
    "/dashboard/:path*",
    "/onboarding/:path*",
    "/marketplace/:path*",
    "/driver/:path*",
  ],
};
