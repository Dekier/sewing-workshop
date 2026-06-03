export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: "pl",
      },
    },
  },

  routeRules: {
    "/opinia": {
      redirect: {
        to: "https://g.page/r/CRlZPkO0DZHUEBM/review",
        statusCode: 301,
      },
    },
  },

  modules: ["@nuxt/scripts"],
  scripts: {
    registry: {
      googleAnalytics: {
        id: "G-S0YVPQPD54",
        trigger: "onNuxtReady",
      },
    },
  },
});
