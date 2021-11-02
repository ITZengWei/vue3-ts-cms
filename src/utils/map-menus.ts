import { RouteRecordRaw } from 'vue-router'
import { IBreadcrumb } from '@/base-ui/breadcrumb'

/** 第一个展开的菜单 */
export let firstMenu: any = null

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

/** 根据路径找到当前的菜单 */
export function pathMapToMenu(userMenus: any[], currentPath: string): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        return findMenu
      }
    } else if (menu.type === 2) {
      if (menu.url === currentPath) {
        return menu
      }
    }
  }
}

/** 按钮权限 */
export function mapMenusToPermissions(userMenus: any[]) {
  /** 权限列表 */
  const permissions: string[] = []

  /** 递归获取权限 */
  const _recurseGetPermission = (menus: any[]) => {
    for (const menu of menus) {
      /** 如果菜单类型为 1 ｜ 2 代表是路由菜单 */
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermission(menu.children ?? [])
      } else if (menu.type === 3) {
        /** 如果菜单类型为3，代表是按钮，拿到按钮里面的权限信息 */
        permissions.push(menu.permission)
      }
    }
  }

  _recurseGetPermission(userMenus)
  return permissions
}

/** 根据当前路径，获取面包屑数据 */
export function pathMapBreadcrumbs(userMenus: any[], currentPath: string) {
  const breadcrumb: IBreadcrumb[] = []

  const _recurseGetBreadcrumb = (menus: any[]) => {
    for (const menu of menus) {
      /** type === 2就是二级目录 */
      if (menu.type === 2) {
        /** 当前菜单就是，匹配到的结果 */
        if (menu.url === currentPath) {
          return menu
        }
      } else if (menu.type === 1) {
        /** 一级菜单: 遍历其 children，看看其子菜单有没有匹配项 */
        const findMenu = _recurseGetBreadcrumb(menu.children ?? [])
        if (findMenu) {
          /** 加入其父菜单 */
          breadcrumb.push({ name: menu.name, path: menu.url })

          /** 加入其子菜单 */
          breadcrumb.push({ name: findMenu.name })
        }
      }
    }
  }

  _recurseGetBreadcrumb(userMenus)

  return breadcrumb
}

export function menuMapLeafKeys(menuList: any[]) {
  /** 叶子节点的 key */
  const leafKeys: number[] = []

  /** 递归获取菜单id */
  const _recurseGetLeaf = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.children) {
        _recurseGetLeaf(menu.children)
      } else {
        leafKeys.push(menu.id)
      }
    }
  }

  _recurseGetLeaf(menuList)

  return leafKeys
}
