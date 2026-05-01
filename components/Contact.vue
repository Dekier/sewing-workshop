<template>
  <div id="contact" class="Contact__main-container">
    <div class="Contact__center">
      <span class="Contact__title">
        Kontakt
      </span>
      <div class="Contact__half-container">
        <div class="Contact__half-container-cell">
          <div class="Contact__half-container-title">
            Address
          </div>
          <span class="Contact__text">
            ul. Jaroczyńskiego 41
          </span>
          <span class="Contact__text">
            60-692 Poznań-Piątkowo
          </span>
        </div>
        <div class="Contact__half-container-cell">
          <div class="Contact__half-container-title">
            Godziny otwarcia
          </div>
          <span class="Contact__text">
            Poniedziałek: 12:00 - 18:00
          </span>
          <span class="Contact__text">
            Wtorek-Piątek: 9:00 - 17:00
          </span>
        </div>
        <div class="Contact__half-container-cell">
          <div class="Contact__half-container-title">
            Skontaktuj się z nami przez:
          </div>
          <span class="Contact__text">
            Telefon: 691 860 192
          </span>
          <span class="Contact__text">
            E-mail: magdalenadekier@op.pl
          </span>
        </div>
      </div>
    </div>

    <iframe
      title="Pracownia Krawiecka Magdaleny Dekier"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2431.4108610524404!2d16.90338781606623!3d52.45358617980165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47044341d3556dc5%3A0xd4910db4433e5919!2sPRACOWNIA+KRAWIECKA+Magdaleny+Dekier+Pozna%C5%84!5e0!3m2!1spl!2spl!4v1533744299605"
      :width="getWindowSize()"
      height="410"
      frameborder="0"
      style="border:0"
      allowfullscreen
    ></iframe>
    <div class="Contact__footer">
      <span class="Contact__title">
        Polecamy:
      </span>
      <a target="_blank" href="http://dezalroletypoznan.pl" rel="noopener">
        <div class="Contact__logo-dezal" />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Contact",

  data: () => ({
    windowWidth: 0
  }),

  mounted() {
    this.getWindowSize();
    window.addEventListener("resize", this.getWindowSize);
  },

  methods: {
    getWindowSize() {
      this.windowWidth = window.innerWidth;
    }
  }
};
</script>

<style lang="scss">
@import "Contact";
</style>
