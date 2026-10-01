<template>
  <section id="reviews" class="Reviews__main-container">
    <div class="Reviews__center-container">
      <div class="Reviews__header">
        <h2 class="Reviews__title">
          Zaufało nam już ponad 23 500!
        </h2>
        <div class="Reviews__nav">
          <button
            @click="prev"
            :disabled="currentIndex === 0"
            aria-label="Poprzednie opinie"
            class="Reviews__nav-btn"
          >
            <img src="/icons/arrow-right.svg" alt="" class="Reviews__nav-btn-icon-left" />
          </button>
          <button
            @click="next"
            :disabled="currentIndex >= maxIndex"
            aria-label="Następne opinie"
            class="Reviews__nav-btn"
          >
            <img src="/icons/arrow-right.svg" alt="" class="Reviews__nav-btn-icon-right" />
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
                <div class="ReviewCard__stars" :aria-label="`Ocena: ${review.rating} na 5`">
                  {{ "★".repeat(review.rating ?? 0) }}
                </div>
                <div class="ReviewCard__author">
                  {{ review.author_name }}
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
      </div>
      <a
        class="Reviews__box-btn"
        target="_blank"
        rel="noopener noreferrer"
        href="https://maps.app.goo.gl/8QKAHnphABoH6E5r6"
      >
        Zobacz wszystkie opinie
        <span class="Reviews__btn-arrow-box">
          <img src="/icons/arrow.svg" alt="" class="Reviews__btn-arrow-icon" />
        </span>
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
// Opinie przepisane ze zrzutów; ucięte fragmenty zachowują wielokropek.
const reviews = ref([
  {
    author_name: "Dorota Thomas",
    rating: 5,
    date: "miesiąc temu",
    text: "Korzystam z usług Pani Magdy regularnie - od prostego skracania spodni i sukienek po modyfikowanie dekoltów w bluzkach. Kilka lat temu nawet szyłam u niej sukienkę koktajlową wg własnego projektu! I zawsze jestem zadowolona z efektu, każda ...",
  },
  {
    author_name: "Paweł Mikołajczyk",
    rating: 5,
    date: "miesiąc temu",
    text: "Mój garnitur odzyskał dawną świetność. Skrócone rękawy marynarki, poszerzone spodnie w pasie + skrócone nogawki. Pani bardzo miła i od razu widać pełen profesjonalizm i znajomość sztuki krawieckiej. Usługa wykonana wzorowo i bez widocznych ...",
  },
  {
    author_name: "Bodzio K .",
    rating: 5,
    date: "3 miesiące temu",
    text: "Byłem u Pani Magdaleny z poprawkami do garnituru. Szybko, profesjonalnie, polecam!",
  },
  {
    author_name: "Natalia Boduszek",
    rating: 5,
    date: "rok temu",
    text: 'Pani Magdalena miała baaardzo trudne zadanie z moją "falbaniastą" sukienką.. Jednak poradziła sobie świetnie! Sukienka nie straciła swojego uroku, wszystko zostało skrócone z wielką starannością. Pani włożyła w to dużo czasu, ponieważ byłam ...',
  },
  {
    author_name: "Grzegorz Kucz",
    rating: 5,
    date: "rok temu",
    text: "Oddając garnitur na przerobienie nie wiedziałem, czego mogę się spodziewać. Efekt przeszedł moje oczekiwania. Bardzo dobrze pasował. Pani bardzo uprzejma i widać, że zna się na pracy. Następnym razem tez się do niej zwrócę 😜",
  },
  {
    author_name: "Maciej Niemowny",
    rating: 5,
    date: "rok temu",
    text: "Zdecydowanie polecam, pani Magdalena podjęła się przeróbki garnituru ślubnego w ekspresowym terminie. Jakość pracy 10/10!",
  },
  {
    author_name: "Łukasz Florkowski",
    rating: 5,
    date: "10 miesięcy temu",
    text: "Szybka i profesjonalna usługa w dobrej cenie. Dzięki takim krawcom można dać ubraniom drugie życie, a nie tylko wyrzucać i kupować nowe 🙏",
  },
  {
    author_name: "Patryk Bogdan",
    rating: 5,
    date: "2 lata temu",
    text: "Bardzo polecam pracownię, często przynoszę eleganckie ubrania(marynarki, spodnie z wysokim stanem, itp.). Terminy są zadowalające i jakość usług również wysoki poziom. Cena nieco wyższa niż konkurencja ale jest tego warta ...",
  },
  {
    author_name: "Dominika Mikołajczyk",
    rating: 5,
    date: "rok temu",
    text: "Z całego serca polecam! Na ostatnią chwilę zaniosłam do Pani Dekier sukienkę wieczorową do zwężenia. Pani poradziła sobie rewelacyjnie z sukienką. Uszyte zostało wszystko bardzo precyzyjnie, zupełnie jak od producenta - tylko, że na miarę:) Sukienka do odbioru była już na następny dzień, za co jestem bardzo wdzięczna. 10/10 mistrzostwo!",
  },
].map((review) => ({
  ...review,
  isExpanded: false,
})));

const currentIndex = ref(0);
const visibleItems = ref(4);

// Funkcja przełączania tekstu
const toggleText = (index: number) => {
  reviews.value[index].isExpanded = !reviews.value[index].isExpanded;
};

const updateVisibleItems = () => {
  if (process.client) {
    if (window.innerWidth < 768) visibleItems.value = 1;
    else if (window.innerWidth < 1170) visibleItems.value = 2;
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
