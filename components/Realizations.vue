<script setup lang="ts">
interface Realization {
  image: string;
  imageAlt: string;
  description?: string;
}

const realizations: Realization[] = [
  {
    image: "/images/dresses-blue-big.webp",
    imageAlt: "Niebieska sukienka z rozkloszowanym dołem",
    description: "Niebieska sukienka",
  },
  {
    image: "/images/coat-camel-big.webp",
    imageAlt: "Beżowy płaszcz wiązany w pasie",
  },
  {
    image: "/images/trousers-charcoal-big.webp",
    imageAlt: "Grafitowe spodnie w kant",
    description: "Spodnie w kant",
  },
  {
    image: "/images/jacket-navy-big.webp",
    imageAlt: "Granatowa marynarka z białą koszulą",
  },
  {
    image: "/images/skirt-rose-big.webp",
    imageAlt: "Bordowa spódnica z zakładkami",
    description: "Bordowa spódnica",
  },
  {
    image: "/images/jeans-blue.webp",
    imageAlt: "Niebieskie jeansy z prostymi nogawkami",
  },
];

const viewport = ref<HTMLElement | null>(null);
const currentIndex = ref(0);
const scrollOffset = ref(0);
const maxScroll = ref(0);
let resizeObserver: ResizeObserver | undefined;

const canGoBack = computed(() => scrollOffset.value > 1);
const canGoForward = computed(() => scrollOffset.value < maxScroll.value - 1);

const getSlides = () =>
  Array.from(viewport.value?.querySelectorAll<HTMLElement>(".Realizations__slide") ?? []);

const updatePosition = () => {
  const element = viewport.value;
  if (!element) return;

  maxScroll.value = Math.max(0, element.scrollWidth - element.clientWidth);
  scrollOffset.value = Math.max(0, element.scrollLeft);

  let nearestIndex = 0;
  let nearestDistance = Infinity;

  getSlides().forEach((slide, index) => {
    const distance = Math.abs(
      Math.min(slide.offsetLeft, maxScroll.value) - scrollOffset.value,
    );

    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestIndex = index;
    }
  });

  currentIndex.value = nearestIndex;
};

const scrollToPosition = (position: number) => {
  viewport.value?.scrollTo({
    left: Math.max(0, Math.min(position, maxScroll.value)),
    behavior: "auto",
  });
  updatePosition();
};

const move = (direction: -1 | 1) => {
  const positions = getSlides().map((slide) => Math.min(slide.offsetLeft, maxScroll.value));
  const position = direction === 1
    ? positions.find((value) => value > scrollOffset.value + 1)
    : positions.reverse().find((value) => value < scrollOffset.value - 1);

  if (position !== undefined) scrollToPosition(position);
};

const handleKeydown = (event: KeyboardEvent) => {
  if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
  event.preventDefault();

  if (event.key === "ArrowLeft") move(-1);
  else if (event.key === "ArrowRight") move(1);
  else scrollToPosition(event.key === "Home" ? 0 : maxScroll.value);
};

onMounted(() => {
  updatePosition();
  resizeObserver = new ResizeObserver(() => {
    const slide = getSlides()[currentIndex.value];
    const element = viewport.value;
    if (!element) return;

    maxScroll.value = Math.max(0, element.scrollWidth - element.clientWidth);
    scrollToPosition(slide?.offsetLeft ?? 0);
  });

  if (viewport.value) resizeObserver.observe(viewport.value);
});

onBeforeUnmount(() => resizeObserver?.disconnect());
</script>

<template>
  <section id="realizations" class="Realizations__main-container" aria-labelledby="realizations-title">
    <div class="Realizations__inner">
      <div class="Realizations__header">
        <div class="Realizations__heading">
          <h2 id="realizations-title" class="Realizations__title">Realizacje</h2>
          <p class="Realizations__intro">Wybrane zdjęcia odzieży i detali krawieckich.</p>
        </div>

        <div class="Realizations__nav" aria-label="Sterowanie karuzelą">
          <button
            class="Realizations__nav-btn"
            type="button"
            aria-label="Poprzednie realizacje"
            aria-controls="realizations-carousel"
            :disabled="!canGoBack"
            @click="move(-1)"
          >
            <svg class="Realizations__nav-icon" viewBox="0 0 20 20" aria-hidden="true">
              <path class="Realizations__nav-path" d="M13 4 7 10 13 16" />
            </svg>
            Wstecz
          </button>
          <button
            class="Realizations__nav-btn"
            type="button"
            aria-label="Następne realizacje"
            aria-controls="realizations-carousel"
            :disabled="!canGoForward"
            @click="move(1)"
          >
            Dalej
            <svg class="Realizations__nav-icon" viewBox="0 0 20 20" aria-hidden="true">
              <path class="Realizations__nav-path" d="m7 4 6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>

      <div
        id="realizations-carousel"
        ref="viewport"
        class="Realizations__viewport"
        role="region"
        aria-roledescription="karuzela"
        aria-label="Zdjęcia odzieży. Przewijaj strzałkami lub gestem."
        tabindex="0"
        @scroll.passive="updatePosition"
        @keydown="handleKeydown"
      >
        <figure
          v-for="(realization, index) in realizations"
          :key="realization.image"
          class="Realizations__slide"
          :aria-label="`${index + 1} z ${realizations.length}`"
          aria-roledescription="slajd"
        >
          <img
            class="Realizations__image"
            :src="realization.image"
            :alt="realization.imageAlt"
            loading="lazy"
            decoding="async"
          />
          <figcaption v-if="realization.description" class="Realizations__caption">
            {{ realization.description }}
          </figcaption>
        </figure>
      </div>

      <div class="Realizations__footer">
        <p class="Realizations__counter" aria-live="polite" aria-atomic="true">
          <span class="Realizations__sr-only">Zdjęcie </span>
          {{ currentIndex + 1 }} / {{ realizations.length }}
        </p>
        <div class="Realizations__progress" aria-hidden="true">
          <span
            v-for="(realization, index) in realizations"
            :key="realization.image"
            class="Realizations__progress-segment"
            :class="{ 'Realizations__progress-segment--active': index === currentIndex }"
          />
        </div>
      </div>
      <p class="Realizations__note">Zdjęcia poglądowe.</p>
    </div>
  </section>
</template>

<style src="./Realizations.scss" lang="scss"></style>
