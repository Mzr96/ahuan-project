import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import "@/assets/styles/vuetify/main.scss";
import { createVuetify } from "vuetify";
import { themes } from "./theme";
import defaults from "./defaults";
import { fa } from "vuetify/locale";
export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    defaults: defaults,
    locale: {
      locale: "fa",
      rtl: {
        fa: true,
      },
      messages: { fa },
    },
    theme: { defaultTheme: "light", themes },
  });
  app.vueApp.use(vuetify);
});
