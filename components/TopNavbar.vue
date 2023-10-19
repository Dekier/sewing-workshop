<template>
  <div
    class="Navbar__main-container"
    :class="{
      'Navbar__main-container--active': isActiveShadow,
      'Navbar__main-container--mobile': isActiveMobile,
    }"
  >
    <div
      class="Navbar__buttons-container"
      :class="{
        'Navbar__buttons-container--mobile': isActiveMobile,
      }"
    >
      <NuxtLink
        to="#company"
        class="Navbar__button"
        :class="{
          'Navbar__button--mobile': isActiveMobile,
        }"
        @click="isActiveMobile = false"
      >
        O Firmie
      </NuxtLink>
      <NuxtLink
        to="#offer"
        class="Navbar__button"
        :class="{
          'Navbar__button--mobile': isActiveMobile,
        }"
        @click="isActiveMobile = false"
      >
        Oferta
      </NuxtLink>
      <NuxtLink
        to="#contact"
        class="Navbar__button"
        :class="{
          'Navbar__button--mobile': isActiveMobile,
        }"
        @click="isActiveMobile = false"
      >
        Kontakt
      </NuxtLink>
      <NuxtLink
        to="#map"
        class="Navbar__button"
        :class="{
          'Navbar__button--mobile': isActiveMobile,
        }"
        @click="isActiveMobile = false"
      >
        Jak Dojechać
      </NuxtLink>
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

<script setup lang="ts">
const isActiveShadow = ref(false);
const isActiveMobile = ref(false);
onMounted(() => {
  window.addEventListener("scroll", () => {
    isActiveShadow.value = window.scrollY > 10;
  });
});

const handleScroll = () => {
  isActiveShadow.value = window.scrollY > 10;
};
</script>

<style lang="scss">
@import "TopNavbar";
</style>
