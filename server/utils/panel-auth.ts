import {
  createHash,
  createHmac,
  randomBytes,
  timingSafeEqual,
} from "node:crypto";
import type { H3Event } from "h3";
import { redisCommand } from "./hours-store";

const cookieName = "hours-panel";
const maxAge = 8 * 60 * 60;
const attempts = new Map<string, { count: number; expires: number }>();

function secret(event: H3Event) {
  const value = useRuntimeConfig(event).panelSessionSecret;
  if (!value || value.length < 32)
    throw createError({
      statusCode: 503,
      statusMessage: "Panel nie jest jeszcze skonfigurowany.",
    });
  return value;
}
const signature = (event: H3Event, value: string) =>
  createHmac("sha256", secret(event)).update(value).digest("base64url");
const equal = (a: string, b: string) => {
  const first = createHash("sha256").update(a).digest();
  const second = createHash("sha256").update(b).digest();
  return timingSafeEqual(first, second);
};

export function hasPanelSession(event: H3Event) {
  const cookie = getCookie(event, cookieName);
  if (!cookie || cookie.length > 512) return false;
  const [payload, signed, extra] = cookie.split(".");
  if (!payload || !signed || extra || !equal(signature(event, payload), signed))
    return false;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString());
    return typeof data.exp === "number" && data.exp > Date.now();
  } catch {
    return false;
  }
}

export function requirePanelSession(event: H3Event) {
  if (!hasPanelSession(event))
    throw createError({
      statusCode: 401,
      statusMessage: "Sesja wygasła. Wpisz hasło ponownie.",
    });
}

export function requirePanelOrigin(event: H3Event) {
  const origin = getHeader(event, "origin");
  if (!origin || origin !== getRequestURL(event).origin)
    throw createError({
      statusCode: 403,
      statusMessage: "Niedozwolone źródło żądania.",
    });
}

export async function checkPassword(event: H3Event, password: unknown) {
  const expected = useRuntimeConfig(event).panelPassword;
  if (!expected)
    throw createError({
      statusCode: 503,
      statusMessage: "Panel nie jest jeszcze skonfigurowany.",
    });
  const ip = process.env.VERCEL
    ? getHeader(event, "x-vercel-forwarded-for") || getRequestIP(event)
    : getRequestIP(event);
  const bucket = createHmac("sha256", secret(event))
    .update(ip || "unknown")
    .digest("hex");
  const count = await redisCommand<number>(event, [
    "EVAL",
    'local n=redis.call("INCR",KEYS[1]); if n==1 then redis.call("EXPIRE",KEYS[1],900) end; return n',
    1,
    `sewing-dezal:panel-attempt:${bucket}`,
  ]);
  let total = count;
  if (total === null) {
    for (const [key, attempt] of attempts)
      if (attempt.expires < Date.now()) attempts.delete(key);
    const attempt = attempts.get(bucket) || {
      count: 0,
      expires: Date.now() + 900000,
    };
    total = ++attempt.count;
    attempts.set(bucket, attempt);
  }
  if (total > 15) {
    setHeader(event, "Retry-After", "900");
    throw createError({
      statusCode: 429,
      statusMessage: "Za dużo prób. Spróbuj za 15 minut.",
    });
  }
  if (
    typeof password !== "string" ||
    password.length > 128 ||
    !equal(password, expected)
  ) {
    throw createError({
      statusCode: 401,
      statusMessage: "Nieprawidłowe hasło.",
    });
  }
  const payload = Buffer.from(
    JSON.stringify({
      exp: Date.now() + maxAge * 1000,
      nonce: randomBytes(16).toString("hex"),
    }),
  ).toString("base64url");
  setCookie(event, cookieName, `${payload}.${signature(event, payload)}`, {
    httpOnly: true,
    sameSite: "strict",
    secure: !import.meta.dev,
    path: "/api/panel",
    maxAge,
  });
}

export const clearPanelSession = (event: H3Event) =>
  deleteCookie(event, cookieName, {
    path: "/api/panel",
    secure: !import.meta.dev,
    sameSite: "strict",
  });
