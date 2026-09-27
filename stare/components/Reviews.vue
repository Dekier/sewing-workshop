<template>
  <section class="Reviews__main-container">
    <div class="Reviews__center-container">
      <div class="Reviews__header">
        <h2 class="Reviews__title">
          Zaufało nam już ponad 23 500 osób w Poznaniu!
        </h2>
        <div class="Reviews__nav">
          <button
            @click="prev"
            :disabled="currentIndex === 0"
            class="Reviews__nav-btn"
          >
            <img
              src="/icons/arrow-right.svg"
              alt="icon arrow"
              class="Reviews__nav-btn-icon-left"
            />
          </button>
          <button
            @click="next"
            :disabled="currentIndex >= maxIndex"
            class="Reviews__nav-btn"
          >
            <img
              src="/icons/arrow-right.svg"
              alt="icon arrow"
              class="Reviews__nav-btn-icon-right"
            />
          </button>
        </div>
      </div>

      <div
        class="Reviews__viewport"
        @touchstart="handleTouchStart"
        @touchend="handleTouchEnd"
      >
        <div
          class="Reviews__track"
          :style="{
            transform: `translateX(-${currentIndex * (100 / visibleItems)}%)`,
          }"
        >
          <div
            v-for="(review, index) in reviews"
            :key="index"
            class="Reviews__slide"
          >
            <div class="ReviewCard">
              <div class="ReviewCard__header">
                <div class="ReviewCard__stars">★★★★★</div>
                <div class="ReviewCard__author">
                  {{ review.author_name?.split(" ")[0] }}
                  |
                  {{ review.date }}
                </div>
              </div>
              <p class="ReviewCard__text">
                <template v-if="review.text?.length > 160">
                  {{
                    review.isExpanded
                      ? review.text
                      : review.text.slice(0, 160) + "..."
                  }}

                  <button
                    @click.prevent="toggleText(index)"
                    class="ReviewCard__text-button"
                  >
                    {{ review.isExpanded ? "pokaż mniej" : "czytaj więcej" }}
                  </button>
                </template>

                <template v-else>
                  {{ review.text || "Klient nie zostawił opisu." }}
                </template>
              </p>
              <div class="ReviewCard__footer">
                Opinia z
                <img src="/icons/google.svg" alt="Google" />
              </div>
            </div>
          </div>
        </div>
        <a
          class="Reviews__box-btn"
          target="_black"
          href="https://maps.app.goo.gl/8QKAHnphABoH6E5r6"
          >Zobacz wszystkie opinie
          <div class="Reviews__btn-arrow-box">
            <img
              src="/icons/arrow.svg"
              alt="icon arrow"
              class="Reviews__btn-arrow-icon"
            /></div
        ></a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Pobieramy dane
const { data: fetchedReviews } = await useFetch("/api/reviews");

// Tworzymy reaktywną kopię opinii z dodatkowym polem isExpanded
const reviews = ref([]);

watchEffect(() => {
  if (fetchedReviews.value) {
    reviews.value = fetchedReviews.value.map((r: any) => ({
      ...r,
      isExpanded: false,
    }));
  }
});

const currentIndex = ref(0);
const visibleItems = ref(4);

// Funkcja przełączania tekstu
const toggleText = (index: number) => {
  reviews.value[index].isExpanded = !reviews.value[index].isExpanded;
};

const updateVisibleItems = () => {
  if (process.client) {
    if (window.innerWidth < 768) visibleItems.value = 1;
    else if (window.innerWidth < 1024) visibleItems.value = 2;
    else visibleItems.value = 4;
  }
};

onMounted(() => {
  updateVisibleItems();
  window.addEventListener("resize", updateVisibleItems);
});

const maxIndex = computed(() => {
  return reviews.value
    ? Math.max(0, reviews.value.length - visibleItems.value)
    : 0;
});

const next = () => {
  if (currentIndex.value < maxIndex.value) currentIndex.value++;
};
const prev = () => {
  if (currentIndex.value > 0) currentIndex.value--;
};

// Zmienne do obsługi dotyku
const touchStartX = ref(0);
const touchEndX = ref(0);

const handleTouchStart = (e: TouchEvent) => {
  touchStartX.value = e.touches[0].clientX;
};

const handleTouchEnd = (e: TouchEvent) => {
  touchEndX.value = e.changedTouches[0].clientX;
  handleSwipe();
};

const handleSwipe = () => {
  const swipeThreshold = 50; // minimalna odległość w px, aby uznać to za swipe
  const diff = touchStartX.value - touchEndX.value;

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // Przesunięcie w lewo -> następny
      next();
    } else {
      // Przesunięcie w prawo -> poprzedni
      prev();
    }
  }
};
</script>
<style lang="scss">
@use "./Reviews.scss" as *;
</style>
