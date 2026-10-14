import { hasPanelSession } from "../../utils/panel-auth";
export default defineEventHandler((event) => {
  setHeader(event, "Cache-Control", "no-store");
  return { authenticated: hasPanelSession(event) };
});
