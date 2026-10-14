import {
  businessIds,
  type BusinessId,
  type BusinessSchedule,
} from "#shared/business-hours";
import {
  requirePanelOrigin,
  requirePanelSession,
} from "../../utils/panel-auth";
import { readHours, saveHours } from "../../utils/hours-store";

const validDate = (value: unknown): value is string =>
  typeof value === "string" &&
  /^20\d{2}-\d{2}-\d{2}$/.test(value) &&
  !Number.isNaN(Date.parse(value)) &&
  new Date(`${value}T12:00:00Z`).toISOString().slice(0, 10) === value;
const validTime = (value: unknown): value is string =>
  typeof value === "string" && /^([01]\d|2[0-3]):[0-5]\d$/.test(value);
function validate(schedule: BusinessSchedule) {
  if (
    !schedule ||
    !Array.isArray(schedule.week) ||
    schedule.week.length !== 7 ||
    !Array.isArray(schedule.leave) ||
    schedule.leave.length > 100
  )
    return false;
  if (
    !schedule.week.every(
      (day) =>
        day === null ||
        (day &&
          validTime(day.opens) &&
          validTime(day.closes) &&
          day.opens < day.closes),
    )
  )
    return false;
  const leave = [...schedule.leave].sort((a, b) =>
    String(a?.from).localeCompare(String(b?.from)),
  );
  return (
    leave.every(
      (period, index) =>
        period &&
        typeof period.id === "string" &&
        /^[a-zA-Z0-9-]{1,64}$/.test(period.id) &&
        validDate(period.from) &&
        validDate(period.to) &&
        validDate(period.announceFrom) &&
        period.from <= period.to &&
        period.announceFrom <= period.from &&
        (!index || leave[index - 1]!.to < period.from),
    ) && new Set(leave.map((period) => period.id)).size === leave.length
  );
}

export default defineEventHandler(async (event) => {
  setHeader(event, "Cache-Control", "no-store");
  requirePanelSession(event);
  requirePanelOrigin(event);
  const body = await readBody<{
    revision: number;
    businesses: BusinessId[];
    schedule: BusinessSchedule;
  }>(event);
  if (
    !body ||
    !Number.isSafeInteger(body.revision) ||
    !Array.isArray(body.businesses) ||
    !body.businesses.length ||
    body.businesses.length > 2 ||
    new Set(body.businesses).size !== body.businesses.length ||
    !body.businesses.every((id) => businessIds.includes(id)) ||
    !validate(body.schedule)
  ) {
    throw createError({
      statusCode: 400,
      statusMessage:
        "Sprawdź godziny i daty. Okresy wolnego nie mogą się nakładać.",
    });
  }
  const document = await readHours(event);
  const schedule: BusinessSchedule = {
    week: body.schedule.week.map((day) =>
      day ? { opens: day.opens, closes: day.closes } : null,
    ),
    leave: body.schedule.leave.map((period) => ({
      id: period.id,
      from: period.from,
      to: period.to,
      announceFrom: period.announceFrom,
    })),
  };
  for (const id of body.businesses) document.businesses[id] = schedule;
  document.revision = body.revision + 1;
  return saveHours(event, document, body.revision);
});
