<template>
  <section id="realizations" class="RealizationShowcase__main-container" aria-labelledby="realization-showcase-title">
    <div class="RealizationShowcase__inner">
      <header class="RealizationShowcase__header">
        <h2 id="realization-showcase-title" class="RealizationShowcase__title">Realizacje</h2>
        <p class="RealizationShowcase__intro">
          Zdjęcia ubrań przed i po poprawkach. Zobacz, co zmieniło się w mojej pracowni.
        </p>
      </header>

      <div class="RealizationShowcase__visual">
        <div class="RealizationShowcase__comparison">
          <figure class="RealizationShowcase__photo RealizationShowcase__photo--before">
            <img
              class="RealizationShowcase__image"
              src="/images/realizacje/kurtka-puchowa-przed.jpg"
              alt="Rozdarcie materiału przy zamku kieszeni beżowej kurtki puchowej przed naprawą"
              width="760"
              height="950"
              loading="lazy"
              decoding="async"
            />
            <figcaption class="RealizationShowcase__label RealizationShowcase__label--before">Przed</figcaption>
          </figure>

          <figure class="RealizationShowcase__photo RealizationShowcase__photo--after">
            <img
              class="RealizationShowcase__image"
              src="/images/realizacje/kurtka-puchowa-po.jpg"
              alt="Kieszeń kurtki puchowej po zszyciu rozdarcia i ponownym wszyciu zamka"
              width="760"
              height="950"
              loading="lazy"
              decoding="async"
            />
            <figcaption class="RealizationShowcase__label RealizationShowcase__label--after">Po</figcaption>
          </figure>
        </div>
      </div>

      <div class="RealizationShowcase__content">
        <h3 class="RealizationShowcase__case-title">Kurtka puchowa<br />z naprawioną kieszenią</h3>
        <p class="RealizationShowcase__text">
          Zszyłam rozdarcie przy kieszeni i wszyłam zamek na miejsce. Kieszeń znów się zapina, a naprawy z zewnątrz nie widać.
        </p>
        <NuxtLink class="RealizationShowcase__link" to="/realizacje">
          <span class="RealizationShowcase__link-text">Zobacz wszystkie realizacje</span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style src="./RealizationShowcase.scss" lang="scss"></style>
