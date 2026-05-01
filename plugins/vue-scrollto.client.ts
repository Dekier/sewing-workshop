import VueScrollTo from "vue-scrollto";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      VueScrollTo,
    },
  };
});
