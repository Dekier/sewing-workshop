import { clearPanelSession, requirePanelOrigin } from "../../utils/panel-auth";
export default defineEventHandler((event) => {
  setHeader(event, "Cache-Control", "no-store");
  requirePanelOrigin(event);
  clearPanelSession(event);
  return { authenticated: false };
});
