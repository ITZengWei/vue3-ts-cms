import { RouteRecordRaw } from 'vue-router'

/** 第一个展开的菜单 */
let firstMenu: any = null

export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  // console.log(userMenus)
  const routes: RouteRecordRaw[] = []
  /** 1.先去加载默认所有的routes  */
  const allRouters: RouteRecordRaw[] = []
  /** 1.1 加载找到 router/main 里面所有ts文件导出的路径 匹配 .ts .tsx 文件 */
  const routeFiles = require.context('../router/main', true, /\.ts/)
  /** 1.2 routeFiles返回的路径，是基于 ../router/main 需要做一个完整的路由拼接 */
  routeFiles.keys().forEach((key) => {
    /** key: ./system/user/user.ts */
    const route = require('../router/main' + key.split('.')[1])
    allRouters.push(route.default)
  })
  // console.log(allRouters)
  /** 2.根据菜单获取需要添加的routes */
  const _recurseGetRoute = (menus: any[]) => {
    /** 2.1 找到后台返回该账号的权限列表 */
    for (const menu of menus) {
      if (menu.type === 2) {
        /** type === 2就是二级目录， 在路由表中找到与菜单 url 对应的路由 */
        const route = allRouters.find((route) => route.path === menu.url)
        /** 放入返回的路由中 */
        if (route) {
          routes.push(route)
        }

        if (!firstMenu) {
          /** 默认将遍历到的第一个二级目录 存到firstMenu中 作为登录时默认进入第一个 二级页面 */
          firstMenu = menu
        }
      } else if (menu.type === 1) {
        /** type === 1 就是一级目录 递归遍历 一级目录下的二级目录 */
        _recurseGetRoute(menu.children)
      }
    }
  }

  _recurseGetRoute(userMenus)
  return routes
}
