<template>
  <div id="offer" class="Offer__main-container">
    <div class="Offer__left-container">
      <h3 class="Offer__offer-title-mobile">Oferta</h3>
      <div
        data-aos="fade-right"
        v-for="(data, index) in boxesDataRight"
        :key="index"
        class="Offer__box-container"
      >
        <div class="Offer__image-container-left">
          <div :style="backgroundStyle(data.url)" class="Offer__image" />
        </div>
        <div class="Offer__box-info-left">
          <div class="Offer__box-info">
            <span
              class="Offer__info"
              v-for="(info, index) in data.info"
              :key="index"
            >
              - {{ info }}
            </span>
          </div>
          <div class="Offer__box-name-left">
            <span>
              {{ data.title }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="Offer__right-container">
      <h3 class="Offer__offer-title">Oferta</h3>
      <div
        data-aos="fade-left"
        v-for="(data, index) in boxesDataLeft"
        :key="index"
        class="Offer__box-container"
      >
        <div class="Offer__image-container-right">
          <div :style="backgroundStyle(data.url)" class="Offer__image" />
        </div>
        <div class="Offer__box-info-right">
          <div class="Offer__box-name-right">
            <span>
              {{ data.title }}
            </span>
          </div>
          <div class="Offer__box-info">
            <span
              class="Offer__info"
              v-for="(info, index) in data.info"
              :key="index"
            >
              - {{ info }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Offer",

  data() {
    return {
      boxesDataRight: [
        {
          url: "/images/dresses.jpg",
          title: "SUKNIE",
          info: [
            "Skracanie Długości",
            "Skracanie Rękawów",
            "Zwężanie",
            "Taliowanie",
            "Zmiana Dekoltu",
            " Wszywanie zamków"
          ]
        },
        {
          url: "/images/shirt2.jpg",
          title: "KOSZULE",
          info: [
            "Skracanie Długości",
            "Skracanie Rękawów",
            "Zwężanie",
            "Taliowanie"
          ]
        },
        {
          url: "/images/jeans.jpg",
          title: "JEANS",
          info: [
            "Skracanie Długości",
            "Skracanie z Orginalnym Dołem",
            "Wszywanie zamków",
            "Zwężanie w Pasie",
            "Zwężanie Nogawek",
            "Naszywanie Łat"
          ]
        },
        {
          url: "/images/coat.jpg",
          title: "PŁASZCZE",
          info: [
            "Skracanie Długości",
            "Skracanie Rękawów",
            "Zwężanie",
            "Pszyszywanie Guzików"
          ]
        }
      ],
      boxesDataLeft: [
        {
          url: "/images/trausers.jpg",
          title: "SPODNIE",
          info: [
            "Skracanie Długości",
            "Wydłużanie",
            "Wszywanie Zamków",
            "Zwężanie w Pasie",
            "Zwężanie Nogawek"
          ]
        },
        {
          url: "/images/skirt.jpg",
          title: "SPÓDNICE",
          info: [
            "Zwężanie",
            "Skracanie Długości",
            "Wszywanie Zamków",
            "Wymiana Podszewki"
          ]
        },
        {
          url: "/images/jacket.jpg",
          title: "MARYNARKI",
          info: [
            "Skracanie Długości",
            "Skracanie Rękawów",
            "Zwężanie",
            "Taliowanie",
            "Przyszywanie Guzików"
          ]
        },
        {
          url: "/images/room.jpg",
          title: "ZASŁONY i OBRUSY",
          info: ["Skracanie", "Obszywanie"]
        }
      ]
    };
  },

  methods: {
    backgroundStyle(url, index) {
      if (index === 5) {
        return {
          "background-image": `url(${url})`,
          "background-size": "cover",
          "background-repeat": "no-repeat"
        };
      } else {
        return {
          "background-image": `url(${url})`,
          "background-size": "cover",
          "background-repeat": "no-repeat",
          "background-position": "50%"
        };
      }
    }
  }
};
</script>

<style lang="scss">
@import "Offer";
</style>


