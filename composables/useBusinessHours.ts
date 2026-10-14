import type { PublicHours } from "../shared/business-hours";

export const useBusinessHours = () =>
  useFetch<PublicHours>("/api/hours", {
    key: "business-hours",
    query: { business: "workshop" },
    dedupe: "defer",
  });
