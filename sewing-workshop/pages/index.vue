<template>
  <div class="Page__main-container">
    <Intro/>
    <AboutCompany/>
  </div>
</template>

<script>
import Intro from '~/components/Intro.vue'
import AboutCompany from '~/components/AboutCompany.vue'

export default {
  name: 'Page',

  components: {
    Intro,
    AboutCompany
  }
}
</script>

<style lang="scss">
  @import 'index';
</style>
