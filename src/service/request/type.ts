import { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface TryRequestInterceptors<T = AxiosResponse> {
  /** 请求拦截器 */
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  /** 请求拦截器错误处理 */
  requestInterceptorCatch?: (err: any) => any
  /** 相应拦截器 不能直接在这里加 T 需要在 接口上加 */
  responseInterceptor?: (res: T) => T
  /** 相应拦截器错误处理 */
  responseInterceptorCatch?: (err: any) => any
}

export interface TryRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: TryRequestInterceptors<T>

  showLoading?: boolean
}
