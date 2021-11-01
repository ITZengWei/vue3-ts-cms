import { createStore, useStore as useVuexStore, Store } from 'vuex'
/** 根状态类型 */
import { IRootState, IStoreType } from './type'
import loginModule from './login/login'
import systemModule from './main/system/system'
import { getPageListData } from '@/service/main/system/system'

const store = createStore<IRootState>({
  state: {
    entireDepartment: [],
    entireRole: [],
    entireMenu: [],
  },
  mutations: {
    changeEntireDepartment(state, entireDepartment) {
      state.entireDepartment = entireDepartment
    },
    changeEntireRole(state, entireRole) {
      state.entireRole = entireRole
    },
    changeEntireMenu(state, entireMenu) {
      state.entireMenu = entireMenu
    },
  },
  actions: {
    async getInitialDataAction({ commit }) {
      /** 查询所有的分页参数 */
      const allQueryInfo = {
        offset: 0,
        size: 1000,
      }

      /** 获取部门 角色列表数据 */
      const {
        data: { list: departmentList },
      } = await getPageListData('/department/list', allQueryInfo)

      const {
        data: { list: roleList },
      } = await getPageListData('/role/list', allQueryInfo)

      const {
        data: { list: menuList },
      } = await getPageListData('/menu/list', allQueryInfo)

      /** 保存角色 部门数据 角色权限 */
      commit('changeEntireDepartment', departmentList)
      commit('changeEntireRole', roleList)
      commit('changeEntireMenu', menuList)
    },
  },
  modules: {
    login: loginModule,
    system: systemModule,
  },
})

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

/** 在挂载路由之前加载本地数据 */
export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

export default store
