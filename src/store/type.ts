import { ILoginState } from './login/type'
import { ISystemState } from './main/system/type'

/** 根状态类型 */
export interface IRootState {
  entireDepartment: any[]
  entireRole: any[]
  entireMenu: any[]
}

/** 子模块类型 */
export interface IRootWithModule {
  login: ILoginState
  system: ISystemState
}

export type IStoreType = IRootState & IRootWithModule
