import { formatUtcString } from '@/utils/date-format'
import { App } from 'vue'

type CustomFiltersProps = {
  /** 格式化时间 */
  formatTime: (value: string) => string
}

/** 对全局属性添加类型 */
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $filters: CustomFiltersProps
  }
}

/** 全局注册属性 */
export default function registerProperties(app: App) {
  app.config.globalProperties.$filters = {
    formatTime(value: string) {
      return formatUtcString(value)
    },
  }
}
