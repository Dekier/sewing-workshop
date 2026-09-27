<template>
  <header class="Navbar__main-container">
    <div class="Navbar__inner">
      <a class="Navbar__brand" href="#top" @click="isActiveMobile = false">
        <img class="Navbar__logo" src="/images/logo_1993.png" alt="" width="38" height="60" />
        <span class="Navbar__brand-text">
          <strong>Magdalena Dekier</strong>
          <span>Pracownia Krawiecka</span>
        </span>
      </a>

      <nav class="Navbar__links" aria-label="Nawigacja główna">
        <a class="Navbar__link" href="#company">O firmie</a>
        <a class="Navbar__link" href="#offer">Oferta</a>
        <a class="Navbar__link" href="#reviews">Opinie</a>
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
      <a href="#company" @click="isActiveMobile = false">O firmie</a>
      <a href="#offer" @click="isActiveMobile = false">Oferta</a>
      <a href="#reviews" @click="isActiveMobile = false">Opinie</a>
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
