<template>
  <div id="offer" class="Offer__main-container">
    <h3 class="Offer__offer-title">Oferta</h3>
    <div class="Offer__center-container">
      <div class="Offer__left-container">
        <div
          v-for="(data, index) in boxesDataRight"
          :key="index"
          class="Offer__box-container"
        >
          <div class="Offer__image-container-left">
            <div :style="backgroundStyle(data.url)" class="Offer__image" />
          </div>
          <div class="Offer__box-info-left">
            <div class="Offer__box-name-left">{{ data.title }}</div>
            <div class="Offer__box-info">
              <span
                class="Offer__info"
                v-for="(info, index) in data.info"
                :key="index"
                >• {{ info }}</span
              >
            </div>
          </div>
        </div>
      </div>
      <div class="Offer__right-container">
        <div
          v-for="(data, index) in boxesDataLeft"
          :key="index"
          class="Offer__box-container"
        >
          <div class="Offer__image-container-right">
            <div :style="backgroundStyle(data.url)" class="Offer__image" />
          </div>
          <div class="Offer__box-info-right">
            <div class="Offer__box-name-right">{{ data.title }}</div>
            <div class="Offer__box-info">
              <span
                class="Offer__info"
                v-for="(info, index) in data.info"
                :key="index"
                >• {{ info }}</span
              >
            </div>
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
          url: "/images/dresses.webp",
          title: "SUKNIE",
          info: [
            "Skracanie długości",
            "Skracanie rękawów",
            "Zwężanie",
            "Taliowanie",
            "Zmiana dekoltu",
            " Wszywanie zamków"
          ]
        },
        {
          url: "/images/shirt2.webp",
          title: "KOSZULE",
          info: [
            "Skracanie długości",
            "Skracanie rękawów",
            "Zwężanie",
            "Taliowanie"
          ]
        },
        {
          url: "/images/jeans.webp",
          title: "JEANS",
          info: [
            "Skracanie długości",
            "Wszywanie zamków",
            "Zwężanie w pasie",
            "Zwężanie nogawek",
            "Naszywanie Łat",
            "Skracanie z orginalnym dołem"
          ]
        },
        {
          url: "/images/coat.webp",
          title: "PŁASZCZE",
          info: [
            "Skracanie długości",
            "Skracanie rękawów",
            "Zwężanie",
            "Przyszywanie guzików"
          ]
        }
      ],
      boxesDataLeft: [
        {
          url: "/images/trausers.webp",
          title: "SPODNIE",
          info: [
            "Skracanie długości",
            "Wydłużanie",
            "Wszywanie zamków",
            "Zwężanie w pasie",
            "Zwężanie nogawek"
          ]
        },
        {
          url: "/images/skirt.webp",
          title: "SPÓDNICE",
          info: [
            "Zwężanie",
            "Skracanie długości",
            "Wszywanie zamków",
            "Wymiana podszewki"
          ]
        },
        {
          url: "/images/jacket.webp",
          title: "MARYNARKI",
          info: [
            "Skracanie długości",
            "Skracanie rękawów",
            "Zwężanie",
            "Taliowanie",
            "Przyszywanie guzików"
          ]
        },
        {
          url: "/images/room.webp",
          title: "ZASŁONY i OBRUSY",
          info: ["Skracanie", "Obszywanie"]
        },
        {
          url: "/images/mundur.webp",
          title: "MUNDURY",
          info: [
            "Zwężanie marynarek, spodni, spódniczek, koszul",
            "Skracanie spodni, spódniczek, koszul",
            "Przyszywanie emblematów"
          ]
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
