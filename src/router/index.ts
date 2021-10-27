import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const Login = () => import(/* webpackChunkName: "Login" */ '@/views/login/login.vue')
const Main = () => import(/* webpackChunkName: "Main" */ '@/views/main/main.vue')

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/main', name: 'Main', component: Main },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
