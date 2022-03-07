<template>
  <div class="Intro__main-container">
    <div class="Intro__black-background" />
    <div class="Intro__title">
      <h1>Pracownia Krawiecka</h1>
      <h2>Magdaleny Dekier</h2>
    </div>
    <img
      src="/images/logo_1993.png"
      class="Intro__logo"
      alt="Pracownia krawiecka Magdalena Dekier Intro"
    />
  </div>
</template>

<script>
export default {
  name: "Intro",

  data: () => ({
    scrolled: false
  })
};
</script>

<style lang="scss">
@import "Intro";
</style>
