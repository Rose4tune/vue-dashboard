// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  srcDir: "src/",

  modules: ["@pinia/nuxt"],

  runtimeConfig: {
    public: {
      weatherApiKey: process.env.NUXT_PUBLIC_WEATHER_API_KEY || "",
      supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL || "",
      supabaseKey: process.env.NUXT_PUBLIC_SUPABASE_KEY || "",
    },
  },

  css: ["~/assets/styles.css"],

  postcss: {
    plugins: {
      "@tailwindcss/postcss": {},
    },
  },
});
