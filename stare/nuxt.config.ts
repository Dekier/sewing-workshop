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

  modules: ["@nuxt/scripts", "@nuxt/fonts"],

  fonts: {
    provider: "google",
    families: [
      {
        name: "Charmonman",
        weights: ["400"], // Twoja czcionka dekoracyjna do nagłówków
      },
      {
        name: "Inter",
        weights: ["400", "500", "600"], // Twoja czcionka bazowa do tekstów (zgodnie ze starym @import)
        // Jeśli będziesz potrzebować grubszych wariantów, dopisz je tutaj, np. ['400', '600', '700']
      },
    ],
    experimental: {
      processCSSVariables: true,
    },
    // Globalne ustawienia dla wszystkich zdefiniowanych wyżej czcionek
    defaults: {
      preload: true,
      display: "swap",
    },
  },
  scripts: {
    registry: {
      googleAnalytics: {
        id: "G-S0YVPQPD54",
        trigger: "onNuxtReady",
      },
    },
  },
});
