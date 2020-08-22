<template>
  <div class="Intro__main-container">
    <div class="Intro__black-background" />
    <div class="Intro__title">
      <h1>Pracownia Krawiecka</h1>
      <h2>Magdaleny Dekier</h2>
    </div>
    <img
      src="/images/logo_1993.png"
      :class="{ 'Intro__logo--mobile': scrolled }"
      class="Intro__logo"
      alt="Pracownia krawiecka Magdalena Dekier Intro"
    />
  </div>
</template>

<script>
export default {
  name: "Intro",

  data() {
    return {
      scrolled: false
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
      this.scrolled = window.scrollY > 400;
    }
  }
};
</script>

<style lang="scss">
@import "Intro";
</style>
