import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import LocalCache from '@/utils/cache'

const Login = () => import(/* webpackChunkName: "Login" */ '@/views/login/login.vue')
const Main = () => import(/* webpackChunkName: "Main" */ '@/views/main/main.vue')
const NotFound = () => import(/* webpackChunkName: "NotFound" */ '@/views/not-found/not-found.vue')

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'Login', component: Login, children: [] },
  { path: '/main', name: 'Main', component: Main, children: [] },
  // 将匹配所有内容并将其放在 `$route.params.pathMatch` 下
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = LocalCache.getCache('token')
    if (!token) {
      return '/login'
    }
  }
})

export default router
