import { App } from 'vue'

/** 引入element-ui组件 */
import registerElement from './register-element'
/** 引入全局属性 */
import registerProperties from './register-properties'

// export default function registerApp(app: App): void {
//   app.use(registerElement)
// }

export default {
  install(app: App): void {
    app.use(registerProperties)
    app.use(registerElement)
  },
}
