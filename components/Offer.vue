<template>
  <section id="offer" class="Offer__main-container">
    <div class="Offer__inner">
      <div class="Offer__heading-row">
        <h2 class="Offer__offer-title">Oferuję</h2>
        <p class="Offer__intro">Przeróbki odzieży damskiej i męskiej oraz tekstyliów domowych.</p>
      </div>

      <div class="Offer__grid">
        <article v-for="service in services" :key="service.title" class="Offer__service">
          <div class="Offer__image-wrap">
            <img
              class="Offer__image"
              :src="service.image"
              :alt="service.imageAlt"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div class="Offer__service-content">
            <h3 class="Offer__service-title">{{ service.title }}</h3>
            <ul class="Offer__service-list">
              <li v-for="item in service.info" :key="item">{{ item }}</li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const services = [
  {
    title: "Marynarki",
    image: "/images/jacket-navy.webp",
    imageAlt: "Mężczyzna w granatowej marynarce na ulicy",
    info: ["Skracanie długości", "Skracanie rękawów", "Zwężanie ramion", "Taliowanie", "Przyszywanie guzików"],
  },
  {
    title: "Koszule",
    image: "/images/shirt-ivory.webp",
    imageAlt: "Kobieta w białej koszuli na dziedzińcu",
    info: ["Skracanie długości", "Skracanie rękawów", "Zwężanie", "Taliowanie"],
  },
  {
    title: "Spodnie",
    image: "/images/trousers-charcoal.webp",
    imageAlt: "Mężczyzna w grafitowych spodniach na ulicy",
    info: ["Skracanie długości", "Wydłużanie", "Wszywanie zamków", "Zwężanie w pasie", "Zwężanie nogawek"],
  },
  {
    title: "Suknie",
    image: "/images/dresses-blue.webp",
    imageAlt: "Kobieta w niebieskiej sukni w ogrodzie",
    info: ["Skracanie długości", "Skracanie rękawów", "Zwężanie", "Taliowanie", "Zmiana dekoltu", "Wszywanie zamków"],
  },
  {
    title: "Spódniczki",
    image: "/images/skirt-rose.webp",
    imageAlt: "Kobieta w bordowej spódnicy w ogrodzie",
    info: ["Zwężanie", "Skracanie długości", "Wszywanie zamków", "Wymiana podszewki"],
  },
  {
    title: "Jeansy",
    image: "/images/jeans-blue.webp",
    imageAlt: "Kobieta w niebieskich jeansach na dziedzińcu",
    info: ["Skracanie długości", "Wszywanie zamków", "Zwężanie w pasie", "Zwężanie nogawek", "Naszywanie łat", "Skracanie z oryginalnym dołem"],
  },
  {
    title: "Płaszcze",
    image: "/images/coat-camel.webp",
    imageAlt: "Kobieta w beżowym płaszczu na ulicy",
    info: ["Skracanie długości", "Skracanie rękawów", "Zwężanie", "Przyszywanie guzików"],
  },
  {
    title: "Mundury",
    image: "/images/mundur-polish.webp",
    imageAlt: "Oliwkowy mundur z polską flagą w plenerze",
    info: ["Zwężanie: marynarek, spodni, spódnic, koszul", "Skracanie: spodni, spódniczek, koszul", "Przyszywanie emblematów"],
  },
  {
    title: "Zasłony i obrusy",
    image: "/images/curtains-linen.webp",
    imageAlt: "Lniane zasłony i obrus w jasnej jadalni",
    info: ["Skracanie", "Obszywanie"],
  },
];
</script>

<style lang="scss">
@import "Offer";
</style>
