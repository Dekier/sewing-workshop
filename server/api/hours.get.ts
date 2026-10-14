import {
  businessIds,
  publicHours,
  type BusinessId,
} from "../../shared/business-hours";
import { readHours } from "../utils/hours-store";

export default defineEventHandler(async (event) => {
  setHeader(event, "Cache-Control", "no-store");
  const business = getQuery(event).business || "workshop";
  if (!businessIds.includes(business as BusinessId))
    throw createError({ statusCode: 400, statusMessage: "Nieznana firma." });
  const document = await readHours(event);
  return publicHours(
    business as BusinessId,
    document.businesses[business as BusinessId],
  );
});
