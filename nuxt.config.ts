// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  ssr: true,
  devtools: { enabled: true },
  build: {
    transpile: ["vuetify"],
  },

  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    "@nuxt/fonts",
    "@vueuse/nuxt",
  ],

  css: ["@styles/styles.scss"],

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
    resolve: {
      alias: {
        "@styles": "~/assets/styles",
      },
    },
  },

  fonts: {
    defaults: {
      weights: [400],
    },
    families: [
      { name: "Vazirmatn-FD", provider: "local" },
      { name: "IRANSans", provider: "local" },
    ],
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: "http://192.168.100.9:5021",
    },
  },
});
