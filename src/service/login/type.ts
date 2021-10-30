/** 用户登录参数 */
export interface IAccount {
  /** 登录传递的用户名 coderwhy */
  name: string
  /** 登录传递的密码 123456 */
  password: string
}

/** 登录请求返回的响应结果 */
export interface ILoginResult {
  id: number
  name: string
  token: string
}
