import { Module } from 'vuex'
import { ISystemState } from './type'
import { IRootState } from '../../type'

import { getPageListData, createPageData, editPageData } from '@/service/main/system/system'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state: {
    usersList: [],
    usersCount: 0,
    roleList: [],
    roleCount: 0,
  },
  mutations: {
    changeUsersList(state, payload) {
      state.usersList = payload
    },
    changeUsersCount(state, payload) {
      state.usersCount = payload
    },
    changeRoleList(state, payload) {
      state.roleList = payload
    },
    changeRoleCount(state, payload) {
      state.roleCount = payload
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
    },
    /** 页面通用添加逻辑行为封装 */
    async createPageDataAction({ dispatch }, payload) {
      const { pageName, newData } = payload
      /** 执行添加逻辑 */
      await createPageData(`/${pageName}`, newData)
      /** 重新获取数据 */
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10,
        },
      })
    },
    /** 页面通用编辑逻辑行为封装 */
    async editPageDataAction({ dispatch }, payload) {
      const { pageName, newData, id } = payload
      /** 执行编辑逻辑 */
      await editPageData(`/${pageName}/${id}`, newData)
      /** 重新获取数据 */
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10,
        },
      })
    },
  },
}

export default systemModule
