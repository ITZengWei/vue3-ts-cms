import { App } from 'vue'
/** 引入 element 组件 */
import {
  ElAside,
  ElAvatar,
  ElButton,
  ElCheckbox,
  ElContainer,
  ElDatePicker,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElForm,
  ElFormItem,
  ElHeader,
  ElInput,
  ElLink,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElOption,
  ElRadio,
  ElRow,
  ElCol,
  ElSelect,
  ElSubMenu,
  ElTabPane,
  ElTabs,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElImage,
  ElDialog,
  ElTree,
  ElCard,
} from 'element-plus'
import 'element-plus/dist/index.css'

export default {
  install(app: App): void {
    app.use(ElAside)
    app.use(ElAvatar)
    app.use(ElButton)
    app.use(ElCheckbox)
    app.use(ElContainer)
    app.use(ElDatePicker)
    app.use(ElDropdown)
    app.use(ElDropdownItem)
    app.use(ElDropdownMenu)
    app.use(ElForm)
    app.use(ElFormItem)
    app.use(ElHeader)
    app.use(ElInput)
    app.use(ElLink)
    app.use(ElMain)
    app.use(ElMenu)
    app.use(ElMenuItem)
    app.use(ElMenuItemGroup)
    app.use(ElOption)
    app.use(ElRadio)
    app.use(ElRow)
    app.use(ElCol)
    app.use(ElSelect)
    app.use(ElSubMenu)
    app.use(ElTabPane)
    app.use(ElTabs)
    app.use(ElBreadcrumb)
    app.use(ElBreadcrumbItem)
    app.use(ElTable)
    app.use(ElTableColumn)
    app.use(ElPagination)
    app.use(ElImage)
    app.use(ElDialog)
    app.use(ElTree)
    app.use(ElCard)

    // app.component(ElButton.name, ElButton)
  },
}

// export default function registerElement(app: App): void {
//   app.component(ElButton.name, ElButton)
// }

/** 引入 element基础样式 */
// import 'element-plus/theme-chalk/base.css'
