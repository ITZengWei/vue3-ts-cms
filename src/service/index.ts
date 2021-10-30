import TryRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
/** localStorage 的封装 */
import LocalCache from '@/utils/cache'

const tryRequest = new TryRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor(config) {
      const token = LocalCache.getCache('token')
      if (token) {
        ;(config.headers as any).Authorization = `Bearer ${token}`
      }
      return config
    },
    responseInterceptor(res) {
      return res.data
    },
  },
})

interface ArticleRes {
  /** 响应状态码 */
  code: number
  /** 响应结果 */
  data: Array<any>
}

// tryRequest
// .post<ArticleRes>({
//   showLoading: true,
//   url: 'articles/findAll',
//   data: { pageNum: 1, pageSize: 10 },
// })
// .then((res) => {
//   console.log(res.data)
// })
// .request<ArticleRes>({
//   showLoading: true,
//   url: 'articles/findAll',
//   method: 'POST',
//   data: { pageNum: 1, pageSize: 10 },
//   // interceptors: {
//   //   requestInterceptor(config) {
//   //     console.log('单个请求的拦截器')
//   //     return config
//   //   },
//   //   responseInterceptor(res) {
//   //     console.log(res)
//   //     console.log('单个请求的响应拦截器')
//   //     return res
//   //   },
//   // },
// })
// .then((res) => {
//   console.log('最终的结果')
//   console.dir(res)
// })
// .catch((err) => {
//   console.dir(err)
// })

export default tryRequest
