// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    '~/assets/css/index.scss',
    '~/assets/css/common.scss',
    '@fortawesome/fontawesome-svg-core/styles.css',
  ],
  modules: ['@pinia/nuxt'],
  // modules: ['@pinia/nuxt', '@nuxtjs/cloudinary'],
  pinia: {
    storesDirs: ['./stores/**'],
  },
  cloudinary: {
    cloudName: 'fesfese4324',
  },
});
