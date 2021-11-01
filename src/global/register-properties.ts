import { formatUtcString } from '@/utils/date-format'
import { App } from 'vue'

/** 全局注册属性 */
export default function registerProperties(app: App) {
  app.config.globalProperties.$filters = {
    formatTime(value: string) {
      return formatUtcString(value)
    },
  }
}
