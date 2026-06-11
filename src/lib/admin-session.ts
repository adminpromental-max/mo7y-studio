import { createHmac, timingSafeEqual } from "crypto";
import { readCmsStore } from "@/lib/cms";
import { hashPassword, verifyPasswordHash, secureCompare } from "@/lib/password";

const COOKIE_NAME = "mo7y_admin_session";

function getSigningSecret() {
  return (
    process.env.ADMIN_SECRET ||
    process.env.ADMIN_PASSWORD ||
    "mo7y-fallback-secret"
  );
}

function sign(value: string) {
  return createHmac("sha256", getSigningSecret()).update(value).digest("hex");
}

export function createSessionToken() {
  const payload = `mo7y:${Date.now()}`;
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string | undefined) {
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;
  const expected = sign(payload);
  try {
    return timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  } catch {
    return false;
  }
}

export async function isAdminConfigured() {
  if (process.env.ADMIN_PASSWORD) return true;
  const store = await readCmsStore();
  return Boolean(store.adminPasswordHash);
}

export async function verifyPassword(password: string) {
  const store = await readCmsStore();

  if (store.adminPasswordHash) {
    return verifyPasswordHash(password, store.adminPasswordHash);
  }

  const envPass = process.env.ADMIN_PASSWORD || "";
  if (!envPass) return false;
  return secureCompare(password, envPass);
}

export async function changeAdminPassword(current: string, next: string) {
  const ok = await verifyPassword(current);
  if (!ok) return { success: false, message: "كلمة المرور الحالية غير صحيحة" };

  if (next.length < 6) {
    return { success: false, message: "كلمة المرور الجديدة 6 أحرف على الأقل" };
  }

  const store = await readCmsStore();
  store.adminPasswordHash = hashPassword(next);
  const { writeCmsStore } = await import("@/lib/cms");
  await writeCmsStore(store);

  return { success: true };
}

export function getSessionCookieName() {
  return COOKIE_NAME;
}
