import { Module } from 'vuex'

/** 当前状态类型 */
import { ILoginState } from './type'
/** 根状态类型 */
import { IRootState } from '../type'

const loginModule: Module<ILoginState, IRootState> = {
  /** 增加了命名空间，就可以通过 login/xxx调用 */
  namespaced: true,
  state: {
    token: '',
    userInfo: null,
    userMenus: [],
    permissions: [],
  },
  actions: {
    accountLoginAction({ commit }, payload) {
      console.log(payload)
    },
  },
}

export default loginModule
