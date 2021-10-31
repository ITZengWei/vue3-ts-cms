import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store, { setupStore } from './store'
/** 注册应用全局信息 */
import registerApp from './global'
import './service/index'

const app = createApp(App)

app.use(registerApp).use(store)
/** 解决刷新出现 not found 问题 */
setupStore()
app.use(router).mount('#app')
