// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  app: {
    head: {
      htmlAttrs: {
        lang: "en"
      },
      title: "Service Notifications",
      link: [
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/logo/logo_250x250.png' },
        { rel: 'apple-touch-icon', sizes: '152x152', href: '/logo/logo_250x250.png' },
        { rel: 'apple-touch-icon', sizes: '144x144', href: '/logo/logo_250x250.png' },
        { rel: 'apple-touch-icon', sizes: '120x120', href: '/logo/logo_250x250.png' },
        { rel: 'apple-touch-icon', sizes: '76x76', href: '/logo/logo_250x250.png'},
      ],
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {name:"google-adsense-account",content:"ca-pub-4065642758618862"},
        { name: "Access-Control-Allow-Origin", content: "*" },
        { name: "Access-Control-Allow-Methods", content: "GET, POST, OPTIONS" },
        { name: "Access-Control-Allow-Credentials", content: "true" },
        { name: "Access-Control-Allow-Headers", content: "DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization" },
        { name: "description", content: "Service Notification."  },
        { 
          name: "keywords", 
          content: "Service Notification." 
        },
        { name: "author", content: "Anhld" },
        { name: "og:title", content: "Service Notification." }, 
        { 
          name: "og:description", 
          content: "Service Notification.." 
        },
        { name: "og:image", content: "" },
        { name: "og:url", content: "" },
        { name: "application-name", content: "Service Notification." },
        { name: "theme-color", content: "#ffffff" },
        { name: "apple-mobile-web-app-capable", content: "yes" }, 
        { name: "apple-mobile-web-app-status-bar-style", content: "#ffffff" }, 
        { name: "apple-mobile-web-app-title", content: "Service Notification." }, 
      ]
    }
  },
  appManifest:true,
  proxy: {
    '/api': {
      target: 'https://notification-sevice-be-346895f7383c.herokuapp.com', // URL của máy chủ backend
      pathRewrite: { '^/api': '/' },
      changeOrigin: true,
      headers: {
        'Access-Control-Allow-Origin': '*' // Thêm tiêu đề vào yêu cầu tới máy chủ backend
      }
    }
  },
  experimental: {
    appManifest: false
  },
  css: [
    '~/assets/css/main.css',
  ],
  pinia: {
    autoImports: ['auth', 'acceptHMRUpdate']
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: ''
    },
    secretKey: ''
  },
  modules: [
    "@nuxtjs/tailwindcss",'@pinia/nuxt','@nuxt/image'
  ],
  devServer: {
    port: 1000
  },
})
