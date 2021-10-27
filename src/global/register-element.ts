import { App } from 'vue'
/** 引入 element 组件 */
import { ElButton } from 'element-plus'
import 'element-plus/dist/index.css'

export default {
  install(app: App): void {
    // app.use(ElButton)
    app.component(ElButton.name, ElButton)
  },
}

// export default function registerElement(app: App): void {
//   app.component(ElButton.name, ElButton)
// }

/** 引入 element基础样式 */
// import 'element-plus/theme-chalk/base.css'
