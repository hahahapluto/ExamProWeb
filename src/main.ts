import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.ts'
import pinia from './stores/index.ts'

const app = createApp(App)
app.use(pinia)
app.use(router)
// 引入 ElementPlus UI库
app.use(ElementPlus)

app.mount('#app')
