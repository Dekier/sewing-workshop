import { checkPassword, requirePanelOrigin } from "../../utils/panel-auth";
export default defineEventHandler(async (event) => {
  setHeader(event, "Cache-Control", "no-store");
  requirePanelOrigin(event);
  const body = await readBody<{ password?: unknown }>(event);
  await checkPassword(event, body?.password);
  return { authenticated: true };
});
