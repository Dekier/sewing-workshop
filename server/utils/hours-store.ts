import { mkdir, readFile, writeFile, rename } from "node:fs/promises";
import { resolve } from "node:path";
import type { H3Event } from "h3";
import type { HoursDocument } from "../../shared/business-hours";

const key = "sewing-dezal:business-hours:v1";
const localFile = resolve(".data/business-hours.json");
let localQueue = Promise.resolve();
const defaults = (): HoursDocument => ({
  revision: 0,
  businesses: {
    workshop: {
      week: [
        null,
        { opens: "09:00", closes: "18:00" },
        { opens: "08:00", closes: "17:00" },
        { opens: "08:00", closes: "17:00" },
        { opens: "09:00", closes: "18:00" },
        null,
        null,
      ],
      leave: [],
    },
    dezal: {
      week: [
        null,
        { opens: "09:00", closes: "18:00" },
        { opens: "08:00", closes: "17:00" },
        { opens: "08:00", closes: "17:00" },
        { opens: "09:00", closes: "18:00" },
        null,
        null,
      ],
      leave: [],
    },
  },
});

function redisSettings(event: H3Event) {
  const config = useRuntimeConfig(event);
  const url =
    config.upstashRedisRestUrl ||
    process.env.UPSTASH_REDIS_REST_URL ||
    process.env.KV_REST_API_URL;
  const token =
    config.upstashRedisRestToken ||
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    process.env.KV_REST_API_TOKEN;
  if (url && token) return { url, token };
  if (import.meta.dev) return null;
  throw createError({
    statusCode: 503,
    statusMessage: "Baza godzin nie jest jeszcze skonfigurowana.",
  });
}

export async function redisCommand<T>(
  event: H3Event,
  command: (string | number)[],
): Promise<T | null> {
  const settings = redisSettings(event);
  if (!settings) return null;
  try {
    const response = await $fetch<{ result: T; error?: string }>(settings.url, {
      method: "POST",
      headers: { Authorization: `Bearer ${settings.token}` },
      body: command,
      timeout: 8000,
      retry: 0,
    });
    if (response.error) throw new Error("Redis command failed");
    return response.result;
  } catch {
    throw createError({
      statusCode: 503,
      statusMessage: "Nie można teraz połączyć się z bazą godzin.",
    });
  }
}

async function readLocal() {
  try {
    return JSON.parse(await readFile(localFile, "utf8")) as HoursDocument;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return defaults();
    throw error;
  }
}

export async function readHours(event: H3Event): Promise<HoursDocument> {
  if (!redisSettings(event)) {
    await localQueue;
    return readLocal();
  }
  let stored = await redisCommand<string>(event, ["GET", key]);
  if (!stored) {
    await redisCommand(event, ["SET", key, JSON.stringify(defaults()), "NX"]);
    stored = await redisCommand<string>(event, ["GET", key]);
  }
  if (!stored)
    throw createError({
      statusCode: 503,
      statusMessage: "Nie można odczytać godzin.",
    });
  return JSON.parse(stored) as HoursDocument;
}

export async function saveHours(
  event: H3Event,
  document: HoursDocument,
  expectedRevision: number,
) {
  const conflict = () =>
    createError({
      statusCode: 409,
      statusMessage:
        "Ktoś zmienił godziny. Wczytaj aktualne dane i spróbuj ponownie.",
    });
  if (redisSettings(event)) {
    const saved = await redisCommand<number>(event, [
      "EVAL",
      'local old=redis.call("GET",KEYS[1]); if not old or cjson.decode(old).revision~=tonumber(ARGV[1]) then return 0 end; redis.call("SET",KEYS[1],ARGV[2]); return 1',
      1,
      key,
      expectedRevision,
      JSON.stringify(document),
    ]);
    if (!saved) throw conflict();
  } else {
    const operation = localQueue.then(async () => {
      const current = await readLocal();
      if (current.revision !== expectedRevision) throw conflict();
      await mkdir(resolve(".data"), { recursive: true });
      await writeFile(`${localFile}.tmp`, JSON.stringify(document), "utf8");
      await rename(`${localFile}.tmp`, localFile);
    });
    localQueue = operation.catch(() => {});
    await operation;
  }
  return document;
}
