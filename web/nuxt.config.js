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
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  meta: {
    ogType: false,
    ogTitle: false,
    ogDescription: false,
    ogSiteName: false,
    description: false
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/global.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/firebase',
    '@nuxtjs/device',
    '@nuxt/typescript-build'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/firebase',
    'nuxt-clipboard2',
    'nuxt-maintenance-mode',
    '@nuxt/content',
    '@nuxtjs/markdownit',
    'nuxt-socket-io',
    'nuxt-i18n'
  ],
  i18n: {
    locales: [
      {
        code: 'hu',
        file: 'hu.js',
        iso: 'hu',
        isCatchallLocale: true
      },
      {
        code: 'en',
        file: 'en.js',
        iso: 'en'
      }
    ],
    defaultLocale: 'hu',
    lazy: true,
    langDir: 'lang/',
    vueI18n: {
      fallbackLocale: 'hu'
    },
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      onlyOnRoot: true // recommended
    }
  },
  content: {
    markdown: {
      prism: {
        theme: 'prism-themes/themes/prism-material-oceanic.css'
      }
    }
  },

  markdownit: {
    runtime: true, // Support `$md()`
    preset: 'default',
    linkify: true,
    breaks: true,
    use: ['markdown-it-div', 'markdown-it-attrs']
  },

  maintenance: {
    enabled: !!process.env.MAINTENANCE_MODE, // If given truthy value, activation maintenance mode on startup your nuxt application.
    path: '/maintenance' // maintenance fallback content routing.
    // matcher: /^\/admin/ // Path to be in maintenance mode (regex).
  },

  firebase: {
    config: {
      apiKey: 'AIzaSyBmRS5Yy-1ktWXNsYjk9mQ8Rs9RhmQy600',
      authDomain: 'auth.zal1000.com',
      databaseURL: 'https://waik.europe-west1.firebasedatabase.app',
      projectId: 'zal1000',
      storageBucket: 'zal1000.net',
      messagingSenderId: '512279358183',
      appId: '1:512279358183:web:1a091779e0474dba541042',
      measurementId: 'G-W3EFDHYNN1'
    },
    services: {
      firestore: true,
      storage: true,
      database: true,
      auth: {
        ssr: true
      },
      functins: true,
      performance: true,
      functions: {
        emulatorPort: process.env.NODE_ENV === 'development' ? 5001 : undefined,
        emulatorHost:
          process.env.NODE_ENV === 'development'
            ? 'http://localhost'
            : undefined
      },
      messaging: {
        createServiceWorker: true,
        actions: []
      }
    },
    onFirebaseHosting: true
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'hu'
    },
    workbox: {
      importScripts: [
        // ...
        '/firebase-auth-sw.js'
      ],
      // by default the workbox module will not install the service worker in dev environment to avoid conflicts with HMR
      // only set this true for testing and remember to always clear your browser cache in development
      dev: process.env.NODE_ENV === 'development'
    }
  },

  messaging: {
    createServiceWorker: true,
    actions: []
    // fcmPublicVapidKey: '512279358183' // OPTIONAL : Sets vapid key for FCM after initialization
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: '#5865f2',
          accent: '#eb459e',
          secondary: '#57f287',
          info: '#5865f2',
          warning: '#fee75c',
          error: '#ed4245',
          success: '#57f287'
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
}
