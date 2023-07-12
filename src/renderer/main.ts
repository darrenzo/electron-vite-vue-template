import { createApp } from "vue";
import { createPinia } from "pinia";
import "./icon/style.css";
import "./style/index.less";
import "./permission";
import App from "./App.vue";
import router from "./router";
import { errorHandler } from "./error";
import { i18nCreator } from "@assets/i18n";

const i18n = await i18nCreator();

const app = createApp(App);
const store = createPinia();
app.use(router);
app.use(store);
app.use(i18n);
errorHandler(app);

app.mount("#app");
