<template>
  <div class="Cookies__main-container">
    Ta strona używa ciasteczek (cookies) m.in. do statystyk, dzięki którym nasz
    serwis może działać lepiej.
    <button type="button" @click="hideCookies()" class="Cookies__btn">Zamknij</button>
  </div>
</template>

<script>
export default {
  name: "Cookies",
  methods: {
    hideCookies() {
      this.$emit("hideCookies");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "Cookies";
</style>
