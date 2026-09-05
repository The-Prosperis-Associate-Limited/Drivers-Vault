import Cookies from "js-cookie";
import { accessTokenExpiration } from "./api";

export const isProd = process.env.NODE_ENV === "production";
export const COOKIE_DOMAIN = ".tegat.com";

export const cookieOpts = (expires: Date) => ({
  domain: isProd ? COOKIE_DOMAIN : undefined,
  secure: isProd,
  sameSite: "lax" as const,
  expires,
});

export const setAuthCookies = (data: {
  tokens: { refresh: string; access: string };
  user: "DRIVER" | "CLIENT" | "ADMIN";
}) => {
  const { tokens, user } = data;

  // Matches the server's 7-day refresh token. The access cookie expires with
  // the token itself; api.ts refreshes it in the background.
  const refreshTokenExpiration = new Date(
    new Date().getTime() + 7 * 24 * 60 * 60 * 1000,
  );

  Cookies.set("session_id", tokens.access, cookieOpts(accessTokenExpiration));
  Cookies.set(
    "session_id_ref",
    tokens.refresh,
    cookieOpts(refreshTokenExpiration),
  );
  Cookies.set("session_type", user, cookieOpts(refreshTokenExpiration));
};

export const clearAuthCookies = () => {
  const domainOpt = { domain: isProd ? COOKIE_DOMAIN : undefined };

  Cookies.remove("session_id", domainOpt);
  Cookies.remove("session_id_ref", domainOpt);
  Cookies.remove("session_type", domainOpt);

  sessionStorage.removeItem("onboardingDraft");
};
