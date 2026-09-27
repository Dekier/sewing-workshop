<template>
  <div class="Intro__main-container">
    <img
      src="/images/intro3.webp"
      class="Intro__background-image"
      alt="Wnętrze pracowni krawieckiej Magdalena Dekier Poznań"
      fetchpriority="high"
      loading="eager"
      decoding="sync"
    />

    <div class="Intro__black-background" />

    <div class="Intro__title">
      <h1>Pracownia Krawiecka</h1>
      <h2>Magdaleny Dekier</h2>
    </div>

    <img
      src="/images/logo_1993.png"
      class="Intro__logo"
      alt="Pracownia krawiecka Magdalena Dekier Intro"
      fetchpriority="high"
    />
  </div>
</template>

<script>
export default {
  name: "Intro",

  data: () => ({
    scrolled: false,
  }),
};
</script>

<style lang="scss">
@import "Intro";
</style>
