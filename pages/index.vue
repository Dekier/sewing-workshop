<script setup lang="ts">
import { schemaHours, schemaLeave } from "../shared/business-hours";
const { data: businessHours } = await useBusinessHours();
useSeoMeta({
  title: "Pracownia krawiecka Magdaleny Dekier | Poznań Piątkowo",
  ogTitle: "Pracownia krawiecka Magdaleny Dekier | Poznań Piątkowo",
  description:
    "Pracownia krawiecka w Poznaniu (Piątkowo). Przeróbki sukien, garniturów i naprawa odzieży. Tradycja od 1993 r. Zapraszamy na ul. Jaroczyńskiego 41!",
  ogDescription:
    "Pracownia krawiecka w Poznaniu (Piątkowo). Przeróbki sukien, garniturów i naprawa odzieży. Tradycja od 1993 r. Zapraszamy na ul. Jaroczyńskiego 41!",
  ogType: "website",
});

useHead(() => ({
  htmlAttrs: {
    lang: "pl",
  },
  link: [{ rel: "canonical", href: "https://pracownia-krawiecka.pl" }],
  script: [
    {
      type: "application/ld+json",
      textContent: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "PRACOWNIA KRAWIECKA Magdaleny Dekier Poznań",
        // image: "https://pracownia-krawiecka.pl/images/og-image.jpg",
        "@id": "https://pracownia-krawiecka.pl/#localbusiness",
        url: "https://pracownia-krawiecka.pl",
        telephone: "+48691860192",
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          streetAddress: "ul. Jaroczyńskiego 41",
          addressLocality: "Poznań",
          postalCode: "60-692",
          addressCountry: "PL",
        },
        openingHoursSpecification: schemaHours(businessHours.value?.schedule),
        specialOpeningHoursSpecification: schemaLeave(
          businessHours.value?.schedule,
        ),
      }),
    },
  ],
}));
</script>

<template>
  <main class="Page__main-container">
    <TopNavbar />
    <Intro />
    <LazyOffer />
    <AboutCompany />
    <!-- Realizacje tymczasowo ukryte: <LazyRealizations /> -->
    <LazyReviews />
    <LazyRecommended />
    <LazyContact />
    <OpeningStatus />
  </main>
</template>

<style src="./index.scss" lang="scss"></style>
