<template>
  <div>
    <nuxt />
    <Cookies v-if="visibleCookies" @hideCookies="hideCookies" />
  </div>
</template>
<script>
import Cookies from "~/components/Cookies.vue";
export default {
  components: {
    Cookies
  },

  mounted() {
    if (Boolean(localStorage.cookies)) {
      this.visibleCookies = !Boolean(localStorage.cookies);
    }
  },

  data() {
    return {
      visibleCookies: true
    };
  },
  methods: {
    hideCookies() {
      this.visibleCookies = false;
      localStorage.cookies = false;
    }
  }
};
</script>


<style>
html,
body {
  margin: 0;
  padding: 0;
}
</style>
