<template>
  <NuxtLayout>
    <NuxtPage />
    <Cookies v-if="visibleCookies" @hideCookies="hideCookies" />
  </NuxtLayout>
</template>
<style>
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
