import { Module } from 'vuex'
import { accountLoginRequest, requestUserInfoById, requestUserMenusByRoleId } from '@/service/login'
/** 当前状态类型 */
import { ILoginState } from './type'
import { IAccount } from '@/service/login/type'
/** 根状态类型 */
import { IRootState } from '../type'
/** localStorage 的封装 */
import LocalCache from '@/utils/cache'
/** 引入 vue-router 实例 */
import router from '@/router'
import { mapMenusToRoutes } from '@/utils/map-menus'

const loginModule: Module<ILoginState, IRootState> = {
  /** 增加了命名空间，就可以通过 login/xxx调用 */
  namespaced: true,
  state: {
    token: '',
    userInfo: null,
    userMenus: [],
    permissions: [],
  },
  mutations: {
    changeToken(state, payload: string) {
      state.token = payload
    },
    changeUserInfo(state, payload: any) {
      state.userInfo = payload
    },
    changeUserMenus(state, payload: any) {
      state.userMenus = payload

      /** 动态添加路由 */
      const routes = mapMenusToRoutes(payload)

      routes.forEach((route) => {
        router.addRoute('Main', route)
      })

      // const permissions = mapMenusToPermissions(payload)

      // state.permissions = permissions
    },
  },
  actions: {
    async accountLoginAction({ commit }, payload: IAccount) {
      console.log(payload)
      try {
        /** 1. 登录逻辑 */
        const {
          data: { id, token },
        } = await accountLoginRequest(payload)
        commit('changeToken', token)
        LocalCache.setCache('token', token)

        /** 获取用户所属初始化数据  */

        /** 2. 获取用户信息 */
        const { data: userinfo } = await requestUserInfoById(id)
        commit('changeUserInfo', userinfo)
        LocalCache.setCache('userinfo', userinfo)

        /** 3. 请求用户菜单 */
        const { data: userMenus } = await requestUserMenusByRoleId(userinfo.role.id)
        commit('changeUserMenus', userMenus)
        LocalCache.setCache('userMenus', userMenus)

        /** 4. 跳到首页 */
        router.push('main')
      } catch (error) {
        console.log(error)
      }
    },
    loadLocalLogin({ commit, dispatch }) {
      const token = LocalCache.getCache('token')
      if (token) {
        commit('changeToken', token)
        // dispatch('getInitialDataAction', null, { root: true })
      }
      const userinfo = LocalCache.getCache('userinfo')
      if (userinfo) {
        commit('changeUserInfo', userinfo)
      }
      const userMenus = LocalCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    },
  },
}

export default loginModule
