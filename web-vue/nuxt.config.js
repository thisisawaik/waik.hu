// import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Waik',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'twitter:creator', content: '@zal1000original' },
      { name: 'twitter:site', content: 'https://waik.hu/' },
      { name: 'fb:app_id', content: '581458672492860' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  meta: {
    ogType: false,
    ogTitle: false,
    ogDescription: false,
    ogSiteName: false,
    description: false,
   },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/firebase',

  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/firebase',
  ],

  firebase: {
    config: {
      apiKey: "AIzaSyBmRS5Yy-1ktWXNsYjk9mQ8Rs9RhmQy600",
      authDomain: "zal1000.firebaseapp.com",
      databaseURL: "https://zal1000.firebaseio.com",
      projectId: "zal1000",
      storageBucket: "zal1000.appspot.com",
      messagingSenderId: "512279358183",
      appId: "1:512279358183:web:1a091779e0474dba541042",
      measurementId: "G-W3EFDHYNN1"
    },
    services: {
      firestore: true,
      storage: true,
      database: true,
      auth: true,
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'hu'
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: "#5865f2",
          accent: "#eb459e",
          secondary: "#57f287",
          info: "#5865f2",
          warning: "#fee75c",
          error: "#ed4245",
          success: "#57f287",
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
