<script setup lang="ts">
const siteUrl = "https://pracownia-krawiecka.pl";
const pageUrl = `${siteUrl}/realizacje`;
const title = "Realizacje przed i po | Pracownia krawiecka Poznań Piątkowo";
const description = "Zobacz naprawę kurtki, przetarcia jeansów i skracanie spodni z oryginalnym wykończeniem. Zdjęcia przed i po z Pracowni Krawieckiej Magdaleny Dekier w Poznaniu na Piątkowie.";
const realizations = [
  {
    id: "kurtka-puchowa",
    category: "Kurtka puchowa · naprawa",
    title: "Rozdarcie przy kieszeni kurtki puchowej",
    problem: "Materiał rozdarł się przy kieszeni, wzdłuż zamka.",
    work: "Zszyłam rozdarcie i wszyłam zamek na miejsce.",
    result: "Kieszeń zapina się tak jak wcześniej, a naprawy z zewnątrz nie widać.",
    images: [
      { src: "/images/realizacje/kurtka-puchowa-przed.jpg", alt: "Rozdarcie materiału przy zamku kieszeni beżowej kurtki puchowej przed naprawą", label: "Przed", width: 760, height: 950 },
      { src: "/images/realizacje/kurtka-puchowa-po.jpg", alt: "Kieszeń kurtki puchowej po zszyciu rozdarcia i ponownym wszyciu zamka", label: "Po", width: 760, height: 950 },
    ],
  },
  {
    id: "jeansy",
    category: "Jeansy · naprawa",
    title: "Przetarcie w kroku jeansów",
    problem: "Materiał przetarł się i rozdarł przy szwie siedzenia, w kroku.",
    work: "Podłożyłam od spodu kawałek denimu, przeszyłam przetarte miejsce gęstym ściegiem nitką w kolorze materiału i wzmocniłam szew.",
    result: "Materiał w kroku znowu jest mocny, a z zewnątrz naprawy prawie nie widać.",
    images: [
      { src: "/images/realizacje/jeansy-przetarcie-przed.jpg", alt: "Przetarcie i rozdarcie jeansów w kroku przy szwie siedzenia przed naprawą", label: "Przed", width: 720, height: 900 },
      { src: "/images/realizacje/jeansy-przetarcie-po.jpg", alt: "Jeansy po wzmocnieniu przetarcia denimem i przeszyciu nitką w kolorze materiału", label: "Po", width: 720, height: 900 },
    ],
  },
  {
    id: "jeansy-skrocenie",
    category: "Jeansy · skracanie",
    title: "Skracanie jeansów",
    problem: "Nogawki miały nierówną długość, a spodnie wymagały skrócenia.",
    work: "Podczas przymiarki zaznaczyłam długość nogawek, a potem wymierzyłam spodnie na stole i wyrównałam nogawki. Przycięłam je do odpowiedniej długości i doszyłam oryginalne wykończenie grubymi nićmi do jeansu.",
    result: "Spodnie zachowały oryginalne wykończenie, a dzięki równym nogawkom wyglądają lepiej niż przed skróceniem.",
    images: [
      { src: "/images/realizacje/jeansy-skrocenie-przed.webp", alt: "Jeansy przed skróceniem z miarą i zaznaczoną długością nogawek na stole krawieckim", label: "Przed", width: 2304, height: 4096 },
      { src: "/images/realizacje/jeansy-skrocenie-po.webp", alt: "Jeansy po skróceniu i wyrównaniu nogawek z doszytym oryginalnym wykończeniem", label: "Po", width: 2304, height: 4096 },
    ],
  },
  {
    id: "koszula-taliowanie",
    category: "Koszula · taliowanie",
    title: "Taliowanie koszuli",
    marks: false,
    problem: "Koszula była za szeroka w talii, a materiał na plecach tworzył zbędne fałdy.",
    work: "Podczas przymiarki wpięłam szpilki wzdłuż pleców i zaznaczyłam, ile materiału trzeba zabrać. Potem zwęziłam koszulę w talii, prowadząc szwy od linii pod ramionami aż do dołu.",
    result: "Koszula przylega do sylwetki w talii, a materiał na plecach leży gładko, bez zbędnych fałd.",
    images: [
      { src: "/images/realizacje/koszula-taliowanie-przed.webp", alt: "Bordowa sztruksowa koszula z tyłu z wpiętymi szpilkami, które zaznaczają miejsca do zwężenia w talii", label: "Przed", width: 450, height: 800 },
      { src: "/images/realizacje/koszula-taliowanie-po.webp", alt: "Bordowa sztruksowa koszula z tyłu po taliowaniu, z gładkimi plecami i dopasowaną talią", label: "Po", width: 450, height: 800 },
    ],
  },
];

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogType: "website",
  ogUrl: pageUrl,
  ogLocale: "pl_PL",
  ogImage: `${siteUrl}${realizations[0]!.images[1]!.src}`,
  ogImageAlt: realizations[0]!.images[1]!.alt,
  twitterCard: "summary_large_image",
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: `${siteUrl}${realizations[0]!.images[1]!.src}`,
});

useHead({
  link: [{ rel: "canonical", href: pageUrl }],
  script: [{
    type: "application/ld+json",
    textContent: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: title,
      description,
      inLanguage: "pl-PL",
      about: { "@id": `${siteUrl}/#localbusiness` },
      author: { "@type": "Person", name: "Magdalena Dekier" },
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: realizations.length,
        itemListElement: realizations.map((realization, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "CreativeWork",
            "@id": `${pageUrl}#${realization.id}`,
            url: `${pageUrl}#${realization.id}`,
            name: realization.title,
            description: `${realization.problem} ${realization.work} ${realization.result}`,
            image: realization.images.map((photo) => ({
              "@type": "ImageObject",
              contentUrl: `${siteUrl}${photo.src}`,
              caption: photo.alt,
              width: photo.width,
              height: photo.height,
            })),
          },
        })),
      },
    }),
  }],
});

const lightbox = ref<HTMLDialogElement | null>(null);
const selectedRealization = ref<(typeof realizations)[number] | null>(null);

useHead(() => ({
  htmlAttrs: {
    class: { "Realizations__scroll-locked": selectedRealization.value !== null },
  },
  bodyAttrs: {
    class: { "Realizations__scroll-locked": selectedRealization.value !== null },
  },
}));

const openPhotos = async (realization: (typeof realizations)[number]) => {
  selectedRealization.value = realization;
  await nextTick();
  lightbox.value?.showModal();
};

const closePhotos = () => lightbox.value?.close();

const closeOnBackdrop = (event: MouseEvent) => {
  const dialog = lightbox.value;
  if (!dialog || event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right ||
      event.clientY < bounds.top || event.clientY > bounds.bottom) closePhotos();
};

onBeforeUnmount(closePhotos);
</script>

<template>
  <main id="top" class="Page__main-container">
    <TopNavbar />
    <section class="Realizations__page" aria-labelledby="realizations-page-title">
      <div class="Realizations__page-inner">
        <header class="Realizations__page-header">
          <h1 id="realizations-page-title" class="Realizations__page-title">Realizacje</h1>
          <p class="Realizations__page-intro">Zdjęcia ubrań, które poprawiałam w mojej pracowni. Przy każdej realizacji opisuję, co dokładnie zrobiłam i jaki jest efekt.</p>
        </header>

        <article v-for="(realization, index) in realizations" :id="realization.id" :key="realization.id" class="Realizations__case" :aria-labelledby="`${realization.id}-title`">
          <div class="Realizations__comparison" :class="`Realizations__comparison--${realization.id}`">
            <figure v-for="photo in realization.images" :key="photo.src" class="Realizations__photo" :class="{ 'Realizations__photo--after': photo.label === 'Po' }">
              <img class="Realizations__case-image" :src="photo.src" :alt="photo.alt" :width="photo.width" :height="photo.height" :loading="index === 0 ? 'eager' : 'lazy'" decoding="async" />
              <figcaption class="Realizations__photo-tag" :class="{ 'Realizations__photo-tag--after': photo.label === 'Po' }">{{ photo.label }}</figcaption>
              <span v-if="realization.marks !== false" class="Realizations__photo-mark" aria-hidden="true" />
              <span v-if="photo.label === 'Po' && realization.marks !== false" class="Realizations__photo-note" aria-hidden="true">{{ realization.id === 'jeansy-skrocenie' ? 'Skrócone, równe nogawki' : realization.id === 'jeansy' ? 'Tu było przetarcie' : 'Tu było rozdarcie' }}</span>
            </figure>
          </div>

          <div class="Realizations__case-content">
            <p class="Realizations__case-category">{{ realization.category }}</p>
            <h2 :id="`${realization.id}-title`" class="Realizations__case-title">{{ realization.title }}</h2>
            <dl class="Realizations__details">
              <div class="Realizations__detail-row">
                <dt class="Realizations__detail-label">Problem</dt>
                <dd class="Realizations__detail-text">{{ realization.problem }}</dd>
              </div>
              <div class="Realizations__detail-row">
                <dt class="Realizations__detail-label">Co zrobiłam</dt>
                <dd class="Realizations__detail-text">{{ realization.work }}</dd>
              </div>
              <div class="Realizations__detail-row">
                <dt class="Realizations__detail-label">Efekt</dt>
                <dd class="Realizations__detail-text">{{ realization.result }}</dd>
              </div>
            </dl>
            <button class="Realizations__zoom" type="button" :aria-label="`Powiększ zdjęcia: ${realization.title}`" @click="openPhotos(realization)">
              <svg class="Realizations__zoom-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="10" cy="10" r="6" /><path d="m15 15 5 5M7 10h6M10 7v6" /></svg>
              Powiększ zdjęcia
            </button>
          </div>
        </article>
      </div>
    </section>

    <LazyContact />
    <OpeningStatus />

    <dialog ref="lightbox" class="Realizations__lightbox" aria-labelledby="realizations-lightbox-title" @click="closeOnBackdrop" @close="selectedRealization = null">
      <template v-if="selectedRealization">
        <div class="Realizations__lightbox-header">
          <h2 id="realizations-lightbox-title" class="Realizations__lightbox-title">{{ selectedRealization.title }}</h2>
          <button class="Realizations__lightbox-close" type="button" aria-label="Zamknij galerię" autofocus @click="closePhotos">
            <svg class="Realizations__lightbox-close-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6" /></svg>
          </button>
        </div>
        <div class="Realizations__lightbox-photos">
          <figure v-for="photo in selectedRealization.images" :key="photo.src" class="Realizations__lightbox-photo">
            <figcaption class="Realizations__lightbox-caption">{{ photo.label }}</figcaption>
            <img class="Realizations__lightbox-image" :src="photo.src" :alt="photo.alt" :width="photo.width" :height="photo.height" />
          </figure>
        </div>
      </template>
    </dialog>
  </main>
</template>

<style src="./index.scss" lang="scss"></style>
<style src="./realizacje.scss" lang="scss"></style>
