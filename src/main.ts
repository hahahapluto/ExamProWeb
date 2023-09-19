import { createApp } from "vue";
import pinia from "./stores/index.ts";
import "element-plus/dist/index.css";
import ElementPlus from "element-plus";
import App from "./App.vue";

const app = createApp(App);
app.use(pinia);
// 引入 ElementPlus UI库
app.use(ElementPlus);

app.mount("#app");
