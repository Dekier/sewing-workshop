<script setup lang="ts">
const isVisible = ref(false);
const isCollapsed = ref(false);
const prefersReducedMotion = ref(false);
const hideButton = ref<HTMLButtonElement | null>(null);
const showButton = ref<HTMLButtonElement | null>(null);
const { data: businessHours } = await useBusinessHours();
const isOnLeave = computed(() => {
  const hours = businessHours.value;
  if (!hours) return false;
  return hours.schedule.leave.some(
    (period) => period.from <= hours.today && period.to >= hours.today,
  );
});
const status = computed(
  () =>
    businessHours.value?.status || {
      isOpen: false,
      title: "Godziny niedostępne",
      hours: "Skontaktuj się z pracownią",
    },
);

let appearanceTimer: ReturnType<typeof setTimeout>;
let motionPreference: MediaQueryList;

const updateMotionPreference = () => {
  prefersReducedMotion.value = motionPreference.matches;
};

const setCollapsed = (collapsed: boolean) => {
  isCollapsed.value = collapsed;
  nextTick(() => {
    (collapsed ? showButton.value : hideButton.value)?.focus({
      preventScroll: true,
    });
  });
};

const handleContactClick = () => {
  if (
    !hideButton.value ||
    getComputedStyle(hideButton.value).display !== "none"
  ) {
    return;
  }
  isVisible.value = false;
};

onMounted(() => {
  motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  updateMotionPreference();
  motionPreference.addEventListener("change", updateMotionPreference);
  appearanceTimer = setTimeout(() => {
    isVisible.value = true;
  }, 2000);
});

onBeforeUnmount(() => {
  clearTimeout(appearanceTimer);
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
        'OpeningStatus__main-container--leave': isOnLeave,
      }"
      aria-label="Godziny otwarcia pracowni"
    >
      <div class="OpeningStatus__stack">
        <a
          v-if="businessHours?.announcement"
          class="OpeningStatus__announcement"
          href="#contact"
          @click="handleContactClick"
        >
          <strong class="OpeningStatus__title">{{
            businessHours.announcement.title
          }}</strong>
          <span class="OpeningStatus__hours">{{
            businessHours.announcement.hours
          }}</span>
        </a>
        <div id="opening-status-details" class="OpeningStatus__details">
          <a
            class="OpeningStatus__link"
            href="#contact"
            @click="handleContactClick"
          >
            <svg
              class="OpeningStatus__clock"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="8.5" />
              <path d="M12 7v5l3 2" />
            </svg>
            <span
              class="OpeningStatus__text"
              aria-live="polite"
              aria-atomic="true"
            >
              <strong class="OpeningStatus__title">{{ status.title }}</strong>
              <span class="OpeningStatus__hours">{{ status.hours }}</span>
            </span>
            <svg
              class="OpeningStatus__arrow"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
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
            <svg
              class="OpeningStatus__close-icon"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="m7 7 10 10M17 7 7 17" />
            </svg>
          </button>
        </div>
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
        <svg
          class="OpeningStatus__clock"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7v5l3 2" />
        </svg>
        Godziny
      </button>
    </aside>
  </Transition>
</template>

<style src="./OpeningStatus.scss" lang="scss"></style>
