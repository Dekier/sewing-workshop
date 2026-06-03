export default defineNuxtConfig({
  ssr: true,
  app: {
    head: {
      htmlAttrs: {
        lang: "pl",
      },
    },
  },

  experimental: {
    payloadExtraction: true,
  },

  routeRules: {
    "/__og-image__/**": { cache: false },
    // Twoje główne reguły renderowania
    "/**": { swr: 3600 },

    // Zmuszenie przeglądarki do cachowania obrazków, css, js i czcionek przez rok
    "/_nuxt/**": {
      headers: { "cache-control": "public, max-age=31536000, immutable" },
    },
    "/images/**": { headers: { "cache-control": "public, max-age=31536000" } },
    "/*.png": { headers: { "cache-control": "public, max-age=31536000" } },
    "/*.webp": { headers: { "cache-control": "public, max-age=31536000" } },
    "/*.jpg": { headers: { "cache-control": "public, max-age=31536000" } },
    "/**/*.woff2": {
      headers: { "cache-control": "public, max-age=31536000, immutable" },
    },
    "/**/*.woff": {
      headers: { "cache-control": "public, max-age=31536000, immutable" },
    },
    "/opinia": {
      redirect: {
        to: "https://g.page/r/CRlZPkO0DZHUEBM/review",
        statusCode: 301,
      },
    },
  },

  nitro: {
    serverAssets: [
      {
        baseName: "articles", // To będzie nazwa, pod którą odwołasz się w kodzie
        dir: "app/assets/content/articles", // Ścieżka relatywna do głównego katalogu projektu
      },
    ],
    prerender: {
      crawlLinks: true,
      failOnError: false,
      routes: [
        // '/',
      ],
    },
    compressPublicAssets: { gzip: true, brotli: true },
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
