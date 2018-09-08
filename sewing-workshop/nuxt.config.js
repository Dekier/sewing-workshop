module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Usługi Krawieckie Poznań - przeróbki krawieckie',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Pracownia Krawiecka Magdaleny Dekier, szeroki zakres usług krawieckich w Poznaniu na Piątkowie.' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/logo1.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Cinzel+Decorative' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Muli:200,400' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  plugins: [
    '~/plugins/vue-scrollto.js',
    { src: '~/plugins/aos.js', ssr: false },
    { src: '~plugins/ga.js', ssr: false }
  ],
  css: ["aos/dist/aos.css"]
}
