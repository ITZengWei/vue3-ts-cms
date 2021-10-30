/** 后台返回数据通用格式 */
export interface IDataType<T = any> {
  code: number
  data: T
}
