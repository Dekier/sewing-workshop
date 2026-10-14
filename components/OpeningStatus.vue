<script setup lang="ts">
const isVisible = ref(false);
const isCollapsed = ref(false);
const prefersReducedMotion = ref(false);
const hideButton = ref<HTMLButtonElement | null>(null);
const showButton = ref<HTMLButtonElement | null>(null);
const currentTime = ref(new Date());
const storageKey = "opening-status-collapsed";
const desktopStorageKey = "opening-status-desktop-dismissed";
const openingHours: Record<number, { opens: number; closes: number }> = {
  1: { opens: 9 * 60, closes: 18 * 60 },
  2: { opens: 8 * 60, closes: 17 * 60 },
  3: { opens: 8 * 60, closes: 17 * 60 },
  4: { opens: 9 * 60, closes: 18 * 60 },
};
const weekdays = [
  "Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota",
];
const formatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/Warsaw",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

const formatHour = (minutes: number) =>
  `${Math.floor(minutes / 60)}:${String(minutes % 60).padStart(2, "0")}`;
const formatHours = (hours: { opens: number; closes: number }) =>
  `${formatHour(hours.opens)}–${formatHour(hours.closes)}`;

const status = computed(() => {
  const parts = Object.fromEntries(
    formatter.formatToParts(currentTime.value).map((part) => [part.type, part.value]),
  );
  const weekday = new Date(
    Date.UTC(Number(parts.year), Number(parts.month) - 1, Number(parts.day)),
  ).getUTCDay();
  const minutes = Number(parts.hour) * 60 + Number(parts.minute);
  const today = openingHours[weekday];

  if (today && minutes >= today.opens && minutes < today.closes) {
    return {
      isOpen: true,
      title: `Otwarte do ${formatHour(today.closes)}`,
      hours: `Dziś ${formatHours(today)}`,
    };
  }

  if (today && minutes < today.opens) {
    return {
      isOpen: false,
      title: `Otwieramy o ${formatHour(today.opens)}`,
      hours: `Dziś ${formatHours(today)}`,
    };
  }

  for (let offset = 1; offset <= 7; offset++) {
    const nextWeekday = (weekday + offset) % 7;
    const next = openingHours[nextWeekday];
    if (next) {
      return {
        isOpen: false,
        title: today ? "Zamknięte" : "Dziś zamknięte",
        hours: `${offset === 1 ? "Jutro" : weekdays[nextWeekday]} ${formatHours(next)}`,
      };
    }
  }

  return { isOpen: false, title: "Zamknięte", hours: "Sprawdź godziny w Kontakcie" };
});

let appearanceTimer: ReturnType<typeof setTimeout>;
let clockTimer: ReturnType<typeof setTimeout>;
let motionPreference: MediaQueryList;

const updateClock = () => {
  currentTime.value = new Date();
  clockTimer = setTimeout(updateClock, 60000 - (Date.now() % 60000));
};

const updateMotionPreference = () => {
  prefersReducedMotion.value = motionPreference.matches;
};

const setCollapsed = (collapsed: boolean) => {
  isCollapsed.value = collapsed;
  try {
    sessionStorage.setItem(storageKey, String(collapsed));
  } catch {
    // Przy zablokowanym zapisie przyciski nadal działają w bieżącym widoku.
  }
  nextTick(() => {
    (collapsed ? showButton.value : hideButton.value)?.focus({ preventScroll: true });
  });
};

const handleContactClick = () => {
  if (!hideButton.value || getComputedStyle(hideButton.value).display !== "none") {
    return;
  }
  isVisible.value = false;
  clearTimeout(clockTimer);
  try {
    localStorage.setItem(desktopStorageKey, "true");
  } catch {
    // Przy zablokowanym zapisie kafelek nie wraca w bieżącym widoku.
  }
};

onMounted(() => {
  let isDesktopDismissed = false;
  try {
    isCollapsed.value = sessionStorage.getItem(storageKey) === "true";
    isDesktopDismissed = localStorage.getItem(desktopStorageKey) === "true";
  } catch {
    isCollapsed.value = false;
  }
  motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  updateMotionPreference();
  motionPreference.addEventListener("change", updateMotionPreference);
  // Ten sam próg co $phone w assets/stylesheets/main-variables.scss.
  if (isDesktopDismissed && window.innerWidth > 599) {
    return;
  }
  updateClock();
  appearanceTimer = setTimeout(() => { isVisible.value = true; }, 2000);
});

onBeforeUnmount(() => {
  clearTimeout(appearanceTimer);
  clearTimeout(clockTimer);
  motionPreference?.removeEventListener("change", updateMotionPreference);
});
</script>

<template>
  <Transition
    enter-active-class="OpeningStatus__enter-active"
    enter-from-class="OpeningStatus__enter-from"
    enter-to-class="OpeningStatus__enter-to"
    leave-active-class="OpeningStatus__leave-active"
    leave-from-class="OpeningStatus__leave-from"
    leave-to-class="OpeningStatus__leave-to"
  >
    <aside
      v-if="isVisible"
      class="OpeningStatus__main-container"
      :class="{
        'OpeningStatus__main-container--collapsed': isCollapsed,
        'OpeningStatus__main-container--reduced-motion': prefersReducedMotion,
        'OpeningStatus__main-container--closed': !status.isOpen,
      }"
      aria-label="Godziny otwarcia pracowni"
    >
      <div id="opening-status-details" class="OpeningStatus__details">
        <a class="OpeningStatus__link" href="#contact" @click="handleContactClick">
          <svg class="OpeningStatus__clock" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="8.5" />
            <path d="M12 7v5l3 2" />
          </svg>
          <span class="OpeningStatus__text" aria-live="polite" aria-atomic="true">
            <strong class="OpeningStatus__title">{{ status.title }}</strong>
            <span class="OpeningStatus__hours">{{ status.hours }}</span>
          </span>
          <svg class="OpeningStatus__arrow" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12h14m-5-5 5 5-5 5" />
          </svg>
        </a>
        <button
          ref="hideButton"
          class="OpeningStatus__hide-button"
          type="button"
          aria-label="Schowaj godziny otwarcia"
          aria-controls="opening-status-details"
          @click="setCollapsed(true)"
        >
          <svg class="OpeningStatus__close-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="m7 7 10 10M17 7 7 17" />
          </svg>
        </button>
      </div>
      <button
        ref="showButton"
        class="OpeningStatus__show-button"
        type="button"
        aria-label="Pokaż godziny otwarcia"
        aria-controls="opening-status-details"
        :aria-expanded="!isCollapsed"
        @click="setCollapsed(false)"
      >
        <svg class="OpeningStatus__clock" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7v5l3 2" />
        </svg>
        Godziny
      </button>
    </aside>
  </Transition>
</template>

<style src="./OpeningStatus.scss" lang="scss"></style>
