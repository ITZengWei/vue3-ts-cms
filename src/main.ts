import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
/** 注册应用全局信息 */
import registerApp from './global'
import './service/index'

createApp(App).use(registerApp).use(store).use(router).mount('#app')
