<template>
  <div class="Page__main-container">
    <div class="Page__logo">
      <img src="~/static/svg/ulotka-1.svg"/>
    </div>
    <Intro/>
    <AboutCompany/>
    <Offer/>
    <Contact/>
    <Menu/>
  </div>
</template>

<script>
import Intro from '~/components/Intro.vue'
import AboutCompany from '~/components/AboutCompany.vue'
import Offer from '~/components/Offer.vue'
import Contact from '~/components/Contact.vue'
import Menu from '~/components/Menu.vue'

export default {
  name: 'Page',

  components: {
    Intro,
    AboutCompany,
    Offer,
    Contact,
    Menu
  }
}
</script>

<style lang="scss">
  @import 'index';
</style>
