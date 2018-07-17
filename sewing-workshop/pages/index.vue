<template>
  <div class="Page__main-container">
    <Intro/>
  </div>
</template>

<script>
import Intro from '~/components/Intro.vue'

export default {
  name: 'Page',

  components: {
    Intro
  }
}
</script>

<style lang="scss">
  @import 'index';
</style>
