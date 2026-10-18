<template>
  <header class="Navbar__main-container">
    <div class="Navbar__inner">
      <NuxtLink class="Navbar__brand" to="/#top" @click="isActiveMobile = false">
        <img class="Navbar__logo" src="/images/logo_1993.png" alt="" width="38" height="60" />
        <span class="Navbar__brand-text">
          <strong>Magdalena Dekier</strong>
          <span>Pracownia Krawiecka</span>
        </span>
      </NuxtLink>

      <nav class="Navbar__links" aria-label="Nawigacja główna">
        <NuxtLink class="Navbar__link" to="/#company">O firmie</NuxtLink>
        <NuxtLink class="Navbar__link" to="/#offer">Oferta</NuxtLink>
        <NuxtLink class="Navbar__link" to="/realizacje" exact-active-class="Navbar__link--active">Realizacje</NuxtLink>
        <NuxtLink class="Navbar__link" to="/#reviews">Opinie</NuxtLink>
        <a class="Navbar__link" href="#contact">Kontakt</a>
        <a class="Navbar__link" href="#map">Jak dojechać</a>
        <a class="Navbar__contact" href="tel:691860192">Zadzwoń: 691 860 192</a>
      </nav>

      <button
        class="Navbar__menu-button"
        type="button"
        :aria-expanded="isActiveMobile"
        aria-controls="mobile-navigation"
        :aria-label="isActiveMobile ? 'Zamknij menu' : 'Otwórz menu'"
        @click="isActiveMobile = !isActiveMobile"
      >
        <span class="Navbar__menu-line" />
        <span class="Navbar__menu-line" />
      </button>
    </div>

    <nav
      id="mobile-navigation"
      class="Navbar__mobile-links"
      :class="{ 'Navbar__mobile-links--open': isActiveMobile }"
      aria-label="Nawigacja mobilna"
      :inert="!isActiveMobile"
    >
      <NuxtLink to="/#company" @click="isActiveMobile = false">O firmie</NuxtLink>
      <NuxtLink to="/#offer" @click="isActiveMobile = false">Oferta</NuxtLink>
      <NuxtLink to="/realizacje" exact-active-class="Navbar__link--active" @click="isActiveMobile = false">Realizacje</NuxtLink>
      <NuxtLink to="/#reviews" @click="isActiveMobile = false">Opinie</NuxtLink>
      <a href="#contact" @click="isActiveMobile = false">Kontakt</a>
      <a href="#map" @click="isActiveMobile = false">Jak dojechać</a>
      <a href="tel:691860192" @click="isActiveMobile = false">Zadzwoń: 691 860 192</a>
    </nav>
  </header>
</template>

<script setup lang="ts">
const isActiveMobile = ref(false);
</script>

<style src="./TopNavbar.scss" lang="scss"></style>
