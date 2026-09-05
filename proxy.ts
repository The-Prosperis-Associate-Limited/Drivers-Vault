import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import type { UserRole } from "./types/auth";

// ── Route constants ──
const ROUTES = {
  LOGIN: "/auth/signin",
  AUTH: "/auth",
  DASHBOARD: "/dashboard",
  ONBOARDING: "/onboarding",
} as const;

// The emailed verification link lands here with a token, and the Google
// redirect lands on signin with one. Both have to reach the page while a stale
// session cookie is still sitting in the browser, so they bypass the
// already-signed-in bounce.
const AUTH_BYPASS_PATHS = ["/auth/email-verified", "/auth/reset-password"];

// This app is the client surface. A driver or admin signing in here has an
// account but no screens, so they are sent to their own surface rather than
// dropped into a dashboard built for clients.
const SURFACE_FOR_ROLE: Record<UserRole, string> = {
  CLIENT: ROUTES.DASHBOARD,
  DRIVER: process.env.NEXT_PUBLIC_DRIVER_APP_URL ?? ROUTES.LOGIN,
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

  // Carries the originally-requested path so the client lands where they were
  // going rather than on the dashboard.
  const redirectToLogin = () => {
    const loginUrl = new URL(ROUTES.LOGIN, request.url);
    loginUrl.searchParams.set("callbackUrl", pathname + request.nextUrl.search);
    return NextResponse.redirect(loginUrl);
  };

  const homeForSession = () =>
    sessionType ? SURFACE_FOR_ROLE[sessionType] : ROUTES.LOGIN;

  if (AUTH_BYPASS_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  if (pathname.startsWith(ROUTES.AUTH)) {
    return hasValidSession ? redirectTo(homeForSession()) : NextResponse.next();
  }

  if (
    pathname.startsWith(ROUTES.DASHBOARD) ||
    pathname.startsWith(ROUTES.ONBOARDING)
  ) {
    if (!hasValidSession) return redirectToLogin();

    // A signed-in driver or admin never reaches a client screen.
    if (sessionType !== "CLIENT") return redirectTo(homeForSession());
  }

  return NextResponse.next();
}

// "/" is the public landing page, so unlike the driver app it is not matched.
export const config = {
  matcher: ["/auth/:path*", "/dashboard/:path*", "/onboarding/:path*"],
};
