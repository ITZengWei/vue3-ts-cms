import { App } from 'vue'

/** 注册 element-ui 组件 */
import registerElement from './register-element'

// export default function registerApp(app: App): void {
//   app.use(registerElement)
// }

export default {
  install(app: App): void {
    app.use(registerElement)
  },
}
