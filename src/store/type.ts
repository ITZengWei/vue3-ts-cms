import { ILoginState } from './login/type'
import { ISystemState } from './main/system/type'

/** 根状态类型 */
export interface IRootState {
  /** 全部的部门数据 */
  entireDepartment: any[]
  /** 全部的角色数据 */
  entireRole: any[]
  /** 全部的菜单数据 TODO */
  entireMenu: any[]
}

/** 子模块类型 */
export interface IRootWithModule {
  login: ILoginState
  system: ISystemState
}

export type IStoreType = IRootState & IRootWithModule
