<template>
  <div class="Page__main-container">
    <Intro/>
    <AboutCompany/>
    <Offer/>
  </div>
</template>

<script>
import Intro from '~/components/Intro.vue'
import AboutCompany from '~/components/AboutCompany.vue'
import Offer from '~/components/Offer.vue'

export default {
  name: 'Page',

  components: {
    Intro,
    AboutCompany,
    Offer
  }
}
</script>

<style lang="scss">
  @import 'index';
</style>
