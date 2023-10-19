<template>
  <NuxtLayout>
    <NuxtPage />
    <Cookies v-if="visibleCookies" @hideCookies="hideCookies" />
  </NuxtLayout>
</template>
<style>
@import url("https://fonts.googleapis.com/css2?family=Charmonman&family=Inter:wght@400&family=Londrina+Outline&display=swap");
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
#app {
  height: 100%;
  width: 100%;
}
html {
  scroll-behavior: smooth;
}
</style>

<script setup lang="ts">
const visibleCookies = ref(false);

const hideCookies = () => {
  visibleCookies.value = false;
  localStorage.cookies = false;
};

onMounted(() => {
  if (!Boolean(localStorage.cookies)) {
    visibleCookies.value = true;
  }
});
</script>
