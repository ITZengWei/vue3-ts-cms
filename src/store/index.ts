import { createStore, useStore as useVuexStore, Store } from 'vuex'
/** 根状态类型 */
import { IRootState, IStoreType } from './type'
import loginModule from './login/login'
import systemModule from './main/system/system'

const store = createStore<IRootState>({
  state: {
    entireDepartment: [],
    entireRole: [],
    entireMenu: [],
  },
  mutations: {},
  actions: {},
  modules: {
    login: loginModule,
    system: systemModule,
  },
})

/** TODO 这有什么用 */
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

/** 在挂载路由之前加载本地数据 */
export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

export default store
