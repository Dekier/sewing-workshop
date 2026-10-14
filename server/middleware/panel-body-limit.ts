export default defineEventHandler(async (event) => {
  if (
    !event.path.startsWith("/api/panel/") ||
    !["POST", "PUT"].includes(event.method)
  )
    return;
  const limit = event.path.startsWith("/api/panel/session") ? 1024 : 32768;
  const declared = Number(getHeader(event, "content-length"));
  if (declared > limit)
    throw createError({
      statusCode: 413,
      statusMessage: "Żądanie jest zbyt duże.",
    });
  const raw = await readRawBody(event);
  if (raw && Buffer.byteLength(raw, "utf8") > limit)
    throw createError({
      statusCode: 413,
      statusMessage: "Żądanie jest zbyt duże.",
    });
});
