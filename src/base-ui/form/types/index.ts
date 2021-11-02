/** 表单控件列表 */
type IFormType = 'input' | 'password' | 'select' | 'datepicker'

/** 表单控件属性 */
export interface IFormItem {
  /** 属性字段 */
  field: string
  /** 控件类型 */
  type: IFormType
  /** 控件展示标题 */
  label: string
  /** 验证规则 */
  rules?: any[]
  /** 占位文本 */
  placeholder?: any
  /** 下拉框选择属性 */
  options?: any[]
  /** 针对特殊的属性，比如 element-ui 自定义属性 */
  otherOptions?: any
  /** 是否隐藏 （v-if控制） */
  isHidden?: boolean
}

/** 表单属性 */
export interface IForm {
  /** 表单控件列表 */
  formItems: IFormItem[]
  /** 表单盒子宽度 */
  labelWidth?: string
  /** 列响应式布局配置 */
  colLayout?: any
  /** 控件样式 */
  itemStyle?: any
}
