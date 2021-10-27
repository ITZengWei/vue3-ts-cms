export interface ILoginState {
  /** 用户令牌 */
  token: string
  /** 用户信息 */
  userInfo: any
  /** 用户所属菜单 */
  userMenus: any
  /** 用户权限 */
  permissions: any[]
}
