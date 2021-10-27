import { createStore, useStore as useVuexStore, Store } from 'vuex'
/** 根状态类型 */
import { IRootState, IStoreType } from './type'
import loginModule from './login/login'
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
  },
})

/** TODO 这有什么用 */
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
