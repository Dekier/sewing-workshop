import { requirePanelSession } from "../../utils/panel-auth";
import { readHours } from "../../utils/hours-store";
export default defineEventHandler(async (event) => {
  setHeader(event, "Cache-Control", "no-store");
  requirePanelSession(event);
  return readHours(event);
});
