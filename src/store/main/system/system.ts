import { Module } from 'vuex'
import { ISystemState } from './type'
import { IRootState } from '../../type'

import { getPageListData } from '@/service/main/system/system'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state: {
    usersList: [],
    usersCount: 0,
  },
  mutations: {
    changeUsersList(state, payload) {
      state.usersList = payload
    },
    changeUsersCount(state, payload) {
      state.usersCount = payload
    },
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
      }
    },
    pageCountData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    },
  },
  actions: {
    /** 获取分页列表数据操作 */
    async getPageListAction({ commit }, payload) {
      const { pageName, queryInfo } = payload
      /** 请求地址 */
      const pageUrl = `/${pageName}/list`

      // 拿到请求信息 去请求对应的 列表信息
      const {
        data: { list, totalCount },
      } = await getPageListData(pageUrl, queryInfo)

      /** 将 pageName 转换为小驼峰的形式，拼接要修改的 mutation */
      const transformName = pageName.slice(0, 1).toUpperCase() + pageName.slice(1)

      /** 修改列表数据 */
      commit(`change${transformName}List`, list)

      /** 修改列表总数 */
      commit(`change${transformName}Count`, totalCount)

      console.log(list, totalCount)
    },
  },
}

export default systemModule
