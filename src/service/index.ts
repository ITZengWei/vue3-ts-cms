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

export default tryRequest
