import axios, { AxiosInstance } from 'axios'
import { TryRequestConfig, TryRequestInterceptors } from './type'
import { ElLoading } from 'element-plus'
import { ILoadingInstance } from 'element-plus/lib/components/loading/src/loading.type'

/** 是否默认显示Loading */
const DEFAULT_LOADING = true

export default class TryRequest {
  /** axios 实例 */
  instance: AxiosInstance
  /** 用户自定义拦截器 */
  interceptors?: TryRequestInterceptors
  /** Loading组件实例 */
  loading?: ILoadingInstance
  /** 是否显示loading */
  showLoading?: boolean

  constructor(config: TryRequestConfig) {
    this.instance = axios.create(config)

    /** 保存基本信息 */
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? DEFAULT_LOADING

    /** 注册 实例 请求拦截器 */
    this.instance.interceptors.request.use(
      config.interceptors?.requestInterceptor,
      config.interceptors?.requestInterceptorCatch,
    )

    /** 注册 实例 响应拦截器 */
    this.instance.interceptors.response.use(
      config.interceptors?.responseInterceptor,
      config.interceptors?.responseInterceptorCatch,
    )

    /** 注册 全局 请求拦截器 */
    this.instance.interceptors.request.use(
      (config) => {
        console.log('全局 请求拦截器')
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据....',
            background: 'rgba(0, 0, 0, 0.5)',
          })
        }
        return config
      },
      (err) => {
        return err
      },
    )
    /** 注册 全局 响应拦截器 */
    this.instance.interceptors.response.use(
      (res) => {
        console.log('全局 响应拦截器')
        /** 关闭提示 */
        this.loading?.close()
        return res
      },
      (err) => {
        /** 关闭提示 */
        this.loading?.close()

        /** 全局失败的响应拦截器 */
        if (err.response.status === 404) {
          console.log('404的错误~')
        }
        return Promise.reject(err)
      },
    )
  }

  request<T = any>(config: TryRequestConfig<T>): Promise<T> {
    /** 单个请求的请求拦截器 */
    if (config.interceptors?.requestInterceptor) {
      config = config.interceptors.requestInterceptor(config)
    }
    /** 设置默认加载状态 */
    this.showLoading = config.showLoading ?? DEFAULT_LOADING

    return this.instance
      .request<any, T>(config)
      .then((res) => {
        /** 单个请求的响应拦截器 */
        if (config.interceptors?.responseInterceptor) {
          /** 注意此时 res 就是一个 T 不是 axiosResponse  */
          res = config.interceptors.responseInterceptor(res)
        }
        return Promise.resolve(res)
      })
      .catch((err) => {
        console.dir(err)
        /** 恢复默认加载状态 */
        this.showLoading = DEFAULT_LOADING

        return Promise.reject(err)
      })
  }

  get<T = any>(config: TryRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'GET' })
  }
  post<T = any>(config: TryRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'POST' })
  }
  delete<T = any>(config: TryRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'DELETE' })
  }
  put<T = any>(config: TryRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'PUT' })
  }
  patch<T = any>(config: TryRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'PATCH' })
  }
}
