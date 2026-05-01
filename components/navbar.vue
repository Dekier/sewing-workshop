<template>
  <div
    class="Navbar__main-container"
    :class="{
      'Navbar__main-container--active': isActiveShadow,
      'Navbar__main-container--mobile': isActiveMobile
    }"
  >
    <div
      class="Navbar__buttons-container"
      :class="{
        'Navbar__buttons-container--mobile': isActiveMobile
      }"
    >
      <div
        v-scroll-to="scrollTo('company')"
        class="Navbar__button"
        :class="{
          'Navbar__button--mobile': isActiveMobile
        }"
        @click="isActiveMobile = false"
      >
        O Firmie
      </div>
      <div
        v-scroll-to="scrollTo('offer')"
        class="Navbar__button"
        :class="{
          'Navbar__button--mobile': isActiveMobile
        }"
        @click="isActiveMobile = false"
      >
        Oferta
      </div>
      <div
        v-scroll-to="scrollTo('contact')"
        class="Navbar__button"
        :class="{
          'Navbar__button--mobile': isActiveMobile
        }"
        @click="isActiveMobile = false"
      >
        Kontakt
      </div>
      <div
        v-scroll-to="scrollTo('map')"
        class="Navbar__button"
        :class="{
          'Navbar__button--mobile': isActiveMobile
        }"
        @click="isActiveMobile = false"
      >
        Jak Dojechać
      </div>
    </div>
    <div
      class="Navbar__hamburger-container"
      @click="isActiveMobile = !isActiveMobile"
    >
      <div
        class="Navbar__hamburger-beam"
        :class="{ 'Navbar__hamburger-beam--active': isActiveMobile }"
      />
      <div
        class="Navbar__hamburger-beam"
        :class="{ 'Navbar__hamburger-beam--active': isActiveMobile }"
      />
      <div
        class="Navbar__hamburger-beam"
        :class="{ 'Navbar__hamburger-beam--active': isActiveMobile }"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",

  data() {
    return {
      isActiveShadow: false,
      isActiveMobile: false
    };
  },

  mounted() {
    document.addEventListener("scroll", this.handleScroll);
  },

  destroyed() {
    document.removeEventListener("scroll", this.handleScroll);
  },

  methods: {
    handleScroll() {
      this.isActiveShadow = window.scrollY > 10;
    },

    scrollTo(type) {
      switch (type) {
        case "company":
          return { el: "#company", offset: -100 };
        case "offer":
          return { el: "#offer", offset: -100 };
        case "contact":
          return { el: "#contact", offset: -100 };
        case "map":
          return { el: "#map", offset: -100 };
      }
    }
  }
};
</script>

<style lang="scss">
@import "navbar";
</style>
