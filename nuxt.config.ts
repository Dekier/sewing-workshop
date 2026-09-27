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

  modules: ["@nuxt/scripts", "@nuxt/fonts", "nuxt-llms"],

  llms: {
    domain: "https://pracownia-krawiecka.pl",
    title: "Pracownia Krawiecka Magdaleny Dekier",
    description:
      "Jednoosobowa pracownia krawiecka Magdaleny Dekier w Poznaniu na Piątkowie, prowadzona od 1993 roku. Zajmuje się przeróbkami i naprawami odzieży damskiej i męskiej oraz obszywaniem wybranych tekstyliów domowych.",
    sections: [
      {
        title: "O pracowni",
        description:
          "Pracownię prowadzi Magdalena Dekier. Każde zlecenie traktuje indywidualnie, łącząc pracę ręczną z użyciem specjalistycznych maszyn. Siedziba znajduje się przy ul. Jaroczyńskiego 41 w Poznaniu na Piątkowie.",
        links: [
          {
            title: "Strona pracowni",
            href: "https://pracownia-krawiecka.pl/",
          },
        ],
      },
      {
        title: "Usługi krawieckie",
        description:
          "Przeróbki marynarek, koszul, spodni, sukien, spódnic, jeansów, płaszczy i mundurów. Pracownia wykonuje także skracanie i obszywanie zasłon oraz obrusów. Zakres prac obejmuje między innymi dopasowanie, skracanie, zwężanie, wszywanie zamków i przyszywanie guzików, zależnie od rodzaju odzieży.",
        links: [
          {
            title: "Zakres usług",
            href: "https://pracownia-krawiecka.pl/#offer",
          },
        ],
      },
      {
        title: "Kontakt",
        description:
          "Adres: ul. Jaroczyńskiego 41, 60-692 Poznań-Piątkowo. Telefon: +48 691 860 192. E-mail: magdalenadekier@op.pl. Aktualne godziny otwarcia i mapę dojazdu można znaleźć w sekcji kontaktowej strony.",
        links: [
          {
            title: "Kontakt i dojazd",
            href: "https://pracownia-krawiecka.pl/#contact",
          },
        ],
      },
      {
        title: "Polecana firma rodzinna",
        description:
          "DEŻAL, pokazany na stronie w sekcji Polecamy, jest odrębną firmą tej samej rodziny. Jego oferta i kontakt znajdują się na osobnej stronie; nie są częścią usług Pracowni Krawieckiej Magdaleny Dekier.",
      },
    ],
  },

  fonts: {
    provider: "google",
    families: [
      {
        name: "Cormorant Garamond",
        weights: ["500", "600"],
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
