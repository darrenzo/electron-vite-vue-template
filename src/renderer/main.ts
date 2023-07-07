import { createApp } from "vue";
import { createPinia } from "pinia";
import "./icon/style.css";
import "./style/index.less";
import "./permission";
import App from "./App.vue";
import router from "./router";
import { errorHandler } from "./error";

const app = createApp(App);
const store = createPinia();
app.use(router);
app.use(store);
errorHandler(app);

app.mount("#app");
