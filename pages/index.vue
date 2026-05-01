<template>
  <div class="Page__main-container">
    <Navbar />
    <Intro />
    <AboutCompany />
    <Offer />
    <Contact />
  </div>
</template>

<script>
import Navbar from "~/components/navbar.vue";
import Intro from "~/components/Intro.vue";
import AboutCompany from "~/components/AboutCompany.vue";
import Offer from "~/components/Offer.vue";
import Contact from "~/components/Contact.vue";

export default {
  name: "Page",

  components: {
    Navbar,
    Intro,
    AboutCompany,
    Offer,
    Contact
  }
};
</script>

<style lang="scss">
@import "index";
</style>
