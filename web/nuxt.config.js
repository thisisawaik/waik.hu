function defaultApiUrl () {
  if (process.env.NODE_ENV === 'production') {
    return '/api'
  }
  if (process.env.CODESPACES) {
    return 'https://zal1000-zalorg-waik-hu-5jx4v6wvc495j-8080.githubpreview.dev/api'
  }
  return 'https://api.github.com'
}

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Waik | %s',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'twitter:creator', content: '@zal1000original' },
      { name: 'twitter:site', content: 'https://waik.hu/' },
      { name: 'fb:app_id', content: '581458672492860' },
      { name: 'theme-color', content: '#ffffff' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  meta: {
    ogTitle: false,
    ogDescription: false,
    ogSiteName: false,
    description: false,
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/global.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    'plugins/api.js',
    'plugins/algolia.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
    '@nuxtjs/device',
    '@nuxt/typescript-build',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/composition-api/module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    'nuxt-clipboard2',
    'nuxt-maintenance-mode',
    '@nuxt/content',
    '@nuxtjs/markdownit',
    'nuxt-i18n',
  ],
  i18n: {
    locales: [
      {
        code: 'hu',
        file: 'hu.js',
        iso: 'hu',
        isCatchallLocale: true,
      },
      {
        code: 'en',
        file: 'en.js',
        iso: 'en',
      },
      {
        code: 'zoli',
        file: 'zoli.js',
      },
    ],
    defaultLocale: 'hu',
    lazy: true,
    langDir: 'lang/',
    vueI18n: {
      fallbackLocale: 'hu',
    },
    vueI18nLoader: true,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      onlyOnRoot: true, // recommended
    },
  },
  content: {
    markdown: {
      prism: {
        theme: 'prism-themes/themes/prism-material-oceanic.css',
      },
    },
  },

  markdownit: {
    runtime: true, // Support `$md()`
    preset: 'default',
    linkify: true,
    breaks: true,
    use: ['markdown-it-div', 'markdown-it-attrs'],
  },

  maintenance: {
    enabled: !!process.env.MAINTENANCE_MODE, // If given truthy value, activation maintenance mode on startup your nuxt application.
    path: '/maintenance', // maintenance fallback content routing.
    // matcher: /^\/admin/ // Path to be in maintenance mode (regex).
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: defaultApiUrl(),
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'hu',
    },
    workbox: {
      importScripts: [
        '/sw-test.js',
      ],
      // by default the workbox module will not install the service worker in dev environment to avoid conflicts with HMR
      // only set this true for testing and remember to always clear your browser cache in development
      dev: process.env.NODE_ENV === 'development',
    },
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
          secondary: '#2C2F33',
          info: '#5865f2',
          warning: '#fee75c',
          error: '#ed4245',
          success: '#57f287',
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vue-instantsearch', 'instantsearch.js/es'],
  },
}
