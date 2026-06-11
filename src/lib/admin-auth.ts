import { cookies } from "next/headers";
import {
  createSessionToken,
  verifySessionToken,
  getSessionCookieName,
} from "./admin-session";

const MAX_AGE = 60 * 60 * 24 * 7;

export async function setAdminSession() {
  const token = createSessionToken();
  const jar = await cookies();
  jar.set(getSessionCookieName(), token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function clearAdminSession() {
  const jar = await cookies();
  jar.delete(getSessionCookieName());
}

export async function isAdminAuthenticated() {
  const jar = await cookies();
  const token = jar.get(getSessionCookieName())?.value;
  return verifySessionToken(token);
}

