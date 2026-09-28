<script setup lang="ts">
useSeoMeta({
  title: "Pracownia krawiecka Magdaleny Dekier | Poznań Piątkowo",
  ogTitle: "Pracownia krawiecka Magdaleny Dekier | Poznań Piątkowo",
  description:
    "Pracownia krawiecka w Poznaniu (Piątkowo). Przeróbki sukien, garniturów i naprawa odzieży. Tradycja od 1993 r. Zapraszamy na ul. Jaroczyńskiego 41!",
  ogDescription:
    "Pracownia krawiecka w Poznaniu (Piątkowo). Przeróbki sukien, garniturów i naprawa odzieży. Tradycja od 1993 r. Zapraszamy na ul. Jaroczyńskiego 41!",
  ogType: "website",
});

useHead({
  htmlAttrs: {
    lang: "pl",
  },
  link: [{ rel: "canonical", href: "https://pracownia-krawiecka.pl" }],
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
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
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Thursday"],
            opens: "09:00",
            closes: "18:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Tuesday", "Wednesday"],
            opens: "08:00",
            closes: "17:00",
          },
        ],
      }),
    },
  ],
});
</script>

<template>
  <main class="Page__main-container">
    <TopNavbar />
    <Intro />
    <LazyOffer />
    <AboutCompany />
    <LazyReviews />
    <LazyRecommended />
    <LazyContact />
  </main>
</template>

<style lang="scss">
@import "index";
</style>
