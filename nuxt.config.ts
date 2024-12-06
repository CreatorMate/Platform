// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['nuxt-oidc-auth', '@nuxtjs/tailwindcss', '@nuxt/image', '@pinia/nuxt', '@nuxtjs/color-mode', '@vueuse/nuxt'],
  oidc: {
    defaultProvider: "auth0",
    providers: {
      auth0: {
        audience: 'https://creatormate.eu.auth0.com/api/v2/',
        redirectUri: process.env.NUXT_OIDC_PROVIDERS_AUTH0_REDIRECT_URI,
        baseUrl: process.env.NUXT_OIDC_PROVIDERS_AUTH0_BASE_URL,
        clientId: process.env.NUXT_OIDC_PROVIDERS_AUTH0_CLIENT_ID,
        clientSecret: process.env.NUXT_OIDC_PROVIDERS_AUTH0_CLIENT_SECRET,
        scope: ['openid', 'offline_access', 'profile', 'email'],
        additionalTokenParameters: { // In case you need access to an API registered in Auth0
          audience: 'https://creatormate.eu.auth0.com/api/v2/',
        },
        additionalAuthParameters: { // In case you need access to an API registered in Auth0
          audience: 'https://creatormate.eu.auth0.com/api/v2/',
        },
        exposeIdToken: true,
        exposeAccessToken: true,
      },
    },
    middleware: {
      globalMiddlewareEnabled: false,
    },
  },
  colorMode: {
    classSuffix: ''
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    head: {
      title: 'creatormate portal',
      script: [],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300..900;1,300..900&display=swap'
        },
      ]
    }
  },
  runtimeConfig: {
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_KEY: process.env.STRIPE_WEBHOOK_KEY,
    NUXT_SUPABASE_SECRET: process.env.NUXT_SUPABASE_SECRET,
    mailerUser: '',
    mailerPass: '',
    mailerHost: '',
    mailerPort: '',
    public: {
      BASE_URL: process.env.BASE_URL,
    },
  },
  image: {
    domains: ['https://mfouoyeneddsfujxfjci.supabase.co', 'https://s.gravatar.com'],
  },
  dir: {
    assets: './src/assets',
    layouts: './src/layouts',
    plugins: './src/plugins',
    middleware: './src/middleware',
  },
});