export const businessIds = ["workshop", "dezal"] as const;
export type BusinessId = (typeof businessIds)[number];
export const weekdayNames = [
  "Niedziela",
  "Poniedziałek",
  "Wtorek",
  "Środa",
  "Czwartek",
  "Piątek",
  "Sobota",
];
export const weekdayOrder = [1, 2, 3, 4, 5, 6, 0];
export const schemaWeekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
export interface DayHours {
  opens: string;
  closes: string;
}
export interface LeavePeriod {
  id: string;
  from: string;
  to: string;
  announceFrom: string;
}
export interface BusinessSchedule {
  week: (DayHours | null)[];
  leave: LeavePeriod[];
}
export interface HoursDocument {
  revision: number;
  businesses: Record<BusinessId, BusinessSchedule>;
}
export interface PublicHours {
  business: BusinessId;
  schedule: BusinessSchedule;
  status: { isOpen: boolean; title: string; hours: string };
  announcement: { title: string; hours: string } | null;
  today: string;
}

export function warsawTime(now = new Date()) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Warsaw",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    })
      .formatToParts(now)
      .map((part) => [part.type, part.value]),
  );
  return {
    date: `${parts.year}-${parts.month}-${parts.day}`,
    time: `${parts.hour}:${parts.minute}`,
  };
}

export function addDays(date: string, count: number) {
  const value = new Date(`${date}T12:00:00Z`);
  value.setUTCDate(value.getUTCDate() + count);
  return value.toISOString().slice(0, 10);
}

export const dateLabel = (date: string) =>
  new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T12:00:00Z`));
export const hoursLabel = (day: DayHours | null) =>
  day ? `${day.opens}–${day.closes}` : "Nieczynne";

export function publicHours(
  business: BusinessId,
  schedule: BusinessSchedule,
  now = new Date(),
): PublicHours {
  const { date, time } = warsawTime(now);
  const leave = [...schedule.leave].sort((a, b) =>
    a.from.localeCompare(b.from),
  );
  const active = leave.find(
    (period) => period.from <= date && period.to >= date,
  );
  const upcoming = leave.find(
    (period) => period.from > date && period.announceFrom <= date,
  );
  const weekday = (value: string) => new Date(`${value}T12:00:00Z`).getUTCDay();
  const today = schedule.week[weekday(date)];
  let next: { date: string; day: DayHours } | null = null;
  if (schedule.week.some(Boolean)) {
    let candidate = active
      ? addDays(active.to, 1)
      : today && time < today.opens
        ? date
        : addDays(date, 1);
    // Each leave can advance the search; seven further days cover a complete working week.
    for (let count = 0; count < (leave.length + 1) * 8; count++) {
      const holiday = leave.find(
        (period) => period.from <= candidate && period.to >= candidate,
      );
      if (holiday) {
        candidate = addDays(holiday.to, 1);
        continue;
      }
      const day = schedule.week[weekday(candidate)];
      if (day) {
        next = { date: candidate, day };
        break;
      }
      candidate = addDays(candidate, 1);
    }
  }
  const nextLabel = next
    ? `${next.date === addDays(date, 1) ? "Jutro" : dateLabel(next.date)} ${hoursLabel(next.day)}`
    : "Termin otwarcia nie został jeszcze ustalony";
  let status: PublicHours["status"];
  if (active) {
    status = {
      isOpen: false,
      title: `Mamy wolne do ${dateLabel(active.to)}`,
      hours: next
        ? `Wracamy ${dateLabel(next.date)} o ${next.day.opens}`
        : nextLabel,
    };
  } else if (today && time >= today.opens && time < today.closes) {
    status = {
      isOpen: true,
      title: `${business === "dezal" ? "Biuro czynne" : "Otwarte"} do ${today.closes}`,
      hours: `Dziś ${hoursLabel(today)}`,
    };
  } else if (today && time < today.opens) {
    status = {
      isOpen: false,
      title: `Otwieramy o ${today.opens}`,
      hours: `Dziś ${hoursLabel(today)}`,
    };
  } else {
    status = {
      isOpen: false,
      title: today ? "Zamknięte" : "Dziś zamknięte",
      hours: nextLabel,
    };
  }
  return {
    business,
    schedule: {
      week: schedule.week,
      leave: leave.filter(
        (period) => period.to >= date && period.announceFrom <= date,
      ),
    },
    status,
    announcement: upcoming
      ? {
          title: "Planowane wolne",
          hours: `${dateLabel(upcoming.from)} – ${dateLabel(upcoming.to)}`,
        }
      : null,
    today: date,
  };
}

export const schemaHours = (schedule?: BusinessSchedule) =>
  schedule?.week.map((day, index) => ({
    "@type": "OpeningHoursSpecification" as const,
        dayOfWeek: schemaWeekdays[index]!,
    opens: day?.opens ?? "00:00",
    closes: day?.closes ?? "00:00",
  })) ?? [];
export const schemaLeave = (schedule?: BusinessSchedule) =>
  schedule?.leave.map((period) => ({
    "@type": "OpeningHoursSpecification" as const,
    opens: "00:00",
    closes: "00:00",
    validFrom: period.from,
    validThrough: period.to,
  })) ?? [];
